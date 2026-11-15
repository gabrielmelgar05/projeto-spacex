"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { EASE, prefersReducedMotion } from "@/lib/motion";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import { MEDIA } from "@/content/media";
import { useExperience } from "@/hooks/useExperience";
import { useLanguage } from "@/hooks/useLanguage";
import { SpaceXLogo } from "@/components/ui/SpaceXLogo";

/** Shortest time the logo animation is allowed to play before exiting. */
const MIN_DURATION = 2.3; // seconds
/** Hard ceiling: the experience is released even if a resource never settles. */
const SAFETY_TIMEOUT = 7000; // ms

type Task = () => Promise<unknown>;

/**
 * Real readiness signals. Each settled task advances the progress bar.
 * Failures count as settled — the page must never hang on a resource.
 */
function readinessTasks(): Task[] {
  const hero = MEDIA["hero-mars"];
  const tasks: Task[] = [
    // App hydrated & first frame painted
    () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
    // Web fonts (prevents type reflow once the hero appears)
    () => (document.fonts ? document.fonts.ready : Promise.resolve()),
    // All critical resources of the document
    () =>
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise((resolve) => window.addEventListener("load", resolve, { once: true })),
  ];
  // Hero image decode — only when a final image has been configured.
  const heroSrc: string | null = hero.src;
  if (heroSrc) {
    tasks.push(() => {
      const img = new Image();
      img.src = heroSrc;
      return img.decode().catch(() => undefined);
    });
  }
  return tasks;
}

