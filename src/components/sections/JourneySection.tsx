"use client";

import { useRef } from "react";
import { gsap, MEDIA } from "@/lib/gsap";
import { revealLines } from "@/lib/reveal";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useLocalizedGSAP } from "@/hooks/useLocalizedGSAP";
import { AssetSlot } from "@/components/ui/AssetSlot";
import { MaskLines } from "@/components/ui/MaskLines";

/** Phase start points along the scroll progress (0–1). */
const PHASE_STARTS = [0, 0.12, 0.28, 0.72, 0.88];
/** Where each phase marker sits on the transfer path (0–1). */
const MARKERS = [0, 0.1, 0.5, 0.88, 1];
/** Simulated relative velocity curve, [progress, km/s]. */
const VELOCITY: Array<[number, number]> = [
  [0, 0],
  [0.12, 7.8],
  [0.28, 11.6],
  [0.72, 9.4],
  [0.88, 5.2],
  [1, 0],
];

function velocityAt(p: number) {
  for (let i = 1; i < VELOCITY.length; i++) {
    const [p1, v1] = VELOCITY[i];
    const [p0, v0] = VELOCITY[i - 1];
    if (p <= p1) return v0 + ((p - p0) / (p1 - p0)) * (v1 - v0);
  }
  return 0;
}

/**
 * Two geometries share the same logic: a wide one (≥ 768px) and a tall one.
 * Planet slots are positioned in % of the scene box so they always sit on the
 * path endpoints drawn in the SVG.
 */
const SCENES = {
  wide: {
    viewBox: "0 0 1600 600",
    ratio: 1600 / 600,
    path: "M330 330 C 640 40, 1090 20, 1362 205",
    orbits: [
      { cx: 800, cy: 1700, r: 1418 },
      { cx: 800, cy: 1700, r: 1655 },
    ],
    earth: { left: "1.5625%", top: "42.5%", width: "20.625%" },
    mars: { left: "84.0625%", top: "14.17%", width: "10.625%" },
    ship: "7.5%",
  },
  tall: {
    viewBox: "0 0 400 560",
    ratio: 400 / 560,
    path: "M160 165 C 330 205, 365 330, 268 428",
    orbits: [
      { cx: -200, cy: -300, r: 504 },
      { cx: -200, cy: -300, r: 921 },
    ],
    earth: { left: "5%", top: "4.46%", width: "40%" },
    mars: { left: "62.5%", top: "74.1%", width: "27.5%" },
    ship: "24%",
  },
} as const;

type SceneKey = keyof typeof SCENES;

/**
 * SECTION 03 — The journey, from Earth to Mars.
 * Pinned scene: the ship travels the transfer orbit with scroll, the path draws
 * itself, phases advance and simulated telemetry updates live.
 */
