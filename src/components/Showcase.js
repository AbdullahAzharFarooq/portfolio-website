"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import DrawLine from "@/components/DrawLine";
import Reveal from "@/components/Reveal";
import SplitText from "@/components/SplitText";
import VelocityMarquee from "@/components/VelocityMarquee";
import { EASE_OUT } from "@/lib/motion";

const AUTOPLAY_MS = 5500;

const ICONS = {
  bell: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0",
  user: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M19 8v6M22 11h-6",
  chat: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM22 6l-10 7L2 6",
  report: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 18v-4M12 18v-6M16 18v-2",
  send: "M22 2 11 13M22 2l-7 20-4-9-9-4z",
  check: "M20 6 9 17l-5-5",
};

// Each screen is one real case study. Figures in the events come from that project's stats.
const SLIDES = [
  {
    slug: "outbound-qualifier-agent",
    client: "B2B SaaS Sales Team",
    photo: "/images/case-ai-sales.jpg",
    brand: "TryYourSaaS",
    nav: ["Product", "Pricing", "Customers"],
    cta: "Start free",
    headline: "Qualify every lead automatically.",
    caption: "Inbound lead, scored and routed.",
    events: [
      { icon: "user", title: "New lead · 40-person team", sub: "Asking about the Pro plan" },
      { icon: "check", done: true, title: "Scored 92 · routed to Alex", sub: "First reply in about 90 seconds" },
    ],
  },
  {
    slug: "northbridge-plumbing-platform",
    client: "Northbridge Plumbing",
    photo: "/images/case-plumbing-web.jpg",
    brand: "Northbridge Plumbing",
    nav: ["Services", "Areas", "Reviews"],
    cta: "Book service",
    headline: "Reliable plumbing. Done right.",
    caption: "Late-night request, straight to dispatch.",
    events: [
      { icon: "bell", title: "Emergency request · 9:14 PM", sub: "Submitted on the website" },
      { icon: "send", done: true, title: "Routed to the dispatch CRM", sub: "Form to CRM in under 5 seconds" },
    ],
  },
  {
    slug: "rag-chatbot",
    client: "E-commerce Brand",
    photo: "/images/case-rag-hub.jpg",
    brand: "Help Center",
    nav: ["Orders", "Returns", "Contact"],
    cta: "Chat with us",
    headline: "Answers in seconds, any hour.",
    caption: "Support question, answered instantly.",
    events: [
      { icon: "chat", title: "“Where's my order #4821?”", sub: "Customer · 11:52 PM" },
      { icon: "check", done: true, title: "Answered by the agent · CSAT 5/5", sub: "Reply in under 10 seconds" },
    ],
  },
  {
    slug: "crm-rebuild",
    client: "Real Estate Agency",
    photo: "/images/case-crm-pipeline.jpg",
    brand: "Riverstone Realty",
    nav: ["Listings", "Neighborhoods", "Agents"],
    cta: "Book a tour",
    headline: "Find your next home in Riverstone.",
    caption: "Every lead owned, every follow-up sent.",
    pipeline: {
      title: "Buyer pipeline",
      tool: "Zoho CRM",
      columns: ["New", "Contacted", "Won"],
      deal: "Harbor View Loft",
      others: ["Riverstone Condos", "Maple Ave Listing", "9th St Townhome"],
    },
  },
  {
    slug: "real-estate-agency-website",
    client: "The Foster Company",
    photo: "/images/case-foster-realestate.jpg",
    brand: "The Foster Company",
    nav: ["Listings", "About", "Contact"],
    cta: "View listings",
    headline: "Real estate, done at an agency level.",
    caption: "Website inquiry, captured in the CRM.",
    events: [
      { icon: "mail", title: "Listing inquiry received", sub: "From the website contact form" },
      { icon: "check", done: true, title: "Synced to the CRM", sub: "100% of inquiries captured" },
    ],
  },
  {
    slug: "ops-automation-suite",
    client: "Marketing Agency",
    photo: "/images/case-ops-agency.jpg",
    brand: "Agency Portal",
    nav: ["Clients", "Reports", "Team"],
    cta: "Client login",
    headline: "Client reports that send themselves.",
    caption: "Weekly client reports, compiled and sent.",
    events: [
      { icon: "report", title: "Weekly reports compiled", sub: "Pulled from HubSpot + Sheets" },
      { icon: "send", done: true, title: "Sent to 12 clients on time", sub: "About 5 minutes instead of 5 hours" },
    ],
  },
];

