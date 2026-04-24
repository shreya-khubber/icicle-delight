"use client";

import { useState } from "react";
import { motion, MotionValue } from "framer-motion";

/**
 * Marble Roman bust on a teal pedestal.
 * Pure SVG — no images, no credits.
 * Click → opens Instagram in a new tab.
 */
export default function RomanBust({
  opacity,
  scale: sc,
  href = "https://instagram.com/",
}: {
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
  href?: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "absolute",
        left: "50%",
        top: "26%",
        width: "11%",
        minWidth: 130,
        translateX: "-50%",
        cursor: "pointer",
        opacity,
        scale: sc,
        transformOrigin: "center bottom",
        zIndex: 10,
        pointerEvents: "auto",
        textDecoration: "none",
      }}
    >
      <svg viewBox="0 0 200 320" width="100%" style={{ overflow: "visible", display: "block" }}>
        <defs>
          <radialGradient id="marbleSkin" cx="0.42" cy="0.32" r="0.85">
            <stop offset="0%"   stopColor="#f5f1e6" />
            <stop offset="55%"  stopColor="#e3dccb" />
            <stop offset="100%" stopColor="#a89e87" />
          </radialGradient>
          <linearGradient id="marbleHair" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d8d0bd" />
            <stop offset="100%" stopColor="#9a8f78" />
          </linearGradient>
          <linearGradient id="pedestal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1f3838" />
            <stop offset="100%" stopColor="#0e1e1e" />
          </linearGradient>
          <linearGradient id="pedestalTop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a4747" />
            <stop offset="100%" stopColor="#1a3030" />
          </linearGradient>
          <radialGradient id="bustShadow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%"   stopColor="rgba(0,0,0,0.55)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
          <radialGradient id="bustHalo" cx="0.5" cy="0.2" r="0.7">
            <stop offset="0%"   stopColor="rgba(255,225,150,0.35)" />
            <stop offset="60%"  stopColor="rgba(255,215,120,0.06)" />
            <stop offset="100%" stopColor="rgba(255,215,120,0)" />
          </radialGradient>
        </defs>

        <ellipse cx="100" cy="80" rx="90" ry="120" fill="url(#bustHalo)" />
        <ellipse cx="100" cy="312" rx="70" ry="6" fill="url(#bustShadow)" />

        {/* PEDESTAL */}
        <rect x="42" y="296" width="116" height="14" fill="#16292a" stroke="rgba(201,168,76,0.35)" strokeWidth="0.6" />
        <rect x="50" y="200" width="100" height="96" fill="url(#pedestal)" />
        <rect x="46" y="196" width="108" height="8" fill="url(#pedestalTop)" stroke="rgba(201,168,76,0.3)" strokeWidth="0.5" />
        <line x1="56" y1="206" x2="56" y2="294" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <line x1="144" y1="206" x2="144" y2="294" stroke="rgba(0,0,0,0.35)" strokeWidth="1" />
        {/* Plaque */}
        <rect x="62" y="248" width="76" height="22" fill="#0c1a1a" stroke="rgba(201,168,76,0.45)" strokeWidth="0.5" />
        <text x="100" y="258" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="4.5"
          fill="rgba(201,168,76,0.85)" letterSpacing="2">FOLLOW ON</text>
        <text
          x="100" y="266" textAnchor="middle"
          fontFamily="'JetBrains Mono', monospace" fontSize="5"
          fill={hovered ? "#7fdada" : "#3a9e9e"} letterSpacing="2"
          style={{ transition: "fill 0.3s" }}
        >
          INSTAGRAM ↗
        </text>

        {/* SHOULDERS / DRAPE */}
        <path
          d="M 48,196 Q 60,160 90,150 L 110,150 Q 140,160 152,196 Z"
          fill="url(#marbleSkin)"
          stroke="rgba(0,0,0,0.18)" strokeWidth="0.5"
        />
        <path d="M 64,194 Q 72,178 80,172" stroke="rgba(0,0,0,0.18)" strokeWidth="0.6" fill="none" />
        <path d="M 136,194 Q 128,178 120,172" stroke="rgba(0,0,0,0.18)" strokeWidth="0.6" fill="none" />
        <path d="M 100,196 L 100,154" stroke="rgba(0,0,0,0.12)" strokeWidth="0.5" />

        {/* NECK */}
        <path d="M 86,158 Q 86,140 100,138 Q 114,140 114,158 Z" fill="url(#marbleSkin)" />
        <path d="M 88,154 Q 100,160 112,154" stroke="rgba(0,0,0,0.12)" strokeWidth="0.5" fill="none" />

        {/* HEAD */}
        <ellipse cx="100" cy="98" rx="34" ry="44" fill="url(#marbleSkin)" />

        {/* HAIR */}
        <path
          d="M 66,90 Q 64,60 88,52 Q 100,46 112,52 Q 136,60 134,92 Q 130,80 124,76 Q 118,84 110,78 Q 104,84 96,78 Q 88,84 80,78 Q 72,82 66,90 Z"
          fill="url(#marbleHair)"
          stroke="rgba(0,0,0,0.18)" strokeWidth="0.4"
        />
        <circle cx="74" cy="74" r="3" fill="rgba(0,0,0,0.08)" />
        <circle cx="84" cy="68" r="3" fill="rgba(0,0,0,0.08)" />
        <circle cx="100" cy="62" r="3" fill="rgba(0,0,0,0.08)" />
        <circle cx="116" cy="68" r="3" fill="rgba(0,0,0,0.08)" />
        <circle cx="126" cy="74" r="3" fill="rgba(0,0,0,0.08)" />

        {/* BROW */}
        <path d="M 80,92 Q 88,88 96,92" stroke="rgba(0,0,0,0.22)" strokeWidth="0.7" fill="none" />
        <path d="M 104,92 Q 112,88 120,92" stroke="rgba(0,0,0,0.22)" strokeWidth="0.7" fill="none" />

        {/* EYES */}
        <ellipse cx="88" cy="98" rx="3.4" ry="1.8" fill="rgba(0,0,0,0.18)" />
        <ellipse cx="112" cy="98" rx="3.4" ry="1.8" fill="rgba(0,0,0,0.18)" />

        {/* NOSE */}
        <path d="M 100,98 L 96,118 Q 100,122 104,118 Z" fill="rgba(0,0,0,0.08)" stroke="rgba(0,0,0,0.18)" strokeWidth="0.4" />

        {/* MOUTH */}
        <path d="M 92,128 Q 100,132 108,128" stroke="rgba(0,0,0,0.32)" strokeWidth="0.7" fill="none" />
        <path d="M 92,128 Q 100,126 108,128" stroke="rgba(0,0,0,0.12)" strokeWidth="0.5" fill="none" />

        {/* CHIN */}
        <path d="M 90,138 Q 100,144 110,138" stroke="rgba(0,0,0,0.12)" strokeWidth="0.5" fill="none" />

        {/* CHEEK LIGHT */}
        <ellipse cx="86" cy="110" rx="5" ry="3" fill="rgba(255,255,255,0.18)" />
        <ellipse cx="114" cy="110" rx="5" ry="3" fill="rgba(255,255,255,0.10)" />

        {hovered && (
          <ellipse cx="100" cy="98" rx="40" ry="50"
            fill="none" stroke="rgba(127,218,218,0.45)" strokeWidth="1.2" />
        )}
      </svg>
    </motion.a>
  );
}
