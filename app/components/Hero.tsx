export function Hero() {
  return (
    <section className="pt-20 pb-24 md:pt-32 md:pb-40">
      <div className="mb-10 md:mb-14">
        <span className="label">Krishna Surya Madireddy · 2026</span>
      </div>

      <h1 className="display text-[2.75rem] md:text-[5rem] lg:text-[5.5rem] mb-8 md:mb-10">
        Platform PM
        <br />
        <span className="italic">building agentic</span>
        <br />
        AI systems with
        <br />
        <span className="italic">design sensibility.</span>
      </h1>

      <div className="flex items-center gap-3 mb-10 md:mb-14">
        <span
          className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-fg)]"
          aria-hidden
        />
        <p className="text-[var(--color-fg-muted)] text-sm md:text-base">
          Open to founding-PM and AI-forward PM roles at Series A–C startups.
        </p>
      </div>

      <a
        href="mailto:ksmadireddy@gmail.com"
        className="inline-flex items-baseline gap-2 text-lg md:text-xl font-medium underline decoration-[var(--color-border-strong)] decoration-1 underline-offset-[6px] hover:decoration-[var(--color-fg)] transition-[text-decoration-color] duration-200"
      >
        ksmadireddy@gmail.com
        <span aria-hidden className="text-[var(--color-fg-muted)]">
          →
        </span>
      </a>
    </section>
  );
}
