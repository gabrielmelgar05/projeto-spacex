/**
 * Earth → Mars transfer diagram (schematic, not to scale).
 * Sun at centre, Earth orbit (inner), Mars orbit (outer) and a half-ellipse
 * Hohmann-style transfer arc that the Journey timeline draws and travels.
 */
interface TransferOrbitProps {
  className?: string;
  earthLabel: string;
  marsLabel: string;
}

// Geometry (viewBox 0 0 320 240): Sun at (150,120); r_earth 62; r_mars 98.
// Transfer ellipse: perihelion at Earth (88,120) → aphelion at Mars (248,120).
export const TRANSFER_PATH = "M88 120 A80 72 0 0 1 248 120";

export function TransferOrbit({ className, earthLabel, marsLabel }: TransferOrbitProps) {
  return (
    <svg viewBox="0 0 320 240" className={className} fill="none" aria-hidden="true">
      <circle cx="150" cy="120" r="62" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <circle cx="150" cy="120" r="98" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="2 4" vectorEffect="non-scaling-stroke" />
      <circle cx="150" cy="120" r="3" fill="currentColor" fillOpacity="0.8" />
      <path d={TRANSFER_PATH} stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <path
        data-transfer-draw
        d={TRANSFER_PATH}
        stroke="var(--color-mars)"
        strokeWidth="1.25"
        pathLength={1}
        strokeDasharray="1"
        strokeDashoffset="1"
        vectorEffect="non-scaling-stroke"
      />
      <path data-transfer-path d={TRANSFER_PATH} stroke="none" />
      {/* Earth at departure, Mars at arrival */}
      <circle cx="88" cy="120" r="4.5" fill="var(--color-bone)" />
      <circle cx="248" cy="120" r="5.5" fill="var(--color-copper)" />
      <text x="88" y="140" textAnchor="middle" className="fill-current font-mono text-[8px] uppercase tracking-[0.14em]" fillOpacity="0.6">
        {earthLabel}
      </text>
      <text x="248" y="142" textAnchor="middle" className="fill-current font-mono text-[8px] uppercase tracking-[0.14em]" fillOpacity="0.6">
        {marsLabel}
      </text>
      {/* the vessel */}
      <g data-transfer-ship transform="translate(88 120)">
        <circle r="6" fill="var(--color-mars)" fillOpacity="0.18" />
        <circle r="2.25" fill="var(--color-mars)" />
      </g>
    </svg>
  );
}
