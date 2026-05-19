import Link from "next/link";
import type { ReactNode } from "react";
import { contentBleed, contentMeasure } from "../contentLayout";

type ProjectShellProps = {
  children: ReactNode;
  label?: string;
  title?: string;
  description?: string;
};

export function ProjectShell({
  children,
  label,
  title,
  description,
}: ProjectShellProps) {
  const subHeaderBlock =
    label || description ? (
      <div className="mb-8 md:mb-10">
        {label ? <span className="label">{label}</span> : null}
        {description ? (
          <p className="mt-4 max-w-[60ch] text-base md:text-lg leading-relaxed text-[var(--color-fg-muted)]">
            {description}
          </p>
        ) : null}
      </div>
    ) : null;

  return (
    <main className="pt-20 md:pt-32 pb-16 md:pb-24">
      <div className={contentBleed}>
        <div className={contentMeasure}>
          <div className="mb-12 md:mb-16">
            <Link
              href="/"
              aria-label="Krishna Surya Madireddy — back to home"
              className="hero-ksm-mark transition-opacity hover:opacity-80"
            >
              KSM
            </Link>
            {title ? <h1 className="project-display-mark">{title}</h1> : null}
          </div>
          {subHeaderBlock}
          {children}
        </div>
      </div>
    </main>
  );
}
