"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE, MQ } from "@/lib/motion";
import { useLanguage } from "@/hooks/useLanguage";
import { MediaSlot } from "@/components/media/MediaSlot";
import { Arrow, Cta } from "@/components/ui/Cta";
import { Tag } from "@/components/ui/Tag";

/** Headline split into words → characters (React-rendered, so no DOM mutation by GSAP). */
function SplitChars({ lines }: { lines: readonly string[] }) {
  return (
    <>
      <span className="sr-only">{lines.join(" ")}</span>
      <span aria-hidden="true" className="block">
        {lines.map((line, li) => (
          <span key={li} className={li === 1 ? "mask-line md:pl-[0.9em]" : "mask-line"}>
            <span className="block">
              {line.split(" ").map((word, wi, words) => (
                <span key={wi} className="inline-block whitespace-nowrap">
                  {Array.from(word).map((ch, ci) => (
                    <span key={ci} className="inline-block" data-char>
                      {ch}
                    </span>
                  ))}
                  {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
                </span>
              ))}
            </span>
          </span>
        ))}
      </span>
    </>
  );
}

export function Finale() {
  const { t, locale } = useLanguage();
  const f = t.finale;
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add({ full: MQ.full, lite: MQ.lite }, (context) => {
        const { full } = context.conditions as { full: boolean; lite: boolean };

        // the planet window opens to full bleed as the section arrives
        gsap
          .timeline({
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "top top", scrub: full ? 1 : 0.6 },
          })
          .fromTo(
            "[data-finale-frame]",
            { clipPath: full ? "inset(22% 16% 22% 16%)" : "inset(10% 6% 10% 6%)" },
            { clipPath: "inset(0% 0% 0% 0%)", ease: "power1.inOut" },
          )
          .fromTo("[data-finale-frame] [data-media]", { scale: 1.3 }, { scale: 1.02, ease: "none" }, 0);

        gsap
          .timeline({ scrollTrigger: { trigger: "[data-finale-title]", start: "top 78%" } })
          .from("[data-finale-title] [data-char]", {
            yPercent: 115,
            duration: 1.3,
            ease: EASE.out,
            stagger: { each: 0.028, from: "start" },
          })
          .from("[data-finale-meta]", { opacity: 0, y: 14, duration: 1, stagger: 0.08, ease: EASE.out }, 0.4)
          .from("[data-finale-rule]", { scaleX: 0, duration: 1.4, ease: EASE.inOut }, 0.3);

        if (full) {
          gsap.to("[data-finale-title]", {
            yPercent: -10,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
          });
        }
      });

      return () => mm.revert();
    },
    // split text changes shape with the language: rebuild the choreography
    { scope: root, dependencies: [locale], revertOnUpdate: true },
  );

  return (
    <section ref={root} id="finale" aria-labelledby="finale-title" className="relative isolate overflow-hidden bg-void">
      <div className="relative flex min-h-[100svh] flex-col lg:min-h-[max(100svh,46rem)]">
        <div className="absolute inset-0 -z-10" data-finale-frame>
          <MediaSlot id="finale-planet" layout="fill" sizes="100vw" />
        </div>
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(5_6_8/0.7)_0%,transparent_30%,transparent_50%,rgb(5_6_8/0.92)_100%)]" />
          <div className="fx-columns absolute inset-0 opacity-70" />
        </div>

        <div className="shell flex flex-1 flex-col pb-[clamp(2rem,6vh,4rem)] pt-[calc(var(--nav-h)+clamp(1.5rem,5vh,3.5rem))]">
          <div className="flex items-start justify-between gap-6" data-finale-meta>
            <div className="flex flex-col gap-3">
              <p className="t-mono flex items-center gap-3 text-bone">
                <span className="h-2 w-2 bg-mars" aria-hidden="true" />
                {f.mission}
              </p>
              <Tag kind="fiction">{t.common.fiction}</Tag>
            </div>
            <p className="t-mono text-right text-steel">
              <span className="text-mars">{f.index}</span> — {f.kicker}
            </p>
          </div>

          <div className="mt-auto pt-20">
            <h2 id="finale-title" className="t-display text-[clamp(2.5rem,7.4vw,10rem)] text-bone" data-finale-title>
              <SplitChars lines={f.headline} />
            </h2>

            <div className="hairline mt-[clamp(1.5rem,3.5vh,2.75rem)]" data-finale-rule aria-hidden="true" />

            <div className="grid-12 mt-6 items-end gap-y-6">
              <p className="t-lead col-span-12 text-balance md:col-span-5" data-finale-meta>
                {f.sub}
              </p>
              <p className="t-body col-span-12 text-pretty md:col-span-4 md:col-start-6" data-finale-meta>
                {f.body}
              </p>
              <div className="col-span-12 md:col-span-3 md:col-start-10 md:justify-self-end" data-finale-meta>
                <Cta to="top" icon={<Arrow direction="up" className="text-mars" />}>
                  {f.cta}
                </Cta>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
