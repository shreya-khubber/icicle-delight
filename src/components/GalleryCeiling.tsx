"use client";

import { useEffect, useState } from "react";

const RAIL_A_LIGHTS = [20, 32, 44, 56, 68, 80];
const RAIL_B_LIGHTS = [26, 38, 50, 62, 74];

const RAIL_A_TOP = 26;
const RAIL_B_TOP = 54;
const CEILING_H = 88;

// Intensity fades from center outward
function coneIntensity(pct: number) {
  const dist = Math.abs(pct - 50);
  return Math.max(0.18, 1 - (dist / 50) * 0.82);
}

// Max tilt each light can reach when fully scrolled to lounge section
// Only lights within 30% of center participate; direction is inward toward 50%
function maxTilt(pct: number) {
  const dist = Math.abs(pct - 50);
  if (dist >= 30) return 0;
  // farther from center = steeper max tilt (up to ~16°)
  return (pct - 50) * 0.9;
}

function Fixture({
  pct,
  railTop,
  scrollFactor,
}: {
  pct: number;
  railTop: number;
  scrollFactor: number;
}) {
  const intensity   = coneIntensity(pct);
  const tilt        = maxTilt(pct) * scrollFactor;
  // Center lights brighten as you approach the lounge; outer lights stay dim
  const boost       = 1 + scrollFactor * intensity * 0.7;
  const peakOpacity = Math.min(0.62, 0.32 * intensity * boost).toFixed(3);
  const midOpacity  = Math.min(0.24, 0.12 * intensity * boost).toFixed(3);
  const coneW       = Math.round(80 + intensity * 32);
  const coneH       = 300;

  return (
    <div
      className="track-light absolute"
      style={{ left: `${pct}%`, top: railTop - 4, transform: "translateX(-50%)" }}
    >
      {/* Socket — never rotates */}
      <div className="w-1.5 h-1.5 rounded-full bg-g-dark mx-auto" />

      {/* Arm + housing + cone pivot smoothly */}
      <div
        style={{
          transform: `rotate(${tilt}deg)`,
          transformOrigin: "center top",
          transition: "transform 1.2s cubic-bezier(0.76, 0, 0.24, 1)",
        }}
      >
        <div className="w-px h-2.5 bg-g-dark/60 mx-auto" />
        <div
          className="w-2.5 h-2.5 bg-g-dark mx-auto"
          style={{ clipPath: "polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)" }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            top: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            width: coneW,
            height: coneH,

            background: `radial-gradient(ellipse 45% 35% at 50% 0%, rgba(255,218,130,${peakOpacity}) 0%, rgba(255,208,90,${midOpacity}) 40%, transparent 100%)`,
          }}
        />
      </div>
    </div>
  );
}

export default function GalleryCeiling() {
  const [scrolled, setScrolled]           = useState(false);
  const [scrollFactor, setScrollFactor]   = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 30);

      // Tilt kicks in after 65% of the page is scrolled, completes at 92%
      const max      = document.body.scrollHeight - window.innerHeight;
      const progress = max > 0 ? scrollY / max : 0;
      const factor   = Math.max(0, Math.min(1, (progress - 0.65) / 0.27));
      setScrollFactor(factor);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 pointer-events-none"
      style={{ height: CEILING_H, zIndex: 30, overflow: "visible" }}
    >
      {/* Ceiling band — frosted glass so the video shows through */}
      <div
        className="absolute top-0 left-0 right-0 border-b"
        style={{
          height: CEILING_H,
          backgroundColor: "rgba(255,255,255,0.22)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderColor: scrolled ? "rgba(180,178,172,0.4)" : "rgba(220,218,212,0.25)",
          boxShadow: scrolled ? "0 1px 24px rgba(0,0,0,0.04)" : "none",
          transition: "border-color 0.4s, box-shadow 0.4s",
        }}
      />

      {/* Rail A */}
      <div className="absolute left-0 right-0 h-px bg-g-dark/60" style={{ top: RAIL_A_TOP }} />
      {RAIL_A_LIGHTS.map((pct, i) => (
        <Fixture key={i} pct={pct} railTop={RAIL_A_TOP} scrollFactor={scrollFactor} />
      ))}

      {/* Rail B */}
      <div className="absolute left-0 right-0 h-px bg-g-dark/60" style={{ top: RAIL_B_TOP }} />
      {RAIL_B_LIGHTS.map((pct, i) => (
        <Fixture key={`b${i}`} pct={pct} railTop={RAIL_B_TOP} scrollFactor={scrollFactor} />
      ))}
    </div>
  );
}
