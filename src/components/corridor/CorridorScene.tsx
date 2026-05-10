"use client";

import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { useTexture, Html, Preload } from "@react-three/drei";
import * as THREE from "three";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { PAINTINGS, type PaintingDef } from "@/data/corridorPaintings";

// World units: ~1 unit ≈ 1 meter
const CORRIDOR_LENGTH = 60;
const CORRIDOR_WIDTH = 4;
const WALL_HEIGHT = 3.4;
const FIRST_Z = -2.5;
const LAST_Z = -(CORRIDOR_LENGTH - 4);
const EYE_HEIGHT = WALL_HEIGHT * 0.45;

// Hit Next.js image optimizer for a small variant per painting (~120KB each).
// Width must be in next.config.js images.deviceSizes / imageSizes — 640 is the
// default device size that produces a usable texture for these planes.
const optimized = (src: string, w = 640) =>
  `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=75`;

// ── Walls ──────────────────────────────────────────────────────────────────

function Walls() {
  const cz = -CORRIDOR_LENGTH / 2;
  return (
    <group>
      {/* Floor — keep warm tan */}
      <mesh position={[0, 0, cz]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[CORRIDOR_WIDTH, CORRIDOR_LENGTH]} />
        <meshStandardMaterial color="#6b5a3e" roughness={0.92} metalness={0.05} />
      </mesh>
      {/* Ceiling */}
      <mesh position={[0, WALL_HEIGHT, cz]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[CORRIDOR_WIDTH, CORRIDOR_LENGTH]} />
        <meshStandardMaterial
          color="#0e1a20"
          roughness={0.98}
          emissive="#0a1620"
          emissiveIntensity={0.55}
        />
      </mesh>
      {/* Left wall — deep teal */}
      <mesh position={[-CORRIDOR_WIDTH / 2, WALL_HEIGHT / 2, cz]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[CORRIDOR_LENGTH, WALL_HEIGHT]} />
        <meshStandardMaterial
          color="#1e4456"
          roughness={0.9}
          emissive="#0e2632"
          emissiveIntensity={0.5}
        />
      </mesh>
      {/* Right wall — deep teal */}
      <mesh position={[CORRIDOR_WIDTH / 2, WALL_HEIGHT / 2, cz]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[CORRIDOR_LENGTH, WALL_HEIGHT]} />
        <meshStandardMaterial
          color="#1e4456"
          roughness={0.9}
          emissive="#0e2632"
          emissiveIntensity={0.5}
        />
      </mesh>
      {/* Back wall — slightly darker teal */}
      <mesh position={[0, WALL_HEIGHT / 2, -CORRIDOR_LENGTH]}>
        <planeGeometry args={[CORRIDOR_WIDTH, WALL_HEIGHT]} />
        <meshStandardMaterial
          color="#143544"
          roughness={0.88}
          emissive="#0a1e28"
          emissiveIntensity={0.55}
        />
      </mesh>
      {/* Larger halo behind statue */}
      <mesh position={[0, WALL_HEIGHT * 0.46, -CORRIDOR_LENGTH + 0.02]}>
        <circleGeometry args={[1.85, 48]} />
        <meshBasicMaterial color="#c9a84c" transparent opacity={0.22} />
      </mesh>
      {/* Inner brighter halo for focal punch */}
      <mesh position={[0, WALL_HEIGHT * 0.46, -CORRIDOR_LENGTH + 0.03]}>
        <circleGeometry args={[1.05, 48]} />
        <meshBasicMaterial color="#e8c878" transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

// ── Painting ───────────────────────────────────────────────────────────────

function Painting({
  painting, position, rotation, onOpen,
}: {
  painting: PaintingDef;
  position: [number, number, number];
  rotation: [number, number, number];
  onOpen: () => void;
}) {
  const texture = useTexture(optimized(painting.src, 640));

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.needsUpdate = true;
  }, [texture]);

  const ratio = painting.width / painting.height;
  const baseH = 1.0;
  // Cap absurdly wide aspects so a single painting can't dominate
  const cappedRatio = Math.min(ratio, 1.6);
  const w = baseH * cappedRatio;
  const h = baseH;
  const frame = 0.06;

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onOpen();
  };

  return (
    <group position={position} rotation={rotation}>
      {/* Outer gold frame */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[w + frame * 2, h + frame * 2]} />
        <meshStandardMaterial color="#c9a84c" roughness={0.32} metalness={0.85} />
      </mesh>
      {/* Inner dark mat */}
      <mesh position={[0, 0, -0.005]}>
        <planeGeometry args={[w + frame * 0.6, h + frame * 0.6]} />
        <meshStandardMaterial color="#0e1814" roughness={0.9} />
      </mesh>
      {/* Painting surface — basic material so warm ceiling lights don't
          tint the artwork. toneMapped=false preserves the painter's
          intended contrast through the ACES output transform. */}
      <mesh
        onClick={handleClick}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "default")}
      >
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Paintings({ onOpen }: { onOpen: (id: number) => void }) {
  const positioned = useMemo(() => {
    return PAINTINGS.map((p, i) => {
      const t = i / (PAINTINGS.length - 1);
      const z = FIRST_Z + t * (LAST_Z - FIRST_Z);
      const isLeft = p.side === "left";
      // Push painting centers further into the corridor so the rotated frame
      // doesn't clip the wall when tilted.
      const x = isLeft ? -CORRIDOR_WIDTH / 2 + 0.42 : CORRIDOR_WIDTH / 2 - 0.42;
      // Tilt ~35° inward — matches the original CSS scene's painting angle
      const ry = isLeft ? Math.PI / 2 - 0.61 : -Math.PI / 2 + 0.61;
      const y = EYE_HEIGHT * 1.05;
      return {
        painting: p,
        position: [x, y, z] as [number, number, number],
        rotation: [0, ry, 0] as [number, number, number],
      };
    });
  }, []);

  return (
    <>
      {positioned.map((p) => (
        <Painting
          key={p.painting.id}
          painting={p.painting}
          position={p.position}
          rotation={p.rotation}
          onOpen={() => onOpen(p.painting.id)}
        />
      ))}
    </>
  );
}

