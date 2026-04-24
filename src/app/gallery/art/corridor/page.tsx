"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
  AnimatePresence,
  MotionValue,
} from "framer-motion";
import HamburgerMenu from "@/components/HamburgerMenu";
import { galleryPieces } from "@/data/galleryData";
import RomanBust from "@/components/corridor/RomanBust";
import MiniPainting from "@/components/corridor/MiniPainting";
import DustMotes from "@/components/corridor/DustMotes";

// ── Data ─────────────────────────────────────────────────────────────────────

const piece = galleryPieces.find((p) => p.id === "art")!;

const PANELS = [
  { label: "I",   heading: piece.panel.sections[0].heading, body: piece.panel.sections[0].body },
  { label: "II",  heading: piece.panel.sections[1].heading, body: piece.panel.sections[1].body },
  { label: "III", heading: piece.panel.sections[2].heading, body: piece.panel.sections[2].body },
  { label: "IV",  heading: "The Artist's Eye",              body: piece.panel.intro             },
];

const STATION_LABELS = ["Practice", "Influences", "Art & Life", "The Eye", "Contact"];

// ── SVG geometry (viewBox 0 0 1440 860) ──────────────────────────────────────

const W = 1440, H = 860;
const VPX = 720;
const BW_X1 = 591, BW_X2 = 849, BW_Y1 = 258, BW_Y2 = 464;

const CEIL_COLS = Array.from({ length: 8 }, (_, j) => ({
  x0: (j / 7) * W, y0: 0,
  x1: BW_X1 + (j / 7) * (BW_X2 - BW_X1), y1: BW_Y1,
}));
const CEIL_ROWS = [86, 172].map((y) => ({
  x1: (y / BW_Y1) * BW_X1,
  x2: W - (y / BW_Y1) * (W - BW_X2),
  y,
}));

const FLOOR_RADIAL = Array.from({ length: 13 }, (_, i) => ({
  x0: VPX, y0: BW_Y2, x1: (i / 12) * W, y1: H,
}));
const FLOOR_H_STATIC = [0.05, 0.14, 0.25, 0.38, 0.52, 0.66, 0.79, 0.93].map((t) => ({
  y:  BW_Y2 + t * (H - BW_Y2),
  x1: BW_X1 * (1 - t),
  x2: BW_X2 + t * (W - BW_X2),
}));
const FLOOR_ANIM = [-40, 0, 50, 115, 195, 290].map((dy) => {
  const y = BW_Y2 + dy;
  const t = Math.max(0, dy) / (H - BW_Y2);
  return { y, x1: BW_X1 * (1 - t), x2: BW_X2 + t * (W - BW_X2) };
});

// Horizontal ceiling track — 5 fixtures
const TRACK_Y = 24;
const TRACK_FIXTURES = [0.35, 0.42, 0.50, 0.58, 0.65].map((pct) => {
  const x = pct * W;
  const dist = Math.abs(pct - 0.5);
  return { x, coneHalfW: 68 + (0.5 - dist) * 55, coneBot: Math.min(H, 480 + (0.5 - dist) * 90) };
});

// ── 3-D corridor SVG ──────────────────────────────────────────────────────────