const ROW_A = ["HubSpot", "Salesforce", "Zoho CRM", "OpenAI", "Pinecone", "Zapier", "Make"];
const ROW_B = ["Next.js", "React", "Tailwind CSS", "Vercel", "Slack", "Google Sheets", "CRM APIs"];

function MarqueeRow({ items }) {
  return items.map((t, i) => (
    <span key={t} className="flex items-center">
      <span
        className={`font-display px-6 text-4xl font-extrabold tracking-tight sm:px-8 sm:text-6xl ${
          i % 2 ? "text-outline-light" : "text-ink-dark"
        }`}
      >
        {t}
      </span>
      <span className="h-3 w-3 shrink-0 rounded-full bg-accent ring-2 ring-ink-dark" />
    </span>
  ));
}

function Icon({ name }) {
  return (
    <svg viewBox="0 0 24 24" className="h-[55%] w-[55%]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICONS[name]} />
    </svg>
  );
}

/** Where a screen sits in the 3D fan, by its distance from the centre. */
function placement(offset, compact) {
  const a = Math.abs(offset);
  const s = Math.sign(offset);
  if (a === 0) return { x: "0%", rotateY: 0, scale: 1, opacity: 1, dim: 0 };
  if (a === 1)
    return { x: `${s * (compact ? 92 : 66)}%`, rotateY: -s * (compact ? 16 : 30), scale: compact ? 0.86 : 0.8, opacity: 1, dim: 0.5 };
  if (a === 2) return { x: `${s * (compact ? 170 : 118)}%`, rotateY: -s * 38, scale: 0.66, opacity: compact ? 0 : 0.55, dim: 0.65 };
  return { x: `${s * 160}%`, rotateY: -s * 40, scale: 0.6, opacity: 0, dim: 0.7 };
}

const SPRING = { type: "spring", stiffness: 120, damping: 22, mass: 0.9 };

function EventCard({ e, order }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 22, delay: 0.55 + order * 0.95 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      className="flex items-center gap-[2.4cqw] rounded-[2cqw] bg-white/95 px-[2.4cqw] py-[1.8cqw] text-ink-dark shadow-[0_18px_40px_-18px_rgba(0,0,0,0.55)] backdrop-blur-sm @max-md:rounded-xl @max-md:px-3 @max-md:py-2.5"
    >
      <span
        className={`flex h-[5.2cqw] max-h-11 min-h-8 w-[5.2cqw] min-w-8 max-w-11 shrink-0 items-center justify-center rounded-[1.4cqw] ${
          e.done ? "bg-accent text-black" : "bg-ink-dark text-white"
        }`}
      >
        <Icon name={e.icon} />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[clamp(12px,1.9cqw,17px)] font-semibold leading-tight">{e.title}</span>
        <span className="mt-0.5 block truncate text-[clamp(10.5px,1.45cqw,13px)] leading-tight text-black/55">{e.sub}</span>
      </span>
    </motion.div>
  );
}

