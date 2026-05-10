"use client";

import { useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { galleryPieces } from "@/data/galleryData";
import Artwork from "@/components/Artwork";
import GalleryCeiling from "@/components/GalleryCeiling";
import HamburgerMenu from "@/components/HamburgerMenu";

export default function ExhibitPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const piece = galleryPieces.find((p) => p.id === params.id);
  const currentIndex = galleryPieces.findIndex((p) => p.id === params.id);
  const nextPiece = galleryPieces[(currentIndex + 1) % galleryPieces.length];
  const prevPiece = galleryPieces[(currentIndex - 1 + galleryPieces.length) % galleryPieces.length];

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") router.push(`/gallery/${nextPiece.id}`);
      if (e.key === "ArrowLeft") router.push(`/gallery/${prevPiece.id}`);
      if (e.key === "Escape") router.push("/");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [nextPiece, prevPiece, router]);

  if (!piece) return notFound();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <GalleryCeiling />
      <HamburgerMenu />

      {/* Exhibit sub-nav — sits below ceiling */}
      <div
        className="fixed left-0 right-0 flex items-center justify-between px-10 pointer-events-auto"
        style={{ top: 88, zIndex: 29, height: 40, borderBottom: "1px solid rgba(220,220,216,0.5)", background: "rgba(255,255,255,0.95)" }}
      >
          <Link
            href="/"
            className="font-mono text-g-dark hover:text-g-ice text-[11px] tracking-[0.25em] uppercase transition-colors flex items-center gap-2 font-medium"
          >
            <span>←</span> Icicle
          </Link>

          <div className="flex items-center gap-1.5">
            {galleryPieces.map((p) => (
              <Link key={p.id} href={`/gallery/${p.id}`}>
                <div
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    p.id === piece.id ? "bg-g-ice scale-125" : "bg-g-light hover:bg-g-ice"
                  }`}
                />
              </Link>
            ))}
          </div>

          <div className="w-24" />
      </div>

      {/* Push content below fixed ceiling (88px) + subnav (40px) */}
      <div style={{ height: 128 }} />

      {/* Main exhibit space */}
      <div className="flex-1 flex flex-col lg:flex-row">

        {/* LEFT — Gallery wall text (like image 2 — text panel on white wall) */}
        <motion.aside
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="lg:w-[42%] border-r border-g-light/50 px-10 md:px-16 py-16 flex flex-col"
        >

          {/* Title block */}
          <div className="mb-8">
            <h1 className="font-serif text-5xl md:text-6xl text-g-black font-light leading-tight mb-2">
              {piece.title}
            </h1>
            <p className="font-serif text-g-dim text-2xl italic">
              {piece.subtitle}
            </p>
          </div>

          {/* Metadata */}
          <div className="flex gap-8 pb-8 mb-8 border-b border-g-light/60">
            <div>
              <p className="font-mono text-g-mid text-[8px] tracking-[0.25em] uppercase mb-1">Period</p>
              <p className="font-sans text-g-dark text-sm">{piece.period}</p>
            </div>
            <div>
              <p className="font-mono text-g-mid text-[8px] tracking-[0.25em] uppercase mb-1">Medium</p>
              <p className="font-sans text-g-dark text-sm">{piece.medium}</p>
            </div>
          </div>

          {/* Intro — italic exhibit label text, like in image 2 */}
          <blockquote className="font-serif text-g-dark text-lg leading-relaxed italic mb-10 border-l-2 border-g-dark/20 pl-5">
            {piece.panel.intro}
          </blockquote>

          {/* Sections */}
          <div className="space-y-8 flex-1">
            {piece.panel.sections.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
              >
                <h3 className="font-mono text-g-mid text-[9px] tracking-[0.25em] uppercase mb-2">
                  {section.heading}
                </h3>
                <p className="font-sans text-g-dark text-sm leading-relaxed">
                  {section.body}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Links */}
          {piece.panel.links && (
            <div className="mt-10 flex flex-wrap gap-3">
              {piece.panel.links.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-g-black text-g-black text-[10px] tracking-[0.2em] uppercase font-sans hover:bg-g-black hover:text-white transition-all duration-300"
                >
                  {link.label}
                  <span className="text-[8px]">↗</span>
                </a>
              ))}
            </div>
          )}

        </motion.aside>

        {/* RIGHT — Artwork display */}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
          className="flex-1 flex flex-col items-center justify-center p-10 md:p-20 bg-g-off relative"
        >
          {/* Subtle perspective floor lines */}
          <svg
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{ height: "30%" }}
            viewBox="0 0 800 200"
            preserveAspectRatio="none"
          >
            {[-100, 0, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((x, i) => (
              <line key={i} x1={400} y1={0} x2={x} y2={200} stroke="#ccc" strokeWidth="0.5" opacity="0.5" />
            ))}
          </svg>

          {/* The large frame */}
          <div className="relative w-full max-w-lg">
            {/* Drop shadow */}
            <div className="absolute inset-0 translate-x-3 translate-y-3 bg-g-dark/12" />

            {/* Frame */}
            <motion.div
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className="relative border-[14px] border-g-black bg-white p-4"
              style={{ boxShadow: "0 8px 50px rgba(0,0,0,0.12)" }}
            >
              {/* Mat */}
              <div className="border border-g-light p-2">
                <div className="aspect-[4/3] bg-white overflow-hidden">
                  <Artwork type={piece.artworkType} />
                </div>
              </div>

              {/* Spotlight from above */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse 70% 40% at 50% -10%, rgba(255,252,235,0.4) 0%, transparent 70%)",
                }}
              />
            </motion.div>

            {/* Floor plaque */}
            <div className="mt-6 text-center">
              <p className="font-serif text-g-dark text-xl">{piece.title}</p>
              <p className="font-serif text-g-dim text-sm italic">{piece.shortDescription}</p>
            </div>
          </div>

          {/* Keyboard hint */}
          <p className="absolute bottom-8 right-10 font-mono text-g-light text-[9px] tracking-widest">
            ← → to navigate · Esc to exit
          </p>
        </motion.main>
      </div>

      {/* Floor seam */}
      <div className="h-px bg-g-light" />

      {/* Bottom nav */}
      <div className="flex items-center justify-center px-10 md:px-16 py-5 border-t border-g-light/40">
        <Link
          href="/"
          className="font-mono text-g-dark hover:text-g-ice text-[11px] tracking-[0.25em] uppercase transition-colors font-medium"
        >
          ← All Works
        </Link>
      </div>
    </div>
  );
}
