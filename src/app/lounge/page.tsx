"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const CINEMA = [
  { title: "Les Misérables", creator: "Tom Hooper", note: "revolution as grief in costume" },
  { title: "When Life Gives You Tangerines", creator: "Kim Won-seok", note: "time is the cruelest love language" },
  { title: "Interstellar", creator: "Christopher Nolan", note: "the math of missing someone" },
  { title: "BoJack Horseman", creator: "Raphael Bob-Waksberg", note: "the funniest thing about despair" },
  { title: "Black Mirror", creator: "Charlie Brooker", note: "every nightmare we built on purpose" },
];

const BOOKS = [
  { title: "Pilgrimage", author: "Paulo Coelho", note: "consciousness before it had a name" },
  { title: "The Money Trap", author: "Alok Sama", note: "the system, undressed" },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", note: "the green light as a lifestyle choice" },
  { title: "The Time Machine", author: "H.G. Wells", note: "class warfare, eventually" },
  { title: "Wuthering Heights", author: "Emily Bronte", note: "love as a form of weather" },
];

const SONGS = [
  { title: "Shallow", artist: "Lady Gaga & Bradley Cooper" },
  { title: "Those Eyes", artist: "New West" },
  { title: "Iris", artist: "Goo Goo Dolls" },
  { title: "Mystery of Love", artist: "Sufjan Stevens" },
  { title: "Boulevard of Broken Dreams", artist: "Green Day" },
  { title: "Tell the Devil I'm Busy", artist: "JD Steel" },
];

const GEEK_IDEAS = [
  "Gravitational waves and black holes",
  "Trying to convince myself that financial markets are not a made up thing",
  "Detailed analysis of the movie - 'If I Can't Have Love, I Want Power'",
  "Abstract art",
  "How to escape Mumbai without escaping Mumbai",
];

