"use client";

import { useEffect } from "react";
import { GalleryPiece } from "@/data/galleryData";

interface SlidePanelProps {
  piece: GalleryPiece | null;
  onClose: () => void;
}

export default function SlidePanel({ piece, onClose }: SlidePanelProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    if (piece) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [piece]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-gallery-ink transition-opacity duration-500 z-40 ${
          piece ? "opacity-30 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-lg bg-gallery-wall z-50 shadow-2xl flex flex-col transition-transform duration-500 ease-in-out ${
          piece ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Top bar */}
        <div className="flex items-start justify-between px-8 pt-8 pb-6 border-b border-gallery-frame/40">
          <div>
            <p className="text-gallery-muted text-xs tracking-[0.2em] uppercase font-sans mb-1">
              {piece?.catalogNumber} — Exhibit Label
            </p>
            <h2 className="font-serif text-3xl text-gallery-ink leading-tight">
              {piece?.title}
            </h2>
            <p className="font-serif text-gallery-muted text-lg italic mt-0.5">
              {piece?.subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gallery-muted hover:text-gallery-ink transition-colors mt-1 p-1"
            aria-label="Close panel"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="4" y1="4" x2="16" y2="16" />
              <line x1="16" y1="4" x2="4" y2="16" />
            </svg>
          </button>
        </div>

        {/* Metadata strip */}
        <div className="flex gap-8 px-8 py-4 border-b border-gallery-frame/30 bg-gallery-frame/10">
          <div>
            <p className="text-gallery-muted text-[10px] tracking-widest uppercase font-sans">Period</p>
            <p className="text-gallery-ink text-sm font-sans mt-0.5">{piece?.period}</p>
          </div>
          <div>
            <p className="text-gallery-muted text-[10px] tracking-widest uppercase font-sans">Medium</p>
            <p className="text-gallery-ink text-sm font-sans mt-0.5">{piece?.medium}</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-7">
          {piece && (
            <>
              <p className="font-serif text-gallery-ink text-lg leading-relaxed mb-8 italic">
                &ldquo;{piece.panel.intro}&rdquo;
              </p>

              <div className="space-y-7">
                {piece.panel.sections.map((section, i) => (
                  <div key={i}>
                    <h3 className="text-[10px] tracking-[0.2em] uppercase font-sans text-gallery-gold font-medium mb-2">
                      {section.heading}
                    </h3>
                    <p className="font-sans text-gallery-ink text-sm leading-relaxed text-[0.88rem]">
                      {section.body}
                    </p>
                  </div>
                ))}
              </div>

              {piece.panel.links && piece.panel.links.length > 0 && (
                <div className="mt-10 pt-6 border-t border-gallery-frame/40 flex flex-wrap gap-3">
                  {piece.panel.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 border border-gallery-gold text-gallery-gold text-xs tracking-widest uppercase font-sans hover:bg-gallery-gold hover:text-white transition-colors"
                    >
                      {link.label}
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.2">
                        <path d="M1 9L9 1M9 1H3M9 1V7" />
                      </svg>
                    </a>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-4 border-t border-gallery-frame/30">
          <p className="text-gallery-muted text-[10px] tracking-widest uppercase font-sans text-center">
            Khubber Gallery — Permanent Collection
          </p>
        </div>
      </div>
    </>
  );
}
