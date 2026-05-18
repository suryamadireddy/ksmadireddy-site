export type SiteColorScheme = "dark" | "light";

/** Canonical palette — applied on <html> so toggles always win over Tailwind @theme. */
export const THEME_CSS_VARS: Record<SiteColorScheme, Record<string, string>> = {
  dark: {
    "--color-bg": "#000000",
    "--color-bg-elevated": "#0a0a0a",
    "--color-fg": "#f5f5f5",
    "--color-fg-muted": "#a3a3a3",
    "--color-fg-subtle": "#737373",
    "--color-border": "#262626",
    "--color-border-strong": "#404040",
    "--color-work-title-hover": "#d2042d",
  },
  light: {
    "--color-bg": "#f5f2eb",
    "--color-bg-elevated": "#ffffff",
    "--color-fg": "#16161a",
    "--color-fg-muted": "#6b6b73",
    "--color-fg-subtle": "#a3a3a8",
    "--color-border": "#e8e6e0",
    "--color-border-strong": "#d4d2cb",
    "--color-work-title-hover": "#5b9fd4",
  },
};

export function applyThemeToDocument(scheme: SiteColorScheme) {
  const root = document.documentElement;
  const vars = THEME_CSS_VARS[scheme];

  for (const [prop, value] of Object.entries(vars)) {
    root.style.setProperty(prop, value);
  }

  if (scheme === "light") {
    root.dataset.colorScheme = "light";
    root.classList.add("light");
    root.style.colorScheme = "light";
  } else {
    delete root.dataset.colorScheme;
    root.classList.remove("light");
    root.style.colorScheme = "dark";
  }

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", scheme === "dark" ? "#000000" : "#f5f2eb");
  }
}
