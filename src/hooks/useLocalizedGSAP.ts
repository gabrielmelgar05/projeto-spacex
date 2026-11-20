"use client";

import { useEffect, type RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useLanguage } from "@/i18n/LanguageProvider";

/** Own and rebuild only this component's animations when its text changes. */
export function useLocalizedGSAP(callback: gsap.ContextFunc, config: { scope: RefObject<HTMLElement | null>; dependencies?: unknown[] }) {
  const { locale, registerAnimationCleanup } = useLanguage();
  const result = useGSAP(callback, { scope: config.scope, dependencies: [locale, ...(config.dependencies ?? [])], revertOnUpdate: true });
  const { context } = result;
  useEffect(() => registerAnimationCleanup(() => context.revert()), [context, registerAnimationCleanup]);
  return result;
}
