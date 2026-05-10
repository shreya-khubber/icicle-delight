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
    <main className="min-h-screen relative flex flex-col">
      {/* Fixed layers */}
      <GalleryCeiling />
      <HamburgerMenu />

      {/* Background room — z-0 */}
      <GalleryRoom />

      {/* Page content — z-10 */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* ── HERO ── */}
        <section className="relative flex flex-col" style={{ paddingTop: 112 }}>

          <motion.header
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="text-center px-8 pb-8"
          >
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className="font-serif font-light mb-3"
              style={{
                fontSize: "clamp(5.5rem, 13vw, 10rem)",
                letterSpacing: "-0.02em",
                color: "#ffffff",
                lineHeight: 1,
              }}
            >
              Icicle
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="h-px bg-g-ice w-28 mx-auto mb-4 origin-left"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="font-serif text-lg italic"
              style={{ color: "rgba(255,255,255,0.88)" }}
            >
              Shreya Khubber
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="font-mono text-[10px] tracking-[0.3em] uppercase mt-1"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              Finance · Code · Art · Writing · Ideas
            </motion.p>
          </motion.header>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="text-center px-8 mb-14"
          >
            <p className="font-serif text-base italic max-w-sm mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.82)" }}>
              &ldquo;Each work is a window into a different room of the same mind.
              Begin anywhere.&rdquo;
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="px-10 md:px-20 mb-12"
          >
            <div className="flex items-center gap-5">
              <div className="h-px bg-white/60 flex-1" />
              <p id="collection" className="text-[11px] tracking-[0.28em] uppercase font-mono font-semibold whitespace-nowrap" style={{ color: "rgba(255,255,255,0.95)" }}>
                exhibits to my life
              </p>
              <div className="h-px bg-white/60 flex-1" />
            </div>
          </motion.div>

          {/* 3D perspective gallery floor */}
          <div className="px-10 md:px-20 pb-10">
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-8 max-w-6xl mx-auto">
                {galleryPieces.map((piece, i) => (
                  <GalleryFrame key={piece.id} piece={piece} index={i} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SECRET DOOR TO SPEAKEASY ── */}
        <SpeakeasyDoor />

        {/* Minimal footer — sits flush below door step */}
        <div className="flex items-center justify-center gap-8 py-4">
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
      </div>
    </main>
  );
}
