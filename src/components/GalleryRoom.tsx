"use client";

import { useRef, useEffect } from "react";

export default function GalleryRoom() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => {});

    const resume = () => {
      if (!document.hidden && video.paused) video.play().catch(() => {});
    };

    document.addEventListener("visibilitychange", resume);
    document.addEventListener("focus", resume);
    video.addEventListener("pause", () => video.play().catch(() => {}));

    return () => {
      document.removeEventListener("visibilitychange", resume);
      document.removeEventListener("focus", resume);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">

      {/* Background video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/Background.mp4?v=2" type="video/mp4" />
      </video>

      {/* Dark navy gradient — heaviest at top where hero text lives, fades to nothing before the floor */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,15,40,0.58) 0%, rgba(5,15,40,0.42) 38%, rgba(5,15,40,0.18) 62%, rgba(5,15,40,0.04) 76%, transparent 88%)",
        }}
      />

      {/* Floor band */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: "28%", background: "linear-gradient(to bottom, #f0f0ee 0%, #e8e8e5 100%)" }}
      />

      {/* Perspective floor lines — SVG height matches floor band so y=0 lands exactly at the seam */}
      <svg
        className="absolute bottom-0 left-0 right-0"
        style={{ height: "28%", width: "100%" }}
        viewBox="0 0 1440 300"
        preserveAspectRatio="none"
      >
        {[-300,-180,-60,60,180,300,420,540,660,780,900,1020,1140,1260,1380,1500,1620,1740].map((x,i)=>(
          <line key={i} x1={720} y1={0} x2={x} y2={300} stroke="#c8c8c4" strokeWidth="1.1" opacity="0.85" />
        ))}
        {[75,150,220,280].map((y)=>(
          <line key={y} x1={0} y1={y} x2={1440} y2={y} stroke="#c8c8c4" strokeWidth="0.65" opacity="0.6" />
        ))}
      </svg>

      {/* Wall–floor seam */}
      <div className="absolute left-0 right-0 h-px bg-g-mid/50" style={{ bottom: "28%" }} />

    </div>
  );
}
