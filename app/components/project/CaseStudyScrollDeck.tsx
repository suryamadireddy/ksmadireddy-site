import {
  CaseStudyHorizontalCard,
  type CaseStudyCardItem,
} from "./ProjectCaseStudy";

type CaseStudyScrollDeckProps = {
  items: CaseStudyCardItem[];
  deckId: string;
  deckLabel: string;
  deckTitle?: string;
};

export function CaseStudyScrollDeck({
  items,
  deckId,
  deckLabel,
  deckTitle,
}: CaseStudyScrollDeckProps) {
  return (
    <section
      id={deckId}
      aria-label={`${deckLabel} section`}
      className="case-study-section-rail"
    >
      <header className="case-study-deck-header mb-6">
        <span className="label case-study-section-label">{deckLabel}</span>
        {deckTitle ? (
          <h2 className="display mt-2 text-2xl md:text-3xl">{deckTitle}</h2>
        ) : null}
      </header>
      <div className="space-y-16 md:space-y-24">
        {items.map((item) => (
          <CaseStudyHorizontalCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}