export function JourneySection() {
  const { t } = useLanguage();
  const { JOURNEY } = t;
  const root = useRef<HTMLElement>(null);

  useLocalizedGSAP(
    () => {
      const el = root.current!;
      const q = gsap.utils.selector(el);
      const mm = gsap.matchMedia();

      const setup = (key: SceneKey, motion: boolean) => {
        const scene = q(`[data-scene="${key}"]`)[0] as HTMLElement | undefined;
        if (!scene) return;
        const path = scene.querySelector<SVGPathElement>("[data-path]")!;
        const progressPath = scene.querySelector<SVGPathElement>("[data-progress]")!;
        const ship = scene.querySelector<HTMLElement>("[data-ship]")!;
        const length = path.getTotalLength();

        // Phase markers along the path.
        scene.querySelectorAll<SVGGElement>("[data-marker]").forEach((m, i) => {
          const pt = path.getPointAtLength(length * MARKERS[i]);
          m.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
        });

        const shipPath = { path, align: path, alignOrigin: [0.5, 0.5] as [number, number], autoRotate: true };

        if (!motion) {
          gsap.set(ship, { motionPath: { ...shipPath, start: 0.5, end: 0.5 } });
          return;
        }

        const readout = {
          dist: el.querySelectorAll<HTMLElement>("[data-tm-dist]"),
          vel: el.querySelectorAll<HTMLElement>("[data-tm-vel]"),
          day: el.querySelectorAll<HTMLElement>("[data-tm-day]"),
          phase: el.querySelectorAll<HTMLElement>("[data-tm-phase]"),
        };
        const phases = q("[data-phase]") as HTMLElement[];
        const fills = q("[data-phase-fill]") as HTMLElement[];
        const write = (list: NodeListOf<HTMLElement>, text: string) => list.forEach((n) => (n.textContent = text));

        let lastActive = -1;
        const update = (p: number) => {
          write(readout.dist, (p * JOURNEY.telemetry.distanceKm / 1e6).toFixed(1));
          write(readout.vel, velocityAt(p).toFixed(1));
          write(readout.day, String(Math.round(p * JOURNEY.telemetry.days)).padStart(3, "0"));

          let active = 0;
          PHASE_STARTS.forEach((s, i) => p >= s && (active = i));
          if (active !== lastActive) {
            lastActive = active;
            write(readout.phase, JOURNEY.phases[active].name);
            phases.forEach((ph) => {
              const i = Number(ph.dataset.phase);
              ph.dataset.active = String(i === active);
              ph.dataset.done = String(i < active);
            });
          }
          fills.forEach((f) => {
            const i = Number(f.dataset.phaseFill);
            const s = PHASE_STARTS[i];
            const e = PHASE_STARTS[i + 1] ?? 1;
            gsap.set(f, { scaleX: gsap.utils.clamp(0, 1, (p - s) / (e - s)) });
          });
        };

        gsap.set(progressPath, { strokeDashoffset: 1 });
        gsap.set(ship, { motionPath: { ...shipPath, end: 0 } });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el,
            pin: q("[data-journey-pin]")[0],
            start: "top top",
            end: key === "wide" ? "+=320%" : "+=260%",
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => update(self.progress),
            onRefresh: (self) => update(self.progress),
          },
        });

        tl.to(progressPath, { strokeDashoffset: 0, duration: 1 }, 0)
          .to(ship, { motionPath: shipPath, duration: 1 }, 0)
          .fromTo(scene.querySelector("[data-earth]"), { scale: 1 }, { scale: 0.86, xPercent: -6, duration: 0.45 }, 0)
          .fromTo(scene.querySelector("[data-mars]"), { scale: 0.78 }, { scale: 1.12, duration: 0.5 }, 0.5)
          .fromTo(q("[data-journey-bg] .asset-slot"), { xPercent: 0 }, { xPercent: -4, duration: 1 }, 0)
          .fromTo(
            scene.querySelectorAll("[data-marker]"),
            { autoAlpha: 0.25 },
            { autoAlpha: 1, stagger: 0.22, duration: 0.05 },
            0,
          );
      };

      mm.add({ motion: MEDIA.motion, wide: "(min-width: 768px)" }, (ctx) => {
        const { motion, wide } = ctx.conditions as Record<string, boolean>;
        if (motion) {
          revealLines(q("[data-journey-title] [data-line]"), el, "top 60%");
        }
        setup(wide ? "wide" : "tall", motion);
      });
    },
    { scope: root },
  );

  return (
    <section id="journey" ref={root} aria-labelledby="journey-title" className="relative bg-void">
      <div data-journey-pin className="relative flex h-[100svh] min-h-[520px] flex-col overflow-hidden">
        {/* Deep space backdrop */}
        <div data-journey-bg className="absolute inset-0 opacity-80">
          <AssetSlot
            id="JOURNEY_DEEP_SPACE"
            className="absolute inset-y-0 left-0 w-[106%]"
            sizes="106vw"
            labelAt="top"
            shape="outline"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,var(--color-void)_0%,transparent_25%,transparent_70%,var(--color-void)_100%)]" />

        {/* Header */}
        <header className="shell relative z-10 flex items-start justify-between gap-8 pt-[calc(var(--nav-h)+1.5rem)]">
          <div>
            <div data-journey-title>
              <MaskLines id="journey-title" lines={JOURNEY.title} className="t-h2 text-ink" />
            </div>
            <p className="mt-5 hidden max-w-[40ch] text-[0.875rem] text-mute lg:block">{JOURNEY.intro}</p>
          </div>

          <Telemetry className="hidden md:block" />
        </header>
        <Telemetry compact className="shell relative z-10 mt-4 md:hidden" />

        {/* Scene */}
        <div className="relative z-0 min-h-0 flex-1 [container-type:size]">
          {(Object.keys(SCENES) as SceneKey[]).map((key) => (
            <Scene key={key} sceneKey={key} />
          ))}
        </div>

        {/* Phase rail */}
        <PhaseRail />
      </div>
    </section>
  );
}

