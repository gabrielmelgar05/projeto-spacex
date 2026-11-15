"use client";

import { useRef, type CSSProperties } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE, MQ } from "@/lib/motion";
import { getMedia, type MediaId } from "@/content/media";
import { useLanguage } from "@/hooks/useLanguage";
import { MediaSlot } from "@/components/media/MediaSlot";
import { MaskLines } from "@/components/ui/MaskLines";
import { Tag } from "@/components/ui/Tag";
import { TransferOrbit } from "@/components/graphics/TransferOrbit";

const CHAPTER_MEDIA: MediaId[] = ["earth-departure", "interplanetary-flight", "mars-orbit", "martian-landing"];

/** Clip shapes per chapter frame: [closed, open]. Same function type → interpolable. */
const CLIPS: Array<[string, string]> = [
  ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"],
  ["inset(50% 0% 50% 0%)", "inset(0% 0% 0% 0%)"],
  ["circle(0% at 50% 50%)", "circle(50% at 50% 50%)"],
  ["inset(32% 24% 32% 24%)", "inset(0% 0% 0% 0%)"],
];

export function Journey() {
  const { t } = useLanguage();
  const j = t.journey;
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      gsap.from("[data-journey-head] [data-line]", {
        yPercent: 108,
        duration: 1.4,
        ease: EASE.out,
        stagger: 0.1,
        scrollTrigger: { trigger: "[data-journey-head]", start: "top 78%" },
      });

      // ── Desktop: one pinned stage, four coordinated chapters ──────────
      mm.add(MQ.full, () => {
        const stageEl = stage.current;
        const section = root.current;
        if (!stageEl || !section) return;
        section.classList.add("is-pinned");

        const panels = gsap.utils.toArray<HTMLElement>("[data-jc]", stageEl);
        const frames = panels.map((p) => p.querySelector<HTMLElement>("[data-jc-media]")!);
        const inners = panels.map((p) => p.querySelector<HTMLElement>("[data-media]")!);
        const texts = panels.map((p) => p.querySelectorAll<HTMLElement>("[data-jc-line]"));
        const ship = stageEl.querySelector("[data-transfer-ship]");
        const shipPath = stageEl.querySelector<SVGPathElement>("[data-transfer-path]");

        // initial state: chapter 01 visible
        panels.forEach((_, i) => {
          gsap.set(frames[i], { clipPath: CLIPS[i][i === 0 ? 1 : 0], autoAlpha: i === 0 ? 1 : 0 });
          gsap.set(inners[i], { scale: i === 0 ? 1.06 : 1.22 });
          gsap.set(texts[i], { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 40 });
        });
        gsap.set("[data-jc-shade]", { opacity: 0 });

        const steps = panels.length - 1;
        let lastActive = -1;
        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: stageEl,
            start: "top top",
            end: () => `+=${window.innerHeight * 4.2}`,
            pin: true,
            scrub: 0.9,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            snap: {
              snapTo: "labelsDirectional",
              inertia: false,
              duration: { min: 0.25, max: 0.9 },
              delay: 0.12,
              ease: "power2.inOut",
            },
            onUpdate: (self) => {
              const time = self.progress * tl.duration();
              const active = Math.min(steps, Math.max(0, Math.round((time - 0.5) / 2)));
              if (active !== lastActive) {
                lastActive = active;
                stageEl.dataset.active = String(active);
              }
            },
          },
        });

        tl.addLabel("c0", 0.5);
        for (let i = 0; i < steps; i++) {
          const at = 1 + i * 2; // hold 1 unit, transition 1 unit
          const next = i + 1;
          tl.to(texts[i], { opacity: 0, y: -40, duration: 0.45, stagger: 0.04 }, at)
            .to(frames[i], { clipPath: CLIPS[i][0], duration: 0.65, ease: "power3.inOut" }, at + 0.1)
            .to(inners[i], { scale: 1.16, duration: 0.65 }, at + 0.1)
            .set(frames[i], { autoAlpha: 0 }, at + 0.75)
            .set(frames[next], { autoAlpha: 1 }, at + 0.25)
            .to(frames[next], { clipPath: CLIPS[next][1], duration: 0.75, ease: "power3.inOut" }, at + 0.25)
            .to(inners[next], { scale: 1.06, duration: 0.95, ease: "power2.out" }, at + 0.25)
            .to(texts[next], { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power2.out" }, at + 0.5)
            // HUD
            .to("[data-jc-counter]", { yPercent: -next * 25, duration: 0.7, ease: "power3.inOut" }, at + 0.15)
            .to("[data-jc-fill]", { scaleX: next / steps, duration: 1, ease: "none" }, at)
            .to("[data-transfer-draw]", { strokeDashoffset: 1 - next / steps, duration: 1, ease: "none" }, at);
          if (ship && shipPath) {
            tl.to(
              ship,
              {
                duration: 1,
                ease: "none",
                motionPath: { path: shipPath, align: shipPath, alignOrigin: [0.5, 0.5], start: i / steps, end: next / steps },
              },
              at,
            );
          }
          tl.addLabel(`c${next}`, at + 1.5);
        }
        // fade toward near-black, handing over to The First Footstep
        tl.to("[data-jc-shade]", { opacity: 0.9, duration: 0.8, ease: "power1.in" }, steps * 2 + 0.6);

        tl.addLabel("end");

        return () => section.classList.remove("is-pinned");
      });

      // ── Tablet / mobile: stacked chapters with light reveals ──────────
      mm.add(MQ.lite, () => {
        gsap.utils.toArray<HTMLElement>("[data-jc]").forEach((panel) => {
          const frame = panel.querySelector("[data-jc-media]");
          const inner = panel.querySelector("[data-media]");
          gsap
            .timeline({ scrollTrigger: { trigger: panel, start: "top 80%" } })
            .fromTo(frame, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: EASE.inOut })
            .from(inner, { scale: 1.2, duration: 1.6, ease: EASE.out }, 0)
            .from(panel.querySelectorAll("[data-jc-line]"), { y: 24, opacity: 0, duration: 0.9, stagger: 0.06, ease: EASE.out }, 0.35);
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="journey" aria-labelledby="journey-title" className="journey relative bg-void">
      {/* ── Section opener ── */}
      <header className="shell pb-[clamp(3rem,10vh,7rem)] pt-[clamp(4rem,12vh,9rem)]" data-journey-head>
        <div className="grid-12 items-end gap-y-6">
          <div className="col-span-12 flex flex-col gap-3 md:col-span-4">
            <p className="t-mono text-bone">
              <span className="text-mars">{j.index}</span> — {j.kicker}
            </p>
            <Tag kind="fiction">{t.common.fiction}</Tag>
          </div>
          <h2 id="journey-title" className="t-display t-h2 col-span-12 text-bone">
            <MaskLines lines={j.headline} lineClass={(i) => (i === 1 ? "md:pl-[0.6em]" : undefined)} />
          </h2>
          <p className="t-body col-span-12 max-w-[30rem] text-pretty md:col-span-6 md:col-start-7 lg:col-span-4 lg:col-start-9">{j.intro}</p>
        </div>
      </header>

      {/* ── Stage ── */}
      <div ref={stage} className="journey-stage" data-active="0">
        {/* HUD (pinned layout only) */}
        <div className="journey-hud" aria-hidden="true">
          <div className="journey-hud__top shell">
            <p className="t-mono text-steel">{j.telemetry}</p>
          </div>
          <div className="journey-hud__bottom shell">
            <div className="flex items-end gap-3">
              <span className="t-num block h-[1em] overflow-hidden text-[clamp(3.5rem,5.4vw,5.5rem)] text-bone">
                <span className="block" data-jc-counter>
                  {j.chapters.map((c) => (
                    <span key={c.num} className="block h-[1em]">
                      {c.num}
                    </span>
                  ))}
                </span>
              </span>
              <span className="t-mono pb-1 text-steel">/ 0{j.chapters.length}</span>
            </div>

            <div className="relative mx-[clamp(1.5rem,4vw,4rem)] flex-1 self-center">
              <div className="t-mono mb-3 flex justify-between text-steel">
                <span>{j.earth}</span>
                <span>{j.mars}</span>
              </div>
              <div className="relative h-px bg-line-strong">
                <div className="absolute inset-0 origin-left bg-mars" style={{ transform: "scaleX(0)" }} data-jc-fill />
                {j.chapters.map((c, i) => (
                  <span
                    key={c.num}
                    className="journey-tick"
                    data-tick={i}
                    style={{ left: `${(i / (j.chapters.length - 1)) * 100}%` }}
                  >
                    <span className="t-mono">{c.num}</span>
                  </span>
                ))}
              </div>
            </div>

            <TransferOrbit className="w-[clamp(140px,12vw,190px)] text-bone" earthLabel={j.earth} marsLabel={j.mars} />
          </div>
        </div>

        <div className="journey-shade" data-jc-shade aria-hidden="true" />

        {j.chapters.map((chapter, i) => {
          const media = getMedia(CHAPTER_MEDIA[i]);
          return (
            <article
              key={chapter.num}
              className={`jc jc--${i}`}
              data-jc
              aria-labelledby={`jc-title-${i}`}
              style={{ "--ratio": String(media.ratio) } as CSSProperties}
            >
              <div className="jc__media" data-jc-media>
                <MediaSlot id={CHAPTER_MEDIA[i]} layout="fill" sizes="(min-width: 1024px) 60vw, 100vw" />
                {i === 3 && <div className="jc__scrim" aria-hidden="true" />}
              </div>

              <div className="jc__text">
                <div className="jc__head">
                  <p className="t-mono flex items-center gap-3 text-steel" data-jc-line>
                    <span className="text-mars">{chapter.num}</span>
                    <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
                    <span>{chapter.time}</span>
                  </p>
                  <h3 id={`jc-title-${i}`} className="t-display mt-5 text-[clamp(1.75rem,2.9vw,3.25rem)] text-bone" data-jc-line>
                    {chapter.title}
                  </h3>
                  <p className="t-mono mt-3 text-steel" data-jc-line>
                    {chapter.place}
                  </p>
                </div>
                <div className="jc__copy">
                  <p className="t-body max-w-[30rem] text-pretty" data-jc-line>
                    {chapter.body}
                  </p>
                  <dl className="jc__telemetry t-mono" data-jc-line>
                    {chapter.telemetry.map((row) => (
                      <div key={row.k}>
                        <dt>{row.k}</dt>
                        <dd>{row.v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