export default function LoungePage() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#0c0a08", color: "#e8e0d0" }}
    >
      {/* Art deco top border */}
      <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, #8a6a3a, transparent)" }}/>
      <div className="h-px w-full mt-1" style={{ background: "linear-gradient(to right, transparent, #5a4422, transparent)" }}/>

      {/* Pendant lamps */}
      <PendantRow />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        className="text-center pt-16 pb-10 px-8"
      >
        <div className="flex items-center justify-center gap-6 mb-8">
          <ArtDecoCorner />
          <div className="text-center">
            <p className="font-mono text-[9px] tracking-[0.45em] uppercase mb-2" style={{ color: "#8a6a3a" }}>
              Icicle — The Speakeasy
            </p>
            <h1 className="font-serif text-5xl md:text-6xl font-light" style={{ color: "#e8e0d0", letterSpacing: "0.05em" }}>
              The Speakeasy
            </h1>
            <div className="flex items-center justify-center gap-3 mt-3">
              <div className="h-px w-12" style={{ background: "#5a4422" }}/>
              <p className="font-serif text-sm italic" style={{ color: "#7a6850" }}>
                after hours
              </p>
              <div className="h-px w-12" style={{ background: "#5a4422" }}/>
            </div>
          </div>
          <ArtDecoCorner flip />
        </div>

        <p className="font-serif text-base italic max-w-sm mx-auto leading-relaxed" style={{ color: "#7a6850" }}>
          &ldquo;Tell me what you watch and I&apos;ll tell you who you are.
          Tell me what you read and I&apos;ll tell you who you want to be.
          Tell me what you listen to and I&apos;ll tell you what you feel at 2am.&rdquo;
        </p>
      </motion.header>

      {/* Cultural symbols row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="flex items-center justify-center gap-16 py-8"
      >
        <VinylRecord />
        <RecordPlayer />
        <Instrument />
      </motion.div>

      <ArtDecoDivider />

      {/* Main content */}
      <div className="flex-1 px-8 md:px-16 py-12 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">

          {/* CINEMA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex items-baseline gap-3 mb-8">
              <span className="font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: "#8a6a3a" }}>01</span>
              <h2 className="font-serif text-2xl font-light" style={{ color: "#e8e0d0" }}>Cinema</h2>
              <span className="font-serif text-sm italic" style={{ color: "#5a4422" }}>— the ones I return to</span>
            </div>

            <div className="space-y-6">
              {CINEMA.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
                >
                  <div className="flex items-baseline gap-3 mb-1">
                    <p className="font-serif text-base" style={{ color: "#d8d0c0" }}>{f.title}</p>
                    <div className="flex-1 border-b border-dashed mx-2" style={{ borderColor: "#2a2520" }}/>
                  </div>
                  <p className="font-mono text-xs tracking-wide" style={{ color: "#8a7050" }}>
                    {f.creator} · <span className="font-serif italic" style={{ color: "#a08860" }}>{f.note}</span>
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* BOOKS */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex items-baseline gap-3 mb-8">
              <span className="font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: "#8a6a3a" }}>02</span>
              <h2 className="font-serif text-2xl font-light" style={{ color: "#e8e0d0" }}>Books</h2>
              <span className="font-serif text-sm italic" style={{ color: "#5a4422" }}>— the stack</span>
            </div>

            <div className="space-y-6">
              {BOOKS.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.08 }}
                >
                  <div className="flex items-baseline gap-3 mb-1">
                    <p className="font-serif text-base" style={{ color: "#d8d0c0" }}>{b.title}</p>
                    <div className="flex-1 border-b border-dashed mx-2" style={{ borderColor: "#2a2520" }}/>
                  </div>
                  <p className="font-mono text-xs tracking-wide" style={{ color: "#8a7050" }}>
                    {b.author && <>{b.author} · </>}<span className="font-serif italic" style={{ color: "#a08860" }}>{b.note}</span>
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* SONGS — full width */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <ArtDecoDivider />
          <div className="pt-12">
            <div className="flex items-baseline gap-3 mb-8">
              <span className="font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: "#8a6a3a" }}>03</span>
              <h2 className="font-serif text-2xl font-light" style={{ color: "#e8e0d0" }}>Songs</h2>
              <span className="font-serif text-sm italic" style={{ color: "#5a4422" }}>— the ones that stayed</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
              {SONGS.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.75 + i * 0.08 }}
                >
                  <div className="flex items-baseline gap-3 mb-1">
                    <p className="font-serif text-base" style={{ color: "#d8d0c0" }}>{s.title}</p>
                    <div className="flex-1 border-b border-dashed mx-2" style={{ borderColor: "#2a2520" }}/>
                  </div>
                  <p className="font-mono text-xs tracking-wide" style={{ color: "#8a7050" }}>
                    {s.artist}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* IDEAS */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease: [0.76, 0, 0.24, 1] }}
        >
          <ArtDecoDivider />
          <div className="pt-12 pb-4">
            <div className="flex items-baseline gap-3 mb-8">
              <span className="font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: "#8a6a3a" }}>04</span>
              <h2 className="font-serif text-2xl font-light" style={{ color: "#e8e0d0" }}>Ideas I Geek About</h2>
            </div>

            <div className="space-y-5 max-w-xl">
              {GEEK_IDEAS.map((idea, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 + i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <span className="font-mono text-[8px] mt-1.5 flex-shrink-0" style={{ color: "#5a4422" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-serif text-base leading-relaxed" style={{ color: "#d8d0c0" }}>{idea}</p>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.35 }}
              className="font-serif text-sm italic mt-10"
              style={{ color: "#5a4422" }}
            >
              If any of this is your rabbit hole too — you know where to find me.
            </motion.p>
          </div>
        </motion.div>
      </div>

      <ArtDecoDivider />

      {/* Footer */}
      <div className="flex items-center justify-between px-8 md:px-16 py-6">
        <Link
          href="/"
          className="font-mono text-[11px] tracking-[0.25em] uppercase transition-colors font-semibold"
          style={{ color: "#a08040" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#c8a050")}
          onMouseLeave={e => (e.currentTarget.style.color = "#a08040")}
        >
          ← Back to Gallery
        </Link>
        <p className="font-mono text-[9px]" style={{ color: "#3a3020" }}>© 2025 Icicle</p>
      </div>

      <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, #5a4422, transparent)" }}/>
    </div>
  );
}

function PendantLamp({ x, cordY, domeR, delay }: { x: number; cordY: number; domeR: number; delay: number }) {
  const ry = domeR * 0.48; // dome height (flatter hemisphere)
  const glowR = domeR * 0.72;

  return (
    <motion.g
      animate={{ rotate: [-2.5, 2.5] }}
      transition={{ duration: 3.8 + delay * 0.4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay }}
      style={{ transformOrigin: `${x}px 0px` }}
    >
      {/* Cord */}
      <line x1={x} y1={0} x2={x} y2={cordY} stroke="#2a1c0a" strokeWidth="1.4" />

      {/* Outer dome — dark, matte */}
      <path
        d={`M ${x - domeR},${cordY + ry} Q ${x - domeR},${cordY} ${x},${cordY} Q ${x + domeR},${cordY} ${x + domeR},${cordY + ry}`}
        fill="#111008"
      />
      {/* Dome underside opening — ellipse */}
      <ellipse cx={x} cy={cordY + ry} rx={domeR} ry={ry * 0.28} fill="#1a1005" />

      {/* Interior warm gold — visible through opening */}
      <ellipse cx={x} cy={cordY + ry - 2} rx={domeR * 0.82} ry={ry * 0.22} fill="#c47c0a" opacity="0.55" />

      {/* Ribbed interior lines */}
      {[-0.5, -0.25, 0, 0.25, 0.5].map((t, i) => (
        <line key={i}
          x1={x + t * domeR * 1.6} y1={cordY + ry - ry * 0.18}
          x2={x + t * domeR * 1.6} y2={cordY + ry + ry * 0.1}
          stroke="#8a5a10" strokeWidth="0.6" opacity="0.5"
        />
      ))}

      {/* Bulb */}
      <ellipse cx={x} cy={cordY + ry} rx={domeR * 0.14} ry={domeR * 0.1} fill="#ffe090" opacity="0.95" />
      <ellipse cx={x} cy={cordY + ry} rx={domeR * 0.22} ry={domeR * 0.15} fill="#ffb830" opacity="0.35" />

      {/* Warm glow spilling downward */}
      <radialGradient id={`glow-${x}`} cx="50%" cy="0%" r="100%">
        <stop offset="0%" stopColor="#c87010" stopOpacity="0.18" />
        <stop offset="100%" stopColor="#c87010" stopOpacity="0" />
      </radialGradient>
      <ellipse cx={x} cy={cordY + ry + 4} rx={glowR} ry={glowR * 0.55}
        fill={`url(#glow-${x})`} />
    </motion.g>
  );
}

function PendantRow() {
  return (
    <div className="w-full overflow-hidden" style={{ height: 120 }}>
      <svg width="100%" height="120" viewBox="0 0 800 120" preserveAspectRatio="xMidYMax meet">
        <PendantLamp x={160} cordY={52} domeR={32} delay={0} />
        <PendantLamp x={400} cordY={38} domeR={40} delay={0.6} />
        <PendantLamp x={640} cordY={50} domeR={32} delay={1.1} />
      </svg>
    </div>
  );
}

function ArtDecoCorner({ flip = false }: { flip?: boolean }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" style={{ transform: flip ? "scaleX(-1)" : undefined }}>
      <line x1="2" y1="2" x2="38" y2="2" stroke="#5a4422" strokeWidth="0.8"/>
      <line x1="2" y1="2" x2="2" y2="38" stroke="#5a4422" strokeWidth="0.8"/>
      <line x1="6" y1="6" x2="22" y2="6" stroke="#8a6a3a" strokeWidth="0.5"/>
      <line x1="6" y1="6" x2="6" y2="22" stroke="#8a6a3a" strokeWidth="0.5"/>
      <circle cx="6" cy="6" r="2" fill="none" stroke="#8a6a3a" strokeWidth="0.5"/>
      <line x1="12" y1="12" x2="20" y2="12" stroke="#3a2a12" strokeWidth="0.5"/>
      <line x1="12" y1="12" x2="12" y2="20" stroke="#3a2a12" strokeWidth="0.5"/>
    </svg>
  );
}

function ArtDecoDivider() {
  return (
    <div className="flex items-center justify-center px-8 md:px-16 py-3">
      <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, #3a2a12)" }}/>
      <svg width="60" height="16" viewBox="0 0 60 16" className="mx-3">
        <line x1="0" y1="8" x2="20" y2="8" stroke="#5a4422" strokeWidth="0.6"/>
        <polygon points="26,8 22,5 22,11" fill="#8a6a3a"/>
        <circle cx="30" cy="8" r="3" fill="none" stroke="#8a6a3a" strokeWidth="0.8"/>
        <circle cx="30" cy="8" r="1.2" fill="#8a6a3a"/>
        <polygon points="34,8 38,5 38,11" fill="#8a6a3a"/>
        <line x1="40" y1="8" x2="60" y2="8" stroke="#5a4422" strokeWidth="0.6"/>
      </svg>
      <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, #3a2a12)" }}/>
    </div>
  );
}

function VinylRecord() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" opacity="0.7">
      {/* Outer ring */}
      <circle cx="32" cy="32" r="30" fill="none" stroke="#5a4422" strokeWidth="1.2"/>
      {/* Vinyl grooves */}
      {[26, 22, 18, 14, 10].map((r) => (
        <circle key={r} cx="32" cy="32" r={r} fill="none" stroke="#3a2a12" strokeWidth="0.5"/>
      ))}
      {/* Label disc */}
      <circle cx="32" cy="32" r="9" fill="#1a1408" stroke="#8a6a3a" strokeWidth="0.8"/>
      {/* Label text lines */}
      <line x1="26" y1="30" x2="38" y2="30" stroke="#5a4422" strokeWidth="0.6"/>
      <line x1="27" y1="33" x2="37" y2="33" stroke="#5a4422" strokeWidth="0.5"/>
      {/* Center hole */}
      <circle cx="32" cy="32" r="2" fill="#0c0a08" stroke="#5a4422" strokeWidth="0.5"/>
      {/* Rim highlight */}
      <circle cx="32" cy="32" r="30" fill="none" stroke="#8a6a3a" strokeWidth="0.3" opacity="0.4"/>
    </svg>
  );
}

function RecordPlayer() {
  return (
    <svg width="80" height="64" viewBox="0 0 80 64" opacity="0.7">
      {/* Base/plinth */}
      <rect x="4" y="38" width="72" height="20" rx="2" fill="none" stroke="#5a4422" strokeWidth="1"/>
      <rect x="8" y="42" width="64" height="12" rx="1" fill="#1a1408" stroke="#3a2a12" strokeWidth="0.5"/>
      {/* Turntable platter */}
      <ellipse cx="30" cy="38" rx="20" ry="4" fill="none" stroke="#5a4422" strokeWidth="1"/>
      <ellipse cx="30" cy="34" rx="20" ry="4" fill="#1a1408" stroke="#5a4422" strokeWidth="0.8"/>
      {/* Record on platter */}
      <circle cx="30" cy="34" r="16" fill="#111" stroke="#5a4422" strokeWidth="0.5"/>
      {[10, 7, 4].map((r) => (
        <circle key={r} cx="30" cy="34" r={r} fill="none" stroke="#2a2010" strokeWidth="0.5"/>
      ))}
      <circle cx="30" cy="34" r="2.5" fill="#1a1408" stroke="#8a6a3a" strokeWidth="0.5"/>
      {/* Tonearm */}
      <line x1="58" y1="20" x2="44" y2="34" stroke="#8a6a3a" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="58" cy="20" r="3" fill="none" stroke="#8a6a3a" strokeWidth="0.8"/>
      {/* Stylus / cartridge */}
      <rect x="41" y="33" width="5" height="3" rx="0.5" fill="none" stroke="#8a6a3a" strokeWidth="0.6"/>
      <line x1="43" y1="36" x2="42" y2="40" stroke="#8a6a3a" strokeWidth="0.6"/>
      {/* Knobs */}
      <circle cx="55" cy="48" r="2.5" fill="none" stroke="#8a6a3a" strokeWidth="0.6"/>
      <circle cx="63" cy="48" r="2.5" fill="none" stroke="#5a4422" strokeWidth="0.6"/>
    </svg>
  );
}

function Instrument() {
  return (
    <svg width="48" height="80" viewBox="0 0 48 80" opacity="0.7">
      {/* Violin/cello body — lower bout */}
      <path
        d="M 24,40 Q 40,38 42,52 Q 44,66 24,70 Q 4,66 6,52 Q 8,38 24,40 Z"
        fill="none" stroke="#8a6a3a" strokeWidth="1"
      />
      {/* Upper bout */}
      <path
        d="M 24,22 Q 36,20 38,30 Q 40,40 24,40 Q 8,40 10,30 Q 12,20 24,22 Z"
        fill="none" stroke="#8a6a3a" strokeWidth="1"
      />
      {/* Waist C-bouts */}
      <path d="M 10,30 Q 6,36 8,38" stroke="#8a6a3a" strokeWidth="0.8" fill="none"/>
      <path d="M 38,30 Q 42,36 40,38" stroke="#8a6a3a" strokeWidth="0.8" fill="none"/>
      {/* F-holes */}
      <path d="M 18,42 Q 17,48 18,54" stroke="#5a4422" strokeWidth="0.7" fill="none"/>
      <path d="M 30,42 Q 31,48 30,54" stroke="#5a4422" strokeWidth="0.7" fill="none"/>
      {/* Strings */}
      {[-3, -1, 1, 3].map((offset) => (
        <line key={offset} x1={24 + offset} y1="12" x2={24 + offset * 0.3} y2="70"
          stroke="#3a2a12" strokeWidth="0.4"/>
      ))}
      {/* Neck */}
      <rect x="21" y="6" width="6" height="16" rx="1" fill="none" stroke="#5a4422" strokeWidth="0.8"/>
      {/* Scroll/pegbox */}
      <path d="M 21,6 Q 18,2 20,0 Q 28,0 28,6" fill="none" stroke="#8a6a3a" strokeWidth="0.8"/>
      {/* Chin rest / tailpiece */}
      <path d="M 18,68 Q 24,72 30,68" fill="none" stroke="#5a4422" strokeWidth="0.8"/>
      {/* Bridge */}
      <path d="M 18,52 L 20,56 L 28,56 L 30,52" fill="none" stroke="#8a6a3a" strokeWidth="0.7"/>
    </svg>
  );
}
