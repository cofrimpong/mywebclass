export default {
  name: 'article',
  title: 'Article',
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
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required()
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }]
    },
    {
      name: 'content',
      title: 'Content',
      type: 'blockContent'
    },
    {
      name: 'style',
      title: 'Design Style',
      type: 'reference',
      to: [{ type: 'designStyle' }]
    }
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name'
    },
    prepare(selection) {
      const { title, author } = selection
      return {
        title,
        subtitle: author ? `by ${author}` : ''
      }
    }
  }
}
