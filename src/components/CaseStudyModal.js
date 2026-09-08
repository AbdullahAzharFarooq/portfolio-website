"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckIcon, LinkOutIcon } from "@/components/icons";
import { CATEGORY_META } from "@/lib/projects";

export default function CaseStudyModal({ project, isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const meta = CATEGORY_META[project.categoryKey] || { label: "Project" };
  const Icon = project.Icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-[#111112] text-ink shadow-[0_25px_70px_rgba(0,0,0,0.8)] border border-white/10 ring-1 ring-white/5 animate-scaleUp"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-black font-bold shadow">
              {Icon ? <Icon /> : project.n}
            </span>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-accent">
                {meta.label}
              </span>
              <p className="text-xs text-muted-dark">Client: {project.client}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-full p-2 text-muted-dark transition-colors hover:bg-white/10 hover:text-white"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Title & Live Link */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 id="modal-title" className="font-display text-2xl font-extrabold sm:text-4xl text-white">
                {project.title}
              </h2>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-xs font-bold text-black transition-transform hover:scale-105"
                >
                  Visit Live Site <LinkOutIcon />
                </a>
              )}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-dark sm:text-base">
              {project.description || project.desc}
            </p>
          </div>

          {/* Key Stats Grid */}
          {project.stats && project.stats.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-dark mb-3">
                Quantified Impact
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {project.stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center transition-colors hover:border-accent/40"
                  >
                    <p className="font-display text-2xl font-extrabold text-accent sm:text-3xl">
                      {s.value}
                    </p>
                    <p className="mt-1 text-[11px] font-medium leading-tight text-muted-dark">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Visual Showcase & Photo */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {project.photo && (
              <div className="relative h-56 sm:h-64 overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src={project.photo.src}
                  alt={project.photo.alt || project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-4 text-xs font-medium text-white/80">
                  {project.photo.alt}
                </span>
              </div>
            )}
            {project.cardVisual && (
              <div className="h-56 sm:h-64 overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                {project.cardVisual}
              </div>
            )}
          </div>

          {/* Key Features */}
          {project.features && (
            <div>
              <h3 className="font-display text-xs font-bold uppercase tracking-wider text-white mb-3">
                Key Deliverables & Features
              </h3>
              <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {project.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 rounded-xl border border-white/5 bg-white/[0.02] p-3 text-sm text-muted-dark"
                  >
                    <span className="mt-0.5 text-accent">
                      <CheckIcon />
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Before & After Box */}
          {project.compare && (
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="bg-white/[0.04] p-5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-dark">
                    Before Implementation
                  </span>
                  <p className="font-display mt-1.5 text-lg font-bold text-muted-dark sm:text-xl">
                    {project.compare.before}
                  </p>
                </div>
                <div className="bg-accent/15 p-5 border-t sm:border-t-0 sm:border-l border-accent/20">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-accent">
                    After Automation · {project.compare.label}
                  </span>
                  <p className="font-display mt-1.5 text-lg font-bold text-accent sm:text-xl">
                    {project.compare.after}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tech Stack */}
          {project.stack && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-dark mb-2">
                Technology Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-xs text-white/90"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 bg-white/[0.02] px-6 py-4 sm:px-8">
          <Link
            href={`/work/${project.slug}`}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent transition-colors hover:text-white"
          >
            Open Dedicated Page ↗
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/20 bg-white/5 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-white/15"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
