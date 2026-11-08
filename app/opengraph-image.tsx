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
          background: "#f5f1e8",
          color: "#11151a",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 4,
              background: "#2343c4",
              color: "#f5f1e8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontFamily: "sans-serif",
            }}
          >
            Y
          </div>
          <div style={{ fontSize: 34, fontFamily: "sans-serif", fontWeight: 600 }}>{site.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", borderTop: "3px solid #11151a", paddingTop: 36 }}>
          <div style={{ fontSize: 76, lineHeight: 1.05, letterSpacing: -1 }}>Affordable Wi-Fi where people gather.</div>
          <div style={{ fontSize: 76, lineHeight: 1.05, letterSpacing: -1, color: "#2343c4" }}>Honest knowledge about markets.</div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#5d5950", fontFamily: "sans-serif" }}>
          Community Wi-Fi hotspots · Market research and education · Uganda
        </div>
      </div>
    ),
    size,
  );
}