export function Preloader() {
  const { t } = useLanguage();
  const { setPhase } = useExperience();
  const rootRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);
  const [valueNow, setValueNow] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let disposed = false;
    let exiting = false;
    let safetyId = 0;
    const reduced = prefersReducedMotion();
    const progress = { value: 0 };
    let target = 0;
    let introDone = false;
    let tasksDone = false;

    lockScroll();
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    const initialHash = window.location.hash.slice(1);
    window.scrollTo(0, 0);

    const q = gsap.utils.selector(root);
    const fill = q(".preloader__fill");

    const render = () => {
      const pct = Math.round(progress.value * 100);
      gsap.set(fill, { scaleX: progress.value });
      if (percentRef.current) percentRef.current.textContent = String(pct).padStart(3, "0");
    };

    const ctx = gsap.context(() => {}, root);

    const finish = () => {
      if (disposed) return;
      setDone(true);
      setPhase("ready");
      unlockScroll();
      ScrollTrigger.refresh();
      if (initialHash) {
        document.getElementById(initialHash)?.scrollIntoView({ behavior: "auto" });
      }
    };

    const exit = () => {
      if (exiting || disposed) return;
      exiting = true;
      window.clearTimeout(safetyId);
      setValueNow(100);

      ctx.add(() => {
        gsap.killTweensOf(progress);
        // Background tab: animation frames are paused, so release the page instantly.
        if (document.hidden) {
          progress.value = 1;
          render();
          setPhase("revealing");
          gsap.set(root, { autoAlpha: 0 });
          finish();
          return;
        }
        if (reduced) {
          progress.value = 1;
          render();
          setPhase("revealing");
          gsap.to(root, { autoAlpha: 0, duration: 0.45, ease: "none", onComplete: finish });
          return;
        }

        const tl = gsap.timeline({ defaults: { ease: EASE.inOut } });
        tl.to(progress, { value: 1, duration: 0.35, ease: "power2.out", onUpdate: render })
          // the wordmark recedes upward into its own mask
          .to(q(".preloader__logo"), { yPercent: -110, duration: 0.75 }, "+=0.1")
          .to(q(".preloader__meta"), { autoAlpha: 0, y: -6, duration: 0.5, ease: EASE.soft }, "<")
          .to(q(".preloader__track"), { scaleX: 0, transformOrigin: "100% 50%", duration: 0.8 }, "<0.05")
          // copper seam crosses the screen
          .fromTo(
            q(".preloader__seam"),
            { scaleX: 0, transformOrigin: "0% 50%" },
            { scaleX: 1, duration: 0.8 },
            "-=0.4",
          )
          .add(() => {
            setPhase("revealing");
            root.style.pointerEvents = "none";
          }, "-=0.05")
          // the black surface opens along the seam
          .to(q(".preloader__panel--top"), { yPercent: -100, duration: 1.3 }, "<")
          .to(q(".preloader__panel--bottom"), { yPercent: 100, duration: 1.3 }, "<")
          .to(q(".preloader__seam"), { autoAlpha: 0, scaleY: 0.2, duration: 0.6, ease: EASE.soft }, "<0.25")
          .add(finish);
      });
    };

    const maybeExit = () => {
      if (introDone && tasksDone) exit();
    };

    const advanceTo = (value: number) => {
      target = Math.max(target, value);
      ctx.add(() => {
        gsap.to(progress, {
          value: target,
          duration: reduced ? 0.2 : 0.7,
          ease: "power2.out",
          overwrite: true,
          onUpdate: render,
        });
      });
      setValueNow(Math.round(target * 100));
    };

    // ── Intro: line → wordmark → swoosh trajectory ─────────────────────
    ctx.add(() => {
      if (reduced) {
        introDone = true;
        return;
      }
      const letters = q("[data-letter]");
      const sparkPath = root.querySelector<SVGPathElement>("[data-spark-path]");
      const tl = gsap.timeline({
        onComplete: () => {
          introDone = true;
          maybeExit();
        },
      });
      tl.fromTo(
        q(".preloader__track"),
        { scaleX: 0, transformOrigin: "50% 50%" },
        { scaleX: 1, duration: 0.9, ease: EASE.inOut },
        0.15,
      )
        .to(letters, { strokeDashoffset: 0, duration: 1.05, ease: EASE.inOut, stagger: 0.075 }, 0.55)
        .to(q("[data-x-guide]"), { strokeDashoffset: 0, duration: 0.55, ease: "power2.inOut" }, 0.95)
        .to(q("[data-swoosh-guide]"), { strokeDashoffset: 0, duration: 1.1, ease: "power4.inOut" }, 1.15)
        .set(q("[data-spark]"), { opacity: 1 }, 1.15)
        .to(
          q("[data-spark]"),
          {
            duration: 1.1,
            ease: "power4.inOut",
            motionPath: { path: sparkPath ?? "", align: sparkPath ?? undefined, alignOrigin: [0.5, 0.5] },
          },
          1.15,
        )
        .to(q("[data-spark]"), { opacity: 0, duration: 0.3, ease: "none" }, 2.1)
        .to(q(".preloader__meta"), { opacity: 1, duration: 0.6, ease: EASE.soft }, 0.7);

      if (tl.duration() < MIN_DURATION) tl.to({}, { duration: MIN_DURATION - tl.duration() });
    });

    // ── Real readiness ─────────────────────────────────────────────────
    const tasks = readinessTasks();
    let settled = 0;
    tasks.forEach((task) => {
      task()
        .catch(() => undefined)
        .finally(() => {
          if (disposed) return;
          settled += 1;
          advanceTo(settled / tasks.length);
          if (settled === tasks.length) {
            tasksDone = true;
            maybeExit();
          }
        });
    });

    // ── Safety net ─────────────────────────────────────────────────────
    safetyId = window.setTimeout(() => {
      introDone = true;
      tasksDone = true;
      exit();
    }, SAFETY_TIMEOUT);

    return () => {
      disposed = true;
      window.clearTimeout(safetyId);
      ctx.revert();
      unlockScroll();
    };
  }, [setPhase]);

  return (
    <div
      ref={rootRef}
      className="preloader"
      data-state={done ? "done" : "active"}
      aria-hidden={done || undefined}
    >
      <div className="preloader__panel preloader__panel--top" />
      <div className="preloader__panel preloader__panel--bottom" />
      <div
        className="preloader__seam absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-mars"
        style={{ boxShadow: "0 0 18px 0 rgb(201 102 56 / 0.45)" }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        <div className="w-[clamp(220px,34vw,480px)]">
          <div className="overflow-hidden pb-1">
            <div className="preloader__logo text-bone">
              <SpaceXLogo animatedId="preloader" className="h-auto w-full" />
            </div>
          </div>

          <div
            className="mt-[clamp(1.75rem,3.5vw,2.75rem)]"
            role="progressbar"
            aria-label={t.preloader.label}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={valueNow}
          >
            <div className="preloader__track relative h-px bg-line-strong">
              <div className="preloader__fill absolute inset-0 bg-bone" style={{ transform: "scaleX(0)", transformOrigin: "0 50%" }} />
            </div>
            <div className="preloader__meta t-mono mt-3 flex items-baseline justify-between gap-4 text-steel">
              <span>{t.preloader.label}</span>
              <span className="tabular-nums text-bone">
                <span ref={percentRef}>000</span>%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
