"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE, MQ } from "@/lib/motion";
import { useLanguage } from "@/hooks/useLanguage";
import { Tag } from "@/components/ui/Tag";
import { PlanetWireframe } from "@/components/graphics/PlanetWireframe";

export function NewEra() {
  const { t, locale } = useLanguage();
  const era = t.era;
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add({ full: MQ.full, lite: MQ.lite }, (context) => {
        const { full } = context.conditions as { full: boolean; lite: boolean };

        // Headline "reads itself": words brighten with scroll
        gsap.fromTo(
          "[data-word]",
          { opacity: 0.14 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.08,
            scrollTrigger: { trigger: "[data-era-title]", start: "top 82%", end: "bottom 45%", scrub: 0.6 },
          },
        );

        gsap.from("[data-era-index]", {
          yPercent: 40,
          opacity: 0,
          duration: 1.6,
          ease: EASE.out,
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        });

        gsap.from("[data-era-copy]", {
          y: 28,
          opacity: 0,
          duration: 1.2,
          ease: EASE.out,
          stagger: 0.1,
          scrollTrigger: { trigger: "[data-era-copy]", start: "top 85%" },
        });

        // Hairlines draw across
        gsap.utils.toArray<HTMLElement>("[data-era-rule]").forEach((rule) => {
          gsap.from(rule, {
            scaleX: 0,
            duration: 1.6,
            ease: EASE.inOut,
            scrollTrigger: { trigger: rule, start: "top 90%" },
          });
        });

        // Stats: blocks divide apart as the row scrolls through
        const stats = gsap.utils.toArray<HTMLElement>("[data-stat]");
        if (full) {
          gsap.fromTo(
            stats,
            { x: (i: number) => (1 - i) * 70, opacity: 0.25 },
            {
              x: 0,
              opacity: 1,
              ease: "power1.out",
              scrollTrigger: { trigger: "[data-era-stats]", start: "top 92%", end: "top 45%", scrub: 0.8 },
            },
          );
          gsap.from("[data-stat-divider]", {
            scaleY: 0,
            transformOrigin: "50% 0%",
            ease: "none",
            scrollTrigger: { trigger: "[data-era-stats]", start: "top 80%", end: "top 45%", scrub: 0.8 },
          });
          gsap.to("[data-era-planet]", {
            rotation: 24,
            yPercent: -18,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
          });
        } else {
          gsap.from(stats, {
            y: 24,
            opacity: 0,
            duration: 1,
            stagger: 0.12,
            ease: EASE.out,
            scrollTrigger: { trigger: "[data-era-stats]", start: "top 85%" },
          });
        }

        // Controlled count-up
        stats.forEach((stat) => {
          const out = stat.querySelector<HTMLElement>("[data-count]");
          if (!out) return;
          const end = Number(out.dataset.count);
          const decimals = Number(out.dataset.decimals ?? 0);
          const counter = { v: 0 };
          out.textContent = (0).toFixed(decimals);
          gsap.to(counter, {
            v: end,
            duration: 2.2,
            ease: "power3.out",
            scrollTrigger: { trigger: stat, start: "top 85%" },
            onUpdate: () => {
              out.textContent = counter.v.toFixed(decimals);
            },
          });
        });
      });

      return () => mm.revert();
    },
    // split text changes shape with the language: rebuild the choreography
    { scope: root, dependencies: [locale], revertOnUpdate: true },
  );

  return (
    <section
      ref={root}
      id="mission"
      aria-labelledby="era-title"
      className="relative overflow-hidden bg-void py-[clamp(6rem,16vh,12rem)]"
    >
      <div
        className="pointer-events-none absolute right-[-28vw] top-[6%] w-[78vw] max-w-[1100px] text-bone/[0.07] md:right-[-18vw] md:w-[62vw]"
        data-era-planet
        aria-hidden="true"
      >
        <PlanetWireframe />
      </div>

      <div className="shell relative">
        <div className="grid-12 items-end gap-y-6">
          <p
            className="t-num col-span-12 text-[clamp(5rem,16vw,15rem)] text-transparent [-webkit-text-stroke:1px_rgb(245_245_242/0.35)] md:col-span-4"
            aria-hidden="true"
            data-era-index
          >
            {era.index}
          </p>
          <div className="col-span-12 flex flex-col gap-3 pb-3 md:col-span-6 md:col-start-7">
            <p className="t-mono text-bone">{era.kicker}</p>
            <Tag kind="fiction">{t.common.fiction}</Tag>
          </div>
        </div>

        <div className="hairline mt-8" data-era-rule aria-hidden="true" />

        <h2 id="era-title" className="t-display t-h2 mt-[clamp(2.5rem,6vh,4.5rem)] max-w-[14ch] text-bone" data-era-title>
          <span className="sr-only">{era.headline.join(" ")}</span>
          <span aria-hidden="true">
            {era.headline.map((line, i) => (
              <span key={i} className={i === 1 ? "block md:pl-[1.4em]" : "block"}>
                {line.split(" ").map((word, w) => (
                  <span key={w} data-word className="inline-block pr-[0.28em] last:pr-0">
                    {word}
                  </span>
                ))}
              </span>
            ))}
          </span>
        </h2>

        <div className="grid-12 mt-[clamp(3rem,8vh,6rem)] gap-y-8">
          <p className="t-lead col-span-12 text-balance md:col-span-7 md:col-start-6 lg:col-span-6 lg:col-start-7" data-era-copy>
            {era.lead}
          </p>
          {era.body.map((p, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "t-body col-span-12 text-pretty md:col-span-5 md:col-start-6 lg:col-span-3 lg:col-start-7"
                  : "t-body col-span-12 text-pretty md:col-span-5 md:col-start-6 lg:col-span-3 lg:col-start-10"
              }
              data-era-copy
            >
              {p}
            </p>
          ))}
        </div>

        {/* ── Planetary context ── */}
        <div className="mt-[clamp(5rem,14vh,10rem)]" data-era-stats>
          <div className="flex items-center justify-between gap-4">
            <p className="t-mono text-steel">{era.statsLabel}</p>
            <Tag kind="real" className="hidden sm:inline-flex">
              {t.common.real}
            </Tag>
          </div>
          <div className="hairline mt-4" data-era-rule aria-hidden="true" />

          <dl className="grid grid-cols-1 md:grid-cols-3">
            {era.stats.map((stat, i) => (
              <div
                key={stat.label}
                className="relative flex flex-col border-b border-line py-8 md:border-b-0 md:px-[clamp(1rem,2.4vw,2.5rem)] md:py-10 md:first:pl-0 md:last:pr-0"
                data-stat
              >
                {i > 0 && (
                  <span
                    className="absolute bottom-0 left-0 top-0 hidden w-px bg-line md:block"
                    data-stat-divider
                    aria-hidden="true"
                  />
                )}
                <dt className="t-mono order-2 mt-6 text-bone">{stat.label}</dt>
                <dd className="order-1">
                  <span className="flex items-baseline gap-2 whitespace-nowrap">
                    <span className="t-num text-[clamp(3.5rem,7.4vw,7.5rem)] text-bone">
                      <span data-count={stat.value} data-decimals={stat.decimals}>
                        {stat.value}
                      </span>
                      <span className="text-[0.48em] tracking-normal text-mars">{stat.suffix}</span>
                    </span>
                  </span>
                  <span className="t-mono mt-2 block text-steel">{stat.unit}</span>
                </dd>
                <dd className="t-body order-3 mt-3 max-w-[22rem] text-[0.9rem]">{stat.note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
