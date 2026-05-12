import { WorkCard } from "./WorkCard";

export function Work() {
  return (
    <section className="py-16 md:py-24 border-t border-[var(--color-border)]">
      <div className="mb-12 md:mb-16">
        <span className="label">Featured work</span>
      </div>

      <WorkCard
        index="01"
        status="BUILDING"
        year="2026"
        title="KSM Studio"
        tagline="A four-tier agentic system with strict isolation contracts and a multi-pass distillation pipeline."
        image={{ src: "/work/ksm-studio.png", alt: "KSM Studio — four-tier agent pipeline architecture" }}
        body={
          <>
            <p>
              KSM Studio is the agentic system I built to test architecture ideas
              I kept returning to. Four tiers — Triage, Sharpening, Artifacts,
              Distillation — with explicit isolation contracts at each seam. Triage
              interviews an idea across six dimensions without ever disclosing its
              scores. Sharpening grounds the problem in web research before any
              artifact exists. Artifacts runs four accumulating passes. Distillation
              renders the public-facing output without exposing the evaluation
              underneath.
            </p>
            <p>
              The int work isn&apos;t the agents — it&apos;s the contracts.
              The diagram above shows the full pipeline.
            </p>
          </>
        }
        links={[
          // TODO: Replace with real Loom URL once recorded.
          { label: "Watch walkthrough", href: "#", pending: true },
          // TODO: Replace with public README URL.
          { label: "Read README", href: "#", pending: true },
        ]}
      />

      <WorkCard
        index="02"
        status="SHIPPED"
        year="2025"
        title="Meridian Seven"
        tagline="A daily news digest on a 3D globe — five stories per day, scored by real-world impact, synthesized in a wire-service tone."
        image={{ src: "/work/meridian-seven.png", alt: "Meridian Seven — 3D globe with story panel open" }}
        body={
          <>
            <p>
              {/* AI-DRAFT — edit. Spec wants honest framing, no "actively maintained." */}
              Built and shipped end-to-end: a 3D-globe interface for daily news
              with five stories scored on real-world impact and synthesized
              from multiple sources in a neutral, wire-service tone. The
              architecture pairs a Claude-powered content pipeline with a
              globe.gl front end backed by Supabase.
            </p>
            <p>
              Frozen at its current state — a shipped artifact, not an ongoing
              product. Building Meridian and then using it daily was the
              experience that surfaced what I actually wanted to build next.
              See Atlas below.
            </p>
          </>
        }
        links={[
          {
            label: "Visit the-meridian-seven.vercel.app",
            href: "https://the-meridian-seven.vercel.app/",
          },
        ]}
      />

      <WorkCard
        index="03"
        status="DESIGNING"
        year="2026"
        title="Atlas"
        tagline="A queryable atlas of how the world works. Natural-language queries route to curated data layers — minerals, historical empires, species ranges — rendered on a globe."
        body={
          <>
            {/* WRITE THIS YOURSELF — spec says Atlas card needs your voice on the iteration story. */}
            <p>
              Atlas is the iteration. I built Meridian, used it, and realized
              news wasn&apos;t the framing I wanted — a daily feed is a duty,
              not curiosity. Atlas keeps the globe and the wire-service tone
              and throws out the rest: it&apos;s evergreen, layer-based, and
              queryable in natural language.
            </p>
            <p>
              The spec is public. It&apos;s the document I&apos;m building
              against, not a marketing summary of it.
            </p>
          </>
        }
        links={[{ label: "Read the spec", href: "/atlas" }]}
      />
    </section>
  );
}
