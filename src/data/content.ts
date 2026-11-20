/**
 * All on-page copy lives here. The narrative is FICTIONAL: every mission event,
 * date, crew figure and telemetry value below belongs to a concept story and is
 * labelled as simulated in the UI. Starship hardware figures marked `public`
 * are approximate, publicly communicated numbers.
 */

export const NAV = [
  { id: "humanity", label: "Mission", index: "01" },
  { id: "journey", label: "Journey", index: "02" },
  { id: "starship", label: "Starship", index: "03" },
  { id: "landing", label: "Touchdown", index: "04" },
  { id: "first-steps", label: "Surface", index: "05" },
  { id: "data", label: "Data", index: "06" },
  { id: "life", label: "Habitat", index: "07" },
  { id: "frontier", label: "Frontier", index: "08" },
] as const;

/** Links shown inline in the desktop navbar (the rest live in the menu). */
export const NAV_PRIMARY = NAV.slice(0, 6);

export const HERO = {
  tags: ["Mission / 001", "Interplanetary exploration", "Humanity beyond Earth"],
  intro:
    "Two hundred and six days after leaving Earth, four people opened a hatch onto another world. This is the record of that crossing.",
  chip: "Sol 001 — Arcadia Planitia",
  titleLines: ["Mars.", "We made it."],
  subtitle: "The first human journey to the Red Planet.",
  card: {
    eyebrow: "Mission status",
    status: "Surface operations",
    rows: [
      ["Crew", "04"],
      ["Sol", "001"],
    ],
    cta: "Explore the mission",
  },
  footer: {
    left: "Concept / Est. 2026",
    center: "Scroll to begin",
    right: "MSN-001 · 40.1°N 189.6°E",
  },
};

export const HUMANITY = {
  label: "A new chapter",
  /** `dim: true` words start in the darker grey before scroll lights them. */
  /** `br: true` forces a line break after the group on tablet/desktop. */
  statement: [
    { text: "For the first time,", dim: false, br: true },
    { text: "humanity called", dim: true, br: true },
    { text: "another planet", dim: true, br: false },
    { text: "home.", dim: true, br: false },
  ],
  body:
    "Mission 001 carried four crew across 480 million kilometres of open space to build the first outpost beyond Earth. Not a flag. Not a footprint. A beginning.",
  aside: "Performance under pressure, from the launch pad to the surface. Built for a species that keeps going.",
  meta: [
    ["Transit", "206 days"],
    ["Crew", "04"],
    ["Worlds", "02"],
  ],
};

export const JOURNEY = {
  label: "The journey",
  title: ["From Earth", "to Mars."],
  intro:
    "A single continuous burn would never do it. The crossing is a choreography of orbits — waiting for the window, then letting gravity carry the ship most of the way.",
  phases: [
    {
      index: "01",
      name: "Launch",
      time: "T+00:00:00",
      text: "Thirty-three engines lift the full stack off the pad. Booster returns; the ship climbs on.",
    },
    {
      index: "02",
      name: "Earth departure",
      time: "T+04 days",
      text: "Refilled in orbit, the ship lights its vacuum engines and leaves Earth’s gravity well.",
    },
    {
      index: "03",
      name: "Interplanetary transit",
      time: "T+05 → 198 days",
      text: "Six and a half months of coasting. Course corrections measured in centimetres per second.",
    },
    {
      index: "04",
      name: "Mars orbit",
      time: "T+201 days",
      text: "Aerobraking through a thin atmosphere bleeds off kilometres per second of speed.",
    },
    {
      index: "05",
      name: "Surface landing",
      time: "T+206 days",
      text: "Belly-flop, flip, landing burn. Six minutes from entry to a ship standing on Mars.",
    },
  ],
  /** Simulated telemetry, interpolated by scroll progress. */
  telemetry: {
    distanceKm: 480_000_000,
    days: 206,
    velocityRange: [7.8, 30.4] as [number, number],
  },
};

