"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { EASE, MQ } from "@/lib/motion";
import { useLanguage } from "@/hooks/useLanguage";
import { MediaSlot } from "@/components/media/MediaSlot";
import { MaskLines } from "@/components/ui/MaskLines";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/cn";

export function Legacy() {
  const { t } = useLanguage();
  const l = t.legacy;
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const entries = [
    ...l.milestones.map((m) => ({ label: m.year, fiction: false })),
    ...l.fiction.map((f) => ({ label: f.mark, fiction: true })),
  ];
  const current = entries[active] ?? entries[0];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Active entry tracking runs in every mode (it only changes highlight state)
      gsap.utils.toArray<HTMLElement>("[data-entry]").forEach((entry, i) => {
        ScrollTrigger.create({
          trigger: entry,
          start: "top 58%",
          end: "bottom 58%",
          onToggle: (self) => {
            if (self.isActive) setActive(i);
          },
        });
      });

      mm.add(MQ.motion, () => {
        gsap.from("[data-legacy-title] [data-line]", {
          yPercent: 108,
          duration: 1.4,
          ease: EASE.out,
          stagger: 0.1,
          scrollTrigger: { trigger: "[data-legacy-title]", start: "top 80%" },
        });

        // the timeline line grows with scroll
        gsap.fromTo(
          "[data-legacy-fill]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: "[data-legacy-list]", start: "top 58%", end: "bottom 58%", scrub: 0.6 },
          },
        );

        // years arrive in sequence
        gsap.utils.toArray<HTMLElement>("[data-entry]").forEach((entry) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: entry, start: "top 82%" } });
          tl.from(entry.querySelector("[data-entry-year]"), { yPercent: 100, duration: 1.2, ease: EASE.out })
            .from(
              entry.querySelectorAll("[data-entry-copy]"),
              { y: 18, autoAlpha: 0, duration: 0.9, stagger: 0.07, ease: EASE.out, clearProps: "opacity,visibility,transform" },
              0.15,
            )
            .from(entry.querySelector("[data-entry-dot]"), { scale: 0, duration: 0.6, ease: "back.out(2)" }, 0.1);
        });

        gsap
          .timeline({ scrollTrigger: { trigger: "[data-legacy-divider]", start: "top 78%" } })
          .from("[data-legacy-divider] [data-divider-rule]", { scaleX: 0, duration: 1.4, ease: EASE.inOut })
          .from("[data-legacy-divider] [data-divider-copy]", { y: 22, opacity: 0, duration: 1, stagger: 0.08, ease: EASE.out }, 0.3);

        gsap.fromTo(
          "[data-legacy-media]",
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.6,
            ease: EASE.inOut,
            scrollTrigger: { trigger: "[data-legacy-media]", start: "top 80%" },
          },
        );
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="legacy" aria-labelledby="legacy-title" className="relative bg-void py-[clamp(6rem,16vh,12rem)]">
      <div className="shell">
        <header className="grid-12 items-end gap-y-8">
          <div className="col-span-12 flex flex-col gap-3 md:col-span-5">
            <p className="t-mono text-bone">
              <span className="text-mars">{l.index}</span> — {l.kicker}
            </p>
            <Tag kind="real">{t.common.real}</Tag>
          </div>
          <h2 id="legacy-title" className="t-display t-h2 col-span-12 text-bone lg:col-span-8" data-legacy-title>
            <MaskLines lines={l.headline} lineClass={(i) => (i === 1 ? "pl-[1.1em] md:pl-[2em]" : undefined)} />
          </h2>
          <p className="t-lead col-span-12 text-balance md:col-span-6 md:col-start-7 lg:col-span-4 lg:col-start-9">{l.lead}</p>
        </header>

        <div className="grid-12 mt-[clamp(4rem,12vh,8rem)] gap-y-12">
          {/* sticky plate with the active year */}
          <div className="col-span-12 md:col-span-6 lg:col-span-5">
            <div className="md:sticky md:top-[calc(var(--nav-h)+2rem)]">
              <div className="relative mx-auto w-full md:w-[min(100%,calc((100svh-var(--nav-h)-7rem)*0.8))]">
                <div data-legacy-media className="relative">
                  <MediaSlot id="spacex-history" sizes="(min-width: 768px) 40vw, 100vw" />
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-[linear-gradient(0deg,rgb(5_6_8/0.85),transparent)] p-[clamp(1rem,2vw,1.5rem)] pt-24" aria-hidden="true">
                  <span className="relative block h-[1em] overflow-hidden text-[clamp(3rem,6vw,6.5rem)] leading-none">
                    <span
                      key={current.label}
                      className={cn(
                        "chapter-swap t-num absolute inset-0 whitespace-nowrap",
                        current.fiction ? "text-[0.55em] leading-[1.8] text-mars" : "text-bone",
                      )}
                    >
                      {current.label}
                    </span>
                  </span>
                </div>
              </div>
              <p className="t-mono mt-4 text-steel">{l.sources}</p>
            </div>
          </div>

          {/* timeline */}
          <div className="relative col-span-12 md:col-span-6 lg:col-span-6 lg:col-start-7">
            <p className="t-mono border-b border-line pb-3 text-steel">{l.recordLabel}</p>

            <div className="relative mt-2" data-legacy-list>
              <span className="absolute bottom-0 left-[3px] top-0 w-px bg-line" aria-hidden="true">
                <span className="absolute inset-0 origin-top bg-mars" data-legacy-fill />
              </span>
            <ol>

              {l.milestones.map((m, i) => (
                <li
                  key={m.year}
                  className={cn("legacy-entry", active === i && "is-active", active > i && "is-past")}
                  data-entry
                >
                  <span className="legacy-entry__dot" data-entry-dot aria-hidden="true" />
                  <span className="block overflow-hidden">
                    <span className="t-num block text-[clamp(3rem,6.2vw,6rem)]" data-entry-year>
                      {m.year}
                    </span>
                  </span>
                  <p className="t-mono mt-3 text-steel" data-entry-copy>
                    {m.date}
                  </p>
                  <h3 className="t-display t-h3 mt-3 text-bone" data-entry-copy>
                    {m.title}
                  </h3>
                  <p className="t-body mt-3 max-w-[34rem] text-pretty" data-entry-copy>
                    {m.body}
                  </p>
                </li>
              ))}

              {/* boundary between the record and the fiction */}
              <li className="legacy-divider" data-legacy-divider>
                <span className="block h-px origin-left border-t border-dashed border-mars" data-divider-rule aria-hidden="true" />
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3" data-divider-copy>
                  <p className="t-mono text-mars">{l.divider.kicker}</p>
                  <Tag kind="fiction">{t.common.fiction}</Tag>
                </div>
                <p className="t-display mt-5 text-[clamp(1.5rem,2.8vw,2.6rem)] leading-[1] text-bone" data-divider-copy>
                  {l.divider.title}
                </p>
                <p className="t-body mt-4 max-w-[32rem] text-pretty" data-divider-copy>
                  {l.divider.body}
                </p>
              </li>

              {l.fiction.map((f, j) => {
                const i = l.milestones.length + j;
                return (
                  <li
                    key={f.mark}
                    className={cn("legacy-entry is-fiction", active === i && "is-active", active > i && "is-past")}
                    data-entry
                  >
                    <span className="legacy-entry__dot" data-entry-dot aria-hidden="true" />
                    <span className="block overflow-hidden">
                      <span className="t-mono block text-[clamp(0.95rem,1.4vw,1.25rem)] text-mars" data-entry-year>
                        {f.mark}
                      </span>
                    </span>
                    <h3 className="t-display t-h3 mt-3 text-bone" data-entry-copy>
                      {f.title}
                    </h3>
                    <p className="t-body mt-2 max-w-[34rem] text-pretty" data-entry-copy>
                      {f.body}
                    </p>
                  </li>
                );
              })}
            </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
