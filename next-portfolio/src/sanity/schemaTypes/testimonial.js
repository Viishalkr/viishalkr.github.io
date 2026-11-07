const testimonial = {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  orderings: [
    {
      title: 'Display order',
      name: 'displayOrder',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  fields: [
    {
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().max(400),
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'role',
      title: 'Role & Organisation (e.g., "Festival Lead, Bitotsav")',
      type: 'string',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first.',
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'quote' },
  },
};

export default testimonial;
