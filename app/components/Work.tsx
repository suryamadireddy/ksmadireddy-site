import { WorkCard } from "./WorkCard";

export function Work() {
  return (
    <section className="py-16 md:py-24">
      <WorkCard
        status="BUILDING"
        title="KSM Studio"
        tagline="A four-tier agentic system with strict isolation contracts and a multi-pass distillation pipeline."
        mediaHref="/ksm-studio"
        image={{
          src: "/work/ksm-studio.svg",
          alt: "KSM Studio — four-tier agent pipeline architecture",
        }}
        body={
          <p>
            An agentic system for testing architecture ideas: explicit contracts
            between triage, research, multi-pass artifacts, and distillation.
            Open the diagram for the full breakdown.
          </p>
        }
      />

      <WorkCard
        status="SHIPPED"
        title="Meridian Seven"
        tagline="A daily news digest on a 3D globe — five stories per day, scored by real-world impact, synthesized in a wire-service tone."
        embed="https://the-meridian-seven.vercel.app"
        interactiveEmbed
        body={
          <p>
            End-to-end shipped build: globe.gl plus a Claude-powered pipeline
            and Supabase — five daily stories in a neutral wire-service tone.
            Frozen as a finished artifact.
          </p>
        }
      />

      <WorkCard
        status="DESIGNING"
        title="Atlas"
        tagline="A queryable atlas of how the world works. Natural-language queries route to curated data layers — minerals, historical empires, species ranges — rendered on a globe."
        mediaHref="/atlas"
        image={{
          src: "/work/atlas-card.svg",
          alt: "Atlas — queryable globe and working spec",
        }}
        body={
          <p>
            The iteration after Meridian: same globe and tone, but evergreen
            layers instead of a news feed — queryable in natural language. The
            working spec is public.
          </p>
        }
      />
    </section>
  );
}
