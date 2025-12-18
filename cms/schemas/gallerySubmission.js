export default {
  name: 'gallerySubmission',
  title: 'Gallery Submission',
  type: 'document',
  // default status for new documents
  initialValue: { status: 'submitted' },
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule => Rule.required().email()
    },
    {
      name: 'style',
      title: 'Design Style',
      type: 'reference',
      to: [{ type: 'designStyle' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: Rule => Rule.required().uri({ allowRelative: false, scheme: ['http', 'https'] })
    },
    {
      name: 'screenshot',
      title: 'Screenshot',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Submitted', value: 'submitted' },
          { title: 'Approved', value: 'approved' },
          { title: 'Rejected', value: 'rejected' }
        ]
      },
      validation: Rule => Rule.required()
    }
  ],
  // Helpful hint: Only records with `status === 'approved'` should be considered public by frontends
  preview: {
    select: {
      title: 'name',
      subtitle: 'status',
      media: 'screenshot'
    },
    prepare(selection) {
      const { title, subtitle, media } = selection
      return {
        title,
        subtitle: subtitle && `Status: ${subtitle}`,
        media
      }
    }
  }
}
