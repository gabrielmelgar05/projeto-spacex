"use client";

import { gsap, EASE } from "@/lib/gsap";

/**
 * Reusable entrance patterns. Call them inside a `gsap.matchMedia()` motion
 * branch so reduced-motion users simply see the final state.
 * All of them use `once: true` — content never re-hides after being read — and
 * explicit end values (fromTo), so a remount can never capture a hidden state.
 */

type Target = gsap.TweenTarget;

/** Masked lines sliding up (pairs with <MaskLines/>, `[data-line]`). */
export function revealLines(lines: Target, trigger: Element | string, start = "top 82%", vars: gsap.TweenVars = {}) {
  return gsap.fromTo(lines, { yPercent: 115 }, {
    yPercent: 0,
    duration: 1.35,
    ease: EASE.expo,
    stagger: 0.09,
    scrollTrigger: { trigger, start, once: true },
    ...vars,
  });
}

/** Soft rise + fade for supporting copy and data. */
export function revealFade(targets: Target, trigger: Element | string, start = "top 85%", vars: gsap.TweenVars = {}) {
  const { y = 24, ...rest } = vars;
  return gsap.fromTo(targets, { autoAlpha: 0, y }, {
    autoAlpha: 1,
    y: 0,
    duration: 1.1,
    ease: EASE.out,
    stagger: 0.07,
    scrollTrigger: { trigger, start, once: true },
    ...rest,
  });
}

/** Section index label: text fades, hairline draws. */
export function revealLabel(scope: Element, start = "top 85%") {
  const label = scope.querySelector("[data-reveal-label]");
  if (!label) return;
  const tl = gsap.timeline({ scrollTrigger: { trigger: label, start, once: true } });
  tl.fromTo(
    label.querySelector("[data-label-line]"),
    { scaleX: 0, transformOrigin: "0 50%" },
    { scaleX: 1, duration: 1, ease: EASE.expo },
  ).fromTo(label.children, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8, stagger: 0.08, ease: "none" }, 0);
  return tl;
}

/** Image frame wiped open with clip-path (direction = where it grows from). */
export function revealFrame(
  frame: Element,
  from: "bottom" | "top" | "left" | "right" = "bottom",
  trigger: Element | string = frame,
  start = "top 85%",
) {
  const inset = {
    bottom: "inset(100% 0% 0% 0%)",
    top: "inset(0% 0% 100% 0%)",
    left: "inset(0% 100% 0% 0%)",
    right: "inset(0% 0% 0% 100%)",
  }[from];
  return gsap.fromTo(
    frame,
    { clipPath: inset },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1.6,
      ease: EASE.expoInOut,
      scrollTrigger: { trigger, start, once: true },
    },
  );
}

/** Media layer drifting inside its frame while the frame crosses the viewport. */
export function parallaxMedia(media: Element | null, trigger: Element, amount = 12) {
  if (!media) return;
  return gsap.fromTo(
    media,
    { yPercent: -amount / 2, scale: 1 + amount / 100 },
    {
      yPercent: amount / 2,
      ease: "none",
      scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: true },
    },
  );
}
