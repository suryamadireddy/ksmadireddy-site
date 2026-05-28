import type { Metadata } from "next";
import { CaseStudyImage } from "@/app/components/project/CaseStudyImage";
import {
  CaseStudyProse,
  CaseStudySection,
} from "@/app/components/project/ProjectCaseStudy";
import { ProjectShell } from "@/app/components/project/ProjectShell";
import { AtelierKilnThread } from "@/app/components/project/AtelierKilnThread";

export const metadata: Metadata = {
  title: "Atelier | Krishna Surya Madireddy",
  description: "A studio where ideas are judged, built, and kept or thrown away.",
};

const inlineLinkClass =
  "font-medium text-[var(--color-fg)] underline decoration-1 decoration-[var(--color-border-strong)] underline-offset-[6px] hover:decoration-[var(--color-fg)] transition-[text-decoration-color] duration-200";

const INTRO = [
  "The Atelier is my studio. Ideas come in, the Kiln judges them, and the ones worth building get worked into real things. The rest get parked or thrown away.",
  "Having ideas was never the hard part. Knowing which ones deserved the work was. The Atelier is built to make that call honestly, so the few ideas that survive get all of my attention.",
];

const WHAT_RUNS = [
  "What runs today: the Kiln, the idea workspace, the conversations, and the verdicts that sort every idea.",
  "What is designed and next: the Builder, which is the hard part, and the Deployer, which is mostly packaging. The folders that will file ideas automatically by verdict are designed; today the verdicts are labels, not yet folders. The public Gallery is being rebuilt.",
];

const BIGGER_PICTURE = [
  "The Atelier is one piece of something larger. The long-term goal is a personal Jarvis: an AI layer that compounds one person's ability to go from idea to built work.",
  "The Kiln turns ideas into briefs. The Atelier is where those briefs become things. Jarvis is what connects all of it, and what comes next.",
];

export default function AtelierPage() {
  return (
    <ProjectShell title="ATELIER">
      <div className="mb-10 md:mb-12">
        <AtelierKilnThread current="atelier" />
      </div>
      <CaseStudySection label="Introduction">
        <CaseStudyProse paragraphs={INTRO} />
      </CaseStudySection>

      <CaseStudySection label="How it works">
        <CaseStudyImage
          src="/work/atelier/ideas.png"
          alt="The Atelier — ideas that cleared the Kiln"
          placeholderLabel="public/work/atelier/ideas.png"
        />
        <div className="mt-6 md:mt-8 space-y-4 text-base md:text-lg leading-relaxed text-[var(--color-fg-muted)]">
          <p>
            Open the Atelier and the ideas that cleared the{" "}
            <a href="/kiln" className={inlineLinkClass}>
              Kiln
            </a>{" "}
            are already in front of you, each with its verdict and where it
            stands.
          </p>
          <p>
            Every idea takes the same path. It enters and goes through the
            Kiln, which fires it and sorts the result. Bad ideas go to trash.
            Promising ones that are not ready wait in potential. The ones worth
            building get staged.
          </p>
          <p>
            A staged idea carries everything the Kiln produced: its brief, its
            artifacts, its open questions. The conversations layer lets me keep
            talking to an idea over time, push it further, and reshape it as I
            learn. An idea is not a document that gets filed away. It stays
            live.
          </p>
          <p>
            When one is ready, the Builder turns its brief into prototype
            directions and the Deployer stands it up as a real repository. Some
            ideas skip that entirely. Not everything is software, and not
            everything needs to be built to be worth keeping.
          </p>
          <p>
            One idea, GeoNews, went the whole way through and became{" "}
            <a href="/meridian" className={inlineLinkClass}>
              Meridian
            </a>
            .
          </p>
        </div>
      </CaseStudySection>

      <CaseStudySection label="What runs today">
        <CaseStudyProse paragraphs={WHAT_RUNS} />
      </CaseStudySection>

      <CaseStudySection label="The bigger picture">
        <CaseStudyProse paragraphs={BIGGER_PICTURE} />
      </CaseStudySection>
    </ProjectShell>
  );
}
