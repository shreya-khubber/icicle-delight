"use client";

export default function GalleryRoom() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">

      {/* Floor band */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: "28%", background: "linear-gradient(to bottom, #f0f0ee 0%, #e8e8e5 100%)" }}
      />

      {/* Perspective floor lines */}
      <svg
        className="absolute bottom-0 left-0 right-0"
        style={{ height: "30%", width: "100%" }}
        viewBox="0 0 1440 300"
        preserveAspectRatio="none"
      >
        {[-300,-180,-60,60,180,300,420,540,660,780,900,1020,1140,1260,1380,1500,1620,1740].map((x,i)=>(
          <line key={i} x1={720} y1={0} x2={x} y2={300} stroke="#c8c8c4" strokeWidth="0.6" opacity="0.6" />
        ))}
        {[60,120,180,240].map((y)=>(
          <line key={y} x1={0} y1={y} x2={1440} y2={y} stroke="#c8c8c4" strokeWidth="0.4" opacity="0.4" />
        ))}
      </svg>

      {/* Wall–floor seam */}
      <div className="absolute left-0 right-0 h-px bg-g-mid/30" style={{ bottom: "28%" }} />

      {/* LEFT WALL art */}
      <svg
        className="absolute left-0 bottom-0 draw-line"
        style={{ height: "52%", width: "18%", opacity: 0.18 }}
        viewBox="0 0 200 300"
        preserveAspectRatio="xMinYMax meet"
      >
        <polyline
          points="0,300 0,240 30,240 30,200 70,200 70,160 110,160 110,120 150,120 150,80 200,80"
          fill="none" stroke="#111" strokeWidth="3" strokeLinejoin="miter"
        />
        <polyline
          points="20,240 20,140 35,100 50,140 50,240"
          fill="none" stroke="#111" strokeWidth="2.5"
        />
        <line x1="35" y1="100" x2="35" y2="60" stroke="#111" strokeWidth="2" />
        <line x1="20" y1="170" x2="50" y2="170" stroke="#111" strokeWidth="1.5" />
      </svg>

      {/* RIGHT WALL art */}
      <svg
        className="absolute right-0 bottom-0 draw-line-slow"
        style={{ height: "60%", width: "18%", opacity: 0.18 }}
        viewBox="0 0 260 380"
        preserveAspectRatio="xMaxYMax meet"
      >
        {Array.from({ length: 14 }, (_, i) => {
          const angle = (i / 13) * Math.PI * 0.75 + Math.PI * 0.12;
          const len = 280;
          return (
            <line key={i}
              x1={260} y1={380}
              x2={260 + Math.cos(angle) * len}
              y2={380 - Math.sin(angle) * len}
              stroke="#111"
              strokeWidth={i % 3 === 0 ? "1.2" : "0.6"}
              opacity="0.7"
            />
          );
        })}
        <path
          d="M 80,380 L 80,200 Q 80,150 120,150 Q 160,150 160,200 L 160,380"
          fill="none" stroke="#111" strokeWidth="2.5"
        />
        <rect x="102" y="220" width="36" height="44" fill="none" stroke="#111" strokeWidth="1.2" />
      </svg>
    </div>
  );
}
