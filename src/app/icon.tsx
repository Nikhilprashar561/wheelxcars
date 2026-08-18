import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: "#000000",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          fontWeight: 900,
          letterSpacing: "-1px",
          borderRadius: "8px",
          border: "1px solid #333333",
        }}
      >
        <span style={{ color: "#ffffff" }}>W</span>
        <span style={{ color: "#888888", fontSize: 16 }}>x</span>
      </div>
    ),
    {
      ...size,
    }
  );
}
