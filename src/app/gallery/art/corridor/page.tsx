"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import HamburgerMenu from "@/components/HamburgerMenu";
import { galleryPieces } from "@/data/galleryData";
import RomanBust from "@/components/corridor/RomanBust";
import MiniPainting from "@/components/corridor/MiniPainting";
import DustMotes from "@/components/corridor/DustMotes";

// â”€â”€ Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const piece = galleryPieces.find((p) => p.id === "art")!;

const PANELS = [
  { label: "I",   heading: piece.panel.sections[0].heading, body: piece.panel.sections[0].body },
  { label: "II",  heading: piece.panel.sections[1].heading, body: piece.panel.sections[1].body },
  { label: "III", heading: piece.panel.sections[2].heading, body: piece.panel.sections[2].body },
  { label: "IV",  heading: "The Artist's Eye",              body: piece.panel.intro             },
];

// â”€â”€ 3-D world constants (CSS px) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const CORRIDOR_LENGTH = 16200; // exact value from updated reference repo for 27 paintings
const CORRIDOR_WIDTH  = 1000; // matches reference ratio â€” background color fills margins
const WALL_HEIGHT     = 680;
const BACK_WALL_Z     = -CORRIDOR_LENGTH;
const FIRST_Z = -700;                       // match reference FIRST_PAINTING_Z
const LAST_Z  = -(CORRIDOR_LENGTH - 600);   // match reference LAST_PAINTING_Z

// 27 paintings â€” alternating sides, cycling 4 panels, varied aspects
type PaintingDef = {
  id: number; side: "left" | "right"; panelIndex: number;
  src: string;
  width: number;
  height: number;
  canvas: string;
};

