"use client";

import { motion } from "framer-motion";
import { EASE_IN_OUT } from "@/lib/motion";

const line = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.2, ease: EASE_IN_OUT } },
};

const dot = {
  hidden: { scale: 0, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { delay: 0.5, duration: 0.4 } },
};

export default function SectionDivider() {
  return (
    <motion.div
      className="section-dark relative overflow-hidden"
      aria-hidden="true"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.8 }}
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.12] blur-[100px]" />

      <div className="relative mx-auto flex max-w-6xl items-center gap-4 px-6 py-10 sm:py-12">
        {/* lines grow outward from the centre node */}
        <motion.span variants={line} style={{ originX: 1 }} className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-white/10" />
        <motion.span variants={dot} className="h-1 w-1 shrink-0 rounded-full bg-white/20" />

        <motion.span
          variants={{
            hidden: { scale: 0, rotate: -90 },
            show: { scale: 1, rotate: 0, transition: { type: "spring", stiffness: 200, damping: 14 } },
          }}
          className="relative mx-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/40"
        >
          <span className="absolute h-8 w-8 animate-ping rounded-full border border-accent/30 [animation-duration:2.4s]" />
          <span className="absolute h-8 w-8 rounded-full bg-accent/20 blur-md" />
          <span className="relative h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_#cdff3a]" />
        </motion.span>

        <motion.span variants={dot} className="h-1 w-1 shrink-0 rounded-full bg-white/20" />
        <motion.span variants={line} style={{ originX: 0 }} className="h-px flex-1 bg-gradient-to-l from-transparent via-white/10 to-white/10" />
      </div>
    </motion.div>
  );
}
