"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE, MQ } from "@/lib/motion";
import type { MediaId } from "@/content/media";
import { useLanguage } from "@/hooks/useLanguage";
import { MediaSlot } from "@/components/media/MediaSlot";
import { MaskLines } from "@/components/ui/MaskLines";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/cn";

type Place = ReturnType<typeof useLanguage>["t"]["explore"]["places"][number];

const PLACE_MEDIA: Record<string, MediaId> = {
  plains: "martian-landscape",
  olympus: "olympus-mons",
  craters: "mars-craters",
  rovers: "mars-rover",
};

/** Clip direction each frame opens from (closed state). */
const OPEN_FROM: Record<string, string> = {
  olympus: "inset(100% 0% 0% 0%)",
  craters: "inset(0% 0% 0% 100%)",
  rovers: "inset(0% 0% 100% 0%)",
};

function PlaceText({ place, className }: { place: Place; className?: string }) {
  return (
    <div className={cn("flex flex-col", className)} data-place-text>
      <p className="t-mono flex items-center gap-3 text-steel">
        <span className="text-mars">{place.code}</span>
        <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
        <span>{place.region}</span>
      </p>
      <h3 className="t-display t-h3 mt-4 text-[clamp(1.5rem,2.6vw,2.6rem)] text-bone">{place.name}</h3>
      <p className="t-mono mt-2 text-steel">{place.coords}</p>
      <p className="t-body mt-5 max-w-[28rem] text-pretty">{place.body}</p>
      <dl className="t-mono mt-6 max-w-[28rem] border-t border-line pt-3">
        <dt className="text-steel">{place.fact.k}</dt>
        <dd className="mt-1 text-bone">{place.fact.v}</dd>
      </dl>
    </div>
  );
}

