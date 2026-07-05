"use client";

import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);

  useGSAP(() => {
    gsap.from(".footer-reveal", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 80%",
      },
    });
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="bg-black text-white pt-32 pb-12 px-6 md:px-12 relative overflow-hidden selection:bg-white selection:text-black">
      <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[60vh]">

        {/* CTA */}
        <div>
          <div className="overflow-hidden mb-4">
            <p className="footer-reveal text-xs font-bold tracking-[0.3em] uppercase text-zinc-500">
              OPEN FOR COMMISSIONS // 2026
            </p>
          </div>
          <div className="overflow-hidden">
            <a
              href="mailto:kumarvishal1627@gmail.com?subject=Project Inquiry - Vishal Kumar"
              className="footer-reveal block text-5xl md:text-[8vw] font-black tracking-tighter uppercase leading-[0.85] hover:text-zinc-400 transition-colors duration-500"
            >
              LET'S TALK<br />BUSINESS.
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-reveal mt-24 border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 text-xs font-bold tracking-widest uppercase text-zinc-400">
          <div className="flex gap-8">
            <a href="https://www.linkedin.com/in/vishal-kumar-3a81271a1" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href="https://github.com/Viishalkr" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              GitHub
            </a>
            <a href="https://www.instagram.com/viishal.kr" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              Instagram
            </a>
          </div>
          <div className="text-zinc-600">
            DESIGNED & BUILT BY VISHAL KUMAR
          </div>
        </div>

      </div>
    </footer>
  );
}
