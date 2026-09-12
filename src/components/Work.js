"use client";

import { useState, useMemo } from "react";
import ProjectCard from "@/components/ProjectCard";
import CaseStudyModal from "@/components/CaseStudyModal";
import Reveal from "@/components/Reveal";
import { CATEGORY_META, PROJECTS } from "@/lib/projects";

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
        <Reveal direction="left" delay={100} duration={0.85}>
          <div className="flex flex-col items-start justify-between gap-4 border-b border-black/10 pb-8 md:flex-row md:items-end">
            <div>
              <p className="font-script mb-1 text-xl text-muted-light">
                Selected work
              </p>
              <h2 className="font-display text-4xl font-extrabold leading-none sm:text-5xl text-ink-dark">
                Case Studies
              </h2>
            </div>
            <p className="max-w-md text-xs sm:text-sm leading-relaxed text-muted-light md:text-right">
              Real problems, real fixes — from leads that used to sit for hours to CRMs that had become filing cabinets.
            </p>
          </div>
        </Reveal>

        {/* Filter Tabs */}
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
                  className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-dark ${
                    isActive
                      ? "bg-ink-dark text-white shadow-sm"
                      : "border border-black/15 bg-white/70 text-muted-light hover:border-black/40 hover:bg-white hover:text-ink-dark"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
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
        {activeCategory !== "all" && CATEGORY_META[activeCategory] && (
          <Reveal direction="fade" delay={100} duration={0.5}>
            <div className="mt-6 rounded-xl bg-black/5 p-3.5 sm:p-4 flex items-center gap-3">
              <span className="font-display text-xs font-bold text-ink-dark">
                {CATEGORY_META[activeCategory].index}
              </span>
              <p className="text-xs text-muted-light">
                {CATEGORY_META[activeCategory].sub}
              </p>
            </div>
          </Reveal>
        )}

        {/* Case Studies Stacked List */}
        <div className="mt-8 space-y-6 sm:space-y-8">
          {filteredProjects.map((project, idx) => (
            <Reveal
              key={project.slug}
              direction="up"
              delay={idx * 75}
              duration={0.75}
              threshold={0.06}
            >
              <ProjectCard
                project={project}
                index={idx}
                onQuickView={(p) => setSelectedProject(p)}
              />
            </Reveal>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <Reveal direction="up" delay={200} duration={0.8}>
          <div className="mt-14 flex flex-col items-center justify-between gap-6 rounded-2xl bg-black p-6 sm:p-10 text-white sm:flex-row shadow-lg">
            <div>
              <p className="font-script text-lg text-accent">Got a bottleneck like this?</p>
              <h3 className="font-display mt-0.5 text-xl font-bold sm:text-2xl">
                Tell me what&apos;s broken — I&apos;ll show you what a fix looks like.
              </h3>
            </div>
            <a
              href="/#top"
              className="whitespace-nowrap rounded-full bg-accent px-6 py-3 text-xs font-bold uppercase tracking-wider text-black shadow-[0_0_20px_rgba(205,255,58,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_28px_rgba(205,255,58,0.6)]"
            >
              Start a Conversation →
            </a>
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
