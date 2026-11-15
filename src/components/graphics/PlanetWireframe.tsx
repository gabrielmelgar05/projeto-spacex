/** Rounded so server and client render identical attribute strings. */
const r3 = (n: number) => Math.round(n * 1000) / 1000;
const rad = (deg: number) => (deg * Math.PI) / 180;

/** Abstract planetary wireframe — a graphic system element, not imagery. */
export function PlanetWireframe({ className }: { className?: string }) {
  const lats = [-60, -40, -20, 0, 20, 40, 60];
  const lons = [15, 35, 55, 75];
  return (
    <svg viewBox="0 0 400 400" className={className} fill="none" stroke="currentColor" aria-hidden="true">
      <circle cx="200" cy="200" r="198" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      {lats.map((lat) => {
        const y = r3(200 - Math.sin(rad(lat)) * 198);
        const rx = r3(Math.cos(rad(lat)) * 198);
        return <ellipse key={lat} cx="200" cy={y} rx={rx} ry={r3(rx * 0.12)} strokeWidth="1" vectorEffect="non-scaling-stroke" />;
      })}
      {lons.map((lon) => (
        <ellipse key={lon} cx="200" cy="200" rx={r3(Math.cos(rad(lon)) * 198)} ry="198" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      ))}
      <line x1="200" y1="2" x2="200" y2="398" strokeWidth="1" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
