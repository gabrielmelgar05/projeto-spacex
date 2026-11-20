"use client";

import { ArrowDown, ArrowUp, ArrowUpRight } from "lucide-react";
import { smoothScrollTo } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type Direction = "right" | "down" | "up";

const ICONS = { right: ArrowUpRight, down: ArrowDown, up: ArrowUp };

type ScrollButtonProps = {
  /** In-page target: "#section-id" or "top". */
  to: string;
  children: React.ReactNode;
  variant?: "ghost" | "solid";
  dir?: Direction;
  className?: string;
};

/**
 * Minimal mono button that smooth-scrolls to an in-page target.
 * It is a real anchor, so it works without JavaScript and with modified clicks.
 */
export function ScrollButton({ to, children, variant = "ghost", dir = "right", className }: ScrollButtonProps) {
  const Icon = ICONS[dir];
  const href = to === "top" ? "#top" : to;

  return (
    <a
      href={href}
      data-dir={dir}
      className={cn("btn", variant === "solid" && "btn--solid", className)}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        smoothScrollTo(to === "top" ? 0 : to);
        history.replaceState(null, "", to === "top" ? location.pathname + location.search : to);
      }}
    >
      <span>{children}</span>
      <span className="btn__icon" aria-hidden>
        <Icon size={14} strokeWidth={1.5} />
      </span>
    </a>
  );
}
