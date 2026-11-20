"use client";

import { createContext, useContext } from "react";
import type { AssetId, ResolvedAssets } from "@/data/assets";

const AssetsContext = createContext<ResolvedAssets | null>(null);

export function AssetsProvider({
  assets,
  children,
}: {
  assets: ResolvedAssets;
  children: React.ReactNode;
}) {
  return <AssetsContext.Provider value={assets}>{children}</AssetsContext.Provider>;
}

/** Returns the resolved public URL for an asset, or null if the file is missing. */
export function useAssetSrc(id: AssetId): string | null {
  const ctx = useContext(AssetsContext);
  return ctx?.[id] ?? null;
}
