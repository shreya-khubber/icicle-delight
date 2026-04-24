"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GalleryPiece } from "@/data/galleryData";
import Artwork from "./Artwork";

interface GalleryFrameProps {
  piece: GalleryPiece;
  index: number;
}

export default function GalleryFrame({ piece, index }: GalleryFrameProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.8, delay: 0.4 + index * 0.15, ease: [0.76, 0, 0.24, 1] }}
      className="flex flex-col items-center"
    >
      <Link href={piece.id === "art" ? "/gallery/art/corridor" : `/gallery/${piece.id}`} className="group block w-full">
        <div className="relative">
          {/* Drop shadow block */}
          <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-black/10" />

          {/* Frame */}
          <div
            className="relative border-[8px] border-g-black bg-white p-2.5 transition-all duration-500 ease-gallery group-hover:border-g-ice group-hover:shadow-[0_12px_60px_rgba(168,205,216,0.25),0_4px_20px_rgba(0,0,0,0.12)] group-hover:-translate-y-1"
          >
            {/* Mat board */}
            <div className="border border-g-light p-1">
              {/* Artwork */}
              <div className="aspect-[4/3] overflow-hidden bg-white">
                <Artwork type={piece.artworkType} />
              </div>
            </div>

            {/* Hover overlay with spotlight */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,252,235,0.3) 0%, transparent 70%)" }}
            />
          </div>
        </div>

        {/* Plaque */}
        <div className="mt-5 text-center">
          <p className="text-g-ice text-[9px] tracking-[0.28em] uppercase font-sans mb-1.5">
            {piece.catalogNumber}
          </p>
          <h3 className="font-serif text-g-black text-xl leading-tight group-hover:tracking-wide transition-all duration-300">
            {piece.title}
          </h3>
          <p className="font-serif text-g-dim text-sm italic mt-0.5">
            {piece.subtitle}
          </p>
          <div className="mt-3 flex items-center justify-center gap-2">
            <div className="h-px w-5 bg-g-mid" />
            <p className="font-mono text-g-mid text-[9px] tracking-widest">
              {piece.period}
            </p>
            <div className="h-px w-5 bg-g-mid" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
