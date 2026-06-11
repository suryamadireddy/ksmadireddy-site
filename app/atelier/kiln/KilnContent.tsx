import { CaseStudyImage } from "@/app/components/project/CaseStudyImage";
import {
  CaseStudyProse,
  CaseStudySection,
} from "@/app/components/project/ProjectCaseStudy";
import KilnRunDemo from "./KilnRunDemo";
import EvaluatorChat from "./EvaluatorChat";

/* The body of the Kiln case study — renders inside the Kiln tab of the
 * Atelier. Page chrome (shell, nav) stays with the caller. */

const MERIDIAN_PAGE = "/meridian";
const GEONEWS_EXHIBIT = "https://ksmstudio.vercel.app/projects/geonews";

const linkClassName =
  "text-base md:text-lg font-medium text-[var(--color-fg)] underline decoration-1 decoration-[var(--color-border-strong)] underline-offset-[6px] hover:decoration-[var(--color-fg)] transition-[text-decoration-color] duration-200";

const PIPELINE_GRID =
  "grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[minmax(0,32rem)_minmax(0,1fr)] xl:gap-12";

const INTRO = [
  "When an idea is ready to be taken seriously, it goes through the Kiln. The Kiln is adversarial on purpose. Its first agent, the Evaluator, plays devil's advocate across six dimensions and tries to find where the idea breaks — because most ideas should break, and the expensive mistake is being gentle with them.",
  "The ones that survive get grounded in research and turned into a real brief. The ones that don't are stopped before the system spends another minute on them.",
];

const EVALUATOR = {
  title: "Evaluator",
  paragraphs: [
    "The Evaluator is Kiln's Socratic stress test: adversarial by design, but in service of sharper ideas. It challenges the idea across six dimensions — clarity, impact, effort, falsifiability, founder fit, and viability — finding the weakest links.",
    "Each run is scored and saved: effort, impact, confidence, and the kill assumptions most likely to break the idea. When the idea returns, the Evaluator re-runs against its full history — prior scores, prior assumptions, and how the thinking has changed between sessions. The delta is the signal.",
  ],
};

const PIPELINE_REST = [
  {
    title: "Researcher",
    paragraphs: [
      "Once an idea clears the Evaluator, the Researcher grounds it in evidence. It pulls from market research, competitors, and user signals to build the foundation for the rest of the pipeline. It is constructive, not confirmatory — strengthening what the evidence supports and challenging what it does not.",
    ],
  },
  {
    title: "Artifact Creator",
    paragraphs: [
      "The Artifact Creator turns evidence into product direction and working documents: a Product Strategy Brief, MVP Definition, PRD, User Journey, and Metrics Plan.",
      "These are not summaries. They are execution-ready artifacts, written to make decisions explicit and give the Builder enough structure to create prototypes without guessing.",
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

export function KilnContent() {
  return (
    <>
      <CaseStudySection label="Introduction">
        <CaseStudyProse paragraphs={INTRO} />
      </CaseStudySection>

      {/* Pipeline section — Evaluator renders live chat; rest render static images */}
      <section
        id="pipeline"
        aria-label="The Pipeline section"
        className="case-study-section-rail"
      >
        <header className="case-study-deck-header mb-6">
          <span className="label case-study-section-label">The Pipeline</span>
        </header>
        <div className="space-y-16 md:space-y-24">
          {/* Evaluator — EvaluatorChat replaces the static image */}
          <article className={PIPELINE_GRID}>
            <div className="min-w-0">
              <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[var(--color-fg)]">
                {EVALUATOR.title}
              </h3>
              <div className="mt-4 md:mt-6 space-y-3 text-base md:text-lg leading-relaxed text-[var(--color-fg-muted)]">
                {EVALUATOR.paragraphs.map((p) => (
                  <p key={p.slice(0, 48)}>{p}</p>
                ))}
              </div>
            </div>
            <div className="min-w-0 w-full">
              <EvaluatorChat />
            </div>
          </article>

          {/* Researcher, Artifact Creator */}
          {PIPELINE_REST.map((item) => (
            <article
              key={item.title}
              className={item.image ? PIPELINE_GRID : "grid grid-cols-1 items-start"}
            >
              <div className="min-w-0">
                <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[var(--color-fg)]">
                  {item.title}
                </h3>
                <div className="mt-4 md:mt-6 space-y-3 text-base md:text-lg leading-relaxed text-[var(--color-fg-muted)]">
                  {item.paragraphs.map((p) => (
                    <p key={p.slice(0, 48)}>{p}</p>
                  ))}
                </div>
              </div>
              {item.image ? (
                <div className="min-w-0 w-full">
                  <CaseStudyImage
                    src={item.image.src}
                    alt={item.image.alt}
                    placeholderLabel={item.image.placeholderLabel}
                    compact
                  />
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <CaseStudySection
        label="Demo"
        className="case-study-section-rail--kiln-demo"
      >
        <CaseStudyProse paragraphs={DEMO} />
        <div className="mt-8 md:mt-10 rounded-md border border-[var(--color-border)] overflow-hidden">
          <KilnRunDemo />
        </div>
      </CaseStudySection>

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
    </>
  );
}
