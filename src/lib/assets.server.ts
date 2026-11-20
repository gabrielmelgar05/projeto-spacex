import fs from "node:fs";
import path from "node:path";
import { ASSETS, type AssetId, type ResolvedAssets } from "@/data/assets";

const IMAGE_EXTENSIONS = [".avif", ".webp", ".png", ".jpg", ".jpeg"];
const BRAND_EXTENSIONS = [".svg", ".png", ".webp"];

/**
 * Checks /public for every asset declared in the manifest and returns the URL
 * of the first matching file (or null). Runs on the server only — at build time
 * for the static page, and on every request in `next dev`.
 *
 * Missing files never throw: the UI falls back to placeholders.
 */
export function resolveAssets(): ResolvedAssets {
  const publicDir = path.join(process.cwd(), "public");
  const resolved = {} as ResolvedAssets;

  for (const id of Object.keys(ASSETS) as AssetId[]) {
    const { path: base } = ASSETS[id];
    const extensions = base.startsWith("/branding/") ? BRAND_EXTENSIONS : IMAGE_EXTENSIONS;
    const match = extensions.find((ext) => {
      try {
        return fs.statSync(path.join(publicDir, base + ext)).isFile();
      } catch {
        return false;
      }
    });
    resolved[id] = match ? base + match : null;
  }

  return resolved;
}
