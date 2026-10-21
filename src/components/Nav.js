"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import Magnetic from "@/components/Magnetic";
import { useIntro } from "@/components/MotionProvider";
import { EASE_OUT } from "@/lib/motion";

const LINKS = [
  { label: "About", href: "/#about" },
  { label: "Solutions", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Work", href: "/#work" },
];

const EMAIL_HREF = "mailto:abdullahazharfarooq01@gmail.com";

export default function Nav() {
  const { introDone } = useIntro();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [active, setActive] = useState(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 20);
    // Tuck away while reading down, return the moment the visitor scrolls up.
    if (latest > prev && latest > 320) setHidden(true);
    else if (latest < prev) setHidden(false);
  });

  // Highlight the link for whichever section is crossing the middle of the viewport.
  // Every section is watched so the pill clears over ones that aren't in the nav.
  useEffect(() => {
    if (pathname !== "/") return;
    const sections = document.querySelectorAll("main section[id], footer[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`/#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  const activeHref = pathname === "/" ? active : null;

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const close = (e) => e.key === "Escape" && setMobileMenuOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", close);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: "-110%" }}
        animate={{ y: !introDone || (hidden && !mobileMenuOpen) ? "-110%" : "0%" }}
        transition={{ duration: 0.6, ease: EASE_OUT, delay: introDone && !scrolled ? 0.5 : 0 }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,padding,border-color,box-shadow] duration-300 ${
          scrolled
            ? "border-b border-white/[0.08] bg-[#0a0a0a]/80 backdrop-blur-xl shadow-lg py-3"
            : "border-b border-transparent bg-transparent py-5"
        }`}
      >
        <nav className="container-px mx-auto flex max-w-[1400px] items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/#top"
            className="group flex shrink-0 items-center gap-2.5 whitespace-nowrap transition-opacity hover:opacity-90"
          >
            <Image
              src="/images/logo-mark.png"
              alt=""
              width={327}
              height={296}
              priority
              className="h-8 w-8 shrink-0 object-contain transition-transform duration-500 group-hover:rotate-[360deg] group-hover:scale-110"
            />
            <span className="font-display text-sm font-bold tracking-[0.18em] text-ink uppercase">
              Abdullah Azhar<span className="text-accent">.</span>
            </span>
          </Link>

          {/* Desktop Navigation Links (Floating Glass Capsule) */}
          <ul className="hidden shrink-0 items-center gap-1 whitespace-nowrap rounded-full border border-white/[0.12] bg-[#141512]/60 px-2 py-1.5 backdrop-blur-md lg:flex shadow-inner">
            {LINKS.map((link) => {
              const isActive = activeHref === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`group relative block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${
                      isActive ? "text-black" : "text-muted-dark hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full bg-accent shadow-[0_0_18px_rgba(205,255,58,0.45)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="absolute inset-0 scale-90 rounded-full bg-white/[0.08] opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100" />
                    <span className="relative">{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA & Mobile Menu Button */}
          <div className="flex shrink-0 items-center gap-3">
            <Magnetic strength={0.25} className="hidden sm:inline-block">
              <Link
                href={EMAIL_HREF}
                className="group inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-accent px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black shadow-[0_0_20px_-3px_rgba(205,255,58,0.4)] transition-shadow duration-300 hover:shadow-[0_0_28px_rgba(205,255,58,0.65)]"
              >
                <span>Start a Project</span>
                <span className="text-sm transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
              </Link>
            </Magnetic>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10 lg:hidden"
            >
              <motion.span
                className="absolute h-[2px] w-4 rounded-full bg-current"
                animate={mobileMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
              />
              <motion.span
                className="absolute h-[2px] w-4 rounded-full bg-current"
                animate={mobileMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-40 lg:hidden"
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-lg"
              variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className="fixed inset-x-4 top-20 origin-top rounded-3xl border border-white/15 bg-[#111112] p-6 shadow-2xl"
              variants={{
                open: {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: { type: "spring", stiffness: 300, damping: 28, staggerChildren: 0.06, delayChildren: 0.08 },
                },
                closed: { opacity: 0, scale: 0.95, y: -12, transition: { duration: 0.2 } },
              }}
            >
              <ul className="flex flex-col gap-3">
                {LINKS.map((link) => (
                  <motion.li
                    key={link.href}
                    variants={{ open: { opacity: 1, x: 0 }, closed: { opacity: 0, x: -16 } }}
                    transition={{ duration: 0.4, ease: EASE_OUT }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-wider transition-colors hover:bg-white/5 hover:text-accent ${
                        activeHref === link.href ? "text-accent" : "text-white"
                      }`}
                    >
                      <span>{link.label}</span>
                      <span className="text-muted-dark">→</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                className="mt-6 border-t border-white/10 pt-5"
                variants={{ open: { opacity: 1, y: 0 }, closed: { opacity: 0, y: 10 } }}
              >
                <Link
                  href={EMAIL_HREF}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3.5 text-xs font-bold uppercase tracking-wider text-black transition-transform hover:scale-[1.02]"
                >
                  <span>Start a Project</span>
                  <span>→</span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
