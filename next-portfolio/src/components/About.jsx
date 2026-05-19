"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.from(".about-reveal", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      }
    });
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      id="about" 
      className="bg-white text-black py-32 px-6 md:px-12 relative z-20 border-t border-zinc-200 selection:bg-black selection:text-white"
    >
      {/* 👇 FIXED: Removed the middle line. Justify-between now only pushes lines to the far left and far right boundaries. */}
      <div className="absolute inset-0 pointer-events-none flex justify-between px-6 md:px-12">
        <div className="w-[1px] h-full bg-zinc-200/60" />
        <div className="w-[1px] h-full bg-zinc-200/60" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          <div className="lg:col-span-7">
            <p className="about-reveal text-xs font-bold tracking-[0.3em] text-zinc-400 uppercase mb-8">
              02 // PILOT & PHILOSOPHY
            </p>
            
            <h2 className="about-reveal text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9] mb-12 text-black">
              Where computational logic meets visceral visual architecture.
            </h2>
            
            <div className="about-reveal space-y-6 text-base md:text-lg text-zinc-600 font-medium leading-relaxed max-w-2xl">
              <p>
                I operate at the exact intersection of structure and aesthetic. Deeply rooted in an academic background of <span className="text-black font-bold">Computational Mathematics and Systems Engineering</span>, my creative methodology is fundamentally calculated. I don’t just capture frames or arrange layouts—I design scalable visual frameworks.
              </p>
              <p>
                As a digital director, photographer, and videographer, I bridge the massive void between high-end commercial art and technical execution. From coordinating large-scale event creative layouts to post-production color science and application data framing, every asset is treated as a component in a larger operational system.
              </p>
              <p>
                No guesswork. Pure intentionality. Built to convert attention into commerce.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-end mt-12 lg:mt-0">
            <div className="about-reveal border-t border-zinc-200 pt-8 w-full">
              <p className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase mb-6">Capabilities Matrix</p>
              
              <div className="grid grid-cols-2 gap-x-8 gap-y-6 text-xs font-bold tracking-widest uppercase">
                <div>
                  <p className="text-black mb-2">// VISUAL</p>
                  <ul className="space-y-2 text-zinc-500 font-medium tracking-wide normal-case text-sm">
                    <li>Commercial Photography</li>
                    <li>Creative Direction</li>
                    <li>Video Post-Production</li>
                    <li>Apparel & Merch System Design</li>
                  </ul>
                </div>
                
                <div>
                  <p className="text-black mb-2">// TECHNICAL</p>
                  <ul className="space-y-2 text-zinc-500 font-medium tracking-wide normal-case text-sm">
                    <li>Frontend UI/UX Systems</li>
                    <li>Data Architecture Framing</li>
                    <li>Headless CMS Integration</li>
                    <li>Algorithmic Design Layouts</li>
                  </ul>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-zinc-200 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="block text-zinc-400 tracking-wider uppercase mb-1">Current Focus</span>
                  <span className="font-bold text-black uppercase">Freelance Systems // Mobile Architecture</span>
                </div>
                <div>
                  <span className="block text-zinc-400 tracking-wider uppercase mb-1">Availability</span>
                  <span className="font-bold text-emerald-600 uppercase">Open for Global Commissions</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}