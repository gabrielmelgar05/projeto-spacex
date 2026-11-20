"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { ASSETS, type AssetId } from "@/data/assets";
import { useAssetSrc } from "@/components/providers/AssetsProvider";
import { scheduleRefresh } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type AssetSlotProps = {
  id: AssetId;
  /** Classes for the outer frame (position, size, clip-path target…). */
  className?: string;
  /** Classes for the inner media layer — the element sections animate (parallax/scale). */
  mediaClassName?: string;
  /** Reserve space using the manifest ratio. Leave false when the parent defines the size. */
  intrinsic?: boolean;
  fit?: "cover" | "contain";
  /** object-position for >= 768px, e.g. "50% 70%". */
  position?: string;
  /** object-position for < 768px. Defaults to `position`. */
  mobilePosition?: string;
  /** next/image `sizes`. Required for good responsive delivery. */
  sizes: string;
  /** Overrides the manifest `critical` flag. */
  priority?: boolean;
  /** Placeholder silhouette while the file is missing. */
  shape?: "rect" | "circle" | "outline";
  /** Where the placeholder label sits (avoids collisions in layered compositions). */
  labelAt?: "bottom" | "top" | "center";
  style?: CSSProperties;
};

/**
 * Renders a manifest image, or a neutral technical placeholder with identical
 * geometry while the file has not been added to /public yet.
 *
 * Animations should always target the frame or `[data-asset-media]`, never the
 * <img> itself — that way every timeline works with or without the final asset.
 */
export function AssetSlot({
  id,
  className,
  mediaClassName,
  intrinsic = false,
  fit = "cover",
  position = "50% 50%",
  mobilePosition,
  sizes,
  priority,
  shape = "rect",
  labelAt = "bottom",
  style,
}: AssetSlotProps) {
  const def = ASSETS[id];
  const src = useAssetSrc(id);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const showImage = Boolean(src) && !failed;
  const isPriority = priority ?? Boolean(def.critical);

  return (
    <div
      className={cn("asset-slot", className)}
      data-asset={id}
      data-state={showImage ? (loaded ? "loaded" : "loading") : "empty"}
      style={
        {
          ...(intrinsic ? { aspectRatio: String(def.ratio) } : null),
          "--obj-pos": position,
          "--obj-pos-m": mobilePosition ?? position,
          ...style,
        } as CSSProperties
      }
    >
      <div className={cn("asset-media", mediaClassName)} data-asset-media>
        {showImage ? (
          <Image
            src={src!}
            alt={def.alt}
            fill
            sizes={sizes}
            fetchPriority={isPriority ? "high" : undefined}
            loading={isPriority ? "eager" : "lazy"}
            className={cn("asset-img", fit === "contain" ? "object-contain" : "object-cover")}
            onLoad={() => {
              setLoaded(true);
              scheduleRefresh();
            }}
            onError={() => setFailed(true)}
          />
        ) : (
          <AssetPlaceholder id={id} shape={shape} labelAt={labelAt} transparent={def.transparent} />
        )}
      </div>
    </div>
  );
}

function AssetPlaceholder({
  id,
  shape,
  labelAt,
  transparent,
}: {
  id: AssetId;
  shape: "rect" | "circle" | "outline";
  labelAt: "bottom" | "top" | "center";
  transparent?: boolean;
}) {
  const def = ASSETS[id];
  return (
    <div
      className="asset-ph"
      data-shape={shape}
      data-label={labelAt}
      data-transparent={transparent ? "" : undefined}
      role={def.alt ? "img" : undefined}
      aria-label={def.alt ? `${def.alt} (image pending)` : undefined}
      aria-hidden={def.alt ? undefined : true}
    >
      <span className="asset-ph__corner" data-c="tl" />
      <span className="asset-ph__corner" data-c="tr" />
      <span className="asset-ph__corner" data-c="bl" />
      <span className="asset-ph__corner" data-c="br" />
      <svg className="asset-ph__cross" viewBox="0 0 40 40" aria-hidden>
        <path d="M20 0v40M0 20h40" />
        <circle cx="20" cy="20" r="6" />
      </svg>
      <span className="asset-ph__label" aria-hidden>
        <span>ASSET / {id}</span>
        <span className="asset-ph__meta">
          {def.path.split("/").pop()} · {def.size}
        </span>
      </span>
    </div>
  );
}
