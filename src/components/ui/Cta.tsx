"use client";

import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { scrollToSection } from "@/lib/scroll";

interface CtaProps {
  /** In-page section id to scroll to. */
  to: string;
  children: string;
  className?: string;
  icon?: ReactNode;
}

/** Editorial text CTA: rule + rolling label. Always a real anchor (works without JS). */
export function Cta({ to, children, className, icon }: CtaProps) {
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    scrollToSection(to);
  };

  return (
    <a href={to === "top" ? "#top" : `#${to}`} onClick={onClick} className={cn("cta", className)}>
      <span className="cta__rule" aria-hidden="true" />
      <span className="cta__label">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      {icon}
    </a>
  );
}

/** Thin geometric arrow (no icon font needed). */
export function Arrow({ direction = "down", className }: { direction?: "down" | "up" | "right"; className?: string }) {
  const rotate = direction === "down" ? 90 : direction === "up" ? -90 : 0;
  return (
    <svg viewBox="0 0 24 24" className={cn("h-3.5 w-3.5", className)} aria-hidden="true" style={{ rotate: `${rotate}deg` }}>
      <path d="M3 12h17M14 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth={1.25} />
    </svg>
  );
}
