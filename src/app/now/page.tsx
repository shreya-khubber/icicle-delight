"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import GalleryCeiling from "@/components/GalleryCeiling";
import HamburgerMenu from "@/components/HamburgerMenu";

// ── UPDATE THIS REGULARLY ──
const NOW_DATA = {
  updated: "April 2025",
  location: "Add your city here",
  sections: [
    {
      num: "01",
      heading: "Working on",
      items: [
        "Describe your current role or main project",
        "Something you're building on the side",
        "A skill you're actively developing",
      ],
    },
    {
      num: "02",
      heading: "Reading",
      items: [
        "The Making of the Atomic Bomb — Richard Rhodes",
        "Add another book here",
      ],
    },
    {
      num: "03",
      heading: "Watching",
      items: [
        "Add a film or series you're currently watching",
        "Or a director whose work you're exploring",
      ],
    },
    {
      num: "04",
      heading: "Thinking about",
      items: [
        "A question or idea occupying your mind",
        "Something you read that you can't stop thinking about",
        "A problem you'd love to solve",
      ],
    },
  ],
};

export default function NowPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <GalleryCeiling />
      <HamburgerMenu />

      <div className="relative z-10 flex flex-col min-h-screen" style={{ paddingTop: 112 }}>
        <div className="flex-1 px-10 md:px-28 py-16 max-w-2xl">

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-mono text-g-ice text-[9px] tracking-[0.3em] uppercase mb-4"
          >
            Icicle — A /now Page
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            className="font-serif text-5xl md:text-6xl text-g-black font-light mb-3"
          >
            Now
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="h-px bg-g-ice w-20 mb-6 origin-left"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="font-serif text-g-dim text-sm italic mb-10"
          >
            A snapshot of what I&apos;m doing right now —{" "}
            <span className="text-g-mid not-italic font-sans text-xs">
              last updated {NOW_DATA.updated}, from {NOW_DATA.location}
            </span>
          </motion.p>

          <div className="space-y-10">
            {NOW_DATA.sections.map((section, i) => (
              <motion.div
                key={section.num}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 + i * 0.1, ease: [0.76, 0, 0.24, 1] }}
              >
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-mono text-g-ice text-[9px] tracking-widest">{section.num}</span>
                  <h2 className="font-serif text-g-black text-xl font-light">{section.heading}</h2>
                </div>
                <ul className="space-y-2.5 pl-10">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <span className="text-g-ice-light mt-1.5 text-[8px]">◆</span>
                      <p className="font-sans text-g-dark text-sm leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="font-serif text-g-light text-xs italic mt-12"
          >
            Inspired by{" "}
            <a href="https://nownownow.com" className="underline hover:text-g-ice transition-colors" target="_blank" rel="noopener noreferrer">
              nownownow.com
            </a>
          </motion.p>
        </div>

        <div className="px-10 md:px-28 py-6 border-t border-g-light/40 flex items-center justify-between">
          <Link
            href="/"
            className="font-mono text-g-mid hover:text-g-ice text-[10px] tracking-[0.25em] uppercase transition-colors"
          >
            ← Icicle
          </Link>
          <p className="font-mono text-g-light text-[9px] tracking-widest">© 2025</p>
        </div>
      </div>
    </div>
  );
}
