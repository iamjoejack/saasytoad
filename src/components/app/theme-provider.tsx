"use client";
import * as React from "react";

type Theme = "light" | "dark" | "system";
const STORAGE_KEY = "theme";

interface ThemeContextValue {
  theme: Theme;
  resolved: "light" | "dark";
  setTheme: (t: Theme) => void;
}

const ThemeCtx = React.createContext<ThemeContextValue | null>(null);

function readStored(): Theme {
  if (typeof window === "undefined") return "system";
  const v = localStorage.getItem(STORAGE_KEY);
  return v === "light" || v === "dark" ? v : "system";
}

function systemPref(): "light" | "dark" {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Lazy init: SSR returns "system" (no window); client reads localStorage on
  // first render. The inline pre-paint script in <head> sets .dark already, so
  // there's no DOM mismatch — only the React tree learns the value here.
  const [theme, setThemeState] = React.useState<Theme>(readStored);
  const [systemTheme, setSystemTheme] = React.useState<"light" | "dark">(() =>
    typeof window === "undefined" ? "light" : systemPref(),
  );

  // Subscribe to system-theme changes via the media query.
  React.useEffect(() => {
    const m = window.matchMedia("(prefers-color-scheme: dark)");
    const h = () => setSystemTheme(m.matches ? "dark" : "light");
    m.addEventListener("change", h);
    return () => m.removeEventListener("change", h);
  }, []);

  const resolved: "light" | "dark" = theme === "system" ? systemTheme : theme;

  // Push resolved theme to the DOM as a pure side effect (no setState).
  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", resolved === "dark");
    document.documentElement.style.colorScheme = resolved;
  }, [resolved]);

  const setTheme = React.useCallback((t: Theme) => {
    try {
      if (t === "system") localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, t);
    } catch {
      /* private mode etc. */
    }
    setThemeState(t);
  }, []);

  const value = React.useMemo(
    () => ({ theme, resolved, setTheme }),
    [theme, resolved, setTheme],
  );

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = React.useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
