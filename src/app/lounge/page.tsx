"use client";

import Link from "next/link";
import { motion } from "framer-motion";

// ── Data ──────────────────────────────────────────────────────────────────

const CINEMA = [
  { title: "Les Misérables",                 creator: "Tom Hooper",            note: "revolution as grief in costume" },
  { title: "When Life Gives You Tangerines", creator: "Kim Won-seok",          note: "time is the cruelest love language" },
  { title: "Interstellar",                   creator: "Christopher Nolan",     note: "the math of missing someone" },
  { title: "BoJack Horseman",                creator: "Raphael Bob-Waksberg",  note: "the funniest thing about despair" },
  { title: "Black Mirror",                   creator: "Charlie Brooker",       note: "every nightmare we built on purpose" },
];

const BOOKS = [
  { title: "Pilgrimage",        author: "Paulo Coelho",        note: "consciousness before it had a name" },
  { title: "The Money Trap",    author: "Alok Sama",           note: "the system, undressed" },
  { title: "The Great Gatsby",  author: "F. Scott Fitzgerald", note: "the green light as a lifestyle choice" },
  { title: "The Time Machine",  author: "H.G. Wells",          note: "class warfare, eventually" },
  { title: "Wuthering Heights", author: "Emily Brontë",        note: "love as a form of weather" },
];

// Each Song is rendered as a square card showing the album cover, with
// title + artist overlaid at the bottom and a Spotify play badge that
// appears on hover. Clicking opens the track on Spotify.
//
// `cover` URLs come from Spotify's public oEmbed endpoint:
//   https://open.spotify.com/oembed?url=https://open.spotify.com/track/<id>
// (fetch once → paste the `thumbnail_url` here). They live on
// image-cdn-ak.spotifycdn.com which serves them directly to <img>.
type Song = {
  title: string;
  artist: string;
  spotify: string;
  cover: string;
};

const SONGS: Song[] = [
  {
    title: "Shallow",
    artist: "Lady Gaga & Bradley Cooper",
    spotify: "2VxeLyX666F8uXCJ0dZF8B",
    cover: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02b5d4b4ed17ec86c4b3944af2",
  },
  {
    title: "Those Eyes",
    artist: "New West",
    spotify: "50x1Ic8CaXkYNvjmxe3WXy",
    cover: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e021bb5dc21200bfc56d8f7ef41",
  },
  {
    title: "Boulevard of Broken Dreams",
    artist: "Green Day",
    spotify: "5GorCbAP4aL0EJ16frG2hd",
    cover: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e0291809a44f16f6434927c1e3f",
  },
  {
    title: "Iris",
    artist: "Goo Goo Dolls",
    spotify: "6Qyc6fS4DsZjB2mRW9DsQs",
    cover: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02ce5e0c89b768384d45d9b0fa",
  },
  {
    title: "Mystery of Love",
    artist: "Sufjan Stevens",
    spotify: "5GbVzc6Ex5LYlLJqzRQhuy",
    cover: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e0291a1c3c3d6fba1f63a010152",
  },
  {
    title: "Tell the Devil I'm Busy",
    artist: "JD Steel",
    spotify: "0McsuTJHbJVcdq8tucp9Qg",
    cover: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02a875d7eb2395ebdfe235bb3e",
  },
];

// Accepts a full share URL, a spotify: URI, or a bare 22-char ID.
function spotifyTrackId(s: string): string | null {
  if (!s) return null;
  const m = s.match(/track[/:]([a-zA-Z0-9]{22})/);
  if (m) return m[1];
  if (/^[a-zA-Z0-9]{22}$/.test(s)) return s;
  return null;
}

const GEEK_IDEAS = [
  "Gravitational waves and black holes",
  "Trying to convince myself that financial markets are not a made-up thing",
  "Detailed analysis of If I Can't Have Love, I Want Power",
  "Abstract art and the parts of it I don't understand",
  "How to escape Mumbai without escaping Mumbai",
];

// ── Constants ─────────────────────────────────────────────────────────────

const BG_HERO = "/backgrounds/speak-hero.jpg";
const BG_DOOR = "/backgrounds/speak-door.jpg";
const BG_DESK = "/backgrounds/speak-desk.jpg";