// ── Lighting ───────────────────────────────────────────────────────────────

function Lighting() {
  const lightCount = 13;
  const lights = useMemo(() => Array.from({ length: lightCount }, (_, i) => {
    const t = i / (lightCount - 1);
    return FIRST_Z - 1 + t * (LAST_Z - FIRST_Z + 2);
  }), []);

  return (
    <>
      <ambientLight intensity={0.55} color="#b6d2c6" />
      <hemisphereLight args={["#5a7b6c", "#2a1a08", 0.7]} />
      {lights.map((z, i) => (
        <group key={i} position={[0, WALL_HEIGHT - 0.02, z]}>
          <pointLight
            color="#ffe49c"
            intensity={14}
            distance={9}
            decay={1.7}
          />
          {/* Visible bright disc on the ceiling */}
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
            <circleGeometry args={[0.22, 24]} />
            <meshBasicMaterial color="#fff0c4" />
          </mesh>
        </group>
      ))}
      {/* Statue accent */}
      <pointLight
        position={[0, WALL_HEIGHT * 0.55, -CORRIDOR_LENGTH + 1.6]}
        color="#ffe49c"
        intensity={10}
        distance={6}
        decay={1.6}
      />
    </>
  );
}

// ── Statue ─────────────────────────────────────────────────────────────────

function Statue() {
  const tex = useTexture("/corridor/statue.webp");
  useEffect(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
  }, [tex]);

  const pedestalHeight = 0.35;
  const pedestalRadius = 0.7;
  const statueZ = -CORRIDOR_LENGTH + 0.55;

  return (
    <group>
      {/* Pedestal — short stone cylinder grounding the statue */}
      <mesh position={[0, pedestalHeight / 2, statueZ]}>
        <cylinderGeometry args={[pedestalRadius, pedestalRadius * 1.05, pedestalHeight, 24]} />
        <meshStandardMaterial color="#2a3a3e" roughness={0.85} metalness={0.1} />
      </mesh>
      {/* Top trim of pedestal */}
      <mesh position={[0, pedestalHeight + 0.02, statueZ]}>
        <cylinderGeometry args={[pedestalRadius * 1.04, pedestalRadius * 1.04, 0.04, 24]} />
        <meshStandardMaterial color="#3e5258" roughness={0.7} metalness={0.2} />
      </mesh>
      {/* Statue plate — sits on the pedestal */}
      <mesh position={[0, pedestalHeight + 1.05, statueZ - 0.05]}>
        <planeGeometry args={[1.5, 2.1]} />
        <meshBasicMaterial map={tex} transparent depthWrite={false} />
      </mesh>
    </group>
  );
}

// ── Contact card at the base of the statue ────────────────────────────────

