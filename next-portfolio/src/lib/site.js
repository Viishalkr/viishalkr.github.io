// Public address of the site, used for share previews and the sitemap.
// Set NEXT_PUBLIC_SITE_URL if the site moves to a custom domain.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://vishalkr.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "Vishal Kumar";
export const SITE_TITLE = "Vishal Kumar — Visual Director";
export const SITE_DESCRIPTION =
  "Visual director working across photography, film, and design. Open for global commissions.";
