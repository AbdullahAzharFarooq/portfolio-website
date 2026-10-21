"use client";

import { motion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

const OFFSETS = {
  left: { x: -48 },
  right: { x: 48 },
  up: { y: 36 },
  down: { y: -36 },
  zoom: { scale: 0.92 },
  fade: {},
};

export default function Reveal({
  children,
  direction = "up", // "up" | "down" | "left" | "right" | "zoom" | "fade"
  delay = 0, // delay in ms, e.g. 100, 200
  duration = 0.8, // duration in seconds
  threshold = 0.12,
  rootMargin = "0px 0px -40px 0px",
  className = "",
  style = {},
  as = "div",
  triggerOnce = true,
  ...rest // e.g. data-* attributes
}) {
  const Component = motion[as] ?? motion.div;

  return (
    <Component
      {...rest}
      className={className}
      style={style}
      initial={{ opacity: 0, ...OFFSETS[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: triggerOnce, amount: threshold, margin: rootMargin }}
      transition={{ duration, delay: delay / 1000, ease: EASE_OUT }}
    >
      {children}
    </Component>
  );
}