const PAINTINGS: PaintingDef[] = [
  { id:1,  side:"left",  panelIndex:0, src:"/paintings/1.jpg",  width:1074, height:1342, canvas:"radial-gradient(ellipse at 40% 30%, #2a3848, #0e1820)" },
  { id:2,  side:"right", panelIndex:1, src:"/paintings/2.jpg",  width:2635, height:3027, canvas:"radial-gradient(ellipse at 60% 40%, #302418, #120c08)" },
  { id:3,  side:"left",  panelIndex:2, src:"/paintings/3.jpg",  width:3024, height:4032, canvas:"radial-gradient(ellipse at 35% 25%, #1e3028, #0a1410)" },
  { id:4,  side:"right", panelIndex:3, src:"/paintings/4.jpg",  width:1056, height:1200, canvas:"radial-gradient(ellipse at 50% 50%, #2e2418, #100e08)" },
  { id:5,  side:"left",  panelIndex:0, src:"/paintings/5.jpg",  width:2531, height:3628, canvas:"radial-gradient(ellipse at 45% 35%, #1c2838, #0c1018)" },
  { id:6,  side:"right", panelIndex:1, src:"/paintings/6.jpg",  width:1029, height:1308, canvas:"radial-gradient(ellipse at 55% 30%, #28201a, #0e0c08)" },
  { id:7,  side:"left",  panelIndex:2, src:"/paintings/7.jpg",  width:1170, height:1506, canvas:"radial-gradient(ellipse at 40% 40%, #1e2c20, #0c1010)" },
  { id:8,  side:"right", panelIndex:3, src:"/paintings/8.jpg",  width:1049, height:1062, canvas:"radial-gradient(ellipse at 50% 30%, #2c2018, #100a08)" },
  { id:9,  side:"left",  panelIndex:0, src:"/paintings/9.jpg",  width:1127, height:1603, canvas:"radial-gradient(ellipse at 38% 28%, #222838, #0e0e18)" },
  { id:10, side:"right", panelIndex:1, src:"/paintings/10.jpg", width:2359, height:3194, canvas:"radial-gradient(ellipse at 60% 35%, #2a2010, #100c04)" },
  { id:11, side:"left",  panelIndex:2, src:"/paintings/11.jpg", width:1044, height:1312, canvas:"radial-gradient(ellipse at 42% 32%, #1c2c24, #0a1210)" },
  { id:12, side:"right", panelIndex:3, src:"/paintings/12.JPG", width:2950, height:3933, canvas:"radial-gradient(ellipse at 52% 42%, #2a2214, #0e0a06)" },
  { id:13, side:"left",  panelIndex:0, src:"/paintings/13.JPG", width:1527, height:1908, canvas:"radial-gradient(ellipse at 38% 28%, #20283a, #0c1018)" },
  { id:14, side:"right", panelIndex:1, src:"/paintings/14.jpg", width:2387, height:3181, canvas:"radial-gradient(ellipse at 58% 35%, #2c2218, #100c08)" },
  { id:15, side:"left",  panelIndex:2, src:"/paintings/15.jpg", width:1049, height:750,  canvas:"radial-gradient(ellipse at 44% 38%, #1e2c22, #0a1210)" },
  { id:16, side:"right", panelIndex:3, src:"/paintings/16.jpg", width:1066, height:1039, canvas:"radial-gradient(ellipse at 55% 28%, #2e201a, #120a08)" },
  { id:17, side:"left",  panelIndex:0, src:"/paintings/17.jpg", width:1029, height:1036, canvas:"radial-gradient(ellipse at 36% 32%, #242a3c, #0e1018)" },
  { id:18, side:"right", panelIndex:1, src:"/paintings/18.jpg", width:1063, height:1071, canvas:"radial-gradient(ellipse at 62% 38%, #2c2410, #100c04)" },
  { id:19, side:"left",  panelIndex:2, src:"/paintings/19.jpg", width:2584, height:3588, canvas:"radial-gradient(ellipse at 40% 26%, #1c2e24, #0a1210)" },
  { id:20, side:"right", panelIndex:3, src:"/paintings/20.JPG", width:1170, height:1462, canvas:"radial-gradient(ellipse at 50% 44%, #2e221c, #120e08)" },
  { id:21, side:"left",  panelIndex:0, src:"/paintings/21.JPG", width:2857, height:3809, canvas:"radial-gradient(ellipse at 42% 30%, #1e2c3a, #0c1018)" },
  { id:22, side:"right", panelIndex:1, src:"/paintings/22.jpg", width:1052, height:1318, canvas:"radial-gradient(ellipse at 56% 34%, #2a2216, #0e0c08)" },
  { id:23, side:"left",  panelIndex:2, src:"/paintings/23.jpg", width:1043, height:1042, canvas:"radial-gradient(ellipse at 38% 36%, #1c2c20, #0a1010)" },
  { id:24, side:"right", panelIndex:3, src:"/paintings/24.jpg", width:972,  height:1324, canvas:"radial-gradient(ellipse at 54% 30%, #2c1e18, #100808)" },
  { id:25, side:"left",  panelIndex:0, src:"/paintings/25.jpg", width:1062, height:1306, canvas:"radial-gradient(ellipse at 40% 28%, #20283a, #0c0e18)" },
  { id:26, side:"right", panelIndex:1, src:"/paintings/26.jpg", width:1047, height:710,  canvas:"radial-gradient(ellipse at 60% 38%, #2e2412, #120c06)" },
  { id:27, side:"left",  panelIndex:2, src:"/paintings/27.jpg", width:988,  height:1293, canvas:"radial-gradient(ellipse at 36% 30%, #1e2e22, #0a1210)" },
];

