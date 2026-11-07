"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../lib/motion";

export default function Showreel({ src, poster }) {
  const videoRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          if (!prefersReducedMotion()) video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "100px", threshold: 0.2 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
    if (video.paused) video.play().catch(() => {});
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  return (
    <section id="showreel" aria-label="Showreel" className="bg-black px-0 md:px-12 py-0 md:py-16 relative z-20">
      <div className="max-w-7xl mx-auto relative md:rounded-2xl overflow-hidden bg-zinc-900">
        <video
          ref={videoRef}
          src={loaded ? src : undefined}
          poster={poster || undefined}
          muted
          loop
          playsInline
          preload="none"
          onLoadedData={(e) => {
            if (!prefersReducedMotion()) e.currentTarget.play().catch(() => {});
          }}
          onPlay={() => setPaused(false)}
          onPause={() => setPaused(true)}
          className="w-full aspect-video object-cover"
        />
        <div className="absolute left-4 right-4 bottom-4 md:left-6 md:right-6 md:bottom-6 flex items-center justify-between gap-4">
          <p className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-white/80">Showreel</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={togglePlay}
              className="text-[10px] md:text-xs font-bold tracking-widest uppercase bg-white/15 backdrop-blur-md text-white px-3 md:px-4 py-2 rounded-full hover:bg-white/25 transition-colors"
            >
              {paused ? "Play" : "Pause"}
            </button>
            <button
              type="button"
              onClick={toggleSound}
              className="text-[10px] md:text-xs font-bold tracking-widest uppercase bg-white/15 backdrop-blur-md text-white px-3 md:px-4 py-2 rounded-full hover:bg-white/25 transition-colors"
            >
              {muted ? "Sound on" : "Sound off"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
