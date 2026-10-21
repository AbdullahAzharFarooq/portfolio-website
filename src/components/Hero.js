"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Magnetic from "@/components/Magnetic";
import { MaskWord } from "@/components/SplitText";
import { useIntro } from "@/components/MotionProvider";
import { EASE_OUT } from "@/lib/motion";

const BADGES = [
  { label: "HubSpot", className: "left-[6%] top-[22%]", floatDelay: "0s", depth: 1.4 },
  { label: "Salesforce", className: "right-[7%] top-[18%]", floatDelay: "0.6s", depth: -1.1 },
  { label: "OpenAI", className: "left-[3%] top-[60%]", floatDelay: "1.2s", depth: -1.6 },
  { label: "Zoho", className: "right-[4%] top-[56%]", floatDelay: "1.8s", depth: 1.2 },
  { label: "Zapier", className: "left-[12%] top-[82%]", floatDelay: "0.3s", depth: 0.8 },
  { label: "Slack", className: "right-[13%] top-[80%]", floatDelay: "0.9s", depth: -0.9 },
];

const HIGHLIGHT_WORDS = ["an AI Agent", "a CRM Rebuild", "an Integration", "a Website"];

const PARALLAX_SPRING = { stiffness: 60, damping: 20, mass: 0.6 };

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const rise = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: EASE_OUT } },
};

// No blur here: a lingering filter would stop the buttons' backdrop-blur from working.
const riseSolid = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT } },
};

const headline = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