function Telemetry({ compact, className }: { compact?: boolean; className?: string }) {
  const items: Array<[string, string, string, string]> = [
    ["Distance from Earth", "data-tm-dist", "480.0", "M km"],
    ["Relative velocity", "data-tm-vel", "0.0", "km/s"],
    ["Mission elapsed", "data-tm-day", "206", "days"],
  ];

  if (compact) {
    return (
      <dl className={`${className} grid grid-cols-3 gap-3 border-y border-line py-2.5`}>
        {items.map(([label, attr, value, unit]) => (
          <div key={label}>
            <dt className="t-label text-[0.5625rem] text-dim">{label}</dt>
            <dd className="t-data text-ink">
              <span {...{ [attr]: "" }}>{value}</span> <span className="text-dim">{unit}</span>
            </dd>
          </div>
        ))}
      </dl>
    );
  }

  return (
    <div className={`${className} bracket w-[19rem] shrink-0 border border-line bg-void/50 backdrop-blur-sm`}>
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5 t-label text-mute">
        <span>Telemetry</span>
        <span className="text-dim">Simulated</span>
      </div>
      <dl className="space-y-2 px-4 py-3.5">
        {items.map(([label, attr, value, unit]) => (
          <div key={label} className="flex items-baseline justify-between gap-4">
            <dt className="t-label text-dim">{label}</dt>
            <dd className="t-data text-ink">
              <span {...{ [attr]: "" }}>{value}</span> <span className="text-dim">{unit}</span>
            </dd>
          </div>
        ))}
      </dl>
      <div className="flex items-center gap-2 border-t border-line px-4 py-2.5 t-label text-mute">
        <span className="dot dot--live bg-haze" aria-hidden />
        <span data-tm-phase>{JOURNEY.phases[4].name}</span>
      </div>
    </div>
  );
}

