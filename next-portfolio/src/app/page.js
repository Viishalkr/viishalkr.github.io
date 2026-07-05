"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import PortfolioGrid from "../components/PortfolioGrid";
import About from "../components/About";
import Footer from "../components/Footer";

export default function Home() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const mediaRef = useRef(null);
  const linesRef = useRef(null);

  useGSAP(() => {
    // 1. The Heavy Entrance Animation
    gsap.from(".reveal-text", {
      y: 100,
      opacity: 0,
      duration: 1.5,
      stagger: 0.1,
      ease: "power4.out",
    });

    gsap.from(mediaRef.current, {
      scale: 0.9,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
      delay: 0.2,
    });

    // 2. The Real-Time Mouse Parallax Physics
    const imageX = gsap.quickTo(mediaRef.current, "x", { duration: 0.8, ease: "power3" });
    const imageY = gsap.quickTo(mediaRef.current, "y", { duration: 0.8, ease: "power3" });
    
    const linesX = gsap.quickTo(".bg-line", "x", { duration: 1.2, ease: "power2.out" });

    const handleMouseMove = (e) => {
      // Calculate mouse position relative to the center of the screen
      const xPos = (e.clientX / window.innerWidth - 0.5);
      const yPos = (e.clientY / window.innerHeight - 0.5);

      // Move the image slightly toward the mouse
      imageX(xPos * 40); 
      imageY(yPos * 40);

      // Move the background lines in the OPPOSITE direction to create depth
      linesX(-xPos * 30); 
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, { scope: containerRef });

  return (
    <div className="bg-[#F9F9F9]">
      <main ref={containerRef} className="min-h-screen text-black pt-32 px-6 md:px-12 relative overflow-hidden flex flex-col justify-between pb-12 selection:bg-black selection:text-white">
        
        {/* Parallax Engineering Lines */}
        <div ref={linesRef} className="absolute inset-0 pointer-events-none flex justify-between px-6 md:px-12">
          <div className="bg-line w-[1px] h-full bg-zinc-200/60" />
          <div className="bg-line w-[1px] h-full bg-zinc-200/60 hidden md:block" />
          <div className="bg-line w-[1px] h-full bg-zinc-200/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full mt-12 md:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Typography */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden mb-6">
              <p className="reveal-text text-xs font-bold tracking-[0.3em] uppercase text-zinc-400">
                01 // MULTI-DISCIPLINARY PORTFOLIO
              </p>
            </div>
            
            <div className="overflow-hidden">
              <h1 ref={titleRef} className="reveal-text text-6xl md:text-[7vw] font-black tracking-tighter uppercase leading-[0.85] text-black select-none">
                VISHAL<br />KUMAR
              </h1>
            </div>

            <div className="overflow-hidden mt-8 max-w-lg">
              <p className="reveal-text text-base md:text-lg text-zinc-600 font-medium leading-relaxed tracking-wide">
                Digital director, photographer, and videographer. Executing visual concepts from camera lens to post-production, digital layout, and event scale.
              </p>
            </div>
          </div>

          {/* Interactive Featured Media */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end mt-12 lg:mt-0">
            <div ref={mediaRef} className="w-full max-w-[400px] aspect-[4/5] bg-zinc-100 rounded-2xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.15)] relative group cursor-pointer will-change-transform">
              <img 
                src="/assets/work/photography/hero.jpg"
                alt="Featured Work"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-xs font-bold tracking-widest uppercase text-zinc-300 mb-1">Featured Media</p>
                <h3 className="text-xl font-bold tracking-tight">Editorial Collection</h3>
              </div>
            </div>
          </div>

        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full border-t border-zinc-200 pt-8 flex flex-wrap gap-y-4 justify-between items-center text-xs font-bold tracking-widest uppercase text-zinc-500 mt-20">
          <div className="flex gap-4 md:gap-8 flex-wrap">
            <span className="hover:text-black transition-colors cursor-pointer">PHOTOGRAPHY</span>
            <span className="hidden md:inline">•</span>
            <span className="hover:text-black transition-colors cursor-pointer">VIDEOGRAPHY</span>
            <span className="hidden md:inline">•</span>
            <span className="hover:text-black transition-colors cursor-pointer">DIGITAL DESIGN</span>
          </div>
          <div className="text-black">
            BASED IN INDIA // © 2026
          </div>
        </div>
      </main>

      <PortfolioGrid />
      <About />
      <Footer />
    </div>
  );
}