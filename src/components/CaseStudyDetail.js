import Image from "next/image";
import Link from "next/link";
import { CheckIcon, LinkOutIcon } from "@/components/icons";
import { CATEGORY_META, PROJECTS } from "@/lib/projects";

export default function CaseStudyDetail({ project }) {
  if (!project) return null;

  const {
    slug,
    title,
    categoryKey,
    client,
    desc,
    description,
    features = [],
    photo,
    secondaryVisual,
    cardVisual,
    stack = [],
    stats = [],
    compare,
    liveUrl,
  } = project;

  const meta = CATEGORY_META[categoryKey] || { label: "Case Study" };

  // Calculate next and previous project for seamless browsing
  const currentIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];
  const prevProject = PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length];

  return (
    <div className="mx-auto w-full max-w-[1300px]">
      {/* Top Main Visual Banner */}
      <div className="relative h-72 sm:h-96 lg:h-[28rem] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-black/5 shadow-lg">
        <Image
          src={photo.src}
          alt={photo.alt || title}
          fill
          priority
          sizes="(max-width: 1400px) 100vw, 1300px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Floating Badges */}
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-black">
              {meta.label}
            </span>
            <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-white/80">
              Client: {client}
            </p>
          </div>

          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black shadow-lg transition-transform hover:scale-105 hover:bg-accent"
            >
              Visit Live Site <LinkOutIcon />
            </a>
          )}
        </div>
      </div>

      {/* Impact Stats Grid */}
      {stats.length > 0 && (
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-black/5 bg-white p-5 sm:p-6 shadow-sm transition-all hover:shadow-md"
            >
              <p className="font-display text-2xl sm:text-3xl font-extrabold text-ink-dark">
                {s.value}
              </p>
              <p className="mt-1 text-xs font-medium text-muted-light leading-snug">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Main Content Grid */}
      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left Column: Problem, Solution & Features */}
        <div className="space-y-10">
          {/* Overview */}
          <div className="rounded-2xl sm:rounded-3xl bg-white p-6 sm:p-8 border border-black/5 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-widest text-accent-dark text-[#6b8e00]">
              The Challenge &amp; Solution
            </span>
            <h2 className="font-display mt-2 text-2xl font-bold text-ink-dark sm:text-3xl">
              Project Overview
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-light">
              {description || desc}
            </p>
          </div>

          {/* Key Deliverables */}
          {features.length > 0 && (
            <div className="rounded-2xl sm:rounded-3xl bg-white p-6 sm:p-8 border border-black/5 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-light">
                What Changed
              </span>
              <h3 className="font-display mt-2 text-xl font-bold text-ink-dark sm:text-2xl">
                What It Actually Does
              </h3>
              <ul className="mt-6 space-y-3.5">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm sm:text-base text-muted-light">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-black font-bold text-xs">
                      ✓
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Stack & Tools */}
          {stack.length > 0 && (
            <div className="rounded-2xl sm:rounded-3xl bg-white p-6 sm:p-8 border border-black/5 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-light">
                Technology
              </span>
              <h3 className="font-display mt-2 text-xl font-bold text-ink-dark">
                Tools &amp; Stack Used
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-lg border border-black/10 bg-[#f8f7f4] px-3.5 py-1.5 text-xs font-medium text-ink-dark"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Visual Mockup, Before/After & Next Case Study */}
        <div className="space-y-10">
          {/* Before vs After */}
          {compare && (
            <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-black/5 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="bg-white p-6 sm:p-8">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-light">
                    Before Implementation
                  </span>
                  <p className="font-display mt-2 text-xl font-extrabold text-muted-light sm:text-2xl">
                    {compare.before}
                  </p>
                </div>
                <div className="bg-black p-6 sm:p-8 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-accent">
                    After Automation · {compare.label}
                  </span>
                  <p className="font-display mt-2 text-xl font-extrabold text-accent sm:text-2xl">
                    {compare.after}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* System Visual / Mockup Preview */}
          {(secondaryVisual || cardVisual) && (
            <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-black/5 bg-[#111112] shadow-sm">
              <div className="border-b border-white/10 px-6 py-3.5 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-white/70">
                  How It Works
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  <span className="text-[10px] text-white/50 uppercase">Live Output</span>
                </span>
              </div>
              <div className="h-64 sm:h-72 p-2">
                {secondaryVisual || cardVisual}
              </div>
            </div>
          )}

          {/* Next / Previous Project Navigator */}
          <div className="rounded-2xl sm:rounded-3xl bg-white p-6 sm:p-8 border border-black/5 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-light">
              Browse Work
            </span>
            <div className="mt-4 flex items-center justify-between gap-4">
              <Link
                href={`/work/${prevProject.slug}`}
                className="group flex flex-col items-start text-left"
              >
                <span className="text-[11px] text-muted-light">← Previous</span>
                <span className="font-display text-sm font-bold text-ink-dark group-hover:text-accent-dark transition-colors line-clamp-1">
                  {prevProject.title}
                </span>
              </Link>
              <div className="h-8 w-[1px] bg-black/10" />
              <Link
                href={`/work/${nextProject.slug}`}
                className="group flex flex-col items-end text-right"
              >
                <span className="text-[11px] text-muted-light">Next →</span>
                <span className="font-display text-sm font-bold text-ink-dark group-hover:text-accent-dark transition-colors line-clamp-1">
                  {nextProject.title}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
