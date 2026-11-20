"use client";

import { useRef } from "react";
import { gsap, MEDIA } from "@/lib/gsap";
import { parallaxMedia, revealFade, revealFrame, revealLines } from "@/lib/reveal";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useLocalizedGSAP } from "@/hooks/useLocalizedGSAP";
import { AssetSlot } from "@/components/ui/AssetSlot";
import { MaskLines } from "@/components/ui/MaskLines";

/**
 * SECTION 06 — First steps on Mars.
 * Asymmetric editorial spread: monumental portrait on the right, title and a
 * small detail frame on the left, each moving at its own depth.
 */
export function FirstStepsSection() {
  const { t } = useLanguage();
  const { FIRST_STEPS } = t;
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
        revealFade(q("[data-copy]"), q("[data-copy]")[0], "top 88%");

        const portrait = q("[data-portrait]")[0];
        const footprint = q("[data-footprint]")[0];
        revealFrame(portrait, "bottom", portrait, "top 85%");
        revealFrame(footprint, "top", footprint, "top 90%");
        parallaxMedia(portrait.querySelector("[data-asset-media]"), portrait, 14);
        parallaxMedia(footprint.querySelector("[data-asset-media]"), footprint, 10);

        // Each column drifts at its own speed — depth without spectacle.
        if (desktop) {
          gsap.to(q("[data-depth-slow]"), {
            yPercent: -8,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          });
          gsap.fromTo(
            q("[data-depth-fast]"),
            { yPercent: 18 },
            {
              yPercent: -18,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        }

        revealFade(q("[data-hud]"), portrait, "top 55%", { stagger: 0.1 });
        revealLines(q("[data-quote] [data-line]"), q("[data-quote]")[0], "top 85%", { stagger: 0.06 });
        revealFade(q("[data-quote-meta]"), q("[data-quote]")[0], "top 80%");
      });
    },
    { scope: root },
  );

  return (
    <section
      id="first-steps"
      ref={root}
      aria-labelledby="first-steps-title"
      className="relative bg-void pb-[var(--section-y)] pt-[clamp(5rem,10vw,10rem)]"
    >
      {/* Bridge from the landing */}
      <div className="shell mb-[clamp(3rem,7vw,6rem)] flex items-center gap-4 t-label text-dim">
        <span>T+206 d 03 h</span>
        <span className="h-px flex-1 bg-line" />
        <span className="text-mute">EVA-01 begins</span>
      </div>

      <div className="shell grid-12 gap-y-14">
        {/* Left column */}
        <div className="col-span-4 flex flex-col md:col-span-5" data-depth-slow>
          <div data-title>
            <MaskLines id="first-steps-title" lines={FIRST_STEPS.title} className="t-h2 text-ink" />
          </div>
          <p data-copy className="t-lead mt-8 max-w-[38ch]">
            {FIRST_STEPS.body}
          </p>

          <figure className="mt-12 w-[62%] self-end md:mt-auto md:w-[72%] md:self-start md:pt-16">
            <div data-footprint>
              <AssetSlot id="FIRSTSTEPS_FOOTPRINT" intrinsic className="w-full" sizes="(min-width: 768px) 28vw, 60vw" />
            </div>
            <figcaption className="mt-3 flex justify-between gap-4 t-label text-[0.5625rem] text-dim">
              <span>Fig. 06.2 — First print</span>
              <span>Concept</span>
            </figcaption>
          </figure>
        </div>

        {/* Right column — monumental portrait */}
        <div className="relative col-span-4 md:col-span-7 md:col-start-6 lg:col-span-6 lg:col-start-7" data-depth-fast>
          <div data-portrait className="relative">
            <AssetSlot
              id="FIRSTSTEPS_ASTRONAUT"
              intrinsic
              className="w-full"
              position="50% 45%"
              sizes="(min-width: 1024px) 50vw, (min-width: 768px) 58vw, 92vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgb(5_6_8/0.85)_0%,rgb(5_6_8/0)_38%)]" />

            <div className="absolute inset-x-0 top-0 flex justify-between p-4 t-label md:p-5">
              <span data-hud className="flex items-center gap-2 text-ink">
                <span className="dot dot--live" aria-hidden />
                EVA-01 · Helmet cam
              </span>
              <span data-hud className="text-mute">Fig. 06.1</span>
            </div>

            <dl className="absolute inset-x-0 bottom-0 grid grid-cols-3 gap-3 p-4 md:p-5">
              {FIRST_STEPS.data.map(([k, v]) => (
                <div key={k} data-hud className="border-t border-ink/30 pt-2">
                  <dt className="t-label text-[0.5625rem] text-mute">{k}</dt>
                  <dd className="t-data mt-1 text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <p className="mt-3 text-right t-label text-[0.5625rem] text-dim">Values simulated · fictional mission</p>
        </div>

        {/* Transcript quote */}
        <blockquote className="col-span-4 mt-[clamp(2rem,6vw,6rem)] md:col-span-10 md:col-start-2 lg:col-span-9 lg:col-start-3">
          <div data-quote>
            <MaskLines
              as="p"
              lines={splitQuote(FIRST_STEPS.quote)}
              className="font-sans text-[clamp(1.5rem,0.9rem+2.6vw,3.6rem)] font-light leading-[1.08] tracking-[-0.03em] text-ink"
            />
          </div>
          <footer data-quote-meta className="mt-6 flex items-center gap-4 t-label text-dim">
            <span className="h-px w-10 bg-line-strong" />
            {FIRST_STEPS.quoteAttribution}
          </footer>
        </blockquote>
      </div>
    </section>
  );
}

/** Breaks the transcript into its sentences for the line reveal. */
function splitQuote(text: string) {
  const parts = text.match(/[^.!?]+[.!?]+/g) ?? [text];
  return parts.map((p, i) => (i === 0 ? `“${p.trim()}` : i === parts.length - 1 ? `${p.trim()}”` : p.trim()));
}
