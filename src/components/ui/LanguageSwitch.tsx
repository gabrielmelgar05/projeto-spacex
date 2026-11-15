"use client";

import { LOCALES } from "@/content/i18n";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/cn";

/** EN / PT segmented switch with a sliding copper marker. */
export function LanguageSwitch({ className }: { className?: string }) {
  const { locale, setLocale, t } = useLanguage();
  const index = LOCALES.indexOf(locale);

  return (
    <div role="group" aria-label={t.nav.language} className={cn("relative flex items-center", className)}>
      {LOCALES.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            lang={code === "pt" ? "pt-BR" : "en"}
            aria-pressed={active}
            onClick={() => setLocale(code)}
            className={cn(
              "t-mono relative flex h-11 w-10 items-center justify-center transition-colors duration-300",
              active ? "text-bone" : "text-steel hover:text-bone",
            )}
          >
            <span className="sr-only">{code === "pt" ? "Português" : "English"}</span>
            <span aria-hidden="true">{code.toUpperCase()}</span>
          </button>
        );
      })}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-2 left-0 h-px w-10 bg-mars transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: `translateX(${index * 100}%)` }}
      />
      <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-2.5 w-px -translate-y-1/2 bg-line-strong" />
    </div>
  );
}
