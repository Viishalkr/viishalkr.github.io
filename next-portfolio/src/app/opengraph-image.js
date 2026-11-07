import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";

export const alt = "Vishal Kumar — Visual Director. Photography, film and design.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const photo = await readFile(
    join(process.cwd(), "public/assets/work/photography/hero.jpg")
  );
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#F9F9F9",
          color: "#000",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 72px",
          }}
        >
          <div style={{ fontSize: 22, letterSpacing: 6, color: "#a1a1aa", marginBottom: 28 }}>
            PHOTOGRAPHY · FILM · DESIGN
          </div>
          <div style={{ fontSize: 120, fontWeight: 900, lineHeight: 0.9, letterSpacing: -4 }}>
            VISHAL
          </div>
          <div style={{ fontSize: 120, fontWeight: 900, lineHeight: 0.9, letterSpacing: -4 }}>
            KUMAR
          </div>
          <div style={{ fontSize: 30, color: "#52525b", marginTop: 36 }}>
            Visual director · Open for commissions
          </div>
        </div>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img src={photoSrc} width={420} height={630} style={{ objectFit: "cover" }} />
      </div>
    ),
    size
  );
}
