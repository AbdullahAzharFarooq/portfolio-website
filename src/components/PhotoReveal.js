"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { EASE_IN_OUT } from "@/lib/motion";

const wipe = {
  hidden: { clipPath: "inset(100% 0% 0% 0% round 16px)" },
  // Drop the clip once open so the photo's drop shadow shows again.
  show: {
    clipPath: "inset(0% 0% 0% 0% round 16px)",
    transition: { duration: 1.3, ease: EASE_IN_OUT },
    transitionEnd: { clipPath: "none" },
  },
};

const zoom = {
  hidden: { scale: 1.25 },
  show: { scale: 1, transition: { duration: 1.3, ease: EASE_IN_OUT } },
};

/**
 * Unveils its child with a bottom-up clip wipe, then drifts it gently
 * against the scroll for depth. A rotating text badge orbits the corner.
 */
export default function PhotoReveal({ children, className = "" }) {
  const ref = useRef(null);
  // Observe the unclipped wrapper: browsers treat content inside a closed
  // clip-path as invisible, so it could never trigger its own reveal.
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [50, -50]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 220]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={`relative ${className}`}
    >
      <motion.div variants={wipe}>
        <motion.div variants={zoom}>{children}</motion.div>
      </motion.div>

      {/* rotating circular text badge */}
      <motion.div
        aria-hidden="true"
        variants={{
          hidden: { scale: 0, opacity: 0 },
          show: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 180, damping: 16, delay: 0.9 } },
        }}
        className="absolute -left-6 -top-6 z-10 hidden h-28 w-28 sm:block"
      >
        <div className="relative flex h-full w-full items-center justify-center rounded-full bg-ink-dark shadow-[0_15px_30px_-10px_rgba(0,0,0,0.5)]">
          <motion.svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" style={{ rotate }}>
            <defs>
              <path id="badge-circle" d="M50 50 m-37 0 a37 37 0 1 1 74 0 a37 37 0 1 1 -74 0" />
            </defs>
            <text className="fill-accent font-display text-[8px] font-bold uppercase">
              {/* textLength stretches the phrase to exactly one lap of the circle (2π·37) */}
              <textPath href="#badge-circle" textLength="230" lengthAdjust="spacing">
                AI Agents • CRM Workflows • Websites •
              </textPath>
            </text>
          </motion.svg>
          <span className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_12px_#cdff3a]" />
        </div>
      </motion.div>
    </motion.div>
  );
}
