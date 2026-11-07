const project = {
  name: 'project',
  title: 'Project',
  type: 'document',
  orderings: [
    {
      title: 'Display order',
      name: 'displayOrder',
      by: [
        { field: 'order', direction: 'asc' },
        { field: '_createdAt', direction: 'desc' },
      ],
    },
  ],
  fields: [
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description:
        'Lower numbers appear first on the home page (1 = top). Projects without a number appear after numbered ones, newest first.',
      validation: (Rule) => Rule.integer().min(0),
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
      description:
        'Featured projects show on the home page first; the rest sit behind a "View all" button. If nothing is featured, everything shows.',
    },
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL Slug (Click Generate)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'tagline',
      title: 'Tagline (Short context)',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Photography', value: 'PHOTOGRAPHY' },
          { title: 'Digital Design', value: 'DESIGN' },
          { title: 'Motion & Video', value: 'VIDEO' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'client',
      title: 'Client (Optional)',
      type: 'string',
    },
    {
      name: 'role',
      title: 'Your Role (e.g., "Director & Editor")',
      type: 'string',
    },
    {
      name: 'year',
      title: 'Year',
      type: 'string',
      description: 'e.g., 2025 or 2024–2025',
    },
    {
      name: 'link',
      title: 'External Link (Optional - e.g., GitHub, Shopify, Live Site)',
      type: 'url',
    },
    {
      name: 'linkText',
      title: 'Link Button Text (e.g., "View Live App", "Shop Now")',
      type: 'string',
      hidden: ({ document }) => !document?.link, // Hides unless a link is provided
    },
    {
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'videoFile',
      title: 'Video File (MP4)',
      type: 'file',
      options: { accept: 'video/mp4,video/webm,video/quicktime' },
      hidden: ({ document }) => document?.category !== 'VIDEO',
      description: 'Full-quality video, played on the project page.',
    },
    {
      name: 'previewVideo',
      title: 'Grid Preview Clip (MP4, recommended)',
      type: 'file',
      options: { accept: 'video/mp4,video/webm' },
      hidden: ({ document }) => document?.category !== 'VIDEO',
      description:
        'Short loop shown in the home page grid: 5–10 seconds, 720p, no audio, ideally under 3 MB. Without it, the grid streams the full video above.',
    },
    {
      name: 'objective',
      title: 'The Brief (What the client needed)',
      type: 'text', 
    },
    {
      name: 'engineering',
      title: 'The Process (How it was made)',
      type: 'text',
    },
    {
      name: 'result',
      title: 'The Result (What happened after)',
      type: 'text',
      description:
        'Outcome for the client: reach, sales, sign-ups, feedback. This is what convinces new clients.',
    },
    {
      name: 'stats',
      title: 'Result Numbers',
      type: 'array',
      description: 'Optional headline numbers, e.g. "2M" + "views on Instagram".',
      of: [
        {
          type: 'object',
          name: 'stat',
          fields: [
            { name: 'value', title: 'Number', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() },
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        },
      ],
      validation: (Rule) => Rule.max(4),
    },
    {
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      description: 'More images or stills from the project, shown on its case-study page (6–15 works well).',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Description (for accessibility)', type: 'string' },
            { name: 'caption', title: 'Caption (optional)', type: 'string' },
          ],
        },
      ],
      options: { layout: 'grid' },
    },
    {
      name: 'software',
      title: 'Software & Skills',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags' 
      },
      description: 'Press enter after each software/skill (e.g., After Effects, React, Node.js)'
    }
  ],
};

export default project;
