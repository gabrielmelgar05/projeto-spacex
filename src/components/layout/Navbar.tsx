"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, ScrollTrigger, EASE, MEDIA, smoothScrollTo } from "@/lib/gsap";
import { onIntroRelease } from "@/lib/intro";
import { NAV, NAV_PRIMARY } from "@/data/content";
import { SITE } from "@/data/site";
import { Logo } from "@/components/ui/Logo";
import { ScrollButton } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

function go(e: React.MouseEvent<HTMLAnchorElement>, target: string, after?: () => void) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
  e.preventDefault();
  after?.();
  smoothScrollTo(target === "top" ? 0 : target);
  history.replaceState(null, "", target === "top" ? location.pathname + location.search : target);
}

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const openRef = useRef(open);
  useEffect(() => {
    openRef.current = open;
  }, [open]);

  useGSAP(
    () => {
      const nav = navRef.current!;

      // Entrance in sync with the hero reveal.
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motion, () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-nav-item]", nav);
        gsap.set(items, { autoAlpha: 0, y: -10 });
        return onIntroRelease(() => {
          gsap.to(items, {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: EASE.out,
            stagger: 0.05,
            delay: 0.55,
          });
        });
      });

      // Background after the first scroll, hide on scroll-down, show on scroll-up.
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const y = self.scroll();
          nav.dataset.scrolled = String(y > 40);
          const hide = self.direction === 1 && y > window.innerHeight * 0.8 && !openRef.current;
          nav.dataset.hidden = String(hide);
        },
      });

      // Active section indicator.
      NAV.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (!section) return;
        ScrollTrigger.create({
          trigger: section,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: ({ isActive }) => {
            nav.querySelectorAll(`[data-nav-link="${id}"]`).forEach((a) => {
              if (isActive) a.setAttribute("aria-current", "true");
              else a.removeAttribute("aria-current");
            });
          },
        });
      });
    },
    { scope: navRef },
  );

  // Mobile menu: scroll lock, Escape, focus management.
  useEffect(() => {
    const html = document.documentElement;
    if (!open) return;
    html.classList.add("is-locked");
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const btn = menuBtnRef.current;
    return () => {
      html.classList.remove("is-locked");
      window.removeEventListener("keydown", onKey);
      btn?.focus();
    };
  }, [open]);

  return (
    <>
    <header ref={navRef} className="nav" data-scrolled="false" data-hidden="false">
      <nav aria-label="Primary" className="shell flex h-full items-center justify-between gap-6">
        <a
          href="#top"
          className="flex h-[0.95rem] items-center md:h-[1.05rem]"
          aria-label="Back to top"
          data-nav-item
          onClick={(e) => go(e, "top")}
        >
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 lg:flex" data-nav-item>
          {NAV_PRIMARY.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                data-nav-link={item.id}
                className="group flex items-baseline gap-1.5 px-3 py-2 text-[0.8125rem] text-mute transition-colors duration-300 hover:text-ink aria-[current=true]:text-ink"
                onClick={(e) => go(e, `#${item.id}`)}
              >
                <span className="font-mono text-[0.5625rem] tracking-[0.1em] text-dim transition-colors group-hover:text-mute">
                  {item.index}
                </span>
                <span className="link-line" data-nav-link={item.id}>
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3" data-nav-item>
          <span className="hidden items-center gap-2 t-label text-dim xl:flex">
            <span className="dot dot--live bg-haze" aria-hidden />
            Live archive
          </span>
          <ScrollButton to="#data" className="hidden sm:inline-flex">
            Mission log
          </ScrollButton>
          <button
            ref={menuBtnRef}
            type="button"
            className="relative z-[60] grid h-11 w-11 place-items-center border border-line-strong text-ink transition-colors hover:border-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-2.5 w-4" aria-hidden>
              <span
                className={cn(
                  "absolute left-0 top-0 h-px w-full bg-current transition-transform duration-500 ease-[var(--ease-out-expo)]",
                  open && "translate-y-[5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-500 ease-[var(--ease-out-expo)]",
                  open && "-translate-y-[4px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </nav>
    </header>

      {/* Mobile / tablet menu — outside the header so its fixed positioning
          is not trapped by the header's backdrop-filter. */}
      <div
        ref={menuRef}
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-void pt-[calc(var(--nav-h)+2rem)] transition-[clip-path] duration-700 ease-[var(--ease-in-out-expo)] lg:hidden",
          open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none invisible [clip-path:inset(0_0_100%_0)]",
        )}
        aria-hidden={!open}
        inert={!open}
      >
        <ul className="shell flex flex-col">
          {NAV.map((item, i) => (
            <li key={item.id} className="border-b border-line first:border-t">
              <a
                href={`#${item.id}`}
                data-nav-link={item.id}
                className="flex items-baseline gap-4 py-4 text-ink"
                onClick={(e) => go(e, `#${item.id}`, () => setOpen(false))}
                style={{
                  transition: "opacity .6s var(--ease-out-expo), transform .8s var(--ease-out-expo)",
                  transitionDelay: open ? `${0.15 + i * 0.04}s` : "0s",
                  opacity: open ? 1 : 0,
                  transform: open ? "none" : "translateY(16px)",
                }}
              >
                <span className="t-label text-dim">{item.index}</span>
                <span className="font-display text-[clamp(1.1rem,5vw,2rem)] uppercase tracking-[-0.02em]">
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p className="shell mt-auto pb-8 t-label text-dim">{SITE.disclaimer}</p>
      </div>
    </>
  );
}
