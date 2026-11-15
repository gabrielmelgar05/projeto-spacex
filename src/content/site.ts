/**
 * Section anchors and chapter order. The navbar chapter indicator,
 * menu, footer and in-page links are all driven by this list.
 */
export const SECTIONS = [
  { id: "top", chapter: 0 },
  { id: "mission", chapter: 1 },
  { id: "journey", chapter: 2 },
  { id: "first-footstep", chapter: 3 },
  { id: "settlement", chapter: 4 },
  { id: "explore", chapter: 5 },
  { id: "legacy", chapter: 6 },
  { id: "finale", chapter: 7 },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

/** Primary navigation (labels come from the dictionary). */
export const NAV_LINKS = [
  { id: "mission", key: "mission" },
  { id: "journey", key: "journey" },
  { id: "settlement", key: "settlement" },
  { id: "legacy", key: "legacy" },
] as const satisfies ReadonlyArray<{ id: SectionId; key: string }>;

export const SITE = {
  name: "SpaceX — The First Footstep",
  tagline: "Humanity's New Beginning",
  studio: "Aklio Studio",
  description:
    "An independent, fictional concept experience by Aklio Studio imagining the first human mission to Mars. Not affiliated with SpaceX.",
} as const;
