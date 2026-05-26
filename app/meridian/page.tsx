import type { Metadata } from "next";
import { CaseStudyScrollDeck } from "@/app/components/project/CaseStudyScrollDeck";
import {
  CaseStudyProse,
  CaseStudySection,
} from "@/app/components/project/ProjectCaseStudy";
import { ProjectEmbed } from "@/app/components/project/ProjectEmbed";

export const metadata: Metadata = {
  title: "Meridian | Krishna Surya Madireddy",
  description:
    "Five stories a day, ranked by real-world impact. Short, factual, no editorializing.",
};

const MERIDIAN_LIVE = "https://the-meridian-seven.vercel.app";

const INTRO = [
  "News products are built for your attention. Not your understanding.",
"Meridian is built on the opposite contract: five stories a day, chosen for real-world impact, anchored to a globe at the place each one happens. The scope is fixed. You read it once, and you're done.",
];

const PROBLEMS = [
  {
    title: "Feed overload",
    paragraphs: [
      "News feeds are built to hold your attention, not reward it. The result is a familiar paradox: the more you read, the less you retain. A surplus of headlines, a deficit of actual insight.",
    ],
    image: {
      src: "/work/meridian/overload.png",
      alt: "News feed overload — endless stream of headlines",
      placeholderLabel: "public/work/meridian/problem-1.png",
    },
  },
  {
    title: "Engagement trap",
    paragraphs: [
      "Algorithms optimize for clicks, shares, and outrage. Not consequence. The stories that travel fastest are rarely the ones that matter most.",
    ],
    image: {
      src: "/work/meridian/clickbait.png",
      alt: "Engagement metrics driving news ranking",
      placeholderLabel: "public/work/meridian/problem-2.png",
    },
  },
  {
    title: "Geographic Gap",
    paragraphs: [
      "News is inherently geographic. A conflict means something different when you can see what borders it, what it neighbors, what it threatens. Most news gives you none of that.",
    ],
    image: {
      src: "/work/meridian/locationstruggle.png",
      alt: "Headlines without geographic context",
      placeholderLabel: "public/work/meridian/problem-3.png",
    },
  },
];

const SOLUTIONS = [
  {
    title: "Five stories, impact-ranked",
    paragraphs: [
      "A bounded brief instead of an infinite feed: five stories a day, chosen for real-world significance. The constraint is the point. Readers know the scope before they start, and each story is written to inform, not provoke.",
    ],
    image: {
      src: "/work/meridian/impactfulfive.png",
      alt: "Meridian — five daily stories ranked by impact",
      placeholderLabel: "public/work/meridian/solution-1.png",
    },
  },
  {
    title: "Globe as context",
    paragraphs: [
      "Meridian makes geography part of reading, not an afterthought. Each story is anchored on the globe so readers can see where it happens, what borders it, and how proximity shapes what it means.",
    ],
    image: {
      src: "/work/meridian/newscards.png",
      alt: "Meridian — story exhibits on the globe",
      placeholderLabel: "public/work/meridian/solution-2.png",
    },
  },
];

const FUTURE_PLAN = [
  "Sharpen impact scoring by integrating deeper signals: source diversity, geographic spread, and the long-term persistence of a story.",
  "Personalized filters: transforming the map into a tailored exhibit, focusing on the subjects and regions that matter most to the reader.",
  "3D visualizations instead of pins. Imagine seeing an F1 car on the circuit or a cargo ship in the Strait of Hormuz, transforming the map from a collection of markers into a living reflection of global activity.",
];

const CONCLUSION = [
  "Meridian proved the globe is a powerful interface for information. But it raised a bigger question. If a map can clarify today's news, what else can it illuminate? The same spatial logic applies to everything that shapes the world: trade routes, mineral deposits, the rise and fall of empires. Everything that matters happens somewhere. Atlas is what the globe becomes when news is just the beginning.",
];

export default function MeridianProjectPage() {
  return (
    <>
      <CaseStudySection label="Introduction">
        <CaseStudyProse paragraphs={INTRO} />
        <p className="mt-6 md:mt-8">
          <a
            href={MERIDIAN_LIVE}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base md:text-lg font-medium text-[var(--color-fg)] underline decoration-1 decoration-[var(--color-border-strong)] underline-offset-[6px] hover:decoration-[var(--color-fg)] transition-[text-decoration-color] duration-200"
          >
            Open Meridian live →
          </a>
        </p>
      </CaseStudySection>

      <CaseStudySection label="Interactive Experience">
        <ProjectEmbed src={MERIDIAN_LIVE} title="Meridian — live" />
      </CaseStudySection>

      <CaseStudyScrollDeck
        items={PROBLEMS}
        deckId="problems"
        deckLabel="Problems"
      />

      <CaseStudyScrollDeck
        items={SOLUTIONS}
        deckId="solutions"
        deckLabel="Solutions"
      />

      <CaseStudySection label="Future plan">
        <CaseStudyProse paragraphs={FUTURE_PLAN} />
      </CaseStudySection>

      <CaseStudySection label="Conclusion">
        <CaseStudyProse paragraphs={CONCLUSION} />
      </CaseStudySection>
    </>
  );
}
