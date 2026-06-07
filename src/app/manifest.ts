import type { MetadataRoute } from "next";

/**
 * Web app manifest for the marketing site. Lets browsers offer an install
 * prompt and gives the home-screen icon. The start URL is the marketing home,
 * not an app route, because this deploy is the public site only.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SaaSyToad",
    short_name: "SaaSyToad",
    description:
      "AI agents, apps, and websites for businesses that want to move fast.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    categories: ["business", "productivity"],
  };
}
