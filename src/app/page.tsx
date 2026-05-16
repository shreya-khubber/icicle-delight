"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import HamburgerMenu from "@/components/HamburgerMenu";
import Artwork from "@/components/Artwork";
import { galleryPieces } from "@/data/galleryData";

const BG_HERO      = "/backgrounds/hero.jpg";
const BG_EXHIBITS  = "/backgrounds/exhibits.jpg";
const BG_SPEAKEASY = "/backgrounds/speakeasy.jpg";

const SHADOW      = "0 2px 12px rgba(0,8,24,0.7), 0 1px 3px rgba(0,8,24,0.5)";
const SHADOW_SOFT = "0 1px 6px rgba(0,8,24,0.6)";

const mkS = (size: number) => ({ viewBox: "0 0 24 24", fill: "none" as const, stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, width: size, height: size });

const IconDollar    = ({ s = 26 }: { s?: number }) => <svg {...mkS(s)}><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
const IconBriefcase = ({ s = 26 }: { s?: number }) => <svg {...mkS(s)}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><line x1="2" y1="12" x2="22" y2="12"/></svg>;
const IconTrend     = ({ s = 26 }: { s?: number }) => <svg {...mkS(s)}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>;
const IconMusic     = ({ s = 26 }: { s?: number }) => <svg {...mkS(s)}><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>;
const IconCamera    = ({ s = 26 }: { s?: number }) => <svg {...mkS(s)}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>;
const IconCompass   = ({ s = 26 }: { s?: number }) => <svg {...mkS(s)}><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>;

const ICONS = [
  { href: "/gallery/career",       Icon: IconDollar,    label: "Career"   },
  { href: "/gallery/projects",     Icon: IconBriefcase, label: "Projects" },
  { href: "/gallery/ideas",        Icon: IconTrend,     label: "Ideas"    },
  { href: "/gallery/writer",       Icon: IconMusic,     label: "Writer"   },
  { href: "/gallery/art/corridor", Icon: IconCamera,    label: "Art"      },
  { href: "/contact",              Icon: IconCompass,   label: "Contact"  },
];

const Divider = () => (
  <div className="flex items-center gap-3 w-full opacity-40">
    <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.5)" }} />
    <span style={{ color: "#ffffff", fontSize: 11 }}>✦</span>
    <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.5)" }} />
  </div>
);

const ATM_DESKTOP = "radial-gradient(ellipse 90% 85% at 50% 50%, rgba(3,8,22,0.42) 0%, rgba(3,8,22,0.22) 42%, transparent 72%)";
const ATM_MOBILE  = "radial-gradient(ellipse 100% 90% at 50% 50%, rgba(3,8,22,0.46) 0%, rgba(3,8,22,0.24) 44%, transparent 70%)";

export default function Home() {
  return (
    <main className="relative h-screen overflow-hidden bg-[#070d1a]">
      <HamburgerMenu />
      <div
        className="relative z-10 h-screen overflow-y-scroll overflow-x-hidden snap-y snap-proximity md:snap-mandatory"
        style={{ scrollBehavior: "smooth", WebkitOverflowScrolling: "touch" }}
      >
        <HeroSection />
        <ExhibitsSection />
        <SpeakeasySection />
      </div>
    </main>
  );
}

