/**
 * Image asset manifest.
 *
 * Every image in the experience is declared here. Files live in /public and are
 * referenced WITHOUT extension: the server resolver (src/lib/assets.server.ts)
 * looks for `.avif`, `.webp`, `.png`, `.jpg`, `.jpeg` (and `.svg` for branding)
 * in that order and uses the first one that exists.
 *
 * While a file is missing, its <AssetSlot> renders a neutral technical
 * placeholder with the same size and ratio, so the layout never shifts.
 *
 * Full art direction + generation prompts: docs/IMAGE_ASSETS.md
 */

export type AssetId =
  | "BRAND_LOGO"
  | "HERO_LANDSCAPE"
  | "HERO_STARSHIP"
  | "HERO_FOREGROUND"
  | "JOURNEY_DEEP_SPACE"
  | "JOURNEY_EARTH"
  | "JOURNEY_MARS"
  | "JOURNEY_STARSHIP_TRANSIT"
  | "STARSHIP_PROFILE"
  | "STARSHIP_ENGINES"
  | "LANDING_TOUCHDOWN"
  | "FIRSTSTEPS_ASTRONAUT"
  | "FIRSTSTEPS_FOOTPRINT"
  | "DATA_SURFACE_MAP"
  | "LIFE_HABITAT"
  | "LIFE_CREW_WORK"
  | "LIFE_SCIENCE"
  | "LIFE_ROVER"
  | "LIFE_PANORAMA"
  | "FINAL_HORIZON";

export type AssetDefinition = {
  id: AssetId;
  /** Public path without extension, e.g. "/images/hero/hero-mars-landscape" */
  path: string;
  alt: string;
  /** Intrinsic ratio of the delivered file (width / height). */
  ratio: number;
  /** Recommended delivery size, documentation only. */
  size: string;
  /** Transparent PNG/WebP/AVIF with alpha. */
  transparent?: boolean;
  /** Loaded eagerly with high priority (above the fold). */
  critical?: boolean;
};

export const ASSETS: Record<AssetId, AssetDefinition> = {
  BRAND_LOGO: {
    id: "BRAND_LOGO",
    path: "/branding/spacex-logo",
    alt: "SpaceX",
    ratio: 400 / 50,
    size: "Original vector (SVG) or transparent PNG",
    transparent: true,
    critical: true,
  },
  HERO_LANDSCAPE: {
    id: "HERO_LANDSCAPE",
    path: "/images/hero/hero-mars-landscape",
    alt: "Rocky Martian plain under a hazy grey sky",
    ratio: 16 / 9,
    size: "3200 × 1800",
    critical: true,
  },
  HERO_STARSHIP: {
    id: "HERO_STARSHIP",
    path: "/images/hero/hero-starship",
    alt: "Starship suspended above the Martian surface during its final descent",
    ratio: 2 / 5,
    size: "1200 × 3000 (alpha)",
    transparent: true,
    critical: true,
  },
  HERO_FOREGROUND: {
    id: "HERO_FOREGROUND",
    path: "/images/hero/hero-foreground-rocks",
    alt: "",
    ratio: 16 / 5,
    size: "3200 × 1000 (alpha)",
    transparent: true,
    critical: true,
  },
  JOURNEY_DEEP_SPACE: {
    id: "JOURNEY_DEEP_SPACE",
    path: "/images/journey/journey-deep-space",
    alt: "",
    ratio: 16 / 9,
    size: "3200 × 1800",
  },
  JOURNEY_EARTH: {
    id: "JOURNEY_EARTH",
    path: "/images/journey/journey-earth",
    alt: "Earth seen from deep space",
    ratio: 1,
    size: "2000 × 2000 (alpha)",
    transparent: true,
  },
  JOURNEY_MARS: {
    id: "JOURNEY_MARS",
    path: "/images/journey/journey-mars",
    alt: "Mars seen from space",
    ratio: 1,
    size: "2000 × 2000 (alpha)",
    transparent: true,
  },
  JOURNEY_STARSHIP_TRANSIT: {
    id: "JOURNEY_STARSHIP_TRANSIT",
    path: "/images/journey/journey-starship-transit",
    alt: "Starship coasting through interplanetary space",
    ratio: 3,
    size: "1800 × 600 (alpha)",
    transparent: true,
  },
  STARSHIP_PROFILE: {
    id: "STARSHIP_PROFILE",
    path: "/images/starship/starship-profile",
    alt: "Full-height view of Starship lit from the side against a black sky",
    ratio: 2 / 3,
    size: "1600 × 2400",
  },
  STARSHIP_ENGINES: {
    id: "STARSHIP_ENGINES",
    path: "/images/starship/starship-engines",
    alt: "Close-up of the Raptor engine cluster at the base of Starship",
    ratio: 1,
    size: "1600 × 1600",
  },
  LANDING_TOUCHDOWN: {
    id: "LANDING_TOUCHDOWN",
    path: "/images/landing/landing-touchdown",
    alt: "Starship standing on the surface of Mars moments after touchdown, dust still settling",
    ratio: 16 / 9,
    size: "3840 × 2160",
  },
  FIRSTSTEPS_ASTRONAUT: {
    id: "FIRSTSTEPS_ASTRONAUT",
    path: "/images/astronauts/firststeps-astronaut",
    alt: "An astronaut walking away from the camera across the Martian plain",
    ratio: 4 / 5,
    size: "2000 × 2500",
  },
  FIRSTSTEPS_FOOTPRINT: {
    id: "FIRSTSTEPS_FOOTPRINT",
    path: "/images/astronauts/firststeps-footprint",
    alt: "A boot print pressed into fine Martian regolith",
    ratio: 1,
    size: "1600 × 1600",
  },
  DATA_SURFACE_MAP: {
    id: "DATA_SURFACE_MAP",
    path: "/images/data/data-surface-map",
    alt: "Orbital top-down view of the landing region",
    ratio: 1,
    size: "1600 × 1600",
  },
  LIFE_HABITAT: {
    id: "LIFE_HABITAT",
    path: "/images/habitat/life-habitat",
    alt: "Pressurised habitat modules on the Martian surface at dusk",
    ratio: 16 / 10,
    size: "3200 × 2000",
  },
  LIFE_CREW_WORK: {
    id: "LIFE_CREW_WORK",
    path: "/images/habitat/life-crew-work",
    alt: "Two astronauts assembling equipment beside the ship",
    ratio: 4 / 5,
    size: "1600 × 2000",
  },
  LIFE_SCIENCE: {
    id: "LIFE_SCIENCE",
    path: "/images/habitat/life-science-station",
    alt: "A deep-drill science station and sensor mast",
    ratio: 1,
    size: "1600 × 1600",
  },
  LIFE_ROVER: {
    id: "LIFE_ROVER",
    path: "/images/habitat/life-rover",
    alt: "A pressurised rover crossing a ridge",
    ratio: 3 / 2,
    size: "2400 × 1600",
  },
  LIFE_PANORAMA: {
    id: "LIFE_PANORAMA",
    path: "/images/habitat/life-panorama",
    alt: "Panoramic view across a Martian valley",
    ratio: 21 / 9,
    size: "4200 × 1800",
  },
  FINAL_HORIZON: {
    id: "FINAL_HORIZON",
    path: "/images/final/final-horizon",
    alt: "The limb of Mars from orbit with a ship departing toward deep space",
    ratio: 16 / 9,
    size: "3840 × 2160",
  },
};

/** Resolved public URLs, keyed by asset id. `null` = file not added yet. */
export type ResolvedAssets = Record<AssetId, string | null>;
