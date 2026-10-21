"use client";

import { motion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

const NBSP = String.fromCharCode(160);
const LETTERS = "ABDULLAH AZHAR".split("").map((ch) => (ch === " " ? NBSP : ch));

/** Oversized ghost name that rises letter by letter at the foot of the page. */
export default function Wordmark() {
  return (
    <motion.p
      aria-hidden="true"
      className="font-display mt-16 flex select-none justify-center overflow-hidden whitespace-nowrap text-[clamp(2rem,8.6vw,9.5rem)] font-extrabold leading-[0.9] tracking-[-0.03em]"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.035 } } }}
    >
      {LETTERS.map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block text-white/[0.06] transition-colors duration-300 hover:text-accent"
          variants={{
            hidden: { y: "100%" },
            show: { y: "0%", transition: { duration: 0.8, ease: EASE_OUT } },
          }}
        >
          {ch}
        </motion.span>
      ))}
    </motion.p>
  );
}
