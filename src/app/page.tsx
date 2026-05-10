"use client";

import { motion } from "framer-motion";
import GalleryFrame from "@/components/GalleryFrame";
import GalleryRoom from "@/components/GalleryRoom";
import GalleryCeiling from "@/components/GalleryCeiling";
import HamburgerMenu from "@/components/HamburgerMenu";
import SpeakeasyDoor from "@/components/SpeakeasyDoor";
import { galleryPieces } from "@/data/galleryData";

export default function Home() {
  return (
    <main className="relative h-screen overflow-hidden">
      {/* Fixed background layers — outside the scroll container so they
          don't move with snap scrolling */}
      <GalleryCeiling />
      <HamburgerMenu />
      <GalleryRoom />

      {/* Snap-scroll container. Snap is mandatory on desktop (where mouse
          wheels and trackpads play nicely with it) and proximity on mobile
          (where iOS Safari's momentum scroll fights mandatory snap and
          feels janky). scroll-smooth gives the eased transition. */}
      <div
        className="relative z-10 h-screen overflow-y-scroll overflow-x-hidden snap-y snap-proximity md:snap-mandatory"
        style={{ scrollBehavior: "smooth", WebkitOverflowScrolling: "touch" }}
      >
        {/* ── Section 1: HERO ─────────────────────────────────────────── */}
        <section className="min-h-screen md:h-screen snap-start flex flex-col items-center justify-center px-8">
          <motion.header
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className="font-serif font-light mb-3"
              style={{
                fontSize: "clamp(4.5rem, 13vw, 10rem)",
                letterSpacing: "-0.02em",
                color: "#ffffff",
                lineHeight: 1,
                textShadow: "0 4px 24px rgba(0,12,32,0.55), 0 1px 4px rgba(0,12,32,0.45)",
              }}
            >
              Icicle
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="h-px bg-g-ice w-28 mx-auto mb-4 origin-left"
              style={{ boxShadow: "0 0 12px rgba(168,205,216,0.6)" }}
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="font-serif text-lg italic"
              style={{
                color: "#ffffff",
                textShadow: "0 2px 10px rgba(0,12,32,0.7), 0 1px 2px rgba(0,12,32,0.5)",
              }}
            >
              Shreya Khubber
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="font-mono text-[10px] sm:text-[11px] tracking-[0.3em] uppercase mt-2"
              style={{
                color: "rgba(255,255,255,0.92)",
                textShadow: "0 2px 8px rgba(0,12,32,0.75), 0 0 2px rgba(0,12,32,0.6)",
              }}
            >
              Finance · Code · Art · Writing · Ideas
            </motion.p>
          </motion.header>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="text-center px-8 mt-12"
          >
            <p
              className="font-serif text-base sm:text-lg italic max-w-md mx-auto leading-relaxed"
              style={{
                color: "#ffffff",
                textShadow: "0 2px 12px rgba(0,12,32,0.75), 0 1px 3px rgba(0,12,32,0.5)",
              }}
            >
              &ldquo;Each work is a window into a different room of the same mind.
              Begin anywhere.&rdquo;
            </p>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span
              className="font-mono text-[9px] tracking-[0.4em] uppercase animate-pulse"
              style={{
                color: "#ffffff",
                textShadow: "0 1px 6px rgba(0,12,32,0.85)",
              }}
            >
              Scroll
            </span>
            <div
              className="h-10 w-px"
              style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.95), transparent)" }}
            />
          </motion.div>
        </section>

        {/* ── Section 2: EXHIBITS ─────────────────────────────────────── */}
        <section className="min-h-screen md:h-screen snap-start flex flex-col items-center justify-center px-8 pt-20 md:pt-24 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="w-full max-w-6xl mb-10 px-2"
          >
            <div className="flex items-center gap-5">
              <div className="h-px bg-white/80 flex-1" style={{ boxShadow: "0 0 8px rgba(255,255,255,0.4)" }} />
              <p
                id="collection"
                className="text-[10px] sm:text-[11px] tracking-[0.28em] uppercase font-mono font-semibold whitespace-nowrap"
                style={{
                  color: "#ffffff",
                  textShadow: "0 2px 8px rgba(0,12,32,0.8), 0 0 2px rgba(0,12,32,0.6)",
                }}
              >
                exhibits to my life
              </p>
              <div className="h-px bg-white/80 flex-1" style={{ boxShadow: "0 0 8px rgba(255,255,255,0.4)" }} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
            className="w-full px-4 md:px-10 lg:px-16"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10 lg:gap-12 w-full max-w-[1500px] mx-auto">
              {galleryPieces.map((piece, i) => (
                <GalleryFrame key={piece.id} piece={piece} index={i} />
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Section 3: SPEAKEASY ────────────────────────────────────── */}
        <section className="min-h-screen md:h-screen snap-start relative">
          {/* Door anchored so its base (the step) lands exactly on the
              floor seam (the floor band starts at 28% from the bottom in
              GalleryRoom). The 56px offset compensates for the
              "The Speakeasy / After Hours →" label that lives inside
              SpeakeasyDoor below the SVG, so the SVG's step is right at
              the seam — door visually stands on the floor. */}
          <div
            className="absolute left-1/2 -translate-x-1/2"
            style={{ bottom: "calc(28% - 56px)" }}
          >
            <SpeakeasyDoor />
          </div>

          {/* Footer links — pinned to the very bottom, sitting on the floor */}
          <div className="absolute left-0 right-0 bottom-6 flex items-center justify-center gap-8">
            {[
              { label: "Email", href: "mailto:shreya.khubber@gmail.com" },
              { label: "LinkedIn", href: "https://linkedin.com/in/shreya-khubber" },
              { label: "GitHub", href: "https://github.com/shreya-khubber" },
              { label: "Instagram", href: "https://www.instagram.com/migratinglife/" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-g-mid hover:text-g-ice text-[9px] tracking-[0.2em] uppercase font-mono transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
