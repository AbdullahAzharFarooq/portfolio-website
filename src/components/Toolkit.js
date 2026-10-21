import DrawLine from "@/components/DrawLine";
import Reveal from "@/components/Reveal";
import SplitText from "@/components/SplitText";
import ToolkitCard from "@/components/ToolkitCard";
import VelocityMarquee from "@/components/VelocityMarquee";
import { AgentIcon, CodeIcon, GearLinkIcon, WorkflowIcon } from "@/lib/projects";

const GROUPS = [
  {
    n: "01",
    title: "AI & Agents",
    Icon: AgentIcon,
    desc: "Agents and support bots that read, qualify, and answer — trained on your docs and CRM data, with guardrails.",
    tools: [
      { name: "OpenAI", role: "Reasoning & language" },
      { name: "Pinecone", role: "Vector search" },
      { name: "RAG", role: "Answers from your docs" },
    ],
  },
  {
    n: "02",
    title: "CRM Platforms",
    Icon: WorkflowIcon,
    desc: "Routing, scoring, follow-ups, and reporting built natively inside the CRM your team already lives in.",
    tools: [
      { name: "HubSpot", role: "Marketing & sales CRM" },
      { name: "Salesforce", role: "Enterprise CRM" },
      { name: "Zoho CRM", role: "SMB sales CRM" },
    ],
  },
  {
    n: "03",
    title: "Automation & Glue",
    Icon: GearLinkIcon,
    desc: "The connective tissue between inboxes, sheets, and chat — so data moves on its own and nobody retypes it.",
    tools: [
      { name: "Zapier", role: "App-to-app triggers" },
      { name: "Make", role: "Visual workflows" },
      { name: "Slack", role: "Alerts & approvals" },
      { name: "Google Sheets", role: "Lightweight reporting" },
    ],
  },
  {
    n: "04",
    title: "Web & Front-End",
    Icon: CodeIcon,
    desc: "Fast, conversion-ready sites and portals, wired straight into the CRM behind them.",
    tools: [
      { name: "Next.js", role: "React framework" },
      { name: "React", role: "Interactive UI" },
      { name: "Tailwind CSS", role: "Utility styling" },
      { name: "Vercel", role: "Hosting & deploys" },
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

export default function Toolkit() {
  return (
    <section id="stack" className="section-light relative overflow-hidden pb-28 sm:pb-36">
      <div className="container-px">
        <div className="mx-auto max-w-[1400px]">
          <DrawLine tone="light" />
          <div className="flex flex-col items-start justify-between gap-6 pt-16 md:flex-row md:items-end">
            <div>
              <Reveal direction="left" duration={0.8}>
                <p className="font-script mb-2 text-2xl text-muted-light">My toolkit</p>
              </Reveal>
              <SplitText
                as="h2"
                text="The Stack Behind The Fixes"
                className="font-display block text-4xl font-extrabold leading-[1.02] text-ink-dark sm:text-5xl lg:text-6xl"
              />
            </div>
            <Reveal direction="right" delay={150} duration={0.8}>
              <p className="max-w-sm text-sm leading-relaxed text-muted-light md:text-right">
                Picked for the problem, never the other way around — these are the platforms my fixes are built on.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* two counter-scrolling rows that react to scroll speed */}
      <div className="relative left-1/2 mt-14 w-[110vw] -translate-x-1/2 -rotate-1 space-y-2 border-y border-black/10 bg-white/50 py-5 sm:py-6">
        <VelocityMarquee baseVelocity={-1.5}>
          <MarqueeRow items={ROW_A} />
        </VelocityMarquee>
        <VelocityMarquee baseVelocity={1.5}>
          <MarqueeRow items={ROW_B} />
        </VelocityMarquee>
      </div>

      <div className="container-px mt-16">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 lg:grid-cols-2">
          {GROUPS.map((g, i) => (
            <Reveal key={g.n} direction="up" delay={(i % 2) * 120} duration={0.8} className="h-full">
              <ToolkitCard n={g.n} title={g.title} desc={g.desc} Icon={g.Icon} tools={g.tools} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
