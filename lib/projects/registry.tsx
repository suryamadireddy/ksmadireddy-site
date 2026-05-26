import type { ProjectDefinition } from "./types";

export const projects: ProjectDefinition[] = [
  {
    slug: "kiln",
    card: {
      title: "The Kiln",
      tagline:
        "A three-phase agentic pipeline that fires a raw idea into a build-ready brief.",
      mediaHref: "/kiln",
      image: {
        src: "/work/kiln.svg",
        alt: "The Kiln — three-phase agent pipeline",
      },
    },
  },
  {
    slug: "meridian",
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
    slug: "dreamspace",
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
