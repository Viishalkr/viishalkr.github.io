import { defineQuery } from 'next-sanity'

export const PROJECTS_QUERY = defineQuery(`*[_type == "project" && defined(slug.current)] | order(_createdAt desc){
  _id,
  title,
  tagline,
  category,
  "slug": slug.current,
  "src": image.asset->url,
  "width": image.asset->metadata.dimensions.width,
  "height": image.asset->metadata.dimensions.height,
  "lqip": image.asset->metadata.lqip,
  "videoUrl": videoFile.asset->url
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
  software
}`)

export const PROJECT_SLUGS_QUERY = defineQuery(`*[_type == "project" && defined(slug.current)]{ "slug": slug.current }`)
