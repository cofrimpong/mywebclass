/**
 * GET /api/approved-submissions
 * Returns gallerySubmission documents with status == 'approved'
 * Resolves the `style` reference and includes image asset URL.
 */

const sanityPkg = require('@sanity/client')
const createClient = sanityPkg.createClient || sanityPkg

module.exports = async function (req, res) {
  try {
    if (req.method !== 'GET') {
      res.statusCode = 405
      res.setHeader('Allow', 'GET')
      return res.end(JSON.stringify({ error: 'Method Not Allowed' }))
    }

    const projectId = process.env.SANITY_PROJECT_ID
    const dataset = process.env.SANITY_DATASET || 'production'

    if (!projectId) {
      res.statusCode = 500
      return res.end(JSON.stringify({ error: 'SANITY_PROJECT_ID not configured' }))
    }

    const client = createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: true
    })

    const groq = `*[_type == "gallerySubmission" && status == "approved"] | order(_createdAt desc) {
      _id,
      name,
      email,
      description,
      url,
      status,
      style-> { _id, title, slug },
      screenshot{asset->{_id, url}}
    }`

    const items = await client.fetch(groq)

    res.setHeader('Content-Type', 'application/json')
    return res.end(JSON.stringify({ submissions: items }))
  } catch (err) {
    console.error('Error in /api/approved-submissions:', err)
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    return res.end(JSON.stringify({ error: 'Internal server error' }))
  }
}