// ── Section 1: HERO ───────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      className="min-h-screen h-screen snap-start relative flex flex-col overflow-hidden"
      style={{ backgroundImage: `url(${BG_HERO})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div
        className="absolute inset-0 block md:hidden"
        style={{ backgroundImage: "url('/backgrounds/Landing%20page%20mobile.png')", backgroundSize: "cover", backgroundPosition: "center top", zIndex: 0 }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, rgba(7,13,26,0.42) 0%, rgba(7,13,26,0.08) 35%, rgba(7,13,26,0) 55%, rgba(7,13,26,0.55) 100%)" }}
      />

      <div className="relative flex-1 flex flex-col items-center justify-between px-6 py-14 md:py-12">

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
            className="font-serif font-light"
            style={{ fontSize: "clamp(4rem, 12vw, 10rem)", letterSpacing: "-0.02em", color: "#ffffff", lineHeight: 1, textShadow: "0 6px 32px rgba(0,8,24,0.55), 0 1px 4px rgba(0,8,24,0.4)" }}
          >
            Icicle
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="font-serif italic text-lg sm:text-xl mt-3"
            style={{ color: "#ffffff", textShadow: SHADOW }}
          >
            Shreya Khubber
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.95, ease: [0.76, 0, 0.24, 1] }}
            className="h-px w-24 mx-auto my-5 origin-center"
            style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.7), transparent)" }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.05 }}
            className="font-serif italic text-sm sm:text-base max-w-sm mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.88)", textShadow: SHADOW }}
          >
            &ldquo;Each work is a window into a different room of the same mind. Begin anywhere.&rdquo;
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex items-center justify-center gap-6 md:gap-10"
          style={{ flexWrap: "nowrap" }}
        >
          {ICONS.map((item, i) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 1.25 + i * 0.07 }}
            >
              <Link
                href={item.href}
                aria-label={item.label}
                style={{ display: "block", color: "rgba(255,255,255,0.65)", transition: "color 0.2s ease, transform 0.2s ease" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#ffffff"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
              >
                <span className="hidden md:block"><item.Icon s={26} /></span>
                <span className="md:hidden"><item.Icon s={20} /></span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="w-full max-w-4xl"
        >
          <div className="hidden md:flex items-start justify-between gap-6">
            <div className="relative" style={{ maxWidth: 240, isolation: "isolate" }}>
              <div aria-hidden style={{ position: "absolute", inset: "-48px -56px", background: ATM_DESKTOP, pointerEvents: "none", zIndex: -1 }} />
              <h3 className="font-serif text-xl mb-3" style={{ color: "#ffffff", textShadow: SHADOW }}>I&rsquo;m Shreya.</h3>
              <p className="text-sm leading-relaxed font-serif" style={{ color: "rgba(255,255,255,0.82)", textShadow: SHADOW_SOFT }}>
                By education an Engineer, by work a Fixed Income Quant, by this website apparently a lot of other things too. I press buttons for a living and got tired of being reduced to a LinkedIn profile so I built this website instead.
              </p>
            </div>

            <div className="relative" style={{ maxWidth: 240, isolation: "isolate" }}>
              <div aria-hidden style={{ position: "absolute", inset: "-48px -56px", background: ATM_DESKTOP, pointerEvents: "none", zIndex: -1 }} />
              <p className="text-sm leading-relaxed font-serif" style={{ color: "rgba(255,255,255,0.82)", textShadow: SHADOW_SOFT }}>
                If something here makes you think, argue, or want to talk bonds or startups or Sufjan Stevens or abstract art you also don&rsquo;t fully understand, reach out. I&rsquo;m easy to reach and I reply.
              </p>
            </div>
          </div>

          <div className="md:hidden flex flex-col items-center gap-4 text-center">
            <Divider />
            <div className="relative w-full" style={{ isolation: "isolate" }}>
              <div aria-hidden style={{ position: "absolute", inset: "-36px -24px", background: ATM_MOBILE, pointerEvents: "none", zIndex: -1 }} />
              <h3 className="font-serif text-xl mb-2" style={{ color: "#ffffff", textShadow: SHADOW }}>I&rsquo;m Shreya.</h3>
              <p className="text-sm leading-relaxed font-serif" style={{ color: "rgba(255,255,255,0.82)", textShadow: SHADOW_SOFT }}>
                By education an Engineer, by work a Fixed Income Quant, by this website apparently a lot of other things too. I press buttons for a living and got tired of being reduced to a LinkedIn profile so I built this website instead.
              </p>
            </div>
            <Divider />
            <div className="relative w-full" style={{ isolation: "isolate" }}>
              <div aria-hidden style={{ position: "absolute", inset: "-36px -24px", background: ATM_MOBILE, pointerEvents: "none", zIndex: -1 }} />
              <p className="text-sm leading-relaxed font-serif" style={{ color: "rgba(255,255,255,0.82)", textShadow: SHADOW_SOFT }}>
                If something here makes you think, argue, or want to talk bonds or startups or Sufjan Stevens or abstract art you also don&rsquo;t fully understand, reach out. I&rsquo;m easy to reach and I reply.
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-6 md:mt-8">
            <a
              href="#exhibits"
              className="group inline-flex items-center gap-3"
              style={{
                padding: "14px 32px",
                border: "1px solid rgba(255,255,255,0.55)",
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                color: "#ffffff",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                textShadow: SHADOW_SOFT,
                transition: "background 250ms ease, border-color 250ms ease",
                textDecoration: "none",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.14)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.85)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.55)"; }}
            >
              Explore my world
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Section 2: EXHIBITS ───────────────────────────────────────────────────────
function ExhibitsSection() {
  return (
    <section
      id="exhibits"
      className="min-h-screen md:h-screen snap-start relative flex flex-col items-center justify-center px-6 py-20 md:py-16"
      style={{ backgroundImage: `url(${BG_EXHIBITS})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, rgba(7,13,26,0.5) 0%, rgba(7,13,26,0.2) 35%, rgba(7,13,26,0) 65%)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="relative w-full max-w-6xl mb-10 md:mb-14"
      >
        <div className="flex items-center gap-5">
          <div className="h-px bg-white/40 flex-1" />
          <p className="text-[10px] sm:text-[11px] tracking-[0.32em] uppercase font-mono whitespace-nowrap" style={{ color: "#ffffff", textShadow: SHADOW }}>
            Exhibits to my life
          </p>
          <div className="h-px bg-white/40 flex-1" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
        className="relative w-full max-w-[1500px] mx-auto"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-7 lg:gap-8">
          {galleryPieces.map((piece, i) => (
            <ExhibitCard key={piece.id} piece={piece} index={i} />
          ))}
        </div>
      </motion.div>

      <motion.a
        href="#speakeasy"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.8 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}
        onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
        onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
      >
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase" }}>speakeasy</span>
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ fontSize: 14, lineHeight: 1 }}
        >
          ↓
        </motion.span>
      </motion.a>
    </section>
  );
}

