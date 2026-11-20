"use client";

import { useRef } from "react";
import { gsap, useGSAP, EASE, MEDIA } from "@/lib/gsap";
import { releaseIntro } from "@/lib/intro";
import { Logo } from "@/components/ui/Logo";

/** Upper bound for waiting on fonts/critical images — the intro never hangs. */
const ASSET_TIMEOUT = 2800;

function waitForImage(img: HTMLImageElement) {
  if (img.complete) return Promise.resolve();
  return new Promise<void>((resolve) => {
    img.addEventListener("load", () => resolve(), { once: true });
    img.addEventListener("error", () => resolve(), { once: true });
  });
}

function waitForCriticalAssets() {
  const images = Array.from(
    document.querySelectorAll<HTMLImageElement>("[data-critical] img, .preloader img"),
  );
  const fonts = document.fonts?.ready ?? Promise.resolve();
  const all = Promise.all([fonts, ...images.map(waitForImage)]).then(() => undefined);
  const timeout = new Promise<void>((resolve) => setTimeout(resolve, ASSET_TIMEOUT));
  return Promise.race([all, timeout]);
}

/**
 * SECTION 00 — Animated preloader.
 *
 * Server-rendered as an opaque curtain (no flash of content). On the client:
 *   1. Logo revealed through an animated mask, scan line and progress start.
 *   2. Waits (bounded) for fonts + critical hero images.
 *   3. Progress completes, logo exits, curtain wipes up and releases the hero.
 *
 * Fail-safes: CSS auto-hides the curtain after 7s if JS never runs; reduced
 * motion skips it entirely; Strict Mode double-mount is reverted by useGSAP.
 */
export function MissionPreloader() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const html = document.documentElement;
      const reduce = window.matchMedia(MEDIA.reduced).matches;
      const alreadyHidden = getComputedStyle(el).visibility === "hidden";

      if (reduce || alreadyHidden) {
        gsap.set(el, { autoAlpha: 0, display: "none" });
        releaseIntro();
        return;
      }

      // Take over from the CSS fail-safe.
      el.setAttribute("data-js", "");
      if ("scrollRestoration" in history) history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
      html.classList.add("is-locked");

      let cancelled = false;
      const counter = { v: 0 };
      const counterEl = el.querySelector<HTMLElement>("[data-counter]");
      const writeCounter = () => {
        if (counterEl) counterEl.textContent = String(Math.round(counter.v)).padStart(3, "0");
      };

      // Phase 1 — reveal
      const intro = gsap.timeline({ defaults: { ease: EASE.expoInOut } });
      intro
        .set(el.querySelectorAll("[data-pl-fade]"), { autoAlpha: 0, y: 8 })
        .set("[data-pl-mask]", { clipPath: "inset(0% 100% 0% 0%)" })
        .set("[data-pl-scan]", { left: "0%", autoAlpha: 0 })
        .set("[data-pl-bar]", { scaleX: 0 })
        .to(el.querySelectorAll("[data-pl-fade]"), {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: EASE.out,
          stagger: 0.06,
        })
        .to("[data-pl-scan]", { autoAlpha: 1, duration: 0.2, ease: "none" }, 0.2)
        .to("[data-pl-mask]", { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1 }, 0.2)
        .to("[data-pl-scan]", { left: "100%", duration: 1.1 }, 0.2)
        .to("[data-pl-scan]", { autoAlpha: 0, duration: 0.25, ease: "none" }, 1.15)
        .to("[data-pl-bar]", { scaleX: 0.72, duration: 1.3, ease: EASE.soft }, 0.15)
        .to(counter, { v: 72, duration: 1.3, ease: EASE.soft, onUpdate: writeCounter }, 0.15);

      // Phase 2 — exit (built now, played once assets are ready)
      const outro = gsap.timeline({
        paused: true,
        defaults: { ease: EASE.expoInOut },
        onComplete: () => {
          html.classList.remove("is-locked");
          gsap.set(el, { display: "none" });
        },
      });
      outro
        .to("[data-pl-bar]", { scaleX: 1, duration: 0.4, ease: EASE.out })
        .to(counter, { v: 100, duration: 0.4, ease: EASE.out, onUpdate: writeCounter }, "<")
        .to("[data-pl-mask]", { clipPath: "inset(0% 0% 100% 0%)", yPercent: -12, duration: 0.7 }, "+=0.05")
        .to(el.querySelectorAll("[data-pl-fade]"), { autoAlpha: 0, duration: 0.35, ease: "none" }, "<")
        .add(() => releaseIntro(), "-=0.4")
        .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 1.05 }, "<");

      Promise.all([intro.then(), waitForCriticalAssets()]).then(() => {
        if (!cancelled) outro.play();
      });

      return () => {
        cancelled = true;
        html.classList.remove("is-locked");
      };
    },
    { scope: root },
  );

  return (
    <div ref={root} className="preloader" role="status" aria-label="Loading mission experience">
      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-[var(--gutter)] pt-6 t-label text-dim">
        <span data-pl-fade>MSN-001</span>
        <span data-pl-fade>Concept experience</span>
      </div>

      <div className="flex flex-col items-center gap-8">
        <div className="relative">
          <div data-pl-mask className="preloader__logo">
            <Logo />
          </div>
          <span
            data-pl-scan
            aria-hidden
            className="pointer-events-none absolute -top-3 -bottom-3 w-px bg-ink/60"
            style={{ left: 0 }}
          />
        </div>
        <p data-pl-fade className="t-label text-mute">
          Initializing mission <span className="text-dim">/</span> Mars 001
        </p>
      </div>

      <div className="absolute inset-x-0 bottom-0 px-[var(--gutter)] pb-6">
        <div className="flex items-end justify-between gap-6 t-label text-dim">
          <span data-pl-fade>40.1°N · 189.6°E</span>
          <span data-pl-fade className="t-data text-mute">
            <span data-counter>000</span>
          </span>
        </div>
        <div className="mt-3 h-px w-full bg-line" data-pl-fade>
          <div data-pl-bar className="h-px w-full origin-left bg-ink" />
        </div>
      </div>
    </div>
  );
}
