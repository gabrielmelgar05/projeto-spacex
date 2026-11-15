import { ImageResponse } from "next/og";

export const alt = "SpaceX — The First Footstep. Independent concept by Aklio Studio. Fictional Mars mission. Not affiliated with SpaceX.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Generated, vector-only social card — identifies the work as a concept. */
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
          background: "radial-gradient(circle at 78% 125%, #C96638 0%, #A8492C 22%, #2a120a 38%, #050608 39%)",
          color: "#F5F5F2",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, letterSpacing: 4, color: "#90949B" }}>
          <span>MISSION // HORIZON-01</span>
          <span style={{ color: "#C96638" }}>CONCEPT — FICTIONAL NARRATIVE</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 112, fontWeight: 700, lineHeight: 0.9, letterSpacing: -2 }}>THE FIRST</div>
          <div style={{ fontSize: 112, fontWeight: 700, lineHeight: 0.9, letterSpacing: -2 }}>FOOTSTEP.</div>
          <div style={{ marginTop: 32, fontSize: 22, letterSpacing: 3, color: "#90949B" }}>
            INDEPENDENT CONCEPT BY AKLIO STUDIO · NOT AFFILIATED WITH SPACEX
          </div>
        </div>
      </div>
    ),
    size,
  );
}
