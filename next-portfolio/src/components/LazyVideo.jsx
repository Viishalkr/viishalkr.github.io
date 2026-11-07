"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../lib/motion";

// A muted, looping video that downloads nothing until it is near the
// viewport, and only plays while it is actually on screen.
export default function LazyVideo({ src, poster, className }) {
  const videoRef = useRef(null);
  const visibleRef = useRef(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  const tryPlay = () => {
    const video = videoRef.current;
    if (!video || !video.getAttribute("src") || prefersReducedMotion()) return;
    video.play().catch(() => {});
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          loadObserver.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    const playObserver = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) tryPlay();
        else video.pause();
      },
      { threshold: 0.25 }
    );

    loadObserver.observe(video);
    playObserver.observe(video);
    return () => {
      loadObserver.disconnect();
      playObserver.disconnect();
    };
  }, []);

  // Once the source is attached, start playing if it is already on screen.
  useEffect(() => {
    if (shouldLoad && visibleRef.current) tryPlay();
  }, [shouldLoad]);

  return (
    <video
      ref={videoRef}
      src={shouldLoad ? src : undefined}
      poster={poster || undefined}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      onLoadedData={() => visibleRef.current && tryPlay()}
      className={className}
    />
  );
}
