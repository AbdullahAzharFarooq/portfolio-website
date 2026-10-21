"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import Reveal from "@/components/Reveal";
import SplitText from "@/components/SplitText";
import { EASE_OUT } from "@/lib/motion";

const STEPS = [
  {
    n: "01",
    phase: "Step 1 · Diagnose",
    title: "Find The Real Bottleneck",
    desc: "I start with your problem, not a tech wishlist — digging into where deals stall, where data gets retyped, and where your team quietly burns hours every week.",
    deliverable: "A prioritized list of what to fix, and why",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
        <path d="M11 8v6M8 11h6" />
      </svg>
    ),
  },
  {
    n: "02",
    phase: "Step 2 · Design",
    title: "Design How It Should Work",
    desc: "Before any code, I map exactly how data should move between your tools and where decisions get made — so the system fits how your team actually works.",
    deliverable: "A clear plan you can review before I build",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect width="7" height="7" x="3" y="3" rx="1.5" />
        <rect width="7" height="7" x="14" y="3" rx="1.5" />
        <rect width="7" height="7" x="14" y="14" rx="1.5" />
        <rect width="7" height="7" x="3" y="14" rx="1.5" />
        <path d="M10 6.5h4M10 17.5h4M6.5 10v4M17.5 10v4" />
      </svg>
    ),
  },
  {
    n: "03",
    phase: "Step 3 · Build",
    title: "Build The Agent Or Workflow",
    desc: "I build the AI agent, chatbot, or CRM logic itself — trained on your data, with guardrails so it never guesses when unsure, and hands off to a human when it should.",
    deliverable: "A working system, not a demo",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a8 8 0 0 0-8 8c0 3.2 1.9 6 4.7 7.2V20a2 2 0 0 0 2 2h2.6a2 2 0 0 0 2-2v-2.8c2.8-1.2 4.7-4 4.7-7.2a8 8 0 0 0-8-8Z" />
        <path d="M9.5 9h.01M14.5 9h.01M10 14a3.5 3.5 0 0 0 4 0" />
      </svg>
    ),
  },
  {
    n: "04",
    phase: "Step 4 · Connect",
    title: "Connect It To Your Stack",
    desc: "The system goes live inside the tools you already use — HubSpot, Salesforce, Zoho, Slack — so nobody has to learn new software or copy data between screens.",
    deliverable: "Everything wired together and talking",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    n: "05",
    phase: "Step 5 · Stress-Test",
    title: "Break It Before Your Customers Do",
    desc: "I run it through high volumes, odd edge cases, and failure scenarios before customers ever see it — so it holds up on a bad day, not just in a demo.",
    deliverable: "A system tested against real-world mess",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    n: "06",
    phase: "Step 6 · Launch",
    title: "Launch, Then Keep It Honest",
    desc: "I ship it live, walk your team through how it works, and keep an eye on it after launch — tuning it as your business changes instead of disappearing after handoff.",
    deliverable: "A live system, a trained team, ongoing support",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 15 2 2 4-4" />
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M3 9h18" />
      </svg>
    ),
  },
];

const roll = {
  initial: { y: "100%", opacity: 0 },
  animate: { y: "0%", opacity: 1, transition: { duration: 0.4, ease: EASE_OUT } },
  exit: { y: "-100%", opacity: 0, transition: { duration: 0.25, ease: EASE_OUT } },
};

// Lines the first card up with the header's left edge (container-px inside a 1400px max width).
const GUTTER = "clamp(1.5rem, 5vw, 6rem)";
const EDGE = `calc(${GUTTER} + max(0px, (100% - 2 * ${GUTTER} - 1400px) / 2))`;

