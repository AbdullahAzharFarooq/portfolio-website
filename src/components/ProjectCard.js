"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import CountUp from "@/components/CountUp";
import { LinkOutIcon } from "@/components/icons";
import { CATEGORY_META } from "@/lib/projects";
import { EASE_IN_OUT } from "@/lib/motion";

export default function ProjectCard({ project, onQuickView, index = 0 }) {
  const meta = CATEGORY_META[project.categoryKey] || { label: "Case Study" };
  const Icon = project.Icon;

  const isReversed = index % 2 === 1;

  // Photo drifts inside its frame as the card scrolls past.
  const frameRef = useRef(null);
  const cardRef = useRef(null);
  // Watch the unclipped card, not the clipped frame, to trigger the wipe.
  const inView = useInView(cardRef, { once: true, amount: 0.2 });
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["-7%", "7%"]);

  return (
    <article ref={cardRef} className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white p-5 sm:p-6 lg:p-7 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.06)] border border-black/5 transition-[box-shadow,border-color,translate] duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-20px_rgba(0,0,0,0.18)] hover:border-black/10">
      <div className={`flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-6 lg:gap-8 xl:gap-10`}>
        {/* Photo: wipes open on scroll, click opens the quick preview */}
        <motion.div
          ref={frameRef}
          onClick={() => onQuickView(project)}
          data-cursor-label="Preview"
          initial={{ clipPath: "inset(0% 0% 100% 0% round 16px)" }}
          animate={inView ? { clipPath: "inset(0% 0% 0% 0% round 16px)", transitionEnd: { clipPath: "none" } } : undefined}
          transition={{ duration: 1.1, ease: EASE_IN_OUT }}
          className="relative w-full lg:w-[42%] xl:w-[40%] h-52 sm:h-64 lg:h-72 xl:h-80 shrink-0 cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl shadow-sm"
        >
          <motion.div className="absolute inset-x-0 -inset-y-[8%]" style={{ y: photoY }}>
            <Image
              src={project.photo.src}
              alt={project.photo.alt || project.title}
              fill
              sizes="(max-width: 1024px) 100vw, 450px"
              className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

          {/* Top Left Number & Category Badge */}
          <div className="absolute left-3 top-3 flex items-center gap-1.5">
            <span className="rounded-full bg-black/70 px-2.5 py-0.5 font-display text-[10px] font-bold text-white backdrop-blur-md">
              {project.n}
            </span>
            <span className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black shadow-sm">
              {meta.label}
            </span>
          </div>

          {/* Top Right Live Link & Icon */}
          <div className="absolute right-3 top-3 flex items-center gap-1.5">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-bold text-black shadow-sm backdrop-blur-sm transition-colors hover:bg-accent"
              >
                Live <LinkOutIcon />
              </a>
            )}
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black shadow transition-all duration-500 group-hover:rotate-[360deg] group-hover:bg-accent">
              {Icon ? <Icon /> : project.n}
            </span>
          </div>

          {/* Bottom Photo Client Tag */}
          <div className="absolute bottom-3 left-3 right-3">
            <span className="text-[11px] font-medium text-white/85 drop-shadow-sm">
              {project.client}
            </span>
          </div>
        </motion.div>

        {/* Right Side: Proportional Content */}
        <div className="flex w-full lg:w-[58%] xl:w-[60%] flex-col justify-between py-1">
          <div>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] font-semibold uppercase tracking-widest text-muted-light">
              <span>{project.client}</span>
              <span>•</span>
              <span className="text-ink-dark font-bold">{meta.label}</span>
            </div>

            <h3 className="font-display mt-1.5 text-xl sm:text-2xl lg:text-[1.65rem] font-extrabold leading-tight text-ink-dark tracking-tight">
              {project.title}
            </h3>

            <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-muted-light">
              {project.desc}
            </p>

            {/* Tech Stack Pills */}
            <div className="mt-3.5 flex flex-wrap gap-1.5">
              {project.tags?.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-black/5 bg-[#f5f4ef] px-2.5 py-0.5 text-[11px] font-medium text-[#4a4940] transition-colors duration-300 hover:border-black/20 hover:bg-accent/40"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Impact Metric Bar */}
            {project.stats && project.stats.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5 border-y border-black/10 py-3">
                {project.stats.slice(0, 4).map((s) => (
                  <div key={s.label}>
                    <p className="font-display text-base sm:text-lg font-extrabold text-ink-dark leading-tight">
                      <CountUp value={s.value} />
                    </p>
                    <p className="text-[10px] leading-tight text-muted-light mt-0.5">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions: View More Button */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href={`/work/${project.slug}`}
              className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-lg border border-black/30 bg-transparent px-5 py-2.5 text-xs font-semibold text-ink-dark transition-colors duration-300 hover:border-black hover:text-white"
            >
              {/* fill slides up from the bottom on hover */}
              <span className="absolute inset-0 translate-y-full bg-black transition-transform duration-300 ease-out group-hover/btn:translate-y-0" />
              <span className="relative">View More</span>
              <span className="relative font-bold transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
            </Link>

            <button
              type="button"
              onClick={() => onQuickView(project)}
              className="inline-flex items-center gap-1 rounded-lg bg-[#f0ede6] px-4 py-2.5 text-xs font-semibold text-ink-dark transition-all duration-300 hover:bg-accent hover:text-black cursor-pointer"
            >
              Quick Preview
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
