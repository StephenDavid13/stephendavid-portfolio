"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";
const KEY = "theme";

const systemTheme = (): Theme =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const storedTheme = (): Theme | null => {
  const v = window.localStorage.getItem(KEY);
  return v === "light" || v === "dark" ? v : null;
};

/**
 * Light/dark switch.
 *
 * localStorage is written only on an explicit click. Persisting on mount would
 * pin the theme on first visit and stop the site following the OS afterwards.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(storedTheme() ?? systemTheme());

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      if (storedTheme()) return; // an explicit choice wins over the OS
      const next: Theme = e.matches ? "dark" : "light";
      setTheme(next);
      document.documentElement.dataset.theme = next;
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const next: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => {
        setTheme(next);
        document.documentElement.dataset.theme = next;
        window.localStorage.setItem(KEY, next);
      }}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] transition-colors duration-300"
      style={{ color: "var(--fg-faint)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "var(--fg)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "var(--fg-faint)";
      }}
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
