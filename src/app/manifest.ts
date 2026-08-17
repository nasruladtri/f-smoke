import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "F-Smoke — Game Berhenti Merokok",
    short_name: "F-Smoke",
    description:
      "Game berhenti merokok: kumpulkan XP, selesaikan misi, dan jaga streak harianmu.",
    start_url: "/",
    display: "standalone",
    background_color: "#6ab8ff",
    theme_color: "#1a1a1a",
    icons: [
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}