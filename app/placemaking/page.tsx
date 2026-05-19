import type { Metadata } from "next";
import { CaseStudyImage } from "@/app/components/project/CaseStudyImage";
import {
  CaseStudyProse,
  CaseStudySection,
} from "@/app/components/project/ProjectCaseStudy";
import { ProjectShell } from "@/app/components/project/ProjectShell";

export const metadata: Metadata = {
  title: "Placemaking | Krishna Surya Madireddy",
  description: "Designing places that give people a reason to stay.",
};

const INTRO = [
  "Field research across Asia and Europe on how public and semi-public spaces earn repeat visits — not through novelty alone, but through rhythm, comfort, and reasons to linger.",
  "The thread is placemaking as systems design: circulation, seating, light, sound, and the small cues that signal “you can stay.” Third places fail when they optimize for throughput; they work when they optimize for belonging without requiring a transaction.",
  "Notes, sketches, and site studies will live here as the project page grows.",
];

export default function PlacemakingProjectPage() {
  return (
    <ProjectShell
      title="PLACEMAKING"
      description="Designing third places that give people a reason to stay."
    >
      <CaseStudySection label="Introduction">
        <div className="mb-6 md:mb-8">
          <CaseStudyImage
            src="/work/placemaking.png"
            alt="Placemaking — designing third places that give people a reason to stay"
            placeholderLabel="public/work/placemaking.png"
          />
        </div>
        <CaseStudyProse paragraphs={INTRO} />
      </CaseStudySection>
    </ProjectShell>
  );
}
