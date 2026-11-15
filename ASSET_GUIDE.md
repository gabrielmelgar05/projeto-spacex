# Asset guide — media slots

Format: **AVIF or WebP**, sRGB, place in `public/media/`, then set `src` in `src/content/media.ts`.
Every image is an artistic representation (not real Mars photography) — keep captions honest.

| Slot (file) | Ratio | Suggested size | Scene & subject | Keep free for text | Light / colour | Animation |
|---|---|---|---|---|---|---|
| `hero-mars` | 16:9 (full-bleed, cropped on mobile) | 3200×1800 | Martian horizon at the landing site, low sun, tiny landed vessel right-of-centre (~64% x, 40% y — reticle sits there) | Lower-left 60% (headline), top-right (mission data) | Dusky, deep shadows, copper rim light; dark bottom | Intro scale 1.32→1.12, scroll parallax, pointer tilt |
| `earth-departure` | 4:5 | 1600×2000 | Launch at dawn, vehicle rising from pad, vertical | Not overlaid | Warm gold sky vs dark structure | Clip wipe, scale |
| `interplanetary-flight` | 21:9 | 3200×1370 | Ship small in deep space, lots of negative space | Not overlaid | Near-black, subtle starfield | Opens from centre line |
| `mars-orbit` | 1:1 (shown as a circle) | 1800×1800 | Mars filling the frame, centred | — | Terminator line, rich rust tones | Circular reveal |
| `martian-landing` | 16:9 full-bleed | 3200×1800 | Touchdown in a dust cloud, subject right | Left 45% + bottom (text + HUD) | Dusty orange, dark left side | Grows from window to full-bleed, then fades to black |
| `first-footstep` | 16:9 full-bleed | 3200×1800 | Bootprints in fine dust, low-angle | Centre (monumental headline) — keep calm, low-detail | Very low key; reveal comes "out of darkness" | Light reveal, scale 1.32→1.04 |
| `mars-settlement` | 3:2 | 2400×1600 | Pressurized habitats, regolith-shielded | Left ~25% (headline overlaps) | Dusk, interior warm lights | Left-to-right wipe, parallax |
| `mars-rover` | 4:5 | 1600×2000 | Rover in a canyon floor | — | Hard sunlight, deep canyon shadow | Top-down reveal, parallax |
| `olympus-mons` | 3:4 | 1800×2400 | Volcano flank rising above plains, vertical drama | — | Thin haze, warm highlights | Bottom-up reveal, parallax |
| `martian-landscape` | 21:9 | 3600×1540 | Vast red plains to the horizon | Bottom band (caption on desktop) | Wide, atmospheric, darker foreground | Widens from 72% to full width, parallax |
| `mars-craters` | 3:2 | 2400×1600 | Ancient cratered highlands, raking light | — | Long shadows | Right-to-left reveal |
| `spacex-history` | 4:5 | 1600×2000 | Launch / historical image (use only images you have rights to) | Bottom 30% (year overlay) | Dark bottom gradient friendly | Bottom-up reveal, sticky |
| `finale-planet` | 16:9 full-bleed | 3200×1800 | Mars seen from space, planet low/right | Lower-left (headline), top band | Black space, glowing limb | Window → full-bleed, scale |