/** Mini CRM board where one deal glides New → Contacted → Won while the screen is centred. */
function PipelinePanel({ p }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [setTimeout(() => setStage(1), 1300), setTimeout(() => setStage(2), 2500)];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 240, damping: 24, delay: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      className="rounded-[2cqw] bg-white/95 p-[2.2cqw] text-ink-dark shadow-[0_18px_40px_-18px_rgba(0,0,0,0.55)] backdrop-blur-sm @max-md:rounded-xl @max-md:p-3"
    >
      <div className="flex items-center justify-between text-[clamp(11px,1.6cqw,14px)] font-semibold">
        <span>{p.title}</span>
        <span className="text-black/45">{p.tool}</span>
      </div>
      <LayoutGroup id={`pipeline-${p.deal}`}>
        <div className="mt-[1.6cqw] grid grid-cols-3 gap-[1.2cqw] @max-md:mt-2 @max-md:gap-1.5">
          {p.columns.map((col, ci) => (
            <div key={col} className="rounded-[1.2cqw] bg-black/[0.04] p-[1cqw] @max-md:rounded-lg @max-md:p-1.5">
              <p className="text-[clamp(9px,1.25cqw,11px)] font-medium text-black/45">{col}</p>
              <p className="mt-[0.8cqw] rounded-[0.8cqw] bg-white px-[1cqw] py-[0.8cqw] text-[clamp(9.5px,1.35cqw,12px)] font-medium leading-tight shadow-sm @max-md:mt-1 @max-md:rounded-md @max-md:px-1.5 @max-md:py-1">
                {p.others[ci]}
              </p>
              {stage === ci && (
                <motion.p
                  layoutId="deal"
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  className={`mt-[0.8cqw] rounded-[0.8cqw] px-[1cqw] py-[0.8cqw] text-[clamp(9.5px,1.35cqw,12px)] font-bold leading-tight shadow-[0_8px_20px_-8px_rgba(0,0,0,0.4)] @max-md:mt-1 @max-md:rounded-md @max-md:px-1.5 @max-md:py-1 ${
                    ci === 2 ? "bg-accent text-black" : "bg-ink-dark text-white"
                  }`}
                >
                  {ci === 2 ? "✓ " : ""}
                  {p.deal}
                </motion.p>
              )}
            </div>
          ))}
        </div>
      </LayoutGroup>
    </motion.div>
  );
}

