#!/usr/bin/env node
/**
 * Simple API server to handle Sanity interactions for submissions.
 *
 * Endpoints:
 *  GET  /api/styles      -> returns list of designStyle docs (id, title)
 *  POST /api/submit      -> accepts JSON { name, email, style, url, description, screenshot }
 *
 * Environment variables required for write operations:
 *  SANITY_PROJECT_ID  (required)
 *  SANITY_DATASET     (defaults to 'production')
 *  SANITY_WRITE_TOKEN (required for uploads and creating documents)
 */

import express from 'express'
import { Buffer } from 'buffer'

const app = express()
const PORT = process.env.API_PORT || 8888

app.use(express.json({ limit: '15mb' }))

function sanityBase(projectId) {
  return `https://${projectId}.api.sanity.io`
}

// GET /api/styles -> list designStyle docs (id and title)
app.get('/api/styles', async (req, res) => {
  const projectId = process.env.SANITY_PROJECT_ID
  const dataset = process.env.SANITY_DATASET || 'production'
  if (!projectId) return res.status(500).json({ error: 'SANITY_PROJECT_ID not configured' })

  const groq = `*[_type=="designStyle"]{_id, title, "slug": slug.current, description}`
  const url = `${sanityBase(projectId)}/v1/data/query/${dataset}?query=${encodeURIComponent(groq)}`

  try {
    const r = await fetch(url)
    if (!r.ok) throw new Error(`Sanity read failed: ${r.status}`)
    const json = await r.json()
    // json.result is array
    return res.json({ styles: json.result || [] })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Failed to fetch styles' })
  }
})

// GET /api/approved-submissions -> list approved gallerySubmission docs
app.get('/api/approved-submissions', async (req, res) => {
  const projectId = process.env.SANITY_PROJECT_ID
  const dataset = process.env.SANITY_DATASET || 'production'
  if (!projectId) return res.status(500).json({ error: 'SANITY_PROJECT_ID not configured' })

  const groq = `*[_type=="gallerySubmission" && status=="approved"] | order(_createdAt desc) {
    _id,
    name,
    email,
    description,
    url,
    status,
    "style": style->{_id, title, "slug": slug.current},
    "screenshot": screenshot{asset->{_id, url}}
  }`
  const url = `${sanityBase(projectId)}/v1/data/query/${dataset}?query=${encodeURIComponent(groq)}`

  try {
    const r = await fetch(url)
    if (!r.ok) throw new Error(`Sanity read failed: ${r.status}`)
    const json = await r.json()
    return res.json({ submissions: json.result || [] })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Failed to fetch approved submissions' })
  }
})

// GET /api/style-detail?slug=<slug> -> get single designStyle by slug
app.get('/api/style-detail', async (req, res) => {
  const projectId = process.env.SANITY_PROJECT_ID
  const dataset = process.env.SANITY_DATASET || 'production'
  if (!projectId) return res.status(500).json({ error: 'SANITY_PROJECT_ID not configured' })

  const slug = req.query.slug
  if (!slug) return res.status(400).json({ error: 'Missing slug parameter' })

  const groq = `*[_type=="designStyle" && slug.current=="${slug}"][0]{
    _id,
    title,
    "slug": slug.current,
    description,
    historicalBackground,
    colorPalette,
    typography,
    "sampleImages": sampleImages[]{asset->{_id, url}}
  }`
  const url = `${sanityBase(projectId)}/v1/data/query/${dataset}?query=${encodeURIComponent(groq)}`

  try {
    const r = await fetch(url)
    if (!r.ok) throw new Error(`Sanity read failed: ${r.status}`)
    const json = await r.json()
    return res.json({ style: json.result })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Failed to fetch style detail' })
  }
})

// GET /api/style-submissions?slug=<slug> -> get approved submissions for a style
app.get('/api/style-submissions', async (req, res) => {
  const projectId = process.env.SANITY_PROJECT_ID
  const dataset = process.env.SANITY_DATASET || 'production'
  if (!projectId) return res.status(500).json({ error: 'SANITY_PROJECT_ID not configured' })

  const slug = req.query.slug
  if (!slug) return res.status(400).json({ error: 'Missing slug parameter' })

  // First get the style ID
  const styleGroq = `*[_type=="designStyle" && slug.current=="${slug}"][0]._id`
  const styleUrl = `${sanityBase(projectId)}/v1/data/query/${dataset}?query=${encodeURIComponent(styleGroq)}`

  try {
    const styleR = await fetch(styleUrl)
    if (!styleR.ok) throw new Error(`Sanity read failed: ${styleR.status}`)
    const styleJson = await styleR.json()
    const styleId = styleJson.result

    if (!styleId) {
      return res.json({ submissions: [] })
    }

    // Get approved submissions for this style
    const submissionsGroq = `*[_type=="gallerySubmission" && status=="approved" && style._ref=="${styleId}"] | order(_createdAt desc) {
      _id,
      name,
      email,
      description,
      url,
      "screenshot": screenshot{asset->{_id, url}}
    }`
    const submissionsUrl = `${sanityBase(projectId)}/v1/data/query/${dataset}?query=${encodeURIComponent(submissionsGroq)}`

    const subR = await fetch(submissionsUrl)
    if (!subR.ok) throw new Error(`Sanity read failed: ${subR.status}`)
    const subJson = await subR.json()

    return res.json({ submissions: subJson.result || [] })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Failed to fetch style submissions' })
  }
})

