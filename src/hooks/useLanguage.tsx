"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { DEFAULT_LOCALE, HTML_LANG, LOCALES, dictionaries, type Dictionary, type Locale } from "@/content/i18n";
import { ScrollTrigger } from "@/lib/gsap";

const STORAGE_KEY = "aklio-spacex-locale";

interface LanguageContextValue {
  locale: Locale;
  t: Dictionary;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readStoredLocale(): Locale | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value && (LOCALES as readonly string[]).includes(value) ? (value as Locale) : null;
  } catch {
    return null;
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Server and first client render always use the default locale → no hydration mismatch.
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const stored = readStoredLocale();
    // Restoring a saved preference is a one-off sync with browser storage.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored && stored !== DEFAULT_LOCALE) setLocaleState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[locale];
    // Copy length changes between languages: recompute every trigger once layout settles.
    const id = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => window.cancelAnimationFrame(id);
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable — preference simply isn't persisted */
    }
  }, []);

  const value = useMemo(() => ({ locale, t: dictionaries[locale], setLocale }), [locale, setLocale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}
