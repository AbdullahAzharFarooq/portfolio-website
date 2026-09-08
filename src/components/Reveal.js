"use client";

import { useEffect, useRef, useState } from "react";

export default function Reveal({
  children,
  direction = "up", // "up" | "down" | "left" | "right" | "zoom" | "fade"
  delay = 0, // delay in ms, e.g. 100, 200
  duration = 0.8, // duration in seconds
  threshold = 0.12,
  rootMargin = "0px 0px -40px 0px",
  className = "",
  style = {},
  as: Component = "div",
  triggerOnce = true,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If browser doesn't support IntersectionObserver, reveal immediately
    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [threshold, rootMargin, triggerOnce]);

  // Determine transform offset based on direction
  const getInitialTransform = () => {
    switch (direction) {
      case "left":
        return "translateX(-48px)";
      case "right":
        return "translateX(48px)";
      case "up":
        return "translateY(36px)";
      case "down":
        return "translateY(-36px)";
      case "zoom":
        return "scale(0.92)";
      case "fade":
      default:
        return "none";
    }
  };

  const dynamicStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "none" : getInitialTransform(),
    transitionProperty: "opacity, transform",
    transitionDuration: `${duration}s`,
    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    transitionDelay: `${delay}ms`,
    willChange: isVisible ? "auto" : "opacity, transform",
    ...style,
  };

  return (
    <Component ref={ref} className={className} style={dynamicStyle}>
      {children}
    </Component>
  );
}
