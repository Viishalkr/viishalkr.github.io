import { sanityFetch } from "../sanity/lib/fetch";
import { PROJECT_SLUGS_QUERY } from "../sanity/lib/queries";
import { SITE_URL } from "../lib/site";

export const revalidate = 3600;

export default async function sitemap() {
  let projects = [];
  try {
    projects = (await sanityFetch(PROJECT_SLUGS_QUERY)) ?? [];
  } catch (error) {
    console.error("Error building sitemap:", error);
  }

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...projects.map(({ slug, _updatedAt }) => ({
      url: `${SITE_URL}/work/${slug}`,
      lastModified: _updatedAt ? new Date(_updatedAt) : undefined,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  ];
}
