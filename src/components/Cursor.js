"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

// Position tracks the pointer 1:1; only the squash/stretch is smoothed.
const VELOCITY_SMOOTHING = { stiffness: 420, damping: 40, mass: 0.4 };
const SIZE_SPRING = { type: "spring", stiffness: 560, damping: 32 };
const INTERACTIVE = "a, button, [role='button'], [data-cursor]";
const TONE_SCOPE = "[data-cursor-tone], .section-light, .section-dark";
// tone = background under the pointer; "accent" is the lime Results band
const COLORS = { dark: "#cdff3a", light: "#0a0a0a", accent: "#0a0a0a" };

/**
 * Liquid blob cursor: sits exactly on the pointer, stretches along its
 * direction of travel, swells over anything clickable, becomes a labelled
 * disc over `data-cursor-label`, and flips lime/black so it stays visible on
 * dark, cream and lime sections. Only mounts on precise pointers and never
 * for reduced-motion users.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [label, setLabel] = useState(null);
  const [tone, setTone] = useState("dark");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Squash & stretch from a smoothed velocity so it never jitters.
  const vx = useSpring(useVelocity(x), VELOCITY_SMOOTHING);
  const vy = useSpring(useVelocity(y), VELOCITY_SMOOTHING);
  const speed = useTransform([vx, vy], ([a, b]) => Math.min(Math.hypot(a, b), 3000));
  const angle = useTransform([vx, vy], ([a, b]) => (Math.atan2(b, a) * 180) / Math.PI);
  const stretchX = useTransform(speed, [0, 3000], [1, 1.55]);
  const stretchY = useTransform(speed, [0, 3000], [1, 0.62]);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !reduce.matches);
    update();
    fine.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    let px = -100;
    let py = -100;
    let frame = 0;

    // Look at whatever is under the pointer. Runs on move *and* scroll, since
    // scrolling changes what's underneath without firing any pointer event.
    const inspect = () => {
      frame = 0;
      const el = document.elementFromPoint(px, py);
      if (!el) return;
      const labelled = el.closest("[data-cursor-label]");
      setLabel(labelled ? labelled.getAttribute("data-cursor-label") : null);
      setHovering(Boolean(el.closest(INTERACTIVE)));
      const scope = el.closest(TONE_SCOPE);
      setTone(scope?.dataset.cursorTone ?? (scope?.classList.contains("section-light") ? "light" : "dark"));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(inspect);
    };

    const move = (e) => {
      px = e.clientX;
      py = e.clientY;
      x.set(px);
      y.set(py);
      setVisible(true);
      schedule();
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    root.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      root.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const color = COLORS[tone];
  const size = hovering ? 44 : 12;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[10000]">
      <motion.div className="absolute left-0 top-0" style={{ x, y }}>
        {/* centred on the pointer so the stretch pivots around it */}
        <motion.div
          style={{ translateX: "-50%", translateY: "-50%", rotate: angle, scaleX: stretchX, scaleY: stretchY }}
        >
          <motion.div
            className="rounded-full border-2"
            animate={{
              width: size,
              height: size,
              opacity: visible && !label ? 1 : 0,
              scale: pressed ? 0.75 : 1,
              borderColor: color,
              backgroundColor: hovering ? `${color}26` : color,
              boxShadow: tone === "dark" ? "0 0 16px rgba(205,255,58,0.5)" : "0 0 0 rgba(0,0,0,0)",
            }}
            transition={SIZE_SPRING}
          />
        </motion.div>
      </motion.div>

      {/* labelled disc for "Preview"-style targets; dark on the lime band */}
      <AnimatePresence>
        {label && visible && (
          <motion.div
            key="label"
            className={`absolute left-0 top-0 flex h-24 w-24 items-center justify-center rounded-full text-[11px] font-bold uppercase tracking-[0.18em] ${
              tone === "accent"
                ? "bg-ink-dark text-accent shadow-[0_15px_40px_rgba(0,0,0,0.35)]"
                : "bg-accent text-black shadow-[0_0_40px_rgba(205,255,58,0.45)]"
            }`}
            style={{ x, y, translateX: "-50%", translateY: "-50%" }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 26 }}
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
