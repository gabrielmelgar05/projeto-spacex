import { cn } from "@/lib/cn";

type MaskLinesProps = {
  lines: readonly string[];
  as?: "h1" | "h2" | "h3" | "p" | "div";
  className?: string;
  lineClassName?: string;
  id?: string;
};

/**
 * Title with intentional line breaks. Each line sits in an overflow mask so it
 * can slide in from below (`[data-line]`). Screen readers get the full sentence
 * once, from a visually-hidden copy.
 */
export function MaskLines({ lines, as: Tag = "h2", className, lineClassName, id }: MaskLinesProps) {
  return (
    <Tag className={className} id={id}>
      <span className="sr-only">{lines.join(" ")}</span>
      {lines.map((line, i) => (
        <span key={i} className="line-mask" aria-hidden>
          <span className={cn("line-inner", lineClassName)} data-line>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
