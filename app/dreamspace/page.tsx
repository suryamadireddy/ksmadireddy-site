import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CaseStudyImage } from "@/app/components/project/CaseStudyImage";
import {
  CaseStudyProse,
  CaseStudySection,
} from "@/app/components/project/ProjectCaseStudy";
import { ProjectShell } from "@/app/components/project/ProjectShell";

export const metadata: Metadata = {
  title: "DreamSpace | Krishna Surya Madireddy",
  description:
    "A marketplace connecting Indian homeowners with vetted architects and interior designers.",
};

/** Set when the hosted prototype is available. */
const DREAMSPACE_PROTOTYPE_URL = "";

const INTRO = [
  "India's home renovation market is large, design-conscious, and almost entirely dependent on word of mouth. When a homeowner in Hyderabad needs an architect or interior designer, the process is the same as it was twenty years ago: ask a relative, ask a neighbor, hope the referral works out. There is no structured discovery layer, no vetting mechanism, nothing between a homeowner and a profession that charges by the project.",
  "Dream Space was built on the premise that this infrastructure doesn't exist yet — and that the gap was large enough to build into seriously.",
];

const MARKET = [
  "On one side of the marketplace, homeowners navigate the design process through personal networks alone. The quality of the professional they find is a function of who they know. A bad referral means a stalled renovation with no recourse and no way to compare alternatives.",
  "On the other side, architects and interior designers build their entire client base through relationships. New client acquisition is informal, slow, and bounded by social radius. A talented designer without a strong network stays invisible regardless of the quality of their work.",
  "The result is a fragmented market where quality and discovery are both rationed by proximity. The infrastructure to connect them — a structured, trusted marketplace layer — doesn't exist.",
];

const RESEARCH = [
  "Before building anything, I spent time at the Hyderabad Architect Expo and across the city conducting over fifteen discovery interviews with homeowners, architects, and developers. The goal was to map the workflow on both sides before assuming what the product should be.",
  "What surfaced was consistent: homeowners described the professional search as opaque and anxiety-producing — no way to evaluate a designer before committing. Architects described referrals as their only acquisition channel with no way to reach clients outside their existing network. Developers sat between both groups and navigated the same fragmentation at volume.",
  "The demand was real on both sides. The gap wasn't a missing feature — it was a missing market layer.",
];

const VERSION_1 = [
  "The first version of Dream Space was built to validate the core marketplace loop. It surfaced the fundamental problem with building a two-sided marketplace as a solo operation without enough architectural discipline: the schema was informal, the data contracts were loose, and adding any new surface — a design catalog, a review system, a firm profile — required rewriting rather than extending.",
  "v1 proved the concept worked. It also made clear that the platform needed to be designed before it was built.",
];

const VERSION_2 = [
  "v2 was rebuilt schema-first. The data model defined firms, projects, designs, reviews, and team members as proper typed interfaces, with a firm lifecycle state machine governing account status: trial → active → past due → suspended. Row-level security was designed into the Supabase layer from the start, with public-facing agents isolated from internal account data by construction.",
  "Mock data was shaped exactly like the production schema — the same field names, the same types, the same relationships — so swapping mocks for real database queries becomes mechanical rather than a rewrite. The prototype runs on mocked data. The architecture is production-ready.",
  "The approach was deliberate: a polished UI built on a sloppy schema is a demo. A polished UI built on a well-designed schema is a platform.",
];

const PROTOTYPE = [
  "The visual aesthetic was designed to match the market: warm neutrals, terracotta accents, Fraunces serif headlines, generous whitespace. Closer to Architectural Digest India than a corporate SaaS directory. Interior photography is the hero on every page — not decoration, but the primary interface through which homeowners evaluate design professionals.",
];

const CONCLUSION = [
  "A personal setback in early 2025 cut the venture short and brought me back to the U.S. before the platform could be taken to market. The codebase, the schema, and the architectural decisions are documented and intact.",
  "The market gap hasn't closed. India's home design discovery layer is still word-of-mouth, and the platform architecture built for v2 is sound enough that picking it back up would mean extending it, not restarting it. The research is real, the demand was validated on both sides, and the structural problem is unsolved.",
  "What the work left behind is a pattern: design the schema before the UI, build the data contracts before the components, and treat the architecture as the product — not the screens.",
];

function CaseStudyExternalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  if (!href) return null;

  return (
    <p className="mt-6 md:mt-8">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-base md:text-lg font-medium text-[var(--color-fg)] underline decoration-1 decoration-[var(--color-border-strong)] underline-offset-[6px] hover:decoration-[var(--color-fg)] transition-[text-decoration-color] duration-200"
      >
        {children} →
      </a>
    </p>
  );
}

export default function DreamspaceProjectPage() {
  return (
    <ProjectShell title="DREAMSPACE">
      <CaseStudySection label="Introduction">
        <CaseStudyProse paragraphs={INTRO} />
        <CaseStudyExternalLink href={DREAMSPACE_PROTOTYPE_URL}>
          View prototype
        </CaseStudyExternalLink>
      </CaseStudySection>

      <CaseStudySection label="The Market">
        <div className="mb-6 md:mb-8">
          <CaseStudyImage
            src="/work/dreamspace/market.png"
            alt="Hyderabad residential and design context"
            placeholderLabel="public/work/dreamspace/market.png"
          />
        </div>
        <CaseStudyProse paragraphs={MARKET} />
      </CaseStudySection>

      <CaseStudySection label="The Research">
        <div className="mb-6 md:mb-8">
          <CaseStudyImage
            src="/work/dreamspace/research.png"
            alt="Hyderabad Architect Expo and fieldwork"
            placeholderLabel="public/work/dreamspace/research.png"
          />
        </div>
        <CaseStudyProse paragraphs={RESEARCH} />
      </CaseStudySection>

      <CaseStudySection label="Version 1">
        <div className="mb-6 md:mb-8">
          <CaseStudyImage
            src="/work/dreamspace/v1.png"
            alt="Dream Space v1 screenshot"
            placeholderLabel="public/work/dreamspace/v1.png"
          />
        </div>
        <CaseStudyProse paragraphs={VERSION_1} />
      </CaseStudySection>

      <CaseStudySection label="Version 2" title="The architecture">
        <div className="mb-6 md:mb-8">
          <CaseStudyImage
            src="/work/dreamspace/architecture.png"
            alt="Dream Space v2 architecture — schema and system diagram"
            placeholderLabel="public/work/dreamspace/architecture.png"
          />
        </div>
        <CaseStudyProse paragraphs={VERSION_2} />
      </CaseStudySection>

      <CaseStudySection label="The prototype">
        <CaseStudyProse paragraphs={PROTOTYPE} />
        <div className="mt-6 md:mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <CaseStudyImage
            src="/work/dreamspace/prototype-1.png"
            alt="Dream Space prototype — homepage or designer listing"
            placeholderLabel="public/work/dreamspace/prototype-1.png"
          />
          <CaseStudyImage
            src="/work/dreamspace/prototype-2.png"
            alt="Dream Space prototype — designer profile or design catalog"
            placeholderLabel="public/work/dreamspace/prototype-2.png"
          />
        </div>
        <CaseStudyExternalLink href={DREAMSPACE_PROTOTYPE_URL}>
          Explore the prototype
        </CaseStudyExternalLink>
      </CaseStudySection>

      <CaseStudySection label="Conclusion">
        <CaseStudyProse paragraphs={CONCLUSION} />
      </CaseStudySection>
    </ProjectShell>
  );
}
