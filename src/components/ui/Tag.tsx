import { cn } from "@/lib/cn";

interface TagProps {
  kind: "real" | "fiction" | "neutral";
  children: React.ReactNode;
  className?: string;
}

/** Small mono marker that separates historical record from fictional narrative. */
export function Tag({ kind, children, className }: TagProps) {
  return (
    <span className={cn("tag", className)} data-kind={kind}>
      {children}
    </span>
  );
}
