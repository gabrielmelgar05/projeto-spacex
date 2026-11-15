"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE, MQ } from "@/lib/motion";
import { useLanguage } from "@/hooks/useLanguage";
import { useExperience } from "@/hooks/useExperience";
import { MediaSlot } from "@/components/media/MediaSlot";
import { MaskLines } from "@/components/ui/MaskLines";
import { Arrow, Cta } from "@/components/ui/Cta";
import { Tag } from "@/components/ui/Tag";

export function Hero() {
  const { t } = useLanguage();
  const { revealed } = useExperience();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!revealed) return;
      const mm = gsap.matchMedia();

      mm.add({ full: MQ.full, lite: MQ.lite }, (context) => {
        const { full } = context.conditions as { full: boolean; lite: boolean };

        // ── Intro, synchronised with the preloader opening ──
        const intro = gsap.timeline({ defaults: { ease: EASE.out } });
        intro
          .fromTo("[data-hero-shade]", { opacity: 1 }, { opacity: 0, duration: 2.6, ease: "power2.out" }, 0)
          .fromTo("[data-hero-media] [data-media]", { scale: 1.32 }, { scale: 1.12, duration: 3.2 }, 0)
          .from("[data-hero-title] [data-line]", { yPercent: 108, duration: 1.5, stagger: 0.12 }, 0.35)
          .from("[data-hero-orbit] ellipse", { strokeDashoffset: 1, duration: 2.6, ease: EASE.inOut }, 0.2)
          .from("[data-hero-reticle]", { scale: 0.6, autoAlpha: 0, duration: 1.4, transformOrigin: "50% 50%" }, 0.9)
          .from("[data-hero-meta]", { autoAlpha: 0, y: 12, duration: 1.1, stagger: 0.08 }, 0.8)
          .from("[data-hero-row]", { autoAlpha: 0, x: -14, duration: 1, stagger: 0.07 }, 0.95)
          .from("[data-hero-rule]", { scaleX: 0, duration: 1.6, ease: EASE.inOut }, 0.6);

        // ── Leaving the hero: depth + dimming into the next chapter ──
        const leave = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        leave.to("[data-hero-dim]", { opacity: 0.88, ease: "none" }, 0);
        if (full) {
          leave
            .to("[data-hero-media] [data-media]", { yPercent: 14, ease: "none" }, 0)
            .to("[data-hero-title]", { yPercent: -28, ease: "none" }, 0)
            .to("[data-hero-reticle]", { yPercent: -60, ease: "none" }, 0)
            .to("[data-hero-copy]", { y: -60, opacity: 0, ease: "none" }, 0);
        }

        // ── Subtle perspective on pointer (desktop, fine pointers only) ──
        if (full && window.matchMedia("(pointer: fine)").matches) {
          const tilt = root.current?.querySelector<HTMLElement>("[data-hero-tilt]");
          const reticle = root.current?.querySelector<HTMLElement>("[data-hero-reticle-wrap]");
          if (tilt && reticle) {
            gsap.set(tilt, { transformPerspective: 1400 });
            const rx = gsap.quickTo(tilt, "rotationX", { duration: 1.6, ease: "power3" });
            const ry = gsap.quickTo(tilt, "rotationY", { duration: 1.6, ease: "power3" });
            const tx = gsap.quickTo(reticle, "x", { duration: 1.4, ease: "power3" });
            const ty = gsap.quickTo(reticle, "y", { duration: 1.4, ease: "power3" });
            const onMove = (e: PointerEvent) => {
              const nx = e.clientX / window.innerWidth - 0.5;
              const ny = e.clientY / window.innerHeight - 0.5;
              rx(ny * -1.6);
              ry(nx * 2.2);
              tx(nx * -22);
              ty(ny * -16);
            };
            window.addEventListener("pointermove", onMove, { passive: true });
            return () => window.removeEventListener("pointermove", onMove);
          }
        }
      });

      return () => mm.revert();
    },
    { scope: root, dependencies: [revealed] },
  );

  return (
    <section
      ref={root}
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-void lg:min-h-[max(100svh,46rem)]"
    >
      {/* ── media ── */}
      <div className="absolute inset-0 -z-10 overflow-hidden" data-hero-tilt>
        <div className="absolute inset-0" data-hero-media>
          <MediaSlot id="hero-mars" layout="fill" sizes="100vw" />
        </div>
      </div>

      {/* ── scrims & HUD layers ── */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(5_6_8/0.55)_0%,transparent_28%,transparent_52%,rgb(5_6_8/0.92)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(5_6_8/0.6)_0%,transparent_55%)]" />
        <div className="fx-columns absolute inset-0 opacity-70" />
        <svg
          data-hero-orbit
          className="absolute left-[-20%] top-[8%] h-[120%] w-[140%] text-bone/20"
          viewBox="0 0 1400 1000"
          preserveAspectRatio="none"
          fill="none"
        >
          <ellipse cx="700" cy="760" rx="690" ry="420" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" pathLength={1} strokeDasharray="1" />
          <ellipse cx="700" cy="760" rx="560" ry="300" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" vectorEffect="non-scaling-stroke" pathLength={1} strokeDasharray="1" />
        </svg>
        <div className="absolute inset-0 bg-void opacity-0" data-hero-dim />
        <div className="absolute inset-0 bg-void opacity-0" data-hero-shade />
      </div>

      {/* landing-site reticle */}
      <div
        className="pointer-events-none absolute left-[64%] top-[40%] hidden md:block"
        data-hero-reticle-wrap
        aria-hidden="true"
      >
        <div data-hero-reticle className="relative">
          <svg viewBox="0 0 80 80" className="h-16 w-16 text-bone/70" fill="none">
            <circle cx="40" cy="40" r="22" stroke="currentColor" strokeWidth="0.75" />
            <circle cx="40" cy="40" r="2" fill="var(--color-mars)" />
            <path d="M40 4v14M40 62v14M4 40h14M62 40h14" stroke="currentColor" strokeWidth="0.75" />
          </svg>
          <div className="t-mono absolute left-[4.75rem] top-1/2 w-max -translate-y-1/2 text-bone/70">
            <span className="block text-mars">LZ-01</span>
            <span className="block">46.7°N · 197.3°E</span>
          </div>
        </div>
      </div>

      {/* vertical rail */}
      <p
        className="t-mono pointer-events-none absolute right-[calc(var(--gutter)*0.5)] top-1/2 hidden -translate-y-1/2 text-steel [writing-mode:vertical-rl] xl:block"
        data-hero-meta
      >
        {t.hero.vertical}
      </p>

      {/* ── content ── */}
      <div className="shell relative flex flex-1 flex-col pb-[clamp(1.5rem,4vh,3rem)] pt-[calc(var(--nav-h)+clamp(1.5rem,5vh,3.5rem))]">
        <div className="grid-12 items-start gap-y-6">
          <div className="col-span-12 flex flex-col gap-3 md:col-span-6" data-hero-meta>
            <p className="t-mono flex items-center gap-3 text-bone">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="hero-pulse absolute inset-0 bg-mars" />
                <span className="relative h-2 w-2 bg-mars" />
              </span>
              {t.hero.mission}
            </p>
            <Tag kind="fiction">{t.common.fiction}</Tag>
          </div>

          <dl className="t-mono col-span-12 hidden grid-cols-2 gap-x-6 md:col-span-4 md:col-start-9 md:grid xl:col-span-3 xl:col-start-10">
            {t.hero.data.map((row) => (
              <div key={row.k} className="col-span-2 flex justify-between gap-4 border-t border-line py-2" data-hero-row>
                <dt className="text-steel">{row.k}</dt>
                <dd className="text-right text-bone">{row.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-auto pt-16">
          <h1 id="hero-title" className="t-display t-mega text-bone" data-hero-title>
            <MaskLines lines={t.hero.headline} lineClass={(i) => (i === 1 ? "pl-[12%] md:pl-[25%]" : undefined)} />
          </h1>

          <div className="hairline mt-[clamp(1.5rem,3.5vh,2.75rem)]" data-hero-rule aria-hidden="true" />

          <div className="grid-12 mt-6 items-end gap-y-6" data-hero-copy>
            <div className="col-span-12 hidden items-center gap-4 md:col-span-3 md:flex" data-hero-meta>
              <span className="scroll-cue" aria-hidden="true">
                <span />
              </span>
              <span className="t-mono text-steel">{t.hero.scroll}</span>
            </div>

            <div className="col-span-12 md:col-span-6 md:col-start-4 lg:col-span-5 lg:col-start-5" data-hero-meta>
              <p className="t-lead text-balance">{t.hero.sub}</p>
              <p className="t-body mt-3 max-w-[34rem] text-pretty">{t.hero.body}</p>
            </div>

            <div className="col-span-12 md:col-span-3 md:col-start-10 md:justify-self-end" data-hero-meta>
              <Cta to="mission" icon={<Arrow direction="down" className="text-mars" />}>
                {t.hero.cta}
              </Cta>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
