import { prefersReducedMotion } from "./motion";

/**
 * Reference-counted scroll lock (preloader + mobile menu may overlap).
 * `scrollbar-gutter: stable` on <html> prevents layout shift.
 */
let locks = 0;

export function lockScroll(): void {
  locks += 1;
  document.documentElement.classList.add("is-locked");
}

export function unlockScroll(): void {
  locks = Math.max(0, locks - 1);
  if (locks === 0) document.documentElement.classList.remove("is-locked");
}

/**
 * Smoothly scroll to a section and move focus there for keyboard and
 * screen-reader users. Honors reduced motion.
 */
export function scrollToSection(id: string): void {
  const target = id === "top" ? document.getElementById("top") : document.getElementById(id);
  if (!target) return;
  const behavior: ScrollBehavior = prefersReducedMotion() ? "auto" : "smooth";
  const top = id === "top" ? 0 : target.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top, behavior });

  if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });

  if (window.location.hash !== `#${id}`) {
    window.history.replaceState(null, "", id === "top" ? window.location.pathname : `#${id}`);
  }
}