// â”€â”€ Generic 3-D plane â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function Plane({
  w, h, transform, style, children, className = "",
}: {
  w: number; h: number; transform: string; className?: string;
  style?: React.CSSProperties; children?: React.ReactNode;
}) {
  return (
    <div
      className={`absolute left-1/2 top-1/2 ${className}`}
      style={{
        width: w, height: h,
        marginLeft: -w / 2, marginTop: -h / 2,
        transformStyle: "preserve-3d",
        transform,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// â”€â”€ Single painting on a side wall â€” pure CSS hover, zero React state â”€â”€â”€â”€â”€â”€â”€â”€

function CorridorPainting({
  painting, z, onOpen,
}: {
  painting: PaintingDef; z: number; onOpen: () => void;
}) {
  const maxFrameWidth = 280;
  const maxFrameHeight = 250;
  const imageScale = Math.min(maxFrameWidth / painting.width, maxFrameHeight / painting.height);
  const imageW = Math.round(painting.width * imageScale);
  const imageH = Math.round(painting.height * imageScale);
  const dims = { w: imageW + 20, h: imageH + 20 };

  const isLeft = painting.side === "left";
  // x derived from corridor geometry â€” identical to reference formula
  const ANGLE = 35;
  const edgeClearance = Math.cos((ANGLE * Math.PI) / 180) * (dims.w / 2) + 36;
  const x       = isLeft ? -CORRIDOR_WIDTH / 2 + edgeClearance : CORRIDOR_WIDTH / 2 - edgeClearance;
  const rotateY = isLeft ? 90 - ANGLE : -90 + ANGLE;

  return (
    <Plane w={dims.w} h={dims.h} transform={`translate3d(${x}px, 0, ${z}px) rotateY(${rotateY}deg)`}>
      <button
        type="button"
        onClick={onOpen}
        className="group relative h-full w-full cursor-pointer rounded-[2px] corridor-gold-frame focus:outline-none"
        aria-label={`Open ${PANELS[painting.panelIndex].heading}`}
        style={{ padding: 10 }}
      >
        {/* Canvas */}
        <div
          className="relative h-full w-full overflow-hidden"
          style={{
            background: painting.canvas,
            boxShadow: "inset 0 0 50px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(0,0,0,0.4)",
          }}
        >
          <div className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,228,148,0.12) 0%, transparent 65%)" }}
          />
          <div
            className="absolute left-1/2 top-1/2"
            style={{
              width: imageW,
              height: imageH,
              transform: "translate(-50%, -50%)",
              boxShadow: "0 12px 28px rgba(0,0,0,0.35)",
            }}
          >
            <img
              src={painting.src}
              alt={`Painting ${painting.id}`}
              draggable={false}
              style={{ width: "100%", height: "100%", maxWidth: "min(72vw, 980px)", maxHeight: "calc(100vh - 150px)", objectFit: "contain", objectPosition: "center center", display: "block", filter: "drop-shadow(0 28px 42px rgba(0,0,0,0.45))" }}
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-2"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }}>
            <p className="font-serif italic text-center"
              style={{ fontSize: 10, color: "rgba(220,210,185,0.85)", lineHeight: 1.3 }}>
              {PANELS[painting.panelIndex].heading}
            </p>
          </div>
          {/* Hover overlay â€” pure CSS, no JS */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ background: "rgba(0,0,0,0.55)" }}>
            <div style={{ width: 28, height: 1, background: "#c9a84c" }} />
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 7, letterSpacing: "0.3em", color: "#c9a84c", textTransform: "uppercase" }}>
              Click to explore
            </p>
            <div style={{ width: 28, height: 1, background: "#c9a84c" }} />
          </div>
        </div>
        {/* Brass plaque */}
        <div className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-none"
          style={{ bottom: -32, width: dims.w + 10 }}>
          <div style={{ height: 1, background: "rgba(201,168,76,0.45)", margin: "0 auto", width: 36 }} />
          <p className="font-serif italic" style={{ marginTop: 3, fontSize: 10, color: "rgba(201,168,76,0.85)", lineHeight: 1.3 }}>
            {PANELS[painting.panelIndex].heading}
          </p>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 7, letterSpacing: "0.22em", color: "rgba(200,210,190,0.5)", textTransform: "uppercase", marginTop: 2 }}>
            No. III Â· {PANELS[painting.panelIndex].label}
          </p>
        </div>
      </button>
    </Plane>
  );
}

