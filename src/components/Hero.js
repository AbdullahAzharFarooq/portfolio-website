"use client";

import { useEffect, useState } from "react";

const BADGES = [
  { label: "HubSpot", className: "left-[6%] top-[22%]", floatDelay: "0s", popDelay: "200ms" },
  { label: "Salesforce", className: "right-[7%] top-[18%]", floatDelay: "0.6s", popDelay: "350ms" },
  { label: "OpenAI", className: "left-[3%] top-[60%]", floatDelay: "1.2s", popDelay: "500ms" },
  { label: "Zoho", className: "right-[4%] top-[56%]", floatDelay: "1.8s", popDelay: "650ms" },
  { label: "Zapier", className: "left-[12%] top-[82%]", floatDelay: "0.3s", popDelay: "800ms" },
  { label: "Slack", className: "right-[13%] top-[80%]", floatDelay: "0.9s", popDelay: "950ms" },
];

const HIGHLIGHT_WORDS = ["an AI Agent", "a CRM Rebuild", "an Integration", "a Website"];

function FloatingBadge({ label, className, floatDelay, popDelay, isMounted }) {
  return (
    <div
      className={`pointer-events-none absolute hidden select-none md:flex ${className}`}
      style={{
        opacity: isMounted ? 1 : 0,
        transform: isMounted ? "none" : "scale(0.7) translateY(12px)",
        transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: popDelay,
      }}
    >
      <span
        className="animate-float flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-medium tracking-wide text-muted-dark backdrop-blur-md shadow-sm transition-colors hover:border-accent hover:text-white"
        style={{ animationDelay: floatDelay }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_#cdff3a]" />
        {label}
      </span>
    </div>
  );
}

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false);
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    // Trigger entrance immediately or right after preloader starts exiting
    const timer = setTimeout(() => setIsMounted(true), 150);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIdx((prev) => (prev + 1) % HIGHLIGHT_WORDS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="top"
      className="section-dark relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden pt-20 text-center"
    >
      {/* faint AI-network grid */}
      <div className="bg-grid absolute inset-0 opacity-80" aria-hidden="true" />

      {/* slow-rotating dashed ring, evokes an agent/network node */}
      <div
        className="animate-spin-slow pointer-events-none absolute h-[46rem] w-[46rem] rounded-full border border-dashed border-white/[0.06]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute h-[30rem] w-[30rem] rounded-full border border-white/[0.05]"
        aria-hidden="true"
      />

      {/* glowing radial ambients */}
      <div className="pointer-events-none absolute h-[36rem] w-[36rem] rounded-full bg-accent/[0.08] blur-[120px] animate-pulse-glow" />
      <div className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-1/4 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

      {/* Floating Network Badges */}
      {BADGES.map((b) => (
        <FloatingBadge key={b.label} {...b} isMounted={isMounted} />
      ))}

      <div className="container-px relative z-10 flex flex-col items-center">
        {/* Eyebrow: Slides smoothly from Left */}
        <div
          style={{
            opacity: isMounted ? 1 : 0,
            transform: isMounted ? "none" : "translateX(-50px)",
            transition: "opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)",
            transitionDelay: "100ms",
          }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
          <p className="font-display text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-muted-dark">
            Lost Leads <span className="text-accent">•</span> Manual Busywork <span className="text-accent">•</span> Slow Follow-Ups
          </p>
        </div>

        {/* Main Headline: Fluid Clamp preventing breaks on 320px */}
        <div
          style={{
            opacity: isMounted ? 1 : 0,
            transform: isMounted ? "none" : "translateY(40px)",
            transition: "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
            transitionDelay: "250ms",
          }}
        >
          <h1 className="font-display max-w-4xl text-[clamp(2.3rem,5.4vw,4.2rem)] font-bold leading-[1.12] tracking-[-0.01em]">
            Manual Work Is Quietly{" "}
            <br className="hidden sm:block" />
            <span className="font-script text-accent lowercase text-[0.9em]">
              costing
            </span>{" "}
            You Customers.
          </h1>
        </div>

        {/* Interactive Rotating Subtitle Tag with fixed min-width to eliminate layout shift */}
        <div
          style={{
            opacity: isMounted ? 1 : 0,
            transform: isMounted ? "none" : "translateY(30px)",
            transition: "opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)",
            transitionDelay: "380ms",
          }}
          className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm sm:text-base text-muted-dark"
        >
          <span>I find the bottleneck and build</span>
          <span className="inline-flex min-w-[145px] items-center justify-center rounded-md border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-display text-xs sm:text-sm font-bold text-accent transition-all duration-300">
            {HIGHLIGHT_WORDS[wordIdx]}
          </span>
        </div>

        {/* Paragraph: Clear, business-focused value proposition */}
        <div
          style={{
            opacity: isMounted ? 1 : 0,
            transform: isMounted ? "none" : "translateY(35px)",
            transition: "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
            transitionDelay: "480ms",
          }}
        >
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-dark sm:text-lg">
            Every business has a bottleneck — a lead that sits too long, a report built by hand, a handoff that drops the ball. I find that bottleneck and build whatever closes it, so your team spends time on customers instead of busywork.
          </p>
        </div>

        {/* CTAs: High-energy action buttons */}
        <div
          style={{
            opacity: isMounted ? 1 : 0,
            transform: isMounted ? "none" : "translateY(25px) translateX(20px)",
            transition: "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
            transitionDelay: "600ms",
          }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#work"
            className="group flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-black shadow-[0_0_25px_rgba(205,255,58,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(205,255,58,0.6)]"
          >
            <span>See Problems I&apos;ve Solved</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#contact"
            className="flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.03] px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-ink backdrop-blur-sm transition-all duration-300 hover:border-accent hover:bg-white/[0.08] hover:text-accent hover:scale-105"
          >
            <span>Tell Me Your Bottleneck</span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          opacity: isMounted ? 1 : 0,
          transition: "opacity 1.2s ease",
          transitionDelay: "800ms",
        }}
        className="animate-bounce-y absolute bottom-8 flex flex-col items-center gap-2 text-muted-dark"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
          <path
            d="M7 1v16m0 0 5-5m-5 5-5-5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
