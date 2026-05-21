import type { Metadata } from "next";
import { CaseStudyImage } from "@/app/components/project/CaseStudyImage";
import {
  CaseStudyProse,
  CaseStudySection,
} from "@/app/components/project/ProjectCaseStudy";

export const metadata: Metadata = {
  title: "Globetrotter | Krishna Surya Madireddy",
  description:
    "A personal travel tracker — a globe you color in, country by country.",
};

/** Set when the hosted build is available. */
const GLOBETROTTER_LIVE_URL = "";

const WHY_I_BUILT = [
  "I was moving between countries fast enough that I genuinely lost track of where I'd been. I needed something that would show me — not a list, but a picture. Globetrotter was that: a globe you color in, country by country, watching your travels take shape. The countries on that image are the ones I've actually been to. Around twenty at this point.",
  "The version I had in my head was bigger — connect it to your camera roll, auto-populate from your phone's location history, and turn the globe into a living archive of everywhere you've been and everything you saw there. The backend never got built; other things kept pulling harder. One day.",
];

const THE_QUESTION = [
  "I showed it to a friend. He looked at the globe lighting up with countries and asked whether it could somehow show news — real events, live, pinned to where they were happening. I didn't have an answer then. A few weeks later, that question became Meridian.",
  "Globetrotter is still what it was: a personal tracker, no backend, a refresh clears it. But it taught me that a globe is a genuinely good interface — not a decoration, not a gimmick. That turned out to matter.",
];

const linkClassName =
  "text-base md:text-lg font-medium text-[var(--color-fg)] underline decoration-1 decoration-[var(--color-border-strong)] underline-offset-[6px] hover:decoration-[var(--color-fg)] transition-[text-decoration-color] duration-200";

export default function GlobetrotterProjectPage() {
  return (
    <>
      <CaseStudySection label="Introduction">
        <p className="mt-0 text-base md:text-lg leading-relaxed text-[var(--color-fg-muted)]">
          A personal travel tracker.
        </p>
        {GLOBETROTTER_LIVE_URL ? (
          <p className="mt-6 md:mt-8">
            <a
              href={GLOBETROTTER_LIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClassName}
            >
              Open Globetrotter live →
            </a>
          </p>
        ) : (
          <p className="mt-6 md:mt-8 text-base md:text-lg leading-relaxed text-[var(--color-fg-muted)]">
            Live demo — URL to be added.
          </p>
        )}
      </CaseStudySection>

      <CaseStudySection label="Why I built it">
        <div className="mb-6 md:mb-8">
          <CaseStudyImage
            src="/work/globetrotter/gt2d.png"
            alt="Globetrotter — countries visited on the globe"
            placeholderLabel="public/work/globetrotter/gt2d.png"
          />
        </div>
        <CaseStudyProse paragraphs={WHY_I_BUILT} />
      </CaseStudySection>

      <CaseStudySection label="The question">
        <div className="mb-6 md:mb-8">
          <CaseStudyImage
            src="/work/globetrotter/gt3d.png"
            alt="Globetrotter — globe view"
            placeholderLabel="public/work/globetrotter/gt3d.png"
          />
        </div>
        <CaseStudyProse paragraphs={THE_QUESTION} />
      </CaseStudySection>
    </>
  );
}
