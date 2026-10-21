"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import CaseStudyModal from "@/components/CaseStudyModal";
import Magnetic from "@/components/Magnetic";
import Reveal from "@/components/Reveal";
import SplitText from "@/components/SplitText";
import { CATEGORY_META, PROJECTS } from "@/lib/projects";
import { EASE_OUT } from "@/lib/motion";

const FILTER_TABS = [
  { key: "all", label: "All Projects" },
  { key: "web", label: "Web Development" },
  { key: "ai", label: "AI Automations" },
  { key: "crm", label: "CRM Workflows" },
];

export default function Work() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return PROJECTS;
    return PROJECTS.filter((p) => p.categoryKey === activeCategory);
  }, [activeCategory]);

  return (
    <section id="work" className="section-light container-px py-16 sm:py-24 overflow-hidden">
      <div className="mx-auto w-full max-w-[1400px]">
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-4 border-b border-black/10 pb-8 md:flex-row md:items-end">
          <div>
            <Reveal direction="left" delay={100} duration={0.85}>
              <p className="font-script mb-1 text-xl text-muted-light">
                Selected work
              </p>
            </Reveal>
            <SplitText
              as="h2"
              text="Case Studies"
              className="font-display text-4xl font-extrabold leading-none sm:text-5xl text-ink-dark"
            />
          </div>
          <Reveal direction="right" delay={200} duration={0.85}>
            <p className="max-w-md text-xs sm:text-sm leading-relaxed text-muted-light md:text-right">
              Real problems, real fixes — from leads that used to sit for hours to CRMs that had become filing cabinets.
            </p>
          </Reveal>
        </div>

        {/* Filter Tabs — the dark pill glides to the active tab */}
        <Reveal direction="up" delay={200} duration={0.7}>
          <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap">
            {FILTER_TABS.map((tab) => {
              const isActive = activeCategory === tab.key;
              const count =
                tab.key === "all"
                  ? PROJECTS.length
                  : PROJECTS.filter((p) => p.categoryKey === tab.key).length;

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveCategory(tab.key)}
                  aria-pressed={isActive}
                  className={`relative flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-dark ${
                    isActive
                      ? "border-transparent text-white"
                      : "border-black/15 bg-white/70 text-muted-light hover:border-black/40 hover:bg-white hover:text-ink-dark"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="work-tab"
                      className="absolute inset-0 rounded-full bg-ink-dark shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{tab.label}</span>
                  <span
                    className={`relative rounded-full px-2 py-0.5 text-[10px] font-bold transition-colors duration-300 ${
                      isActive ? "bg-accent text-black" : "bg-black/10 text-ink-dark"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Category Description Banner if single category is selected */}
        <AnimatePresence mode="wait" initial={false}>
          {activeCategory !== "all" && CATEGORY_META[activeCategory] && (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
              className="overflow-hidden"
            >
              <div className="mt-6 rounded-xl bg-black/5 p-3.5 sm:p-4 flex items-center gap-3">
                <span className="font-display text-xs font-bold text-ink-dark">
                  {CATEGORY_META[activeCategory].index}
                </span>
                <p className="text-xs text-muted-light">
                  {CATEGORY_META[activeCategory].sub}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Case Studies Stacked List — cards reflow smoothly when filtered */}
        <div className="mt-8 flex flex-col gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.08 }}
                exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25 } }}
                transition={{ duration: 0.75, ease: EASE_OUT }}
              >
                <ProjectCard
                  project={project}
                  index={idx}
                  onQuickView={(p) => setSelectedProject(p)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom CTA Banner */}
        <Reveal direction="up" delay={200} duration={0.8}>
          <div data-cursor-tone="dark" className="relative mt-14 flex flex-col items-center justify-between gap-6 overflow-hidden rounded-2xl bg-black p-6 sm:p-10 text-white sm:flex-row shadow-lg">
            <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/15 blur-[90px] animate-pulse-glow" aria-hidden="true" />
            <div className="relative">
              <p className="font-script text-lg text-accent">Got a bottleneck like this?</p>
              <h3 className="font-display mt-0.5 text-xl font-bold sm:text-2xl">
                Tell me what&apos;s broken — I&apos;ll show you what a fix looks like.
              </h3>
            </div>
            <Magnetic className="relative inline-block">
              <a
                href="mailto:abdullahazharfarooq01@gmail.com"
                className="block whitespace-nowrap rounded-full bg-accent px-6 py-3 text-xs font-bold uppercase tracking-wider text-black shadow-[0_0_20px_rgba(205,255,58,0.3)] transition-shadow duration-300 hover:shadow-[0_0_32px_rgba(205,255,58,0.6)]"
              >
                Start a Conversation →
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </div>

      {/* Interactive Quick View Modal */}
      <CaseStudyModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
