import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getHomepageConfig } from "./lib/config";

export const dynamic = "force-dynamic";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Terminal-style homelab landing page";

const blue = "#3b82f6";
const bracket = "rgba(59, 130, 246, 0.6)";

function Corner({ top, left }) {
  const style = {
    position: "absolute",
    display: "flex",
    width: 28,
    height: 28,
  };
  if (top) {
    style.top = 0;
    style.borderTop = `4px solid ${bracket}`;
  } else {
    style.bottom = 0;
    style.borderBottom = `4px solid ${bracket}`;
  }
  if (left) {
    style.left = 0;
    style.borderLeft = `4px solid ${bracket}`;
  } else {
    style.right = 0;
    style.borderRight = `4px solid ${bracket}`;
  }
  return <div style={style} />;
}

export default async function OpenGraphImage() {
  const { site } = getHomepageConfig();
  const geistMonoBold = await readFile(
    join(process.cwd(), "src/app/fonts/GeistMono-Bold.ttf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 48,
          position: "relative",
          fontFamily: "Geist Mono",
          backgroundColor: "#030712",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: "linear-gradient(rgba(29, 78, 216, 0.08) 2px, transparent 2px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: "linear-gradient(90deg, rgba(29, 78, 216, 0.08) 2px, transparent 2px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          style={{
            display: "flex",
            color: "rgba(37, 99, 235, 0.75)",
            fontSize: 26,
            letterSpacing: "0.45em",
            textTransform: "uppercase",
          }}
        >
          sys.online
        </div>
        <div style={{ display: "flex", alignItems: "center", position: "relative", padding: "48px 72px" }}>
          <Corner top left />
          <Corner top left={false} />
          <Corner top={false} left />
          <Corner top={false} left={false} />
          <div style={{ display: "flex", color: "#ffffff", fontSize: 96, fontWeight: 700, letterSpacing: "0.08em" }}>
            {site.domain}
          </div>
          <div style={{ display: "flex", width: 40, height: 78, marginLeft: 24, backgroundColor: blue }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 220, height: 2, backgroundImage: "linear-gradient(to right, transparent, rgba(37, 99, 235, 0.5))" }} />
          <div style={{ width: 12, height: 12, borderRadius: 12, backgroundColor: blue, display: "flex" }} />
          <div style={{ width: 220, height: 2, backgroundImage: "linear-gradient(to left, transparent, rgba(37, 99, 235, 0.5))" }} />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Geist Mono",
          data: geistMonoBold,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
