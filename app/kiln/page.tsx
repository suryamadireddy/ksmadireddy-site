import type { Metadata } from "next";
import { CaseStudyScrollDeck } from "@/app/components/project/CaseStudyScrollDeck";
import {
  CaseStudyProse,
  CaseStudySection,
} from "@/app/components/project/ProjectCaseStudy";
import KilnRunDemo from "@/app/kiln/KilnRunDemo";
import { ProjectShell } from "@/app/components/project/ProjectShell";

export const metadata: Metadata = {
  title: "The Kiln | Krishna Surya Madireddy",
  description:
    "A three-phase agentic pipeline that fires a raw idea into a build-ready brief.",
};

const MERIDIAN_PAGE = "/meridian";
const GEONEWS_EXHIBIT = "https://ksmstudio.vercel.app/projects/geonews";

const linkClassName =
  "text-base md:text-lg font-medium text-[var(--color-fg)] underline decoration-1 decoration-[var(--color-border-strong)] underline-offset-[6px] hover:decoration-[var(--color-fg)] transition-[text-decoration-color] duration-200";

const INTRO = [
  "The Kiln is a pipeline that takes a raw idea and fires it through three stages — interrogation, research, and specification — until it becomes a builder brief precise enough to hand straight to a build tool. Each stage is an agent with one job.",
  "I built it because the slowest and least reliable part of building things is the stretch between having an idea and having something a team can actually build. The Kiln is my attempt to make that stretch fast, rigorous, and repeatable — and to be harder on my own ideas than I manage to be on my own.",
  "Three phases run today and have produced real work. Two more — a Builder and a Deployer that would carry a brief all the way to shipped software — are designed but not yet built. This page is honest about both.",
];

const PIPELINE = [
  {
    title: "Evaluator",
    paragraphs: [
      "The Evaluator interrogates the idea before anything else is allowed to happen. It runs a Socratic stress-test across six dimensions — problem clarity, impact mechanism, effort realism, falsifiability, founder-idea fit, and commercial viability — hunting for the weak points rather than confirmation. It is adversarial by design. Its job is to try to break the idea, and to tell you plainly if it succeeds.",
      "Its scoring stays internal. You do not see the numbers during the interview, and the public exhibit never shows them — but the scores are retained, so the Evaluator can re-evaluate an idea later if it genuinely improves.",
    ],
    image: {
      src: "/work/kiln/evaluator.png",
      alt: "The Evaluator — Socratic stress-test of an idea",
      placeholderLabel: "public/work/kiln/evaluator.png",
    },
  },
  {
    title: "Researcher",
    paragraphs: [
      "Once an idea survives the Evaluator, the Researcher changes the relationship. Where the Evaluator challenged the idea, the Researcher grounds it — running web-grounded market and product research to build the factual foundation the rest of the pipeline stands on. It stays constructive, but it will still contradict the idea where the evidence demands it. A research pass that only confirms what you already believed is worthless.",
    ],
    image: {
      src: "/work/kiln/researcher.png",
      alt: "The Researcher — grounding the idea in market and product research",
      placeholderLabel: "public/work/kiln/researcher.png",
    },
  },
  {
    title: "Artifact Creator",
    paragraphs: [
      "The Artifact Creator turns the grounded idea into working documents through four sequential stages — a PRD, an MVP scope, next steps, and a builder brief. These are not summaries. They are working specifications, and the builder brief is written to be handed directly to a build tool like Claude Code or v0.",
    ],
    image: {
      src: "/work/kiln/artifact-creator.png",
      alt: "The Artifact Creator — PRD, MVP scope, next steps, and builder brief",
      placeholderLabel: "public/work/kiln/artifact-creator.png",
    },
  },
];

const DEMO = [
  "Select an idea and watch how Kiln turns it into a build-ready brief.",
];

const WORKED_EXAMPLE = [
  "The clearest way to see what the Kiln produces is to look at something that came out of it. GeoNews — the idea that became Meridian — was run through the full pipeline. The Evaluator pressure-tested it, the Researcher grounded it, the Artifact Creator produced its PRD and builder brief, and a final distillation pass rendered the result into a public exhibit.",
  "That exhibit is a real Kiln output: its problem framing, open questions, and personas are all generated material, and it exposes the underlying brief and PRD directly. Meridian is what got built from that brief.",
];

const LESSONS = [
  "Building the Kiln meant learning how multi-step agent systems fail, and they fail consistently: context is lost between stages, outputs contradict earlier ones, and quality degrades the longer a run goes. Some of the fixes are in — field-level validation on the Evaluator's output, schema-validated tool calls in the distillation pass, and continuation handling when a generation is interrupted mid-stream. Others I know are still thin: the middle stages parse output more loosely than they should, and the pipeline does not yet retry cleanly on transient API failures. I would rather name those gaps than pretend they are closed.",
  "If I rebuilt the Kiln, I would architect the handoffs between agents more strictly — typed contracts instead of a shared record each stage reads from and writes to. The current design works, but building it taught me exactly where the seams are.",
  "The other lesson is harder to put in a diagram. The Evaluator works well enough that I am genuinely reluctant to use it. It finds the flaws in my own ideas faster, and more honestly, than I want it to. That reluctance is the proof — I built a tool to be hard on me, and it is.",
];

const BIGGER_PICTURE = [
  "The pipeline does not stand alone. Two capabilities already exist around it. The studio is a private workspace where a project persists after a run — you can hold a conversation with it, push it further, and change it over time. The gallery is the public side: a completed idea is rendered into an exhibit and published, the way the GeoNews exhibit was. Both are built.",
  "The Kiln is also one capability of something larger. The long-term goal is a personal Jarvis — an AI layer that compounds one person's ability to go from idea to built work. The Kiln is the part I built first, because turning ideas into reality is the bottleneck everything else depends on.",
];

export default function KilnPage() {
  return (
    <ProjectShell title="THE KILN">
      <CaseStudySection label="Introduction">
        <CaseStudyProse paragraphs={INTRO} />
      </CaseStudySection>

      <CaseStudyScrollDeck
        items={PIPELINE}
        deckId="pipeline"
        deckLabel="The Pipeline"
      />

      <CaseStudySection label="Demo" className="case-study-section-rail--kiln-demo">
        <CaseStudyProse paragraphs={DEMO} />
        <div className="mt-8 md:mt-10 rounded-md border border-[var(--color-border)] overflow-hidden">
          <KilnRunDemo />
        </div>
      </CaseStudySection>

      {/* Future: CaseStudySection "Talk to the Evaluator" — live evaluator-only demo */}

      <CaseStudySection label="Worked example">
        <CaseStudyProse paragraphs={WORKED_EXAMPLE} />
        <p className="mt-6 md:mt-8">
          <a
            href={GEONEWS_EXHIBIT}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
          >
            See the GeoNews exhibit the Kiln produced →
          </a>
        </p>
        <p className="mt-3 md:mt-4">
          <a href={MERIDIAN_PAGE} className={linkClassName}>
            See Meridian, the product built from it →
          </a>
        </p>
      </CaseStudySection>

      <CaseStudySection label="What it taught me">
        <CaseStudyProse paragraphs={LESSONS} />
      </CaseStudySection>

      <CaseStudySection label="The bigger picture">
        <CaseStudyProse paragraphs={BIGGER_PICTURE} />
      </CaseStudySection>
    </ProjectShell>
  );
}
