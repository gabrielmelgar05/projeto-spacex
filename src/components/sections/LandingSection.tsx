"use client";

import { useRef } from "react";
import { gsap, EASE, MEDIA } from "@/lib/gsap";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useLocalizedGSAP } from "@/hooks/useLocalizedGSAP";
import { AssetSlot } from "@/components/ui/AssetSlot";
import { MaskLines } from "@/components/ui/MaskLines";

/**
 * SECTION 05 — The first landing.
 * A contained frame expands to full bleed (pinned + scrubbed), then the title
 * and documentary overlays settle on the image.
 */
export function LandingSection() {
  const { t } = useLanguage();
  const { LANDING } = t;
  const root = useRef<HTMLElement>(null);

  useLocalizedGSAP(
    () => {
      const el = root.current!;
      const q = gsap.utils.selector(el);
      const mm = gsap.matchMedia();

      mm.add({ motion: MEDIA.motion, desktop: "(min-width: 768px)" }, (ctx) => {
        const { motion, desktop } = ctx.conditions as Record<string, boolean>;
        if (!motion) return;

        const contained = desktop ? "inset(17% 27% 17% 27%)" : "inset(24% 6% 24% 6%)";

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: desktop ? "+=220%" : "+=170%",
            pin: q("[data-landing-pin]")[0],
            scrub: 0.8,
            anticipatePin: 1,
          },
        });

        tl.fromTo(q("[data-frame]"), { clipPath: contained }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.45, ease: EASE.inOut }, 0)
          .fromTo(q("[data-frame] [data-asset-media]"), { scale: 1.22 }, { scale: 1, duration: 0.55, ease: EASE.inOut }, 0)
          .to(q("[data-pre]"), { autoAlpha: 0, y: -16, duration: 0.15 }, 0.08)
          .fromTo(q("[data-shade]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, 0.38)
          .fromTo(q("[data-reticle]"), { autoAlpha: 0, scale: 1.15 }, { autoAlpha: 1, scale: 1, duration: 0.2 }, 0.42)
          .fromTo(q("[data-title] [data-line]"), { yPercent: 115 }, { yPercent: 0, stagger: 0.06, duration: 0.2, ease: EASE.out }, 0.5)
          .fromTo(q("[data-info]"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, stagger: 0.04, duration: 0.15, ease: EASE.out }, 0.62)
          .to({}, { duration: 0.15 }); // brief hold before release
      });
    },
    { scope: root },
  );

  return (
    <section id="landing" ref={root} aria-labelledby="landing-title" className="relative bg-void">
      <div data-landing-pin className="relative h-[100svh] min-h-[520px] overflow-hidden">
        {/* Pre-expansion labels, framing the contained image */}
        <div data-pre className="shell absolute inset-x-0 top-[calc(var(--nav-h)+1.5rem)] z-0 flex justify-between t-label text-mute">
          <span>
            <span className="text-ink">04</span> — {LANDING.label}
          </span>
          <span className="hidden md:inline">T+206 days · Entry interface</span>
        </div>
        <div data-pre className="shell absolute inset-x-0 bottom-8 z-0 flex justify-between t-label text-dim">
          <span>Recording / Cam 03</span>
          <span>Scroll</span>
        </div>

        {/* The image */}
        <div data-frame className="absolute inset-0 z-[1]">
          <AssetSlot id="LANDING_TOUCHDOWN" className="absolute inset-0" position="50% 60%" mobilePosition="55% 60%" sizes="100vw" />
          <div
            data-shade
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgb(5_6_8/0.7)_0%,rgb(5_6_8/0)_28%,rgb(5_6_8/0)_52%,rgb(5_6_8/0.85)_86%,var(--color-void)_100%)]"
          />
        </div>

        {/* Reticle — very light HUD framing the ship */}
        <div data-reticle className="pointer-events-none absolute left-1/2 top-[44%] z-[2] h-[22vmin] w-[22vmin] -translate-x-1/2 -translate-y-1/2" aria-hidden>
          <span className="absolute left-0 top-0 h-4 w-4 border-l border-t border-ink/70" />
          <span className="absolute right-0 top-0 h-4 w-4 border-r border-t border-ink/70" />
          <span className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-ink/70" />
          <span className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-ink/70" />
          <span className="absolute -right-2 top-0 translate-x-full t-label text-[0.5625rem] text-ink/80">S-01 · Lock</span>
        </div>

        {/* Overlay interface */}
        <div className="shell relative z-[3] flex h-full flex-col pb-6 pt-[calc(var(--nav-h)+1.5rem)] md:pb-8">
          <div className="flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:gap-6">
            <dl data-info className="space-y-1 whitespace-nowrap t-label">
              <div className="flex gap-3">
                <dt className="text-mute">MSN-001</dt>
                <dd className="text-ink">Ship S-01</dd>
              </div>
              <div className="flex gap-3">
                <dt className="text-mute">Site</dt>
                <dd className="text-ink">{LANDING.site}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="text-mute">Coord.</dt>
                <dd className="text-ink">{LANDING.coords}</dd>
              </div>
            </dl>
            <p data-info className="flex items-center gap-2 t-label text-ink sm:text-right">
              <span className="dot dot--live" aria-hidden />
              {LANDING.time}
            </p>
          </div>

          <div className="mt-auto grid gap-8 md:grid-cols-12 md:items-end">
            <div data-title className="md:col-span-8">
              <MaskLines id="landing-title" lines={LANDING.title} className="t-h1 text-ink" />
            </div>
            <dl className="grid grid-cols-3 gap-4 border-t border-line-strong pt-4 md:col-span-4 md:grid-cols-1 md:gap-2 md:border-0 md:pt-0">
              {LANDING.captions.map(([k, v]) => (
                <div key={k} data-info className="flex flex-col gap-1 md:flex-row md:justify-between md:border-b md:border-line-strong md:pb-2">
                  <dt className="t-label text-mute">{k}</dt>
                  <dd className="t-data text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <p data-info className="mt-6 max-w-[60ch] t-label text-[0.5625rem] leading-relaxed text-dim">
            {LANDING.caption}
          </p>
        </div>
      </div>
    </section>
  );
}
