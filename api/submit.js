/**
 * Serverless-style API handler for POST /api/submit
 *
 * Expects JSON body:
 * { name, email, style, url, screenshot (data URL), description }
 *
 * Requires environment variables:
 *   SANITY_PROJECT_ID
 *   SANITY_DATASET (optional, defaults to 'production')
 *   SANITY_WRITE_TOKEN
 *
 * Returns JSON { success: true } on success.
 */

const sanityPkg = require('@sanity/client')
const createClient = sanityPkg.createClient || sanityPkg

module.exports = async function (req, res) {
  try {
    if (req.method !== 'POST') {
      res.statusCode = 405
      res.setHeader('Allow', 'POST')
      return res.end(JSON.stringify({ error: 'Method Not Allowed' }))
    }

    const projectId = process.env.SANITY_PROJECT_ID
    const dataset = process.env.SANITY_DATASET || 'production'
    const token = process.env.SANITY_WRITE_TOKEN

    if (!projectId || !token) {
      res.statusCode = 500
      return res.end(JSON.stringify({ error: 'Server not configured (SANITY_PROJECT_ID / SANITY_WRITE_TOKEN required)' }))
    }

    // Ensure body is parsed (serverless env typically provides parsed body)
    const body = req.body || (await getBody(req))

    const { name, email, style, url, screenshot, description } = body || {}

    if (!name || !email || !style || !url || !screenshot || !description) {
      res.statusCode = 400
      return res.end(JSON.stringify({ error: 'Missing required fields' }))
    }

    // Validate screenshot data URL
    const match = String(screenshot).match(/^data:(image\/(png|jpeg|jpg|webp));base64,(.+)$/)
    if (!match) {
      res.statusCode = 400
      return res.end(JSON.stringify({ error: 'Invalid screenshot format; expected base64 data URL' }))
    }

    const mime = match[1]
    const base64 = match[3]
    const buffer = Buffer.from(base64, 'base64')

    const client = createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      token,
      useCdn: false
    })

    // Upload image to Sanity asset pipeline
    let asset
    try {
      asset = await client.assets.upload('image', buffer, { filename: 'submission.png' })
    } catch (err) {
      console.error('Sanity asset upload error:', err)
      res.statusCode = 500
      return res.end(JSON.stringify({ error: 'Failed to upload screenshot' }))
    }

    // Create gallerySubmission document with reference to uploaded asset
    const doc = {
      _type: 'gallerySubmission',
      name,
      email,
      style: { _type: 'reference', _ref: style },
      url,
      description,
      screenshot: {
        _type: 'image',
        asset: { _type: 'reference', _ref: asset._id }
      },
      status: 'submitted'
    }

    try {
      await client.create(doc)
    } catch (err) {
      console.error('Sanity create document error:', err)
      res.statusCode = 500
      return res.end(JSON.stringify({ error: 'Failed to create submission' }))
    }

    // Send Discord webhook notification
    if (process.env.DISCORD_WEBHOOK_URL) {
      try {
        await fetch(process.env.DISCORD_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `🖼️ New submission: **${name}** (${style})\n${url}`
          })
        })
      } catch (webhookErr) {
        // Don't fail the submission if webhook fails
        console.error('Discord webhook error:', webhookErr)
      }
    }

    // Send to Airtable CRM
    if (process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID) {
      try {
        const tableName = process.env.AIRTABLE_TABLE_NAME || 'Submissions'
        await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${tableName}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fields: {
              Name: name,
              Email: email,
              Style: style,
              URL: url,
              Status: 'submitted',
              Timestamp: new Date().toISOString()
            }
          })
        })
      } catch (airtableErr) {
        // Don't fail the submission if Airtable fails
        console.error('Airtable CRM error:', airtableErr)
      }
    }

    res.setHeader('Content-Type', 'application/json')
    return res.end(JSON.stringify({ success: true }))
  } catch (err) {
    console.error('Unexpected error in /api/submit:', err)
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    return res.end(JSON.stringify({ error: 'Internal server error' }))
  }
}

// Utility to read raw body from node req when needed
function getBody (req) {
  return new Promise((resolve, reject) => {
    let data = ''
    req.setEncoding('utf8')
    req.on('data', chunk => { data += chunk })
    req.on('end', () => {
      try {
        const parsed = JSON.parse(data || '{}')
        resolve(parsed)
      } catch (e) {
        reject(e)
      }
    })
    req.on('error', reject)
  })
}
