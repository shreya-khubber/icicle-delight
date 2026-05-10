"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import HamburgerMenu from "@/components/HamburgerMenu";
import Artwork from "@/components/Artwork";
import { galleryPieces } from "@/data/galleryData";

// ── Section backgrounds (each is the full image — text overlays on top) ──
const BG_HERO      = "/backgrounds/hero.jpg";
const BG_EXHIBITS  = "/backgrounds/exhibits.jpg";
const BG_SPEAKEASY = "/backgrounds/speakeasy.jpg";

// ── Reusable text-shadow recipe used over the dark sky/space backgrounds ──
const SHADOW = "0 2px 12px rgba(0,8,24,0.7), 0 1px 3px rgba(0,8,24,0.5)";
const SHADOW_SOFT = "0 1px 6px rgba(0,8,24,0.6)";

export default function Home() {
  return (
    <main className="relative h-screen overflow-hidden bg-[#070d1a]">
      {/* The doorknob hamburger — fixed, on top of everything */}
      <HamburgerMenu />

      {/* Snap-scroll container. Sections inside each carry their own
          background image. Mobile gets gentle proximity snap; desktop
          gets crisp mandatory snap. */}
      <div
        className="relative z-10 h-screen overflow-y-scroll overflow-x-hidden snap-y snap-proximity md:snap-mandatory"
        style={{ scrollBehavior: "smooth", WebkitOverflowScrolling: "touch" }}
      >
        <HeroSection />
        <ExhibitsSection />
        <SpeakeasySection />
      </div>
    </main>
  );
}

// ── Section 1: HERO ──────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      className="min-h-screen md:h-screen snap-start relative flex flex-col items-center justify-center px-6 py-24 md:py-0"
      style={{
        backgroundImage: `url(${BG_HERO})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Subtle dark scrim — keeps text legible across all bg variations */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(7,13,26,0.18) 0%, rgba(7,13,26,0.05) 35%, rgba(7,13,26,0) 60%, rgba(7,13,26,0.25) 100%)",
        }}
      />

      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.1 }}
        className="relative text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
          className="font-serif font-light"
          style={{
            fontSize: "clamp(4.5rem, 13vw, 11rem)",
            letterSpacing: "-0.02em",
            color: "#ffffff",
            lineHeight: 1,
            textShadow: "0 6px 32px rgba(0,8,24,0.55), 0 1px 4px rgba(0,8,24,0.4)",
          }}
        >
          Icicle
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="h-px w-28 mx-auto mt-6 mb-5 origin-left"
          style={{
            background: "linear-gradient(to right, transparent, rgba(255,255,255,0.85), transparent)",
            boxShadow: "0 0 12px rgba(255,255,255,0.35)",
          }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-serif italic text-lg sm:text-xl"
          style={{ color: "#ffffff", textShadow: SHADOW }}
        >
          Shreya Khubber
        </motion.p>
      </motion.header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="relative text-center mt-10 px-4"
      >
        <p
          className="font-serif italic text-base sm:text-lg max-w-md mx-auto leading-relaxed"
          style={{ color: "rgba(255,255,255,0.92)", textShadow: SHADOW }}
        >
          &ldquo;Each work is a window into a different room of the same mind.
          Begin anywhere.&rdquo;
        </p>
      </motion.div>

      <motion.a
        href="#exhibits"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="relative mt-12 group inline-flex items-center gap-3"
        style={{
          padding: "14px 32px",
          border: "1px solid rgba(255,255,255,0.55)",
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(6px)",
          color: "#ffffff",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          textShadow: SHADOW_SOFT,
          transition: "background 250ms ease, border-color 250ms ease, transform 250ms ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.14)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.85)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.06)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.55)";
        }}
      >
        Explore my world
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </motion.a>
    </section>
  );
}

// ── Section 2: EXHIBITS ──────────────────────────────────────────────────

function ExhibitsSection() {
  return (
    <section
      id="exhibits"
      className="min-h-screen md:h-screen snap-start relative flex flex-col items-center justify-center px-6 py-20 md:py-16"
      style={{
        backgroundImage: `url(${BG_EXHIBITS})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(7,13,26,0.5) 0%, rgba(7,13,26,0.2) 35%, rgba(7,13,26,0) 65%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="relative w-full max-w-6xl mb-10 md:mb-14"
      >
        <div className="flex items-center gap-5">
          <div className="h-px bg-white/40 flex-1" />
          <p
            className="text-[10px] sm:text-[11px] tracking-[0.32em] uppercase font-mono whitespace-nowrap"
            style={{ color: "#ffffff", textShadow: SHADOW }}
          >
            Exhibits to my life
          </p>
          <div className="h-px bg-white/40 flex-1" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
        className="relative w-full max-w-[1500px] mx-auto"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-7 lg:gap-8">
          {galleryPieces.map((piece, i) => (
            <ExhibitCard key={piece.id} piece={piece} index={i} />
          ))}
        </div>
      </motion.div>

    </section>
  );
}