export const STARSHIP = {
  label: "The vehicle",
  title: ["Engineered", "for the", "impossible."],
  intro:
    "Fully reusable, stainless steel, fuelled by liquid methane and oxygen — propellants that can one day be made on Mars itself.",
  specs: [
    { label: "Stack height", value: 121, suffix: "m", prefix: "≈", source: "public" },
    { label: "Diameter", value: 9, suffix: "m", prefix: "", source: "public" },
    { label: "Raptor engines", value: 39, suffix: "", prefix: "", note: "33 booster · 6 ship", source: "public" },
    { label: "Payload to orbit", value: 100, suffix: "t+", prefix: "", note: "reusable configuration", source: "public" },
    { label: "Crew aboard MSN-001", value: 4, suffix: "", prefix: "", source: "concept" },
  ],
  caption: "Fig. 03 — Raptor cluster, ship section. Concept rendering.",
  sourceNote: "Hardware figures approximate, based on publicly communicated specifications. Mission figures are fictional.",
};

export const LANDING = {
  label: "The first landing",
  title: ["Touchdown.", "A new world", "begins."],
  site: "Arcadia Planitia",
  coords: "40.1°N · 189.6°E",
  time: "Sol 001 · 14:06:22 LMST",
  captions: [
    ["Descent", "6 min 12 s"],
    ["Velocity at contact", "0.0 m/s"],
    ["Dust settle", "+ 41 s"],
  ],
  caption: "Fig. 05 — Ship S-01 at rest on the Martian surface, moments after engine cut-off. Dramatised concept rendering.",
};

export const FIRST_STEPS = {
  label: "First steps",
  title: ["One small", "step beyond", "our world."],
  quote: "Arcadia Base, surface. Boots on the ground. It’s quieter than I imagined.",
  quoteAttribution: "EVA-01 transcript · fictional dramatisation",
  body:
    "Two hours and forty-one minutes outside. A walk of three hundred metres. The first human footprints on a planet that has waited four and a half billion years for them.",
  data: [
    ["EVA-01 duration", "02:41:09"],
    ["Distance walked", "312 m"],
    ["Surface temp.", "−63 °C"],
  ],
};

export const MISSION_DATA = {
  label: "The mission in numbers",
  panelTitle: "Concept mission data",
  archive: "MSN-001 / Telemetry archive",
  metrics: [
    { label: "Mission duration", value: 912, suffix: "days", note: "Earth → Mars → Earth" },
    { label: "Distance travelled", value: 480, suffix: "M km", note: "Outbound trajectory" },
    { label: "Crew members", value: 4, suffix: "", note: "Commander, pilot, 2 specialists" },
    { label: "Surface operations", value: 500, suffix: "sols", note: "Planned stay" },
    { label: "Comms delay", value: 22, prefix: "3–", suffix: "min", note: "One-way, varies with distance" },
  ],
  status: "Nominal",
  systems: [
    { label: "Power", value: 78 },
    { label: "Oxygen", value: 92 },
    { label: "Water", value: 64 },
    { label: "Propellant (ISRU)", value: 31 },
  ],
  environment: [
    ["Temp", "−63 °C"],
    ["Wind", "7.6 m/s"],
    ["Pressure", "0.63 kPa"],
    ["Radiation", "Low"],
  ],
  map: { name: "Arcadia Planitia", coords: "40.1°N 189.6°E", scale: "10 km" },
};

export const LIFE = {
  label: "Life on another planet",
  title: ["Life on", "another planet."],
  intro:
    "The ship became the first shelter. Within a year, a base grew around it: pressurised modules, a propellant plant, greenhouses under thin plastic skies.",
  pull: ["We didn’t come to visit.", "We came to stay —", "and to learn how."],
  blocks: [
    {
      fig: "Fig. 08.1",
      title: "Habitat Module A",
      text: "Regolith-shielded living quarters for a crew of four, expandable to twelve.",
    },
    {
      fig: "Fig. 08.2",
      title: "Assembly crews",
      text: "Every structure on Mars is built by hand first, by machine second.",
    },
    {
      fig: "Fig. 08.3",
      title: "Science before settlement",
      text: "A deep drill reads the planet’s history — and looks for ice that can become water, air and fuel.",
    },
    {
      fig: "Fig. 08.4",
      title: "Range",
      text: "Pressurised rovers extend the reach of the base to two hundred kilometres.",
    },
  ],
};

export const FINAL = {
  label: "The next frontier",
  title: ["This was never", "the final destination."],
  body: "Mars is a door, not a wall. Every ship that lands here makes the next one cheaper, faster and braver.",
  next: "Next: MSN-002 · Departure window 2033 · Concept",
  cta: "Revisit the journey",
};
