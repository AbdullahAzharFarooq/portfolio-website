"use client";

import { useRef } from "react";
import { motion, useSpring } from "framer-motion";

const SPRING = { stiffness: 220, damping: 15, mass: 0.4 };

/** Pulls its child toward the pointer while hovered, then springs back. */
export default function Magnetic({ children, strength = 0.35, className = "inline-block" }) {
  const ref = useRef(null);
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);

  const handleMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
