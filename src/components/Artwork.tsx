"use client";

export type ArtworkType = "career" | "projects" | "art" | "ideas" | "writer";

const ARTWORK_IMAGES: Record<ArtworkType, string> = {
  career:   "/exhibits/analyst.webp",
  projects: "/exhibits/builder.webp",
  art:      "/exhibits/artist.webp",
  ideas:    "/exhibits/wanderer.webp",
  writer:   "/exhibits/writer.webp",
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