function CorridorScene({
  floorY,
  edgeOp,
}: {
  floorY: MotionValue<number>;
  edgeOp: MotionValue<number>;
}) {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      style={{ display: "block", pointerEvents: "none" }}
    >
      <defs>
        <linearGradient id="wallShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(0,0,0,0.18)" />
          <stop offset="20%"  stopColor="rgba(0,0,0,0)"    />
          <stop offset="88%"  stopColor="rgba(0,0,0,0)"    />
          <stop offset="100%" stopColor="rgba(0,0,0,0.12)" />
        </linearGradient>
        <linearGradient id="floorRefl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.07)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)"    />
        </linearGradient>
        <clipPath id="ceilClip">
          <polygon points={`0,0 ${W},0 ${BW_X2},${BW_Y1} ${BW_X1},${BW_Y1}`} />
        </clipPath>
        <clipPath id="floorClip">
          <polygon points={`0,${H} ${BW_X1},${BW_Y2} ${BW_X2},${BW_Y2} ${W},${H}`} />
        </clipPath>
        {TRACK_FIXTURES.map((f, i) => (
          <radialGradient
            key={i} id={`tc${i}`}
            cx={f.x} cy={TRACK_Y + 22} r={f.coneBot}
            fx={f.x} fy={TRACK_Y + 22}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%"   stopColor="rgba(255,225,140,0.26)" />
            <stop offset="55%"  stopColor="rgba(255,215,110,0.05)" />
            <stop offset="100%" stopColor="rgba(255,215,110,0)"    />
          </radialGradient>
        ))}
      </defs>

      {/* ── CEILING ── */}
      <polygon points={`0,0 ${W},0 ${BW_X2},${BW_Y1} ${BW_X1},${BW_Y1}`} fill="#1a2e2e" />
      <g clipPath="url(#ceilClip)">
        {CEIL_COLS.map((c, i) => (
          <line key={i} x1={c.x0} y1={c.y0} x2={c.x1} y2={c.y1}
            stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
        ))}
        {CEIL_ROWS.map((r, i) => (
          <line key={i} x1={r.x1} y1={r.y} x2={r.x2} y2={r.y}
            stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
        ))}
        {/* Horizontal track rail */}
        <line x1={0} y1={TRACK_Y} x2={W} y2={TRACK_Y} stroke="#233838" strokeWidth="3" />
        {/* Fixture stems + housings */}
        {TRACK_FIXTURES.map((f, i) => (
          <g key={i}>
            <line x1={f.x} y1={TRACK_Y} x2={f.x} y2={TRACK_Y + 14}
              stroke="#1d3030" strokeWidth="1.5" />
            <polygon
              points={`${f.x - 8},${TRACK_Y + 14} ${f.x + 8},${TRACK_Y + 14} ${f.x + 13},${TRACK_Y + 28} ${f.x - 13},${TRACK_Y + 28}`}
              fill="#131d1d" stroke="rgba(201,168,76,0.35)" strokeWidth="0.6"
            />
            <circle cx={f.x} cy={TRACK_Y + 22} r={2.5} fill="rgba(255,225,140,0.85)" />
          </g>
        ))}
      </g>
      {/* Track light cones — outside ceiling clip */}
      {TRACK_FIXTURES.map((f, i) => (
        <polygon
          key={i}
          points={`${f.x - 13},${TRACK_Y + 28} ${f.x + 13},${TRACK_Y + 28} ${f.x + f.coneHalfW},${f.coneBot} ${f.x - f.coneHalfW},${f.coneBot}`}
          fill={`url(#tc${i})`}
        />
      ))}

      {/* ── PICTURE RAIL LINES ── */}
      <line
        x1={0} y1={H * 0.22} x2={BW_X1} y2={BW_Y1 + (BW_Y2 - BW_Y1) * 0.22}
        stroke="rgba(201,168,76,0.28)" strokeWidth="1.2"
      />
      <line
        x1={W} y1={H * 0.22} x2={BW_X2} y2={BW_Y1 + (BW_Y2 - BW_Y1) * 0.22}
        stroke="rgba(201,168,76,0.28)" strokeWidth="1.2"
      />

      {/* ── LEFT WALL ── */}
      <polygon points={`0,0 ${BW_X1},${BW_Y1} ${BW_X1},${BW_Y2} 0,${H}`} fill="#2d4f4f" />
      <motion.polygon
        points={`0,0 ${W * 0.055},0 ${W * 0.055},${H} 0,${H}`}
        fill="#131e1e"
        style={{ opacity: edgeOp }}
      />
      <polygon points={`0,0 ${BW_X1},${BW_Y1} ${BW_X1},${BW_Y2} 0,${H}`} fill="url(#wallShade)" />

      {/* ── RIGHT WALL ── */}
      <polygon points={`${W},0 ${BW_X2},${BW_Y1} ${BW_X2},${BW_Y2} ${W},${H}`} fill="#2d4f4f" />
      <motion.polygon
        points={`${W},0 ${W * 0.945},0 ${W * 0.945},${H} ${W},${H}`}
        fill="#131e1e"
        style={{ opacity: edgeOp }}
      />
      <polygon points={`${W},0 ${BW_X2},${BW_Y1} ${BW_X2},${BW_Y2} ${W},${H}`} fill="url(#wallShade)" />

      {/* ── FLOOR ── */}
      <polygon points={`0,${H} ${BW_X1},${BW_Y2} ${BW_X2},${BW_Y2} ${W},${H}`} fill="#c8a96e" />
      <g clipPath="url(#floorClip)">
        {FLOOR_RADIAL.map((l, i) => (
          <line key={i} x1={l.x0} y1={l.y0} x2={l.x1} y2={l.y1}
            stroke="#b8966a" strokeWidth="0.6" opacity="0.7" />
        ))}
        {FLOOR_H_STATIC.map((l, i) => (
          <line key={i} x1={l.x1} y1={l.y} x2={l.x2} y2={l.y}
            stroke="#b8966a" strokeWidth="0.6" opacity="0.7" />
        ))}
        <polygon points={`0,${H} ${BW_X1},${BW_Y2} ${BW_X2},${BW_Y2} ${W},${H}`} fill="url(#floorRefl)" />
        <motion.g style={{ y: floorY }}>
          {FLOOR_ANIM.map((l, i) => (
            <line key={i} x1={l.x1} y1={l.y} x2={l.x2} y2={l.y}
              stroke="#b8966a" strokeWidth="0.9" opacity="0.55" />
          ))}
        </motion.g>
      </g>

      {/* ── CORNICE + BASEBOARD ── */}
      <line x1={0} y1={0}   x2={BW_X1} y2={BW_Y1} stroke="#c9a84c" strokeWidth="1.5" opacity="0.4" />
      <line x1={W} y1={0}   x2={BW_X2} y2={BW_Y1} stroke="#c9a84c" strokeWidth="1.5" opacity="0.4" />
      <line x1={0} y1={H}   x2={BW_X1} y2={BW_Y2} stroke="#b8966a" strokeWidth="2" />
      <line x1={W} y1={H}   x2={BW_X2} y2={BW_Y2} stroke="#b8966a" strokeWidth="2" />
    </svg>
  );
}

