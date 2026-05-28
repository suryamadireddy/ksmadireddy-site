import { CaseStudyImage } from "./CaseStudyImage";

const scrollDeckCardGrid =
  "grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[minmax(0,32rem)_minmax(0,1fr)] xl:gap-12";

export type CaseStudyCardItem = {
  title: string;
  paragraphs: string[];
  image?: { src: string; alt: string; placeholderLabel: string };
};

type CaseStudyScrollDeckProps = {
  items: CaseStudyCardItem[];
  deckId: string;
  deckLabel: string;
};

export function CaseStudyScrollDeck({
  items,
  deckId,
  deckLabel,
}: CaseStudyScrollDeckProps) {
  return (
    <section
      id={deckId}
      aria-label={`${deckLabel} section`}
      className="case-study-section-rail"
    >
      <header className="case-study-deck-header mb-6">
        <span className="label case-study-section-label">{deckLabel}</span>
      </header>
      <div className="space-y-16 md:space-y-24">
        {items.map((item) => (
          <CaseStudyHorizontalCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}

function CaseStudyHorizontalCard({
  title,
  paragraphs,
  image,
}: CaseStudyCardItem) {
  return (
    <article className={image ? scrollDeckCardGrid : "grid grid-cols-1 items-start"}>
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
      {image ? (
        <div className="min-w-0 w-full">
          <CaseStudyImage
            src={image.src}
            alt={image.alt}
            placeholderLabel={image.placeholderLabel}
            compact
          />
        </div>
      ) : null}
    </article>
  );
}