function Screen({ slide, offset, compact, onSelect, dragged }) {
  const active = offset === 0;
  // A screen wrapping from one end of the fan to the other jumps instead of flying across.
  const [prev, setPrev] = useState(offset);
  const [jump, setJump] = useState(false);
  if (prev !== offset) {
    setPrev(offset);
    setJump(Math.abs(offset - prev) > 1);
  }
  const { dim, ...pose } = placement(offset, compact);
  const transition = jump ? { duration: 0 } : SPRING;

  const handleClick = (e) => {
    if (dragged.current || !active) {
      e.preventDefault();
      if (!dragged.current) onSelect();
    }
  };

  return (
    <motion.div
      className="absolute inset-0"
      initial={false}
      animate={pose}
      transition={transition}
      style={{ zIndex: 30 - Math.abs(offset) * 10, pointerEvents: Math.abs(offset) > 2 ? "none" : "auto" }}
      aria-hidden={!active}
    >
      <Link
        href={`/work/${slide.slug}`}
        onClick={handleClick}
        draggable={false}
        tabIndex={active ? 0 : -1}
        data-cursor-tone="dark"
        data-cursor-label={active ? "View" : undefined}
        aria-label={`${slide.client} — open the case study`}
        className="@container relative block h-full w-full select-none overflow-hidden rounded-[22px] bg-ink-dark shadow-[0_50px_90px_-35px_rgba(10,10,10,0.55)] ring-1 ring-black/10 sm:rounded-[28px]"
      >
        <Image
          src={slide.photo}
          alt=""
          fill
          draggable={false}
          sizes="(max-width: 640px) 82vw, 880px"
          className={`object-cover transition-transform duration-[1.6s] ease-out ${active ? "scale-100" : "scale-110"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/5 @max-md:bg-gradient-to-b @max-md:from-black/70 @max-md:via-black/25 @max-md:to-black/60" />

        {/* site chrome */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-4 px-[4cqw] pt-[3.4cqw] text-white @max-md:px-4 @max-md:pt-4">
          <span className="font-display truncate text-[clamp(10px,1.6cqw,14px)] font-bold uppercase tracking-[0.12em]">{slide.brand}</span>
          <span className="flex shrink-0 items-center gap-[2.6cqw]">
            {slide.nav.map((n) => (
              <span key={n} className="hidden text-[clamp(10px,1.45cqw,13px)] text-white/75 @md:inline">
                {n}
              </span>
            ))}
            <span className="rounded-full bg-white px-[2cqw] py-[1cqw] text-[clamp(10px,1.45cqw,13px)] font-semibold text-black @max-md:px-3 @max-md:py-1.5">
              {slide.cta}
            </span>
          </span>
        </div>

        <p className="font-display absolute left-[4cqw] top-[22%] max-w-[58%] text-[clamp(1.6rem,6.3cqw,3.9rem)] font-extrabold leading-[0.98] tracking-[-0.02em] text-white @max-md:left-4 @max-md:top-[16%] @max-md:max-w-[85%]">
          {slide.headline}
        </p>

        {/* live automation events */}
        <div
          className={`absolute bottom-[3.6cqw] right-[3.6cqw] flex flex-col gap-[1.6cqw] @max-md:inset-x-3 @max-md:bottom-3 @max-md:w-auto @max-md:gap-2 ${
            slide.pipeline ? "w-[58%]" : "w-[46%]"
          }`}
        >
          <AnimatePresence mode="popLayout">
            {active &&
              (slide.pipeline ? (
                <PipelinePanel key="pipeline" p={slide.pipeline} />
              ) : (
                slide.events.map((e, k) => <EventCard key={e.title} e={e} order={k} />)
              ))}
          </AnimatePresence>
        </div>

        {/* dims screens that aren't centred */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-black"
          initial={false}
          animate={{ opacity: dim }}
          transition={transition}
        />
      </Link>
    </motion.div>
  );
}

function StageArrow({ dir, onClick }) {
  const next = dir > 0;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={next ? "Next project" : "Previous project"}
      className={`group absolute top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/90 text-ink-dark shadow-[0_18px_40px_-14px_rgba(10,10,10,0.45)] backdrop-blur-md transition-[background-color,color,scale,box-shadow] duration-300 hover:scale-110 hover:bg-ink-dark hover:text-accent hover:shadow-[0_0_30px_rgba(205,255,58,0.35)] active:scale-95 sm:h-14 sm:w-14 ${
        next ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        className={`h-5 w-5 transition-transform duration-300 ${next ? "group-hover:translate-x-0.5" : "group-hover:-translate-x-0.5"}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d={next ? "M5 12h14M13 6l6 6-6 6" : "M19 12H5M11 6l-6 6 6 6"} />
      </svg>
    </button>
  );
}

export default function Showcase() {
  const [index, setIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [paused, setPaused] = useState(false);
  const [compact, setCompact] = useState(false);
  const stageRef = useRef(null);
  const dragged = useRef(false);
  const inView = useInView(stageRef, { amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const n = SLIDES.length;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setCompact(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Autoplay timer (0 → 1), shown as the fill of the active dot.
  const progress = useMotionValue(0);
  const fill = useTransform(progress, (p) => `${p * 100}%`);
  useAnimationFrame((_, delta) => {
    if (!autoplay || paused || !inView || reduceMotion) return;
    const next = progress.get() + delta / AUTOPLAY_MS;
    if (next >= 1) {
      progress.set(0);
      setIndex((i) => (i + 1) % n);
    } else {
      progress.set(next);
    }
  });

  // Any manual move hands control to the visitor.
  const go = (to) => {
    setAutoplay(false);
    progress.set(0);
    setIndex(((to % n) + n) % n);
  };

  // Trackpad side-swipes and Shift + mouse wheel step one project at a time.
  const wheel = useRef({ sum: 0, lockedUntil: 0 });
  const handleWheel = (e) => {
    const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.shiftKey ? e.deltaY : 0;
    if (!dx) return;
    const now = performance.now();
    const w = wheel.current;
    if (now < w.lockedUntil) return;
    w.sum += dx;
    if (Math.abs(w.sum) > 40) {
      go(index + Math.sign(w.sum));
      w.sum = 0;
      w.lockedUntil = now + 650;
    }
  };

  const handleDragEnd = (_, info) => {
    if (info.offset.x < -60 || info.velocity.x < -400) go(index + 1);
    else if (info.offset.x > 60 || info.velocity.x > 400) go(index - 1);
    setTimeout(() => {
      dragged.current = false;
    }, 60);
  };

  const current = SLIDES[index];

  return (
    <section id="showcase" className="section-light relative overflow-hidden pb-28 sm:pb-32">
      {/* header */}
      <div className="container-px">
        <DrawLine tone="light" className="mx-auto max-w-[1400px]" />
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-6 pt-16 md:flex-row md:items-end">
          <div>
            <Reveal direction="left" duration={0.8}>
              <p className="font-script mb-2 text-2xl text-muted-light">See it working</p>
            </Reveal>
            <SplitText
              as="h2"
              text="What A Fix Looks Like"
              className="font-display block text-4xl font-extrabold leading-[1.02] text-ink-dark sm:text-5xl lg:text-6xl"
            />
          </div>
          <Reveal direction="right" delay={150} duration={0.8}>
            <p className="max-w-sm text-sm leading-relaxed text-muted-light md:text-right">
              Six real projects. Drag through them to watch each bottleneck get handled on its own.
            </p>
          </Reveal>
        </div>
      </div>

      {/* 3D carousel */}
      <Reveal direction="up" delay={100} duration={1} className="mt-14 sm:mt-16">
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Project showcase"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") go(index + 1);
            if (e.key === "ArrowLeft") go(index - 1);
          }}
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onWheel={handleWheel}
          className="outline-none"
        >
          <div className="relative mx-auto w-[min(880px,82vw)]">
            <motion.div
              ref={stageRef}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragStart={() => {
                dragged.current = true;
              }}
              onDragEnd={handleDragEnd}
              className="relative aspect-[4/5] w-full cursor-grab touch-pan-y [perspective:1800px] active:cursor-grabbing sm:aspect-[16/10]"
            >
              {SLIDES.map((slide, i) => {
                let offset = (((i - index) % n) + n) % n;
                if (offset > n / 2) offset -= n;
                return (
                  <Screen
                    key={slide.slug}
                    slide={slide}
                    offset={offset}
                    compact={compact}
                    dragged={dragged}
                    onSelect={() => go(i)}
                  />
                );
              })}
            </motion.div>

            {/* arrows sitting on the centre screen's edges, outside the draggable stage */}
            <StageArrow dir={-1} onClick={() => go(index - 1)} />
            <StageArrow dir={1} onClick={() => go(index + 1)} />
          </div>
        </div>
      </Reveal>

      {/* caption + controls */}
      <div className="container-px mt-10 text-center">
        <div className="relative mx-auto h-[4.5rem] max-w-3xl overflow-hidden sm:h-12">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={current.slug}
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: EASE_OUT } }}
              exit={{ opacity: 0, y: -12, filter: "blur(6px)", transition: { duration: 0.25 } }}
              className="font-display text-2xl font-bold leading-tight text-ink-dark sm:text-3xl"
            >
              {current.caption}
            </motion.p>
          </AnimatePresence>
        </div>
        <p className="mt-2 text-sm text-muted-light">
          {current.client} ·{" "}
          <Link href={`/work/${current.slug}`} className="font-semibold text-ink-dark underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent-dark">
            Read the case study →
          </Link>
        </p>

        <div className="mt-8 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous project"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 text-ink-dark transition-colors duration-300 hover:border-ink-dark hover:bg-ink-dark hover:text-accent"
          >
            ←
          </button>
          <div className="flex items-center gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={s.slug}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show ${s.client}`}
                aria-current={i === index}
                className={`relative h-2 overflow-hidden rounded-full transition-[width,background-color] duration-500 ${
                  i === index ? "w-10 bg-black/15" : "w-2 bg-black/20 hover:bg-black/40"
                }`}
              >
                {i === index && (
                  <motion.span
                    className="absolute inset-y-0 left-0 rounded-full bg-ink-dark"
                    style={{ width: autoplay && !reduceMotion ? fill : "100%" }}
                  />
                )}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next project"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 text-ink-dark transition-colors duration-300 hover:border-ink-dark hover:bg-ink-dark hover:text-accent"
          >
            →
          </button>
        </div>
      </div>

      {/* tools band: the stack behind every fix */}
      <div className="relative left-1/2 mt-20 w-[110vw] -translate-x-1/2 -rotate-1 space-y-2 border-y border-black/10 bg-white/50 py-5 sm:py-6">
        <VelocityMarquee baseVelocity={-1.5}>
          <MarqueeRow items={ROW_A} />
        </VelocityMarquee>
        <VelocityMarquee baseVelocity={1.5}>
          <MarqueeRow items={ROW_B} />
        </VelocityMarquee>
      </div>
    </section>
  );
}
