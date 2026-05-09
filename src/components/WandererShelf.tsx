"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WandererBook } from "@/data/galleryData";

interface WandererShelfProps {
  books: WandererBook[];
}

export default function WandererShelf({ books }: WandererShelfProps) {
  const [activeBook, setActiveBook] = useState<WandererBook | null>(null);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveBook(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeBook ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeBook]);

  return (
    <div className="relative">
      <div
        className="relative overflow-hidden rounded-[42px] border border-[#8f7050]/20 bg-[radial-gradient(circle_at_top,_rgba(255,255,248,0.72),_rgba(240,227,210,0.85)_35%,_rgba(210,185,160,0.95)_80%)] px-6 py-8 shadow-[0_40px_140px_rgba(28,18,10,0.24)]"
        style={{ perspective: 1200 }}
      >
        <div className="absolute inset-x-0 top-0 h-20 bg-[radial-gradient(circle,_rgba(255,255,255,0.36),_transparent_50%)]" />
        <div className="absolute inset-x-0 bottom-0 h-20 rounded-b-[34px] bg-[radial-gradient(circle_at_top,_rgba(72,45,22,0.18),_transparent_60%)] shadow-inner" />

        <div className="relative mx-auto h-[620px] max-w-[1480px] transform-gpu overflow-visible rounded-[32px] bg-[#7b5b38]/90 px-4 pt-4 pb-10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
          style={{ transformStyle: "preserve-3d", transform: "rotateX(10deg) translateZ(0)" }}
        >
          <div className="absolute inset-x-10 -bottom-6 h-16 rounded-t-[24px] bg-[#472f18] shadow-[0_32px_72px_rgba(0,0,0,0.22)]" />
          <div className="absolute left-10 right-10 bottom-8 h-4 rounded-full bg-[#9e7b4e]/80 blur-sm" />

          <div className="relative flex h-full items-end overflow-x-auto pb-8 pl-10 pr-6" style={{ perspective: 1400 }}>
            <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#7b5b38] to-transparent" />
            <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#7b5b38] to-transparent" />
            <div className="relative flex gap-4 pb-6" style={{ transformStyle: "preserve-3d" }}>
              {books.map((book, index) => {
                const offsetDeg = index * 2 - 8;
                const zDepth = 20 + Math.abs(index - Math.floor(books.length / 2)) * 4;
                return (
                  <motion.button
                    key={book.id}
                    type="button"
                    onClick={() => setActiveBook(book)}
                    whileHover={{ y: -10, rotateZ: -1 }}
                    transition={{ type: "spring", stiffness: 220, damping: 22 }}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-[18px] border border-black/10 bg-[#111111]/10 shadow-[0_18px_48px_rgba(0,0,0,0.24)] backdrop-blur-sm"
                    style={{
                      width: book.width,
                      height: book.height,
                      transform: `translateZ(${zDepth}px) rotateY(${offsetDeg}deg)`,
                    }}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_46%)]" />
                    <div className="absolute inset-0" style={{ background: book.spineGradient }} />
                    <div className="absolute inset-x-0 top-0 h-5 bg-[linear-gradient(180deg,rgba(255,255,255,0.2),transparent)]" />
                    <div className="absolute right-0 top-0 h-full w-6 bg-[linear-gradient(90deg,rgba(255,255,255,0.14),transparent)]" />
                    <div className="absolute left-0 right-0 top-0 h-12 bg-[linear-gradient(180deg,rgba(0,0,0,0.14),transparent)]" />
                    <div className="absolute inset-x-0 bottom-0 h-16 rounded-b-[18px] bg-black/10 backdrop-blur-sm" />
                    <div className="relative z-10 flex h-full flex-col justify-end px-3 pb-3 text-white">
                      <p className="font-sans text-[9px] uppercase tracking-[0.35em] text-white/70">{book.category}</p>
                      <h3 className="mt-3 font-serif text-[15px] leading-tight tracking-[-0.02em] text-white">{book.title}</h3>
                      <p className="mt-3 text-[9px] uppercase tracking-[0.32em] text-white/70">{book.status}</p>
                    </div>
                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center rounded-[18px] bg-black/40 px-4 text-center text-[10px] leading-5 text-white opacity-0 transition duration-300 group-hover:opacity-100">
                      <div className="mb-3 h-0.5 w-10 rounded-full bg-white/60" />
                      <p>{book.summary}</p>
                      <div className="mt-4 h-0.5 w-10 rounded-full bg-white/60" />
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeBook && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setActiveBook(null)} />
            <motion.div
              className="relative z-10 w-full max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-[#221c15]/95 shadow-[0_45px_140px_rgba(0,0,0,0.45)]"
              initial={{ scale: 0.96, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 20, opacity: 0 }}
              transition={{ duration: 0.26, ease: [0.76, 0, 0.24, 1] }}
            >
              <div className="border-b border-white/10 bg-[#2d251c] px-8 py-6 text-white">
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#a69c8d]">{activeBook.category}</p>
                    <h3 className="mt-2 text-3xl font-serif tracking-[-0.03em] text-white">{activeBook.title}</h3>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-[#d7c9b2]">{activeBook.longDescription}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveBook(null)}
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-[#f8f4ee] transition hover:border-white/40 hover:bg-white/10"
                  >
                    Close
                  </button>
                </div>
                <div className="mt-6 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.32em] text-[#b3a893]">
                  <span>{activeBook.timeframe}</span>
                  <span>·</span>
                  <span>{activeBook.status}</span>
                  <span>·</span>
                  <span>{activeBook.tags.join(" · ")}</span>
                </div>
              </div>

              <div className="grid gap-6 px-8 py-8 md:grid-cols-[1fr_1fr]">
                <div className="space-y-6 rounded-[24px] border border-white/10 bg-[#f1e8de] p-6 text-[#2f2418] shadow-[0_30px_80px_rgba(0,0,0,0.08)]">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.32em] text-[#8d7d69]">What I did</p>
                    <p className="mt-3 text-sm leading-7">{activeBook.whatIDid}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.32em] text-[#8d7d69]">What I learned</p>
                    <p className="mt-3 text-sm leading-7">{activeBook.whatILearned}</p>
                  </div>
                </div>
                <div className="space-y-6 rounded-[24px] border border-white/10 bg-[#f1e8de] p-6 text-[#2f2418] shadow-[0_30px_80px_rgba(0,0,0,0.08)]">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.32em] text-[#8d7d69]">Outcome</p>
                    <p className="mt-3 text-sm leading-7">{activeBook.outcome}</p>
                  </div>
                  {activeBook.links?.length ? (
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.32em] text-[#8d7d69]">Links</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {activeBook.links.map((link) => (
                          <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center rounded-full border border-[#cdbfa7] bg-[#2b1f18] px-4 py-2 text-[11px] font-mono text-[#f4ede2] transition hover:bg-[#3d2a1f] hover:border-[#e5d8c3]"
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