function Scene({ sceneKey }: { sceneKey: SceneKey }) {
  const s = SCENES[sceneKey];
  return (
    <div
      className={`absolute inset-0 place-items-center ${sceneKey === "wide" ? "hidden md:grid" : "grid md:hidden"}`}
      aria-hidden
    >
      <div
        data-scene={sceneKey}
        className="relative"
        style={{
          width: `min(92cqw, calc(88cqh * ${s.ratio}))`,
          aspectRatio: String(s.ratio),
        }}
      >
        <svg viewBox={s.viewBox} className="absolute inset-0 h-full w-full overflow-visible" fill="none">
          {s.orbits.map((o, i) => (
            <circle
              key={i}
              cx={o.cx}
              cy={o.cy}
              r={o.r}
              stroke="var(--color-line)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          <path
            data-path
            d={s.path}
            stroke="var(--color-faint)"
            strokeWidth="1"
            strokeDasharray="2 6"
            vectorEffect="non-scaling-stroke"
          />
          <path
            data-progress
            d={s.path}
            pathLength={1}
            stroke="var(--color-ink)"
            strokeWidth="1.25"
            strokeDasharray="1 1"
            vectorEffect="non-scaling-stroke"
          />
          {JOURNEY.phases.map((p, i) => (
            <g key={p.index} data-marker>
              <rect x="-3.5" y="-3.5" width="7" height="7" fill="var(--color-void)" stroke="var(--color-ink)" vectorEffect="non-scaling-stroke" />
              <text
                x="12"
                y={sceneKey === "wide" ? (i % 2 ? 24 : -14) : 4}
                fill="var(--color-mute)"
                fontFamily="var(--font-mono)"
                fontSize={sceneKey === "wide" ? 13 : 11}
                letterSpacing="1.5"
              >
                {p.index}
              </text>
            </g>
          ))}
        </svg>

        <div data-earth className="absolute aspect-square" style={s.earth}>
          <AssetSlot id="JOURNEY_EARTH" className="absolute inset-0" fit="contain" shape="circle" sizes="(min-width: 768px) 22vw, 40vw" />
          <PlanetTag name="Earth" sub="Departure" />
        </div>
        <div data-mars className="absolute aspect-square" style={s.mars}>
          <AssetSlot id="JOURNEY_MARS" className="absolute inset-0" fit="contain" shape="circle" sizes="(min-width: 768px) 12vw, 28vw" />
          <PlanetTag name="Mars" sub="Arrival" align="right" />
        </div>

        <div data-ship className="absolute left-0 top-0 aspect-[3/1]" style={{ width: s.ship }}>
          <AssetSlot id="JOURNEY_STARSHIP_TRANSIT" className="absolute inset-0" fit="contain" shape="outline" labelAt="center" sizes="12vw" />
        </div>
      </div>
    </div>
  );
}

function PlanetTag({ name, sub, align = "left" }: { name: string; sub: string; align?: "left" | "right" }) {
  return (
    <span
      className={`absolute -bottom-7 flex gap-2 whitespace-nowrap t-label ${align === "right" ? "right-0" : "left-1/2 -translate-x-1/2"}`}
    >
      <span className="text-ink">{name}</span>
      <span className="text-dim">/ {sub}</span>
    </span>
  );
}

function PhaseRail() {
  return (
    <div className="shell relative z-10 pb-[clamp(1.25rem,3vh,2.5rem)]">
      {/* ≥ 768px: all five phases */}
      <ol className="hidden grid-cols-5 gap-5 md:grid">
        {JOURNEY.phases.map((p, i) => (
          <li key={p.index} data-phase={i} data-active={i === 4} data-done={i < 4} className="phase">
            <div className="relative h-px bg-line-strong">
              <span data-phase-fill={i} className="phase__bar absolute inset-0 bg-ink" />
            </div>
            <div className="mt-4 flex items-baseline gap-3 t-label">
              <span className="text-dim">{p.index}</span>
              <span className="text-ink">{p.name}</span>
            </div>
            <p className="mt-1 t-data text-[0.75rem] text-haze">{p.time}</p>
            <p className="mt-2 hidden text-[0.8125rem] leading-snug text-mute lg:block [@media(max-height:760px)]:lg:hidden">{p.text}</p>
          </li>
        ))}
      </ol>

      {/* < 768px: active phase card + segmented progress */}
      <div className="md:hidden">
        <div className="grid grid-cols-5 gap-1.5">
          {JOURNEY.phases.map((p, i) => (
            <div key={p.index} className="relative h-px bg-line-strong">
              <span data-phase-fill={i} className="phase__bar absolute inset-0 bg-ink" />
            </div>
          ))}
        </div>
        <div className="mt-4 grid">
          {JOURNEY.phases.map((p, i) => (
            <div
              key={p.index}
              data-phase={i}
              data-active={i === 4}
              className="[grid-area:1/1] opacity-0 transition-opacity duration-500 data-[active=true]:opacity-100"
            >
              <div className="flex items-baseline justify-between t-label">
                <span className="flex gap-3">
                  <span className="text-dim">{p.index}</span>
                  <span className="text-ink">{p.name}</span>
                </span>
                <span className="t-data text-[0.75rem] text-haze">{p.time}</span>
              </div>
              <p className="mt-2 text-[0.875rem] leading-snug text-mute [@media(max-height:680px)]:hidden">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
