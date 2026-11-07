// One document holding site-wide content. Sections whose fields are empty
// stay hidden on the site, so this can be filled in gradually.
const siteSettings = {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero & Showreel', default: true },
    { name: 'contact', title: 'Contact' },
    { name: 'services', title: 'Services & Process' },
    { name: 'clients', title: 'Clients' },
  ],
  fields: [
    {
      name: 'heroTagline',
      title: 'Hero Tagline',
      type: 'text',
      rows: 2,
      group: 'hero',
      description:
        'One or two sentences under your name saying who you help and how. Leave empty to use the default.',
    },
    {
      name: 'showreel',
      title: 'Showreel (MP4)',
      type: 'file',
      group: 'hero',
      options: { accept: 'video/mp4,video/webm' },
      description:
        '30–60 seconds of your best shots, shown under the hero. Keep it under ~15 MB (1080p, H.264).',
    },
    {
      name: 'showreelPoster',
      title: 'Showreel Poster Image',
      type: 'image',
      group: 'hero',
      description: 'Shown before the showreel starts playing.',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'contact',
      validation: (Rule) => Rule.email(),
    },
    {
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
      group: 'contact',
      description: 'With country code, digits only, e.g. 916200000000.',
      validation: (Rule) =>
        Rule.regex(/^\d{8,15}$/, { name: 'digits only, with country code' }),
    },
    {
      name: 'calendlyUrl',
      title: 'Booking Link (Calendly etc.)',
      type: 'url',
      group: 'contact',
      description: 'Optional. Adds a "Book a call" button to the contact section.',
    },
    {
      name: 'services',
      title: 'Services',
      type: 'array',
      group: 'services',
      description: 'What clients can hire you for. The Services section appears once you add one.',
      of: [
        {
          type: 'object',
          name: 'service',
          fields: [
            { name: 'title', title: 'Service', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'description', title: 'Short Description', type: 'text', rows: 2 },
            {
              name: 'priceFrom',
              title: 'Starting Price',
              type: 'string',
              description: 'e.g. "₹15,000" or "$250". Shown as "From ₹15,000". Leave empty to show "Price on request".',
            },
            {
              name: 'includes',
              title: 'What’s Included',
              type: 'array',
              of: [{ type: 'string' }],
              options: { layout: 'tags' },
            },
          ],
          preview: { select: { title: 'title', subtitle: 'priceFrom' } },
        },
      ],
    },
    {
      name: 'processSteps',
      title: 'How I Work (Process Steps)',
      type: 'array',
      group: 'services',
      description: 'e.g. Brief → Shoot → Edit → Delivery. The section appears once you add a step.',
      of: [
        {
          type: 'object',
          name: 'step',
          fields: [
            { name: 'title', title: 'Step', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
            { name: 'duration', title: 'Typical Duration (e.g. "1–2 days")', type: 'string' },
          ],
          preview: { select: { title: 'title', subtitle: 'duration' } },
        },
      ],
    },
    {
      name: 'clients',
      title: 'Clients & Collaborators',
      type: 'array',
      group: 'clients',
      description: 'Logos shown in a strip under the hero. Transparent PNG or SVG works best.',
      of: [
        {
          type: 'object',
          name: 'client',
          fields: [
            { name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'logo', title: 'Logo', type: 'image' },
          ],
          preview: { select: { title: 'name', media: 'logo' } },
        },
      ],
    },
  ],
  preview: { prepare: () => ({ title: 'Site Settings' }) },
};

export default siteSettings;
