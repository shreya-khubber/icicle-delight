"use client";

import { useMemo } from "react";

/**
 * Floating dust particles drifting through the corridor air.
 * Pure CSS animation — cheap, no JS per-frame.
 */
export default function DustMotes({ count = 22 }: { count?: number }) {
  const motes = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const seed = (i * 9301 + 49297) % 233280;
        const r = seed / 233280;
        const r2 = ((i * 71 + 13) % 100) / 100;
        const r3 = ((i * 113 + 41) % 100) / 100;
        return {
          left: `${10 + r * 80}%`,
          top: `${15 + r2 * 65}%`,
          size: 1.2 + r3 * 2.2,
          opacity: 0.18 + r3 * 0.32,
          duration: 14 + r * 18,
          delay: -r2 * 20,
          drift: (r - 0.5) * 30,
        };
      }),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ zIndex: 5 }}>
      {motes.map((m, i) => (
        <span
          key={i}
          className="dust-mote"
          style={
            {
              left: m.left,
              top: m.top,
              width: m.size,
              height: m.size,
              opacity: m.opacity,
              animationDuration: `${m.duration}s`,
              animationDelay: `${m.delay}s`,
              ["--drift" as never]: `${m.drift}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
