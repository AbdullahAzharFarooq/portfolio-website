"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";

const IntroContext = createContext({ introDone: true, finishIntro: () => {} });

/**
 * Wraps the app so every framer-motion animation honours the OS
 * "reduce motion" setting, and lets the preloader tell the hero
 * when it's safe to play its entrance (instead of animating behind it).
 */
export default function MotionProvider({ children }) {
  const [introDone, setIntroDone] = useState(false);

  // Safety net: never leave the page waiting on the preloader.
  useEffect(() => {
    const t = setTimeout(() => setIntroDone(true), 5000);
    return () => clearTimeout(t);
  }, []);

  return (
    <IntroContext.Provider value={{ introDone, finishIntro: () => setIntroDone(true) }}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </IntroContext.Provider>
  );
}

export function useIntro() {
  return useContext(IntroContext);
}
