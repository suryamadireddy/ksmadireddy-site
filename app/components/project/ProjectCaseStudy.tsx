import type { ReactNode } from "react";
import { contentGrid } from "../contentLayout";
import { ProjectEmbed } from "./ProjectEmbed";
import { CaseStudyImage } from "./CaseStudyImage";

type CaseStudyHeroProps = {
  tagline: string;
  liveHref: string;
  liveLabel?: string;
  embedSrc: string;
  embedTitle: string;
  railLabel?: string;
};

export function CaseStudyHero({
  tagline,
  liveHref,
  liveLabel = "Open Meridian live",
  embedSrc,
  embedTitle,
  railLabel = "Meridian",
}: CaseStudyHeroProps) {
  const hasIntro = Boolean(tagline) || Boolean(liveHref);

  return (
    <section
      aria-label={`${railLabel} preview`}
      className="case-study-section-rail"
    >
      <header className="case-study-deck-header mb-6">
        <span className="label case-study-section-label">{railLabel}</span>
      </header>
      <div className="min-w-0">
        {hasIntro ? (
          <div className="mb-6 md:mb-8">
            {tagline ? (
              <p className="max-w-[60ch] text-lg md:text-xl leading-relaxed text-[var(--color-fg-muted)]">
                {tagline}
              </p>
            ) : null}
            {liveHref ? (
              <p className={tagline ? "mt-4" : ""}>
                <a
                  href={liveHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base md:text-lg font-medium text-[var(--color-fg)] underline decoration-1 decoration-[var(--color-border-strong)] underline-offset-[6px] hover:decoration-[var(--color-fg)] transition-[text-decoration-color] duration-200"
                >
                  {liveLabel} →
                </a>
              </p>
            ) : null}
          </div>
        ) : null}
        <ProjectEmbed src={embedSrc} title={embedTitle} />
      </div>
    </section>
  );
}

type CaseStudySectionProps = {
  label?: string;
  title?: string;
  children: ReactNode;
};

export function CaseStudySection({
  label,
  title,
  children,
}: CaseStudySectionProps) {
  const hasSidebar = Boolean(label);

  if (hasSidebar) {
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

  return (
    <section className="case-study-section-plain">
      {title ? (
        <h2 className="display text-2xl md:text-3xl">{title}</h2>
      ) : null}
      <div className="mt-6 md:mt-8">{children}</div>
    </section>
  );
}

export type CaseStudyCardItem = {
  title: string;
  paragraphs: string[];
  image: { src: string; alt: string; placeholderLabel: string };
};

export function CaseStudyCardContent({
  title,
  paragraphs,
  image,
}: CaseStudyCardItem) {
  return (
    <>
      <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[var(--color-fg)]">
        {title}
      </h3>
      <div className="mt-6 md:mt-8">
        <CaseStudyImage
          src={image.src}
          alt={image.alt}
          placeholderLabel={image.placeholderLabel}
        />
      </div>
      <div className="mt-6 md:mt-8 max-w-[60ch] space-y-4 text-base md:text-lg leading-relaxed text-[var(--color-fg-muted)]">
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
      </div>
    </>
  );
}

type CaseStudyBlockProps = CaseStudyCardItem;

export function CaseStudyBlock(props: CaseStudyBlockProps) {
  return (
    <article className="mb-12 md:mb-16 last:mb-0">
      <CaseStudyCardContent {...props} />
    </article>
  );
}

export function CaseStudyHorizontalCard({
  title,
  paragraphs,
  image,
}: CaseStudyCardItem) {
  return (
    <article className={contentGrid}>
      <div className="min-w-0">
        <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[var(--color-fg)]">
          {title}
        </h3>
        <div className="mt-4 md:mt-6 space-y-3 text-base md:text-lg leading-relaxed text-[var(--color-fg-muted)]">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      </div>
      <div className="min-w-0 w-full">
        <CaseStudyImage
          src={image.src}
          alt={image.alt}
          placeholderLabel={image.placeholderLabel}
        />
      </div>
    </article>
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

export function CaseStudyDivider() {
  return <hr className="my-12 md:my-16 border-[var(--color-border)]" />;
}
