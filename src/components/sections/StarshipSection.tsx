"use client";

import { useRef } from "react";
import { gsap, EASE, MEDIA } from "@/lib/gsap";
import { revealFade, revealFrame, revealLines } from "@/lib/reveal";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useLocalizedGSAP } from "@/hooks/useLocalizedGSAP";
import { AssetSlot } from "@/components/ui/AssetSlot";
import { MaskLines } from "@/components/ui/MaskLines";

/** Desktop tall enough for the pinned composition to fit in one viewport. */
const PIN_QUERY = "(min-width: 1024px) and (min-height: 720px)";

/**
 * SECTION 04 — The Starship.
 * Desktop: section pins while the ship is revealed, engineering marks draw and
 * the specifications count up (scrubbed). Other sizes: the same beats play
 * once on enter, without pinning.
 */
export function StarshipSection() {
  const { t } = useLanguage();
  const { STARSHIP } = t;
  const root = useRef<HTMLElement>(null);

  useLocalizedGSAP(
    () => {
      const el = root.current!;
      const q = gsap.utils.selector(el);
      const mm = gsap.matchMedia();

      const counters = () =>
        (q("[data-count]") as HTMLElement[]).map((n) => {
          const target = Number(n.dataset.count);
          const proxy = { v: 0 };
          n.textContent = "0";
          return { n, target, proxy };
        });

      mm.add({ motion: MEDIA.motion, pin: PIN_QUERY }, (ctx) => {
        const { motion, pin } = ctx.conditions as Record<string, boolean>;
        if (!motion) return;
        revealLines(q("[data-title] [data-line]"), el, "top 65%");
        revealFade(q("[data-intro]"), el, "top 60%");

        const frame = q("[data-frame]")[0];
        const media = q("[data-frame] [data-asset-media]")[0];
        const nums = counters();

        if (pin) {
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: el,
              start: "top top",
              end: "+=130%",
              pin: true,
              scrub: 0.8,
              anticipatePin: 1,
            },
          });
          tl.fromTo(frame, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.35, ease: EASE.inOut }, 0)
            .fromTo(media, { scale: 1.25 }, { scale: 1, duration: 0.6 }, 0)
            .fromTo(q("[data-scan]"), { top: "0%", autoAlpha: 1 }, { top: "100%", duration: 0.45 }, 0.08)
            .to(q("[data-scan]"), { autoAlpha: 0, duration: 0.05 }, 0.5)
            .from(q("[data-dim-v]"), { scaleY: 0, transformOrigin: "50% 100%", duration: 0.3 }, 0.25)
            .from(q("[data-dim-h]"), { scaleX: 0, transformOrigin: "0% 50%", duration: 0.2 }, 0.4)
            .from(q("[data-dim-label]"), { autoAlpha: 0, duration: 0.1 }, 0.5)
            .from(q("[data-spec]"), { autoAlpha: 0, y: 24, stagger: 0.07, duration: 0.15 }, 0.35)
            .fromTo(q("[data-detail]"), { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.3, ease: EASE.inOut }, 0.6)
            .from(q("[data-detail-caption]"), { autoAlpha: 0, duration: 0.1 }, 0.82);
          nums.forEach(({ n, target, proxy }, i) => {
            tl.to(proxy, { v: target, duration: 0.25, onUpdate: () => (n.textContent = String(Math.round(proxy.v))) }, 0.38 + i * 0.07);
          });
          return;
        }

        // Un-pinned: one-shot sequence when the section scrolls in.
        revealFrame(frame, "bottom", frame, "top 80%");
        gsap.fromTo(media, { scale: 1.2 }, { scale: 1, duration: 2, ease: EASE.expo, scrollTrigger: { trigger: frame, start: "top 80%", once: true } });
        gsap.from(q("[data-dim-v]"), { scaleY: 0, transformOrigin: "50% 100%", duration: 1.4, ease: EASE.expoInOut, scrollTrigger: { trigger: frame, start: "top 70%", once: true } });
        gsap.from(q("[data-dim-h]"), { scaleX: 0, transformOrigin: "0% 50%", duration: 1.2, ease: EASE.expoInOut, scrollTrigger: { trigger: frame, start: "bottom 90%", once: true } });
        revealFade(q("[data-spec]"), q("[data-specs]")[0], "top 85%");
        revealFrame(q("[data-detail]")[0], "bottom", q("[data-detail]")[0], "top 90%");
        nums.forEach(({ n, target, proxy }) => {
          gsap.to(proxy, {
            v: target,
            duration: 1.8,
            ease: EASE.expo,
            onUpdate: () => (n.textContent = String(Math.round(proxy.v))),
            scrollTrigger: { trigger: n, start: "top 92%", once: true },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      id="starship"
      ref={root}
      aria-labelledby="starship-title"
      className="starship-section relative overflow-hidden bg-void py-[var(--section-y)]"
    >
      <div className="shell grid-12 w-full items-center gap-y-16 lg:pt-[var(--nav-h)]">
        {/* Visual column */}
        <div className="relative col-span-4 md:col-span-6 md:col-start-4 lg:col-span-5 lg:col-start-1">
          <div className="relative mr-auto w-[min(84%,calc((100svh-var(--nav-h)-9rem)*0.6667))] md:mx-auto md:w-[min(100%,calc((100svh-var(--nav-h)-9rem)*0.6667))] lg:ml-0 lg:mr-auto">
            <div data-frame className="relative">
              <AssetSlot
                id="STARSHIP_PROFILE"
                intrinsic
                className="w-full"
                position="50% 40%"
                sizes="(min-width: 1024px) 34vw, (min-width: 768px) 50vw, 90vw"
              />
              <span data-scan className="pointer-events-none absolute inset-x-0 top-0 h-px bg-ink/70 opacity-0" aria-hidden />
              <FrameMarks />
            </div>

            {/* Engineering dimension marks */}
            <div className="pointer-events-none absolute -right-7 top-0 bottom-0 w-5 md:-right-10" aria-hidden>
              <div data-dim-v className="absolute inset-y-0 left-1/2 w-px bg-mute/60" />
              <span className="absolute left-0 right-0 top-0 h-px bg-mute/60" />
              <span className="absolute left-0 right-0 bottom-0 h-px bg-mute/60" />
              {Array.from({ length: 11 }, (_, i) => (
                <span key={i} className="absolute left-1/2 h-px w-1.5 bg-faint" style={{ top: `${i * 10}%` }} />
              ))}
              <span
                data-dim-label
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 whitespace-nowrap bg-void px-2 t-label text-ink"
              >
                ≈ 121 m
              </span>
            </div>
            <div className="pointer-events-none absolute -bottom-7 left-0 right-0 h-3" aria-hidden>
              <div data-dim-h className="absolute inset-x-0 top-1/2 h-px bg-mute/60" />
              <span className="absolute inset-y-0 left-0 w-px bg-mute/60" />
              <span className="absolute inset-y-0 right-0 w-px bg-mute/60" />
              <span data-dim-label className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-void px-2 t-label text-ink">
                9 m
              </span>
            </div>

            {/* Detail inset, overlapping the frame edge */}
            <figure className="absolute -right-[16%] bottom-[8%] w-[42%] md:-right-[30%] lg:-right-[24%]">
              <div data-detail className="border border-line-strong bg-void p-1.5">
                <AssetSlot id="STARSHIP_ENGINES" intrinsic className="w-full" sizes="(min-width: 1024px) 14vw, 40vw" />
              </div>
              <figcaption data-detail-caption className="mt-2 t-label text-[0.5625rem] text-dim">
                {STARSHIP.caption}
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Copy + specs */}
        <div className="col-span-4 md:col-span-12 lg:col-span-6 lg:col-start-7">
          <div data-title>
            <MaskLines id="starship-title" lines={STARSHIP.title} className="t-h2 text-ink" />
          </div>
          <p data-intro className="mt-6 max-w-[46ch] text-mute">
            {STARSHIP.intro}
          </p>

          <dl data-specs className="mt-10 grid grid-cols-2 border-t border-line md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
            {STARSHIP.specs.map((spec, i) => (
              <div key={spec.label} data-spec className="border-b border-line py-4 pr-4 [&:not(:first-child)]:md:pl-0">
                <dt className="flex items-center justify-between gap-2 t-label text-dim">
                  <span>
                    <span className="mr-2 text-faint">{String(i + 1).padStart(2, "0")}</span>
                    {spec.label}
                  </span>
                </dt>
                <dd className="mt-2">
                  <span className="font-display text-[clamp(1.9rem,1rem+2.4vw,3.4rem)] leading-none tracking-[-0.04em] text-ink">
                    {spec.prefix && <span className="text-mute">{spec.prefix}</span>}
                    <span data-count={spec.value}>{spec.value}</span>
                  </span>
                  {spec.suffix && <span className="ml-1.5 t-data text-mute">{spec.suffix}</span>}
                  <span className="mt-2 block t-label text-[0.5625rem] text-faint">
                    {"note" in spec && spec.note ? `${spec.note} · ` : ""}
                    {spec.source === "public" ? "Public · approx." : "Concept"}
                  </span>
                </dd>
              </div>
            ))}
            <div data-spec className="col-span-full border-b border-line py-4 t-label text-[0.5625rem] leading-relaxed text-dim md:col-span-1 md:flex md:items-end lg:col-span-full xl:col-span-1">
              {STARSHIP.sourceNote}
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

/** Corner brackets + centre ticks over the main frame. */
function FrameMarks() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <span className="absolute left-3 top-3 h-3 w-3 border-l border-t border-mute/70" />
      <span className="absolute right-3 top-3 h-3 w-3 border-r border-t border-mute/70" />
      <span className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-mute/70" />
      <span className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-mute/70" />
      <span className="absolute left-3 top-1/2 h-px w-2 bg-mute/60" />
      <span className="absolute right-3 top-1/2 h-px w-2 bg-mute/60" />
      <span className="absolute left-5 top-5 t-label text-[0.5625rem] text-mute">S-01 / Profile</span>
    </div>
  );
}
