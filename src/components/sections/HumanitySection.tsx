"use client";

import { useRef } from "react";
import { gsap, EASE, MEDIA } from "@/lib/gsap";
import { revealFade } from "@/lib/reveal";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useLocalizedGSAP } from "@/hooks/useLocalizedGSAP";

/**
 * SECTION 02 — A new chapter for humanity.
 * Pure typography: dimmed words gain contrast one by one, scrubbed to scroll.
 */
export function HumanitySection() {
  const { t } = useLanguage();
  const { HUMANITY } = t;
  const root = useRef<HTMLElement>(null);

  useLocalizedGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motion, () => {
        const el = root.current!;
        const q = gsap.utils.selector(el);

        // Words light up sequentially with scroll progress.
        gsap.to(q('[data-word][data-dim="true"]'), {
          color: "#f4f5f6",
          ease: "none",
          stagger: 0.12,
          scrollTrigger: {
            trigger: q("[data-statement]")[0],
            start: "top 78%",
            end: "bottom 42%",
            scrub: 0.6,
          },
        });

        // Statement drifts very slightly upward — gives the block weight.
        gsap.from(q("[data-statement]"), {
          y: 60,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "top 20%", scrub: true },
        });

        gsap.from(q("[data-rule]"), {
          scaleX: 0,
          transformOrigin: "0 50%",
          duration: 1.6,
          ease: EASE.expoInOut,
          scrollTrigger: { trigger: q("[data-rule]")[0], start: "top 90%", once: true },
        });
        revealFade(q("[data-fade]"), q("[data-details]")[0], "top 85%");
      });
    },
    { scope: root },
  );

  const words = HUMANITY.statement.flatMap((group, g) => {
    const list = group.text.split(" ");
    return list.map((w, i) => ({ w, dim: group.dim, br: group.br && i === list.length - 1, key: `${g}-${i}` }));
  });

  return (
    <section
      id="humanity"
      ref={root}
      aria-labelledby="humanity-title"
      className="relative bg-void py-[var(--section-y)]"
    >
      <div className="shell grid-12 gap-y-10">

        <h2
          id="humanity-title"
          data-statement
          className="t-statement col-span-4 md:col-span-9 md:col-start-4"
        >
          {words.map(({ w, dim, br, key }) => (
            <span key={key}>
              <span data-word data-dim={dim} className="statement-word">
                {w}
              </span>{" "}
              {br && <span className="hidden md:block" aria-hidden />}
            </span>
          ))}
        </h2>
      </div>

      <div className="shell mt-[clamp(4rem,10vw,9rem)]">
        <div data-rule className="hairline" />
        <div data-details className="grid-12 gap-y-8 pt-8">
          <dl data-fade className="col-span-4 grid grid-cols-3 gap-4 md:col-span-3 md:grid-cols-1 md:gap-2">
            {HUMANITY.meta.map(([k, v]) => (
              <div key={k} className="flex flex-col md:flex-row md:justify-between">
                <dt className="t-label text-dim">{k}</dt>
                <dd className="t-data text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          <p data-fade className="t-lead col-span-4 text-ink md:col-span-5 md:col-start-5">
            {HUMANITY.body}
          </p>
          <p data-fade className="col-span-4 text-[0.875rem] text-mute md:col-span-3 md:col-start-10 md:pt-1">
            {HUMANITY.aside}
          </p>
        </div>
      </div>
    </section>
  );
}
