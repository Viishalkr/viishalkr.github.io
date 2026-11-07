"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import SanityImage from "./SanityImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const TABS = [
  { value: "ALL", label: "All" },
  { value: "PHOTOGRAPHY", label: "Photo" },
  { value: "DESIGN", label: "Design" },
  { value: "VIDEO", label: "Video" },
];

export default function PortfolioGrid({ projects = [] }) {
  const [activeTab, setActiveTab] = useState("ALL");
  const containerRef = useRef(null);

  const filteredProjects = projects.filter(
    (item) => activeTab === "ALL" || item.category === activeTab
  );

  useGSAP(() => {
    if (filteredProjects.length > 0) {
      gsap.from(".portfolio-item", {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
      });
    }
  }, { dependencies: [activeTab], scope: containerRef });

  return (
    <section ref={containerRef} id="work" className="bg-white text-black py-32 px-6 md:px-12 relative z-20 border-t border-zinc-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">SELECTED WORK</h2>
            <p className="text-zinc-500 mt-4 text-lg font-medium">Visual concepts, digital layouts, and motion.</p>
          </div>

          <div className="flex gap-6 text-sm font-bold tracking-wide text-zinc-400">
            {TABS.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveTab(tab.value)}
                aria-pressed={activeTab === tab.value}
                className={`transition-colors pb-1 ${activeTab === tab.value ? "text-black border-b border-black" : "hover:text-black"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="w-full text-center py-32 text-xs font-bold tracking-[0.2em] uppercase text-zinc-400">
            No projects here yet.
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredProjects.map((item) => (
              <Link
                href={`/work/${item.slug}`}
                key={item._id}
                className="portfolio-item group block break-inside-avoid"
              >
                <div className="w-full bg-zinc-100 overflow-hidden relative rounded-2xl">

                  {item.category === "VIDEO" && item.videoUrl ? (
                    <video
                      src={item.videoUrl}
                      poster={item.src || undefined}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      className="w-full h-auto object-cover transform group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    />
                  ) : item.src ? (
                    <SanityImage
                      src={item.src}
                      alt={item.title}
                      width={item.width || 1200}
                      height={item.height || 1200}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      placeholder={item.lqip ? "blur" : "empty"}
                      blurDataURL={item.lqip || undefined}
                      className="w-full h-auto transform group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="aspect-square" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end">
                    <h3 className="text-lg md:text-xl font-bold tracking-tight uppercase text-white mb-1.5 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-zinc-400">
                      {item.category} {item.tagline && `// ${item.tagline}`}
                    </p>
                  </div>

                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