function StepCard({ step, active }) {
  return (
    <article
      data-step
      className={`relative flex w-[min(82vw,380px)] shrink-0 snap-start flex-col overflow-hidden rounded-[28px] border p-7 transition-colors duration-500 sm:p-8 ${
        active ? "border-accent/50 bg-[#15160f]" : "border-white/10 bg-[#101110] hover:border-white/20"
      }`}
    >
      {/* glow that follows the active card */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/25 blur-3xl transition-opacity duration-700 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="relative flex items-start justify-between">
        <span
          className={`font-display text-6xl font-extrabold leading-none transition-colors duration-500 sm:text-7xl ${
            active ? "text-accent" : "text-outline-dark"
          }`}
        >
          {step.n}
        </span>
        <span
          className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-500 ${
            active
              ? "border-accent bg-accent text-black shadow-[0_0_28px_rgba(205,255,58,0.5)]"
              : "border-white/15 text-muted-dark"
          }`}
        >
          {step.icon}
        </span>
      </div>

      <p className="relative mt-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent/85">{step.phase}</p>
      <h3 className="font-display relative mt-2 text-2xl font-bold leading-snug text-white">{step.title}</h3>
      <p className="relative mt-3 text-sm leading-relaxed text-muted-dark">{step.desc}</p>

      <div className="relative mt-auto pt-7">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-1.5 pr-4">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs text-accent">✓</span>
          <span className="text-xs font-medium text-white/80">{step.deliverable}</span>
        </div>
      </div>
    </article>
  );
}

function FinaleCard() {
  return (
    <article
      data-cursor-tone="accent"
      className="relative flex w-[min(82vw,400px)] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-[28px] bg-accent p-8 text-ink-dark"
    >
      <div aria-hidden="true" className="animate-spin-slow pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full border border-dashed border-black/20" />
      <div className="relative">
        <p className="font-script text-2xl text-black/60">That&apos;s the whole process</p>
        <p className="font-display mt-3 text-3xl font-extrabold leading-[1.1] sm:text-4xl">
          Your bottleneck could be step 01.
        </p>
        <p className="mt-4 max-w-xs text-sm leading-relaxed text-black/70">
          Tell me what&apos;s slowing your team down — I&apos;ll come back with where I&apos;d start and what the fix looks like.
        </p>
      </div>
      <a
        href="#contact"
        draggable={false}
        className="group relative mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-ink-dark py-2 pl-5 pr-2 text-sm font-bold text-white transition-shadow duration-300 hover:shadow-[0_18px_40px_-15px_rgba(0,0,0,0.6)]"
      >
        Tell me your bottleneck
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-black transition-transform duration-300 group-hover:rotate-45">
          ↗
        </span>
      </a>
    </article>
  );
}

/**
 * Click-and-drag horizontal scrolling for mouse users (touch and trackpads
 * already scroll natively). Snapping is paused while dragging, and a quick
 * flick carries on before settling on the nearest card. A drag never
 * triggers the click of a link it started on.
 */
function useDragScroll(ref) {
  useEffect(() => {
    const el = ref.current;
    let down = false;
    let moved = false;
    let startX = 0;
    let startLeft = 0;
    let lastX = 0;
    let lastT = 0;
    let velocity = 0;

    const onDown = (e) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      down = true;
      moved = false;
      startX = lastX = e.clientX;
      startLeft = el.scrollLeft;
      lastT = performance.now();
      velocity = 0;
    };
    const onMove = (e) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (!moved) {
        if (Math.abs(dx) < 5) return;
        moved = true;
        el.style.scrollSnapType = "none";
        el.style.scrollBehavior = "auto";
        el.classList.add("select-none");
      }
      el.scrollLeft = startLeft - dx;
      const now = performance.now();
      velocity = (e.clientX - lastX) / Math.max(1, now - lastT);
      lastX = e.clientX;
      lastT = now;
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      if (!moved) return;
      el.classList.remove("select-none");
      el.style.scrollSnapType = "";
      el.style.scrollBehavior = "";
      // carry the release speed a little; the browser then snaps to the nearest card
      el.scrollBy({ left: -velocity * 260, behavior: "smooth" });
    };
    const onClick = (e) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };

    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    el.addEventListener("click", onClick, true);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      el.removeEventListener("click", onClick, true);
    };
  }, [ref]);
}

export default function Process() {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const progress = useMotionValue(0);
  const progressScale = useSpring(progress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  useDragScroll(trackRef);

  // Track which card sits at the start edge, how far along we are, and whether the arrows can move.
  useEffect(() => {
    const el = trackRef.current;
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = el.scrollWidth - el.clientWidth;
      const left = el.scrollLeft;
      progress.set(max > 0 ? left / max : 0);
      setAtStart(left <= 4);
      setAtEnd(left >= max - 4);

      const cards = el.querySelectorAll("[data-step]");
      if (left >= max - 4) {
        setActive(cards.length - 1);
        return;
      }
      const origin = cards[0].offsetLeft;
      let best = 0;
      let bestDist = Infinity;
      cards.forEach((c, i) => {
        const dist = Math.abs(c.offsetLeft - origin - left);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActive(best);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    el.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [progress]);

  const nudge = (dir) => {
    const el = trackRef.current;
    const card = el.querySelector("[data-step]");
    el.scrollBy({ left: dir * (card.offsetWidth + 24), behavior: "smooth" });
  };

  const current = STEPS[active];

  return (
    <section id="process" className="section-dark relative overflow-hidden pt-16 pb-24 sm:pt-20 sm:pb-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-grid absolute inset-0 opacity-50" />
        <div className="absolute left-1/3 top-1/2 h-[36rem] w-[36rem] -translate-y-1/2 rounded-full bg-accent/[0.06] blur-[150px]" />
      </div>

      {/* header */}
      <div className="container-px relative">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal direction="left" delay={100} duration={0.85}>
              <p className="font-script mb-2 text-2xl text-accent">How I work</p>
            </Reveal>
            <SplitText
              as="h2"
              text="From Problem To Production"
              className="font-display block text-4xl font-extrabold leading-[1.05] text-ink sm:text-5xl lg:text-6xl"
            />
          </div>

          <Reveal direction="right" delay={200} duration={0.85} className="md:text-right">
            <p className="max-w-sm text-sm leading-relaxed text-muted-dark md:ml-auto">
              Six steps that start with what&apos;s broken in your business, not a tech stack — so what gets built actually fixes it.
            </p>
            <div className="mt-5 flex items-center gap-4 md:justify-end">
              <span className="font-display flex items-baseline gap-1.5 leading-none">
                <span className="relative inline-flex h-8 overflow-hidden text-3xl font-extrabold text-accent">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span key={current.n} {...roll} className="block">
                      {current.n}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="text-sm font-bold text-white/30">/ 0{STEPS.length}</span>
              </span>
              <span className="flex gap-2">
                <button
                  type="button"
                  onClick={() => nudge(-1)}
                  disabled={atStart}
                  aria-label="Previous step"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-all duration-300 hover:border-accent hover:bg-accent hover:text-black disabled:pointer-events-none disabled:opacity-30"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => nudge(1)}
                  disabled={atEnd}
                  aria-label="Next step"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-all duration-300 hover:border-accent hover:bg-accent hover:text-black disabled:pointer-events-none disabled:opacity-30"
                >
                  →
                </button>
              </span>
            </div>
          </Reveal>
        </div>
      </div>

      {/* draggable, swipeable card rail */}
      <Reveal direction="up" delay={150} duration={0.9} className="relative mt-12">
        <div
          ref={trackRef}
          role="region"
          aria-label="Process steps — drag or scroll sideways"
          tabIndex={0}
          onDragStart={(e) => e.preventDefault()}
          style={{ paddingLeft: EDGE, paddingRight: EDGE, scrollPaddingLeft: EDGE }}
          className="no-scrollbar flex cursor-grab snap-x snap-mandatory items-stretch gap-6 overflow-x-auto overscroll-x-contain scroll-smooth pb-2 outline-none active:cursor-grabbing"
        >
          {STEPS.map((step, i) => (
            <StepCard key={step.n} step={step} active={i === active} />
          ))}
          <FinaleCard />
        </div>
      </Reveal>

      {/* progress + hint */}
      <div className="container-px relative mt-8">
        <div className="mx-auto flex max-w-[1400px] items-center gap-5">
          <span className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-white/10">
            <motion.span
              className="absolute inset-0 origin-left bg-accent shadow-[0_0_10px_rgba(205,255,58,0.7)]"
              style={{ scaleX: progressScale }}
            />
          </span>
          <span className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-dark">
            Drag or swipe ⟷
          </span>
        </div>
      </div>
    </section>
  );
}
