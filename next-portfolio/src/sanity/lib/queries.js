import { defineQuery } from 'next-sanity'

// Shared ordering: projects with a Display Order come first (lowest on top),
// then the rest, newest first.
const PROJECT_ORDER = `order(coalesce(order, 999999) asc, _createdAt desc)`

export const PROJECTS_QUERY = defineQuery(`*[_type == "project" && defined(slug.current)] | ${PROJECT_ORDER}{
  _id,
  title,
  tagline,
  category,
  featured,
  "slug": slug.current,
  "src": image.asset->url,
  "width": image.asset->metadata.dimensions.width,
  "height": image.asset->metadata.dimensions.height,
  "lqip": image.asset->metadata.lqip,
  "videoUrl": videoFile.asset->url,
  "previewUrl": previewVideo.asset->url
}`)

export const PROJECT_QUERY = defineQuery(`*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  tagline,
  category,
  "src": image.asset->url,
  "width": image.asset->metadata.dimensions.width,
  "height": image.asset->metadata.dimensions.height,
  "lqip": image.asset->metadata.lqip,
  "videoUrl": videoFile.asset->url,
  link,
  linkText,
  client,
  role,
  year,
  objective,
  engineering,
  result,
  stats[]{ _key, value, label },
  software,
  gallery[defined(asset)]{
    _key,
    alt,
    caption,
    "src": asset->url,
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height,
    "lqip": asset->metadata.lqip
  }
}`)

// Ordered list used for sitemap and next/previous navigation.
export const PROJECT_SLUGS_QUERY = defineQuery(`*[_type == "project" && defined(slug.current)] | ${PROJECT_ORDER}{
  "slug": slug.current,
  title,
  _updatedAt
}`)

export const TESTIMONIALS_QUERY = defineQuery(`*[_type == "testimonial" && defined(quote)] | order(coalesce(order, 999999) asc, _createdAt asc){
  _id,
  quote,
  name,
  role
}`)

export const SETTINGS_QUERY = defineQuery(`*[_type == "siteSettings"][0]{
  heroTagline,
  "showreelUrl": showreel.asset->url,
  "showreelPoster": showreelPoster.asset->url,
  email,
  whatsappNumber,
  calendlyUrl,
  services[defined(title)]{ _key, title, description, priceFrom, includes },
  processSteps[defined(title)]{ _key, title, description, duration },
  clients[defined(name)]{
    _key,
    name,
    "logo": logo.asset->url,
    "width": logo.asset->metadata.dimensions.width,
    "height": logo.asset->metadata.dimensions.height
  }
}`)