// ── Artwork frame ─────────────────────────────────────────────────────────────

function ArtworkFrame({
  panelIndex,
  spot,
  onClick,
}: {
  panelIndex: number;
  spot: MotionValue<number>;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const p = PANELS[panelIndex];

  return (
    <div style={{ position: "relative" }}>
      {/* Hanging wire from picture rail */}
      <svg
        style={{
          position: "absolute", bottom: "100%", left: "50%",
          transform: "translateX(-50%)", width: 2, height: 40,
          pointerEvents: "none",
        }}
        viewBox="0 0 2 40"
      >
        <line x1="1" y1="0" x2="1" y2="40" stroke="rgba(201,168,76,0.45)" strokeWidth="0.8" />
      </svg>

      {/* Pulsing teal dot — picture rail nail */}
      <motion.div
        animate={{ opacity: [0.35, 1, 0.35], scale: [1, 1.25, 1] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
        style={{
          position: "absolute", top: -16, left: "50%",
          transform: "translateX(-50%)",
          width: 6, height: 6, borderRadius: "50%",
          background: "#3a9e9e",
          boxShadow: "0 0 10px #3a9e9e",
          pointerEvents: "none",
        }}
      />

      {/* Clickable frame */}
      <div
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ position: "relative", cursor: "pointer" }}
      >
        {/* Spotlight cone — brightens on hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : undefined }}
          style={{
            opacity: hovered ? undefined : spot,
            position: "absolute", bottom: "100%", left: "50%",
            transform: "translateX(-50%)",
            width: 240, height: 200,
            background:
              "radial-gradient(ellipse at 50% 100%, rgba(255,222,140,0.22) 0%, rgba(255,210,110,0.08) 45%, transparent 75%)",
            pointerEvents: "none",
            transition: "opacity 0.4s ease",
          }}
        />

        {/* Depth strip (back of frame) */}
        <div style={{
          position: "absolute", right: -6, bottom: -6, top: 5, left: 5,
          background: "linear-gradient(135deg, #6b5018 0%, #3d2e0e 100%)",
          zIndex: 0,
        }} />

        {/* Gold frame */}
        <motion.div
          className="frame-breath"
          animate={{
            filter: hovered ? "brightness(1.25)" : "brightness(1)",
            scale:  hovered ? 1.03 : 1,
            y:      hovered ? -2 : 0,
          }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "relative", zIndex: 1,
            border: "10px solid",
            borderImage:
              "linear-gradient(135deg, #e6c870 0%, #c9a84c 35%, #8a6d24 65%, #d4b358 100%) 1",
            background: "#c9a84c",
            boxShadow: hovered
              ? "-8px 10px 50px rgba(0,0,0,0.7), 0 0 32px rgba(201,168,76,0.45)"
              : "-6px 8px 40px rgba(0,0,0,0.55)",
          }}
        >
          {/* Inner mat (cream) */}
          <div style={{ background: "#e8e0c8", padding: 6, position: "relative" }}>
            {/* The painting */}
            <div style={{
              position: "relative",
              width: "100%",
              aspectRatio: "10 / 7",
              overflow: "hidden",
              boxShadow: "inset 0 0 18px rgba(0,0,0,0.35)",
            }}>
              <MiniPainting variant={panelIndex} />
              {/* Glass sheen */}
              <div style={{
                position: "absolute", inset: 0,
                background:
                  "linear-gradient(115deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0) 60%)",
                pointerEvents: "none",
              }} />
              {/* Hover overlay */}
              <motion.div
                animate={{ opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  position: "absolute", inset: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(8,18,18,0.55)",
                  flexDirection: "column", gap: 6,
                }}
              >
                <div style={{ width: 24, height: 1, background: "#c9a84c" }} />
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 8,
                  letterSpacing: "0.3em", color: "#e6c870", textTransform: "uppercase",
                }}>
                  View piece →
                </p>
                <div style={{ width: 24, height: 1, background: "#c9a84c" }} />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Brass plaque under frame */}
        <div style={{
          margin: "10px auto 0",
          width: "78%",
          padding: "6px 10px",
          background: "linear-gradient(180deg, #2a4747 0%, #16292a 100%)",
          border: "1px solid rgba(201,168,76,0.5)",
          textAlign: "center",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
        }}>
          <p className="font-serif" style={{
            fontStyle: "italic",
            color: "#e8e0c8",
            fontSize: "0.78rem",
            lineHeight: 1.2,
            margin: 0,
          }}>
            {p.heading}
          </p>
          <p style={{
            marginTop: 3,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 7, letterSpacing: "0.28em",
            color: "rgba(201,168,76,0.8)", textTransform: "uppercase",
          }}>
            No. III · {p.label}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── (Eye sculpture removed — replaced by <RomanBust /> from /components/corridor) ──

