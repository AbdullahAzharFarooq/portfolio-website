"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DrawLine from "@/components/DrawLine";
import Magnetic from "@/components/Magnetic";
import Reveal from "@/components/Reveal";
import SplitText from "@/components/SplitText";

const EMAIL = "abdullahazharfarooq01@gmail.com";

export default function ContactCTA() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <div className="container-px relative pt-24 pb-16 sm:pt-32 sm:pb-20">
      <div className="mx-auto max-w-[1400px]">
        <Reveal direction="left" duration={0.8}>
          <p className="font-script text-2xl text-accent">Got a bottleneck?</p>
        </Reveal>

        <div className="mt-2 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="font-display text-[clamp(2.6rem,7.5vw,7rem)] font-extrabold leading-[0.98] tracking-[-0.02em]">
            <SplitText text="Let's fix what's" className="block" />
            <SplitText
              text="slowing you down."
              className="block"
              delay={0.15}
              highlight={[0]}
              highlightClassName="font-script font-bold lowercase text-accent text-[1.05em] tracking-normal"
            />
          </h2>

          {/* circular magnetic CTA — a dark fill rises inside on hover */}
          <Reveal direction="zoom" delay={300} duration={0.8} className="shrink-0 self-start lg:self-end">
            <Magnetic strength={0.4}>
              <a
                href={`mailto:${EMAIL}`}
                className="group relative flex h-36 w-36 items-center justify-center overflow-hidden rounded-full bg-accent text-center text-black shadow-[0_0_50px_-5px_rgba(205,255,58,0.45)] sm:h-44 sm:w-44"
              >
                <span className="absolute inset-0 translate-y-full rounded-full bg-ink-dark transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0" />
                <span className="relative flex flex-col items-center gap-1 text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-500 group-hover:text-accent">
                  <span className="text-2xl transition-transform duration-500 group-hover:rotate-45">↗</span>
                  Start a
                  <br />
                  Project
                </span>
              </a>
            </Magnetic>
          </Reveal>
        </div>

        <DrawLine className="mt-14" />

        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* email with copy-to-clipboard */}
          <Reveal direction="up" delay={100} duration={0.7}>
            <button
              type="button"
              onClick={copyEmail}
              className="group flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.03] py-2 pl-5 pr-2 text-left transition-colors duration-300 hover:border-accent/60"
            >
              <span className="break-all font-display text-sm font-semibold text-ink sm:text-base">
                {EMAIL}
              </span>
              <span className="relative flex h-8 min-w-[4.5rem] items-center justify-center overflow-hidden rounded-full bg-white/10 px-3 text-[10px] font-bold uppercase tracking-wider text-muted-dark transition-colors duration-300 group-hover:bg-accent group-hover:text-black">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied ? "copied" : "copy"}
                    initial={{ y: 14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -14, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {copied ? "Copied ✓" : "Copy"}
                  </motion.span>
                </AnimatePresence>
              </span>
            </button>
          </Reveal>

          <Reveal direction="up" delay={200} duration={0.7}>
            <p className="flex items-center gap-2.5 text-sm text-muted-dark">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Available for new projects · Direct response within 24 hours
            </p>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
