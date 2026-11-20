"use client";

import { useRef } from "react";
import { gsap, MEDIA } from "@/lib/gsap";
import { parallaxMedia, revealFade, revealFrame, revealLines } from "@/lib/reveal";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useLocalizedGSAP } from "@/hooks/useLocalizedGSAP";
import type { AssetId } from "@/data/assets";
import { AssetSlot } from "@/components/ui/AssetSlot";
import { MaskLines } from "@/components/ui/MaskLines";

const STRIP: Array<{ id: AssetId; ratio: string; fig: string; title: string; text?: string }> = [
  { id: "LIFE_PANORAMA", ratio: "aspect-[21/9]", fig: "Fig. 08.5", title: "Arcadia, looking north" },
  { id: "LIFE_ROVER", ratio: "aspect-[3/2]", fig: LIFE.blocks[3].fig, title: LIFE.blocks[3].title, text: LIFE.blocks[3].text },
  { id: "LIFE_SCIENCE", ratio: "aspect-square", fig: LIFE.blocks[2].fig, title: LIFE.blocks[2].title, text: LIFE.blocks[2].text },
];

/**
 * SECTION 08 — Life on another planet.
 * Editorial gallery: an asymmetric spread (large + offset small frame), a pull
 * quote, then a horizontal strip that drifts with scroll on desktop and is a
 * native swipe rail on touch screens.
 */
export function LifeOnMarsSection() {
  const { t } = useLanguage();
  const { LIFE } = t;
  const root = useRef<HTMLElement>(null);

  useLocalizedGSAP(
    () => {
      const el = root.current!;
      const q = gsap.utils.selector(el);
      const mm = gsap.matchMedia();

      mm.add({ motion: MEDIA.motion, desktop: MEDIA.desktop }, (ctx) => {
        const { motion, desktop } = ctx.conditions as Record<string, boolean>;
        if (!motion) return;
        revealLines(q("[data-title] [data-line]"), q("[data-title]")[0], "top 85%");
        revealFade(q("[data-intro]"), q("[data-title]")[0], "top 75%");

        (q("[data-frame]") as HTMLElement[]).forEach((frame, i) => {
          revealFrame(frame, i % 2 ? "bottom" : "left", frame, "top 88%");
          parallaxMedia(frame.querySelector("[data-asset-media]"), frame, 10);
        });
        (q("[data-caption]") as HTMLElement[]).forEach((c) => revealFade(c, c, "top 95%"));

        if (desktop) {
          gsap.fromTo(
            q("[data-offset]"),
            { yPercent: 12 },
            { yPercent: -12, ease: "none", scrollTrigger: { trigger: q("[data-spread]")[0], start: "top bottom", end: "bottom top", scrub: true } },
          );
        }

        revealLines(q("[data-pull] [data-line]"), q("[data-pull]")[0], "top 85%", { stagger: 0.08 });

        // Horizontal drift (desktop). Distance is re-measured on every refresh.
        const track = q("[data-track]")[0] as HTMLElement;
        if (desktop && track) {
          gsap.fromTo(
            track,
            { x: () => window.innerWidth * 0.08 },
            {
              x: () => -(track.scrollWidth - window.innerWidth + window.innerWidth * 0.06),
              ease: "none",
              scrollTrigger: {
                trigger: q("[data-strip]")[0],
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
                invalidateOnRefresh: true,
              },
            },
          );
          (q("[data-strip-item]") as HTMLElement[]).forEach((item) => revealFade(item, item, "top 95%", { y: 40 }));
        }
      });
    },
    { scope: root },
  );

  return (
    <section id="life" ref={root} aria-labelledby="life-title" className="relative overflow-hidden bg-void py-[var(--section-y)]">
      <div className="shell">
        {/* Header */}
        <div className="grid-12 items-end gap-y-8">
          <div className="col-span-4 md:col-span-8">
            <div data-title>
              <MaskLines id="life-title" lines={LIFE.title} className="t-h1 text-ink" />
            </div>
          </div>
          <p data-intro className="col-span-4 text-mute md:col-span-4 md:pb-3 lg:col-span-3 lg:col-start-10">
            {LIFE.intro}
          </p>
        </div>

        {/* Asymmetric spread */}
        <div data-spread className="grid-12 mt-[clamp(3rem,8vw,7rem)] gap-y-14">
          <figure className="col-span-4 md:col-span-8">
            <div data-frame>
              <AssetSlot id="LIFE_HABITAT" intrinsic className="w-full" sizes="(min-width: 768px) 66vw, 92vw" />
            </div>
            <Caption {...LIFE.blocks[0]} />
          </figure>
          <figure data-offset className="col-span-3 col-start-2 md:col-span-3 md:col-start-10 md:mt-[38%]">
            <div data-frame>
              <AssetSlot id="LIFE_CREW_WORK" intrinsic className="w-full" sizes="(min-width: 768px) 25vw, 70vw" />
            </div>
            <Caption {...LIFE.blocks[1]} />
          </figure>
        </div>

        {/* Pull quote */}
        <div data-pull className="grid-12 mt-[clamp(4rem,10vw,9rem)]">
          <div className="col-span-4 md:col-span-9 md:col-start-3">
            <MaskLines
              as="p"
              lines={LIFE.pull}
              className="font-sans text-[clamp(1.6rem,0.9rem+3vw,4.25rem)] font-light leading-[1.05] tracking-[-0.035em] text-ink"
            />
          </div>
        </div>
      </div>

      {/* Horizontal strip */}
      <div data-strip className="mt-[clamp(4rem,10vw,9rem)]">
        <div className="shell mb-6 flex items-center justify-between t-label text-dim">
          <span>Field archive</span>
          <span className="lg:hidden">Swipe →</span>
          <span className="hidden lg:inline">Concept renderings</span>
        </div>
        <div className="overflow-x-auto overscroll-x-contain [scrollbar-width:none] lg:overflow-visible [&::-webkit-scrollbar]:hidden">
          <ul
            data-track
            className="flex w-max snap-x snap-mandatory gap-[clamp(0.75rem,1.6vw,1.75rem)] px-[var(--gutter)] will-change-transform lg:snap-none"
          >
            {STRIP.map((item) => (
              <li key={item.id} data-strip-item className="snap-start">
                <div className={`${item.ratio} h-[clamp(14rem,44svh,30rem)]`}>
                  <AssetSlot id={item.id} className="h-full w-full" sizes="(min-width: 1024px) 60vw, 90vw" />
                </div>
                <Caption fig={item.fig} title={item.title} text={item.text} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Caption({ fig, title, text }: { fig: string; title: string; text?: string }) {
  return (
    <figcaption data-caption className="mt-4 grid max-w-[44ch] grid-cols-[auto_1fr] gap-x-4 gap-y-1">
      <span className="t-label text-dim">{fig}</span>
      <span className="t-label text-ink">{title}</span>
      {text && <span className="col-start-2 text-[0.8125rem] leading-snug text-mute">{text}</span>}
    </figcaption>
  );
}
