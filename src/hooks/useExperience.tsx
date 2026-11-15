"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

/**
 * Experience lifecycle shared between the preloader and the page.
 *  - "loading":   preloader on screen, scroll locked
 *  - "revealing": the surface is opening — hero intro starts here
 *  - "ready":     preloader removed, page fully interactive
 */
export type ExperiencePhase = "loading" | "revealing" | "ready";

interface ExperienceContextValue {
  phase: ExperiencePhase;
  revealed: boolean;
  setPhase: (phase: ExperiencePhase) => void;
}

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [phase, setPhaseState] = useState<ExperiencePhase>("loading");
  const setPhase = useCallback((next: ExperiencePhase) => setPhaseState(next), []);
  const value = useMemo(() => ({ phase, revealed: phase !== "loading", setPhase }), [phase, setPhase]);
  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>;
}

export function useExperience(): ExperienceContextValue {
  const ctx = useContext(ExperienceContext);
  if (!ctx) throw new Error("useExperience must be used inside <ExperienceProvider>");
  return ctx;
}
