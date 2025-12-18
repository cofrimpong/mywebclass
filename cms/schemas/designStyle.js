export default {
  name: 'designStyle',
  title: 'Design Style',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'historicalBackground',
      title: 'Historical Background',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'colorPalette',
      title: 'Color Palette',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'typography',
      title: 'Typography',
      type: 'string'
    },
    {
      name: 'sampleImages',
      title: 'Sample Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true }
        }
      ]
    },
    {
      name: 'relatedSubmissions',
      title: 'Related Submissions',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'gallerySubmission' }]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'sampleImages.0'
    }
  }
}
