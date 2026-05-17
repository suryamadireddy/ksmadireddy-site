import { HeroCard } from "./HeroCard";
import { WorkCard } from "./WorkCard";

export function Work() {
  return (
    <section className="pt-20 md:pt-32 pb-16 md:pb-24">
      <HeroCard />

      <WorkCard
        title="KSM Studio"
        tagline="A pipeline that turns raw ideas into a builder-ready briefs. Four agents, each with one job: interrogate the idea, research the space, draft the spec, distill it for reading."
        mediaHref="/ksm-studio"
        image={{
          src: "/work/ksm-studio.svg",
          alt: "KSM Studio — four-tier agent pipeline architecture",
        }}
      />

      <WorkCard
        title="Meridian Seven"
        tagline="Five stories a day, plotted on a 3D globe and ranked by real-world impact. Short, factual, no editorializing."
        embed="https://the-meridian-seven.vercel.app"
        interactiveEmbed
      />

      <WorkCard
        title="Atlas"
        tagline={
          <>
            A queryable globe. Ask for trade routes, historical empires, or
            species migrations and they surface as visual layers.
            <br />
            <br />
            Built on Meridian&apos;s globe, without the news feed. Open spec -
            Still in development.
          </>
        }
        mediaHref="/atlas"
        image={{
          src: "/work/atlas-card.png",
          alt: "Atlas — queryable globe and working spec",
          objectFit: "cover",
        }}
      />
      <WorkCard
        title="DreamSpace"
        tagline={
          <>
            A marketplace connecting Indian homeowners with vetted architects
            and interior designers.
          </>
        }
        mediaHref="/dreamspace"
        image={{
          src: "/work/dreamspace.png",
          alt: "DreamSpace — marketplace connecting Indian homeowners with vetted architects and interior designers",
          objectFit: "cover",
        }}
      />
      <WorkCard
        title="Placemaking"
        tagline={
          <>Designing third places that give people a reason to stay.</>
        }
        mediaHref="/placemaking"
        image={{
          src: "/work/placemaking.png",
          alt: "Serentity — designing third places that give people a reason to stay",
        }}
      />
      <WorkCard
        title="About Me"
        tagline={
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-baseline gap-2 text-sm md:text-base font-medium underline decoration-1 decoration-[var(--color-border-strong)] underline-offset-[6px] hover:decoration-[var(--color-fg)] transition-[text-decoration-color] duration-200"
            >
              Download resume
            </a>
          </div>
        }
        mediaHref="/aboutme"
        image={{
          src: "/hero-photo-2.png",
          alt: "Krishna Surya Madireddy",
          objectFit: "cover",
          objectPosition: "center 20%",
        }}
      />
    </section>
  );
}