// â”€â”€ Back wall + statue â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function BackWall({ showCTA, onContact }: { showCTA: boolean; onContact: () => void }) {
  return (
    <>
      {/* Wall surface */}
      <Plane
        w={CORRIDOR_WIDTH} h={WALL_HEIGHT}
        transform={`translate3d(0, 0, ${BACK_WALL_Z}px)`}
        style={{
          background: "linear-gradient(180deg, #162820 0%, #1e3428 50%, #162820 100%)",
        }}
      >
        {/* Halo behind statue */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: 500, height: 500,
            background: "radial-gradient(circle, rgba(201,168,76,0.45) 0%, rgba(201,168,76,0.12) 40%, transparent 68%)",
            filter: "blur(14px)",
          }}
        />
        {/* Gold accent lines */}
        <div className="absolute inset-x-0" style={{ top: "8%", height: 1, background: "rgba(201,168,76,0.25)" }} />
        <div className="absolute inset-x-0" style={{ bottom: "8%", height: 1, background: "rgba(201,168,76,0.25)" }} />
      </Plane>

      {/* Plinth shadow on floor */}
      <Plane
        w={280} h={140}
        transform={`translate3d(0, ${WALL_HEIGHT / 2 - 1}px, ${BACK_WALL_Z + 500}px) rotateX(90deg)`}
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, transparent 75%)",
          filter: "blur(8px)",
          pointerEvents: "none",
        }}
      />

      {/* Statue â€” bottom of plane = floor level (WALL_HEIGHT/2 - h/2 + h/2 = WALL_HEIGHT/2) */}
      <Plane
        w={330} h={580}
        transform={`translate3d(0, ${WALL_HEIGHT / 2 - 290}px, ${BACK_WALL_Z + 500}px)`}
      >
        <img
          src="/statue.webp"
          alt="Marble statue"
          style={{
            width: "100%", height: "100%",
            objectFit: "contain",
            objectPosition: "bottom center",
            mixBlendMode: "screen",
            filter: "drop-shadow(0 30px 50px rgba(0,0,0,0.95))",
          }}
        />
      </Plane>

      {/* Latin quote â€” engraved on the back wall above the statue */}
      <Plane
        w={700} h={100}
        transform={`translate3d(0, ${-WALL_HEIGHT / 2 + 200}px, ${BACK_WALL_Z + 80}px)`}
      >
        <div className="flex h-full w-full flex-col items-center justify-center">
          <p className="font-serif italic" style={{
            fontSize: 38,
            color: "#c9a84c",
            letterSpacing: "0.08em",
            textAlign: "center",
            textShadow: "0 2px 8px rgba(0,0,0,0.95), 0 0 30px rgba(201,168,76,0.25)",
            fontWeight: 300,
          }}>
            Audentes Fortuna Iuvat
          </p>
          <div style={{ height: 1, width: 200, background: "linear-gradient(to right, transparent, rgba(201,168,76,0.55), transparent)", marginTop: 12 }} />
        </div>
      </Plane>

      {/* Contact card â€” only text-free CTA, appears at corridor end */}
      <Plane
        w={520} h={110}
        transform={`translate3d(0, ${WALL_HEIGHT / 2 - 50}px, ${BACK_WALL_Z + 760}px)`}
      >
        <div
          className="flex h-full w-full items-center justify-center transition-all duration-700"
          style={{ opacity: showCTA ? 1 : 0, transform: showCTA ? "translateY(0)" : "translateY(10px)" }}
        >
          <button
            onClick={onContact}
            className="flex items-center gap-4 transition-all"
            style={{
              border: "1px solid rgba(201,168,76,0.65)",
              background: "rgba(8,18,10,0.88)",
              padding: "18px 52px",
              backdropFilter: "blur(6px)",
              cursor: "pointer",
              boxShadow: "0 0 40px rgba(201,168,76,0.18), inset 0 0 0 1px rgba(201,168,76,0.12)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 0 60px rgba(201,168,76,0.35), inset 0 0 0 1px rgba(201,168,76,0.3)")}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 0 40px rgba(201,168,76,0.18), inset 0 0 0 1px rgba(201,168,76,0.12)")}
          >
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, letterSpacing: "0.35em", color: "#d4b878", textTransform: "uppercase" }}>
              Contact
            </span>
            <span style={{ fontSize: 14, color: "rgba(201,168,76,0.8)" }}>â†—</span>
          </button>
        </div>
      </Plane>
    </>
  );
}

