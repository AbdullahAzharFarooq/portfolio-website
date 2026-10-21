"use client";

import { motion } from "framer-motion";
import { EASE_IN_OUT } from "@/lib/motion";

/** Hairline divider that draws itself in from the left when scrolled into view. */
export default function DrawLine({ className = "", tone = "dark", delay = 0, origin = "left" }) {
  return (
    <motion.span
      aria-hidden="true"
      className={`block h-px ${tone === "dark" ? "bg-white/10" : "bg-black/10"} ${className}`}
      style={{ originX: origin === "center" ? 0.5 : 0 }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 1 }}
      transition={{ duration: 1.1, ease: EASE_IN_OUT, delay }}
    />
  );
}
