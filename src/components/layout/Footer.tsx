"use client";

import type { MouseEvent } from "react";
import { NAV_LINKS } from "@/content/site";
import { useLanguage } from "@/hooks/useLanguage";
import { scrollToSection } from "@/lib/scroll";
import { SpaceXLogo } from "@/components/ui/SpaceXLogo";
import { Arrow } from "@/components/ui/Cta";

export function Footer() {
  const { t } = useLanguage();
  const year = 2026;

  const go = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    scrollToSection(id);
  };

  return (
    <footer id="site-footer" className="relative border-t border-line bg-void pb-[max(2rem,env(safe-area-inset-bottom))] pt-[clamp(4rem,10vh,7rem)]">
      <div className="shell">
        <div className="grid-12 gap-y-12">
          <div className="col-span-12 lg:col-span-6">
            <SpaceXLogo title="SpaceX" className="h-auto w-[clamp(180px,24vw,320px)] text-bone" />
            <p className="t-mono mt-8 max-w-[22rem] text-steel">{t.footer.signal}</p>
          </div>

          <nav aria-label={t.footer.navLabel} className="col-span-12 sm:col-span-6 lg:col-span-3 lg:col-start-8">
            <ul className="t-mono">
              {NAV_LINKS.map((link, i) => (
                <li key={link.id} className="border-t border-line">
                  <a href={`#${link.id}`} onClick={go(link.id)} className="footer-link">
                    <span className="text-steel">0{i + 1}</span>
                    <span>{t.nav.links[link.key]}</span>
                  </a>
                </li>
              ))}
              <li className="border-y border-line">
                <a href="#top" onClick={go("top")} className="footer-link">
                  <Arrow direction="up" className="text-mars" />
                  <span>{t.footer.top}</span>
                </a>
              </li>
            </ul>
          </nav>

          <div className="col-span-12 sm:col-span-6 lg:col-span-2 lg:col-start-11">
            <p className="t-mono text-bone">{t.footer.credit}</p>
          </div>
        </div>

        <div className="mt-[clamp(4rem,10vh,7rem)] border-t border-line pt-6">
          <div className="grid-12 gap-y-4">
            <p className="t-mono col-span-12 text-bone md:col-span-6" lang="en">
              {t.footer.disclaimer}
            </p>
            <p className="col-span-12 text-[0.8rem] leading-relaxed text-steel md:col-span-6">{t.footer.disclaimerLong}</p>
          </div>
          <p className="t-mono mt-8 text-steel">© {year} Aklio Studio — Concept work</p>
        </div>
      </div>
    </footer>
  );
}
