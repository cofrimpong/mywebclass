module.exports = async function() {
  const projectId = process.env.SANITY_PROJECT_ID
  const dataset = process.env.SANITY_DATASET || 'production'
  
  if (!projectId) {
    console.warn('SANITY_PROJECT_ID not set, returning empty styles array')
    return []
  }

  try {
    const groq = `*[_type=="designStyle"]{_id, title, "slug": slug.current}`
    const url = `https://${projectId}.api.sanity.io/v1/data/query/${dataset}?query=${encodeURIComponent(groq)}`
    
    const response = await fetch(url)
    if (!response.ok) {
      console.error('Failed to fetch styles for pagination:', response.status)
      return []
    }
    
    const data = await response.json()
    return data.result || []
  } catch (err) {
    console.error('Error fetching styles:', err)
    return []
  }
}
