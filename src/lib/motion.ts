/**
 * Global motion configuration.
 *
 * MOTION_ENABLED = false turns every section into its static, reduced-motion
 * version (useful for screenshots, presentations or performance testing).
 * Visitors with `prefers-reduced-motion: reduce` always get that version.
 */
export const MOTION_ENABLED = true;

/** Breakpoint (px) where pinned, scrubbed scenes are enabled. */
export const DESKTOP_MIN = 1024;

const OFF = "not all";
const ON = "all";

/** Media queries for gsap.matchMedia(). Exactly one of full/lite/reduced matches. */
export const MQ = MOTION_ENABLED
  ? {
      /** Desktop: pinned scenes, scrub, parallax. */
      full: `(min-width: ${DESKTOP_MIN}px) and (prefers-reduced-motion: no-preference)`,
      /** Tablet / mobile: lighter reveals, no pinning. */
      lite: `(max-width: ${DESKTOP_MIN - 1}px) and (prefers-reduced-motion: no-preference)`,
      /** Static presentation. */
      reduced: "(prefers-reduced-motion: reduce)",
      /** Any animated mode. */
      motion: "(prefers-reduced-motion: no-preference)",
    }
  : { full: OFF, lite: OFF, reduced: ON, motion: OFF };

export const EASE = {
  out: "expo.out",
  inOut: "expo.inOut",
  soft: "power3.out",
  softInOut: "power2.inOut",
  linear: "none",
} as const;

export function prefersReducedMotion(): boolean {
  if (!MOTION_ENABLED) return true;
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
