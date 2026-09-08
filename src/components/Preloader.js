"use client";

import { useEffect, useState } from "react";

const STATUS_MESSAGES = [
  { threshold: 30, text: "initializing workflows" },
  { threshold: 65, text: "connecting AI agents" },
  { threshold: 99, text: "syncing CRM architecture" },
];

export default function Preloader() {
  const [display, setDisplay] = useState(0);
  const [phase, setPhase] = useState("loading"); // "loading" | "exiting" | "hidden"

  useEffect(() => {
    let raf;
    let current = 0;
    let target = 95;
    let finishing = false;

    const loadingTick = () => {
      current += (target - current) * 0.1;
      setDisplay(Math.min(99, Math.round(current)));
      if (!finishing) raf = requestAnimationFrame(loadingTick);
    };
    raf = requestAnimationFrame(loadingTick);

    const finishTick = () => {
      current += (100 - current) * 0.3;
      if (100 - current > 0.4) {
        setDisplay(Math.round(current));
        raf = requestAnimationFrame(finishTick);
      } else {
        setDisplay(100);
        setTimeout(() => setPhase("exiting"), 260);
        setTimeout(() => setPhase("hidden"), 260 + 600);
      }
    };

    const minDelay = new Promise((resolve) => setTimeout(resolve, 700));
    const pageLoad =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise((resolve) => window.addEventListener("load", resolve, { once: true }));

    Promise.all([minDelay, pageLoad]).then(() => {
      finishing = true;
      current = Math.max(current, 92);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(finishTick);
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    document.body.style.overflow = phase === "hidden" ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  if (phase === "hidden") return null;

  const exiting = phase === "exiting";
  const activeStatus =
    display >= 100
      ? "ready"
      : STATUS_MESSAGES.find((s) => display <= s.threshold)?.text || "syncing CRM architecture";

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] flex min-h-[100dvh] flex-col items-center justify-center elegant-loader-bg transition-all duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)] select-none ${
        exiting ? "pointer-events-none scale-105 opacity-0 blur-sm" : "scale-100 opacity-100 blur-none"
      }`}
    >
      {/* Subtle Background Grid */}
      <div className="bg-grid absolute inset-0 opacity-30 pointer-events-none" />

      {/* Elegant Center Spinner Architecture */}
      <div className="relative mb-7 flex items-center justify-center">
        {/* Soft Ambient Lime Glow — breathes with progress */}
        <div
          className="absolute h-40 w-40 rounded-full bg-accent/15 blur-2xl transition-opacity duration-500"
          style={{ opacity: 0.5 + (display / 100) * 0.5 }}
        />

        {/* Outer Hairline Ring (Clockwise) */}
        <div
          className="h-28 w-28 rounded-full border-2 border-white/[0.08] border-t-accent shadow-[0_0_24px_rgba(205,255,58,0.22)] animate-spin sm:h-32 sm:w-32"
          style={{ animationDuration: "1.8s" }}
        />

        {/* Inner Delicate Counter-Rotating Ring */}
        <div
          className="absolute h-20 w-20 rounded-full border border-white/10 border-b-accent/70 opacity-90 animate-spin-reverse sm:h-[5.5rem] sm:w-[5.5rem]"
          style={{ animationDuration: "2.6s" }}
        />

        {/* Center Minimalist Brand Monogram */}
        <div className="absolute flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#111112] shadow-md">
          <span className="font-display text-xs font-extrabold tracking-wider text-white">
            AA<span className="text-accent">.</span>
          </span>
        </div>
      </div>

      {/* Brand & Counter */}
      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        <span className="font-display text-[11px] font-bold uppercase tracking-[0.4em] text-muted-dark">
          Abdullah Azhar <span className="text-accent">•</span> Portfolio
        </span>

        {/* Big Numerical Progress */}
        <div className="font-display mt-3 flex items-baseline leading-none tabular-nums text-ink">
          <span className="text-5xl font-extrabold tracking-tight sm:text-6xl">
            {String(display).padStart(2, "0")}
          </span>
          <span className="ml-1 text-xl font-bold text-accent sm:text-2xl">%</span>
        </div>

        {/* Hairline Minimal Progress Bar */}
        <div className="relative mt-5 h-[2px] w-48 overflow-hidden rounded-full bg-white/10 sm:w-64">
          <div
            className="h-full rounded-full bg-accent shadow-[0_0_10px_rgba(205,255,58,0.6)] transition-[width] duration-150 ease-out"
            style={{ width: `${display}%` }}
          />
        </div>

        {/* Script Status — crossfades on change */}
        <p key={activeStatus} className="font-script animate-preloader-status mt-4 text-xl text-muted-dark">
          {activeStatus}
        </p>
      </div>
    </div>
  );
}
