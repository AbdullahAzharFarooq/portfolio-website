import Image from "next/image";
import Link from "next/link";

const SITEMAP = [
  { label: "About", href: "/#about" },
  { label: "Solutions", href: "/#services" },
  { label: "Work", href: "/#work" },
];

const SOLUTIONS = [
  "Lost Leads & Slow Follow-Ups",
  "Repetitive Support Tickets",
  "Broken CRM Workflows",
  "Disconnected Tools",
  "Sites That Don't Convert",
  "Leaky Landing Pages",
];

const EMAIL = "abdullahazharfarooq01@gmail.com";

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/abdullahazhar71?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/19VCUxujwA/?mibextid=wwXIfr",
    icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  },
];

export default function Footer() {
  return (
    <footer id="contact" className="section-dark relative overflow-hidden border-t border-white/10">
      <div className="bg-grid absolute inset-0 opacity-30 pointer-events-none" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.07] blur-[120px]" />

      <div className="container-px relative pt-16 pb-10 sm:pt-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/#top" className="group inline-flex items-center gap-2.5">
              <Image
                src="/images/logo-mark.png"
                alt=""
                width={327}
                height={296}
                className="h-9 w-9 shrink-0 object-contain transition-transform duration-300 group-hover:scale-110"
              />
              <span className="font-display text-sm font-bold uppercase tracking-[0.18em] text-ink">
                Abdullah Azhar<span className="text-accent">.</span>
              </span>
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-muted-dark">
              I find the bottleneck costing your team time or leads, then build the AI agent, CRM workflow, or website that fixes it — for good.
            </p>
            <a
              href="mailto:abdullahazharfarooq01@gmail.com"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black shadow-[0_0_20px_-3px_rgba(205,255,58,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_28px_rgba(205,255,58,0.65)]"
            >
              <span>Start a Project</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 gap-x-10 gap-y-12 sm:grid-cols-3 sm:gap-x-16 lg:gap-x-24">
            {/* Sitemap */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/35">
                Sitemap
              </p>
              <ul className="mt-5 space-y-3">
                {SITEMAP.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted-dark transition-colors duration-200 hover:text-accent"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/35">
                Problems I Fix
              </p>
              <ul className="mt-5 space-y-3">
                {SOLUTIONS.map((s) => (
                  <li key={s} className="text-sm text-muted-dark">
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="col-span-2 sm:col-span-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/35">
                Get in touch
              </p>
              <a
                href={`mailto:${EMAIL}`}
                className="mt-5 block break-all text-sm font-semibold text-ink transition-colors duration-200 hover:text-accent"
              >
                {EMAIL}
              </a>
              <p className="mt-4 text-sm text-muted-dark">
                Direct response within 24 hours.
              </p>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted-dark transition-colors duration-200 hover:text-accent"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      {s.icon}
                    </svg>
                    <span>{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-muted-dark sm:flex-row">
          <span suppressHydrationWarning>
            © {new Date().getFullYear()} Abdullah Azhar. All rights reserved.
          </span>
          <Link
            href="/#top"
            className="inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-accent"
          >
            <span>Back to top</span>
            <span aria-hidden="true">↑</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
