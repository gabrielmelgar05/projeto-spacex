import { cn } from "@/lib/cn";

interface MaskLinesProps {
  lines: readonly string[];
  /** Optional class per line index (e.g. indentation for asymmetric headlines). */
  lineClass?: (index: number) => string | undefined;
}

/**
 * Renders a headline as masked lines for clip/translate reveals.
 * Screen readers get the sentence once; the visual lines are aria-hidden.
 * Targets for GSAP: `[data-line]` (the moving inner span).
 */
export function MaskLines({ lines, lineClass }: MaskLinesProps) {
  return (
    <>
      <span className="sr-only">{lines.join(" ")}</span>
      <span aria-hidden="true" className="block">
        {lines.map((line, i) => (
          <span key={i} className={cn("mask-line", lineClass?.(i))}>
            <span data-line>{line}</span>
          </span>
        ))}
      </span>
    </>
  );
}
