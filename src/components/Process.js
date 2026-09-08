import Reveal from "@/components/Reveal";

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

export default function Process() {
  return (
    <section id="process" className="section-dark container-px pt-16 pb-28 sm:pt-20 sm:pb-36 overflow-hidden relative">
      {/* Background ambient network & subtle lime glow */}
      <div className="bg-grid absolute inset-0 opacity-60 pointer-events-none" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[45rem] w-[45rem] rounded-full bg-accent/[0.05] blur-[150px]" />

      <div className="mx-auto max-w-6xl relative z-10">
        <Reveal direction="left" delay={100} duration={0.85}>
          <div className="flex flex-col items-start justify-between gap-4 border-b border-white/10 pb-8 md:flex-row md:items-end">
            <div>
              <p className="font-script mb-2 text-2xl text-accent">How I work</p>
              <h2 className="font-display text-4xl font-extrabold sm:text-5xl lg:text-6xl text-ink">
                From Problem To Production
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-dark md:text-right">
              A six-step process that starts with what&apos;s broken in your business, not a tech stack — so what gets built actually fixes it.
            </p>
          </div>
        </Reveal>

        {/* 6 Step Production Studio Cards (2x3 Grid) */}
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {STEPS.map((step, idx) => (
            <Reveal
              key={step.n}
              direction="up"
              delay={idx * 75}
              duration={0.7}
              threshold={0.08}
              className="h-full"
            >
              <div className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-7 sm:p-8 transition-all duration-300 hover:border-accent/40 hover:bg-white/[0.04] hover:-translate-y-1">
                {/* Header: Number & Icon */}
                <div className="flex items-center justify-between">
                  <span className="font-display text-2xl font-extrabold text-white/25 transition-colors duration-300 group-hover:text-accent">
                    {step.n}
                  </span>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 text-muted-dark transition-all duration-300 group-hover:border-accent group-hover:text-accent">
                    {step.icon}
                  </span>
                </div>

                <p className="mt-7 text-[11px] font-semibold uppercase tracking-[0.15em] text-accent/80">
                  {step.phase}
                </p>

                <h3 className="font-display mt-2 line-clamp-2 min-h-[3.4rem] text-xl font-bold leading-snug text-white sm:min-h-[3.7rem] sm:text-[1.35rem]">
                  {step.title}
                </h3>

                <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-dark">
                  {step.desc}
                </p>

                {/* Deliverable */}
                <div className="mt-7 flex items-start gap-2.5 border-t border-white/10 pt-5">
                  <span className="mt-0.5 shrink-0 text-accent">✓</span>
                  <p className="line-clamp-1 text-xs leading-relaxed text-white/70">
                    {step.deliverable}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
