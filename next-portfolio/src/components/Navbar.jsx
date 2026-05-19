"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-white/70 backdrop-blur-md py-4 shadow-sm" 
          : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        
        {/* Brand Logo - Typo Fixed */}
        <Link 
          href="/" 
          className="text-2xl font-black tracking-tighter uppercase text-black select-none"
        >
          VISHAL.
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest uppercase text-zinc-500">
          <Link href="/" className="hover:text-black transition-colors">
            Work
          </Link>
          <Link href="/#about" className="hover:text-black transition-colors">
            About
          </Link>
          
          <a 
            href="mailto:kumarvishal1627@gmail.com?subject=Project Inquiry - Vishal Kumar" 
            className="text-white bg-black px-5 py-2.5 rounded-sm hover:bg-zinc-800 transition-colors"
          >
            Contact
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-xs font-bold tracking-widest uppercase text-black">
          Menu
        </button>

      </div>
    </header>
  );
}