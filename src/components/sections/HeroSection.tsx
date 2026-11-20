"use client";

import { useRef } from "react";
import { gsap, SplitText, EASE, MEDIA } from "@/lib/gsap";
import { onIntroRelease } from "@/lib/intro";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useLocalizedGSAP } from "@/hooks/useLocalizedGSAP";
import { AssetSlot } from "@/components/ui/AssetSlot";
import { MaskLines } from "@/components/ui/MaskLines";
import { ScrollButton } from "@/components/ui/Button";

/**
 * SECTION 01 — Hero / Mars arrival.
 *
 * Layer stack (back → front):
 *   HERO_LANDSCAPE  full-bleed plain           [data-hero-bg]
 *   HERO_STARSHIP   suspended, centred (alpha) [data-hero-ship] > [data-hero-float]
 *   HERO_FOREGROUND rocks band (alpha)         [data-hero-fg]
 *   vignette + interface
 */
export function HeroSection() {
  const { t } = useLanguage();
  const { HERO } = t;
  const root = useRef<HTMLElement>(null);

  useLocalizedGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        { motion: MEDIA.motion, desktop: MEDIA.desktop, fine: MEDIA.finePointer },
        (ctx) => {
          const { motion, fine } = ctx.conditions as Record<string, boolean>;
          if (!motion) return;

          const q = gsap.utils.selector(root);

          // Hidden start state (the preloader curtain covers this frame).
          const intro = SplitText.create(q("[data-hero-intro]"), {
            type: "lines",
            mask: "lines",
            linesClass: "split-line-mask",
          });
          gsap.set(q("[data-hero-bg]"), { scale: 1.16, transformOrigin: "50% 60%" });
          gsap.set(q("[data-hero-ship]"), { y: 140, autoAlpha: 0 });
          gsap.set(q("[data-hero-fg]"), { yPercent: 18 });
          gsap.set(q("[data-hero-title] [data-line]"), { yPercent: 115 });
          gsap.set(intro.lines, { yPercent: 110 });
          gsap.set(q("[data-hero-fade]"), { autoAlpha: 0, y: 14 });
          gsap.set(q("[data-hero-card]"), { clipPath: "inset(0% 0% 100% 0%)" });
          gsap.set(q("[data-hero-rule]"), { scaleX: 0, transformOrigin: "0 50%" });

          const tl = gsap.timeline({ paused: true, defaults: { ease: EASE.expo } });
          tl.to(q("[data-hero-bg]"), { scale: 1, duration: 2.6 }, 0)
            .to(q("[data-hero-fg]"), { yPercent: 0, duration: 2.2 }, 0.1)
            .to(q("[data-hero-ship]"), { y: 0, autoAlpha: 1, duration: 2.4 }, 0.25)
            .to(q("[data-hero-title] [data-line]"), { yPercent: 0, duration: 1.5, stagger: 0.12 }, 0.55)
            .to(q("[data-hero-fade]"), { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.06, ease: EASE.out }, 0.7)
            .to(intro.lines, { yPercent: 0, duration: 1.3, stagger: 0.07 }, 0.8)
            .to(q("[data-hero-card]"), { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: EASE.expoInOut }, 0.9)
            .to(q("[data-hero-rule]"), { scaleX: 1, duration: 1.6, ease: EASE.expoInOut }, 0.9);

          const off = onIntroRelease(() => tl.play());

          // "Suspended" idle drift of the ship.
          gsap.to(q("[data-hero-float]"), {
            y: -10,
            duration: 3.6,
            ease: EASE.soft,
            repeat: -1,
            yoyo: true,
          });

          // Scroll-out: layers separate in depth while the interface lifts away.
          gsap
            .timeline({
              scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
              defaults: { ease: "none" },
            })
            .to(q("[data-hero-bg]"), { yPercent: 16 }, 0)
            .to(q("[data-hero-ship]"), { yPercent: -12, scale: 0.94 }, 0)
            .to(q("[data-hero-fg]"), { yPercent: -10 }, 0)
            .to(q("[data-hero-ui]"), { y: -80, autoAlpha: 0, ease: "power1.in" }, 0);

          // Pointer depth (desktop, fine pointer only).
          if (fine) {
            const shipX = gsap.quickTo(q("[data-hero-float]"), "x", { duration: 1.4, ease: EASE.out });
            const shipR = gsap.quickTo(q("[data-hero-float]"), "rotation", { duration: 1.4, ease: EASE.out });
            const bgX = gsap.quickTo(q("[data-hero-bg] .asset-slot"), "x", { duration: 1.8, ease: EASE.out });
            const fgX = gsap.quickTo(q("[data-hero-fg] .asset-slot"), "x", { duration: 1.6, ease: EASE.out });
            const onMove = (e: PointerEvent) => {
              const nx = e.clientX / window.innerWidth - 0.5;
              shipX(nx * 22);
              shipR(nx * 0.8);
              bgX(nx * -12);
              fgX(nx * -30);
            };
            window.addEventListener("pointermove", onMove);
            return () => {
              off();
              window.removeEventListener("pointermove", onMove);
            };
          }

          return off;
        },
      );
    },
    { scope: root },
  );

  return (
    <section
      id="top"
      ref={root}
      aria-labelledby="hero-title"
      className="hero-atmos relative h-[100svh] min-h-[620px] overflow-hidden"
    >
      {/* Landscape */}
      <div data-hero-bg data-critical className="absolute inset-0 will-change-transform">
        <AssetSlot
          id="HERO_LANDSCAPE"
          className="absolute inset-[-2%]"
          position="50% 62%"
          mobilePosition="58% 70%"
          sizes="100vw"
          labelAt="top"
          shape="outline"
          style={{ "--ph-label-top": "calc(var(--nav-h) + 0.5rem)" } as React.CSSProperties}
        />
      </div>

      {/* Starship, suspended over the plain */}
      <div className="hero-ship-stage pointer-events-none absolute inset-x-0 flex justify-center md:top-[10%] md:bottom-[26%]">
        <div data-hero-ship data-critical className="relative h-full aspect-[2/5] will-change-transform">
          <div data-hero-float className="absolute inset-0">
            <AssetSlot
              id="HERO_STARSHIP"
              className="absolute inset-0"
              fit="contain"
              position="50% 100%"
              sizes="(min-width: 1024px) 28vh, 40vw"
              shape="outline"
              labelAt="top"
              style={{ "--ph-label-top": "2.5rem" } as React.CSSProperties}
            />
          </div>
        </div>
      </div>

      {/* Foreground rocks */}
      <div data-hero-fg data-critical className="pointer-events-none absolute inset-x-0 bottom-0 h-[30%] will-change-transform">
        <AssetSlot
          id="HERO_FOREGROUND"
          className="absolute inset-x-[-3%] inset-y-0"
          position="50% 100%"
          sizes="100vw"
          labelAt="top"
          shape="outline"
        />
      </div>

      <div className="hero-vignette pointer-events-none absolute inset-0" />

      {/* Interface */}
      <div
        data-hero-ui
        className="shell relative z-10 flex h-full flex-col pt-[calc(var(--nav-h)+clamp(0.75rem,3.5vh,2.75rem))]"
      >
        <div className="flex items-start justify-between gap-8">
          <ul className="space-y-1 t-label text-mute">
            {HERO.tags.map((tag, i) => (
              <li key={tag} data-hero-fade className="flex gap-3">
                <span className="text-dim">/</span>
                <span className={i === 0 ? "text-ink" : undefined}>{tag}</span>
              </li>
            ))}
          </ul>
          <p
            data-hero-intro
            className="hidden max-w-[23rem] text-[clamp(1rem,0.8rem+0.5vw,1.3rem)] leading-[1.35] tracking-[-0.01em] text-ink md:block"
          >
            {HERO.intro}
          </p>
        </div>

        <div className="mt-auto flex flex-col gap-6 pb-[clamp(1.25rem,4vh,3rem)] md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="min-w-0">
            <p
              data-hero-fade
              className="mb-4 inline-flex items-center gap-2.5 border border-line-strong bg-void/40 px-2.5 py-1.5 t-label text-mute backdrop-blur-sm md:mb-6"
            >
              <span className="dot bg-haze" aria-hidden />
              {HERO.chip}
            </p>
            <div data-hero-title>
              <MaskLines as="h1" id="hero-title" lines={HERO.titleLines} className="t-mega text-ink" />
            </div>
            <p data-hero-fade className="mt-4 max-w-[34ch] text-mute md:mt-6 md:text-[1.0625rem]">
              {HERO.subtitle}
            </p>
          </div>

          <aside
            data-hero-card
            aria-label="Mission status"
            className="w-full shrink-0 border border-line-strong bg-deep/60 backdrop-blur-md md:w-[19.5rem]"
          >
            <div className="flex items-center justify-between border-b border-line px-4 py-3 t-label text-mute">
              <span>{HERO.card.eyebrow}</span>
              <span className="flex items-center gap-2 text-ink">
                <span className="dot dot--live" aria-hidden />
                Nominal
              </span>
            </div>
            <div className="hidden gap-4 px-4 py-4 md:flex">
              <OrbitGlyph />
              <div className="flex-1">
                <p className="text-[0.95rem] leading-tight text-ink">{HERO.card.status}</p>
                <dl className="mt-3 space-y-1">
                  {HERO.card.rows.map(([k, v]) => (
                    <div key={k} className="flex justify-between t-data text-mute">
                      <dt>{k}</dt>
                      <dd className="text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <div className="p-2 pt-2 md:pt-0">
              <ScrollButton to="#humanity" variant="solid" dir="down" className="w-full justify-between">
                {HERO.card.cta}
              </ScrollButton>
            </div>
          </aside>
        </div>

        {/* Hero footer strip */}
        <div className="relative grid h-12 grid-cols-2 items-center t-label text-dim md:h-14 md:grid-cols-3">
          <span data-hero-rule className="absolute inset-x-0 top-0 h-px bg-line-strong" aria-hidden />
          <span data-hero-fade>{HERO.footer.left}</span>
          <span data-hero-fade className="hidden items-center justify-center gap-3 md:flex">
            <ScrollCue />
            {HERO.footer.center}
          </span>
          <span data-hero-fade className="text-right">
            <span className="sm:hidden">MSN-001</span>
            <span className="hidden sm:inline">{HERO.footer.right}</span>
          </span>
        </div>
      </div>
    </section>
  );
}

/** Tiny orbit diagram: planet outline, orbit ellipse and the ship marker. */
function OrbitGlyph() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16 shrink-0 text-mute" fill="none" aria-hidden>
      <rect x="0.5" y="0.5" width="63" height="63" stroke="var(--color-line)" />
      <circle cx="32" cy="32" r="11" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="32" cy="32" r="21" stroke="var(--color-haze)" strokeWidth="0.75" strokeDasharray="1.5 2.5" />
      <g className="origin-center animate-[spin_16s_linear_infinite] [transform-box:view-box] motion-reduce:animate-none">
        <rect x="51.5" y="30.5" width="3" height="3" fill="var(--color-ink)" />
      </g>
      <path d="M32 2v6M32 56v6M2 32h6M56 32h6" stroke="var(--color-faint)" strokeWidth="0.75" />
    </svg>
  );
}

/** Animated scroll cue line. */
function ScrollCue() {
  return (
    <span className="relative block h-6 w-px overflow-hidden bg-line-strong" aria-hidden>
      <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-cue_2.2s_cubic-bezier(0.87,0,0.13,1)_infinite] bg-ink" />
    </span>
  );
}
