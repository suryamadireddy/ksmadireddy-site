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

const INTRODUCTION = [
  "I'd been moving between countries fast enough that I lost track of where I'd been. I wanted to see it, not as a list but as a picture. Globetrotter is that: a globe you color in, country by country, until your travel history is something you can take in at a glance.",
];

/** Set when the hosted build is available. */
const GLOBETROTTER_LIVE_URL = "";

const WHY_I_BUILT = [
  "The map on this page is mine. Every country I'd been to when I built it, somewhere around twenty. I'd reached the point where I couldn't recite them all from memory, and that bothered me more than it should have. So I built what I wanted: click a country, watch it fill in, and let the picture of where you've been assemble itself.",
];

const PRODUCT_VISION = [
  "The version in my head went further than a tracker. Connect it to your camera roll and your phone's location history, and the globe becomes a living archive: photos resting on the spots they were taken, routes traced between them, a record of not just where you went but what you saw there. The backend to make that real never got built. Other projects kept pulling harder. Maybe one day.",
];

const WHAT_I_LEARNED = [
  "Globetrotter answered a question I hadn't thought to ask: a globe is a genuinely good interface, not a decoration. Anchoring information to the place it belongs makes it land. A map of where you've been hits differently than a list of it.",
];

const THE_PIVOT_TO_MERIDIAN = [
  "I showed it to a friend. He watched the countries light up and asked the question that changed everything: if a globe makes it this easy to see where you've been, why is no one using it to show where the news is happening right now? I didn't have an answer. A few weeks later, that answer was Meridian.",
];

const linkClassName =
  "text-base md:text-lg font-medium text-[var(--color-fg)] underline decoration-1 decoration-[var(--color-border-strong)] underline-offset-[6px] hover:decoration-[var(--color-fg)] transition-[text-decoration-color] duration-200";

export default function GlobetrotterProjectPage() {
  return (
    <>
      <CaseStudySection label="Introduction">
      <CaseStudyProse paragraphs={INTRODUCTION} />
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

      <CaseStudySection label="Purpose">
        <div className="mb-6 md:mb-8">
          <CaseStudyImage
            src="/work/globetrotter/gt2d.png"
            alt="Globetrotter — countries visited on the globe"
            placeholderLabel="public/work/globetrotter/gt2d.png"
          />
        </div>
        <CaseStudyProse paragraphs={WHY_I_BUILT} />
      </CaseStudySection>

      <CaseStudySection label="Vision">
        <CaseStudyProse paragraphs={PRODUCT_VISION} />
      </CaseStudySection>

      <CaseStudySection label="Takeaways">
        <CaseStudyProse paragraphs={WHAT_I_LEARNED} />
      </CaseStudySection>

      <CaseStudySection label="The Pivot to Meridian">
        <div className="mb-6 md:mb-8">
          <CaseStudyImage
            src="/work/globetrotter/gt3d.png"
            alt="Globetrotter — globe view"
            placeholderLabel="public/work/globetrotter/gt3d.png"
          />
        </div>
        <CaseStudyProse paragraphs={THE_PIVOT_TO_MERIDIAN} />
      </CaseStudySection>
    </>
  );
}
