import type { NextConfig } from "next";

// Baseline security headers. Applied to every response so default-deny is the
// posture for clickjacking, MIME-sniff, and cross-origin referrer leakage. This
// is the public marketing site, so there is no reason for any page to be framed.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
