"use client";

import { useState } from "react";
import { useAssetSrc } from "@/components/providers/AssetsProvider";
import { SITE } from "@/data/site";
import { cn } from "@/lib/cn";

/**
 * Official brand logo slot.
 *
 * Renders the original file from /public/branding/spacex-logo.(svg|png|webp)
 * untouched (only an optional white filter). The brand is never redrawn:
 * while the file is missing, a neutral technical tag marks the position.
 */
export function Logo({ className }: { className?: string }) {
  const src = useAssetSrc("BRAND_LOGO");
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <span className={cn("logo logo--fallback", className)} role="img" aria-label="SpaceX (logo file pending)">
        <span aria-hidden>[ BRAND / LOGO ]</span>
      </span>
    );
  }

  return (
    // A plain <img> keeps the vector crisp and avoids image optimisation of SVG.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="SpaceX"
      className={cn("logo", SITE.logo.forceWhite && "logo--white", className)}
      draggable={false}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
