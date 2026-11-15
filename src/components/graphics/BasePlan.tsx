/**
 * Firstlight Base — abstract schematic plan (fictional), drawn in code.
 * Modules are pointer-clickable; keyboard users select systems through the
 * accessible tab list beside the plan, so the SVG itself is aria-hidden.
 */

export type SystemId = "hab" | "pwr" | "lab" | "rov" | "isru" | "grn";

interface BasePlanProps {
  active: SystemId;
  onSelect: (id: SystemId) => void;
  showPower: boolean;
  showCorridors: boolean;
  padLabel: string;
  className?: string;
}

const NS = "non-scaling-stroke" as const;

function Module({
  id,
  active,
  onSelect,
  children,
  label,
  lx,
  ly,
}: {
  id: SystemId;
  active: SystemId;
  onSelect: (id: SystemId) => void;
  children: React.ReactNode;
  label: string;
  lx: number;
  ly: number;
}) {
  return (
    <g className="plan-module" data-active={active === id} onClick={() => onSelect(id)} data-plan-module>
      {children}
      <text x={lx} y={ly} className="plan-label">
        {label}
      </text>
    </g>
  );
}

export function BasePlan({ active, onSelect, showPower, showCorridors, padLabel, className }: BasePlanProps) {
  const solar = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 9; c++) {
      solar.push(<rect key={`${r}-${c}`} x={64 + c * 20} y={56 + r * 18} width={16} height={12} />);
    }
  }

  return (
    <svg viewBox="0 0 640 440" className={className} fill="none" aria-hidden="true">
      {/* terrain contours */}
      <g stroke="currentColor" strokeOpacity="0.08" vectorEffect={NS}>
        <path d="M-10 400 C120 360 220 420 360 380 S560 330 650 360" vectorEffect={NS} />
        <path d="M-10 425 C140 390 240 445 380 410 S580 365 650 390" vectorEffect={NS} />
        <path d="M-10 30 C90 10 210 50 330 20 S540 -5 650 25" vectorEffect={NS} />
        <path d="M560 60 C610 80 630 140 600 190 S520 230 500 170 S520 50 560 60Z" vectorEffect={NS} />
      </g>

      {/* pressurized links */}
      <g className="plan-layer" data-visible={showCorridors} stroke="var(--color-bone)" strokeOpacity="0.75" strokeWidth="1.5">
        <path data-plan-draw pathLength={1} d="M296 200H299" vectorEffect={NS} />
        <path data-plan-draw pathLength={1} d="M250 246V290H215" vectorEffect={NS} />
        <path data-plan-draw pathLength={1} d="M345 246V292" vectorEffect={NS} />
        <path data-plan-draw pathLength={1} d="M391 200H450" vectorEffect={NS} />
        <path data-plan-draw pathLength={1} d="M375 236L432 272" vectorEffect={NS} />
      </g>

      {/* power grid */}
      <g className="plan-layer" data-visible={showPower} stroke="var(--color-mars)" strokeWidth="1" strokeDasharray="3 4">
        <path d="M154 130V170H222" vectorEffect={NS} />
        <path d="M244 130V154" vectorEffect={NS} />
        <path d="M244 142H490V150" vectorEffect={NS} />
        <path d="M154 170V280" vectorEffect={NS} />
        <path d="M490 142V20" vectorEffect={NS} />
        <path d="M244 142C420 142 470 240 466 262" vectorEffect={NS} />
      </g>

      {/* PWR — solar field */}
      <Module id="pwr" active={active} onSelect={onSelect} label="PWR-A" lx={64} ly={46}>
        <rect x={56} y={48} width={196} height={86} className="plan-hit" />
        <g className="plan-shape">{solar}</g>
      </Module>

      {/* HAB-01 / HAB-02 */}
      <Module id="hab" active={active} onSelect={onSelect} label="HAB-01/02" lx={218} ly={142}>
        <circle cx={250} cy={200} r={46} className="plan-hit" />
        <circle cx={345} cy={200} r={46} className="plan-hit" />
        <g className="plan-shape">
          <circle data-plan-draw pathLength={1} cx={250} cy={200} r={46} vectorEffect={NS} />
          <circle cx={250} cy={200} r={30} strokeOpacity="0.4" vectorEffect={NS} />
          <circle data-plan-draw pathLength={1} cx={345} cy={200} r={46} vectorEffect={NS} />
          <circle cx={345} cy={200} r={30} strokeOpacity="0.4" vectorEffect={NS} />
        </g>
      </Module>

      {/* LAB */}
      <Module id="lab" active={active} onSelect={onSelect} label="LAB-01" lx={300} ly={372}>
        <rect x={296} y={292} width={110} height={60} className="plan-hit plan-shape" />
        <path d="M296 322H406M351 292V352" className="plan-shape" strokeOpacity="0.4" vectorEffect={NS} />
      </Module>

      {/* GRN — greenhouse / life support */}
      <Module id="grn" active={active} onSelect={onSelect} label="GRN-01" lx={120} ly={372}>
        <rect x={120} y={276} width={95} height={70} className="plan-hit plan-shape" />
        <path d="M130 290H205M130 304H205M130 318H205M130 332H205" className="plan-shape" strokeOpacity="0.35" vectorEffect={NS} />
      </Module>

      {/* ISRU */}
      <Module id="isru" active={active} onSelect={onSelect} label="ISRU-01" lx={450} ly={132}>
        <path d="M450 170L470 150H510L530 170L510 190H470Z" className="plan-hit plan-shape" vectorEffect={NS} />
        <circle cx={490} cy={170} r={9} className="plan-shape" strokeOpacity="0.5" vectorEffect={NS} />
      </Module>

      {/* ROV — rover bay with traverse paths */}
      <Module id="rov" active={active} onSelect={onSelect} label="ROV-BAY" lx={430} ly={322}>
        <rect x={430} y={262} width={74} height={42} className="plan-hit plan-shape" />
        <path d="M504 283C560 283 590 250 650 236" className="plan-shape" strokeDasharray="1 5" vectorEffect={NS} />
        <path d="M504 296C548 320 600 330 650 330" className="plan-shape" strokeDasharray="1 5" vectorEffect={NS} />
      </Module>

      {/* Landing zone (not a selectable system) */}
      <g stroke="currentColor" strokeOpacity="0.45">
        <circle cx={560} cy={395} r={34} strokeDasharray="2 5" vectorEffect={NS} />
        <path d="M560 375V415M540 395H580" vectorEffect={NS} />
        <text x={512} y={352} className="plan-label" stroke="none">
          {padLabel}
        </text>
      </g>

      {/* north arrow + scale */}
      <g stroke="currentColor" strokeOpacity="0.6">
        <path d="M602 26L610 50L602 44L594 50Z" fill="currentColor" fillOpacity="0.6" vectorEffect={NS} />
        <path d="M24 418H124M24 413V423M74 415V421M124 413V423" vectorEffect={NS} />
      </g>
      <text x={606} y={66} className="plan-label" textAnchor="middle">
        N
      </text>
      <text x={24} y={406} className="plan-label">
        0 — 100 m
      </text>
    </svg>
  );
}
