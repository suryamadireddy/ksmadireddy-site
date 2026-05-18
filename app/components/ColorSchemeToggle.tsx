"use client";

import { useEffect, useState } from "react";
import {
  applyThemeToDocument,
  type SiteColorScheme,
} from "../theme-colors";

const STORAGE_KEY = "ksm-site-color-scheme";

function readStored(): SiteColorScheme | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === "light" || v === "dark" ? v : null;
}

export function ColorSchemeToggle() {
  const [scheme, setScheme] = useState<SiteColorScheme>("dark");

  useEffect(() => {
    const initial = readStored() ?? "dark";
    setScheme(initial);
    applyThemeToDocument(initial);
  }, []);

  const toggle = () => {
    const next: SiteColorScheme = scheme === "dark" ? "light" : "dark";
    applyThemeToDocument(next);
    setScheme(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* private mode etc. */
    }
  };

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[100] w-max md:bottom-8 md:right-8">
      <button
        type="button"
        onClick={toggle}
        className="pointer-events-auto rounded border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-3 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--color-fg)] shadow-sm transition-colors hover:border-[var(--color-border-strong)] hover:bg-[var(--color-bg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-fg)]"
        aria-pressed={scheme === "light"}
        aria-label={
          scheme === "dark"
            ? "Switch to light background and text colors"
            : "Switch back to dark theme"
        }
      >
        {scheme === "dark" ? "Light" : "Dark"}
      </button>
    </div>
  );
}
