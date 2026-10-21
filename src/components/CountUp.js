"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

/**
 * Counts a stat like "+52%", "3.4x" or "<10s" up from zero when it scrolls
 * into view. Values that aren't a single number (e.g. "24/7") render as-is.
 * The server HTML always carries the real value, so crawlers see it.
 */
export default function CountUp({ value, className = "", duration = 1.6 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const match = /^([^\d]*)(\d+(?:\.\d+)?)([^\d]*)$/.exec(value);

  useEffect(() => {
    if (!inView || !match) return;
    const [, prefix, num, suffix] = match;
    const target = parseFloat(num);
    if (target === 0) return;
    const decimals = num.includes(".") ? num.split(".")[1].length : 0;
    const node = ref.current;

    const controls = animate(0, target, {
      duration,
      ease: EASE_OUT,
      onUpdate: (v) => {
        node.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`;
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {value}
    </span>
  );
}
