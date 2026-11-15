/**
 * English copy — the default language of the experience.
 *
 * Every visible string lives here (and in pt.ts). Headlines are arrays:
 * one entry per typographic line, so the masked reveals stay deterministic.
 * Keep the same number of lines in both languages for consistent motion.
 *
 * Anything that is not historical record is explicitly fictional narrative.
 */
export const en = {
  common: {
    real: "Historical record",
    fiction: "Fictional narrative",
    artistic: "Artistic representation",
    skip: "Skip to content",
  },

  nav: {
    home: "SpaceX — The First Footstep, back to top",
    primary: "Primary",
    links: {
      mission: "Mission",
      journey: "Journey",
      settlement: "Settlement",
      legacy: "Legacy",
    },
    menu: "Menu",
    close: "Close",
    openMenu: "Open navigation menu",
    closeMenu: "Close navigation menu",
    language: "Language",
    progress: "Experience progress",
    chapters: [
      "The Arrival",
      "A New Era",
      "The Journey",
      "First Footstep",
      "A Home on Mars",
      "A New World",
      "The Legacy",
      "The Beginning",
    ],
    menuNote: "Mission // Horizon-01 — an independent concept.",
  },

  preloader: {
    label: "Initializing Mars experience",
    ready: "Experience ready",
    loading: "Loading",
  },

  hero: {
    mission: "Mission // Horizon-01",
    headline: ["We made it.", "To Mars."],
    sub: "One planet was never going to be enough.",
    body: "After 187 days in deep space, a crew of four set down on the northern plains of Mars. For the first time, the red planet has visitors who intend to stay.",
    cta: "Explore the mission",
    scroll: "Scroll",
    vertical: "The first footstep — humanity's new beginning",
    data: [
      { k: "Crew", v: "04" },
      { k: "Site", v: "Arcadia Planitia" },
      { k: "Mission time", v: "Sol 0001" },
      { k: "Status", v: "Nominal" },
    ],
  },

  era: {
    index: "02",
    kicker: "Beyond Earth // A new era",
    headline: ["The next", "chapter of", "humanity."],
    lead: "Every horizon humanity has crossed began as an impossible distance. Mars was the last one we were told to accept.",
    body: [
      "This is the story of the moment that changed the scale of our species — told as if it had already happened. The planet is real, and so is the science. The voyage is our imagination of what comes next.",
      "Reaching Mars means crossing hundreds of millions of kilometres, landing on a world with a fraction of Earth's gravity, and learning to live under a sky that turns blue at sunset.",
    ],
    statsLabel: "Planetary context — real data",
    stats: [
      {
        value: 225,
        decimals: 0,
        suffix: "M",
        unit: "km",
        label: "Average distance",
        note: "Mean Earth–Mars distance. It ranges from about 55 million km at the closest approaches to roughly 400 million km.",
      },
      {
        value: 38,
        decimals: 0,
        suffix: "%",
        unit: "of Earth's gravity",
        label: "Surface gravity",
        note: "3.71 m/s² at the surface. A person weighing 80 kg on Earth would feel like 30 kg on Mars.",
      },
      {
        value: 24,
        decimals: 0,
        suffix: "H 40M",
        unit: "per sol",
        label: "Solar day",
        note: "A Martian solar day — a sol — lasts 24 hours, 39 minutes and 35 seconds.",
      },
    ],
  },

  journey: {
    index: "03",
    kicker: "The journey // From Earth to Mars",
    headline: ["Six months.", "One trajectory."],
    intro: "A Hohmann-style transfer turns the distance between two moving worlds into a single, precise arc. Four chapters, scrolled at your own pace.",
    earth: "Earth",
    mars: "Mars",
    telemetry: "Mission telemetry — fictional",
    chapters: [
      {
        num: "01",
        title: "Departure",
        place: "Starbase, Earth",
        time: "T+ 00:00:00",
        body: "Thirty-three engines ignite as one. After orbital refilling, the vehicle and its crew of four commit to the burn that will carry them away from the only world humans have ever known.",
        telemetry: [
          { k: "Phase", v: "Trans-Mars injection" },
          { k: "Crew", v: "04" },
          { k: "Window", v: "Opens every 26 months" },
        ],
      },
      {
        num: "02",
        title: "Interplanetary transit",
        place: "Heliocentric orbit",
        time: "Day 001 → 186",
        body: "Earth shrinks to a blue point, then a star among stars. Six months of silence, systems checks and slow-turning light — messages home now take up to twenty minutes to arrive.",
        telemetry: [
          { k: "Light delay", v: "Up to 20 min" },
          { k: "Path length", v: "≈ 480M km" },
          { k: "Status", v: "Coast phase" },
        ],
      },
      {
        num: "03",
        title: "Martian approach",
        place: "Mars entry interface",
        time: "Day 187",
        body: "The planet stops being a point and becomes a world. The ship meets a thin carbon-dioxide atmosphere at kilometres per second, its heat shield glowing as it bleeds off speed.",
        telemetry: [
          { k: "Entry speed", v: "≈ 7.5 km/s" },
          { k: "Atmosphere", v: "≈ 1% of Earth's" },
          { k: "Shield", v: "Nominal" },
        ],
      },
      {
        num: "04",
        title: "Touchdown",
        place: "Arcadia Planitia",
        time: "Sol 0001",
        body: "Engines relight for the final descent, dust rises in a slow red wall, and then — stillness. Engine shutdown confirmed. Humanity has landed on another planet.",
        telemetry: [
          { k: "Site", v: "46.7°N · 197.3°E" },
          { k: "Descent", v: "Propulsive" },
          { k: "Status", v: "Landed" },
        ],
      },
    ],
  },

  footstep: {
    index: "04",
    kicker: "Sol 0001 // 14:07 local mean solar time",
    headline: ["The first", "footstep."],
    sub: "Not the end of a journey. The beginning of another world.",
    body: "A boot meets fine iron-oxide dust. In gravity a little over a third of Earth's, the print it leaves may outlast every one of us. Whose name history remembers matters less than what the moment says: we are no longer a one-planet species.",
    meta: [
      { k: "Surface temp.", v: "−58 °C" },
      { k: "Pressure", v: "0.6 kPa" },
      { k: "Signal to Earth", v: "11 min 42 s" },
    ],
  },

  settlement: {
    index: "05",
    kicker: "The first settlement // Firstlight Base",
    headline: ["We didn't just arrive.", "We built a home."],
    lead: "Arrival was a moment. Staying is a system — power, pressure, water, food and fuel, each one made or recovered on Mars.",
    body: "Firstlight Base grew outward from the landing zone in rings: habitats buried beneath regolith for radiation shielding, a power field on the plain, and plants that turn ice and air into propellant for the trip home.",
    planLabel: "Firstlight Base — schematic plan (fictional)",
    systemsLabel: "Base systems",
    layersLabel: "Plan layers",
    layers: { power: "Power grid", corridors: "Pressurized links" },
    systems: [
      {
        id: "hab",
        code: "HAB-01/02",
        name: "Pressurized habitats",
        summary: "Two linked habitat modules covered by two metres of compacted regolith, holding a shirt-sleeve environment for a crew of twelve.",
        specs: [
          { k: "Pressure", v: "70 kPa" },
          { k: "Shielding", v: "2 m regolith" },
          { k: "Capacity", v: "12 crew" },
        ],
      },
      {
        id: "pwr",
        code: "PWR-A",
        name: "Power systems",
        summary: "A dust-cleared solar field paired with long-duration storage, sized to carry the base through regional dust storms.",
        specs: [
          { k: "Peak output", v: "1.2 MW" },
          { k: "Storage", v: "8 MWh" },
          { k: "Storm reserve", v: "30 sols" },
        ],
      },
      {
        id: "lab",
        code: "LAB-01",
        name: "Research infrastructure",
        summary: "Core labs for ice, rock and atmosphere samples — the base's first purpose is to understand the world it stands on.",
        specs: [
          { k: "Drill depth", v: "40 m" },
          { k: "Samples", v: "1,280 logged" },
          { k: "Uplink", v: "Daily, relay orbiter" },
        ],
      },
      {
        id: "rov",
        code: "ROV-BAY",
        name: "Rover exploration",
        summary: "Pressurized rovers and autonomous scouts extend the base's reach far beyond walking distance across the plains.",
        specs: [
          { k: "Range", v: "120 km" },
          { k: "Units", v: "2 crewed · 4 robotic" },
          { k: "Sorties", v: "64 completed" },
        ],
      },
      {
        id: "isru",
        code: "ISRU-01",
        name: "Local resources",
        summary: "Subsurface ice and atmospheric CO₂ become water, oxygen and methane — breathable air, and propellant for the return.",
        specs: [
          { k: "Process", v: "Sabatier + electrolysis" },
          { k: "Output", v: "CH₄ / LOX" },
          { k: "Water", v: "From buried ice" },
        ],
      },
      {
        id: "grn",
        code: "GRN-01",
        name: "Sustainable presence",
        summary: "Closed-loop life support and the first pressurized greenhouse — the slow work of turning a base into a place to live.",
        specs: [
          { k: "Water recovery", v: "98%" },
          { k: "Grow area", v: "340 m²" },
          { k: "Crops", v: "11 species" },
        ],
      },
    ],
    pad: "Landing zone",
  },

  explore: {
    index: "06",
    kicker: "Exploring a new world",
    headline: ["An entire world", "to discover."],
    intro: "Mars has roughly the same land area as all of Earth's continents combined. Every frame below is an artistic representation; every number is planetary science.",
    places: [
      {
        id: "plains",
        code: "E.01",
        name: "Vast red plains",
        region: "Arcadia Planitia",
        coords: "≈ 47°N · 190°E",
        body: "Smooth northern lowlands, where radar has found water ice just beneath the surface — the reason a first base would choose to land here.",
        fact: { k: "Subsurface ice", v: "Within metres of the surface" },
      },
      {
        id: "olympus",
        code: "E.02",
        name: "Olympus Mons",
        region: "Tharsis",
        coords: "18.65°N · 226.2°E",
        body: "The tallest volcano known in the Solar System. Its base is so wide that, standing on its flanks, the summit would sit beyond the horizon.",
        fact: { k: "Height", v: "≈ 22 km · 2.5× Everest" },
      },
      {
        id: "craters",
        code: "E.03",
        name: "Cratered landscapes",
        region: "Hellas Planitia",
        coords: "42.4°S · 70.5°E",
        body: "The southern highlands are scarred by billions of years of impacts. Hellas, the deepest of them, could hold a small sea.",
        fact: { k: "Basin", v: "≈ 2,300 km wide · 7 km deep" },
      },
      {
        id: "rovers",
        code: "E.04",
        name: "Remote robotic exploration",
        region: "Valles Marineris",
        coords: "13.9°S · 300.8°E",
        body: "Where crews cannot yet go, robots go first — tracing a canyon system long enough to cross the continental United States.",
        fact: { k: "Canyon system", v: "≈ 4,000 km long" },
      },
    ],
    note: "Visual essay: artistic representations of Mars. Planetary data from public scientific sources.",
  },

  legacy: {
    index: "07",
    kicker: "The legacy // The road here",
    headline: ["Built to", "go further."],
    lead: "Before the fiction, the record. Every chapter of this story stands on milestones that actually happened.",
    recordLabel: "Historical record — verified milestones",
    milestones: [
      {
        year: "2002",
        date: "2002",
        title: "SpaceX is founded",
        body: "The company is founded to revolutionise space technology, with the long-term goal of enabling people to live on other planets.",
      },
      {
        year: "2008",
        date: "September 28, 2008",
        title: "Falcon 1 reaches orbit",
        body: "On its fourth flight, Falcon 1 becomes the first privately developed liquid-fuelled rocket to reach Earth orbit.",
      },
      {
        year: "2012",
        date: "May 2012",
        title: "Dragon reaches the space station",
        body: "Dragon becomes the first commercial spacecraft to deliver cargo to the International Space Station and return safely to Earth.",
      },
      {
        year: "2015",
        date: "December 21, 2015",
        title: "A booster comes home",
        body: "After delivering 11 satellites to orbit, a Falcon 9 first stage lands at Landing Zone 1, Cape Canaveral — the first landing of an orbital-class rocket.",
      },
      {
        year: "2020",
        date: "May 30, 2020",
        title: "Crew Dragon carries astronauts to orbit",
        body: "Demo-2 launches NASA astronauts Bob Behnken and Doug Hurley to the ISS, returning human spaceflight to the United States.",
      },
    ],
    sources: "Sources: spacex.com and nasa.gov public records.",
    divider: {
      kicker: "End of record",
      title: "Beyond this line, the story is imagined.",
      body: "What follows is the fictional timeline of Mission Horizon-01 — an alternate future written for this concept.",
    },
    fiction: [
      { mark: "Day 000", title: "Horizon-01 departs Earth", body: "Crew of four. Trans-Mars injection confirmed." },
      { mark: "Day 187", title: "Touchdown, Arcadia Planitia", body: "Propulsive landing on the northern plains." },
      { mark: "Sol 0001", title: "The first footstep", body: "Humanity becomes a two-planet species." },
      { mark: "Sol 0420", title: "Firstlight Base online", body: "Power, water and propellant made on Mars." },
    ],
  },

  finale: {
    index: "08",
    kicker: "The next civilization",
    headline: ["This is only", "the beginning."],
    sub: "From one world to another. And beyond.",
    body: "Every journey that mattered started with someone deciding the distance was worth it. The next one is already being planned.",
    cta: "Back to the beginning",
    mission: "Mission // Horizon-∞",
  },

  footer: {
    navLabel: "Footer",
    signal: "Transmission ends. Sol 0001 — and counting.",
    credit: "Concept designed & developed for Aklio Studio",
    disclaimer: "Independent concept by Aklio Studio. Fictional Mars mission. Not affiliated with SpaceX.",
    disclaimerLong: "Historical milestones are drawn from public records. The Horizon-01 mission, its crew, Firstlight Base and all mission telemetry are fictional. SpaceX, Falcon, Dragon and Starship are trademarks of Space Exploration Technologies Corp.",
    top: "Back to top",
  },

  media: {
    pending: "Awaiting asset",
  },
};

export type Dictionary = typeof en;
