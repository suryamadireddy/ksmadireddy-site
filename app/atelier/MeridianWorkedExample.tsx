/* All prose and excerpts are verbatim from the Phase 3 spec
 * (docs/ATELIER_PAGE_PHASE3_REFLOW_SPEC.md). The excerpts are real
 * material from the studio's records — do not edit or paraphrase. */

const PROVENANCE = "Every excerpt below is taken verbatim from the studio's records.";

const CLOSE =
  "I drove every handoff in this loop by hand. The Atelier is the system that automates the loop I've already proven.";

type Evidence = {
  quote: string;
  attribution: string;
};

type Stage = {
  eyebrow: string;
  prose: string;
  evidence?: Evidence;
  meridianLink?: boolean;
};

const STAGES: Stage[] = [
  {
    eyebrow: "The idea",
    prose:
      "It started as a sentence: an interactive globe showing where news happens — a daily digest of the top five global events. A what machine, not a why machine.",
  },
  {
    eyebrow: "The Kiln's verdict",
    prose: "The deep Kiln went straight at the premise.",
    evidence: {
      quote:
        "\"The five-event selection problem has no neutral solution: any methodology — algorithmic or human — encodes a definition of importance, and that definition is an editorial stance, which directly contradicts the product's positioning.\"",
      attribution: "— Kiln evaluation, red flags",
    },
  },
  {
    eyebrow: "Arguing with the idea",
    prose:
      "Every surviving idea in the studio is a live thing I can argue with. This one pushed back until I conceded the point.",
    evidence: {
      quote:
        "\"The neutrality claim lives in the captions. But the selection is where the ideology actually lives, and I haven't answered that.\"",
      attribution: "— conversation with the idea",
    },
  },
  {
    eyebrow: "What changed",
    prose:
      "The research pass made the verdict empirical: studies showed language models introduce framing bias in more than a quarter of news summarization instances, so the product's central promise could not survive a claim of neutrality. The positioning shifted from \"no editorial agenda\" to a transparent, proportionate selection method — and that shift is what Meridian shipped with.",
  },
  {
    eyebrow: "The build",
    prose:
      "A taste-dense brief went to a coding agent, and a working scaffold came back. I carried that brief by hand, the same way I carried every other step.",
  },
  {
    eyebrow: "The product",
    prose: "Meridian is live: five impact-ranked events a day, on a globe.",
    meridianLink: true,
  },
];

const inlineLinkClass =
  "text-base md:text-lg font-medium text-[var(--color-fg)] underline decoration-1 decoration-[var(--color-border-strong)] underline-offset-[6px] hover:decoration-[var(--color-fg)] transition-[text-decoration-color] duration-200";

export function MeridianWorkedExample() {
  return (
    <>
      <h2 className="display text-2xl md:text-3xl">Worked example: Meridian</h2>
      <p className="mt-5 text-base italic leading-relaxed text-[var(--color-fg-muted)] md:text-lg">
        One idea, driven through the whole loop by hand.
      </p>
      <p className="mt-2 text-sm text-[var(--color-fg-subtle)]">{PROVENANCE}</p>

      <div className="mt-10 space-y-10 md:mt-12 md:space-y-12">
        {STAGES.map((stage) => (
          <div key={stage.eyebrow}>
            <span className="label">{stage.eyebrow}</span>
            <p className="mt-3 text-base md:text-lg leading-relaxed text-[var(--color-fg-muted)]">
              {stage.prose}
            </p>
            {stage.evidence ? (
              <figure className="mt-5 rounded-md border border-[var(--color-border)] px-5 py-4 md:ml-6 md:px-6 md:py-5">
                <blockquote className="text-base md:text-lg leading-relaxed text-[var(--color-fg)]">
                  {stage.evidence.quote}
                </blockquote>
                <figcaption className="label mt-3">
                  {stage.evidence.attribution}
                </figcaption>
              </figure>
            ) : null}
            {stage.meridianLink ? (
              <p className="mt-5">
                <a href="/meridian" className={inlineLinkClass}>
                  See it live →
                </a>
              </p>
            ) : null}
          </div>
        ))}
      </div>

      <p className="display mt-12 text-xl md:mt-16 md:text-2xl text-[var(--color-fg)]">
        {CLOSE}
      </p>
    </>
  );
}
