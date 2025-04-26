"use client";
import { ArrowLeft, Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const Navigation = () => {
  const ref = useRef(null);
  const [isIntersecting, setIntersecting] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Close mobile menu on viewport change
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header ref={ref} className="relative">
      <div
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur duration-200 border-b ${
          isIntersecting
            ? "bg-zinc-900/0 border-transparent"
            : "bg-zinc-900/50 border-zinc-800"
        }`}
      >
        <div className="container flex items-center justify-between p-6 mx-auto">
          {/* Logo / Back Button */}
          <Link
            href="/"
            className="duration-200 text-zinc-300 hover:text-zinc-100"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex flex-row-reverse items-center gap-8">
            <Link
              href="/projects"
              className="duration-200 text-zinc-400 hover:text-zinc-100"
            >
              Projects
            </Link>
            <Link
              href="/contact"
              className="duration-200 text-zinc-400 hover:text-zinc-100"
            >
              Contact
            </Link>
            <Link
              href="/experience"
              className="duration-200 text-zinc-400 hover:text-zinc-100"
            >
              Experience
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden duration-200 text-zinc-400 hover:text-zinc-100"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Panel */}
        <div className={`${mobileOpen ? 'flex' : 'hidden'} flex-col bg-zinc-900/95 border-t border-zinc-800 md:hidden`}>
          <Link
            href="/projects"
            className="px-6 py-4 border-b border-zinc-800 duration-200 text-zinc-400 hover:text-zinc-100"
          >
            Projects
          </Link>
          <Link
            href="/contact"
            className="px-6 py-4 border-b border-zinc-800 duration-200 text-zinc-400 hover:text-zinc-100"
          >
            Contact
          </Link>
          <Link
            href="/experience"
            className="px-6 py-4 duration-200 text-zinc-400 hover:text-zinc-100"
          >
            Experience
          </Link>
        </div>
      </div>
    </header>
  );
};

export { Navigation };
