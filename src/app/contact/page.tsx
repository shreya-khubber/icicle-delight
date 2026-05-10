"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import GalleryCeiling from "@/components/GalleryCeiling";
import HamburgerMenu from "@/components/HamburgerMenu";

const LINKS = [
  { label: "Email",     value: "shreya.khubber@gmail.com",        href: "mailto:shreya.khubber@gmail.com" },
  { label: "LinkedIn",  value: "linkedin.com/in/shreya-khubber",  href: "https://linkedin.com/in/shreya-khubber" },
  { label: "Instagram", value: "@migratinglife",                   href: "https://www.instagram.com/migratinglife/" },
  { label: "GitHub",    value: "github.com/shreya-khubber",       href: "https://github.com/shreya-khubber" },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <GalleryCeiling />
      <HamburgerMenu />

      <div className="relative z-10 flex flex-col min-h-screen" style={{ paddingTop: 112 }}>

        <div className="flex-1 flex flex-col justify-center px-10 md:px-28 py-16 max-w-2xl">

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-mono text-g-ice text-[9px] tracking-[0.3em] uppercase mb-4"
          >
            Icicle — Get in Touch
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            className="font-serif text-5xl md:text-6xl text-g-black font-light mb-4"
          >
            Contact
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="h-px bg-g-ice w-20 mb-8 origin-left"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="font-serif text-g-dim text-lg italic leading-relaxed mb-12"
          >
            I&apos;m always open to interesting conversations — whether it&apos;s
            about a role, a collaboration, or an idea you can&apos;t stop thinking about.
          </motion.p>

          {/* Links */}
          <div className="space-y-4 mb-12">
            {LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.55 + i * 0.1, ease: [0.76, 0, 0.24, 1] }}
                className="flex items-baseline justify-between gap-8 pb-4 border-b border-g-light group"
              >
                <span className="font-mono text-g-dim text-[9px] tracking-widest uppercase w-20 flex-shrink-0">
                  {link.label}
                </span>
                <span className="font-serif text-g-dark text-base group-hover:text-g-ice transition-colors duration-300 flex-1">
                  {link.value}
                </span>
                <span className="text-g-mid group-hover:text-g-ice transition-colors text-sm">↗</span>
              </motion.a>
            ))}
          </div>

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
