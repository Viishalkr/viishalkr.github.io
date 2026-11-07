# Vishal Kumar — Portfolio

Personal portfolio for photography, film and design work. Projects are managed in Sanity and rendered by Next.js.

**Stack:** Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · GSAP · Sanity

## Running locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local` with your Sanity project details:

   ```bash
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

The site runs at http://localhost:3000 and Sanity Studio at http://localhost:3000/studio.

## Adding work

Open `/studio`, create a **Project**, fill in the title, click **Generate** for the slug, choose a category, add a cover image (and an MP4 for video projects), then publish. The home page grid and the project's case-study page at `/work/<slug>` pick it up within about 60 seconds.

- **Display Order:** lower numbers show first on the home page. Unnumbered projects follow, newest first.
- **Grid Preview Clip (video projects):** a short 5–10 second, 720p, silent loop under ~3 MB, shown in the grid. The full video plays on the case-study page. Without a preview clip, the grid streams the full video, but only while it is on screen.
- **Testimonials:** create **Testimonial** documents in Studio. The "Kind Words" section appears on the home page once at least one exists.

Set `NEXT_PUBLIC_SITE_URL` if the site moves to a custom domain; it defaults to `https://vishalkr.vercel.app` and is used for share previews and the sitemap.

## Structure

```text
src/
├── app/
│   ├── page.js                 # Home: hero, work grid, about, footer
│   ├── work/[slug]/page.js     # Case-study page per project
│   ├── studio/[[...tool]]/     # Embedded Sanity Studio
│   └── not-found.js            # 404 page
├── components/                 # Navbar, Hero, PortfolioGrid, About, Footer
└── sanity/
    ├── lib/                    # Client, queries, fetch helper
    └── schemaTypes/project.js  # Project content model
public/                         # CV, hero photo and other static files
```

## Scripts

- `npm run dev` starts the dev server
- `npm run build` builds for production
- `npm run start` serves the production build
- `npm run lint` runs ESLint
