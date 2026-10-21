"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useIntro } from "@/components/MotionProvider";
import { EASE_IN_OUT, EASE_OUT } from "@/lib/motion";

const STATUS_MESSAGES = [
  { threshold: 30, text: "initializing workflows" },
  { threshold: 65, text: "connecting AI agents" },
  { threshold: 99, text: "syncing CRM architecture" },
];

// Curved trailing edge that flattens as the curtain lifts.
const CURVE_FROM = "M0 0 L100 0 L100 0 Q50 100 0 0 Z";
const CURVE_TO = "M0 0 L100 0 L100 0 Q50 0 0 0 Z";

const content = {
  show: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -40, transition: { duration: 0.45, ease: EASE_IN_OUT } },
};

export default function Preloader() {
  const { finishIntro } = useIntro();
  const [display, setDisplay] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf;
    let exitTimer;
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
        exitTimer = setTimeout(() => setDone(true), 280);
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

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(exitTimer);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
    // Start the hero entrance while the curtain is still lifting.
    if (done) finishIntro();
    return () => {
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  const activeStatus =
    display >= 100
      ? "ready"
      : STATUS_MESSAGES.find((s) => display <= s.threshold)?.text || "syncing CRM architecture";

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          aria-hidden="true"
          initial="show"
          animate="show"
          exit="exit"
          variants={{
            show: { y: 0 },
            exit: { y: "-100%", transition: { duration: 0.9, ease: EASE_IN_OUT, delay: 0.15 } },
          }}
          className="fixed inset-0 z-[9999] flex min-h-[100dvh] flex-col items-center justify-center elegant-loader-bg select-none"
        >
          {/* Subtle Background Grid */}
          <div className="bg-grid absolute inset-0 opacity-30 pointer-events-none" />

          {/* Curved bottom edge of the curtain */}
          <svg
            className="pointer-events-none absolute left-0 top-full h-[12vh] w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <motion.path
              fill="#0a0a0a"
              variants={{
                show: { d: CURVE_FROM },
                exit: { d: CURVE_TO, transition: { duration: 0.9, ease: EASE_IN_OUT, delay: 0.25 } },
              }}
            />
          </svg>

          <motion.div variants={content} className="flex flex-col items-center">
            {/* Elegant Center Spinner Architecture */}
            <motion.div
              className="relative mb-7 flex items-center justify-center"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: EASE_OUT }}
            >
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
                <Image
                  src="/images/logo-mark.png"
                  alt=""
                  width={327}
                  height={296}
                  priority
                  className="h-6 w-6 object-contain"
                />
              </div>
            </motion.div>

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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
