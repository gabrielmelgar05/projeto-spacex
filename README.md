# SpaceX — The First Footstep · Concept by Aklio Studio

> **Independent concept by Aklio Studio. Fictional Mars mission. Not affiliated with SpaceX.**
> The historical milestones (2002–2020) come from public SpaceX/NASA records. The Horizon-01 mission, its crew, Firstlight Base, the dates and all telemetry are fiction.

Cinematic landing page (EN / PT) built with Next.js 16 (App Router), React 19, strict TypeScript, Tailwind CSS 4, GSAP 3 + ScrollTrigger (+ MotionPath, @gsap/react).

## Scripts
```bash
npm install        # install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
```

## Folder structure
```
src/
  app/            layout (metadata/SEO), page, fonts, icon.svg, opengraph-image
  components/
    layout/       Experience (composition), Navbar (+ mobile menu, progress), Footer
    motion/       Preloader (GSAP timeline, real readiness progress)
    media/        MediaSlot (reserved frames + CSS fallbacks / next/image)
    sections/     Hero, NewEra, Journey, FirstFootstep, Settlement, Explore, Legacy, Finale
    graphics/     PlanetWireframe, TransferOrbit, BasePlan (vector systems)
    ui/           SpaceXLogo (SVG), MaskLines, Cta, Tag, LanguageSwitch
  content/        i18n/en.ts, i18n/pt.ts (all copy), media.ts (image registry), site.ts (anchors)
  hooks/          useLanguage, useExperience (preloader phases)
  lib/            gsap.ts, motion.ts (motion config), scroll.ts, cn.ts
  styles/         globals.css (tokens, typography, components), fonts/ (OFL)
public/media/     put your images here
```

## Editing copy
All text lives in `src/content/i18n/en.ts` and `pt.ts` (same structure; TypeScript flags missing keys). Headlines are arrays — one entry per line; keep the same line count in both languages.
The language switch (EN / PT) persists in `localStorage`; English is the default.

## Adding your images
1. Copy the file to `public/media/` (e.g. `hero-mars.avif`).
2. In `src/content/media.ts`, set `src: "/media/hero-mars.avif"`.
3. Adjust `position` (CSS object-position, e.g. `"50% 70%"`) to tune the crop.

While `src` is `null`, the slot shows a CSS fallback with its id and never requests a file. Components and animations don't change. See **ASSET_GUIDE.md** for each slot's specs.

## Animations
- `src/lib/motion.ts` → `MOTION_ENABLED = false` turns the whole site into its static version.
- Visitors with `prefers-reduced-motion: reduce` always get the static version (no pin, no scrub).
- Desktop (≥1024px) gets pinned/scrubbed scenes; tablet/mobile get lighter reveals (`MQ.full` / `MQ.lite`).
- Each section owns its choreography inside `useGSAP` + `gsap.matchMedia()`; everything is reverted on unmount (Strict Mode safe).
- Preloader timings: `MIN_DURATION` and `SAFETY_TIMEOUT` at the top of `Preloader.tsx`.
- Journey pin length: `end: window.innerHeight * 4.2` in `Journey.tsx`.

## Notes
- Fonts (Archivo, JetBrains Mono) are self-hosted under SIL OFL — no remote assets at runtime.
- Set `NEXT_PUBLIC_SITE_URL` when deploying so Open Graph URLs are absolute.
- SpaceX, Falcon, Dragon and Starship are trademarks of Space Exploration Technologies Corp. This is portfolio concept work.

## QA checklist (performed before delivery)
- `npm run lint`, `npm run typecheck`, `npm run build` — clean.
- Production build checked in Chrome at 1920, 1440, 1024, 768, 390 and 375 px, EN and PT, with and without `prefers-reduced-motion`.
- No console errors, no hydration warnings, no involuntary horizontal scroll.
- Mobile menu: focus moves into the menu, Esc closes and returns focus, background is `inert`, anchors land exactly on their sections.
- Preloader releases the page even if a resource never settles (7 s safety timeout) and instantly in background tabs.
