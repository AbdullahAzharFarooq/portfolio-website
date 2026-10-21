"use client";

import { motion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

const container = {
  hidden: {},
  show: ({ stagger, delay }) => ({
    transition: { staggerChildren: stagger, delayChildren: delay },
  }),
};

export const maskedWord = {
  hidden: { y: "110%", rotate: 4 },
  show: { y: "0%", rotate: 0, transition: { duration: 0.9, ease: EASE_OUT } },
};

/** One word that slides up from behind an invisible line. Needs a variants parent. */
export function MaskWord({ children, className = "" }) {
  return (
    <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
      <motion.span className={`inline-block origin-bottom-left ${className}`} variants={maskedWord}>
        {children}
      </motion.span>
    </span>
  );
}

/**
 * Masked word-by-word reveal: each word slides up from behind an
 * invisible line, the signature heading treatment on award-winning sites.
 * Plays once when scrolled into view.
 */
export default function SplitText({
  text,
  as = "span",
  className = "",
  wordClassName = "",
  highlight = [], // indexes of words that get highlightClassName
  highlightClassName = "",
  delay = 0,
  stagger = 0.06,
}) {
  const Component = motion[as] ?? motion.span;

  return (
    <Component
      className={className}
      variants={container}
      custom={{ stagger, delay }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
    >
      {text.split(" ").map((w, i, all) => (
        <span key={i}>
          <MaskWord className={highlight.includes(i) ? `${wordClassName} ${highlightClassName}` : wordClassName}>
            {w}
          </MaskWord>
          {i < all.length - 1 && " "}
        </span>
      ))}
    </Component>
  );
}
