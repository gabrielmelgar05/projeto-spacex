import { en, type Dictionary } from "./en";
import { pt } from "./pt";

export const LOCALES = ["en", "pt"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const dictionaries: Record<Locale, Dictionary> = { en, pt };

/** Value used for <html lang>. */
export const HTML_LANG: Record<Locale, string> = { en: "en", pt: "pt-BR" };

export type { Dictionary };
