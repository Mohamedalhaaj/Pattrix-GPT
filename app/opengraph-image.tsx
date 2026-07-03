import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Brand OG card: the signal motif on Pattrix blue, generated at build time. */
export default function OpenGraphImage() {
  const rings = [70, 130, 190, 250];
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
          backgroundColor: "#0171DD",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
          position: "relative"
        }}
      >
        {rings.map((r) => (
          <div
            key={r}
            style={{
              position: "absolute",
              right: 40 - r / 2,
              top: 180 - r / 2,
              width: r * 2,
              height: r * 2,
              borderRadius: 9999,
              border: "2px dashed rgba(255,255,255,0.35)"
            }}
          />
        ))}
        <div style={{ display: "flex", fontSize: 30, letterSpacing: 10, fontWeight: 700 }}>
          PATTRIX<span style={{ color: "#0A1220" }}>.</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 700, lineHeight: 1.05, maxWidth: 900 }}>
            We turn noise into patterns people remember.
          </div>
          <div style={{ display: "flex", fontSize: 28, opacity: 0.85 }}>Strategic Communications & PR — Tripoli</div>
        </div>
      </div>
    ),
    size
  );
}
