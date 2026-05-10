"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// ── Nav items ────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { num: "01", label: "Home",      href: "/" },
  { num: "02", label: "Exhibits",  href: "/#exhibits" },
  { num: "03", label: "Speakeasy", href: "/lounge" },
  { num: "04", label: "Contact",   href: "/contact" },
];

// Site-wide easing curve (matches the landing page transitions)
const EASE = [0.76, 0, 0.24, 1] as const;

// ── 3-line glyph that morphs to an X on open ─────────────────────────────
function HamburgerGlyph({ open }: { open: boolean }) {
  // Three absolute lines on a 18×12 canvas. Top/bottom rotate to form the X
  // and the middle slides off and fades.
  return (
    <span
      aria-hidden
      className="relative inline-block"
      style={{ width: 18, height: 12 }}
    >
      <span
        className="absolute left-0 right-0 mx-auto"
        style={{
          top: 0,
          height: 1.25,
          width: 18,
          background: "currentColor",
          transformOrigin: "center",
          transform: open ? "translateY(5.5px) rotate(45deg)" : "none",
          transition: "transform 420ms cubic-bezier(0.76, 0, 0.24, 1)",
        }}
      />
      <span
        className="absolute left-0 right-0 mx-auto"
        style={{
          top: "50%",
          marginTop: -0.6,
          height: 1.25,
          width: 18,
          background: "currentColor",
          transform: open ? "translateX(-12px)" : "none",
          opacity: open ? 0 : 1,
          transition:
            "transform 320ms cubic-bezier(0.76, 0, 0.24, 1), opacity 220ms ease",
        }}
      />
      <span
        className="absolute left-0 right-0 mx-auto"
        style={{
          bottom: 0,
          height: 1.25,
          width: 18,
          background: "currentColor",
          transformOrigin: "center",
          transform: open ? "translateY(-5.5px) rotate(-45deg)" : "none",
          transition: "transform 420ms cubic-bezier(0.76, 0, 0.24, 1)",
        }}
      />
    </span>
  );
}

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while panel is open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Esc closes the panel
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* ── TRIGGER — top-left, midnight chip ───────────────────────────── */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="fixed top-5 left-5 md:top-7 md:left-7 z-[60] flex items-center justify-center"
        style={{
          width: 44,
          height: 44,
          color: "#ffffff",
          background: "rgba(7,13,26,0.55)",
          border: "1px solid rgba(255,255,255,0.16)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          transition:
            "background 260ms ease, border-color 260ms ease, transform 260ms ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(7,13,26,0.78)";
          e.currentTarget.style.borderColor = "rgba(192,224,224,0.55)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(7,13,26,0.55)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.16)";
        }}
      >
        <HamburgerGlyph open={open} />
      </button>

      {/* ── BACKDROP ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[55]"
            style={{
              background: "rgba(2,6,14,0.55)",
              backdropFilter: "blur(3px)",
              WebkitBackdropFilter: "blur(3px)",
            }}
          />
        )}
      </AnimatePresence>

      {/* ── SIDE PANEL — slides in from the left ───────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.aside
            key="panel"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.55, ease: EASE }}
            className="fixed top-0 left-0 h-full z-[58] flex flex-col"
            style={{
              width: "min(440px, 100vw)",
              background:
                "linear-gradient(180deg, #060c18 0%, #0a1320 50%, #060c18 100%)",
              borderRight: "1px solid rgba(192,224,224,0.18)",
              boxShadow:
                "30px 0 80px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.02)",
            }}
          >
            {/* Faint vertical gold rule running along the right edge */}
            <span
              aria-hidden
              className="absolute top-0 right-0 h-full w-px"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 0%, rgba(214,178,111,0.55) 18%, rgba(214,178,111,0.25) 50%, rgba(214,178,111,0.55) 82%, transparent 100%)",
              }}
            />

            {/* Subtle grain/noise via radial gradients — keeps the panel
                from feeling like a flat plate */}
            <span
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 0% 0%, rgba(58,158,158,0.10) 0%, transparent 45%), radial-gradient(ellipse at 100% 100%, rgba(214,178,111,0.06) 0%, transparent 45%)",
              }}
            />

            {/* Eyebrow + subtitle. Top padding clears the trigger button
                (which lives at top:20/28, h:44) so its morphing X glyph
                doesn't visually collide with this header text. The trigger
                IS the close affordance — no in-panel close button needed. */}
            <div className="relative px-8 md:px-10 pt-[88px] md:pt-[100px]">
              <p
                className="font-mono text-[10px] tracking-[0.4em] uppercase"
                style={{ color: "rgba(192,224,224,0.85)" }}
              >
                Icicle
              </p>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.18 }}
                className="font-serif italic text-base mt-3"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                A Gallery by Shreya Khubber
              </motion.p>
            </div>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.22, ease: EASE }}
              className="relative h-px origin-left mx-8 md:mx-10 mt-9"
              style={{
                background:
                  "linear-gradient(to right, rgba(214,178,111,0.7), rgba(214,178,111,0.15) 60%, transparent)",
              }}
            />

            {/* ── NAV ─────────────────────────────────────────────────── */}
            <nav className="relative flex-1 flex flex-col justify-center px-8 md:px-10 -mt-4">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.28 + i * 0.07,
                    ease: EASE,
                  }}
                  className="py-3"
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-5"
                  >
                    <span
                      className="font-mono text-[10px] tracking-[0.32em]"
                      style={{
                        color: "rgba(192,224,224,0.55)",
                        width: 26,
                        flexShrink: 0,
                      }}
                    >
                      {item.num}
                    </span>
                    <span
                      className="font-serif italic font-light leading-none"
                      style={{
                        color: "#ffffff",
                        fontSize: "clamp(34px, 6.4vw, 46px)",
                        letterSpacing: "-0.01em",
                        transition: "color 320ms ease, transform 360ms cubic-bezier(0.76, 0, 0.24, 1)",
                        display: "inline-block",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#e8c878";
                        e.currentTarget.style.transform = "translateX(10px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#ffffff";
                        e.currentTarget.style.transform = "translateX(0)";
                      }}
                    >
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom rule + tagline */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
              className="relative h-px origin-left mx-8 md:mx-10"
              style={{
                background:
                  "linear-gradient(to right, rgba(214,178,111,0.7), rgba(214,178,111,0.15) 60%, transparent)",
              }}
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.62 }}
              className="relative font-mono text-[9px] tracking-[0.34em] uppercase mt-6 mb-9 px-8 md:px-10"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Finance · Code · Art · Writing · Ideas
            </motion.p>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