// â”€â”€ Reduced-motion fallback â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function ReducedLayout() {
  return (
    <div className="min-h-screen" style={{ background: "#111a14" }}>
      <HamburgerMenu />
      <div className="max-w-2xl mx-auto px-10 pb-20" style={{ paddingTop: 80 }}>
        <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-4" style={{ color: "#7aadad" }}>No. III â€” The Eye</p>
        <h1 className="font-serif text-4xl font-light mb-2" style={{ color: "#e8dcc8" }}>{piece.title}</h1>
        <p className="font-serif italic mb-10" style={{ color: "#7aadad" }}>{piece.subtitle}</p>
        {piece.panel.sections.map((s, i) => (
          <div key={i} className="mb-8">
            <h3 className="font-mono text-[9px] tracking-[0.25em] uppercase mb-2" style={{ color: "#7aadad" }}>{s.heading}</h3>
            <p className="font-sans text-sm leading-relaxed" style={{ color: "#b8c8a8" }}>{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// â”€â”€ Main page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export default function CorridorPage() {
  const router = useRouter();
  const [active, setActive]     = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const lastActiveId = useRef(PAINTINGS[0].id);
  const worldRef     = useRef<HTMLDivElement>(null);
  const lastProgress = useRef(0);
  if (active !== null) lastActiveId.current = active;

  // Scroll â†’ camera Z via direct DOM mutation â€” bypasses React reconciliation
  // so the 3-D world updates at native frame rate without re-rendering 27 paintings.
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p   = max > 0 ? window.scrollY / max : 0;
      const z   = p * (CORRIDOR_LENGTH - 1200);

      if (worldRef.current) {
        worldRef.current.style.transform = `translate3d(-50%, -50%, ${z}px)`;
      }
      // Only trigger React re-render when progress changes enough to matter for HUD/CTA
      if (Math.abs(p - lastProgress.current) > 0.004) {
        lastProgress.current = p;
        setProgress(p);
      }
    };

    // Start pre-scrolled so the first painting is close and visible
    window.scrollTo(0, 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && active !== null) { setActive(null); return; }
      if (e.key === "ArrowDown") window.scrollBy({ top: window.innerHeight * 0.28, behavior: "smooth" });
      if (e.key === "ArrowUp")   window.scrollBy({ top: -window.innerHeight * 0.28, behavior: "smooth" });
      if (e.key === "Escape")    router.push("/");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router, active]);

  // Evenly space paintings along the corridor
  const positioned = PAINTINGS.map((p, i) => {
    const t = i / (PAINTINGS.length - 1);
    return { ...p, z: FIRST_Z + t * (LAST_Z - FIRST_Z) };
  });

  return (
    <main style={{ background: "#111a14" }}>
      {/* Tall scroll container gives the scroll range */}
      <div style={{ height: `${CORRIDOR_LENGTH * 0.9}px` }}>

        {/* â”€â”€ FIXED 3-D VIEWPORT â”€â”€ */}
        <div
          className="fixed inset-0 overflow-hidden"
          style={{ background: "#1a2e22", perspective: "1100px", perspectiveOrigin: "50% 50%" }}
        >
          <HamburgerMenu />

          {/* Nav bar */}
          <div
            className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between"
            style={{ height: 40, padding: "0 40px", paddingRight: 72, background: "rgba(9,15,12,0.97)", borderBottom: "1px solid rgba(201,168,76,0.18)" }}
          >
            <Link href="/" className="font-mono text-[10px] tracking-[0.25em] uppercase hover:opacity-70 transition-opacity" style={{ color: "#7aadad" }}>
              â† Icicle
            </Link>
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: "#7aadad" }}>
              No. III â€” The Eye
            </p>
            <div className="flex items-center gap-2">
              {galleryPieces.map((p) => (
                <Link key={p.id} href={p.id === "art" ? "/gallery/art/corridor" : `/gallery/${p.id}`}>
                  <div className="rounded-full transition-all duration-300" style={{
                    width: p.id === "art" ? 8 : 5,
                    height: p.id === "art" ? 8 : 5,
                    backgroundColor: p.id === "art" ? "#3a9e9e" : "#2a4a38",
                  }} />
                </Link>
              ))}
            </div>
          </div>

          {/* â”€â”€ 3-D WORLD â€” transform updated directly via ref, no React re-render â”€â”€ */}
          <div
            ref={worldRef}
            className="absolute left-1/2 top-1/2"
            style={{
              transformStyle: "preserve-3d",
              transform: "translate3d(-50%, -50%, 0px)",
              willChange: "transform",
            }}
          >
            {/* FLOOR */}
            <Plane w={CORRIDOR_WIDTH} h={CORRIDOR_LENGTH} className="corridor-floor"
              transform={`translate3d(0, ${WALL_HEIGHT / 2}px, ${-CORRIDOR_LENGTH / 2}px) rotateX(90deg)`}
            />
            {/* CEILING */}
            <Plane w={CORRIDOR_WIDTH} h={CORRIDOR_LENGTH} className="corridor-ceiling"
              transform={`translate3d(0, ${-WALL_HEIGHT / 2}px, ${-CORRIDOR_LENGTH / 2}px) rotateX(-90deg)`}
            />
            {/* LEFT WALL */}
            <Plane w={CORRIDOR_LENGTH} h={WALL_HEIGHT} className="corridor-wall"
              transform={`translate3d(${-CORRIDOR_WIDTH / 2}px, 0, ${-CORRIDOR_LENGTH / 2}px) rotateY(90deg)`}
            />
            {/* RIGHT WALL */}
            <Plane w={CORRIDOR_LENGTH} h={WALL_HEIGHT} className="corridor-wall"
              transform={`translate3d(${CORRIDOR_WIDTH / 2}px, 0, ${-CORRIDOR_LENGTH / 2}px) rotateY(-90deg)`}
            />

            {/* BACK WALL + STATUE */}
            <BackWall showCTA={progress > 0.85} onContact={() => router.push("/contact")} />

            {/* PAINTINGS â€” all rendered, CSS 3D perspective + overflow:hidden handles clipping */}
            {positioned.map((p) => (
              <CorridorPainting
                key={p.id}
                painting={p}
                z={p.z}
                onOpen={() => setActive(p.id)}
              />
            ))}

            {/* Ceiling spotlight cones â€” 26 lights at 600px spacing, exact reference spec */}
            {Array.from({ length: 26 }).map((_, i) => (
              <div
                key={i}
                className="absolute left-1/2 top-1/2"
                style={{
                  width: "260px", height: "340px",
                  transform: `translate(-50%, -50%) translate3d(0, ${-WALL_HEIGHT / 2 + 10}px, ${-400 - i * 600}px)`,
                  background: "radial-gradient(ellipse at 50% 0%, rgba(255,228,148,0.55) 0%, transparent 70%)",
                  filter: "blur(10px)",
                  pointerEvents: "none",
                }}
              />
            ))}
          </div>

          {/* Vignette overlay */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(ellipse at 50% 55%, transparent 32%, rgba(0,0,0,0.6) 100%)" }}
          />

          {/* Title â€” fades as you walk */}
          <div
            className="pointer-events-none absolute inset-x-0 z-10 text-center transition-opacity duration-700"
            style={{ top: 58, opacity: Math.max(0, 1 - progress * 4.5) }}
          >
            <h1 className="font-serif text-4xl font-light italic md:text-6xl" style={{ color: "#e8dcc8", textShadow: "0 2px 24px rgba(0,0,0,0.75)" }}>
              {piece.title}
            </h1>
            <p className="mt-3 font-serif italic text-sm" style={{ color: "rgba(232,220,200,0.55)" }}>
              Scroll to walk Â· {PAINTINGS.length} works
            </p>
          </div>

          {/* Scroll cue */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2 transition-opacity duration-700"
            style={{ opacity: Math.max(0, 1 - progress * 7) }}
          >
            <span className="font-mono text-[9px] tracking-[0.4em] uppercase animate-pulse" style={{ color: "#e8dcc8", textShadow: "0 1px 6px rgba(0,0,0,0.9)" }}>Walk forward</span>
            <div className="h-10 w-px" style={{ background: "linear-gradient(to bottom, rgba(232,220,200,0.8), transparent)" }} />
          </div>

          {/* Progress bar */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px" style={{ background: "rgba(201,168,76,0.08)" }}>
            <div style={{ height: "100%", width: `${progress * 100}%`, background: "linear-gradient(to right, rgba(201,168,76,0.5), #c9a84c, rgba(201,168,76,0.5))", transition: "width 0.1s linear" }} />
          </div>

          {/* Keyboard hint */}
          <p className="font-mono text-[7px] tracking-widest pointer-events-none hidden md:block"
            style={{ position: "absolute", bottom: 10, right: 16, color: "#2a4a38", opacity: 0.8, whiteSpace: "nowrap", zIndex: 10 }}>
            â†‘ â†“ walk  Â·  Esc exit
          </p>
        </div>
      </div>

      {/* â”€â”€ MODAL â”€â”€ */}
      <AnimatePresence>
        {active !== null && (() => {
          // Derive panel from painting id â€” each painting has its own image file
          const activePainting = PAINTINGS.find((painting) => painting.id === lastActiveId.current) ?? PAINTINGS[0];
          const panelIdx = activePainting.panelIndex;
          const panel    = PANELS[panelIdx];
          return (
            <>
              <motion.div
                key="modal-bg"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                onClick={() => setActive(null)}
                style={{ position: "fixed", inset: 0, zIndex: 58, background: "rgba(6,14,10,0.92)", backdropFilter: "blur(8px)", cursor: "pointer" }}
              />
              <motion.div
                key="modal"
                initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 28 }}
                transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
                style={{ position: "fixed", inset: "3.5%", zIndex: 59, background: "linear-gradient(135deg, #07120d 0%, #0a1711 55%, #08110d 100%)", border: "1px solid rgba(92,138,116,0.2)", boxShadow: "0 28px 90px rgba(0,0,0,0.78)", display: "flex", overflow: "hidden", flexDirection: "column" }}
                className="md:flex-row"
              >
                <button
                  onClick={() => setActive(null)}
                  style={{ position: "absolute", top: 20, right: 24, zIndex: 10, background: "none", border: "none", cursor: "pointer", fontFamily: "'JetBrains Mono', monospace", fontSize: 8, letterSpacing: "0.3em", color: "#7aadad", textTransform: "uppercase" }}
                >
                  âœ• Close
                </button>

                {/* Left â€” painting fills edge-to-edge, no frame */}
                <div className="md:order-2" style={{ flex: 1.45,
                    position: "relative",
                    overflow: "hidden",
                    background: "linear-gradient(180deg, #0b1610 0%, #09130f 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "44px 44px 34px",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 0, background: "transparent",
                    }}
                  >
                    <img
                      src={activePainting.src}
                      alt={`${panel.heading} â€” Painting ${activePainting.id}`}
                      draggable={false}
                      style={{ width: "100%", height: "100%", maxWidth: "min(72vw, 980px)", maxHeight: "calc(100vh - 150px)", objectFit: "contain", objectPosition: "center center", display: "block", filter: "drop-shadow(0 28px 42px rgba(0,0,0,0.45))" }}
                      onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0"; }}
                    />
                  </div>
                  {/* Subtle vignette over image */}
                  <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at center, rgba(255,244,220,0.05) 0%, rgba(9,19,15,0) 55%)", pointerEvents: "none" }} />
                </div>

                {/* Right â€” text */}
                <div className="md:order-1" style={{ flex: 0.78, padding: "84px 44px 44px", overflowY: "auto", display: "flex", flexDirection: "column", justifyContent: "center", minWidth: 0, background: "linear-gradient(180deg, rgba(6,20,14,0.98) 0%, rgba(7,25,17,0.96) 100%)", borderRight: "1px solid rgba(58,158,100,0.12)" }}>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, letterSpacing: "0.3em", color: "#7aadad", textTransform: "uppercase", marginBottom: 8 }}>
                    No. III · The Eye · {panel.label}
                  </p>
                  <div style={{ width: 36, height: 1, background: "rgba(201,168,76,0.4)", marginBottom: 28 }} />
                  <h2 className="font-serif font-light" style={{ fontSize: "clamp(28px, 4vw, 56px)", color: "#e3d7c2", lineHeight: 1.04, marginBottom: 14 }}>
                    {panel.heading}
                  </h2>
                  <p className="font-serif" style={{ fontStyle: "italic", color: "#7aadad", fontSize: "1rem", marginBottom: 30 }}>
                    {piece.subtitle}
                  </p>
                  <div style={{ height: 1, background: "rgba(58,158,100,0.22)", marginBottom: 32 }} />
                  <p className="font-sans" style={{ color: "#bdc7b6", fontSize: "0.96rem", lineHeight: 1.95, maxWidth: 420 }}>
                    {panel.body}
                  </p>
                  <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: 12 }}>
                    {piece.panel.links?.slice(0, 1).map((l, i) => (
                      <a key={i} href={l.href} target="_blank" rel="noopener noreferrer"
                        style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 20px", border: "1px solid rgba(201,168,76,0.42)", fontFamily: "'JetBrains Mono', monospace", fontSize: 8, letterSpacing: "0.24em", color: "#c9a84c", textTransform: "uppercase", textDecoration: "none", background: "rgba(201,168,76,0.06)" }}>
                        {l.label} <span style={{ fontSize: 7 }}>â†—</span>
                      </a>
                    ))}
                    <Link href="/contact" onClick={() => setActive(null)}
                      style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 20px", border: "1px solid rgba(58,158,100,0.4)", fontFamily: "'JetBrains Mono', monospace", fontSize: 8, letterSpacing: "0.24em", color: "#8ebea0", textTransform: "uppercase", textDecoration: "none", background: "rgba(58,158,100,0.06)" }}>
                      Contact <span style={{ fontSize: 7 }}>â†—</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </>
          );
        })()}
      </AnimatePresence>
    </main>
  );
}




