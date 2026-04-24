"use client";

export type ArtworkType = "career" | "projects" | "art" | "ideas" | "writer";

const ARTWORK_IMAGES: Record<ArtworkType, string> = {
  career:   "/Penguin.png",
  projects: "/Egyptian.png",
  art:      "/Artist.png",
  ideas:    "/Sagitarius.avif",
  writer:   "/quill.avif",
};

export default function Artwork({ type }: { type: ArtworkType }) {
  return (
    <img
      src={ARTWORK_IMAGES[type]}
      alt={type}
      className="w-full h-full object-contain"
      draggable={false}
    />
  );
}
