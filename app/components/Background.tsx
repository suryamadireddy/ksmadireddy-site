export function Background() {
  return (
    <section className="py-16 md:py-24 border-t border-[var(--color-border)]">
      <div className="mb-10 md:mb-12">
        <span className="label">Background</span>
      </div>

      <div className="max-w-[60ch] space-y-5 text-base md:text-lg leading-relaxed">
        <p>
          Five years at GM, starting as a software developer and ending as the
          Platform PM for MaxIO — a cloud-native telemetry platform shared across
          multiple engineering teams. Long-horizon work: internal APIs, onboarding
          pipelines, developer tooling, the kind of surfaces that don&apos;t get
          demoed at all-hands but that every other team depends on.
        </p>
        <p>
          In December 2024 I left to build. Seventeen months across the U.S.,
          India, and Southeast Asia — building KSM Studio, running y for a
          marketplace startup in Hyderabad, studying placemaking across Asia and
          Europe. The thread across all of it is the same instinct: platform
          thinking applied to new contexts.
        </p>
        <p>
          Technical foundation: LLMs, RAG, multi-agent orchestration,
          schema-validated pipelines. Reforge AI PM coursework. UT Austin,
          Mathematics (CS and Entrepreneurship).
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-baseline gap-2 text-sm md:text-base font-medium underline decoration-1 decoration-[var(--color-border-strong)] underline-offset-[6px] hover:decoration-[var(--color-fg)] transition-[text-decoration-color] duration-200"
        >
          Download resume
          <span aria-hidden className="text-[var(--color-fg-muted)]">
            ↓
          </span>
        </a>
      </div>
    </section>
  );
}
