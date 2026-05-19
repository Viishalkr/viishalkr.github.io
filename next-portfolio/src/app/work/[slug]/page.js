"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "next-sanity";
import { useParams } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

export default function CaseStudy() {
  const params = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await client.fetch(`*[_type == "project" && slug.current == $slug][0]{
          _id,
          title,
          tagline,
          category,
          "src": image.asset->url,
          "videoUrl": videoFile.asset->url,
          client,
          role,
          year,
          objective,
          engineering,
          software
        }`, { slug: params.slug });
        
        setProject(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching project:", error);
        setLoading(false);
      }
    };

    if (params.slug) fetchProject();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center text-xs font-bold tracking-[0.2em] uppercase text-zinc-400">
        Loading Asset Data...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#F9F9F9] flex flex-col items-center justify-center">
        <h1 className="text-4xl font-black uppercase mb-4 text-black">Project Not Found</h1>
        <Link href="/" className="text-xs font-bold tracking-widest uppercase text-zinc-500 hover:text-black">Return Home</Link>
      </div>
    );
  }

  return (
    <article ref={containerRef} className="bg-[#F9F9F9] text-black min-h-screen pt-32 pb-24 selection:bg-black selection:text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 animate-fade-in-up">
        
        <div className="mb-16 md:mb-24">
          <Link href="/#work" className="text-xs font-bold tracking-widest uppercase text-zinc-400 hover:text-black transition-colors flex items-center gap-2 w-fit">
            <span>←</span> Back to Index
          </Link>
        </div>

        <header className="mb-16 md:mb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <h1 className="text-5xl md:text-[6vw] font-black tracking-tighter uppercase leading-[0.85] mb-6 break-words">
              {project.title}
            </h1>
            {project.tagline && (
              <p className="text-xl md:text-2xl text-zinc-500 font-medium tracking-tight">
                {project.tagline}
              </p>
            )}
          </div>
          
          <div className="lg:col-span-4 flex flex-wrap lg:flex-col gap-6 lg:gap-8 border-t border-zinc-200 lg:border-t-0 lg:border-l pt-8 lg:pt-0 lg:pl-8">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 mb-1">Category</p>
              <p className="font-bold uppercase tracking-wide">{project.category}</p>
            </div>
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 mb-1">Role</p>
              <p className="font-bold uppercase tracking-wide">{project.role || "Digital Director & Designer"}</p>
            </div>
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 mb-1">Timeline</p>
              <p className="font-bold uppercase tracking-wide">{project.year || "2026"}</p>
            </div>
            
            {project.software && project.software.length > 0 && (
              <div>
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 mb-2">Toolkit</p>
                <div className="flex flex-wrap gap-2">
                  {project.software.map((tool, index) => (
                    <span key={index} className="text-[10px] font-bold tracking-widest uppercase border border-zinc-300 px-3 py-1 rounded-full text-zinc-600">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </header>

      </div>

      {/* 👇 PERFECT MEDIA FIT CONTAINER */}
      <div className="w-full bg-zinc-100 relative mb-24 md:mb-32 animate-fade-in-up flex items-center justify-center py-8 md:py-16 px-4 md:px-12" style={{ animationDelay: '0.2s' }}>
        {project.category === "VIDEO" && project.videoUrl ? (
          <video 
            src={project.videoUrl} 
            controls // 👈 Added standard video controls (play, pause, timeline, volume)
            autoPlay 
            loop 
            muted 
            playsInline 
            // object-contain ensures the entire video is always visible, max-h-[85vh] stops vertical videos from getting too tall
            className="w-full h-auto max-h-[85vh] object-contain rounded-md shadow-2xl bg-black" 
          />
        ) : (
          <img 
            src={project.src} 
            alt={project.title} 
            // Ensures photography is never cropped
            className="w-full h-auto max-h-[85vh] object-contain rounded-md shadow-2xl" 
          />
        )}
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32">
          
          <div className="md:col-span-5">
            <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-zinc-400 mb-6">01 // The Objective</h2>
            <h3 className="text-3xl font-black tracking-tighter uppercase mb-6">Defining the Problem.</h3>
            <p className="text-zinc-600 leading-relaxed font-medium whitespace-pre-line">
              {project.objective || "Objective data not yet populated. Add this inside Sanity Studio."}
            </p>
          </div>

          <div className="hidden md:block md:col-span-2"></div>

          <div className="md:col-span-5 mt-12 md:mt-0">
            <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-zinc-400 mb-6">02 // The Engineering</h2>
            <h3 className="text-3xl font-black tracking-tighter uppercase mb-6">Executing the Vision.</h3>
            <p className="text-zinc-600 leading-relaxed font-medium whitespace-pre-line">
              {project.engineering || "Engineering data not yet populated. Add this inside Sanity Studio."}
            </p>
          </div>
        </div>

        <div className="border-t border-black pt-16 pb-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">Ready to scale?</h2>
            <p className="text-zinc-500 mt-2 font-medium">Let's build your next visual system.</p>
          </div>
          <a 
            href="mailto:kumarvishal1627@gmail.com?subject=Project Inquiry via Case Study" 
            className="bg-black text-white px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-zinc-800 transition-colors"
          >
            Initiate Project →
          </a>
        </div>

      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
      `}</style>
    </article>
  );
}