function ExhibitCard({
  piece,
  index,
}: {
  piece: (typeof galleryPieces)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.7, delay: 0.25 + index * 0.08, ease: [0.76, 0, 0.24, 1] }}
    >
      <Link
        href={piece.id === "art" ? "/gallery/art/corridor" : `/gallery/${piece.id}`}
        className="group block"
      >
        <div
          className="relative overflow-hidden transition-all duration-500"
          style={{
            background: "rgba(10,16,32,0.45)",
            border: "1px solid rgba(255,255,255,0.16)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div className="aspect-square overflow-hidden bg-[#0a1020]">
            <Artwork type={piece.artworkType} />
          </div>
          {/* Hover spotlight */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(255,252,235,0.15) 0%, transparent 65%)",
            }}
          />
        </div>

        <div className="mt-3 sm:mt-4 px-1">
          <h3
            className="font-serif text-base sm:text-lg leading-tight group-hover:text-white transition-colors duration-300"
            style={{ color: "#ffffff", textShadow: SHADOW }}
          >
            {piece.title}
          </h3>
          <p
            className="font-serif italic text-xs sm:text-[13px] mt-1 leading-snug"
            style={{ color: "rgba(255,255,255,0.7)", textShadow: SHADOW_SOFT }}
          >
            {piece.subtitle}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

// ── Section 3: SPEAKEASY ─────────────────────────────────────────────────

function SpeakeasySection() {
  return (
    <section
      id="speakeasy"
      className="min-h-screen md:h-screen snap-start relative flex flex-col px-6 md:px-12 lg:px-20 py-16 md:py-12"
      style={{
        backgroundImage: `url(${BG_SPEAKEASY})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Edge scrim — keeps text legible while the doorway in the middle
          stays bright */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(7,13,26,0.65) 0%, rgba(7,13,26,0.15) 30%, rgba(7,13,26,0) 50%, rgba(7,13,26,0.15) 70%, rgba(7,13,26,0.65) 100%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="relative flex-1 flex items-center w-full max-w-[1400px] mx-auto"
      >
        {/* Intro — sits on the left, the rest of the section shows the
            doorway through the background image. */}
        <div className="max-w-md md:max-w-lg">
          <p
            className="font-mono text-[10px] tracking-[0.4em] uppercase mb-5"
            style={{ color: "rgba(214,178,111,0.85)", textShadow: SHADOW_SOFT }}
          >
            Speakeasy
          </p>
          <h2
            className="font-serif font-light leading-[1.05]"
            style={{
              fontSize: "clamp(2.4rem, 4.6vw, 4rem)",
              color: "#ffffff",
              textShadow: "0 4px 22px rgba(0,8,24,0.7), 0 1px 3px rgba(0,8,24,0.5)",
            }}
          >
            The Everything
            <br />
            Else
          </h2>
          <Link
            href="/lounge"
            className="group inline-flex items-center gap-3 mt-8"
            style={{
              padding: "12px 28px",
              border: "1px solid rgba(214,178,111,0.7)",
              background: "rgba(20,16,8,0.55)",
              backdropFilter: "blur(6px)",
              color: "#e8c878",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              transition: "background 250ms ease, border-color 250ms ease, color 250ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(40,28,12,0.75)";
              e.currentTarget.style.borderColor = "rgba(232,200,120,0.95)";
              e.currentTarget.style.color = "#ffe49c";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(20,16,8,0.55)";
              e.currentTarget.style.borderColor = "rgba(214,178,111,0.7)";
              e.currentTarget.style.color = "#e8c878";
            }}
          >
            Step inside
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </motion.div>

      {/* Footer — social links pinned to bottom */}
      <div className="relative pt-10 mt-6 border-t border-white/10">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {[
            { label: "Email", href: "mailto:shreya.khubber@gmail.com" },
            { label: "LinkedIn", href: "https://linkedin.com/in/shreya-khubber" },
            { label: "GitHub", href: "https://github.com/shreya-khubber" },
            { label: "Instagram", href: "https://www.instagram.com/migratinglife/" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="font-mono text-[10px] tracking-[0.3em] uppercase transition-colors duration-200"
              style={{
                color: "rgba(255,255,255,0.6)",
                textShadow: SHADOW_SOFT,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(232,200,120,0.95)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
