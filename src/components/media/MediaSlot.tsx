"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { getMedia, type MediaId } from "@/content/media";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/cn";

interface MediaSlotProps {
  id: MediaId;
  /**
   * "ratio" (default) reserves space with the asset's aspect ratio.
   * "fill" stretches to the parent, which must define the size.
   */
  layout?: "ratio" | "fill";
  /** Responsive `sizes` hint for next/image. */
  sizes?: string;
  className?: string;
  /** Extra class on the inner layer (the element GSAP scales / translates). */
  innerClassName?: string;
  /** Show the discreet slot identifier while the asset is missing. */
  showLabel?: boolean;
  /** Treat as decorative (empty alt). */
  decorative?: boolean;
  style?: CSSProperties;
}

/**
 * MediaSlot — a reserved, animation-ready frame for a final image.
 *
 *  ┌ .media-slot ───────────────────────┐   ← clip / mask animations
 *  │ ┌ .media-slot__inner [data-media] ┐ │   ← parallax / scale animations
 *  │ │  <Image> or CSS fallback        │ │
 *  │ └─────────────────────────────────┘ │
 *  └─────────────────────────────────────┘
 *
 * When `src` is null in content/media.ts nothing is requested from the network.
 */
export function MediaSlot({
  id,
  layout = "ratio",
  sizes = "100vw",
  className,
  innerClassName,
  showLabel = true,
  decorative = false,
  style,
}: MediaSlotProps) {
  const { locale, t } = useLanguage();
  const media = getMedia(id);
  const alt = decorative ? "" : media.alt[locale];

  const frameStyle: CSSProperties =
    layout === "ratio" ? { aspectRatio: String(media.ratio), ...style } : { ...style };

  return (
    <div
      className={cn("media-slot", layout === "fill" && "absolute inset-0", className)}
      style={frameStyle}
      data-media-slot={id}
      data-media-state={media.src ? "ready" : "pending"}
    >
      <div className={cn("media-slot__inner", innerClassName)} data-media>
        {media.src ? (
          <Image
            src={media.src}
            alt={alt}
            fill
            sizes={sizes}
            preload={media.priority ?? false}
            loading={media.priority ? "eager" : "lazy"}
            className="object-cover"
            style={{ objectPosition: media.position }}
          />
        ) : (
          <div
            className="media-fallback fx-grain"
            data-tone={media.fallback}
            role={decorative ? undefined : "img"}
            aria-label={decorative ? undefined : alt}
          />
        )}
      </div>

      {!media.src && showLabel && (
        <div className="pointer-events-none" aria-hidden="true">
          <div className="media-fallback__frame" />
          <div className="media-fallback__label t-mono">
            <span className="text-mars">◆</span>
            <span>{id}</span>
            <span className="hidden sm:inline">· {media.ratioLabel}</span>
            <span className="hidden md:inline">· {t.media.pending}</span>
          </div>
        </div>
      )}
    </div>
  );
}
