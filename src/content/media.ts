/**
 * ─────────────────────────────────────────────────────────────
 *  MEDIA REGISTRY — the single place to plug in final images.
 * ─────────────────────────────────────────────────────────────
 *
 *  1. Drop your file in /public/media  (e.g. /public/media/hero-mars.avif)
 *  2. Set `src` below to its public path (e.g. "/media/hero-mars.avif")
 *  3. Optionally tune `position` (object-position) for the crop.
 *
 *  While `src` is null, the slot renders an elegant CSS fallback and never
 *  requests a file. Components and animations do not need to change.
 *  See ASSET_GUIDE.md for composition, resolution and lighting notes.
 */

export type FallbackTone = "horizon" | "planet" | "surface" | "dusk" | "deep";

export interface MediaEntry {
  /** Public path of the final image, or null while it does not exist yet. */
  src: string | null;
  /** Intrinsic proportion of the asset (width / height), used to reserve space. */
  ratio: number;
  /** Human-readable ratio for labels and documentation. */
  ratioLabel: string;
  /** CSS object-position for the crop (e.g. "50% 70%"). */
  position: string;
  /** Load eagerly and preload (hero only). */
  priority?: boolean;
  /** Visual direction of the CSS fallback shown while src is null. */
  fallback: FallbackTone;
  /** Accessible description, per language. Use "" for purely decorative media. */
  alt: { en: string; pt: string };
}

export const MEDIA = {
  "hero-mars": {
    src: null,
    ratio: 16 / 9,
    ratioLabel: "16:9",
    position: "50% 60%",
    priority: true,
    fallback: "horizon",
    alt: {
      en: "Artistic representation of the Martian horizon at the first human landing site.",
      pt: "Representação artística do horizonte marciano no local do primeiro pouso humano.",
    },
  },
  "earth-departure": {
    src: null,
    ratio: 4 / 5,
    ratioLabel: "4:5",
    position: "50% 50%",
    fallback: "dusk",
    alt: {
      en: "Artistic representation of a launch at dawn, the vehicle rising from the pad.",
      pt: "Representação artística de um lançamento ao amanhecer, o veículo deixando a plataforma.",
    },
  },
  "interplanetary-flight": {
    src: null,
    ratio: 21 / 9,
    ratioLabel: "21:9",
    position: "50% 50%",
    fallback: "deep",
    alt: {
      en: "Artistic representation of a spacecraft crossing deep space between Earth and Mars.",
      pt: "Representação artística de uma nave atravessando o espaço profundo entre a Terra e Marte.",
    },
  },
  "mars-orbit": {
    src: null,
    ratio: 1,
    ratioLabel: "1:1",
    position: "50% 50%",
    fallback: "planet",
    alt: {
      en: "Artistic representation of Mars seen from orbit during the approach.",
      pt: "Representação artística de Marte visto da órbita durante a aproximação.",
    },
  },
  "martian-landing": {
    src: null,
    ratio: 16 / 9,
    ratioLabel: "16:9",
    position: "50% 65%",
    fallback: "surface",
    alt: {
      en: "Artistic representation of a spacecraft touching down on the Martian plains in a cloud of dust.",
      pt: "Representação artística de uma nave pousando nas planícies marcianas em meio à poeira.",
    },
  },
  "first-footstep": {
    src: null,
    ratio: 16 / 9,
    ratioLabel: "16:9",
    position: "50% 70%",
    fallback: "surface",
    alt: {
      en: "Artistic representation of the first bootprints pressed into Martian dust.",
      pt: "Representação artística das primeiras pegadas marcadas na poeira marciana.",
    },
  },
  "mars-settlement": {
    src: null,
    ratio: 3 / 2,
    ratioLabel: "3:2",
    position: "50% 55%",
    fallback: "dusk",
    alt: {
      en: "Artistic representation of the first pressurized habitats of a base on Mars.",
      pt: "Representação artística dos primeiros habitats pressurizados de uma base em Marte.",
    },
  },
  "mars-rover": {
    src: null,
    ratio: 4 / 5,
    ratioLabel: "4:5",
    position: "50% 60%",
    fallback: "surface",
    alt: {
      en: "Artistic representation of a robotic rover crossing a canyon floor on Mars.",
      pt: "Representação artística de um rover robótico atravessando o fundo de um cânion em Marte.",
    },
  },
  "olympus-mons": {
    src: null,
    ratio: 3 / 4,
    ratioLabel: "3:4",
    position: "50% 40%",
    fallback: "dusk",
    alt: {
      en: "Artistic representation of the flanks of Olympus Mons rising above the Martian plains.",
      pt: "Representação artística das encostas do Olympus Mons acima das planícies marcianas.",
    },
  },
  "martian-landscape": {
    src: null,
    ratio: 21 / 9,
    ratioLabel: "21:9",
    position: "50% 55%",
    fallback: "horizon",
    alt: {
      en: "Artistic representation of vast red plains stretching to the Martian horizon.",
      pt: "Representação artística de vastas planícies vermelhas até o horizonte marciano.",
    },
  },
  "mars-craters": {
    src: null,
    ratio: 3 / 2,
    ratioLabel: "3:2",
    position: "50% 50%",
    fallback: "surface",
    alt: {
      en: "Artistic representation of an ancient cratered landscape in the Martian southern highlands.",
      pt: "Representação artística de uma antiga paisagem de crateras nas terras altas do sul de Marte.",
    },
  },
  "spacex-history": {
    src: null,
    ratio: 4 / 5,
    ratioLabel: "4:5",
    position: "50% 50%",
    fallback: "dusk",
    alt: {
      en: "Launch photograph representing the history of SpaceX.",
      pt: "Fotografia de lançamento representando a história da SpaceX.",
    },
  },
  "finale-planet": {
    src: null,
    ratio: 16 / 9,
    ratioLabel: "16:9",
    position: "50% 50%",
    fallback: "planet",
    alt: {
      en: "Artistic representation of Mars seen from space.",
      pt: "Representação artística de Marte visto do espaço.",
    },
  },
} satisfies Record<string, MediaEntry>;

export type MediaId = keyof typeof MEDIA;

export function getMedia(id: MediaId): MediaEntry {
  return MEDIA[id];
}
