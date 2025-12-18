/**
 * POST /api/approve
 * Body: { id: '<submission_document_id>' }
 * Requires SANITY_WRITE_TOKEN to patch the document status to 'approved'.
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
      return res.end(JSON.stringify({ error: 'SANITY_PROJECT_ID and SANITY_WRITE_TOKEN required' }))
    }

    const body = req.body || (await getBody(req))
    const { id } = body || {}
    if (!id) {
      res.statusCode = 400
      return res.end(JSON.stringify({ error: 'Missing id' }))
    }

    const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', token })

    try {
      await client.patch(id).set({ status: 'approved' }).commit({ returnDocuments: false })
    } catch (err) {
      console.error('Sanity patch error (approve):', err)
      res.statusCode = 500
      return res.end(JSON.stringify({ error: 'Failed to update document' }))
    }

    res.setHeader('Content-Type', 'application/json')
    return res.end(JSON.stringify({ success: true }))
  } catch (err) {
    console.error('Unexpected error in /api/approve:', err)
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    return res.end(JSON.stringify({ error: 'Internal server error' }))
  }
}

function getBody (req) {
  return new Promise((resolve, reject) => {
    let data = ''
    req.setEncoding('utf8')
    req.on('data', chunk => { data += chunk })
    req.on('end', () => {
      try { resolve(JSON.parse(data || '{}')) } catch (e) { reject(e) }
    })
    req.on('error', reject)
  })
}