export function Explore() {
  const { t } = useLanguage();
  const e = t.explore;
  const root = useRef<HTMLElement>(null);
  const [plains, olympus, craters, rovers] = e.places;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add({ full: MQ.full, lite: MQ.lite }, (context) => {
        const { full } = context.conditions as { full: boolean; lite: boolean };

        gsap.from("[data-explore-title] [data-line]", {
          yPercent: 108,
          duration: 1.4,
          ease: EASE.out,
          stagger: 0.1,
          scrollTrigger: { trigger: "[data-explore-title]", start: "top 80%" },
        });

        // E.01 — the panorama widens to the full bleed as you scroll
        gsap.fromTo(
          "[data-pano]",
          { clipPath: full ? "inset(0% 14% 0% 14%)" : "inset(0% 6% 0% 6%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: { trigger: "[data-pano]", start: "top 95%", end: "center 55%", scrub: 0.8 },
          },
        );
        gsap.fromTo(
          "[data-pano] [data-media]",
          { scale: 1.2, yPercent: -4 },
          {
            scale: 1.04,
            yPercent: 4,
            ease: "none",
            scrollTrigger: { trigger: "[data-pano]", start: "top bottom", end: "bottom top", scrub: true },
          },
        );

        // E.02–E.04 — framed plates opening from different edges
        gsap.utils.toArray<HTMLElement>("[data-plate]").forEach((plate) => {
          const from = OPEN_FROM[plate.dataset.plate ?? ""] ?? "inset(100% 0% 0% 0%)";
          const inner = plate.querySelector("[data-media]");
          gsap
            .timeline({ scrollTrigger: { trigger: plate, start: "top 80%" } })
            .fromTo(plate, { clipPath: from }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: EASE.inOut })
            .from(inner, { scale: 1.3, duration: 2, ease: EASE.out }, 0);

          if (full && inner) {
            gsap.fromTo(
              inner,
              { yPercent: -7 },
              {
                yPercent: 7,
                ease: "none",
                scrollTrigger: { trigger: plate, start: "top bottom", end: "bottom top", scrub: true },
              },
            );
          }
        });

        gsap.utils.toArray<HTMLElement>("[data-place-text]").forEach((text) => {
          gsap.from(text.children, {
            y: 22,
            opacity: 0,
            duration: 1,
            stagger: 0.07,
            ease: EASE.out,
            scrollTrigger: { trigger: text, start: "top 85%" },
          });
          if (full) {
            gsap.to(text, {
              y: -50,
              ease: "none",
              scrollTrigger: { trigger: text, start: "top bottom", end: "bottom top", scrub: true },
            });
          }
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="explore" aria-labelledby="explore-title" className="relative bg-void py-[clamp(6rem,16vh,12rem)]">
      <header className="shell">
        <div className="grid-12 items-end gap-y-8">
          <div className="col-span-12 flex flex-col gap-3 md:col-span-5">
            <p className="t-mono text-bone">
              <span className="text-mars">{e.index}</span> — {e.kicker}
            </p>
            <Tag kind="neutral">{t.common.artistic}</Tag>
          </div>
          <h2 id="explore-title" className="t-display t-h2 col-span-12 text-bone lg:col-span-9" data-explore-title>
            <MaskLines lines={e.headline} lineClass={(i) => (i === 1 ? "pl-[1.2em] md:pl-[2.4em]" : undefined)} />
          </h2>
          <p className="t-body col-span-12 max-w-[26rem] text-pretty md:col-span-5 md:col-start-8 lg:col-span-3 lg:col-start-10">
            {e.intro}
          </p>
        </div>
      </header>

      {/* E.01 — panorama */}
      <figure className="relative mt-[clamp(4rem,12vh,8rem)]">
        <div data-pano className="relative">
          <MediaSlot id={PLACE_MEDIA.plains} sizes="100vw" className="min-h-[18rem]" />
          <div
            className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(0deg,rgb(5_6_8/0.8)_0%,transparent_55%)] lg:block"
            aria-hidden="true"
          />
        </div>
        <figcaption className="shell mt-8 lg:absolute lg:inset-x-0 lg:bottom-[clamp(1.5rem,4vw,3rem)] lg:mt-0">
          <div className="grid-12 items-end gap-y-6">
            <div className="col-span-12 md:col-span-6">
              <p className="t-mono flex items-center gap-3 text-steel">
                <span className="text-mars">{plains.code}</span>
                <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
                <span>{plains.region}</span>
                <span className="hidden sm:inline">· {plains.coords}</span>
              </p>
              <h3 className="t-display mt-4 text-[clamp(1.75rem,4vw,4rem)] text-bone">{plains.name}</h3>
            </div>
            <div className="col-span-12 md:col-span-4 md:col-start-9">
              <p className="t-body text-pretty">{plains.body}</p>
              <dl className="t-mono mt-4 border-t border-line pt-3">
                <dt className="text-steel">{plains.fact.k}</dt>
                <dd className="mt-1 text-bone">{plains.fact.v}</dd>
              </dl>
            </div>
          </div>
        </figcaption>
      </figure>

      <div className="shell mt-[clamp(5rem,16vh,11rem)] space-y-[clamp(5rem,16vh,11rem)]">
        {/* E.02 — Olympus Mons: tall plate left, text offset right */}
        <div className="grid-12 items-start gap-y-10">
          <div className="col-span-12 sm:col-span-8 lg:col-span-5">
            <div data-plate="olympus" className="relative">
              <MediaSlot id={PLACE_MEDIA.olympus} sizes="(min-width: 1024px) 40vw, 90vw" />
            </div>
          </div>
          <PlaceText place={olympus} className="col-span-12 sm:col-span-8 sm:col-start-3 lg:col-span-4 lg:col-start-8 lg:mt-[38%]" />
        </div>

        {/* E.03 — craters: wide plate right, text anchored low left */}
        <div className="grid-12 items-end gap-y-10">
          <PlaceText place={craters} className="order-2 col-span-12 sm:col-span-8 lg:order-1 lg:col-span-3" />
          <div className="order-1 col-span-12 lg:order-2 lg:col-span-8 lg:col-start-5">
            <div data-plate="craters" className="relative">
              <MediaSlot id={PLACE_MEDIA.craters} sizes="(min-width: 1024px) 64vw, 100vw" />
            </div>
          </div>
        </div>

        {/* E.04 — rovers: vertical plate right, text high left */}
        <div className="grid-12 items-start gap-y-10">
          <PlaceText place={rovers} className="order-2 col-span-12 sm:col-span-8 md:order-1 md:col-span-5 lg:col-span-4 lg:col-start-2 lg:mt-24" />
          <div className="order-1 col-span-12 sm:col-span-8 sm:col-start-5 md:order-2 md:col-span-6 md:col-start-7 lg:col-span-4 lg:col-start-8">
            <div data-plate="rovers" className="relative">
              <MediaSlot id={PLACE_MEDIA.rovers} sizes="(min-width: 1024px) 34vw, 70vw" />
            </div>
          </div>
        </div>

        <p className="t-mono border-t border-line pt-4 text-steel">{e.note}</p>
      </div>
    </section>
  );
}
