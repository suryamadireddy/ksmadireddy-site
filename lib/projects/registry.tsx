import type { ProjectDefinition } from "./types";
import { projectMetadata } from "./metadata";

export const projects: ProjectDefinition[] = [
  {
    slug: "ksm-studio",
    metadata: projectMetadata({
      title: "KSM Studio",
      description:
        "Four-tier agentic system with strict isolation contracts and a multi-pass distillation pipeline. Four agents, each with one job: interrogate the idea, research the space, draft the spec, distill it for reading.",
    }),
    card: {
      title: "KSM Studio",
      tagline:
        "Agentic pipeline that evaluates raw ideas and turns them into a builder-ready briefs.",
      mediaHref: "/ksm-studio",
      image: {
        src: "/work/ksm-studio.svg",
        alt: "KSM Studio — four-tier agent pipeline architecture",
      },
    },
  },
  {
    slug: "meridian",
    metadata: projectMetadata({
      title: "Meridian",
      description:
        "Five stories a day, ranked by real-world impact. Short, factual, no editorializing.",
    }),
    card: {
      title: "Meridian",
      mediaHref: "/meridian",
      tagline:
        "Five stories a day, ranked by real-world impact. Short, factual, no editorializing.",
      image: {
        src: "/work/meridian.png",
        alt: "Meridian — five stories a day on a globe",
        objectFit: "cover",
      },
    },
  },
  {
    slug: "atlas",
    metadata: projectMetadata({
      title: "Atlas — Spec",
      description:
        "The working spec for Atlas, a queryable atlas of how the world works. Forked from Meridian Seven.",
      titleFormat: "pipe",
    }),
    card: {
      title: "Atlas",
      tagline: (
        <>
          Evolved from Meridian. A queryable globe.
          <br />
          Open spec - Still in development.
        </>
      ),
      mediaHref: "/atlas",
      image: {
        src: "/work/atlas-card.png",
        alt: "Atlas — queryable globe and working spec",
        objectFit: "cover",
      },
    },
  },
  {
    slug: "dreamspace",
    metadata: projectMetadata({
      title: "DreamSpace",
      description:
        "A marketplace connecting Indian homeowners with vetted architects and interior designers.",
    }),
    card: {
      title: "DreamSpace",
      tagline: (
        <>
          A marketplace connecting Indian homeowners with vetted architects and
          interior designers.
        </>
      ),
      mediaHref: "/dreamspace",
      image: {
        src: "/work/dreamspace.png",
        alt: "DreamSpace — marketplace connecting Indian homeowners with vetted architects and interior designers",
        objectFit: "cover",
      },
    },
  },
  {
    slug: "placemaking",
    metadata: projectMetadata({
      title: "Placemaking",
      description: "Designing places that give people a reason to stay.",
    }),
    card: {
      title: "Placemaking",
      tagline: <>Designing places that give people a reason to stay.</>,
      mediaHref: "/placemaking",
      image: {
        src: "/work/placemaking.png",
        alt: "Serentity — designing third places that give people a reason to stay",
      },
    },
  },
  {
    slug: "aboutme",
    metadata: projectMetadata({
      title: "About",
      description:
        "Background — GM platform PM, building across the U.S., India, and Southeast Asia.",
      titleFormat: "emdash",
    }),
    card: {
      title: "About Me",
      tagline: (
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
      ),
      mediaHref: "/aboutme",
      image: {
        src: "/hero-photo-2.png",
        alt: "Krishna Surya Madireddy",
        objectFit: "cover",
        objectPosition: "center 20%",
      },
    },
  },
];

export function getProject(slug: string): ProjectDefinition | undefined {
  return projects.find((p) => p.slug === slug);
}
