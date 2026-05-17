"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "ksm-site-color-scheme";

type SiteColorScheme = "dark" | "light";

function readStored(): SiteColorScheme | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === "light" || v === "dark" ? v : null;
}

function applyToDocument(scheme: SiteColorScheme) {
  if (scheme === "light") {
    document.documentElement.dataset.colorScheme = "light";
  } else {
    delete document.documentElement.dataset.colorScheme;
  }
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", scheme === "dark" ? "#000000" : "#f5f2eb");
  }
}

/** Dev / preview control: switch between current dark UI and the earlier light palette. */
export function ColorSchemeToggle() {
  const [scheme, setScheme] = useState<SiteColorScheme>("dark");

  // Restore from localStorage once — must NOT write to localStorage before this runs
  // (a second effect that persisted initial "dark" was clobbering a saved "light" choice).
  useEffect(() => {
    const stored = readStored();
    const initial = stored ?? "dark";
    setScheme(initial);
    applyToDocument(initial);
  }, []);

  const toggle = () => {
    setScheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      applyToDocument(next);
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* private mode etc. */
      }
      return next;
    });
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
            ? "Switch to original light background and text colors"
            : "Switch back to dark theme"
        }
      >
        {scheme === "dark" ? "Light" : "Dark"}
      </button>
    </div>
  );
}