// ── Reduced-motion fallback ───────────────────────────────────────────────────

function ReducedLayout() {
  return (
    <div className="min-h-screen bg-g-off">
      <HamburgerMenu />
      <div className="max-w-2xl mx-auto px-10 pb-20" style={{ paddingTop: 80 }}>
        <p className="font-mono text-g-mid text-[9px] tracking-[0.3em] uppercase mb-4">
          No. III — The Eye
        </p>
        <h1 className="font-serif text-4xl text-g-black font-light mb-2">{piece.title}</h1>
        <p className="font-serif text-g-dim italic mb-10">{piece.subtitle}</p>
        <blockquote className="font-serif text-g-dark text-base italic leading-relaxed mb-10 border-l-2 border-g-dark/20 pl-5">
          {piece.panel.intro}
        </blockquote>
        {piece.panel.sections.map((s, i) => (
          <div key={i} className="mb-8">
            <h3 className="font-mono text-g-mid text-[9px] tracking-[0.25em] uppercase mb-2">{s.heading}</h3>
            <p className="font-sans text-g-dark text-sm leading-relaxed">{s.body}</p>
          </div>
        ))}
        {piece.panel.links?.map((l, i) => (
          <a key={i} href={l.href} target="_blank" rel="noopener noreferrer"
            className="font-mono text-g-ice text-[10px] tracking-widest uppercase mr-6 hover:underline transition-colors">
            {l.label} ↗
          </a>
        ))}
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function CorridorPage() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [activeStation, setActiveStation] = useState(0);
  const [selectedPanel, setSelectedPanel] = useState<number | null>(null);
  const lastPanel = useRef<number>(0);
  if (selectedPanel !== null) lastPanel.current = selectedPanel;

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  // Camera zoom — scroll = walking forward
  const cameraScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.18]);

  // Floor parallax — 260px
  const floorY = useTransform(scrollYProgress, [0, 1], [0, 260]);

  // Wall edge darkening
  const edgeOp = useTransform(scrollYProgress, [0, 1], [0.44, 0.82]);

  // Scroll hint
  const scrollHintOp = useTransform(scrollYProgress, [0, 0.06, 0.12], [1, 1, 0]);

  // Station 1 — left
  const s1x  = useTransform(scrollYProgress, [0.04,0.14,0.28,0.38], [-80, 0,   0,   0   ]);
  const s1op = useTransform(scrollYProgress, [0.04,0.14,0.28,0.38], [0,   1,   1,   0   ]);
  const s1sc = useTransform(scrollYProgress, [0.04,0.14,0.28,0.38], [0.88,1,   1,   1.06]);
  const s1sp = useTransform(scrollYProgress, [0.04,0.14,0.28,0.38], [0,   1,   1,   0   ]);

  // Station 2 — right
  const s2x  = useTransform(scrollYProgress, [0.22,0.32,0.46,0.56], [80,  0,   0,   0   ]);
  const s2op = useTransform(scrollYProgress, [0.22,0.32,0.46,0.56], [0,   1,   1,   0   ]);
  const s2sc = useTransform(scrollYProgress, [0.22,0.32,0.46,0.56], [0.88,1,   1,   1.06]);
  const s2sp = useTransform(scrollYProgress, [0.22,0.32,0.46,0.56], [0,   1,   1,   0   ]);

  // Station 3 — left
  const s3x  = useTransform(scrollYProgress, [0.40,0.50,0.62,0.70], [-80, 0,   0,   0   ]);
  const s3op = useTransform(scrollYProgress, [0.40,0.50,0.62,0.70], [0,   1,   1,   0   ]);
  const s3sc = useTransform(scrollYProgress, [0.40,0.50,0.62,0.70], [0.88,1,   1,   1.06]);
  const s3sp = useTransform(scrollYProgress, [0.40,0.50,0.62,0.70], [0,   1,   1,   0   ]);

  // Station 4 — right
  const s4x  = useTransform(scrollYProgress, [0.58,0.68,0.78,0.86], [80,  0,   0,   0   ]);
  const s4op = useTransform(scrollYProgress, [0.58,0.68,0.78,0.86], [0,   1,   1,   0   ]);
  const s4sc = useTransform(scrollYProgress, [0.58,0.68,0.78,0.86], [0.88,1,   1,   1.06]);
  const s4sp = useTransform(scrollYProgress, [0.58,0.68,0.78,0.86], [0,   1,   1,   0   ]);

  // Eye sculpture
  const sculptureOp = useTransform(scrollYProgress, [0.78, 0.93], [0, 1]);
  const sculptureSc = useTransform(scrollYProgress, [0.78, 0.93], [0.5, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if      (v < 0.18) setActiveStation(0);
    else if (v < 0.38) setActiveStation(1);
    else if (v < 0.56) setActiveStation(2);
    else if (v < 0.76) setActiveStation(3);
    else               setActiveStation(4);
  });

  useEffect(() => {
    const step = 0.2 * 4 * window.innerHeight;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedPanel !== null) { setSelectedPanel(null); return; }
      if (e.key === "ArrowDown") window.scrollBy({ top:  step, behavior: "smooth" });
      if (e.key === "ArrowUp")   window.scrollBy({ top: -step, behavior: "smooth" });
      if (e.key === "Escape")    router.push("/");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router, selectedPanel]);

  if (prefersReduced) return <ReducedLayout />;

  return (
    <div ref={scrollRef} style={{ height: "500vh" }}>
      <div className="sticky top-0 overflow-hidden" style={{ height: "100vh", background: "#1a2e2e" }}>
        {/* HamburgerMenu — fixed, outside all transforms */}
        <HamburgerMenu />

        {/* Entry fade-in */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          style={{ transformOrigin: "center center" }}
        >
          {/* ── SUBNAV ── */}
          <div
            className="absolute left-0 right-0 flex items-center justify-between pointer-events-auto"
            style={{
              top: 0, zIndex: 29, height: 40,
              padding: "0 40px", paddingRight: 72,
              background: "rgba(26,46,46,0.97)",
              borderBottom: "1px solid rgba(58,158,158,0.2)",
            }}
          >
            <Link href="/"
              className="font-mono text-[10px] tracking-[0.25em] uppercase transition-colors flex items-center gap-2"
              style={{ color: "#8aadad" }}
            >
              ← Icicle
            </Link>
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: "#8aadad" }}>
              No. III — The Eye
            </p>
            <div className="flex items-center gap-2">
              {galleryPieces.map((p) => (
                <Link key={p.id} href={p.id === "art" ? "/gallery/art/corridor" : `/gallery/${p.id}`}>
                  <div
                    className="rounded-full transition-all duration-300"
                    style={{
                      width:           p.id === "art" ? 8 : 6,
                      height:          p.id === "art" ? 8 : 6,
                      backgroundColor: p.id === "art" ? "#3a9e9e" : "#2d4f4f",
                    }}
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* ── CORRIDOR AREA — overflow clip container ── */}
          <div
            className="absolute left-0 right-0 bottom-0"
            style={{ top: 40, overflow: "hidden" }}
          >
            {/* Camera zoom inner wrapper */}
            <motion.div
              style={{
                width: "100%", height: "100%",
                scale: cameraScale,
                transformOrigin: "50% 42%",
              }}
            >
              <CorridorScene floorY={floorY} edgeOp={edgeOp} />

              {/* Atmospheric dust motes drifting in the light beams */}
              <DustMotes count={26} />

              {/* Station 1 — left */}
              <motion.div style={{
                position: "absolute", top: "28%", left: "3%", width: "22vw",
                x: s1x, opacity: s1op, scale: s1sc, willChange: "transform",
              }}>
                <ArtworkFrame panelIndex={0} spot={s1sp} onClick={() => setSelectedPanel(0)} />
              </motion.div>

              {/* Station 2 — right */}
              <motion.div style={{
                position: "absolute", top: "28%", right: "3%", width: "22vw",
                x: s2x, opacity: s2op, scale: s2sc, willChange: "transform",
              }}>
                <ArtworkFrame panelIndex={1} spot={s2sp} onClick={() => setSelectedPanel(1)} />
              </motion.div>

              {/* Station 3 — left */}
              <motion.div style={{
                position: "absolute", top: "28%", left: "3%", width: "22vw",
                x: s3x, opacity: s3op, scale: s3sc, willChange: "transform",
              }}>
                <ArtworkFrame panelIndex={2} spot={s3sp} onClick={() => setSelectedPanel(2)} />
              </motion.div>

              {/* Station 4 — right */}
              <motion.div style={{
                position: "absolute", top: "28%", right: "3%", width: "22vw",
                x: s4x, opacity: s4op, scale: s4sc, willChange: "transform",
              }}>
                <ArtworkFrame panelIndex={3} spot={s4sp} onClick={() => setSelectedPanel(3)} />
              </motion.div>

              {/* Roman bust — opens Instagram in a new tab */}
              <RomanBust
                opacity={sculptureOp}
                scale={sculptureSc}
                href={piece.panel.links?.find(l => l.label.toLowerCase().includes("instagram"))?.href ?? "https://instagram.com/"}
              />

              {/* Progress dots */}
              <div
                style={{
                  position: "absolute", right: 12, top: "50%",
                  transform: "translateY(-50%)", zIndex: 20, pointerEvents: "none",
                }}
                className="flex flex-col gap-4 items-end"
              >
                {STATION_LABELS.map((label, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <p
                      className="font-mono text-[8px] tracking-[0.25em] uppercase transition-colors duration-300 hidden sm:block"
                      style={{
                        color:   activeStation === i ? "#e8e0d0" : "#8aadad",
                        opacity: activeStation === i ? 1 : 0.5,
                      }}
                    >
                      {label}
                    </p>
                    <div
                      className="rounded-full transition-all duration-300"
                      style={{
                        width:           activeStation === i ? 8 : 6,
                        height:          activeStation === i ? 8 : 6,
                        backgroundColor: activeStation === i ? "#3a9e9e" : "#2d4f4f",
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Scroll hint */}
              <motion.div
                style={{
                  position: "absolute", bottom: 28, left: "50%",
                  translateX: "-50%", opacity: scrollHintOp,
                  pointerEvents: "none", textAlign: "center",
                }}
              >
                <p className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: "#8aadad" }}>
                  ↓ scroll to walk
                </p>
              </motion.div>

              {/* Keyboard hint */}
              <p
                className="font-mono text-[9px] tracking-widest pointer-events-none hidden md:block"
                style={{
                  position: "absolute", bottom: 12, right: 20,
                  whiteSpace: "nowrap", color: "#8aadad", opacity: 0.35,
                }}
              >
                ↑ ↓ to walk  ·  Esc to exit
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* ── FULL-SCREEN MODAL — outside transforms so position:fixed works ── */}
        <AnimatePresence>
          {selectedPanel !== null && (
            <>
              <motion.div
                key="modal-bg"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                onClick={() => setSelectedPanel(null)}
                style={{
                  position: "fixed", inset: 0, zIndex: 58,
                  background: "rgba(8,18,18,0.90)",
                  backdropFilter: "blur(6px)",
                  cursor: "pointer",
                }}
              />
              <motion.div
                key="modal"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
                style={{
                  position: "fixed", inset: "5%", zIndex: 59,
                  background: "#0c1f1f",
                  border: "1px solid rgba(58,158,158,0.18)",
                  boxShadow: "0 24px 80px rgba(0,0,0,0.72)",
                  display: "flex", overflow: "hidden",
                }}
              >
                {/* Close */}
                <button
                  onClick={() => setSelectedPanel(null)}
                  style={{
                    position: "absolute", top: 20, right: 24, zIndex: 2,
                    background: "none", border: "none", cursor: "pointer",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 8, letterSpacing: "0.3em",
                    color: "#8aadad", textTransform: "uppercase",
                  }}
                >
                  ✕ Close
                </button>

                {/* Left — enlarged frame */}
                <div style={{
                  flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                  padding: "60px 48px",
                  borderRight: "1px solid rgba(58,158,158,0.12)",
                  background: "#0a1818",
                }}>
                  <div style={{
                    border: "12px solid #c9a84c", maxWidth: 440, width: "100%",
                    boxShadow: "0 0 80px rgba(201,168,76,0.12), -10px 14px 60px rgba(0,0,0,0.75)",
                    position: "relative",
                  }}>
                    <div style={{
                      position: "absolute", right: -8, bottom: -8, top: 6, left: 6,
                      background: "#7a5e18", zIndex: 0,
                    }} />
                    <div style={{
                      background: "#1a1a1a", padding: "36px 32px", minHeight: 280,
                      position: "relative", zIndex: 1,
                      display: "flex", flexDirection: "column",
                      alignItems: "center", justifyContent: "center",
                    }}>
                      <div style={{
                        position: "absolute", inset: 0,
                        background: "radial-gradient(ellipse at 40% 30%, rgba(100,75,28,0.28) 0%, transparent 65%)",
                        pointerEvents: "none",
                      }} />
                      <p className="font-serif" style={{
                        fontStyle: "italic", color: "#e8e0d0",
                        fontSize: "clamp(1.1rem, 2.5vw, 1.8rem)",
                        lineHeight: 1.4, textAlign: "center", position: "relative", zIndex: 1,
                      }}>
                        {PANELS[lastPanel.current].heading}
                      </p>
                      <div style={{ height: 2, background: "#3a9e9e", marginTop: 18, width: "36%", position: "relative", zIndex: 1 }} />
                    </div>
                  </div>
                </div>

                {/* Right — text */}
                <div style={{
                  flex: 1, padding: "72px 56px 48px", overflowY: "auto",
                  display: "flex", flexDirection: "column", justifyContent: "center",
                }}>
                  <p style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 8, letterSpacing: "0.3em",
                    color: "#8aadad", textTransform: "uppercase", marginBottom: 8,
                  }}>
                    No. III — The Eye · {PANELS[lastPanel.current].label}
                  </p>
                  <div style={{ width: 36, height: 1, background: "rgba(201,168,76,0.4)", marginBottom: 28 }} />
                  <h2 className="font-serif font-light" style={{
                    fontSize: "clamp(22px, 3vw, 40px)",
                    color: "#e8e0d0", lineHeight: 1.2, marginBottom: 12,
                  }}>
                    {PANELS[lastPanel.current].heading}
                  </h2>
                  <p className="font-serif" style={{
                    fontStyle: "italic", color: "#8aadad",
                    fontSize: "0.95rem", marginBottom: 28,
                  }}>
                    {piece.subtitle}
                  </p>
                  <div style={{ height: 1, background: "rgba(58,158,158,0.25)", marginBottom: 32 }} />
                  <p className="font-sans" style={{ color: "#c4b89a", fontSize: "0.875rem", lineHeight: 1.8 }}>
                    {PANELS[lastPanel.current].body}
                  </p>
                  <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: 12 }}>
                    {piece.panel.links?.map((l, i) => (
                      <a key={i} href={l.href} target="_blank" rel="noopener noreferrer"
                        style={{
                          display: "inline-flex", alignItems: "center", gap: 8,
                          padding: "10px 20px",
                          border: "1px solid rgba(201,168,76,0.4)",
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 8, letterSpacing: "0.22em",
                          color: "#c9a84c", textTransform: "uppercase", textDecoration: "none",
                        }}>
                        {l.label} <span style={{ fontSize: 7 }}>↗</span>
                      </a>
                    ))}
                    <Link href="/contact"
                      onClick={() => setSelectedPanel(null)}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 8,
                        padding: "10px 20px",
                        border: "1px solid rgba(58,158,158,0.4)",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 8, letterSpacing: "0.22em",
                        color: "#3a9e9e", textTransform: "uppercase", textDecoration: "none",
                      }}>
                      Contact <span style={{ fontSize: 7 }}>↗</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
