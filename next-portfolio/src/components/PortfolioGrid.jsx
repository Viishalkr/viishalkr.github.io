"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "next-sanity";
import Link from "next/link";
import Image from "next/image"; // 👈 Imported the Next.js Image Engine
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

export default function PortfolioGrid() {
  const [activeTab, setActiveTab] = useState("ALL");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // 👇 UPDATED QUERY: Fetching exact dimensions and Blur placeholders (LQIP)
        const data = await client.fetch(`*[_type == "project"]{
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
        }`);
        setProjects(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((item) => {
    if (activeTab === "ALL") return true;
    return item.category === activeTab;
  });

  useGSAP(() => {
    if (!loading && filteredProjects.length > 0) {
      gsap.from(".portfolio-item", {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
      });
    }
  }, { dependencies: [loading, activeTab], scope: containerRef });

  return (
    <section ref={containerRef} id="work" className="bg-white text-black py-32 px-6 md:px-12 relative z-20 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">SELECTED WORK</h2>
            <p className="text-zinc-500 mt-4 text-lg font-medium">Visual concepts, digital layouts, and motion.</p>
          </div>
          
          <div className="flex gap-6 text-sm font-bold tracking-wide text-zinc-400">
            <button onClick={() => setActiveTab("ALL")} className={`transition-colors pb-1 ${activeTab === "ALL" ? "text-black border-b border-black" : "hover:text-black"}`}>All</button>
            <button onClick={() => setActiveTab("PHOTOGRAPHY")} className={`transition-colors pb-1 ${activeTab === "PHOTOGRAPHY" ? "text-black border-b border-black" : "hover:text-black"}`}>Photo</button>
            <button onClick={() => setActiveTab("DESIGN")} className={`transition-colors pb-1 ${activeTab === "DESIGN" ? "text-black border-b border-black" : "hover:text-black"}`}>Design</button>
            <button onClick={() => setActiveTab("VIDEO")} className={`transition-colors pb-1 ${activeTab === "VIDEO" ? "text-black border-b border-black" : "hover:text-black"}`}>Video</button>
          </div>
        </div>

        {loading ? (
          <div className="w-full text-center py-32 text-xs font-bold tracking-[0.2em] uppercase text-zinc-400">Fetching Data...</div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredProjects.map((item) => (
              <Link 
                href={item.slug ? `/work/${item.slug}` : "#"} 
                key={item._id} 
                className="portfolio-item group block break-inside-avoid cursor-pointer"
              >
                <div className="w-full bg-zinc-100 overflow-hidden relative rounded-2xl">
                  
                  {item.category === "VIDEO" && item.videoUrl ? (
                    <video src={item.videoUrl} autoPlay loop muted playsInline className="w-full h-auto object-cover transform group-hover:scale-[1.03] transition-transform duration-700 ease-out" />
                  ) : (
                    // 👇 The new Next.js Image Component in action
                    <Image 
                      src={item.src} 
                      alt={item.title} 
                      width={item.width || 1200} 
                      height={item.height || 1200}
                      placeholder={item.lqip ? "blur" : "empty"}
                      blurDataURL={item.lqip}
                      className="w-full h-auto transform group-hover:scale-[1.03] transition-transform duration-700 ease-out" 
                    />
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