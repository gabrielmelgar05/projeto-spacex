"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { EASE, prefersReducedMotion } from "@/lib/motion";
import { lockScroll, scrollToSection, unlockScroll } from "@/lib/scroll";
import { NAV_LINKS, SECTIONS } from "@/content/site";
import { useLanguage } from "@/hooks/useLanguage";
import { useExperience } from "@/hooks/useExperience";
import { SpaceXLogo } from "@/components/ui/SpaceXLogo";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { cn } from "@/lib/cn";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Navbar() {
  const { t } = useLanguage();
  const { revealed } = useExperience();
  const headerRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);

  // ── Scroll-linked chrome: progress bar, chapter tracking, hide on scroll ──
  useGSAP(
    () => {
      const header = headerRef.current;
      const bar = barRef.current;
      if (!header || !bar) return;

      const setBar = gsap.quickSetter(bar, "scaleX");
      ScrollTrigger.create({
        start: 0,
        end: "max",
        refreshPriority: -10,
        onUpdate: (self) => {
          setBar(self.progress);
          const y = self.scroll();
          header.dataset.solid = String(y > 24);
          const hide = self.direction === 1 && y > window.innerHeight * 0.75 && !openRef.current;
          header.dataset.hidden = String(hide);
        },
      });

      SECTIONS.forEach(({ id, chapter }) => {
        const el = document.getElementById(id);
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          refreshPriority: -10,
          onToggle: (self) => {
            if (self.isActive) setActive(chapter);
          },
        });
      });
    },
    { scope: headerRef },
  );

  // Entrance once the preloader opens
  useGSAP(
    () => {
      if (!revealed || prefersReducedMotion()) return;
      gsap.from("[data-nav-item]", {
        y: -14,
        autoAlpha: 0,
        duration: 1.1,
        ease: EASE.out,
        stagger: 0.07,
        delay: 0.55,
      });
    },
    { scope: headerRef, dependencies: [revealed] },
  );

  // ── Mobile menu ───────────────────────────────────────────────────────
  const closeMenu = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    openRef.current = open;
    const menu = menuRef.current;
    const main = document.getElementById("main");
    const footer = document.getElementById("site-footer");
    if (!menu) return;

    const reduced = prefersReducedMotion();
    const links = menu.querySelectorAll("[data-menu-item]");
    let tween: gsap.core.Timeline | null = null;

    if (open) {
      lockScroll();
      if (main) main.inert = true;
      if (footer) footer.inert = true;
      menu.hidden = false;
      tween = gsap
        .timeline()
        .fromTo(
          menu,
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: reduced ? 0 : 0.85, ease: EASE.inOut },
        )
        .fromTo(
          links,
          // opacity (not autoAlpha) keeps the links focusable while they animate in
          { yPercent: reduced ? 0 : 110, opacity: reduced ? 1 : 0 },
          { yPercent: 0, opacity: 1, duration: reduced ? 0 : 0.9, ease: EASE.out, stagger: 0.06 },
          reduced ? 0 : 0.35,
        );
      const first = menu.querySelector<HTMLElement>(FOCUSABLE);
      first?.focus({ preventScroll: true });
    } else if (!menu.hidden) {
      tween = gsap.timeline({
        onComplete: () => {
          menu.hidden = true;
        },
      });
      tween.to(menu, { clipPath: "inset(0% 0% 100% 0%)", duration: reduced ? 0 : 0.7, ease: EASE.inOut });
    }

    return () => {
      tween?.kill();
      if (open) {
        unlockScroll();
        if (main) main.inert = false;
        if (footer) footer.inert = false;
      }
    };
  }, [open]);

  // Close the menu when the viewport grows to desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const onMenuKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!open) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      return;
    }
    if (event.key !== "Tab" || !menuRef.current || !toggleRef.current) return;
    const items = [toggleRef.current, ...Array.from(menuRef.current.querySelectorAll<HTMLElement>(FOCUSABLE))];
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const go = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    if (open) {
      closeMenu(false);
      // wait for the scroll lock to release before moving
      window.setTimeout(() => scrollToSection(id), 60);
    } else {
      scrollToSection(id);
    }
  };

  const chapterName = t.nav.chapters[active];

  return (
    <header
      ref={headerRef}
      className="site-header fixed inset-x-0 top-0 z-50"
      data-solid="false"
      data-hidden="false"
      data-open={open}
      onKeyDown={onMenuKeyDown}
    >
      {/* experience progress */}
      <div className="absolute inset-x-0 top-0 h-px bg-line" aria-hidden="true">
        <div ref={barRef} className="h-full origin-left bg-mars" style={{ transform: "scaleX(0)" }} />
      </div>

      <div className="site-header__bar shell relative z-10 flex h-[var(--nav-h)] items-center justify-between gap-6">
        <a
          href="#top"
          onClick={go("top")}
          aria-label={t.nav.home}
          className="relative -my-2 flex items-center py-2 text-bone"
          data-nav-item
        >
          <SpaceXLogo title={null} className="h-auto w-[clamp(104px,9vw,132px)]" />
        </a>

        {/* chapter indicator */}
        <div
          className="t-mono pointer-events-none absolute left-1/2 hidden -translate-x-1/2 items-center gap-3 text-steel xl:flex"
          data-nav-item
          aria-hidden="true"
        >
          <span className="tabular-nums text-mars">{String(active + 1).padStart(2, "0")}</span>
          <span className="h-px w-6 bg-line-strong" />
          <span className="relative block h-[1.5em] min-w-[10rem] overflow-hidden">
            <span key={chapterName} className="chapter-swap absolute inset-0 text-bone">
              {chapterName}
            </span>
          </span>
          <span className="tabular-nums">/ {String(SECTIONS.length).padStart(2, "0")}</span>
        </div>

        <nav aria-label={t.nav.primary} className="hidden items-center lg:flex" data-nav-item>
          <ul className="flex items-center gap-[clamp(1.25rem,2.4vw,2.5rem)]">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} onClick={go(link.id)} className="nav-link t-mono">
                  {t.nav.links[link.key]}
                </a>
              </li>
            ))}
          </ul>
          <span className="mx-6 h-3 w-px bg-line-strong" aria-hidden="true" />
          <LanguageSwitch />
        </nav>

        <div className="flex items-center gap-1 lg:hidden" data-nav-item>
          <LanguageSwitch className="max-[359px]:hidden" />
          <button
            ref={toggleRef}
            type="button"
            className="t-mono -mr-3 flex h-11 items-center gap-3 px-3 text-bone"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true">{open ? t.nav.close : t.nav.menu}</span>
            <span className="menu-icon" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      {/* mobile menu */}
      <div
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={t.nav.menu}
        hidden
        className="fx-columns fixed inset-0 z-0 flex flex-col bg-void pt-[calc(var(--nav-h)+2rem)] lg:hidden"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
      >
        <nav aria-label={t.nav.primary} className="shell flex-1">
          <ol className="border-t border-line">
            {NAV_LINKS.map((link, i) => (
              <li key={link.id} className="overflow-hidden border-b border-line">
                <a
                  href={`#${link.id}`}
                  onClick={go(link.id)}
                  data-menu-item
                  className="group flex items-baseline justify-between py-5"
                >
                  <span className="t-display text-[clamp(2rem,9vw,3.5rem)] transition-colors duration-300 group-hover:text-mars group-focus-visible:text-mars">
                    {t.nav.links[link.key]}
                  </span>
                  <span className="t-mono text-steel">{String(i + 1).padStart(2, "0")}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="shell flex items-end justify-between gap-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <p className="t-mono max-w-[16rem] text-steel" data-menu-item>
            {t.nav.menuNote}
          </p>
          <span className="t-mono text-steel" data-menu-item aria-hidden="true">
            {String(active + 1).padStart(2, "0")} / {String(SECTIONS.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </header>
  );
}

export function SkipLink() {
  const { t } = useLanguage();
  return (
    <a
      href="#main"
      className={cn(
        "sr-only-focusable t-mono fixed left-4 top-4 z-[200] bg-bone px-4 py-3 text-void",
      )}
    >
      {t.common.skip}
    </a>
  );
}
