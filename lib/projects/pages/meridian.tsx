import { CaseStudyScrollDeck } from "@/app/components/project/CaseStudyScrollDeck";
import {
  CaseStudyProse,
  CaseStudySection,
} from "@/app/components/project/ProjectCaseStudy";
import { ProjectEmbed } from "@/app/components/project/ProjectEmbed";
import { ProjectShell } from "@/app/components/project/ProjectShell";

const MERIDIAN_LIVE = "https://the-meridian-seven.vercel.app";

const INTRO = [
  "Meridian is a response to how news is consumed today. Most products optimize for volume and engagement — not for understanding what actually matters, or where events sit in the world.",
  "I built Meridian Seven to test a different contract with the reader: a small, fixed set of stories each day, ranked by real-world impact, anchored on a globe.",
];

const PROBLEMS = [
  {
    title: "Feed overload",
    paragraphs: [
      "Infinite scroll and push alerts train urgency, not understanding. Most stories never earn attention proportional to their impact — the feed wins by being endless, not by being useful.",
    ],
    image: {
      src: "/work/meridian/problem-1.png",
      alt: "News feed overload — endless stream of headlines",
      placeholderLabel: "public/work/meridian/problem-1.png",
    },
  },
  {
    title: "Engagement over impact",
    paragraphs: [
      "Ranking by clicks and outrage optimizes for reaction, not consequence. The important story and the loud story diverge — and readers learn to chase noise.",
    ],
    image: {
      src: "/work/meridian/problem-2.png",
      alt: "Engagement metrics driving news ranking",
      placeholderLabel: "public/work/meridian/problem-2.png",
    },
  },
  {
    title: "News without place",
    paragraphs: [
      "Headlines strip geography and systems. Readers finish an article without a mental map of where events sit — context is optional, not structural.",
    ],
    image: {
      src: "/work/meridian/problem-3.png",
      alt: "Headlines without geographic context",
      placeholderLabel: "public/work/meridian/problem-3.png",
    },
  },
];

const SOLUTIONS = [
  {
    title: "Five stories, impact-ranked",
    paragraphs: [
      "A fixed daily set — five stories, scored for real-world significance. Copy is short, wire-service in tone, with no editorializing. The reader knows the scope before they start.",
    ],
    image: {
      src: "/work/meridian/solution-1.png",
      alt: "Meridian — five daily stories ranked by impact",
      placeholderLabel: "public/work/meridian/solution-1.png",
    },
  },
  {
    title: "Globe as context",
    paragraphs: [
      "Each story anchors on the map. Place and proximity are part of comprehension from the first tap — not an afterthought in a sidebar.",
    ],
    image: {
      src: "/work/meridian/solution-2.png",
      alt: "Meridian — story exhibits on the globe",
      placeholderLabel: "public/work/meridian/solution-2.png",
    },
  },
];

const FUTURE_PLAN = [
  "Sharpen impact ranking with better signals — source diversity, geographic spread, and persistence over the news cycle.",
  "Richer exhibits: deeper sourcing, clearer exhibit hierarchy, and smoother transitions between globe and copy.",
  "Fork the spatial-knowledge layer into Atlas (evergreen, queryable globe) while Meridian stays focused on daily news.",
];

const CONCLUSION = [
  "Meridian Seven was a learning artifact as much as a product. It validated the globe + exhibit pattern and proved I could ship a full stack — ingestion, ranking, synthesis, and UI — on my own.",
  "The iteration story matters: I used Meridian, realized news wasn’t the framing I wanted long-term, and wrote the Atlas spec from what worked. That’s the arc I’d want a hiring manager to see.",
];

export default function MeridianProjectPage() {
  return (
    <ProjectShell
      maxWidth="7xl"
      title="MERIDIAN"
      headerSpacing="compact"
    >
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
    </ProjectShell>
  );
}
