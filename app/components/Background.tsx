export function Background() {
  return (
    <section className="py-16 md:py-24 border-t border-[var(--color-border)]">
      <div className="mb-10 md:mb-12">
        <span className="label">Background</span>
      </div>

      <div className="max-w-[60ch] space-y-5 text-base md:text-lg leading-relaxed">
        {/* AI-DRAFT — edit this. Spec says condensed history with AI emphasis. */}
        <p>
          Five years as a Platform PM at a major automotive company, shipping
          the kind of long-horizon product surfaces — internal APIs, developer
          tooling, data primitives — that most users never see but every other
          team depends on. That work is where I learned to ship inside hard
          constraints and design contracts that hold.
        </p>
        <p>
          For the last year I&apos;ve gone deep on agentic AI: completed
          Reforge&apos;s AI PM coursework, built and shipped Meridian Seven on
          a 3D globe, and started building KSM Studio to test the architecture
          ideas in production-grade form. Comfortable working at the layer
          where engineers actually live — LLMs, RAG, tool use, evals, agent
          orchestration.
        </p>
        <p>
          Earlier learning projects (ClearRate and others) sit in the GitHub
          link below.
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
