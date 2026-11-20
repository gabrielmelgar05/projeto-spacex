"use client";

import { useLanguage, type Locale } from "@/i18n/LanguageProvider";

export function LanguageSelector() {
  const { locale, setLanguage, t } = useLanguage();
  return (
    <div role="group" aria-label={t.UI.language} className="flex shrink-0 items-center font-mono text-[0.6875rem] tracking-[0.1em]">
      {(["en", "pt"] as Locale[]).map((language, i) => (
        <span key={language} className="flex items-center">
          {i > 0 && <span aria-hidden className="text-faint">/</span>}
          <button
            type="button"
            lang={language === "pt" ? "pt-BR" : "en"}
            aria-label={language === "en" ? t.UI.english : t.UI.portuguese}
            aria-pressed={locale === language}
            onClick={() => setLanguage(language)}
            className="min-h-11 px-2 text-mute transition-colors duration-200 hover:text-ink aria-pressed:text-ink aria-pressed:underline aria-pressed:decoration-haze aria-pressed:underline-offset-4"
          >
            {language.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
