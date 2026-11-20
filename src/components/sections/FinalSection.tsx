"use client";

import { useRef } from "react";
import { gsap, EASE, MEDIA } from "@/lib/gsap";
import { revealFade, revealLines } from "@/lib/reveal";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useLocalizedGSAP } from "@/hooks/useLocalizedGSAP";
import { AssetSlot } from "@/components/ui/AssetSlot";
import { MaskLines } from "@/components/ui/MaskLines";
import { ScrollButton } from "@/components/ui/Button";

/**
 * SECTION 09 — The next frontier.
 * The image pulls back as the section scrolls through (depth + closure), the
 * horizon arc draws, and the CTA returns smoothly to the beginning.
 */
export function FinalSection() {
  const { t } = useLanguage();
  const { FINAL } = t;
  const root = useRef<HTMLElement>(null);

  useLocalizedGSAP(
    () => {
      const el = root.current!;
      const q = gsap.utils.selector(el);
      const mm = gsap.matchMedia();

      mm.add(MEDIA.motion, () => {
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom bottom", scrub: true },
          })
          .fromTo(q("[data-bg] [data-asset-media]"), { scale: 1.3, yPercent: -6 }, { scale: 1, yPercent: 0 }, 0)
          .fromTo(q("[data-content]"), { y: 120 }, { y: 0 }, 0)
          .fromTo(q("[data-arc]"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: EASE.inOut }, 0.2);

        revealLines(q("[data-title] [data-line]"), q("[data-title]")[0], "top 80%", { stagger: 0.12 });
        revealFade(q("[data-fade]"), q("[data-title]")[0], "top 70%", { stagger: 0.1 });
      });
    },
    { scope: root },
  );

  return (
    <section
      id="frontier"
      ref={root}
      aria-labelledby="frontier-title"
      className="relative flex h-[100svh] min-h-[640px] items-end overflow-hidden bg-void md:h-[115svh]"
    >
      <div data-bg className="absolute inset-0">
        <AssetSlot id="FINAL_HORIZON" className="absolute inset-0" position="50% 40%" mobilePosition="60% 40%" sizes="100vw" labelAt="top" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,var(--color-void)_0%,rgb(5_6_8/0)_30%,rgb(5_6_8/0.1)_55%,rgb(5_6_8/0.9)_85%,var(--color-void)_100%)]" />

      {/* Horizon / orbital arc */}
      <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-[14%] h-[14%] w-full md:top-[34%] md:h-[22%]" fill="none" aria-hidden>
        <path
          data-arc
          d="M-20 190 Q 500 -60 1020 190"
          pathLength={1}
          strokeDasharray="1 1"
          stroke="var(--color-mute)"
          strokeOpacity="0.5"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div data-content className="shell relative z-10 flex flex-col items-center pb-[clamp(5rem,12vh,9rem)] pt-40 text-center">
        <p data-fade className="flex items-center gap-4 t-label text-mute">
          <span className="text-ink">08</span>
          <span className="h-px w-10 bg-line-strong" />
          {FINAL.label}
        </p>
        <div data-title className="mt-8">
          <MaskLines id="frontier-title" lines={FINAL.title} className="t-h1 text-ink" />
        </div>
        <p data-fade className="t-lead mt-8 max-w-[44ch]">
          {FINAL.body}
        </p>
        <div data-fade className="mt-10">
          <ScrollButton to="top" dir="up" variant="solid">
            {FINAL.cta}
          </ScrollButton>
        </div>
        <p data-fade className="mt-10 t-label text-dim">
          {FINAL.next}
        </p>
      </div>
    </section>
  );
}
