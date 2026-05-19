export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
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
    // 👇 NEW: External Link Fields
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
    },
    {
      name: 'objective',
      title: 'The Objective (Problem)',
      type: 'text', 
    },
    {
      name: 'engineering',
      title: 'The Engineering (Execution)',
      type: 'text',
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