"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE, MQ, prefersReducedMotion } from "@/lib/motion";
import { useLanguage } from "@/hooks/useLanguage";
import { MediaSlot } from "@/components/media/MediaSlot";
import { MaskLines } from "@/components/ui/MaskLines";
import { Tag } from "@/components/ui/Tag";
import { BasePlan, type SystemId } from "@/components/graphics/BasePlan";
import { cn } from "@/lib/cn";

export function Settlement() {
  const { t } = useLanguage();
  const s = t.settlement;
  const root = useRef<HTMLElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<SystemId>("hab");
  const [showPower, setShowPower] = useState(true);
  const [showCorridors, setShowCorridors] = useState(true);

  const current = s.systems.find((sys) => sys.id === active) ?? s.systems[0];
  const activeIndex = s.systems.findIndex((sys) => sys.id === active);

  // ── Scroll choreography ─────────────────────────────────────────────
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add({ full: MQ.full, lite: MQ.lite }, (context) => {
        const { full } = context.conditions as { full: boolean; lite: boolean };

        gsap.from("[data-set-title] [data-line]", {
          yPercent: 108,
          duration: 1.4,
          ease: EASE.out,
          stagger: 0.1,
          scrollTrigger: { trigger: "[data-set-title]", start: "top 80%" },
        });

        // media wipes in from the left edge, like a hatch opening
        gsap
          .timeline({ scrollTrigger: { trigger: "[data-set-media]", start: "top 78%" } })
          .fromTo(
            "[data-set-media]",
            { clipPath: "inset(0% 100% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: EASE.inOut },
          )
          .from("[data-set-media] [data-media]", { scale: 1.25, xPercent: -6, duration: 2, ease: EASE.out }, 0.1);

        if (full) {
          gsap.to("[data-set-media] [data-media]", {
            yPercent: 8,
            ease: "none",
            scrollTrigger: { trigger: "[data-set-media]", start: "top bottom", end: "bottom top", scrub: true },
          });
        }

        gsap.from("[data-set-copy]", {
          y: 26,
          opacity: 0,
          duration: 1.1,
          stagger: 0.1,
          ease: EASE.out,
          scrollTrigger: { trigger: "[data-set-copy]", start: "top 85%" },
        });

        // schematic drafts itself
        const plan = gsap.timeline({ scrollTrigger: { trigger: "[data-set-plan]", start: "top 72%" } });
        plan
          .from("[data-set-plan-frame]", { opacity: 0, duration: 0.8, ease: "power1.out" })
          .fromTo(
            "[data-plan-draw]",
            { strokeDasharray: 1, strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 1.4, ease: EASE.inOut, stagger: 0.06 },
            0.1,
          )
          .from("[data-plan-module]", { opacity: 0, duration: 0.9, stagger: 0.07, ease: "power2.out" }, 0.3)
          .from("[data-set-tab]", { x: 20, opacity: 0, duration: 0.8, stagger: 0.05, ease: EASE.out }, 0.2);
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  // ── Detail panel transition on selection ────────────────────────────
  useGSAP(
    () => {
      if (prefersReducedMotion() || !detailRef.current) return;
      gsap.fromTo(
        detailRef.current.querySelectorAll("[data-detail]"),
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.05, ease: EASE.out, overwrite: true },
      );
    },
    { dependencies: [active], scope: detailRef },
  );

  // Tabs keyboard pattern (roving focus with arrows / Home / End)
  const onTabKey = (event: KeyboardEvent<HTMLDivElement>) => {
    const keys = ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const count = s.systems.length;
    let next = activeIndex;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (activeIndex + 1) % count;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (activeIndex - 1 + count) % count;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = count - 1;
    setActive(s.systems[next].id as SystemId);
    tabsRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  };

  return (
    <section
      ref={root}
      id="settlement"
      aria-labelledby="set-title"
      className="fx-blueprint relative overflow-hidden bg-graphite py-[clamp(6rem,16vh,12rem)]"
    >
      <div className="shell">
        {/* ── Opening composition: overlapped headline and media ── */}
        <div className="grid-12 relative gap-y-8">
          <div className="col-span-12 flex flex-col gap-3 lg:col-span-5">
            <p className="t-mono text-bone">
              <span className="text-mars">{s.index}</span> — {s.kicker}
            </p>
            <Tag kind="fiction">{t.common.fiction}</Tag>
          </div>

          <div className="relative col-span-12 md:col-span-9 md:col-start-4 lg:col-span-7 lg:col-start-6 lg:row-span-3 lg:row-start-1">
            <div data-set-media className="relative">
              <MediaSlot id="mars-settlement" sizes="(min-width: 1024px) 58vw, 100vw" />
            </div>
            <p className="t-mono mt-3 flex justify-between gap-4 text-steel">
              <span>FIG. 05 — Firstlight Base</span>
              <span className="text-mars">{t.common.artistic}</span>
            </p>
          </div>

          <h2
            id="set-title"
            className="t-display relative z-10 col-span-12 text-[clamp(2.1rem,5.6vw,6.25rem)] text-bone lg:col-span-9 lg:col-start-1 lg:row-start-2 lg:mt-12"
            data-set-title
          >
            <MaskLines lines={s.headline} lineClass={(i) => (i === 1 ? "md:pl-[1.5em] text-mars" : undefined)} />
          </h2>
        </div>

        <div className="grid-12 mt-[clamp(3rem,8vh,6rem)] gap-y-6">
          <p className="t-lead col-span-12 text-balance md:col-span-7 lg:col-span-5" data-set-copy>
            {s.lead}
          </p>
          <p className="t-body col-span-12 text-pretty md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-7" data-set-copy>
            {s.body}
          </p>
        </div>

        {/* ── Interactive base plan ── */}
        <div className="grid-12 mt-[clamp(4rem,12vh,8rem)] gap-y-10" data-set-plan>
          <figure className="col-span-12 lg:col-span-7" data-set-plan-frame>
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-line pb-3">
              <figcaption className="t-mono text-steel">{s.planLabel}</figcaption>
              <div role="group" aria-label={s.layersLabel} className="flex gap-2">
                <LayerToggle pressed={showPower} onToggle={() => setShowPower((v) => !v)} swatch="power">
                  {s.layers.power}
                </LayerToggle>
                <LayerToggle pressed={showCorridors} onToggle={() => setShowCorridors((v) => !v)} swatch="corridor">
                  {s.layers.corridors}
                </LayerToggle>
              </div>
            </div>
            <div className="relative mt-4 border border-line bg-void/40 p-[clamp(0.5rem,1.5vw,1.25rem)]">
              <BasePlan
                active={active}
                onSelect={setActive}
                showPower={showPower}
                showCorridors={showCorridors}
                padLabel={s.pad}
                className="h-auto w-full text-bone"
              />
            </div>
          </figure>

          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <p className="t-mono border-b border-line pb-3 text-steel" id="set-systems-label">
              {s.systemsLabel}
            </p>
            <div
              ref={tabsRef}
              role="tablist"
              aria-labelledby="set-systems-label"
              aria-orientation="vertical"
              onKeyDown={onTabKey}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1"
            >
              {s.systems.map((sys) => {
                const selected = sys.id === active;
                return (
                  <button
                    key={sys.id}
                    type="button"
                    role="tab"
                    id={`set-tab-${sys.id}`}
                    aria-selected={selected}
                    aria-controls="set-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(sys.id as SystemId)}
                    className={cn("system-tab", selected && "is-active")}
                    data-set-tab
                  >
                    <span className="t-mono system-tab__code">{sys.code}</span>
                    <span className="system-tab__name">{sys.name}</span>
                  </button>
                );
              })}
            </div>

            <div
              ref={detailRef}
              id="set-panel"
              role="tabpanel"
              aria-labelledby={`set-tab-${active}`}
              aria-live="polite"
              className="mt-8"
            >
              <p className="t-mono text-mars" data-detail>
                {current.code}
              </p>
              <h3 className="t-display t-h3 mt-3 text-bone" data-detail>
                {current.name}
              </h3>
              <p className="t-body mt-4 text-pretty" data-detail>
                {current.summary}
              </p>
              <dl className="t-mono mt-6 grid grid-cols-3 gap-3 border-t border-line pt-4" data-detail>
                {current.specs.map((spec) => (
                  <div key={spec.k}>
                    <dt className="text-steel">{spec.k}</dt>
                    <dd className="mt-1 text-bone">{spec.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LayerToggle({
  pressed,
  onToggle,
  swatch,
  children,
}: {
  pressed: boolean;
  onToggle: () => void;
  swatch: "power" | "corridor";
  children: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onToggle}
      className={cn(
        "t-mono flex min-h-11 items-center gap-2 border px-3 transition-colors duration-300",
        pressed ? "border-line-strong text-bone" : "border-line text-steel hover:text-bone",
      )}
    >
      <span
        aria-hidden="true"
        className={cn("block h-px w-4", swatch === "power" ? "border-t border-dashed border-mars" : "bg-bone")}
      />
      {children}
    </button>
  );
}
