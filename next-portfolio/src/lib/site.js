// Public address of the site, used for share previews and the sitemap.
// Set NEXT_PUBLIC_SITE_URL if the site moves to a custom domain.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://vishalkr.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "Vishal Kumar";
export const SITE_TITLE = "Vishal Kumar — Visual Director";
export const SITE_DESCRIPTION =
  "Brand films, photography and identity for startups, events and creators. Open for global commissions.";

// Fallbacks used until the matching fields are filled in Site Settings.
export const DEFAULTS = {
  heroTagline:
    "Brand films, photography and identity for startups, events and creators — taken from concept to final frame.",
  email: "kumarvishal1627@gmail.com",
  // The WhatsApp number from the previous version of the site.
  whatsappNumber: "916203899720",
};

// Merges Site Settings from Sanity with the defaults above.
export function resolveSettings(settings) {
  const s = settings ?? {};
  return {
    ...s,
    heroTagline: s.heroTagline || DEFAULTS.heroTagline,
    email: s.email || DEFAULTS.email,
    whatsappNumber: s.whatsappNumber || DEFAULTS.whatsappNumber,
    services: s.services ?? [],
    processSteps: s.processSteps ?? [],
    clients: s.clients ?? [],
  };
}
