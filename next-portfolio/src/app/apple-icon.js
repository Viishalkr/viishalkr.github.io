import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Same VK monogram as icon.svg, at the size iOS uses for home-screen icons.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#000" }}>
        <svg width="180" height="180" viewBox="0 0 64 64">
          <path d="M6 16h7l6.5 22L26 16h7l-9.5 32h-8z" fill="#fff" />
          <path d="M35 16h6.5v13.5L51 16h7.5L48 30.5 59 48h-7.8l-7.6-12.4-2.1 2.7V48H35z" fill="#fff" />
        </svg>
      </div>
    ),
    size
  );
}
