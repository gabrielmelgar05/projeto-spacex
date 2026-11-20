"use client";

import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { en, type Dictionary } from "./en";
import { pt } from "./pt";

export type Locale = "en" | "pt";
const STORAGE_KEY = "mars-mission-language";
const dictionaries: Record<Locale, Dictionary> = { en, pt };

type LanguageContextValue = {
  locale: Locale;
  t: Dictionary;
  setLanguage: (locale: Locale) => void;
  registerAnimationCleanup: (cleanup: () => void) => () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // The server and first client render always agree. Preferences are restored
  // after hydration, while the existing preloader still covers the page.
  const [locale, setLocale] = useState<Locale>("en");
  const currentLocale = useRef<Locale>("en");
  const cleanups = useRef(new Set<() => void>());
  const scrollPosition = useRef<number | null>(null);

  const registerAnimationCleanup = useCallback((cleanup: () => void) => {
    cleanups.current.add(cleanup);
    return () => { cleanups.current.delete(cleanup); };
  }, []);

  const setLanguage = useCallback((next: Locale) => {
    if (next === currentLocale.current) return;
    scrollPosition.current = window.scrollY;
    // Revert SplitText and pin spacers BEFORE React reconciles translated DOM.
    // This prevents stale wrappers from restoring old text after a language switch.
    cleanups.current.forEach((cleanup) => cleanup());
    currentLocale.current = next;
    setLocale(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* Storage may be unavailable. */ }
  }, []);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "pt") setLanguage("pt");
    } catch { /* English remains the default without storage. */ }
  }, [setLanguage]);

  useLayoutEffect(() => {
    const copy = dictionaries[locale];
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";
    document.title = copy.metadata.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", copy.metadata.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", copy.metadata.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", copy.metadata.description);
    if (scrollPosition.current !== null) {
      // Child layout effects have rebuilt their own contexts by this point.
      const top = scrollPosition.current;
      ScrollTrigger.refresh();
      window.scrollTo({ top, behavior: "instant" });
      ScrollTrigger.update();
      scrollPosition.current = null;
    }
  }, [locale]);

  const value = useMemo(() => ({ locale, t: dictionaries[locale], setLanguage, registerAnimationCleanup }), [locale, setLanguage, registerAnimationCleanup]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