function ContactCard({ onContact }: { onContact: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useFrame(() => {
    if (!ref.current) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? window.scrollY / max : 0;
    const show = p > 0.82;
    ref.current.style.opacity = show ? "1" : "0";
    ref.current.style.pointerEvents = show ? "auto" : "none";
    ref.current.style.transform = show ? "translateY(0)" : "translateY(12px)";
  });

  return (
    <Html
      position={[0, 0.05, -CORRIDOR_LENGTH + 2.4]}
      center
      transform
      distanceFactor={2}
      occlude={false}
    >
      <div
        ref={ref}
        style={{
          opacity: 0,
          pointerEvents: "none",
          transition: "opacity 700ms ease, transform 700ms ease",
        }}
      >
        <button
          onClick={onContact}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            padding: "20px 60px",
            border: "1px solid rgba(201,168,76,0.7)",
            background: "rgba(8,18,22,0.92)",
            backdropFilter: "blur(6px)",
            cursor: "pointer",
            boxShadow: "0 0 50px rgba(201,168,76,0.25), inset 0 0 0 1px rgba(201,168,76,0.15)",
            transition: "box-shadow 250ms ease, transform 250ms ease",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow =
              "0 0 70px rgba(201,168,76,0.45), inset 0 0 0 1px rgba(201,168,76,0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow =
              "0 0 50px rgba(201,168,76,0.25), inset 0 0 0 1px rgba(201,168,76,0.15)";
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 16,
              letterSpacing: "0.4em",
              color: "#d4b878",
              textTransform: "uppercase",
            }}
          >
            Contact
          </span>
          <span style={{ fontSize: 16, color: "rgba(201,168,76,0.85)" }}>-&gt;</span>
        </button>
      </div>
    </Html>
  );
}

// ── Latin quote on back wall — HTML overlay so it inherits site fonts ─────

function BackWallText() {
  return (
    <Html
      position={[0, WALL_HEIGHT * 0.82, -CORRIDOR_LENGTH + 0.05]}
      center
      transform
      distanceFactor={2.4}
      occlude={false}
      style={{ pointerEvents: "none", userSelect: "none" }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', 'Editorial New', serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "44px",
            color: "#c9a84c",
            letterSpacing: "0.08em",
            whiteSpace: "nowrap",
            margin: 0,
            textShadow: "0 2px 10px rgba(0,0,0,0.95), 0 0 24px rgba(201,168,76,0.25)",
          }}
        >
          Audentes Fortuna Iuvat
        </p>
        <div
          style={{
            height: 1,
            width: 220,
            background: "linear-gradient(to right, transparent, rgba(201,168,76,0.6), transparent)",
          }}
        />
      </div>
    </Html>
  );
}

// ── Scroll-driven camera ───────────────────────────────────────────────────

function ScrollCamera() {
  const { camera } = useThree();
  const targetZ = useRef(0);

  useFrame(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? window.scrollY / max : 0;
    targetZ.current = 0.2 - p * (CORRIDOR_LENGTH - 5);
    // ease toward target so scroll feels smoother
    camera.position.z += (targetZ.current - camera.position.z) * 0.12;
    camera.position.y = EYE_HEIGHT;
    camera.position.x = 0;
    // Force camera to look horizontally forward — defends against any default
    // lookAt(0,0,0) the renderer might apply, which would tilt the view down
    // toward the floor and produce an all-brown frame.
    camera.lookAt(0, EYE_HEIGHT, camera.position.z - 1);
  });

  return null;
}

// ── Top-level scene ────────────────────────────────────────────────────────

export default function CorridorScene({
  onOpen,
  onContact,
}: {
  onOpen: (id: number) => void;
  onContact: () => void;
}) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, EYE_HEIGHT, 0.2], fov: 62, near: 0.1, far: 80 }}
      style={{ width: "100%", height: "100%", display: "block" }}
      onCreated={({ gl }) => {
        // three 0.184 renamed outputEncoding → outputColorSpace; R3F 8 doesn't
        // auto-set it, so without this the whole scene renders ~2x too dark.
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.2;
      }}
    >
      <color attach="background" args={["#0a1410"]} />
      <fog attach="fog" args={["#0a1410", 10, 42]} />

      {/* Walls + lighting render IMMEDIATELY (no async deps).
          Suspense only blocks the texture-dependent meshes. */}
      <Walls />
      <Lighting />

      <Suspense fallback={null}>
        <Statue />
        <BackWallText />
        <ContactCard onContact={onContact} />
        <Paintings onOpen={onOpen} />
        <Preload all />
      </Suspense>

      <ScrollCamera />
    </Canvas>
  );
}
