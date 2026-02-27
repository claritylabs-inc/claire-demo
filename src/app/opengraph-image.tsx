import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const alt = "Clarity — AI-powered insurance management for businesses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [playfair, instrumentSerif] = await Promise.all([
    readFile(join(process.cwd(), "src/app/fonts/PlayfairDisplay-Regular.ttf")),
    readFile(join(process.cwd(), "src/app/fonts/InstrumentSerif-Regular.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px 100px",
          background: "#FAF8F4",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "48px",
            fontSize: "28px",
            color: "#1a1a1a",
            letterSpacing: "-0.01em",
            fontFamily: "Instrument Serif",
          }}
        >
          <span>clarity</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 65 65"
            fill="none"
          >
            <circle
              cx="32.5"
              cy="32.5"
              r="31"
              fill="none"
              stroke="#A0D2FA"
              strokeWidth="2"
              strokeOpacity="0.5"
            />
          </svg>
          <span>labs</span>
        </div>

        <div
          style={{
            fontSize: "52px",
            lineHeight: 1.3,
            color: "#1a1a1a",
            maxWidth: "800px",
            letterSpacing: "-0.02em",
            fontFamily: "Playfair Display",
          }}
        >
          Insurance is broken for the people who need it most.
        </div>

        <div
          style={{
            marginTop: "auto",
            fontSize: "18px",
            color: "#8a8578",
            fontFamily: "Instrument Serif",
          }}
        >
          claritylabs.inc
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Playfair Display", data: playfair, style: "normal", weight: 400 },
        { name: "Instrument Serif", data: instrumentSerif, style: "normal", weight: 400 },
      ],
    }
  );
}
