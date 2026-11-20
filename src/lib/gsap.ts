"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";

// Registering is idempotent, so this module can be imported from anywhere.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText, MotionPathPlugin, useGSAP);
  gsap.defaults({ ease: "power3.out", duration: 1 });
  ScrollTrigger.config({ ignoreMobileResize: true });
}

/** Shared easing vocabulary — keeps motion consistent across sections. */
export const EASE = {
  out: "power3.out",
  inOut: "power3.inOut",
  expo: "expo.out",
  expoInOut: "expo.inOut",
  soft: "sine.inOut",
} as const;

/** gsap.matchMedia condition sets used by every section. */
export const MEDIA = {
  motion: "(prefers-reduced-motion: no-preference)",
  reduced: "(prefers-reduced-motion: reduce)",
  desktop: "(min-width: 1024px)",
  mobile: "(max-width: 1023px)",
  finePointer: "(hover: hover) and (pointer: fine)",
} as const;

let refreshTimer: ReturnType<typeof setTimeout> | undefined;

/** Debounced ScrollTrigger.refresh — called when late images or fonts land. */
export function scheduleRefresh(delay = 150) {
  if (typeof window === "undefined") return;
  clearTimeout(refreshTimer);
  refreshTimer = setTimeout(() => ScrollTrigger.refresh(), delay);
}

/** Smooth scroll to a selector / y position, falling back to native scrolling. */
export function smoothScrollTo(target: string | number, duration = 1.4) {
  const reduce = window.matchMedia(MEDIA.reduced).matches;
  if (reduce) {
    if (typeof target === "number") window.scrollTo({ top: target });
    else document.querySelector(target)?.scrollIntoView();
    return;
  }
  gsap.to(window, {
    duration,
    ease: EASE.expoInOut,
    scrollTo: { y: target, autoKill: true },
    overwrite: "auto",
  });
}

export { gsap, ScrollTrigger, SplitText, MotionPathPlugin, useGSAP };
