"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const LINKS = [
  { label: "About", href: "/#about" },
  { label: "Solutions", href: "/#services" },
  { label: "Work", href: "/#work" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-white/[0.08] bg-[#0a0a0a]/80 backdrop-blur-xl shadow-lg py-3"
            : "bg-transparent py-5"
        }`}
      >
        <nav className="container-px mx-auto flex max-w-[1400px] items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/#top"
            className="group flex shrink-0 items-center gap-2.5 whitespace-nowrap transition-opacity hover:opacity-90"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.08] border border-white/15 font-display text-xs font-extrabold text-white transition-all group-hover:border-accent group-hover:bg-accent group-hover:text-black">
              AA
            </span>
            <span className="font-display text-sm font-bold tracking-[0.18em] text-ink uppercase">
              Abdullah Azhar<span className="text-accent">.</span>
            </span>
          </Link>

          {/* Desktop Navigation Links (Floating Glass Capsule) */}
          <ul className="hidden shrink-0 items-center gap-1 whitespace-nowrap rounded-full border border-white/[0.12] bg-[#141512]/60 px-2 py-1.5 backdrop-blur-md lg:flex shadow-inner">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group relative block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-dark transition-colors hover:text-white"
                >
                  <span className="absolute inset-0 scale-90 rounded-full bg-white/[0.08] opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100" />
                  <span className="relative">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA & Mobile Menu Button */}
          <div className="flex shrink-0 items-center gap-3">
            <Link
              href="mailto:abdullahazharfarooq01@gmail.com"
              className="hidden sm:inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-accent px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black shadow-[0_0_20px_-3px_rgba(205,255,58,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_28px_rgba(205,255,58,0.65)]"
            >
              <span>Start a Project</span>
              <span className="text-sm">→</span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10 lg:hidden"
            >
              {mobileMenuOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 8h16M4 16h16" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden animate-fadeIn">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-lg"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div className="fixed inset-x-4 top-20 rounded-3xl border border-white/15 bg-[#111112] p-6 shadow-2xl animate-scaleUp">
            <ul className="flex flex-col gap-3">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-white/5 hover:text-accent"
                  >
                    <span>{link.label}</span>
                    <span className="text-muted-dark">→</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-white/10 pt-5">
              <Link
                href="mailto:abdullahazharfarooq01@gmail.com"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3.5 text-xs font-bold uppercase tracking-wider text-black transition-transform hover:scale-[1.02]"
              >
                <span>Start a Project</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
