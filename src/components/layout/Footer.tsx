"use client";

import { useRef } from "react";
import { gsap, useGSAP, EASE, MEDIA, smoothScrollTo } from "@/lib/gsap";
import { NAV } from "@/data/content";
import { SITE } from "@/data/site";
import { Logo } from "@/components/ui/Logo";
import { ScrollButton } from "@/components/ui/Button";

/** SECTION 10 — Footer. */
export function Footer() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motion, () => {
        gsap.from("[data-mark] span", {
          yPercent: 100,
          duration: 1.6,
          ease: EASE.expo,
          stagger: 0.06,
          scrollTrigger: { trigger: "[data-mark]", start: "top 95%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <footer ref={root} className="relative overflow-hidden border-t border-line bg-void pt-[clamp(4rem,8vw,7rem)]">
      <div className="shell grid-12 gap-y-12">
        <div className="col-span-4 md:col-span-5">
          <div className="h-[1.1rem]">
            <Logo />
          </div>
          <p className="mt-6 max-w-[40ch] text-[0.875rem] text-mute">
            Mars Mission 001 is a speculative web experience imagining humanity’s first crewed journey to Mars.
          </p>
        </div>

        <nav aria-label="Footer" className="col-span-2 md:col-span-3 md:col-start-7">
          <p className="t-label text-dim">Index</p>
          <ul className="mt-4 grid gap-2 text-[0.875rem]">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  className="link-line text-mute transition-colors hover:text-ink"
                  onClick={(e) => {
                    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                    e.preventDefault();
                    smoothScrollTo(`#${n.id}`);
                  }}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-2 flex flex-col md:col-span-3 md:col-start-10">
          <p className="t-label text-dim">Project</p>
          <dl className="mt-4 grid gap-3 text-[0.875rem]">
            <div>
              <dt className="text-dim">{SITE.credits.role}</dt>
              <dd>
                <a href={SITE.credits.url} className="link-line text-ink">
                  {SITE.credits.name}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-dim">Year</dt>
              <dd className="text-ink">{SITE.year}</dd>
            </div>
          </dl>
          <ScrollButton to="top" dir="up" className="mt-8 w-fit">
            Back to top
          </ScrollButton>
        </div>
      </div>

      {/* Monumental closing mark */}
      <div className="shell mt-[clamp(4rem,9vw,8rem)]" aria-hidden>
        <p data-mark className="flex justify-between overflow-hidden font-display text-[clamp(3rem,15.5vw,19rem)] leading-[0.85] tracking-[-0.06em] text-raise">
          {"MARS/001".split("").map((c, i) => (
            <span key={i} className="inline-block">
              {c}
            </span>
          ))}
        </p>
      </div>

      <div className="shell mt-6 flex flex-col gap-3 border-t border-line py-6 t-label text-[0.625rem] md:flex-row md:items-center md:justify-between">
        <p className="text-mute">{SITE.disclaimer}</p>
        <p className="text-dim">
          © {SITE.year} · Concept project · Trademarks belong to their owners
        </p>
      </div>
    </footer>
  );
}
