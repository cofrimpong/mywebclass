import designStyle from './designStyle'
import gallerySubmission from './gallerySubmission'
import article from './article'
import author from './author'
import blockContent from './blockContent'

// Export an array of all schema types to be consumed by Sanity config
export default [
  // document types
  designStyle,
  gallerySubmission,
  article,
  author,
  // non-document type used by articles
  blockContent
]
