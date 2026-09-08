import {
  ChatMockup,
  PipelineMockup,
  BrowserMockup,
} from "@/components/ProjectVisuals";

export function AgentIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="5" y="8" width="14" height="11" rx="3" />
      <path d="M12 8V4m0 0-2 2m2-2 2 2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9.5" cy="13.5" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="13.5" r="1.2" fill="currentColor" stroke="none" />
      <path d="M2 12h3M19 12h3" strokeLinecap="round" />
    </svg>
  );
}

export function ChatIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 6h16v9H9l-4 3.5V15H4Z" strokeLinejoin="round" />
      <path d="M8 10h8M8 12.5h5" strokeLinecap="round" />
    </svg>
  );
}

export function WorkflowIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="5" cy="6" r="2.4" />
      <circle cx="19" cy="6" r="2.4" />
      <circle cx="12" cy="18" r="2.4" />
      <path d="M7 7.5 10.3 16M17 7.5 13.7 16M7.4 6h9.2" strokeLinecap="round" />
    </svg>
  );
}

export function GearLinkIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="7" cy="17" r="3" />
      <circle cx="17" cy="7" r="3" />
      <path d="M9.2 14.8 14.8 9.2" strokeLinecap="round" />
    </svg>
  );
}

export function CodeIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 8 4.5 12 9 16M15 8l4.5 4-4.5 4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 5.5 11 18.5" strokeLinecap="round" />
    </svg>
  );
}

export function LayoutIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="4.5" width="16" height="15" rx="2" />
      <path d="M4 9.5h16M9 9.5V19.5" strokeLinecap="round" />
    </svg>
  );
}

export const CATEGORY_META = {
  web: {
    index: "01",
    label: "Web Development",
    sub: "Fast, conversion-ready sites wired straight into the CRM behind them.",
  },
  ai: {
    index: "02",
    label: "AI Automations",
    sub: "Agents that read, decide, and act — inside the tools you already use.",
  },
  crm: {
    index: "03",
    label: "CRM Workflows",
    sub: "Lead routing, follow-ups, and reporting that run without you touching them.",
  },
};

