"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { num: "01", label: "Home", href: "/" },
  { num: "02", label: "The Collection", href: "/#collection" },
  { num: "03", label: "What Am I Doing Now", href: "/now" },
  { num: "04", label: "Contact", href: "/contact" },
];

function DoorKnocker({ open }: { open: boolean }) {
  return (
    <svg
      width="36" height="46"
      viewBox="0 0 36 46"
      xmlns="http://www.w3.org/2000/svg"
      className="overflow-visible drop-shadow-[0_3px_8px_rgba(0,0,0,0.28)] group-hover:drop-shadow-[0_5px_14px_rgba(0,0,0,0.38)] transition-[filter] duration-300"
    >
      {/* Backplate */}
      <rect x="9" y="0" width="18" height="11" rx="3"
        fill="#1a1a18"
        className="transition-[fill] duration-300 group-hover:fill-g-ice"
      />
      {/* Hinge pin */}
      <circle cx="18" cy="10" r="3" fill="#111"
        className="transition-[fill] duration-300 group-hover:fill-g-ice"
      />
      {/* Ring */}
      <motion.g
        animate={open ? { rotate: -52 } : { rotate: 0 }}
        transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
        style={{ transformOrigin: "18px 10px" }}
      >
        <path
          d="M 9,13 Q 4,26 18,32 Q 32,26 27,13"
          fill="none" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"
          className="transition-[stroke] duration-300 [stroke:#1a1a18] group-hover:[stroke:#3a9e9e]"
        />
      </motion.g>
      {/* Strike plate */}
      <rect x="10" y="33" width="16" height="5" rx="1.5"
        fill="#1a1a18" opacity="0.28"
      />
    </svg>
  );
}

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* Door knocker — lives inside the ceiling band */}
      <button
        onClick={() => setOpen(v => !v)}
        aria-label="Open menu"
        className="fixed top-0 right-0 flex items-start justify-center pointer-events-auto group cursor-pointer"
        style={{ height: 88, width: 56, paddingTop: 6, zIndex: 40 }}
      >
        <DoorKnocker open={open} />
      </button>

      {/* Full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-white flex flex-col pointer-events-auto"
            style={{ zIndex: 39 }}
          >
            <div className="h-1 w-full bg-g-ice" />

            <div className="flex-1 flex flex-col justify-center px-16 md:px-28">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-mono text-g-ice text-[9px] tracking-[0.35em] uppercase mb-2"
              >
                Icicle
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="font-serif text-g-mid text-base italic mb-12"
              >
                A Gallery by Shreya Khubber
              </motion.p>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.76,0,0.24,1] }}
                className="h-px bg-g-light mb-10 origin-left"
              />

              <nav className="space-y-6">
                {NAV_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: 0.25 + i * 0.08, ease: [0.76,0,0.24,1] }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="group/link flex items-baseline gap-6"
                    >
                      <span className="font-mono text-g-ice-light text-[10px] tracking-widest w-6">
                        {item.num}
                      </span>
                      <span className="font-serif text-g-black text-4xl md:text-5xl font-light group-hover/link:text-g-ice transition-colors duration-300">
                        {item.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.6, ease: [0.76,0,0.24,1] }}
                className="h-px bg-g-light mt-10 origin-left"
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="font-mono text-g-light text-[9px] tracking-[0.3em] uppercase mt-6"
              >
                Finance · Code · Art · Writing · Ideas
              </motion.p>
            </div>

            <div className="h-1 w-full bg-g-ice opacity-40" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
