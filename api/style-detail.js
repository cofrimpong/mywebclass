/**
 * GET /api/style-detail?slug=<slug>
 * Returns a single designStyle document by slug with all fields
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

    // Get slug from query string
    const url = new URL(req.url, `http://${req.headers.host}`)
    const slug = url.searchParams.get('slug')

    if (!slug) {
      res.statusCode = 400
      return res.end(JSON.stringify({ error: 'Missing slug parameter' }))
    }

    const client = createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: true
    })

    const groq = `*[_type == "designStyle" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      description,
      historicalBackground,
      colorPalette,
      typography,
      sampleImages[]{asset->{_id, url}}
    }`

    const style = await client.fetch(groq, { slug })

    res.setHeader('Content-Type', 'application/json')
    return res.end(JSON.stringify({ style }))
  } catch (err) {
    console.error('Error in /api/style-detail:', err)
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    return res.end(JSON.stringify({ error: 'Internal server error' }))
  }
}