export const PROJECTS = [
  {
    slug: "northbridge-plumbing-platform",
    categoryKey: "web",
    featured: true,
    n: "01",
    title: "Northbridge Plumbing — Modern Web Platform & Dispatch System",
    client: "Northbridge Plumbing",
    desc: "A high-performance Next.js marketing and service booking web application for a residential plumbing contractor with emergency dispatch capture and direct CRM routing.",
    tags: ["Next.js", "Plumbing Platform", "Web Design", "CRM Dispatch"],
    liveUrl: "https://plumbing-website-frontend.vercel.app",
    Icon: CodeIcon,
    cardVisual: (
      <BrowserMockup
        url="plumbing-website-frontend.vercel.app"
        variant="marketing"
        hero={{
          image: "/images/hero-plumbing.jpg",
          logo: "Northbridge Plumbing",
          navLinks: ["Services", "About", "Contact"],
          headline: "Reliable Plumbing. Done Right.",
          subtext: "Licensed residential plumbers serving the Greater Toronto Area.",
          cta: "Call (416) 555-1234",
          badge: "Trusted since 2004",
        }}
      />
    ),
    description:
      "A complete digital presence and lead generation platform designed and built for Northbridge Plumbing. Featuring instantaneous page loads, 1-click emergency callout flows, transparent service catalogues, and automated quote request routing straight into the team's dispatch CRM.",
    features: [
      "Sub-second load times built on Next.js with perfect 98+ Lighthouse score",
      "Emergency callout integration and 1-click mobile phone dispatch",
      "Interactive service catalogue covering emergency repairs, drain cleaning, and water heaters",
      "Automated quote request and contact forms syncing directly to the CRM",
      "Local service area coverage lookup across Toronto and Greater Toronto Area",
    ],
    photo: { src: "/images/case-plumbing-web.jpg", alt: "Northbridge Plumbing professional service technician" },
    secondaryVisual: (
      <BrowserMockup
        url="plumbing-website-frontend.vercel.app"
        variant="marketing"
        hero={{
          image: "/images/hero-plumbing.jpg",
          logo: "Northbridge Plumbing",
          navLinks: ["Services", "Contact"],
          headline: "Reliable Plumbing. Done Right the First Time.",
          subtext: "Licensed, insured residential plumbing with clear pricing.",
          cta: "Book service",
          badge: "4.9 ★ Rating",
        }}
      />
    ),
    stack: ["Next.js", "Tailwind", "CRM API", "Vercel"],
    stats: [
      { value: "98", label: "Lighthouse performance" },
      { value: "0.8s", label: "First contentful paint" },
      { value: "+52%", label: "Online quote & call rate" },
      { value: "<5s", label: "Form-to-CRM lead time" },
    ],
    compare: { label: "Monthly online quote requests", before: "~12", after: "~48" },
  },
  {
    slug: "real-estate-agency-website",
    categoryKey: "web",
    featured: false,
    n: "02",
    title: "The Foster Company — Luxury Real Estate Web Platform",
    client: "The Foster Company",
    desc: "The Foster Company needed a bespoke digital platform to showcase luxury properties and route high-intent buyer inquiries straight into agent CRM pipelines with automated qualification.",
    tags: ["Next.js", "Real Estate", "Agency Design", "CRM Routing"],
    liveUrl: "https://the-foster-company.vercel.app",
    Icon: LayoutIcon,
    cardVisual: (
      <BrowserMockup
        url="the-foster-company.vercel.app"
        variant="realestate"
        hero={{
          image: "/images/hero-realestate.jpg",
          logo: "The Foster Company",
          navLinks: ["Listings", "Agents"],
          headline: "Real estate, done at an agency level.",
          subtext: "Curated listings, standout design, zero cookie-cutter templates.",
          cta: "View listings",
          badge: "Featured",
        }}
      />
    ),
    description:
      "The Foster Company wanted a site that felt like a top-tier real estate brand, not another templated listings page. I designed and built a fully custom Next.js site — searchable listings, individual agent profiles, and every inquiry form routed straight into the CRM as a qualified lead — polished to the same bar as a dedicated design agency would deliver.",
    features: [
      "Custom-designed, agency-level UI — not a listings template",
      "Searchable, filterable property listings with rich detail pages",
      "Agent profile pages with direct contact + inquiry forms",
      "Every inquiry lands in the CRM as a scored lead instantly",
      "Fast, fully responsive, and built to scale as listings grow",
    ],
    photo: { src: "/images/case-foster-realestate.jpg", alt: "The Foster corporate architectural building" },
    secondaryVisual: (
      <BrowserMockup
        url="the-foster-company.vercel.app"
        variant="realestate"
        hero={{
          image: "/images/hero-realestate.jpg",
          logo: "The Foster Company",
          navLinks: ["Listings", "Agents"],
          headline: "Real estate, done at an agency level.",
          subtext: "Curated listings, standout design, zero cookie-cutter templates.",
          cta: "View listings",
          badge: "Featured",
        }}
      />
    ),
    stack: ["Next.js", "Tailwind", "CRM API"],
    stats: [
      { value: "98", label: "Lighthouse performance" },
      { value: "+46%", label: "Listing inquiry rate" },
      { value: "<1s", label: "Page load time" },
      { value: "100%", label: "Inquiries synced to CRM" },
    ],
    compare: { label: "Listing inquiries per month", before: "~18", after: "~34" },
  },
  {
    slug: "outbound-qualifier-agent",
    categoryKey: "ai",
    featured: true,
    n: "01",
    title: "AI-Powered Lead Management & Sales Automation",
    client: "B2B SaaS Sales Team",
    desc: "The team needed a smarter way to manage incoming leads, improve customer response times, and create a more organized sales process. An AI agent reads, enriches, and scores/routes leads inside HubSpot before a rep ever sees them.",
    tags: ["AI Agent", "HubSpot", "Lead Routing", "OpenAI"],
    Icon: AgentIcon,
    cardVisual: (
      <ChatMockup
        messages={[
          { from: "them", text: "Hi — interested in the Pro plan for our 40-person team." },
          { from: "agent", text: "Got it, enriching your company profile now…" },
          { from: "agent", text: "✓ Lead scored 92/100 → routed to Alex (Enterprise AM)", tag: true },
        ]}
      />
    ),
    description:
      "Their sales team was spending the first hour of every day manually triaging inbound demo requests. I built an AI agent that reads each lead the moment it arrives, enriches it with firmographic data, scores intent, and routes it to the right rep inside HubSpot — with a Slack notification for high-priority opportunities.",
    features: [
      "Reads & enriches every inbound lead in real time",
      "Scores intent using deal-stage history + firmographics",
      "Routes to the right rep automatically inside HubSpot",
      "Escalates high-value leads to Slack instantly",
      "Runs 24/7 — no queue, zero manual triage",
    ],
    photo: { src: "/images/case-ai-sales.jpg", alt: "Modern sales office with city skyline backdrop" },
    secondaryVisual: (
      <BrowserMockup
        url="tryyoursaas.com"
        variant="marketing"
        hero={{
          image: "/images/hero-saas.jpg",
          logo: "TryYourSaaS",
          navLinks: ["Product", "Pricing"],
          headline: "Qualify every lead automatically.",
          subtext: "AI-scored leads, routed to the right rep in seconds.",
          cta: "Start free",
          badge: "New",
        }}
      />
    ),
    stack: ["HubSpot", "OpenAI", "Slack", "Zapier"],
    stats: [
      { value: "92%", label: "Avg. lead score accuracy" },
      { value: "3.4x", label: "Faster first response" },
      { value: "24/7", label: "Coverage, no queue" },
      { value: "0", label: "Leads missed" },
    ],
    compare: { label: "First response time", before: "~4 hours", after: "~90 seconds" },
  },
  {
    slug: "rag-chatbot",
    categoryKey: "ai",
    featured: false,
    n: "02",
    title: "RAG Enterprise Support & Ticket Resolution Hub",
    client: "E-commerce Brand",
    desc: "A retrieval-augmented customer experience bot that resolves routine inquiries and policy questions by querying live system data and return docs — escalating high-intent issues with full context.",
    tags: ["RAG", "AI Agent", "Support", "Vector DB"],
    liveUrl: "https://rag-chat-bot-frontend-9gwj.vercel.app/dashboard",
    Icon: ChatIcon,
    cardVisual: (
      <ChatMockup
        photo="/images/case-rag-hub.jpg"
        messages={[
          { from: "them", text: "Where's my order #4821?" },
          { from: "agent", text: "Shipped yesterday — arriving Thu via UPS." },
          { from: "agent", text: "✓ Resolved · CSAT 5/5", tag: true },
        ]}
      />
    ),
    description:
      "Their support inbox was drowning in repetitive order-status and policy questions. I built a retrieval-augmented chatbot that looks up real order data and store policy docs before answering — so every response is grounded in fact, not a hallucinated guess. It resolves the routine tickets on its own and hands off anything it's unsure about.",
    features: [
      "Retrieves live order data before answering — no guessing",
      "Grounded in your actual return & shipping policy docs",
      "Escalates to a human the moment confidence drops",
      "Synced to Salesforce for full ticket context",
      "Learns from every escalation to improve over time",
    ],
    photo: { src: "/images/case-rag-hub.jpg", alt: "Modern customer experience tech workspace" },
    secondaryVisual: <BrowserMockup url="shopbrand.com" variant="ecommerce" />,
    stack: ["Salesforce", "OpenAI", "Pinecone"],
    stats: [
      { value: "87%", label: "Tickets resolved without a human" },
      { value: "<10s", label: "Avg. response time" },
      { value: "0", label: "Hallucinated answers" },
      { value: "4.9", label: "Avg. CSAT score" },
    ],
    compare: { label: "Ticket resolution time", before: "~6 hours", after: "~10 seconds" },
  },
  {
    slug: "crm-rebuild",
    categoryKey: "crm",
    featured: true,
    n: "01",
    title: "Zoho CRM Rebuild & Automated Deal Pipeline",
    client: "Real Estate Agency",
    desc: "Transformed an outdated CRM instance into an automated deal pipeline with automated stage triggers, client follow-up sequences, and scheduled executive reporting.",
    tags: ["Zoho", "Automation", "Reporting", "Pipelines"],
    Icon: WorkflowIcon,
    cardVisual: (
      <PipelineMockup
        columns={[
          { name: "New", cards: ["Riverstone Condos", "Maple Ave Listing"] },
          { name: "Contacted", cards: ["Harbor View Loft"] },
          { name: "Won", cards: ["9th St Townhome"] },
        ]}
      />
    ),
    description:
      "Their Zoho instance had turned into a graveyard of dead stages and manual spreadsheets. I rebuilt it from the ground up — clean pipeline stages, automatic follow-up sequences on every status change, and a weekly report that used to take an afternoon now sent on its own.",
    features: [
      "Rebuilt pipeline stages around the actual sales process",
      "Auto follow-up sequences triggered on stage change",
      "Duplicate & stale-lead cleanup running on a schedule",
      "Weekly performance report generated automatically",
      "Full team onboarding + handoff documentation",
    ],
    photo: { src: "/images/case-crm-pipeline.jpg", alt: "Modern luxury real estate architectural development" },
    secondaryVisual: (
      <BrowserMockup
        url="riverstone-realty.com"
        variant="realestate"
        hero={{
          image: "/images/hero-realestate.jpg",
          logo: "Riverstone Realty",
          navLinks: ["Listings", "Agents"],
          headline: "Find your next home in Riverstone.",
          subtext: "Modern homes, curated listings, real support.",
          cta: "Book a tour",
          badge: "Featured",
        }}
      />
    ),
    stack: ["Zoho CRM", "Slack", "Google Sheets"],
    stats: [
      { value: "0", label: "Leads stuck > 48 hrs" },
      { value: "5hrs", label: "Saved per week" },
      { value: "100%", label: "Follow-ups sent on time" },
      { value: "1", label: "Automated weekly report" },
    ],
    compare: { label: "Weekly reporting time", before: "~3 hours", after: "0 — automatic" },
  },
  {
    slug: "ops-automation-suite",
    categoryKey: "crm",
    featured: false,
    n: "02",
    title: "Agency Operations & Automated Client Reporting",
    client: "Marketing Agency",
    desc: "Unified scattered project management, billing, and CRM data into a central automation layer that generates and delivers comprehensive client progress reports on autopilot.",
    tags: ["Integrations", "Make", "AI Agent", "HubSpot"],
    Icon: GearLinkIcon,
    cardVisual: (
      <PipelineMockup
        columns={[
          { name: "Backlog", cards: ["Client A retainer", "Client C onboarding"] },
          { name: "Automating", cards: ["Client B report sync"] },
          { name: "Reported", cards: ["Client D — sent"] },
        ]}
      />
    ),
    description:
      "This agency was managing a dozen client retainers across scattered tools — a CRM for contacts, spreadsheets for reporting, Slack for status updates. I connected everything into one automation layer that drafts and sends weekly client reports on its own, using live data pulled straight from the CRM.",
    features: [
      "Pulls live campaign data straight from the CRM",
      "Drafts weekly client reports automatically",
      "Flags underperforming campaigns before the client asks",
      "Posts status updates to the right Slack channel",
      "One dashboard for every retainer, always current",
    ],
    photo: { src: "/images/case-ops-agency.jpg", alt: "Contemporary creative digital agency workspace" },
    secondaryVisual: <BrowserMockup url="ops.agency.com" variant="dashboard" />,
    stack: ["HubSpot", "Slack", "Google Sheets", "Make"],
    stats: [
      { value: "12", label: "Client retainers automated" },
      { value: "6hrs", label: "Saved per week" },
      { value: "100%", label: "Reports sent on time" },
      { value: "0", label: "Missed status updates" },
    ],
    compare: { label: "Weekly report prep time", before: "~5 hours", after: "~5 minutes" },
  },
];

export function getProject(slug) {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getProjectsByCategory(key) {
  return PROJECTS.filter((p) => p.categoryKey === key);
}