const EASE = [0.76, 0, 0.24, 1] as const;
const TXT_SHADOW = "0 2px 12px rgba(0,0,0,0.85), 0 1px 3px rgba(0,0,0,0.7)";

// ── Page ──────────────────────────────────────────────────────────────────

export default function LoungePage() {
  return (
    <main
      className="relative h-screen w-full overflow-hidden"
      style={{ background: "#0a0705", color: "#e8dcc4" }}
    >
      {/* Top nav */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex items-center"
        style={{
          height: 40,
          padding: "0 24px",
          background: "rgba(8,5,3,0.78)",
          borderBottom: "1px solid rgba(201,160,77,0.16)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <Link
          href="/"
          className="font-mono uppercase hover:opacity-70 transition-opacity"
          style={{
            fontSize: 11,
            letterSpacing: "0.25em",
            color: "#c9a04d",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          &lt;- Icicle
        </Link>
      </div>

      {/* Snap-scroll container — each section is its own viewport pane.
          Mobile gets gentle proximity snap (so iOS momentum scroll doesn't
          fight us); desktop gets crisp mandatory snap. */}
      <div
        className="h-screen w-full overflow-y-scroll overflow-x-hidden snap-y snap-proximity md:snap-mandatory"
        style={{ scrollBehavior: "smooth", WebkitOverflowScrolling: "touch" }}
      >
        <HeroSection />
        <CinemaBooksSection />
        <SongsSection />
        <IdeasSection />
      </div>

    </main>
  );
}

// ── Section: Hero ─────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      className="relative w-full min-h-screen md:h-screen snap-start overflow-hidden flex flex-col justify-center"
      style={{
        backgroundImage: `url(${BG_HERO})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        // 40px top padding clears the fixed nav band
        paddingTop: "clamp(80px, 8vw, 120px)",
        paddingBottom: "clamp(40px, 6vw, 80px)",
      }}
    >
      {/* Soft top fade so the lamps blend into the nav band */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{
          height: 80,
          background:
            "linear-gradient(180deg, rgba(7,5,3,0.85), transparent)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE }}
        className="relative text-center px-6"
      >
        <div className="flex items-center justify-center gap-4 mb-2">
          <Flourish />
          <h1
            className="font-serif font-light italic"
            style={{
              fontSize: "clamp(2.6rem, 6.4vw, 5.2rem)",
              letterSpacing: "0.02em",
              color: "#f0e6d0",
              textShadow:
                "0 4px 28px rgba(0,0,0,0.85), 0 0 40px rgba(201,160,77,0.18)",
            }}
          >
            The Speakeasy
          </h1>
          <Flourish flip />
        </div>

        <div className="flex items-center justify-center gap-3 mt-1">
          <span
            className="h-px"
            style={{
              width: "clamp(50px, 6vw, 100px)",
              background:
                "linear-gradient(to right, transparent, rgba(201,160,77,0.5))",
            }}
          />
          <p
            className="font-serif italic"
            style={{
              fontSize: "clamp(12px, 1.05vw, 15px)",
              color: "rgba(212,196,168,0.82)",
              textShadow: TXT_SHADOW,
            }}
          >
            after hours
          </p>
          <span
            className="h-px"
            style={{
              width: "clamp(50px, 6vw, 100px)",
              background:
                "linear-gradient(to left, transparent, rgba(201,160,77,0.5))",
            }}
          />
        </div>

        <p
          className="font-serif italic mx-auto mt-6 leading-relaxed"
          style={{
            fontSize: "clamp(13px, 1.1vw, 16px)",
            maxWidth: "min(560px, 80%)",
            color: "rgba(212,196,168,0.85)",
            textShadow: TXT_SHADOW,
          }}
        >
          &ldquo;Tell me what you watch and I&apos;ll tell you who you are.
          Tell me what you read and I&apos;ll tell you who you want to be.
          Tell me what you listen to and I&apos;ll tell you what you feel
          at 2 a.m.&rdquo;
        </p>

        <div
          className="flex items-center justify-center mt-9 flex-wrap"
          style={{ gap: "clamp(28px, 5vw, 64px)" }}
        >
          <Stamp label="Cinema" glyph="film" />
          <Stamp label="Music" glyph="note" />
          <Stamp label="Books" glyph="book" />
        </div>
      </motion.div>
    </section>
  );
}

// ── Section: Cinema | Door | Books ────────────────────────────────────────

function CinemaBooksSection() {
  return (
    <section
      className="relative w-full min-h-screen md:h-screen snap-start overflow-hidden flex flex-col justify-center"
      style={{
        backgroundImage: `url(${BG_DOOR})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        paddingTop: "clamp(60px, 6vw, 90px)",
        paddingBottom: "clamp(60px, 6vw, 90px)",
      }}
    >
      {/* Edge scrim — keeps text readable on either side, doorway in
          the middle stays warm/bright */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.05) 70%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      <div
        className="relative w-full mx-auto px-6 md:px-10 lg:px-16"
        style={{ maxWidth: 1300 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_minmax(0,0.55fr)_1fr] gap-10 md:gap-6 lg:gap-10 items-stretch">
          <ListPanel
            number="01"
            title="Cinema"
            tagline="the ones I return to"
            items={CINEMA.map((f) => ({
              title: f.title,
              meta: `${f.creator} · ${f.note}`,
            }))}
          />

          {/* Empty middle — doorway in bg shows through. Hidden on mobile. */}
          <div className="hidden md:block" />

          <ListPanel
            number="02"
            title="Books"
            tagline="the stack"
            items={BOOKS.map((b) => ({
              title: b.title,
              meta: `${b.author} · ${b.note}`,
            }))}
          />
        </div>
      </div>
    </section>
  );
}

// ── Section: Songs (dark bg, dummy squares) ──────────────────────────────

function SongsSection() {
  return (
    <section
      className="relative w-full min-h-screen md:h-screen snap-start overflow-hidden flex flex-col justify-center"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, #1a1208 0%, #0a0705 60%, #050302 100%)",
        paddingTop: "clamp(60px, 7vw, 100px)",
        paddingBottom: "clamp(60px, 7vw, 100px)",
      }}
    >
      <div
        className="relative w-full mx-auto px-6 md:px-10 lg:px-16"
        style={{ maxWidth: 1300 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-center mb-8 md:mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <span
              className="font-mono uppercase"
              style={{
                fontSize: "clamp(8px, 0.7vw, 10px)",
                letterSpacing: "0.4em",
                color: "rgba(201,160,77,0.7)",
              }}
            >
              03
            </span>
            <h2
              className="font-serif italic font-light"
              style={{
                fontSize: "clamp(26px, 3.2vw, 42px)",
                color: "#e8dcc4",
                textShadow: TXT_SHADOW,
              }}
            >
              Songs
            </h2>
          </div>
          <p
            className="font-serif italic"
            style={{
              fontSize: "clamp(11px, 1vw, 14px)",
              color: "rgba(138,115,80,0.92)",
            }}
          >
            — late-night rotations
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
          {SONGS.map((song, i) => {
            const id = spotifyTrackId(song.spotify);
            const href = id ? `https://open.spotify.com/track/${id}` : undefined;
            return (
              <motion.a
                key={i}
                href={href}
                target={href ? "_blank" : undefined}
                rel={href ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.07 }}
                className="group relative w-full aspect-square block overflow-hidden"
                style={{
                  borderRadius: 10,
                  border: "1px solid rgba(201,160,77,0.22)",
                  boxShadow: "0 10px 28px rgba(0,0,0,0.6)",
                  background: "#0a0705",
                }}
                title={`${song.title} — ${song.artist}`}
              >
                {/* Album cover — fills the square */}
                {song.cover && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={song.cover}
                    alt={`${song.title} album cover`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-[1.05]"
                  />
                )}

                {/* Bottom gradient scrim — keeps title/artist legible against
                    any cover. */}
                <div
                  aria-hidden
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.92) 100%)",
                  }}
                />

                {/* Spotify play badge top-right — appears on hover */}
                <div
                  aria-hidden
                  className="absolute flex items-center justify-center opacity-0 -translate-y-1 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100"
                  style={{
                    top: 10,
                    right: 10,
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: "rgba(30,215,96,0.96)",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.55)",
                  }}
                >
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="#000" aria-hidden>
                    <path d="M3 1.5v9l8-4.5z" />
                  </svg>
                </div>

                {/* Title + artist */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-3.5">
                  <p
                    className="font-serif italic leading-tight"
                    style={{
                      fontSize: "clamp(12px, 0.95vw, 15px)",
                      color: "#ffffff",
                      textShadow: "0 2px 6px rgba(0,0,0,0.9)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {song.title}
                  </p>
                  <p
                    className="font-mono uppercase mt-1"
                    style={{
                      fontSize: "clamp(8px, 0.6vw, 10px)",
                      letterSpacing: "0.2em",
                      color: "rgba(255,255,255,0.8)",
                      textShadow: "0 1px 4px rgba(0,0,0,0.9)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {song.artist}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Section: Ideas + Postcard ────────────────────────────────────────────

function IdeasSection() {
  return (
    <section
      className="relative w-full min-h-screen md:h-screen snap-start overflow-hidden flex flex-col justify-center"
      style={{
        backgroundImage: `url(${BG_DESK})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        paddingTop: "clamp(60px, 8vw, 120px)",
        paddingBottom: "clamp(60px, 8vw, 120px)",
      }}
    >
      {/* Right-side scrim — desk lamp on left needs to stay warm,
          right side darkens slightly for the postcard contrast */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.35) 75%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      <div
        className="relative w-full px-6 md:px-10 lg:px-16 flex md:justify-end"
      >
        {/* Ideas list — pushed all the way to the right so the lamp/desk
            on the left of the bg image stays uncluttered. */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.85, ease: EASE }}
          className="w-full md:w-[42%] lg:w-[38%] md:max-w-[460px]"
        >
          <div className="flex items-baseline gap-3 mb-5">
            <span
              className="font-mono uppercase"
              style={{
                fontSize: "clamp(8px, 0.7vw, 10px)",
                letterSpacing: "0.4em",
                color: "rgba(201,160,77,0.75)",
              }}
            >
              04
            </span>
            <h2
              className="font-serif italic font-light"
              style={{
                fontSize: "clamp(22px, 2.8vw, 36px)",
                color: "#f0e6d0",
                textShadow: TXT_SHADOW,
              }}
            >
              Ideas I geek about
            </h2>
          </div>

          <ul className="space-y-3">
            {GEEK_IDEAS.map((idea, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
                className="flex items-start gap-3 font-serif italic leading-relaxed"
                style={{
                  fontSize: "clamp(13px, 1.15vw, 17px)",
                  color: "rgba(232,220,196,0.92)",
                  textShadow: TXT_SHADOW,
                }}
              >
                <span
                  className="mt-[0.55em] flex-shrink-0"
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "rgba(201,160,77,0.85)",
                    boxShadow: "0 0 10px rgba(201,160,77,0.55)",
                  }}
                />
                <span>{idea}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

// ── Building blocks ───────────────────────────────────────────────────────

function ListPanel({
  number,
  title,
  tagline,
  items,
}: {
  number: string;
  title: string;
  tagline: string;
  items: { title: string; meta: string }[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.85, ease: EASE }}
      className="flex flex-col"
      style={{
        background: "rgba(8,5,3,0.55)",
        border: "1px solid rgba(201,160,77,0.18)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        padding: "clamp(20px, 2vw, 32px) clamp(20px, 2vw, 32px)",
      }}
    >
      <div className="flex items-baseline gap-3 mb-2">
        <span
          className="font-mono uppercase"
          style={{
            fontSize: "clamp(8px, 0.7vw, 10px)",
            letterSpacing: "0.4em",
            color: "rgba(201,160,77,0.75)",
          }}
        >
          {number}
        </span>
        <h2
          className="font-serif italic font-light"
          style={{
            fontSize: "clamp(22px, 2.4vw, 32px)",
            color: "#f0e6d0",
            textShadow: TXT_SHADOW,
          }}
        >
          {title}
        </h2>
      </div>

      <p
        className="font-serif italic mb-5"
        style={{
          fontSize: "clamp(11px, 1vw, 13px)",
          color: "rgba(168,140,96,0.92)",
        }}
      >
        — {tagline}
      </p>

      <div className="flex-1 flex flex-col gap-3">
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, delay: 0.15 + i * 0.06 }}
          >
            <p
              className="font-serif"
              style={{
                fontSize: "clamp(13px, 1.15vw, 16px)",
                color: "#e8dcc4",
                textShadow: TXT_SHADOW,
              }}
            >
              {it.title}
            </p>
            <p
              className="font-serif italic leading-snug mt-0.5"
              style={{
                fontSize: "clamp(11px, 0.9vw, 12px)",
                color: "rgba(168,140,96,0.78)",
              }}
            >
              {it.meta}
            </p>
          </motion.div>
        ))}
      </div>

    </motion.div>
  );
}

// ── Decorative bits ───────────────────────────────────────────────────────

function Flourish({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 38 14"
      style={{
        width: "clamp(22px, 3vw, 42px)",
        height: 14,
        opacity: 0.7,
        transform: flip ? "scaleX(-1)" : undefined,
        flexShrink: 0,
      }}
    >
      <path
        d="M2 7 H22 M22 7 Q26 7 28 4 Q30 1 32 4 Q34 7 36 7"
        stroke="rgba(201,160,77,0.85)"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="22" cy="7" r="1.4" fill="rgba(201,160,77,0.85)" />
    </svg>
  );
}

function Stamp({
  label,
  glyph,
}: {
  label: string;
  glyph: "film" | "note" | "book";
}) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative flex items-center justify-center"
        style={{
          width: "clamp(48px, 4.6vw, 64px)",
          height: "clamp(48px, 4.6vw, 64px)",
          borderRadius: "50%",
          border: "1px solid rgba(201,160,77,0.55)",
          background:
            "radial-gradient(circle at 35% 30%, rgba(201,160,77,0.18), rgba(0,0,0,0.4) 80%)",
          boxShadow:
            "inset 0 0 0 3px rgba(0,0,0,0.22), 0 4px 14px rgba(0,0,0,0.6)",
        }}
      >
        <StampGlyph glyph={glyph} />
        <span
          aria-hidden
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "repeating-conic-gradient(rgba(201,160,77,0.4) 0deg 4deg, transparent 4deg 16deg)",
            mask:
              "radial-gradient(circle, transparent 60%, black 60%, black 64%, transparent 65%)",
            WebkitMask:
              "radial-gradient(circle, transparent 60%, black 60%, black 64%, transparent 65%)",
          }}
        />
      </div>
      <p
        className="font-mono uppercase mt-2"
        style={{
          fontSize: "clamp(9px, 0.72vw, 11px)",
          letterSpacing: "0.34em",
          color: "rgba(201,160,77,0.9)",
          textShadow: TXT_SHADOW,
        }}
      >
        {label}
      </p>
    </div>
  );
}

function StampGlyph({ glyph }: { glyph: "film" | "note" | "book" }) {
  const stroke = "rgba(232,220,196,0.85)";
  if (glyph === "film") {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="5" width="16" height="12" rx="1" stroke={stroke} strokeWidth="1.2" />
        <rect x="3" y="7" width="2" height="2" stroke={stroke} strokeWidth="0.8" />
        <rect x="3" y="13" width="2" height="2" stroke={stroke} strokeWidth="0.8" />
        <rect x="17" y="7" width="2" height="2" stroke={stroke} strokeWidth="0.8" />
        <rect x="17" y="13" width="2" height="2" stroke={stroke} strokeWidth="0.8" />
        <circle cx="11" cy="11" r="2.2" stroke={stroke} strokeWidth="1" />
      </svg>
    );
  }
  if (glyph === "note") {
    return (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M9 16 V6 L17 4 V14" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="7.5" cy="16" r="2" stroke={stroke} strokeWidth="1.2" />
        <circle cx="15.5" cy="14" r="2" stroke={stroke} strokeWidth="1.2" />
      </svg>
    );
  }
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M5 4 H14 a3 3 0 0 1 3 3 v11 a2 2 0 0 0 -2 -2 H5 z" stroke={stroke} strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M5 4 v12" stroke={stroke} strokeWidth="1.2" />
      <path d="M9 8 H14 M9 11 H13" stroke={stroke} strokeWidth="0.9" strokeLinecap="round" />
    </svg>
  );
}
