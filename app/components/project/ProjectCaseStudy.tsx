import type { ReactNode } from "react";

type CaseStudySectionProps = {
  label: string;
  title?: string;
  children: ReactNode;
};

export function CaseStudySection({
  label,
  title,
  children,
}: CaseStudySectionProps) {
  return (
    <section className="case-study-section-rail">
      <header className="case-study-deck-header mb-6">
        <span className="label case-study-section-label">{label}</span>
        {title ? (
          <h2 className="display mt-2 text-2xl md:text-3xl">{title}</h2>
        ) : null}
      </header>
      <div>{children}</div>
    </section>
  );
}

type CaseStudyProseProps = {
  paragraphs: string[];
};

export function CaseStudyProse({ paragraphs }: CaseStudyProseProps) {
  return (
    <div className="space-y-4 text-base md:text-lg leading-relaxed text-[var(--color-fg-muted)]">
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 48)}>{paragraph}</p>
      ))}
    </div>
  );
}
