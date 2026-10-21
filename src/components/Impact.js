import Link from "next/link";
import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";
import SplitText from "@/components/SplitText";
import { PROJECTS } from "@/lib/projects";

// Headline results, looked up from the case-study data so the numbers never drift.
const HIGHLIGHTS = [
  { slug: "outbound-qualifier-agent", label: "Faster first response" },
  { slug: "rag-chatbot", label: "Tickets resolved without a human" },
  { slug: "northbridge-plumbing-platform", label: "Online quote & call rate" },
  { slug: "ops-automation-suite", label: "Saved per week" },
];

const RESULTS = HIGHLIGHTS.map(({ slug, label }) => {
  const project = PROJECTS.find((p) => p.slug === slug);
  const stat = project?.stats?.find((s) => s.label === label);
  return project && stat ? { slug, label, value: stat.value, client: project.client } : null;
}).filter(Boolean);

export default function Impact() {
  return (
    <section
      id="results"
      data-cursor-tone="accent"
      className="relative overflow-hidden bg-accent text-ink-dark selection:bg-ink-dark selection:text-accent"
    >
      {/* decorative network ring + fine grid, echoing the hero */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,10,10,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,10,10,0.06)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_70%_at_80%_20%,black_20%,transparent_75%)]" />
        <div className="animate-spin-slow absolute -right-40 -top-48 h-[36rem] w-[36rem] rounded-full border border-dashed border-black/15" />
      </div>

      <div className="container-px relative mx-auto max-w-[1400px] py-20 sm:py-28">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal direction="left" duration={0.8}>
              <p className="font-script mb-2 text-2xl text-black/60">Proof, not promises</p>
            </Reveal>
            <SplitText
              as="h2"
              text="Numbers From Real Projects"
              className="font-display block text-4xl font-extrabold leading-[1.02] sm:text-5xl lg:text-6xl"
            />
          </div>
          <Reveal direction="right" delay={150} duration={0.8}>
            <p className="max-w-sm text-sm leading-relaxed text-black/70 md:text-right">
              Every figure comes from one of the case studies below — click any number to see how it was built.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 border-t border-black/15 sm:grid-cols-2 lg:grid-cols-4">
          {RESULTS.map((r, i) => (
            <Reveal
              key={r.slug}
              direction="up"
              delay={i * 100}
              duration={0.7}
              className="border-b border-black/15 sm:[&:nth-child(odd)]:border-r lg:border-r lg:[&:last-child]:border-r-0"
            >
              <Link
                href={`/work/${r.slug}`}
                data-cursor-label="View"
                className="group relative flex h-full flex-col justify-between gap-12 overflow-hidden p-7 sm:p-8 lg:min-h-[19rem]"
              >
                {/* dark panel rises behind the content on hover */}
                <span className="absolute inset-0 translate-y-full bg-ink-dark transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0" />

                <span className="relative flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.18em] text-black/50 transition-colors duration-500 group-hover:text-white/50">
                  0{i + 1}
                  <span className="text-lg transition-all duration-500 group-hover:rotate-45 group-hover:text-accent">↗</span>
                </span>

                <span className="relative block">
                  <span className="font-display block text-6xl font-extrabold leading-none tracking-tight transition-colors duration-500 group-hover:text-accent sm:text-7xl">
                    <CountUp value={r.value} />
                  </span>
                  <span className="mt-4 block text-sm font-semibold transition-colors duration-500 group-hover:text-white">
                    {r.label}
                  </span>
                  <span className="mt-1 block text-xs text-black/55 transition-colors duration-500 group-hover:text-white/50">
                    {r.client}
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
