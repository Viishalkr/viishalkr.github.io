"use client";

import Image from "next/image";

// Let Sanity's image CDN resize and convert images, instead of having
// Next.js download multi-megabyte originals to optimize them itself.
function sanityLoader({ src, width, quality }) {
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality || 75));
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "max");
  return url.toString();
}

export default function SanityImage(props) {
  // eslint-disable-next-line jsx-a11y/alt-text -- alt is passed through props
  return <Image loader={sanityLoader} {...props} />;
}
