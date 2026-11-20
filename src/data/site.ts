/** Project-level settings. Edit freely — nothing here is hard-coded elsewhere. */
export const SITE = {
  title: "SpaceX — Mars Mission",
  description:
    "An unofficial, fictional web experience imagining the first crewed Starship mission to Mars. Concept design project — not affiliated with SpaceX.",
  year: 2026,

  logo: {
    /**
     * Forces the logo to render pure white whatever its source colour
     * (CSS `brightness(0) invert(1)`). Set to false if your file is already
     * white or you want to keep its original colours.
     */
    forceWhite: true,
  },

  credits: {
    role: "Concept, design & development",
    name: "Your Name",
    url: "#",
  },

  disclaimer:
    "UNOFFICIAL CONCEPT PROJECT — NOT AFFILIATED WITH OR ENDORSED BY SPACEX. THE MARS MISSION DEPICTED IS FICTIONAL.",
} as const;
