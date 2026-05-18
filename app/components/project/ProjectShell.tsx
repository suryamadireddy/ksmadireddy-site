import Link from "next/link";
import type { ReactNode } from "react";

type ShellWidth = "3xl" | "5xl" | "6xl";

const widthClass: Record<ShellWidth, string> = {
  "3xl": "max-w-3xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
};

type ProjectShellProps = {
  children: ReactNode;
  maxWidth?: ShellWidth;
  label?: string;
  title?: string;
  description?: string;
  headerSpacing?: "default" | "compact";
};

export function ProjectShell({
  children,
  maxWidth = "3xl",
  label,
  title,
  description,
  headerSpacing = "default",
}: ProjectShellProps) {
  const hasHeader = label || title || description;
  const headerMb =
    headerSpacing === "compact" ? "mb-8 md:mb-10" : "mb-12 md:mb-16";

  return (
    <main
      className={`mx-auto w-full min-w-0 px-3 py-16 md:px-5 md:py-24 lg:px-8 ${widthClass[maxWidth]} ${
        maxWidth === "6xl" ? "md:px-10 lg:px-10" : ""
      }`}
    >
      <Link
        href="/"
        className="label mb-12 inline-flex items-center gap-2 md:mb-16 hover:text-[var(--color-fg)] transition-colors"
      >
        <span aria-hidden>←</span>
        <span>Krishna Surya Madireddy</span>
      </Link>

      {hasHeader ? (
        <div className={headerMb}>
          {label ? <span className="label">{label}</span> : null}
          {title ? (
            <h1 className="display mt-2 text-3xl md:text-4xl">{title}</h1>
          ) : null}
          {description ? (
            <p className="mt-4 max-w-[60ch] text-base md:text-lg leading-relaxed text-[var(--color-fg-muted)]">
              {description}
            </p>
          ) : null}
        </div>
      ) : null}

      {children}
    </main>
  );
}
