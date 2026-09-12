import Reveal from "@/components/Reveal";

const SERVICES = [
  {
    n: "01",
    title: "AI Automations",
    tag: "Agents",
    problem: "Leads sit in an inbox for hours before anyone follows up — by the time someone does, they've gone cold.",
    fix: "I build agents that read every lead or ticket the moment it arrives, qualify it against your data, and either respond or route it to the right person. No queue, no delay.",
    tags: ["Lead Qualification", "Internal Ops", "Task Automation"],
  },
  {
    n: "02",
    title: "Support Chatbots",
    tag: "Copilots",
    problem: "Your team answers the same handful of questions all day, while customers wait hours for a reply that should take seconds.",
    fix: "Conversational agents trained on your docs and CRM data — live on your site or in Slack — resolve routine tickets instantly and escalate the rest with full context attached.",
    tags: ["Live Chat", "Ticket Triage", "Slack Bots"],
  },
  {
    n: "03",
    title: "CRM Workflows",
    tag: "Systems",
    problem: "Deals fall through the cracks because no one owns the follow-up, and your CRM works more like a filing cabinet than a sales tool.",
    fix: "I rebuild lead routing, scoring, follow-ups, and reporting natively inside HubSpot, Salesforce, or Zoho, so every lead has an owner and every next step happens on its own.",
    tags: ["Lead Routing", "Pipeline Automation", "Reporting"],
  },
  {
    n: "04",
    title: "Integrations",
    tag: "Pipelines",
    problem: "Your CRM, inbox, and spreadsheets don't talk to each other, so someone retypes the same data two or three times a day.",
    fix: "I connect your CRM to the rest of your stack — email, billing, calendars, spreadsheets — so information moves on its own and nobody re-enters anything.",
    tags: ["API Integrations", "Data Sync", "Zapier / Make"],
  },
  {
    n: "05",
    title: "Web Development",
    tag: "Websites",
    problem: "Your website looks fine but doesn't actually capture or qualify anyone — visitors leave and you never know they were there.",
    fix: "Fast, conversion-ready sites and client portals, wired directly into your CRM so every visitor becomes tracked, scored data instead of a bounce.",
    tags: ["Marketing Sites", "Client Portals", "CRM-Connected"],
  },
  {
    n: "06",
    title: "Landing Pages",
    tag: "Conversion",
    problem: "Campaigns drive traffic, but a slow or generic landing page quietly leaks the leads you paid to get.",
    fix: "Campaign-ready pages, A/B tested and built for speed, where every submission routes straight into your CRM as a qualified lead.",
    tags: ["A/B Testing", "Fast Builds", "Lead Capture"],
  },
];

function Arrow() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

export default function Services() {
  return (
    <section id="services" className="section-dark container-px py-28 sm:py-36 overflow-hidden">
      <div className="mx-auto max-w-[1400px]">
        <Reveal direction="left" delay={100} duration={0.85}>
          <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-12 md:flex-row md:items-end">
            <div>
              <p className="font-script mb-2 text-2xl text-accent">
                Not services — problems
              </p>
              <h2 className="font-display text-5xl font-extrabold leading-none sm:text-6xl">
                Where The Cracks Are
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-dark md:text-right">
              Six recurring problems I see inside growing teams — and exactly
              what I build to close each one for good.
            </p>
          </div>
        </Reveal>

        <div className="divide-y divide-white/10">
          {SERVICES.map((s, idx) => (
            <Reveal
              key={s.n}
              direction="up"
              delay={idx * 60}
              duration={0.7}
              threshold={0.08}
            >
              <a
                href="/#top"
                aria-label={`Inquire about ${s.title} service`}
                className="group relative grid grid-cols-[3rem_1fr] items-start gap-x-6 gap-y-4 py-10 transition-colors duration-300 hover:bg-white/[0.03] lg:grid-cols-[4rem_1.1fr_1fr_2.5rem] lg:items-center lg:py-12 cursor-pointer rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-full w-[2px] scale-y-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-y-100"
                  style={{ transformOrigin: "top" }}
                />

                <span className="relative col-start-1 row-start-1 block h-9 w-12 shrink-0 lg:h-10 lg:w-16">
                  <span
                    className="font-display absolute inset-0 text-3xl font-extrabold transition-opacity duration-300 group-hover:opacity-0 sm:text-4xl"
                    style={{
                      color: "transparent",
                      WebkitTextStroke: "1px rgba(244, 243, 238, 0.35)",
                    }}
                  >
                    {s.n}
                  </span>
                  <span className="font-display absolute inset-0 text-3xl font-extrabold text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:text-4xl">
                    {s.n}
                  </span>
                </span>

                <div className="col-start-2 row-start-1 transition-transform duration-300 group-hover:translate-x-1.5">
                  <h3 className="font-display text-2xl font-bold sm:text-3xl text-ink">
                    {s.title}{" "}
                    <span className="font-script text-lg text-accent sm:text-xl">
                      {s.tag}
                    </span>
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2 lg:hidden">
                    {s.tags.map((t) => (
                      <span key={t} className="tag-pill border-white/15 text-muted-dark">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="col-span-2 col-start-1 row-start-2 pl-[4.5rem] lg:col-span-1 lg:col-start-3 lg:row-start-1 lg:pl-0">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
                    The problem
                  </p>
                  <p className="mt-1 text-sm italic leading-relaxed text-muted-dark">
                    {s.problem}
                  </p>
                  <p className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-accent/80">
                    The fix
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-dark">
                    {s.fix}
                  </p>
                  <div className="mt-3 hidden flex-wrap gap-2 lg:flex">
                    {s.tags.map((t) => (
                      <span key={t} className="tag-pill border-white/15 text-muted-dark">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <span className="col-start-2 row-start-1 hidden justify-self-end text-white/40 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent lg:col-start-4 lg:flex">
                  <Arrow />
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal direction="up" delay={200} duration={0.8}>
          <div className="mt-20 border-t border-white/10 pt-16">
            <p className="font-script mb-6 text-center text-xl text-accent">The bottom line</p>
            <div className="overflow-hidden">
              <div className="animate-marquee flex w-max items-center whitespace-nowrap">
                {[0, 1].map((i) => (
                  <p
                    key={i}
                    aria-hidden={i === 1 ? "true" : undefined}
                    className="font-display pr-12 text-3xl font-extrabold leading-snug sm:text-4xl"
                  >
                    I&apos;m not here to ship features — I&apos;m here to solve business problems.
                    <span className="pl-12 text-accent">•</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