// GET /api/reviews -> list pending submissions (status=submitted)
app.get('/api/reviews', async (req, res) => {
  const projectId = process.env.SANITY_PROJECT_ID
  const dataset = process.env.SANITY_DATASET || 'production'
  if (!projectId) return res.status(500).json({ error: 'SANITY_PROJECT_ID not configured' })

  const groq = `*[_type=="gallerySubmission" && status=="submitted"] | order(_createdAt desc) {
    _id,
    name,
    email,
    description,
    url,
    status,
    "style": style->{_id, title, "slug": slug.current},
    "screenshot": screenshot{asset->{_id, url}}
  }`
  const url = `${sanityBase(projectId)}/v1/data/query/${dataset}?query=${encodeURIComponent(groq)}`

  try {
    const r = await fetch(url)
    if (!r.ok) throw new Error(`Sanity read failed: ${r.status}`)
    const json = await r.json()
    return res.json({ submissions: json.result || [] })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Failed to fetch pending submissions' })
  }
})

// POST /api/approve -> patch submission status to approved
app.post('/api/approve', async (req, res) => {
  const projectId = process.env.SANITY_PROJECT_ID
  const dataset = process.env.SANITY_DATASET || 'production'
  const token = process.env.SANITY_WRITE_TOKEN

  if (!projectId || !token) {
    return res.status(500).json({ error: 'SANITY_PROJECT_ID and SANITY_WRITE_TOKEN required' })
  }

  const { id } = req.body || {}
  if (!id) return res.status(400).json({ error: 'Missing id' })

  const url = `${sanityBase(projectId)}/v2021-10-21/data/mutate/${dataset}`
  const body = {
    mutations: [
      {
        patch: {
          id,
          set: { status: 'approved' }
        }
      }
    ]
  }

  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    if (!r.ok) {
      const text = await r.text()
      console.error('Approve patch failed:', r.status, text)
      return res.status(500).json({ error: 'Failed to approve submission' })
    }

    return res.json({ success: true })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Server error during approval' })
  }
})

// POST /api/reject -> patch submission status to rejected
app.post('/api/reject', async (req, res) => {
  const projectId = process.env.SANITY_PROJECT_ID
  const dataset = process.env.SANITY_DATASET || 'production'
  const token = process.env.SANITY_WRITE_TOKEN

  if (!projectId || !token) {
    return res.status(500).json({ error: 'SANITY_PROJECT_ID and SANITY_WRITE_TOKEN required' })
  }

  const { id } = req.body || {}
  if (!id) return res.status(400).json({ error: 'Missing id' })

  const url = `${sanityBase(projectId)}/v2021-10-21/data/mutate/${dataset}`
  const body = {
    mutations: [
      {
        patch: {
          id,
          set: { status: 'rejected' }
        }
      }
    ]
  }

  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    if (!r.ok) {
      const text = await r.text()
      console.error('Reject patch failed:', r.status, text)
      return res.status(500).json({ error: 'Failed to reject submission' })
    }

    return res.json({ success: true })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Server error during rejection' })
  }
})

// POST /api/submit -> create gallerySubmission with uploaded image
app.post('/api/submit', async (req, res) => {
  const projectId = process.env.SANITY_PROJECT_ID
  const dataset = process.env.SANITY_DATASET || 'production'
  const token = process.env.SANITY_WRITE_TOKEN

  if (!projectId || !token) {
    return res.status(500).json({ error: 'SANITY_PROJECT_ID and SANITY_WRITE_TOKEN must be configured' })
  }

  const { name, email, style, url: siteUrl, description, screenshot } = req.body || {}

  // Basic server-side validation
  if (!name || !email || !style || !siteUrl || !description || !screenshot) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  // Parse Data URL (expect data:<mime>;base64,<data>)
  const match = String(screenshot).match(/^data:(image\/(png|jpeg|jpg|webp));base64,(.+)$/)
  if (!match) {
    return res.status(400).json({ error: 'Screenshot must be a data URL (base64-encoded image)' })
  }

  const mime = match[1]
  const base64Data = match[3]
  const binary = Buffer.from(base64Data, 'base64')

  try {
    // Upload image asset to Sanity
    const uploadUrl = `${sanityBase(projectId)}/v2021-10-21/assets/images/${dataset}`
    const uploadResp = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': mime
      },
      body: binary
    })

    if (!uploadResp.ok) {
      const text = await uploadResp.text()
      console.error('Upload failed:', uploadResp.status, text)
      return res.status(500).json({ error: 'Failed to upload image to Sanity' })
    }

    const asset = await uploadResp.json()

    // Create gallerySubmission document referencing the uploaded asset
    const createUrl = `${sanityBase(projectId)}/v2021-10-21/data/mutate/${dataset}`
    const createBody = {
      mutations: [
        {
          create: {
            _type: 'gallerySubmission',
            name,
            email,
            style: { _type: 'reference', _ref: style },
            url: siteUrl,
            description,
            screenshot: {
              _type: 'image',
              asset: { _type: 'reference', _ref: asset._id }
            },
            status: 'submitted'
          }
        }
      ]
    }

    const createResp = await fetch(createUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(createBody)
    })

    if (!createResp.ok) {
      const text = await createResp.text()
      console.error('Create failed:', createResp.status, text)
      return res.status(500).json({ error: 'Failed to create submission document' })
    }

    const createJson = await createResp.json()
    return res.json({ ok: true, result: createJson })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Server error during submission' })
  }
})

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`)
  console.log('Endpoints:')
  console.log('  GET  /api/styles')
  console.log('  GET  /api/style-detail?slug=<slug>')
  console.log('  GET  /api/style-submissions?slug=<slug>')
  console.log('  GET  /api/approved-submissions')
  console.log('  POST /api/submit')
  console.log('  GET  /api/reviews')
  console.log('  POST /api/approve')
  console.log('  POST /api/reject')
})
