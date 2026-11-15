"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { MQ } from "@/lib/motion";
import { useLanguage } from "@/hooks/useLanguage";
import { MediaSlot } from "@/components/media/MediaSlot";
import { Tag } from "@/components/ui/Tag";

/**
 * The emotional centre of the page. A sticky scene inside a tall section:
 * scroll scrubs a slow "light reveal" out of near-black, then the
 * monumental headline opens from its centre line.
 */
export function FirstFootstep() {
  const { t } = useLanguage();
  const f = t.footstep;
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add({ full: MQ.full, lite: MQ.lite }, (context) => {
        const { full } = context.conditions as { full: boolean; lite: boolean };
        const section = root.current;
        if (!section) return;
        section.classList.add("is-scrubbed");

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: full ? 1.2 : 0.8 },
        });

        tl.fromTo("[data-ff-dark]", { opacity: 1 }, { opacity: 0.32, duration: 0.38, ease: "power1.inOut" }, 0)
          .fromTo("[data-ff-light]", { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }, 0.04)
          .to("[data-ff-light]", { opacity: 0.35, duration: 0.4 }, 0.36)
          .fromTo("[data-ff-media] [data-media]", { scale: 1.32 }, { scale: 1.04, duration: 1 }, 0)
          .fromTo("[data-ff-index]", { opacity: 0, yPercent: 30 }, { opacity: 1, yPercent: 0, duration: 0.16, ease: "power2.out" }, 0.2)
          .fromTo(
            "[data-ff-title] [data-line]",
            { clipPath: "inset(0% 50% 0% 50%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 0.24, stagger: 0.08, ease: "power3.inOut" },
            0.3,
          )
          .fromTo("[data-ff-kicker]", { opacity: 0 }, { opacity: 1, duration: 0.12 }, 0.28)
          .fromTo("[data-ff-copy]", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.16, stagger: 0.05, ease: "power2.out" }, 0.56)
          .fromTo("[data-ff-meta]", { opacity: 0 }, { opacity: 1, duration: 0.12, stagger: 0.04 }, 0.66)
          .fromTo("[data-ff-rule]", { scaleX: 0 }, { scaleX: 1, duration: 0.2, ease: "power2.inOut" }, 0.62);

        if (full) {
          tl.to("[data-ff-title]", { scale: 1.035, yPercent: -6, duration: 0.4 }, 0.6).to(
            "[data-ff-index]",
            { yPercent: -40, duration: 0.5 },
            0.5,
          );
        }

        return () => section.classList.remove("is-scrubbed");
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="first-footstep" aria-labelledby="ff-title" className="footstep relative bg-void">
      <div className="footstep__scene h-[100svh] min-h-[38rem] overflow-hidden">
        <div className="absolute inset-0" data-ff-media>
          <MediaSlot id="first-footstep" layout="fill" sizes="100vw" />
        </div>

        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgb(5_6_8/0.85)_0%,rgb(5_6_8/0.1)_45%,rgb(5_6_8/0.5)_100%)]" />
          <div
            className="absolute inset-[-20%] bg-[radial-gradient(40%_32%_at_50%_62%,rgb(245_210_180/0.32),rgb(201_102_56/0.12)_45%,transparent_70%)] opacity-0"
            data-ff-light
          />
          <div className="absolute inset-0 bg-void opacity-0" data-ff-dark />
        </div>

        <div className="shell relative flex h-full flex-col pb-[clamp(1.5rem,5vh,3.5rem)] pt-[calc(var(--nav-h)+clamp(1rem,4vh,2.5rem))]">
          <div className="flex items-start justify-between gap-6">
            <p
              className="t-num text-[clamp(4.5rem,13vw,13rem)] text-transparent [-webkit-text-stroke:1px_rgb(245_245_242/0.4)]"
              aria-hidden="true"
              data-ff-index
            >
              {f.index}
            </p>
            <div className="flex flex-col items-end gap-3 pt-3 text-right" data-ff-kicker>
              <p className="t-mono text-bone">{f.kicker}</p>
              <Tag kind="fiction">{t.common.fiction}</Tag>
            </div>
          </div>

          <div className="mt-auto">
            <h2 id="ff-title" className="t-display t-mega text-center text-bone" data-ff-title>
              <span className="sr-only">{f.headline.join(" ")}</span>
              <span aria-hidden="true" className="block">
                {f.headline.map((line, i) => (
                  <span key={i} className="block">
                    <span className="block" data-line>
                      {line}
                    </span>
                  </span>
                ))}
              </span>
            </h2>

            <div className="hairline mx-auto mt-[clamp(1.5rem,4vh,3rem)] max-w-[44rem] origin-center" data-ff-rule aria-hidden="true" />

            <div className="grid-12 mt-[clamp(1.25rem,3vh,2.25rem)] items-end gap-y-6">
              <div className="col-span-12 text-center md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4">
                <p className="t-lead text-balance" data-ff-copy>
                  {f.sub}
                </p>
                <p className="t-body mx-auto mt-4 hidden max-w-[36rem] text-pretty sm:block" data-ff-copy>
                  {f.body}
                </p>
              </div>
            </div>

            <dl className="t-mono mt-8 flex flex-wrap justify-center gap-x-10 gap-y-2 text-center">
              {f.meta.map((m) => (
                <div key={m.k} className="flex gap-3" data-ff-meta>
                  <dt className="text-steel">{m.k}</dt>
                  <dd className="text-bone">{m.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
