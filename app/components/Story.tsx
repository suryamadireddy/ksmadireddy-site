export function Story() {
  return (
    <section className="py-16 md:py-24 border-t border-[var(--color-border)]">
      <div className="mb-8">
        <span className="label">The short version</span>
      </div>

      {/*
        PLACEHOLDER — rewrite in your own voice.
        Spec rules: 2–4 sentences, first person, direct, explains the arc
        (Platform PM → went deep on AI systems → building toward something specific).
        Two starter drafts below — replace with your own:

        Draft A (career-arc framing):
        "I spent five years as a Platform PM in automotive, building the kind of
        long-horizon product surfaces that don't get demoed at all-hands. Then I
        went deep on agentic AI — not as a topic, as an architecture problem.
        Now I'm building the systems I want to ship as a founding PM."

        Draft B (work-as-evidence framing):
        "Five years of Platform PM taught me that the interesting work is in the
        primitives — the contracts and seams that everything else depends on.
        Agentic AI is the most interesting primitive problem I've ever worked on.
        The projects below are what I've been building while figuring out where
        to do this next."
      */}

      <div className="max-w-[60ch] space-y-4 text-lg md:text-xl leading-relaxed">
        <p>
          I spent five years as a Platform PM in automotive, building the kind
          of long-horizon product surfaces that don&apos;t get demoed at
          all-hands.
        </p>
        <p>
          Then I went deep on agentic AI — not as a topic, as an architecture
          problem. The Platform instincts turned out to be exactly the right
          foundation: tight contracts, careful primitives, shipping inside
          constraints.
        </p>
        <p>
          The work below is what I&apos;ve been building while figuring out
          where to do this next.
        </p>
      </div>
    </section>
  );
}
