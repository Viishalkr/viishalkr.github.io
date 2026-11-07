"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sanity Studio has its own chrome.
  if (pathname?.startsWith("/studio")) return null;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? "bg-white/90 backdrop-blur-md border-b border-zinc-200" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex justify-between items-center">

        {/* Logo */}
        <Link
          href="/"
          className="text-sm font-black tracking-widest uppercase text-black hover:text-zinc-500 transition-colors"
        >
          VISHAL KUMAR
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-6 md:gap-8">
          <Link
            href="/#work"
            className="text-xs font-bold tracking-widest uppercase text-zinc-500 hover:text-black transition-colors"
          >
            WORK
          </Link>
          <Link
            href="/#about"
            className="text-xs font-bold tracking-widest uppercase text-zinc-500 hover:text-black transition-colors"
          >
            ABOUT
          </Link>
          <a
            href="/vishal-kumar-cv.pdf"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-bold tracking-widest uppercase text-zinc-500 hover:text-black transition-colors"
          >
            CV
          </a>
          <a
            href="mailto:kumarvishal1627@gmail.com?subject=Project Inquiry - Vishal Kumar"
            className="text-xs font-bold tracking-widest uppercase bg-black text-white px-5 py-2.5 hover:bg-zinc-800 transition-colors"
          >
            CONTACT
          </a>
        </div>

      </div>
    </nav>
  );
}
