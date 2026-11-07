import { client } from './client'

// How often (in seconds) pages re-fetch content published in Sanity Studio.
export const REVALIDATE_SECONDS = 60

export async function sanityFetch(query, params = {}) {
  return client.fetch(query, params, {
    next: { revalidate: REVALIDATE_SECONDS },
  })
}
