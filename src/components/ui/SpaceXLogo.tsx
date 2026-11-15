/**
 * SpaceX wordmark — local, editable vector interpretation built for this concept.
 *
 * Letters S·P·A·C·E are monoline strokes (so they can be drawn on with
 * stroke-dashoffset). The X is a filled diagonal plus the characteristic
 * swoosh: a tapered arc that leaves the X like a launch trajectory.
 *
 * Geometry lives in a 336 × 54 box: cap height y 20 → 50, swoosh tip at y ≈ 2.
 */

export const LOGO_VIEWBOX = "0 0 336 54";

const STROKE = 5;

export const LOGO_LETTERS = [
  // S
  "M40 22.5H6.5Q2.5 22.5 2.5 26.5V31Q2.5 35 6.5 35H33.5Q37.5 35 37.5 39V43.5Q37.5 47.5 33.5 47.5H0",
  // P
  "M54.5 50V22.5H85.5Q89.5 22.5 89.5 26.5V32Q89.5 36 85.5 36H57",
  // A (open apex, no crossbar)
  "M104 50L124 24.5L144 50",
  // C
  "M196 22.5H162.5Q158.5 22.5 158.5 26.5V43.5Q158.5 47.5 162.5 47.5H196",
  // E
  "M248 22.5H210.5V47.5H248M210.5 35H243",
] as const;

/** Filled diagonal of the X (top-left → bottom-right). */
export const LOGO_X = "M259 20H266L301 50H294Z";

/** Filled swoosh (bottom-left → beyond top-right), tapered at the tip. */
export const LOGO_SWOOSH = "M258 50C276 37 300 20 334 2.5L335.5 4C302 22 280 40 266 50Z";

/** Centerlines used to reveal the X parts through a mask. */
export const LOGO_X_GUIDE = "M260 18L302 52";
export const LOGO_SWOOSH_GUIDE = "M256 53C277 38 301 20 337 1";

interface SpaceXLogoProps {
  className?: string;
  /** Accessible name. Pass null when the logo is decorative (e.g. inside a labelled link). */
  title?: string | null;
  /**
   * When set, the logo renders draw-on hooks for the preloader:
   * letters get `data-draw`, and the X parts are revealed by an animated mask.
   * The value is used as a unique id prefix for the mask.
   */
  animatedId?: string;
}

export function SpaceXLogo({ className, title = "SpaceX", animatedId }: SpaceXLogoProps) {
  const maskId = animatedId ? `${animatedId}-x-mask` : undefined;

  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      className={className}
      role={title ? "img" : undefined}
      aria-label={title ?? undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      fill="none"
    >
      {animatedId && (
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="240" y="-10" width="110" height="74">
            <path data-draw data-x-guide d={LOGO_X_GUIDE} pathLength={1} stroke="#fff" strokeWidth={14} />
            <path data-draw data-swoosh-guide d={LOGO_SWOOSH_GUIDE} pathLength={1} stroke="#fff" strokeWidth={16} />
          </mask>
        </defs>
      )}

      <g stroke="currentColor" strokeWidth={STROKE} strokeLinejoin="miter" strokeMiterlimit={10} strokeLinecap="butt">
        {LOGO_LETTERS.map((d) => (
          <path key={d} d={d} pathLength={animatedId ? 1 : undefined} data-draw={animatedId ? "" : undefined} data-letter="" />
        ))}
      </g>

      <g fill="currentColor" mask={maskId ? `url(#${maskId})` : undefined}>
        <path d={LOGO_X} data-x="" />
        <path d={LOGO_SWOOSH} data-swoosh="" />
      </g>

      {animatedId && (
        <>
          {/* invisible guide for the travelling spark */}
          <path data-spark-path d={LOGO_SWOOSH_GUIDE} stroke="none" />
          <circle data-spark r={2.6} cx={0} cy={0} fill="var(--color-mars)" opacity={0} />
        </>
      )}
    </svg>
  );
}
