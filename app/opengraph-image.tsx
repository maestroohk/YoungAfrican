import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#2d3cff",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 34, fontWeight: 600 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: "#ffffff", display: "flex" }} />
          {site.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 104, fontWeight: 700, lineHeight: 0.95, letterSpacing: -4 }}>
          <div>Get connected.</div>
          <div style={{ color: "#ffc24d" }}>Stay connected.</div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "rgba(255,255,255,0.85)" }}>Connecting Communities. Empowering Generations.</div>
      </div>
    ),
    size,
  );
}
