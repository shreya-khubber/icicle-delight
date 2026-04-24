"use client";

/**
 * Tiny SVG "paintings" inside the gallery frames.
 * Each variant is a different abstract composition — pure SVG, no images.
 */
export default function MiniPainting({ variant }: { variant: number }) {
  const v = variant % 4;

  if (v === 0) {
    // Tonal landscape — distant hills at dusk
    return (
      <svg viewBox="0 0 200 140" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="mp0sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d6b87a" />
            <stop offset="60%" stopColor="#a08a55" />
            <stop offset="100%" stopColor="#5a4d30" />
          </linearGradient>
        </defs>
        <rect width="200" height="140" fill="url(#mp0sky)" />
        <circle cx="140" cy="48" r="14" fill="#f3deaa" opacity="0.85" />
        <path d="M 0,98 Q 50,78 100,92 T 200,86 L 200,140 L 0,140 Z" fill="#3a4a3a" />
        <path d="M 0,112 Q 60,96 120,108 T 200,104 L 200,140 L 0,140 Z" fill="#1f2e1f" />
        <path d="M 0,126 L 200,126" stroke="rgba(0,0,0,0.25)" strokeWidth="0.4" />
      </svg>
    );
  }

  if (v === 1) {
    // Ink portrait — single contour line on cream
    return (
      <svg viewBox="0 0 200 140" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <rect width="200" height="140" fill="#e8e0c8" />
        <g stroke="#1a1a1a" strokeWidth="0.9" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 80,30 Q 60,40 60,70 Q 60,98 82,108 Q 104,116 118,104 Q 132,92 130,68 Q 128,42 110,32 Q 96,26 80,30 Z" />
          <path d="M 78,68 Q 82,72 86,68" />
          <path d="M 102,68 Q 106,72 110,68" />
          <path d="M 94,80 L 92,90 Q 96,94 102,90" />
          <path d="M 86,98 Q 96,102 106,98" />
        </g>
        <text x="184" y="132" fontFamily="serif" fontSize="6" fontStyle="italic" fill="#1a1a1a" textAnchor="end">sk</text>
      </svg>
    );
  }

  if (v === 2) {
    // Abstract colour field — teal & ochre
    return (
      <svg viewBox="0 0 200 140" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <rect width="200" height="140" fill="#1f3a3a" />
        <rect x="0" y="0" width="200" height="62" fill="#2d5a5a" />
        <rect x="0" y="62" width="200" height="6" fill="#c9a84c" />
        <circle cx="62" cy="34" r="20" fill="#e8d8a0" opacity="0.9" />
        <rect x="120" y="86" width="56" height="38" fill="#7a3030" opacity="0.85" />
        <line x1="0" y1="100" x2="200" y2="100" stroke="rgba(232,224,200,0.2)" strokeWidth="0.4" />
      </svg>
    );
  }

  // v === 3 — botanical study
  return (
    <svg viewBox="0 0 200 140" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <rect width="200" height="140" fill="#f1e8d2" />
      <g stroke="#2e3a1e" strokeWidth="0.8" fill="none">
        <path d="M 100,130 Q 100,90 96,60 Q 92,32 100,18" />
        <path d="M 100,108 Q 80,100 70,82" />
        <path d="M 100,90 Q 122,86 132,68" />
        <path d="M 100,72 Q 84,66 78,50" />
        <path d="M 100,54 Q 116,50 122,38" />
      </g>
      <g fill="#5e7a3a" opacity="0.85">
        <ellipse cx="68" cy="80" rx="9" ry="4" transform="rotate(-30 68 80)" />
        <ellipse cx="134" cy="66" rx="9" ry="4" transform="rotate(30 134 66)" />
        <ellipse cx="76" cy="48" rx="8" ry="3.5" transform="rotate(-25 76 48)" />
        <ellipse cx="124" cy="36" rx="8" ry="3.5" transform="rotate(25 124 36)" />
      </g>
      <circle cx="100" cy="20" r="6" fill="#c44a4a" opacity="0.85" />
      <circle cx="100" cy="20" r="2" fill="#3a1818" />
    </svg>
  );
}
