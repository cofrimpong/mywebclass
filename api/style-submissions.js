/**
 * GET /api/style-submissions?slug=<slug>
 * Returns approved gallerySubmission documents for a specific design style
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

    // First get the style ID by slug
    const styleGroq = `*[_type == "designStyle" && slug.current == $slug][0]._id`
    const styleId = await client.fetch(styleGroq, { slug })

    if (!styleId) {
      res.setHeader('Content-Type', 'application/json')
      return res.end(JSON.stringify({ submissions: [] }))
    }

    // Then get approved submissions for this style
    const submissionsGroq = `*[_type == "gallerySubmission" && status == "approved" && style._ref == $styleId] | order(_createdAt desc) {
      _id,
      name,
      email,
      description,
      url,
      screenshot{asset->{_id, url}}
    }`

    const submissions = await client.fetch(submissionsGroq, { styleId })

    res.setHeader('Content-Type', 'application/json')
    return res.end(JSON.stringify({ submissions: submissions || [] }))
  } catch (err) {
    console.error('Error in /api/style-submissions:', err)
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    return res.end(JSON.stringify({ error: 'Internal server error' }))
  }
}
