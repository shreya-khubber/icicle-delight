"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import HamburgerMenu from "@/components/HamburgerMenu";
import { galleryPieces } from "@/data/galleryData";

// ── Project data ──────────────────────────────────────────────────────────────

type Status = "SHIPPED" | "BUILDING" | "BLUEPRINTING" | "LIVE";

const STATUS_COLOR: Record<Status, string> = {
  SHIPPED:      "#4AE09A",
  BUILDING:     "#C87828",
  BLUEPRINTING: "#7090D0",
  LIVE:         "#4AE09A",
};

type Project = {
  n: string;
  name: string;
  status: Status;
  what: string;
  note?: string;
  link?: { label: string; href: string };
};

const PROJECTS: Project[] = [
  {
    n: "01",
    name: "Sparky Dumb Charades",
    status: "SHIPPED",
    what: "A jailbreaking game. You get a word - you have to prompt the AI so it says that word in its answer. The game is the constraint. 25 people played it. The most interesting thing: people got more interested in the jailbreaking mechanic than the game itself.",
    note: "First project. Deliberately very basic.",
    link: { label: "sparkydumbcharades.lovable.app", href: "https://sparkydumbcharades.lovable.app" },
  },
  {
    n: "02",
    name: "MindKraft Studio",
    status: "BUILDING",
    what: "A homework studio for therapists and psychologists. They upload and edit templates, organise everything in one place, and share editable links with patients - not a Word doc sent over email. There's a community layer too: practitioners can access each other's templates and build on them.",
    note: "Wireframe ready. Perfecting the canvas.",
  },
  {
    n: "03",
    name: "Formili",
    status: "BUILDING",
    what: "AI moodboard for brand strategists - solo practitioners, small agencies, anyone ideating on how a brand should look. You give it a brief, it finds relevant competitors, reads their design DNA, and helps you curate a brand kit. The next layer is brand enforcement: using AI to roll the brand out consistently across assets and channels.",
    note: "Moodboard built. Working on kit creation and the enforcement layer.",
  },
  {
    n: "04",
    name: "Toto",
    status: "BLUEPRINTING",
    what: "An AI that helps internal teams navigate tools and resolve tickets without pre-configured workflows. Imagine you're stuck somewhere in a product - a clicky cursor finds your way. Based on Farza's Clicky. The goal is an AI that works on unconfigured pages with baseline knowledge and learns as it goes, beating the era of companies having to hand-hold every user journey in advance.",
    note: "Not started yet. Thinking through it.",
  },
  {
    n: "05",
    name: "Icicle",
    status: "LIVE",
    what: "This. A portfolio that's also a gallery - each section has its own room. Built in Next.js with Framer Motion, more Tailwind than is strictly healthy, and a fair amount of Claude Code. Took about a month.",
    note: "You're here.",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BuilderPage() {
  const router = useRouter();
  const ci        = galleryPieces.findIndex((p) => p.id === "projects");
  const nextPiece = galleryPieces[(ci + 1) % galleryPieces.length];
  const prevPiece = galleryPieces[(ci - 1 + galleryPieces.length) % galleryPieces.length];

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape")     router.push("/");
      if (e.key === "ArrowRight") router.push(`/gallery/${nextPiece.id}`);
      if (e.key === "ArrowLeft")  router.push(`/gallery/${prevPiece.id}`);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [router, nextPiece, prevPiece]);

  return (
    <main
      className="fixed inset-0 overflow-auto"
      style={{ background: "#0c0a08" }}
    >
      {/* Graph-paper grid */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(200,140,60,0.045) 1px, transparent 1px),
          linear-gradient(90deg, rgba(200,140,60,0.045) 1px, transparent 1px)
        `,
        backgroundSize: "52px 52px",
      }} />

      <HamburgerMenu />

      {/* Nav */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 30,
        height: 40, display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 40px", paddingRight: 72,
        background: "rgba(12,10,8,0.97)", borderBottom: "1px solid rgba(200,112,32,0.14)",
      }}>
        <Link href="/" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "#6A5438", textDecoration: "none" }}>
          &lt;- Icicle
        </Link>
        <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "#6A5438" }}>
          No. II · The Builder
        </p>
        <div style={{ display: "flex", gap: 24 }}>
          <Link href={`/gallery/${prevPiece.id}`} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6A5438", textDecoration: "none" }}>
            &lt;- Prev
          </Link>
          <Link href={`/gallery/${nextPiece.id}`} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6A5438", textDecoration: "none" }}>
            Next -&gt;
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 sm:px-10" style={{ position: "relative", zIndex: 1, paddingTop: 88, paddingBottom: 100, maxWidth: 760, margin: "0 auto" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          style={{ marginBottom: 72 }}
        >
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.38em", color: "rgba(200,112,32,0.5)", textTransform: "uppercase", marginBottom: 18 }}>
            No. II - The Builder
          </p>
          <h1 style={{ fontFamily: "'Editorial New',Georgia,serif", fontSize: "clamp(38px,5.5vw,68px)", color: "#EAE2D2", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.01em", marginBottom: 22 }}>
            Things I&apos;m building.
          </h1>
          <div style={{ width: 44, height: 1, background: "rgba(200,112,32,0.45)", marginBottom: 22 }} />
          <p style={{ fontFamily: "'Neue Montreal','system-ui',sans-serif", fontSize: 16, color: "rgba(234,226,210,0.48)", lineHeight: 1.72, maxWidth: 460 }}>
            Mostly vibe-coded. Some market research. All real problems.
          </p>
        </motion.div>

        {/* Project list */}
        <div>
          {PROJECTS.map((proj, i) => {
            const col = STATUS_COLOR[proj.status];
            return (
              <motion.div
                key={proj.n}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.12 + i * 0.08, ease: [0.76, 0, 0.24, 1] }}
                style={{ borderTop: "1px solid rgba(200,112,32,0.13)", padding: "40px 0" }}
              >
                {/* Row: number + name + status */}
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 22, flexWrap: "wrap", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, color: "rgba(200,112,32,0.35)", letterSpacing: "0.18em", flexShrink: 0 }}>
                      {proj.n}
                    </span>
                    <h2 style={{ fontFamily: "'Editorial New',Georgia,serif", fontSize: "clamp(22px,2.8vw,32px)", color: "#EAE2D2", fontWeight: 400, fontStyle: "italic", letterSpacing: "0.01em", lineHeight: 1.1 }}>
                      {proj.name}
                    </h2>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, flexShrink: 0 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: col, flexShrink: 0 }} />
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8.5, letterSpacing: "0.22em", color: col, textTransform: "uppercase" }}>
                      {proj.status}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p style={{ fontFamily: "'Neue Montreal','system-ui',sans-serif", fontSize: 15, color: "rgba(234,226,210,0.6)", lineHeight: 1.75, marginBottom: 20, maxWidth: 640 }}>
                  {proj.what}
                </p>

                {/* Footer meta */}
                <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
                  {proj.note && (
                    <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8.5, letterSpacing: "0.18em", color: "rgba(200,112,32,0.42)", textTransform: "uppercase" }}>
                      {proj.note}
                    </p>
                  )}
                  {proj.link && (
                    <a
                      href={proj.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8.5, letterSpacing: "0.16em", color: "rgba(200,112,32,0.7)", textTransform: "uppercase", textDecoration: "none", display: "flex", alignItems: "center", gap: 5 }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#C87828"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(200,112,32,0.7)"}
                    >
                      {proj.link.label} ↗
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}

          {/* Closing border */}
          <div style={{ borderTop: "1px solid rgba(200,112,32,0.13)" }} />
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          style={{ marginTop: 88 }}
        >
          <p style={{ fontFamily: "'Editorial New',Georgia,serif", fontSize: "clamp(18px,2.2vw,26px)", color: "rgba(234,226,210,0.55)", fontStyle: "italic", fontWeight: 400, lineHeight: 1.55, marginBottom: 32 }}>
            If you want to talk about any of this -
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 36, flexWrap: "wrap" }}>
            <Link
              href="/contact"
              style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#C87828", textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "0.75"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
            >
              Get in touch →
            </Link>
            <a
              href="https://github.com/shreya-khubber"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(200,112,32,0.45)", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "rgba(200,112,32,0.75)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(200,112,32,0.45)"}
            >
              github.com/shreya-khubber ↗
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
