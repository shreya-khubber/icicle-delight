"use client";

export type ArtworkType = "career" | "projects" | "art" | "ideas" | "writer";

const ARTWORK_IMAGES: Record<ArtworkType, string> = {
  career:   "/Analyst.png",
  projects: "/Builder.png",
  art:      "/Artist.png",
  ideas:    "/Wanderer.png",
  writer:   "/Writer.png",
};

export default function Artwork({ type }: { type: ArtworkType }) {
  return (
    <img
      src={ARTWORK_IMAGES[type]}
      alt={type}
      className="w-full h-full object-cover"
      draggable={false}
    />
  );
}
