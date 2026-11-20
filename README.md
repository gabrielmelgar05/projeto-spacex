# Mars Mission 001 — SpaceX concept experience

An **unofficial, fictional** cinematic landing page imagining the first crewed Starship mission to Mars.
Portfolio concept — not affiliated with or endorsed by SpaceX.

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · GSAP 3 (ScrollTrigger, SplitText, MotionPath).

```bash
npm install
npm run dev
```

- [docs/PROJECT_GUIDE.md](docs/PROJECT_GUIDE.md) — setup, adding images and the logo, editing content and animations, deploy
- [docs/IMAGE_ASSETS.md](docs/IMAGE_ASSETS.md) — every image slot, with specs and a ready-to-use generation prompt
- [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) — palette, type, grid, components, motion patterns

All **19 image assets** are included in `public/images/`, generated with ChatGPT's built-in image generator and optimized as WebP. The five transparent layers preserve their alpha channel with lossless compression. The original SpaceX wordmark is included in `public/branding/spacex-logo.svg`.

Exact generation prompts, delivered dimensions and file checksums are recorded in [docs/IMAGE_GENERATION.json](docs/IMAGE_GENERATION.json). Asset paths, art direction and logo provenance are documented in [docs/IMAGE_ASSETS.md](docs/IMAGE_ASSETS.md).
