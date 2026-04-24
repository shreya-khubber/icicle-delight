"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function SpeakeasyDoor() {
  return (
    <section className="flex flex-col items-center pt-16 pb-0 px-8">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1 }}
        className="group flex flex-col items-center"
      >
        <Link href="/lounge" className="flex flex-col items-center">
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="relative"
            style={{
              filter: "drop-shadow(0 12px 32px rgba(0,0,0,0.10)) drop-shadow(0 2px 6px rgba(0,0,0,0.07))",
            }}
          >
            <svg
              viewBox="0 0 260 390"
              className="w-60 h-auto draw-line"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Subtle inner shadow on door panels */}
                <linearGradient id="panelShade" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stopColor="#e8e8e4" stopOpacity="1" />
                  <stop offset="100%" stopColor="#f4f4f2" stopOpacity="1" />
                </linearGradient>
                {/* Door face fill */}
                <linearGradient id="doorFace" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%"   stopColor="#f0f0ee" stopOpacity="1" />
                  <stop offset="100%" stopColor="#e8e8e5" stopOpacity="1" />
                </linearGradient>
              </defs>

              {/* ── ARCH LAYERS ── */}
              {/* Outermost arch — bold edge */}
              <path
                d="M 6,390 L 6,142 Q 6,6 130,6 Q 254,6 254,142 L 254,390"
                fill="none" strokeWidth="2.2"
                className="transition-[stroke] duration-500 [stroke:#c4c4c0] group-hover:[stroke:#777]"
              />
              {/* Mid arch */}
              <path
                d="M 20,390 L 20,146 Q 20,20 130,20 Q 240,20 240,146 L 240,390"
                fill="none" strokeWidth="1.2"
                className="transition-[stroke] duration-500 [stroke:#d8d8d4] group-hover:[stroke:#999]"
              />
              {/* Inner arch — thinnest, lightest */}
              <path
                d="M 34,390 L 34,150 Q 34,34 130,34 Q 226,34 226,150 L 226,390"
                fill="none" strokeWidth="0.7"
                className="transition-[stroke] duration-500 [stroke:#e4e4e0] group-hover:[stroke:#bbb]"
              />

              {/* ── DOOR SURROUND / REVEAL ── */}
              {/* Outer surround — slightly thicker to give depth */}
              <rect x="82" y="216" width="96" height="152" rx="0"
                fill="none" strokeWidth="1.8"
                className="transition-[stroke] duration-500 [stroke:#b8b8b4] group-hover:[stroke:#666]"
              />
              {/* Arch over door */}
              <path d="M 82,258 Q 82,216 130,216 Q 178,216 178,258"
                fill="none" strokeWidth="1.8"
                className="transition-[stroke] duration-500 [stroke:#b0b0ac] group-hover:[stroke:#555]"
              />

              {/* ── DOOR FACE (filled) ── */}
              <rect x="88" y="262" width="84" height="100" fill="url(#doorFace)" />
              <path d="M 88,262 L 88,244 Q 88,224 130,224 Q 172,224 172,244 L 172,262 Z"
                fill="url(#doorFace)" />

              {/* ── DOOR INNER FRAME ── */}
              <rect x="88" y="262" width="84" height="100" rx="0"
                fill="none" strokeWidth="0.8"
                className="transition-[stroke] duration-500 [stroke:#c8c8c4] group-hover:[stroke:#888]"
              />
              <path d="M 88,262 L 88,244 Q 88,224 130,224 Q 172,224 172,244 L 172,262"
                fill="none" strokeWidth="0.8"
                className="transition-[stroke] duration-500 [stroke:#c0c0bc] group-hover:[stroke:#888]"
              />

              {/* ── DOOR PANELS ── */}
              {/* Upper arch lunette panel */}
              <path d="M 96,258 L 96,244 Q 96,232 130,232 Q 164,232 164,244 L 164,258 Z"
                fill="url(#panelShade)" stroke="none"
              />
              <path d="M 96,258 L 96,244 Q 96,232 130,232 Q 164,232 164,244 L 164,258"
                fill="none" strokeWidth="0.6"
                className="transition-[stroke] duration-500 [stroke:#ccc] group-hover:[stroke:#999]"
              />

              {/* Left lower panel */}
              <rect x="96" y="266" width="30" height="52" rx="1" fill="url(#panelShade)"
              />
              <rect x="96" y="266" width="30" height="52" rx="1" fill="none"
                strokeWidth="0.6"
                className="transition-[stroke] duration-500 [stroke:#ccc] group-hover:[stroke:#999]"
              />

              {/* Right lower panel */}
              <rect x="134" y="266" width="30" height="52" rx="1" fill="url(#panelShade)"
              />
              <rect x="134" y="266" width="30" height="52" rx="1" fill="none"
                strokeWidth="0.6"
                className="transition-[stroke] duration-500 [stroke:#ccc] group-hover:[stroke:#999]"
              />

              {/* Left upper panel */}
              <rect x="96" y="326" width="30" height="28" rx="1" fill="url(#panelShade)" />
              <rect x="96" y="326" width="30" height="28" rx="1" fill="none"
                strokeWidth="0.6"
                className="transition-[stroke] duration-500 [stroke:#ccc] group-hover:[stroke:#999]"
              />

              {/* Right upper panel */}
              <rect x="134" y="326" width="30" height="28" rx="1" fill="url(#panelShade)" />
              <rect x="134" y="326" width="30" height="28" rx="1" fill="none"
                strokeWidth="0.6"
                className="transition-[stroke] duration-500 [stroke:#ccc] group-hover:[stroke:#999]"
              />

              {/* Center split line */}
              <line x1="130" y1="262" x2="130" y2="362"
                strokeWidth="0.7"
                className="transition-[stroke] duration-500 [stroke:#c8c8c4] group-hover:[stroke:#888]"
              />

              {/* ── HARDWARE ── */}
              {/* Keyhole escutcheon plate — thin ice-blue tint on hover */}
              <rect x="125" y="308" width="10" height="14" rx="2"
                fill="none" strokeWidth="0.7"
                className="transition-[stroke] duration-400 [stroke:#c0c0bc] group-hover:stroke-g-ice"
              />
              {/* Keyhole */}
              <circle cx="130" cy="312" r="2.2" fill="none" strokeWidth="0.7"
                className="transition-[stroke] duration-400 [stroke:#bbb] group-hover:stroke-g-ice"
              />
              <polygon points="128.8,313.8 131.2,313.8 131,319 129,319"
                className="transition-[fill] duration-400 [fill:#bbb] group-hover:fill-g-ice"
              />

              {/* Left knob */}
              <circle cx="121" cy="315" r="3.2" fill="none" strokeWidth="0.8"
                className="transition-[stroke] duration-300 [stroke:#aaa] group-hover:stroke-g-ice"
              />
              <circle cx="121" cy="315" r="1.3"
                className="transition-[fill] duration-300 [fill:#c0c0bc] group-hover:fill-g-ice"
              />
              {/* Right knob */}
              <circle cx="139" cy="315" r="3.2" fill="none" strokeWidth="0.8"
                className="transition-[stroke] duration-300 [stroke:#aaa] group-hover:stroke-g-ice"
              />
              <circle cx="139" cy="315" r="1.3"
                className="transition-[fill] duration-300 [fill:#c0c0bc] group-hover:fill-g-ice"
              />

              {/* ── STEP ── */}
              <rect x="78" y="368" width="104" height="3.5" fill="#e8e8e4"
              />
              <rect x="78" y="368" width="104" height="3.5" fill="none"
                strokeWidth="0.8"
                className="transition-[stroke] duration-500 [stroke:#c0c0bc] group-hover:[stroke:#888]"
              />
              <rect x="72" y="371.5" width="116" height="2" fill="#dcdcd8"
              />
              <rect x="72" y="371.5" width="116" height="2" fill="none"
                strokeWidth="0.6"
                className="[stroke:#ccc]"
              />
            </svg>

            {/* Velvet rope */}
            <div className="absolute -left-6 -right-6 top-full mt-1 flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-6 h-px bg-g-ice/60" />
              <div className="w-1.5 h-1.5 rounded-full border border-g-ice/50" />
              <div className="w-6 h-px bg-g-ice/60" />
            </div>
          </motion.div>

          {/* Label */}
          <div className="mt-7 text-center">
            <p className="font-serif text-g-dim text-base italic group-hover:text-g-dark transition-colors duration-300">
              The Speakeasy
            </p>
            <p className="font-mono text-g-light text-[9px] tracking-[0.25em] uppercase mt-1 group-hover:text-g-ice transition-colors duration-300">
              After Hours →
            </p>
          </div>
        </Link>
      </motion.div>
    </section>
  );
}
