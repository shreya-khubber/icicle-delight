"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { galleryPieces } from "@/data/galleryData";
import { PAINTINGS } from "@/data/corridorPaintings";

// WebGL is client-only — never SSR the canvas.
const CorridorScene = dynamic(
  () => import("@/components/corridor/CorridorScene"),
  { ssr: false }
);

const piece = galleryPieces.find((p) => p.id === "art")!;

const PANELS = [
  { label: "I",   heading: piece.panel.sections[0].heading, body: piece.panel.sections[0].body },
  { label: "II",  heading: piece.panel.sections[1].heading, body: piece.panel.sections[1].body },
  { label: "III", heading: piece.panel.sections[2].heading, body: piece.panel.sections[2].body },
  { label: "IV",  heading: "The Artist's Eye",              body: piece.panel.intro             },
];

// Tall scroll surface that maps to camera Z inside the canvas.
const SCROLL_HEIGHT_PX = 14000;

export default function CorridorPage() {
  const router = useRouter();

  const [active, setActive] = useState<number | null>(null);
  const lastActiveId = useRef(PAINTINGS[0].id);
  if (active !== null) lastActiveId.current = active;

  // HUD opacities + CTA visibility — all driven directly from the DOM each
  // animation frame, not React state, so the scene rendering stays unblocked.
  useEffect(() => {
    let scheduled = false;
    let raf = 0;

    const apply = () => {
      scheduled = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;

      const titleEl = document.querySelector<HTMLElement>('[data-hud="title"]');
      if (titleEl) titleEl.style.opacity = String(Math.max(0, 1 - p * 4.5));

      const cueEl = document.querySelector<HTMLElement>('[data-hud="cue"]');
      if (cueEl) cueEl.style.opacity = String(Math.max(0, 1 - p * 7));

      const progressEl = document.querySelector<HTMLElement>('[data-hud="progress"]');
      if (progressEl) progressEl.style.width = `${p * 100}%`;
    };

    const onScroll = () => {
      if (scheduled) return;
      scheduled = true;
      raf = requestAnimationFrame(apply);
    };

    window.scrollTo(0, 0);
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Keyboard navigation (Esc closes modal / exits, arrows scroll the corridor)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (active !== null) { setActive(null); return; }
        router.push("/");
        return;
      }
      if (e.key === "ArrowDown") window.scrollBy({ top: window.innerHeight * 0.3, behavior: "smooth" });
      if (e.key === "ArrowUp")   window.scrollBy({ top: -window.innerHeight * 0.3, behavior: "smooth" });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router, active]);

  return (
    <main style={{ background: "#0a1410" }}>
      {/* Tall scroll surface — gives the scroll range that drives the camera */}
      <div style={{ height: `${SCROLL_HEIGHT_PX}px` }}>
        {/* Fixed viewport — canvas + HUD layer on top of canvas */}
        <div
          className="fixed inset-0 overflow-hidden"
          style={{ background: "#0a1410" }}
        >

          {/* Top nav — Icicle back link only (Builder-style) */}
          <div
            className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between"
            style={{
              height: 40,
              padding: "0 40px",
              paddingRight: 72,
              background: "rgba(9,15,12,0.92)",
              borderBottom: "1px solid rgba(201,168,76,0.18)",
              backdropFilter: "blur(6px)",
            }}
          >
            <Link
              href="/"
              className="font-mono text-[11px] tracking-[0.25em] uppercase hover:opacity-70 transition-opacity"
              style={{ color: "#7aadad", fontWeight: 600 }}
            >
              &lt;- Icicle
            </Link>
            <div />
          </div>

          {/* WebGL scene fills the viewport behind the HUD */}
          <div className="absolute inset-0">
            <CorridorScene
              onOpen={(id) => setActive(id)}
              onContact={() => router.push("/contact")}
            />
          </div>

          {/* Vignette overlay for depth */}
          <div
            className="pointer-events-none absolute inset-0 z-10"
            style={{ background: "radial-gradient(ellipse at 50% 55%, transparent 38%, rgba(0,0,0,0.55) 100%)" }}
          />

          {/* Title — fades as you walk */}
          <div
            data-hud="title"
            className="pointer-events-none absolute inset-x-0 z-20 text-center"
            style={{ top: 64, opacity: 1 }}
          >
            <h1
              className="font-serif text-4xl font-light italic md:text-6xl"
              style={{ color: "#e8dcc8", textShadow: "0 2px 24px rgba(0,0,0,0.85)" }}
            >
              {piece.title}
            </h1>
            <p
              className="mt-3 font-serif italic text-sm"
              style={{ color: "rgba(232,220,200,0.6)" }}
            >
              Scroll to walk · 24 works
            </p>
          </div>

          {/* Scroll cue */}
          <div
            data-hud="cue"
            className="pointer-events-none absolute inset-x-0 bottom-12 z-20 flex flex-col items-center gap-2"
            style={{ opacity: 1 }}
          >
            <span
              className="font-mono text-[9px] tracking-[0.4em] uppercase animate-pulse"
              style={{ color: "#e8dcc8", textShadow: "0 1px 6px rgba(0,0,0,0.9)" }}
            >
              Walk forward
            </span>
            <div
              className="h-10 w-px"
              style={{ background: "linear-gradient(to bottom, rgba(232,220,200,0.85), transparent)" }}
            />
          </div>

          {/* Progress bar */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-px"
            style={{ background: "rgba(201,168,76,0.1)" }}
          >
            <div
              data-hud="progress"
              style={{
                height: "100%",
                width: "0%",
                background: "linear-gradient(to right, rgba(201,168,76,0.5), #c9a84c, rgba(201,168,76,0.5))",
              }}
            />
          </div>

          {/* Contact CTA is now anchored in 3D at the foot of the statue —
              see ContactCard inside CorridorScene */}

          {/* Keyboard hint */}
          <p
            className="font-mono text-[7px] tracking-widest pointer-events-none hidden md:block"
            style={{
              position: "absolute",
              bottom: 10,
              right: 16,
              color: "#2a4a38",
              opacity: 0.85,
              whiteSpace: "nowrap",
              zIndex: 20,
            }}
          >
            Up Down walk | Esc exit
          </p>
        </div>
      </div>

      {/* ── MODAL ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {active !== null && (() => {
          const activePainting =
            PAINTINGS.find((p) => p.id === lastActiveId.current) ?? PAINTINGS[0];
          const panel = PANELS[activePainting.panelIndex];
          return (
            <>
              <motion.div
                key="modal-bg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                onClick={() => setActive(null)}
                style={{
                  position: "fixed",
                  inset: 0,
                  zIndex: 58,
                  background: "rgba(6,14,10,0.92)",
                  backdropFilter: "blur(8px)",
                  cursor: "pointer",
                }}
              />
              <motion.div
                key="modal"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 28 }}
                transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
                style={{
                  position: "fixed",
                  inset: "3.5%",
                  zIndex: 59,
                  background: "linear-gradient(135deg, #07120d 0%, #0a1711 55%, #08110d 100%)",
                  border: "1px solid rgba(92,138,116,0.2)",
                  boxShadow: "0 28px 90px rgba(0,0,0,0.78)",
                  display: "flex",
                  overflow: "hidden",
                }}
                className="flex-col md:flex-row"
              >
                <button
                  onClick={() => setActive(null)}
                  style={{
                    position: "absolute",
                    top: 20,
                    right: 24,
                    zIndex: 10,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 8,
                    letterSpacing: "0.3em",
                    color: "#7aadad",
                    textTransform: "uppercase",
                  }}
                >
                  X Close
                </button>

                {/* Left — painting */}
                <div
                  style={{
                    flex: "0 0 65%",
                    position: "relative",
                    overflow: "hidden",
                    background: "linear-gradient(180deg, #0d1812 0%, #09120e 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "36px 30px 30px",
                  }}
                >
                  <Image
                    src={activePainting.src}
                    alt={`${panel.heading} - Painting ${activePainting.id}`}
                    width={activePainting.width}
                    height={activePainting.height}
                    draggable={false}
                    sizes="(max-width: 768px) 92vw, 65vw"
                    quality={85}
                    priority
                    style={{
                      width: "100%",
                      height: "100%",
                      maxWidth: "min(68vw, 1100px)",
                      maxHeight: "calc(100vh - 120px)",
                      objectFit: "contain",
                      objectPosition: "center center",
                      display: "block",
                      filter: "drop-shadow(0 30px 48px rgba(0,0,0,0.48))",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "radial-gradient(circle at center, rgba(255,244,220,0.05) 0%, rgba(9,19,15,0) 55%)",
                      pointerEvents: "none",
                    }}
                  />
                </div>

                {/* Right — details */}
                <div
                  style={{
                    flex: "0 0 35%",
                    padding: "48px 42px 44px",
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    minWidth: 0,
                    background:
                      "linear-gradient(180deg, rgba(6,20,14,0.98) 0%, rgba(7,25,17,0.96) 100%)",
                    borderLeft: "1px solid rgba(58,158,100,0.12)",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 1,
                      background: "rgba(201,168,76,0.4)",
                      marginBottom: 28,
                    }}
                  />
                  <h2
                    className="font-serif font-light"
                    style={{
                      fontSize: "clamp(24px, 3.5vw, 48px)",
                      color: "#e3d7c2",
                      lineHeight: 1.08,
                      marginBottom: 10,
                    }}
                  >
                    {activePainting.name}
                  </h2>
                  {activePainting.origin && (
                    <p
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 8,
                        letterSpacing: "0.22em",
                        color: "rgba(122,173,173,0.6)",
                        textTransform: "uppercase",
                        marginBottom: 28,
                      }}
                    >
                      Origins - {activePainting.origin}
                    </p>
                  )}
                  <div
                    style={{
                      height: 1,
                      background: "rgba(58,158,100,0.22)",
                      marginBottom: 24,
                    }}
                  />
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {activePainting.description.split("\n\n").map((para, i) => (
                      <p
                        key={i}
                        className="font-sans"
                        style={{
                          color: "#bdc7b6",
                          fontSize: "0.88rem",
                          lineHeight: 1.9,
                          maxWidth: 420,
                          margin: 0,
                        }}
                      >
                        {para.trim()}
                      </p>
                    ))}
                  </div>
                  <div
                    style={{
                      marginTop: 40,
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 12,
                    }}
                  >
                    {piece.panel.links?.slice(0, 1).map((l, i) => (
                      <a
                        key={i}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "11px 20px",
                          border: "1px solid rgba(201,168,76,0.42)",
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 8,
                          letterSpacing: "0.24em",
                          color: "#c9a84c",
                          textTransform: "uppercase",
                          textDecoration: "none",
                          background: "rgba(201,168,76,0.06)",
                        }}
                      >
                        {l.label} <span style={{ fontSize: 7 }}>-&gt;</span>
                      </a>
                    ))}
                    <Link
                      href="/contact"
                      onClick={() => setActive(null)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "11px 20px",
                        border: "1px solid rgba(58,158,100,0.4)",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 8,
                        letterSpacing: "0.24em",
                        color: "#8ebea0",
                        textTransform: "uppercase",
                        textDecoration: "none",
                        background: "rgba(58,158,100,0.06)",
                      }}
                    >
                      Contact <span style={{ fontSize: 7 }}>-&gt;</span>
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
