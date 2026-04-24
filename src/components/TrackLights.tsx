"use client";

const LIGHTS_A = [8, 20, 32, 44, 56, 68, 80, 92]; // % positions, rail 1
const LIGHTS_B = [14, 26, 38, 50, 62, 74, 86];     // rail 2 (offset)

function Fixture({ pct, rail }: { pct: number; rail: number }) {
  return (
    <div
      className="track-light absolute flex flex-col items-center"
      style={{ left: `${pct}%`, top: rail, transform: "translateX(-50%)" }}
    >
      {/* Socket nub */}
      <div className="w-1.5 h-1.5 rounded-full bg-g-dark" />
      {/* Thin arm */}
      <div className="w-px h-2.5 bg-g-dark/70" />
      {/* Compact housing — trapezoid */}
      <div
        className="w-2.5 h-2.5 bg-g-dark"
        style={{ clipPath: "polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)" }}
      />
    </div>
  );
}

export default function TrackLights() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Rail 1 */}
      <div className="absolute left-0 right-0 h-px bg-g-dark/65" style={{ top: 28 }} />
      {LIGHTS_A.map((pct, i) => <Fixture key={i} pct={pct} rail={22} />)}

      {/* Rail 2 */}
      <div className="absolute left-0 right-0 h-px bg-g-dark/65" style={{ top: 56 }} />
      {LIGHTS_B.map((pct, i) => <Fixture key={i} pct={pct} rail={50} />)}
    </div>
  );
}
