import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/app/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://thebestcrm.vercel.app",
  ),
  title: {
    default: "SaaSyToadCRM",
    template: "%s · SaaSyToadCRM",
  },
  description: "A clean, fast CRM for running your business.",
  robots: { index: false, follow: false },
  manifest: "/manifest.webmanifest",
  // Apple PWA hints — let iOS treat add-to-home-screen as a standalone app
  // instead of a Safari shortcut.
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "SaaSyToadCRM",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

// Inline theme script: runs before paint to set the .dark class. Prevents
// flash of incorrect theme. Reads stored preference, falls back to system.
const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var d=t==='dark'||(!t&&m);document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light';}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full bg-background text-foreground font-sans">
        <ThemeProvider>{children}</ThemeProvider>
        <Toaster
          position="bottom-right"
          theme="system"
          richColors
          closeButton
          toastOptions={{
            classNames: {
              toast:
                "!bg-surface-elevated !border !border-border !text-foreground !shadow-lg",
            },
          }}
        />
      </body>
    </html>
  );
}
