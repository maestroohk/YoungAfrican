import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "YoungAfrican",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f4f1ea",
    theme_color: "#031f3d",
    icons: [
      { src: "/brand/youngafrican-internet-icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/brand/youngafrican-internet-icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/youngafrican-internet-icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