function ExhibitCard({ piece, index }: { piece: (typeof galleryPieces)[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.7, delay: 0.25 + index * 0.08, ease: [0.76, 0, 0.24, 1] }}
    >
      <Link href={piece.id === "art" ? "/gallery/art/corridor" : `/gallery/${piece.id}`} className="group block">
        <div
          className="relative overflow-hidden transition-all duration-500"
          style={{ background: "rgba(10,16,32,0.45)", border: "1px solid rgba(255,255,255,0.16)", backdropFilter: "blur(8px)" }}
        >
          <div className="aspect-square overflow-hidden bg-[#0a1020]">
            <Artwork type={piece.artworkType} />
          </div>
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,252,235,0.15) 0%, transparent 65%)" }}
          />
        </div>
        <div className="mt-3 sm:mt-4 px-1">
          <h3 className="font-serif text-base sm:text-lg leading-tight group-hover:text-white transition-colors duration-300" style={{ color: "#ffffff", textShadow: SHADOW }}>
            {piece.title}
          </h3>
          <p className="font-serif italic text-xs sm:text-[13px] mt-1 leading-snug" style={{ color: "rgba(255,255,255,0.7)", textShadow: SHADOW_SOFT }}>
            {piece.subtitle}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

// ── Section 3: SPEAKEASY ──────────────────────────────────────────────────────
function SpeakeasySection() {
  return (
    <section
      id="speakeasy"
      className="min-h-screen md:h-screen snap-start relative flex flex-col px-6 md:px-12 lg:px-20 py-16 md:py-12"
      style={{ backgroundImage: `url(${BG_SPEAKEASY})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(90deg, rgba(7,13,26,0.65) 0%, rgba(7,13,26,0.15) 30%, rgba(7,13,26,0) 50%, rgba(7,13,26,0.15) 70%, rgba(7,13,26,0.65) 100%)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="relative flex-1 flex items-center w-full max-w-[1400px] mx-auto"
      >
        <div className="max-w-md md:max-w-lg">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase mb-5" style={{ color: "rgba(214,178,111,0.85)", textShadow: SHADOW_SOFT }}>
            Speakeasy
          </p>
          <h2
            className="font-serif font-light leading-[1.05]"
            style={{ fontSize: "clamp(2.4rem, 4.6vw, 4rem)", color: "#ffffff", textShadow: "0 4px 22px rgba(0,8,24,0.7), 0 1px 3px rgba(0,8,24,0.5)" }}
          >
            The Everything<br />Else
          </h2>
          <Link
            href="/lounge"
            className="group inline-flex items-center gap-3 mt-8"
            style={{
              padding: "12px 28px",
              border: "1px solid rgba(214,178,111,0.7)",
              background: "rgba(20,16,8,0.55)",
              backdropFilter: "blur(6px)",
              color: "#e8c878",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              transition: "background 250ms ease, border-color 250ms ease, color 250ms ease",
              textDecoration: "none",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(40,28,12,0.75)"; e.currentTarget.style.borderColor = "rgba(232,200,120,0.95)"; e.currentTarget.style.color = "#ffe49c"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(20,16,8,0.55)"; e.currentTarget.style.borderColor = "rgba(214,178,111,0.7)"; e.currentTarget.style.color = "#e8c878"; }}
          >
            Step inside
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </motion.div>

      <div className="relative pt-10 mt-6 border-t border-white/10">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {[
            { label: "Email",     href: "mailto:shreya.khubber@gmail.com" },
            { label: "LinkedIn",  href: "https://linkedin.com/in/shreya-khubber" },
            { label: "GitHub",    href: "https://github.com/shreya-khubber" },
            { label: "Instagram", href: "https://www.instagram.com/migratinglife/" },
          ].map(link => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="font-mono text-[10px] tracking-[0.3em] uppercase transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.6)", textShadow: SHADOW_SOFT }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(232,200,120,0.95)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
