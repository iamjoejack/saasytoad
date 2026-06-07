import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

/**
 * Default Open Graph / link-preview image for SaaSyToadCRM. Generated at build
 * time via ImageResponse using the actual square mascot PNG.
 */
export const alt =
  "SaaSyToadCRM, the honest all-in-one CRM. AI included. No surprise bill.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  let logoBase64 = "";
  try {
    const logoPath = path.join(process.cwd(), "public/brand/saasytoad-logo.png");
    const logoBuffer = fs.readFileSync(logoPath);
    logoBase64 = `data:image/png;base64,${logoBuffer.toString("base64")}`;
  } catch (e) {
    console.error("Failed to read logo for OG image:", e);
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 88,
          background: "linear-gradient(135deg, #0a0a0a 0%, #020202 100%)",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {logoBase64 ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoBase64}
              alt="SaaSyToad"
              style={{
                width: 132,
                height: 132,
                marginRight: 32,
              }}
            />
          ) : (
            <div
              style={{
                width: 132,
                height: 132,
                borderRadius: 32,
                background: "#69A549",
                marginRight: 32,
              }}
            />
          )}
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2 }}>
            SaaSyToadCRM
          </div>
        </div>
        <div
          style={{
            marginTop: 44,
            fontSize: 44,
            lineHeight: 1.25,
            maxWidth: 920,
            color: "rgba(255,255,255,0.95)",
          }}
        >
          The honest all-in-one CRM. AI included. No surprise bill.
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 26,
            fontWeight: 600,
            color: "#A855F7",
          }}
        >
          saasytoad.com
        </div>
      </div>
    ),
    { ...size },
  );
}