function FloatingBadge({ label, className, floatDelay, depth, index, pointerX, pointerY }) {
  const x = useTransform(pointerX, (v) => v * 40 * depth);
  const y = useTransform(pointerY, (v) => v * 40 * depth);

  return (
    <motion.div
      className={`pointer-events-none absolute hidden select-none md:flex ${className}`}
      style={{ x, y }}
      variants={{
        hidden: { opacity: 0, scale: 0.6 },
        show: {
          opacity: 1,
          scale: 1,
          transition: { type: "spring", stiffness: 160, damping: 14, delay: 0.5 + index * 0.12 },
        },
      }}
    >
      <span
        className="animate-float flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-medium tracking-wide text-muted-dark backdrop-blur-md shadow-sm"
        style={{ animationDelay: floatDelay }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_#cdff3a]" />
        {label}
      </span>
    </motion.div>
  );
}

export default function Hero() {
  const { introDone } = useIntro();
  const reduceMotion = useReducedMotion();
  const [wordIdx, setWordIdx] = useState(0);
  const sectionRef = useRef(null);

  // Pointer position, normalised to -0.5..0.5 for parallax and in px for the spotlight.
  const pointerX = useSpring(0, PARALLAX_SPRING);
  const pointerY = useSpring(0, PARALLAX_SPRING);
  const spotX = useMotionValue(-1000);
  const spotY = useMotionValue(-1000);
  const spotlight = useMotionTemplate`radial-gradient(560px circle at ${spotX}px ${spotY}px, rgba(205,255,58,0.10), transparent 70%)`;

  // Content drifts up and fades as the hero scrolls away.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 160]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 0.94]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 90]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIdx((prev) => (prev + 1) % HIGHLIGHT_WORDS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handlePointerMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const rect = sectionRef.current.getBoundingClientRect();
    spotX.set(e.clientX - rect.left);
    spotY.set(e.clientY - rect.top);
    if (reduceMotion) return;
    pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.section
      ref={sectionRef}
      id="top"
      onPointerMove={handlePointerMove}
      initial="hidden"
      animate={introDone ? "show" : "hidden"}
      className="section-dark relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden pt-20 text-center"
    >
      {/* faint AI-network grid */}
      <motion.div className="bg-grid absolute inset-0 opacity-80" style={{ y: gridY }} aria-hidden="true" />

      {/* pointer-following lime spotlight */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: spotlight }}
      />

      {/* slow-rotating dashed ring, evokes an agent/network node */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute"
        variants={{
          hidden: { opacity: 0, scale: 0.8 },
          show: { opacity: 1, scale: 1, transition: { duration: 1.6, ease: EASE_OUT } },
        }}
      >
        <div className="animate-spin-slow h-[46rem] w-[46rem] rounded-full border border-dashed border-white/[0.06]" />
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute h-[30rem] w-[30rem] rounded-full border border-white/[0.05]"
        variants={{
          hidden: { opacity: 0, scale: 0.6 },
          show: { opacity: 1, scale: 1, transition: { duration: 1.4, ease: EASE_OUT, delay: 0.1 } },
        }}
      />

      {/* glowing radial ambients */}
      <div className="pointer-events-none absolute h-[36rem] w-[36rem] rounded-full bg-accent/[0.08] blur-[120px] animate-pulse-glow" />
      <div className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-1/4 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

      {/* Floating Network Badges */}
      {BADGES.map((b, i) => (
        <FloatingBadge key={b.label} {...b} index={i} pointerX={pointerX} pointerY={pointerY} />
      ))}

      <motion.div
        className="container-px relative z-10 flex flex-col items-center"
        style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
        variants={stagger}
      >
        {/* Eyebrow */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: -16, scale: 0.9 },
            show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: EASE_OUT } },
          }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 backdrop-blur-sm"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          <p className="font-display text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-muted-dark">
            Lost Leads <span className="text-accent">•</span> Manual Busywork <span className="text-accent">•</span> Slow Follow-Ups
          </p>
        </motion.div>

        {/* Main Headline: words rise out of a mask one by one */}
        <motion.h1
          variants={headline}
          className="font-display max-w-4xl text-[clamp(2.3rem,5.4vw,4.2rem)] font-bold leading-[1.12] tracking-[-0.01em]"
        >
          <MaskWord>Manual</MaskWord> <MaskWord>Work</MaskWord> <MaskWord>Is</MaskWord>{" "}
          <MaskWord>Quietly</MaskWord> <br className="hidden sm:block" />
          <span className="relative inline-block">
            <MaskWord className="font-script text-accent lowercase text-[0.9em]">costing</MaskWord>
            {/* hand-drawn underline that sketches itself in */}
            <svg
              aria-hidden="true"
              className="absolute -bottom-1 left-0 h-3 w-full overflow-visible"
              viewBox="0 0 100 12"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M2 8 C 22 2, 48 2, 64 6 S 92 10, 98 4"
                fill="none"
                stroke="#cdff3a"
                strokeWidth="2.5"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                variants={{
                  hidden: { pathLength: 0, opacity: 0 },
                  show: {
                    pathLength: 1,
                    opacity: 1,
                    transition: { duration: 0.9, ease: "easeInOut", delay: 0.9 },
                  },
                }}
              />
            </svg>
          </span>{" "}
          <MaskWord>You</MaskWord> <MaskWord>Customers.</MaskWord>
        </motion.h1>

        {/* Rotating subtitle tag — words roll through a fixed-width pill */}
        <motion.div
          variants={rise}
          className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm sm:text-base text-muted-dark"
        >
          <span>I find the bottleneck and build</span>
          <span className="relative inline-flex h-7 min-w-[150px] items-center justify-center overflow-hidden rounded-md border border-accent/40 bg-accent/10 px-2.5 font-display text-xs sm:text-sm font-bold text-accent">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={HIGHLIGHT_WORDS[wordIdx]}
                initial={{ y: "100%", opacity: 0, filter: "blur(4px)" }}
                animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                exit={{ y: "-100%", opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
                className="block whitespace-nowrap"
              >
                {HIGHLIGHT_WORDS[wordIdx]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.div>

        {/* Paragraph: Clear, business-focused value proposition */}
        <motion.p variants={rise} className="mt-6 max-w-xl text-base leading-relaxed text-muted-dark sm:text-lg">
          Every business has a bottleneck — a lead that sits too long, a report built by hand, a handoff that drops the ball. I find that bottleneck and build whatever closes it, so your team spends time on customers instead of busywork.
        </motion.p>

        {/* CTAs: magnetic action buttons */}
        <motion.div variants={riseSolid} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <a
              href="#work"
              className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-accent px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-black shadow-[0_0_25px_rgba(205,255,58,0.35)] transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(205,255,58,0.6)]"
            >
              {/* sheen sweep */}
              <span className="pointer-events-none absolute inset-y-0 -left-full w-1/2 skew-x-[-20deg] bg-white/50 transition-[left] duration-700 ease-out group-hover:left-[150%]" />
              <span className="relative">See Problems I&apos;ve Solved</span>
              <span className="relative transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              className="flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.03] px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-ink backdrop-blur-sm transition-colors duration-300 hover:border-accent hover:bg-white/[0.08] hover:text-accent"
            >
              <span>Tell Me Your Bottleneck</span>
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div className="absolute bottom-8 hidden sm:block" style={{ opacity: contentOpacity }}>
        <motion.a
          href="#about"
          aria-label="Scroll to About section"
          variants={{
            hidden: { opacity: 0, y: -10 },
            show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE_OUT, delay: 1.2 } },
          }}
          className="flex flex-col items-center gap-2 text-muted-dark transition-colors hover:text-accent"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <span className="relative flex h-9 w-5 justify-center rounded-full border border-white/25 pt-1.5">
            <span className="animate-bounce-y h-2 w-[3px] rounded-full bg-accent" />
          </span>
        </motion.a>
      </motion.div>
    </motion.section>
  );
}
