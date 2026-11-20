"use client";

import { useRef } from "react";
import { gsap, EASE, MEDIA } from "@/lib/gsap";
import { revealFade, revealLines } from "@/lib/reveal";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useLocalizedGSAP } from "@/hooks/useLocalizedGSAP";
import { AssetSlot } from "@/components/ui/AssetSlot";
import { MaskLines } from "@/components/ui/MaskLines";

/**
 * Comms trace. Built from basic arithmetic only (no Math.sin / Math.random) so
 * the server and every browser produce byte-identical markup.
 */
const SIGNAL = Array.from({ length: 120 }, (_, i) => {
  const noise = ((i * 73 + 41) % 29) - 14;
  const envelope = 1 - Math.abs((i % 40) - 20) / 20;
  return `${((i * 1000) / 119).toFixed(1)},${(30 + noise * 0.9 * envelope).toFixed(1)}`;
}).join(" ");

/**
 * SECTION 07 — The mission in numbers.
 * Telemetry archive panel: count-ups, line-by-line grid reveal, bars and a
 * comms trace drawing itself. All figures are simulated and labelled as such.
 */
export function MissionDataSection() {
  const { t } = useLanguage();
  const { MISSION_DATA } = t;
  const root = useRef<HTMLElement>(null);

  useLocalizedGSAP(
    () => {
      const el = root.current!;
      const q = gsap.utils.selector(el);
      const mm = gsap.matchMedia();

      mm.add(MEDIA.motion, () => {
        revealLines(q("[data-title] [data-line]"), q("[data-title]")[0], "top 85%");
        revealFade(q("[data-head]"), q("[data-title]")[0], "top 80%");

        const panel = q("[data-panel]")[0];
        const tl = gsap.timeline({ scrollTrigger: { trigger: panel, start: "top 75%", once: true } });

        tl.from(q("[data-grid-line-h]"), { scaleX: 0, transformOrigin: "0 50%", duration: 1.4, ease: EASE.expoInOut, stagger: 0.08 }, 0)
          .from(q("[data-grid-line-v]"), { scaleY: 0, transformOrigin: "50% 0", duration: 1.4, ease: EASE.expoInOut, stagger: 0.08 }, 0.1)
          .from(q("[data-metric]"), { autoAlpha: 0, y: 18, duration: 1, ease: EASE.out, stagger: 0.08 }, 0.35)
          .from(q("[data-side]"), { autoAlpha: 0, y: 18, duration: 1, ease: EASE.out, stagger: 0.08 }, 0.5)
          .from(q("[data-bar]"), { scaleX: 0, transformOrigin: "0 50%", duration: 1.6, ease: EASE.expo, stagger: 0.1 }, 0.8)
          .from(q("[data-map-reticle]"), { scale: 1.4, autoAlpha: 0, duration: 1.2, ease: EASE.expo }, 0.9);

        (q("[data-count]") as HTMLElement[]).forEach((n, i) => {
          const target = Number(n.dataset.count);
          const proxy = { v: 0 };
          n.textContent = "0";
          tl.to(proxy, { v: target, duration: 2, ease: EASE.expo, onUpdate: () => (n.textContent = String(Math.round(proxy.v))) }, 0.45 + i * 0.08);
        });

        const trace = q("[data-trace]")[0];
        gsap.fromTo(
          trace,
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: { trigger: q("[data-comms]")[0], start: "top 90%", end: "bottom 50%", scrub: true },
          },
        );
        // A slow "listening" sweep across the comms strip.
        gsap.fromTo(q("[data-sweep]"), { xPercent: -100 }, { xPercent: 1000, duration: 6, ease: "none", repeat: -1 });
      });
    },
    { scope: root },
  );

  return (
    <section id="data" ref={root} aria-labelledby="data-title" className="relative border-y border-line bg-deep py-[var(--section-y)]">
      <div className="shell">
        {/* Header */}
        <div className="grid-12 items-end gap-y-8">
          <div className="col-span-4 md:col-span-7">
            <div data-title>
              <MaskLines id="data-title" lines={["The mission", "in numbers."]} className="t-h2 text-ink" />
            </div>
          </div>
          <div className="col-span-4 flex flex-col gap-3 md:col-span-5 md:items-end">
            <span data-head className="inline-flex w-fit items-center gap-2 border border-haze/40 px-2.5 py-1.5 t-label text-haze">
              <span className="dot bg-haze" aria-hidden />
              {MISSION_DATA.panelTitle}
            </span>
            <span data-head className="t-label text-dim">
              {MISSION_DATA.archive}
            </span>
          </div>
        </div>

        {/* Panel */}
        <div data-panel className="relative mt-12 md:mt-16">
          <div className="grid lg:grid-cols-12">
            {/* Metrics grid */}
            <div className="relative grid grid-cols-2 self-start md:grid-cols-3 lg:col-span-8">
              <span data-grid-line-h className="absolute inset-x-0 top-0 h-px bg-line-strong" aria-hidden />
              {MISSION_DATA.metrics.map((m, i) => (
                <div key={m.label} className="relative px-0 py-7 pr-4 md:px-6 md:py-9 md:[&:nth-child(3n+2)]:pl-0">
                  <span data-grid-line-h className="absolute inset-x-0 bottom-0 h-px bg-line" aria-hidden />
                  {i % 3 !== 2 && (
                    <span data-grid-line-v className="absolute bottom-0 right-0 top-0 hidden w-px bg-line md:block" aria-hidden />
                  )}
                  <div data-metric>
                    <p className="flex gap-2 t-label text-dim">
                      <span className="text-faint">{String(i + 1).padStart(2, "0")}</span>
                      {m.label}
                    </p>
                    <p className="mt-5 flex items-baseline gap-2">
                      <span className="font-display text-[clamp(2rem,1.1rem+3.2vw,4.75rem)] leading-none tracking-[-0.05em] text-ink">
                        {"prefix" in m && m.prefix && <span className="text-mute">{m.prefix}</span>}
                        <span data-count={m.value}>{m.value}</span>
                      </span>
                      {m.suffix && <span className="t-data text-mute">{m.suffix}</span>}
                    </p>
                    <p className="mt-3 text-[0.8125rem] text-dim">{m.note}</p>
                  </div>
                </div>
              ))}
              {/* Status cell */}
              <div className="relative px-0 py-7 md:px-6 md:py-9">
                <span data-grid-line-h className="absolute inset-x-0 bottom-0 h-px bg-line" aria-hidden />
                <div data-metric>
                  <p className="t-label text-dim">
                    <span className="mr-2 text-faint">06</span>Mission status
                  </p>
                  <p className="mt-5 flex items-center gap-3 font-display text-[clamp(1.1rem,0.6rem+1.3vw,2.1rem)] uppercase leading-none tracking-[-0.03em] text-ink">
                    <span className="dot dot--live h-2 w-2" aria-hidden />
                    {MISSION_DATA.status}
                  </p>
                  <div className="mt-5 flex gap-1" aria-hidden>
                    {Array.from({ length: 12 }, (_, i) => (
                      <span key={i} className={`h-3 flex-1 ${i < 10 ? "bg-mute" : "bg-line-strong"}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Side column: map + systems */}
            <aside className="relative mt-10 grid gap-8 md:grid-cols-2 lg:col-span-4 lg:mt-0 lg:grid-cols-1 lg:pl-8" aria-label="Surface systems">
              <span data-grid-line-v className="absolute bottom-0 left-0 top-0 hidden w-px bg-line-strong lg:block" aria-hidden />

              <figure data-side className="relative border border-line">
                <div className="flex items-center justify-between border-b border-line px-3 py-2 t-label text-mute">
                  <span>{MISSION_DATA.map.name}</span>
                  <span className="text-dim">{MISSION_DATA.map.coords}</span>
                </div>
                <div className="relative overflow-hidden">
                  <AssetSlot id="DATA_SURFACE_MAP" intrinsic className="w-full" sizes="(min-width: 1024px) 28vw, (min-width: 768px) 45vw, 92vw" />
                  <svg data-map-reticle viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full" fill="none" aria-hidden>
                    <circle cx="52" cy="46" r="7" stroke="var(--color-ink)" strokeWidth="0.4" />
                    <circle cx="52" cy="46" r="1.2" fill="var(--color-ink)" />
                    <circle cx="52" cy="46" r="18" stroke="var(--color-ink)" strokeOpacity="0.35" strokeWidth="0.3" strokeDasharray="1 1.5" />
                    <path d="M52 30v8M52 54v8M36 46h8M60 46h8" stroke="var(--color-ink)" strokeWidth="0.3" />
                  </svg>
                  <div className="absolute bottom-3 right-3 flex items-center gap-2 t-label text-[0.5625rem] text-ink">
                    <span className="h-px w-8 bg-ink" />
                    {MISSION_DATA.map.scale}
                  </div>
                </div>
              </figure>

              <div data-side>
                <p className="t-label text-mute">Base systems</p>
                <ul className="mt-4 space-y-4">
                  {MISSION_DATA.systems.map((s) => (
                    <li key={s.label}>
                      <div className="flex justify-between t-label">
                        <span className="text-dim">{s.label}</span>
                        <span className="t-data text-ink">{s.value}%</span>
                      </div>
                      <div className="mt-2 h-px bg-line-strong">
                        <div data-bar className="h-px bg-ink" style={{ width: `${s.value}%` }} />
                      </div>
                    </li>
                  ))}
                </ul>
                <dl className="mt-8 grid grid-cols-4 gap-3 border-t border-line pt-4">
                  {MISSION_DATA.environment.map(([k, v]) => (
                    <div key={k}>
                      <dt className="t-label text-[0.5625rem] text-dim">{k}</dt>
                      <dd className="t-data mt-1 text-[0.75rem] text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </aside>
          </div>

          {/* Comms strip */}
          <div data-comms className="mt-12 border border-line">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-2.5 t-label text-mute">
              <span className="flex items-center gap-2">
                <span className="dot dot--live bg-haze" aria-hidden />
                Deep space link · Earth ↔ Mars
              </span>
              <span className="text-dim">One-way light time 3–22 min</span>
            </div>
            <div className="relative h-16 overflow-hidden md:h-20">
              <svg viewBox="0 0 1000 60" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
                <line x1="0" y1="30" x2="1000" y2="30" stroke="var(--color-line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                <polyline
                  data-trace
                  points={SIGNAL}
                  pathLength={1}
                  strokeDasharray="1 1"
                  fill="none"
                  stroke="var(--color-haze)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <span data-sweep className="absolute inset-y-0 left-0 w-[10%] bg-[linear-gradient(90deg,transparent,rgb(130_152_172/0.12),transparent)]" aria-hidden />
            </div>
          </div>

          <p className="mt-6 t-label text-[0.5625rem] text-dim">
            All values are simulated for a fictional mission. Not real telemetry.
          </p>
        </div>
      </div>
    </section>
  );
}
