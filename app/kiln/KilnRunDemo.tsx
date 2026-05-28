"use client";

/**
 * KilnRunDemo — the "See it run" demo for the /kiln page.
 *
 * Self-contained. No backend, no API calls. All content is canned.
 * Drop it into your Next.js app and render <KilnRunDemo /> inside the
 * "See it run" section.
 *
 * Styling lives in the STYLE BLOCK below — every value is driven by a
 * CSS variable defined under `.kiln-demo`. Override those variables
 * from your design system and the component re-skins cleanly.
 */

import { useEffect, useRef, useState, type ReactNode } from "react";

/* ============================================================
   TYPES
   ============================================================ */

type PhaseId = "evaluator" | "researcher" | "artifact" | "builder" | "deployer";
type Status = "idle" | "processing" | "done" | "skipped";
type VerdictKind = "pass" | "pass-flags" | "stopped";
type DimStatus = "held" | "flagged" | "failed";

interface PhaseMeta {
  id: PhaseId;
  index: string;
  name: string;
  kind: "built" | "designed";
  tag: string;
  verb?: string; // processing label — built phases only
}

interface Dimension {
  name: string;
  status: DimStatus;
  note: string;
}

interface EvaluatorOutput {
  verdictKind: VerdictKind;
  verdict: string;
  dimensions: Dimension[];
  closing: string;
}

interface Finding {
  label: string;
  body: string;
}

interface ResearcherOutput {
  ran: boolean;
  findings?: Finding[];
  pushback?: string;
  confidence?: string;
  sources?: string;
  skippedNote?: string;
}

interface ArtifactDoc {
  name: string;
  summary: string;
}

interface ArtifactOutput {
  ran: boolean;
  docs?: ArtifactDoc[];
  closing?: string;
  skippedNote?: string;
}

interface Idea {
  id: string;
  mark: string;
  chip: string;
  prompt: string;
  evaluator: EvaluatorOutput;
  researcher: ResearcherOutput;
  artifact: ArtifactOutput;
}

/* ============================================================
   PHASE DEFINITIONS — three built, two designed
   ============================================================ */

const PHASES: PhaseMeta[] = [
  {
    id: "evaluator",
    index: "01",
    name: "Evaluator",
    kind: "built",
    tag: "Runs today",
    verb: "Stress-testing across six dimensions",
  },
  {
    id: "researcher",
    index: "02",
    name: "Researcher",
    kind: "built",
    tag: "Runs today",
    verb: "Grounding the idea in evidence",
  },
  {
    id: "artifact",
    index: "03",
    name: "Artifact Creator",
    kind: "built",
    tag: "Runs today",
    verb: "Drafting the brief",
  },
  {
    id: "builder",
    index: "04",
    name: "Builder",
    kind: "designed",
    tag: "Designed",
  },
  {
    id: "deployer",
    index: "05",
    name: "Deployer",
    kind: "designed",
    tag: "Designed",
  },
];

/* The two designed phases — idea-independent, conditional voice. */
const DESIGNED_BODY: Record<"builder" | "deployer", string> = {
  builder:
    "Would take the finished brief and turn it into four prototype directions \u2014 each one a visual tile, a different reading of the same MVP. Select one, blend two, or fine-tune from there. The brief stops being something you read and becomes something you can see and react to.",
  deployer:
    "Would stand up a repository from the chosen direction and hand the build off to an IDE like Cursor. The point where the Kiln\u2019s work ends and real engineering begins.",
};

/* ============================================================
   CANNED IDEAS — calibrated to three quality levels.
   The chips do not reveal which is which. The pipeline does.
   ============================================================ */

const IDEAS: Idea[] = [
  /* ---- A — strong: sails through ---- */
  {
    id: "regwatch",
    mark: "A",
    chip: "Regulatory-change monitor for fintech compliance",
    prompt:
      "A tool that watches financial regulators for rule changes and tells a compliance team exactly which of their own product features each change affects \u2014 so they stop hearing about it first from an auditor.",
    evaluator: {
      verdictKind: "pass",
      verdict: "Cleared. Strong across all six dimensions.",
      dimensions: [
        {
          name: "Problem acuity",
          status: "held",
          note: "Pressed on whether late discovery is actually expensive. It is \u2014 remediation cost and fine exposure both scale with detection lag. A dated pain, not a vague one.",
        },
        {
          name: "Audience clarity",
          status: "held",
          note: "Asked who signs the check. Compliance leads at growth-stage fintechs \u2014 a role that exists, holds budget, and is measured on exactly this failure.",
        },
        {
          name: "Wedge & defensibility",
          status: "held",
          note: "The wedge is not watching regulators \u2014 alert feeds already do that. It is mapping each change onto the customer\u2019s own feature surface. That mapping compounds with use.",
        },
        {
          name: "Timing",
          status: "held",
          note: "Regulatory volume is climbing while compliance headcount stays flat. The widening gap is the tailwind.",
        },
        {
          name: "Feasibility",
          status: "held",
          note: "The hard part is the feature-to-rule mapping, not the scraping \u2014 and the difficulty is the point. An easy build would not stay defensible.",
        },
        {
          name: "Willingness to pay",
          status: "held",
          note: "Sits beside a budget line that already exists \u2014 audit and legal spend. It defends an old budget rather than asking for a new one.",
        },
      ],
      closing:
        "Tried to break it on the obvious objection \u2014 why no incumbent has built this. The answer held: incumbents sell breadth across every regulation, and this needs depth in one. Cleared to research.",
    },
    researcher: {
      ran: true,
      findings: [
        {
          label: "Market",
          body: "Compliance tooling is large, but most spend flows to broad governance suites that are wide and shallow. The narrow feature-mapping niche is genuinely underserved \u2014 confirmed against two industry surveys.",
        },
        {
          label: "Competition",
          body: "The closest analogs are regulatory-intelligence feeds and rule-tracking services. None connect a change to a specific customer\u2019s product surface; they stop at \u2018a rule moved.\u2019 The gap the idea targets is real.",
        },
      ],
      pushback:
        "The idea assumed compliance teams adopt this directly. The evidence points elsewhere: the first hands on the tool are often the engineering or product owner of the affected feature \u2014 compliance flags the change, engineering remediates it. The wedge holds, but the named buyer in the brief should shift toward that owner.",
      confidence:
        "Medium-high. The pain and the market gap are well-evidenced; the open question is go-to-market motion, not the idea itself.",
      sources:
        "Grounded in 14 sources \u2014 regulator publications, two compliance-tooling surveys, and competitor product documentation.",
    },
    artifact: {
      ran: true,
      docs: [
        {
          name: "Definition",
          summary:
            "Core hypothesis: compliance teams will pay to convert regulatory change from a discovery problem into a routed work item. Two personas \u2014 the accountable Compliance Lead and the remediating Feature Owner.",
        },
        {
          name: "Product Strategy Brief",
          summary:
            "Win one vertical \u2014 lending \u2014 in depth before widening. Positioned deliberately against breadth-first governance suites.",
        },
        {
          name: "PRD",
          summary:
            "v1 is three parts: a change feed, a customer-maintained feature registry, and the mapping engine that joins them. Ticketing is integrated, not rebuilt.",
        },
        {
          name: "MVP Definition",
          summary:
            "Smallest honest test \u2014 one regulator, one customer\u2019s feature set, mapping done semi-manually. Earn trust in the mapping before automating it.",
        },
        {
          name: "User Journey",
          summary:
            "A rule changes. The lead opens a digest of only the changes that touch their features \u2014 each with an owner and a severity. The auditor conversation becomes documented instead of reactive.",
        },
        {
          name: "Metrics Plan",
          summary:
            "Leading: reduction in detection lag. Lagging: remediation cost per change, and renewal. Anti-metric: alert volume \u2014 more alerts is a failure, not traction.",
        },
      ],
      closing:
        "Build-ready. The brief carries the research correction \u2014 the Feature Owner is named as the entry buyer, not compliance.",
    },
  },

  /* ---- B — flagged by the Evaluator, but passes ---- */
  {
    id: "onboard",
    mark: "B",
    chip: "Auto-generated engineer onboarding docs",
    prompt:
      "A tool that generates onboarding documentation for new engineers by analyzing how a codebase is actually used \u2014 so new hires stop reverse-engineering tribal knowledge from scratch.",
    evaluator: {
      verdictKind: "pass-flags",
      verdict: "Cleared \u2014 with two flags.",
      dimensions: [
        {
          name: "Problem acuity",
          status: "held",
          note: "Onboarding drag is real and measurable \u2014 senior-engineer hours lost per hire, and weeks before a new engineer ships anything that matters.",
        },
        {
          name: "Audience clarity",
          status: "flagged",
          note: "Buyer and user are not the same person, and their incentives diverge. The engineering leader buys to reclaim senior time; the new hire uses it and will quietly abandon anything subtly wrong. Pricing and adoption have to be designed around that split.",
        },
        {
          name: "Wedge & defensibility",
          status: "held",
          note: "The wedge is usage-derived structure, not prose. \u2018Generated docs\u2019 is a crowded, weak claim. \u2018Here is what actually depends on what, and who owns it\u2019 is not.",
        },
        {
          name: "Timing",
          status: "held",
          note: "Codebases keep growing and tenure keeps shortening. The gap widens without anyone\u2019s help.",
        },
        {
          name: "Feasibility",
          status: "flagged",
          note: "Auto-generated docs that are subtly wrong are worse than none \u2014 they earn trust, then mislead. The accuracy bar is unforgiving. A build risk, not an idea-killer, but the MVP must be scoped to where the tool can be reliably right.",
        },
        {
          name: "Willingness to pay",
          status: "held",
          note: "Senior-engineer time carries a defensible dollar figure. The saving is legible to whoever owns the budget.",
        },
      ],
      closing:
        "Tried to stop it on the accuracy flag. It survived \u2014 because the flag points at what to build first, not at whether to build at all. Passed to research with both flags attached.",
    },
    researcher: {
      ran: true,
      findings: [
        {
          label: "Market",
          body: "Developer-experience tooling is growing, and onboarding shows up as a named line item in DevEx budgets \u2014 not a nice-to-have.",
        },
        {
          label: "Competition",
          body: "Documentation generators mostly work from code comments or produce prose summaries \u2014 exactly the failure mode the Evaluator flagged. Dependency-graph and code-ownership tools exist, but are sold as architecture tooling, not onboarding.",
        },
      ],
      pushback:
        "The idea framed the output as documentation. The evidence disagrees: in interviews, new engineers valued \u2018who do I ask\u2019 over \u2018here is a written explanation.\u2019 The durable artifact is a navigable map of ownership and dependencies, not generated prose. The brief should carry the corrected framing \u2014 this is a code map, not a doc generator.",
      confidence:
        "Medium. The pain is well-evidenced. The Evaluator\u2019s accuracy flag is independently echoed by user evidence \u2014 it should drive MVP scope.",
      sources:
        "Grounded in 11 sources \u2014 two DevEx surveys, competitor documentation, and engineering-onboarding research.",
    },
    artifact: {
      ran: true,
      docs: [
        {
          name: "Definition",
          summary:
            "Core hypothesis, revised per research: new engineers will rely on a usage-derived map of ownership and dependencies over written docs. Personas: the Engineering Lead who buys, the New Hire who uses \u2014 the incentive split made explicit.",
        },
        {
          name: "Product Strategy Brief",
          summary:
            "Lead with the map, not the prose. The Evaluator\u2019s accuracy flag becomes the strategy: ship only what can be derived and verified.",
        },
        {
          name: "PRD",
          summary:
            "v1: a dependency graph, a code-ownership overlay, and \u2018who to ask\u2019 routing. Generated prose is explicitly deferred until its accuracy can be guaranteed.",
        },
        {
          name: "MVP Definition",
          summary:
            "One repository, one team. Success is a new hire finding the right owner without asking in Slack. No generated prose in the MVP.",
        },
        {
          name: "User Journey",
          summary:
            "A new hire opens an unfamiliar module, sees its dependents, its owner, and its recent change history \u2014 and gets unblocked without interrupting a senior engineer.",
        },
        {
          name: "Metrics Plan",
          summary:
            "Leading: time to first meaningful commit. Lagging: senior-engineer interrupt rate. Guardrail: doc-trust \u2014 if accuracy slips, adoption is forfeit. Tracks the Evaluator\u2019s flag directly.",
        },
      ],
      closing:
        "Build-ready, and visibly reshaped by the run \u2014 both Evaluator flags are carried into the strategy and the metrics, not left behind.",
    },
  },

  /* ---- C — weak: the Evaluator stops it cold ---- */
  {
    id: "focusapp",
    mark: "C",
    chip: "A focus app that blocks distracting sites",
    prompt:
      "An app that helps people stay productive by blocking distracting websites and tracking how much focused time they get each day.",
    evaluator: {
      verdictKind: "stopped",
      verdict: "Stopped. The idea did not survive the stress-test.",
      dimensions: [
        {
          name: "Problem acuity",
          status: "held",
          note: "The pain is real, but shallow \u2014 mild, recurring, easy to tolerate. Most people want focus; few will reorganize their tools to get it.",
        },
        {
          name: "Audience clarity",
          status: "failed",
          note: "There is no specific buyer. \u2018People who want to focus\u2019 is everyone, which is no one. Pressed repeatedly for an ICP that holds \u2014 none did.",
        },
        {
          name: "Wedge & defensibility",
          status: "failed",
          note: "Site-blocking is a commodity. It ships free inside browsers, operating systems, and a dozen existing apps. There is no wedge here \u2014 only a feature already given away.",
        },
        {
          name: "Timing",
          status: "held",
          note: "Nothing about this moment makes the idea newly possible. No tailwind, no shift to ride.",
        },
        {
          name: "Feasibility",
          status: "held",
          note: "Trivially buildable \u2014 which is the problem. Easy to build is easy to copy.",
        },
        {
          name: "Willingness to pay",
          status: "failed",
          note: "The category has a long, documented history of buy-then-abandon. The product is sold against the user\u2019s own discipline, and discipline is not something software reliably sells.",
        },
      ],
      closing:
        "Tried hard to find the narrow version worth building \u2014 one specific user, one specific moment, one real wedge. None held. This is a feature inside other products, not a product of its own. Stopped here rather than spend research on it. If the idea sharpens \u2014 a named audience, a genuine wedge \u2014 it can be resubmitted; this assessment is kept on file for that.",
    },
    researcher: {
      ran: false,
      skippedNote:
        "Did not run. Research runs only on ideas that clear the Evaluator\u2019s stress-test \u2014 and this one did not.",
    },
    artifact: {
      ran: false,
      skippedNote:
        "Did not run. There is no grounded idea to turn into a brief.",
    },
  },
];

/* ============================================================
   STYLE BLOCK
   ------------------------------------------------------------
   All styling lives here, namespaced under `.kiln-demo`.
   Every value is driven by a CSS variable defined on `.kiln-demo`
   below. To re-skin: override these variables from your own
   design system. Nothing else needs to change.

   The @import loads the demo's default fonts. If your /kiln page
   already loads Cormorant Garamond / DM Sans / Source Serif 4,
   delete the @import line and the variable fallbacks will defer
   to whatever your page provides.
   ============================================================ */

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,500&family=DM+Sans:opsz,wght@9..40,400;9..40,500&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;1,8..60,400&display=swap');

.kiln-demo {
  /* ---- colour ---- */
  --kiln-bg: #faf8f3;
  --kiln-surface: #ffffff;
  --kiln-ink: #211f1a;
  --kiln-ink-soft: #5e594f;
  --kiln-ink-faint: #9a9285;
  --kiln-line: #e8e3d7;
  --kiln-line-strong: #d6cfbf;
  --kiln-accent: #bd6a38;
  --kiln-accent-deep: #a4592c;
  --kiln-accent-wash: #f4e9df;
  --kiln-held: #5c6a54;
  --kiln-held-wash: #ebeee7;
  --kiln-flag: #a9762a;
  --kiln-flag-wash: #f3ead4;
  --kiln-fail: #9c4a33;
  --kiln-fail-wash: #f1e1da;

  /* ---- type ---- */
  --kiln-font-display: 'Cormorant Garamond', 'Hoefler Text', Georgia, serif;
  --kiln-font-serif: 'Source Serif 4', Georgia, 'Times New Roman', serif;
  --kiln-font-sans: 'DM Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;

  /* ---- form ---- */
  --kiln-radius: 2px;
  --kiln-bar-radius: 10px;
  --kiln-maxw: 880px;
  --kiln-spine: 58px;

  background: var(--kiln-bg);
  color: var(--kiln-ink);
  font-family: var(--kiln-font-sans);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  padding: 3rem 1.5rem 3.25rem;
}
.kiln-demo *, .kiln-demo *::before, .kiln-demo *::after { box-sizing: border-box; }

.kiln-demo__inner {
  width: 90%;
  max-width: none;
  margin: 0 auto;
}

/* ---- idea picker: thread-style card + build outside (like ProjectThread) ---- */
.kiln-picker {
  width: 95%;
  margin: 0 auto 2.25rem;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: 0.65rem;
}
.kiln-ideas {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow: hidden;
}
.kiln-idea-node {
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  display: block;
  margin: 0;
  padding: 0;
  border: 1px solid var(--kiln-line-strong);
  border-radius: var(--kiln-bar-radius);
  background: color-mix(in srgb, var(--kiln-line) 40%, var(--kiln-surface));
  color: inherit;
  text-align: inherit;
  cursor: pointer;
  min-height: 3.25rem;
  transition: flex-grow 450ms cubic-bezier(0.22, 1, 0.36, 1),
    background-color 200ms ease, border-color 200ms ease;
}
.kiln-idea-node[data-state="open"],
.kiln-idea-node--current {
  background: var(--kiln-surface);
  border-color: var(--kiln-line-strong);
  box-shadow:
    0 1px 0 color-mix(in srgb, var(--kiln-ink) 4%, transparent),
    0 1px 3px color-mix(in srgb, var(--kiln-ink) 6%, transparent);
}
.kiln-idea-node:disabled {
  cursor: default;
  opacity: 0.55;
}
.kiln-idea-node:hover:not(:disabled):not(.kiln-idea-node--current) {
  border-color: var(--kiln-accent);
  background: color-mix(in srgb, var(--kiln-surface) 85%, var(--kiln-accent-wash));
}
.kiln-idea-spine {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 3.25rem;
  font-family: var(--kiln-font-display);
  font-size: 1.15rem;
  font-style: italic;
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.02em;
  color: var(--kiln-ink-faint);
}
.kiln-idea-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0.2rem;
  padding: 0.65rem 0.85rem;
  min-height: 0;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
}
.kiln-idea-mark {
  font-family: var(--kiln-font-sans);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--kiln-accent-deep);
  line-height: 1;
}
.kiln-idea-name {
  font-family: var(--kiln-font-display);
  font-weight: 500;
  font-size: clamp(0.92rem, 1.4vw, 1.05rem);
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--kiln-ink);
  max-width: 100%;
}
.kiln-idea-blurb {
  margin: 0;
  max-width: min(100%, 42rem);
  font-family: var(--kiln-font-sans);
  font-size: 0.76rem;
  line-height: 1.4;
  letter-spacing: -0.01em;
  color: var(--kiln-ink-faint);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.kiln-bar__build {
  flex: none;
  align-self: stretch;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 5.25rem;
  margin: 0;
  padding: 0 1.15rem;
  font-family: var(--kiln-font-sans);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--kiln-bg);
  background: var(--kiln-accent);
  border: none;
  border-radius: var(--kiln-bar-radius);
  cursor: pointer;
  transition: background-color 160ms ease, opacity 160ms ease, transform 160ms ease;
}
.kiln-bar__build:hover:not(:disabled) {
  background: var(--kiln-accent-deep);
}
.kiln-bar__build:active:not(:disabled) {
  transform: scale(0.98);
}
.kiln-bar__build:disabled {
  cursor: default;
  color: var(--kiln-ink-faint);
  background: color-mix(in srgb, var(--kiln-line) 70%, var(--kiln-surface));
  opacity: 1;
}
@media (min-width: 1024px) {
  .kiln-ideas {
    flex-direction: row;
    align-items: stretch;
    height: 7.5rem;
    gap: 0;
    border: 1px solid var(--kiln-line-strong);
    border-radius: var(--kiln-bar-radius);
    background: var(--kiln-surface);
    box-shadow:
      0 1px 0 color-mix(in srgb, var(--kiln-ink) 4%, transparent),
      0 1px 3px color-mix(in srgb, var(--kiln-ink) 6%, transparent);
  }
  .kiln-idea-node {
    flex: 1 1 0;
    flex-grow: 1;
    min-width: 0;
    min-height: 0;
    border: none;
    border-radius: 0;
    border-right: 1px solid var(--kiln-line);
    box-shadow: none;
    background: color-mix(in srgb, var(--kiln-line) 45%, var(--kiln-surface));
  }
  .kiln-idea-node:last-child {
    border-right: none;
  }
  .kiln-idea-node[data-state="open"] {
    flex-grow: 18;
    background: var(--kiln-surface);
  }
  .kiln-idea-node[data-state="closed"] .kiln-idea-panel {
    display: none;
  }
  .kiln-idea-node[data-state="open"] .kiln-idea-spine {
    display: none;
  }
  .kiln-idea-node[data-state="closed"] .kiln-idea-spine {
    display: flex;
    min-height: 0;
  }
  .kiln-idea-node[data-state="open"] .kiln-idea-panel {
    display: flex;
  }
}

/* ---- rail ---- */
.kiln-rail { display: flex; flex-direction: column; }
.kiln-row {
  display: grid;
  grid-template-columns: var(--kiln-spine) 1fr;
  column-gap: 1.1rem;
}

/* spine */
.kiln-spine { display: flex; flex-direction: column; align-items: center; padding-top: 0.3rem; }
.kiln-spine__num {
  font-family: var(--kiln-font-display); font-size: 0.92rem;
  color: var(--kiln-ink-faint); line-height: 1; margin-bottom: 0.5rem;
}
.kiln-node {
  width: 14px; height: 14px; border-radius: 50%;
  border: 1.5px solid var(--kiln-line-strong); background: var(--kiln-surface);
  flex: none; position: relative;
  transition: border-color 220ms ease, background-color 220ms ease;
}
.kiln-node--processing { border-color: var(--kiln-accent); background: var(--kiln-accent); }
.kiln-node--done-built { border-color: var(--kiln-ink); background: var(--kiln-ink); }
.kiln-node--done-designed { border-style: dashed; border-color: var(--kiln-accent); background: var(--kiln-surface); }
.kiln-node--skipped { border-color: var(--kiln-line-strong); background: var(--kiln-surface); }
.kiln-node__dash {
  position: absolute; top: 50%; left: 50%;
  width: 6px; height: 1.5px; background: var(--kiln-ink-faint);
  transform: translate(-50%, -50%);
}
.kiln-line {
  width: 1.5px; flex: 1; min-height: 30px;
  background: var(--kiln-line); margin-top: 0.35rem;
  transition: background-color 240ms ease;
}
.kiln-line--lit { background: var(--kiln-ink); }

/* phase content */
.kiln-phase { padding-bottom: 2.1rem; }
.kiln-row:last-child .kiln-phase { padding-bottom: 0; }
.kiln-phase__head { display: flex; flex-wrap: wrap; align-items: baseline; gap: 0.55rem 0.7rem; }
.kiln-phase__name {
  font-family: var(--kiln-font-display); font-weight: 500;
  font-size: 1.5rem; line-height: 1; color: var(--kiln-ink); margin: 0;
}
.kiln-phase__tag {
  font-family: var(--kiln-font-sans); font-size: 0.6rem; font-weight: 500;
  letter-spacing: 0.13em; text-transform: uppercase;
  padding: 0.18rem 0.42rem; border-radius: var(--kiln-radius);
}
.kiln-phase__tag--built { color: var(--kiln-ink-faint); border: 1px solid var(--kiln-line-strong); }
.kiln-phase__tag--designed { color: var(--kiln-accent-deep); border: 1px dashed var(--kiln-accent); }
.kiln-phase__body { margin-top: 0.95rem; }

/* processing strip */
.kiln-processing {
  display: flex; align-items: center; gap: 0.6rem;
  font-family: var(--kiln-font-serif); font-style: italic; font-size: 0.95rem;
  color: var(--kiln-ink-soft);
}
.kiln-pulse {
  width: 7px; height: 7px; background: var(--kiln-accent); flex: none;
  animation: kilnPulse 1100ms ease-in-out infinite;
}

/* output card + accordion */
.kiln-card {
  background: var(--kiln-surface);
  border: 1px solid var(--kiln-line);
  border-radius: var(--kiln-radius);
  padding: 1.3rem 1.4rem;
  box-shadow: 0 1px 2px rgba(33, 31, 26, 0.035);
  animation: kilnReveal 460ms ease both;
}
.kiln-card__summary {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.85rem;
  width: 100%;
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  color: inherit;
  text-align: left;
  cursor: pointer;
  font: inherit;
}
.kiln-card__summary:hover .kiln-card__chevron {
  border-color: var(--kiln-ink-soft);
}
.kiln-card__summary-main {
  flex: 1 1 auto;
  min-width: 0;
}
.kiln-card__chevron {
  flex: none;
  width: 0.45rem;
  height: 0.45rem;
  margin-top: 0.4rem;
  border-right: 1.5px solid var(--kiln-ink-faint);
  border-bottom: 1.5px solid var(--kiln-ink-faint);
  transform: rotate(45deg);
  transition: transform 220ms ease, border-color 200ms ease;
}
.kiln-card--open .kiln-card__chevron {
  transform: rotate(-135deg);
  margin-top: 0.55rem;
}
.kiln-card__details {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 450ms cubic-bezier(0.22, 1, 0.36, 1);
}
.kiln-card--open .kiln-card__details {
  grid-template-rows: 1fr;
}
.kiln-card__details-inner {
  overflow: hidden;
  min-height: 0;
}
.kiln-card--open .kiln-card__details-inner {
  padding-top: 1rem;
}
.kiln-card__summary-main .kiln-verdict,
.kiln-card__summary-main .kiln-finding__body,
.kiln-card__summary-main .kiln-card__line {
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.kiln-card__summary-main .kiln-verdict {
  font-size: clamp(1.05rem, 2vw, 1.35rem);
}
.kiln-kicker {
  font-family: var(--kiln-font-sans); font-size: 0.66rem; font-weight: 500;
  letter-spacing: 0.17em; text-transform: uppercase; color: var(--kiln-ink-faint);
}
.kiln-card__kicker { display: block; margin-bottom: 0.5rem; }

/* evaluator */
.kiln-verdict {
  font-family: var(--kiln-font-display); font-weight: 500;
  font-size: 1.42rem; line-height: 1.25; margin: 0 0 1.05rem;
}
.kiln-verdict--pass { color: var(--kiln-held); }
.kiln-verdict--pass-flags { color: var(--kiln-flag); }
.kiln-verdict--stopped { color: var(--kiln-fail); }

.kiln-dims { display: flex; flex-direction: column; gap: 0.85rem; }
.kiln-dim { display: flex; flex-wrap: wrap; gap: 0.45rem 0.7rem; }
.kiln-pill {
  font-family: var(--kiln-font-sans); font-size: 0.6rem; font-weight: 500;
  letter-spacing: 0.12em; text-transform: uppercase;
  padding: 0.2rem 0.46rem; border-radius: var(--kiln-radius);
  height: fit-content; flex: none; white-space: nowrap;
}
.kiln-pill--held { color: var(--kiln-held); background: var(--kiln-held-wash); border: 1px solid var(--kiln-held); }
.kiln-pill--flagged { color: var(--kiln-flag); background: var(--kiln-flag-wash); border: 1px solid var(--kiln-flag); }
.kiln-pill--failed { color: var(--kiln-fail); background: var(--kiln-fail-wash); border: 1px solid var(--kiln-fail); }
.kiln-dim__text { flex: 1; min-width: 14rem; }
.kiln-dim__name {
  font-family: var(--kiln-font-sans); font-size: 0.7rem; font-weight: 500;
  letter-spacing: 0.09em; text-transform: uppercase; color: var(--kiln-ink-faint);
  margin: 0 0 0.18rem;
}
.kiln-dim__note {
  font-family: var(--kiln-font-serif); font-size: 0.93rem; line-height: 1.5;
  color: var(--kiln-ink); margin: 0;
}

.kiln-closing {
  font-family: var(--kiln-font-serif); font-style: italic; font-size: 0.92rem;
  line-height: 1.55; color: var(--kiln-ink-soft);
  margin: 1.1rem 0 0; padding-top: 1rem;
  border-top: 1px solid var(--kiln-line);
}

/* researcher */
.kiln-findings { display: flex; flex-direction: column; gap: 0.85rem; }
.kiln-finding__label {
  font-family: var(--kiln-font-sans); font-size: 0.66rem; font-weight: 500;
  letter-spacing: 0.13em; text-transform: uppercase; color: var(--kiln-ink-faint);
  margin: 0 0 0.2rem;
}
.kiln-finding__body {
  font-family: var(--kiln-font-serif); font-size: 0.93rem; line-height: 1.5;
  color: var(--kiln-ink); margin: 0;
}
.kiln-pushback {
  border-left: 2px solid var(--kiln-accent);
  background: var(--kiln-accent-wash);
  padding: 0.75rem 0.9rem; margin: 1rem 0 0;
  border-radius: 0 var(--kiln-radius) var(--kiln-radius) 0;
}
.kiln-pushback__label {
  font-family: var(--kiln-font-sans); font-size: 0.63rem; font-weight: 500;
  letter-spacing: 0.13em; text-transform: uppercase; color: var(--kiln-accent-deep);
  margin: 0 0 0.32rem;
}
.kiln-pushback__body {
  font-family: var(--kiln-font-serif); font-size: 0.93rem; line-height: 1.52;
  color: var(--kiln-ink); margin: 0;
}
.kiln-research-foot {
  font-family: var(--kiln-font-sans); font-size: 0.74rem; line-height: 1.5;
  color: var(--kiln-ink-faint); margin: 1rem 0 0;
  padding-top: 0.9rem; border-top: 1px solid var(--kiln-line);
}
.kiln-research-foot strong { color: var(--kiln-ink-soft); font-weight: 500; }

/* artifact */
.kiln-card__line {
  font-family: var(--kiln-font-serif); font-size: 0.93rem; color: var(--kiln-ink-soft);
  margin: 0 0 0.55rem;
}
.kiln-docs { display: flex; flex-direction: column; }
.kiln-doc { padding: 0.8rem 0; border-top: 1px solid var(--kiln-line); }
.kiln-doc:first-child { border-top: 0; padding-top: 0.2rem; }
.kiln-doc:last-child { padding-bottom: 0.1rem; }
.kiln-doc__name {
  font-family: var(--kiln-font-display); font-weight: 600; font-size: 1.1rem;
  color: var(--kiln-ink); margin: 0 0 0.18rem;
}
.kiln-doc__summary {
  font-family: var(--kiln-font-serif); font-size: 0.91rem; line-height: 1.5;
  color: var(--kiln-ink-soft); margin: 0;
}

/* designed panel — visually distinct from output cards */
.kiln-designed {
  border: 1.5px dashed var(--kiln-line-strong);
  border-radius: var(--kiln-radius);
  background: transparent;
  padding: 1.1rem 1.25rem;
  animation: kilnReveal 460ms ease both;
}
.kiln-designed__tag {
  display: inline-block;
  font-family: var(--kiln-font-sans); font-size: 0.63rem; font-weight: 500;
  letter-spacing: 0.14em; text-transform: uppercase; color: var(--kiln-ink-faint);
  margin: 0 0 0.5rem;
}
.kiln-designed__body {
  font-family: var(--kiln-font-serif); font-size: 0.93rem; line-height: 1.55;
  color: var(--kiln-ink-soft); margin: 0;
}

/* did-not-run card */
.kiln-skipped-card {
  border: 1px solid var(--kiln-line);
  border-radius: var(--kiln-radius);
  background: transparent;
  padding: 0.85rem 1rem;
  animation: kilnReveal 460ms ease both;
}
.kiln-skipped-card__tag {
  display: inline-block;
  font-family: var(--kiln-font-sans); font-size: 0.63rem; font-weight: 500;
  letter-spacing: 0.14em; text-transform: uppercase; color: var(--kiln-ink-faint);
  margin: 0 0 0.35rem;
}
.kiln-skipped-card__body {
  font-family: var(--kiln-font-serif); font-style: italic; font-size: 0.9rem;
  line-height: 1.5; color: var(--kiln-ink-faint); margin: 0;
}

/* ---- motion ---- */
@keyframes kilnPulse {
  0%, 100% { opacity: 0.32; transform: scale(0.82); }
  50% { opacity: 1; transform: scale(1); }
}
@keyframes kilnGlow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(189, 106, 56, 0); }
  50% { box-shadow: 0 0 0 5px rgba(189, 106, 56, 0.14); }
}
@keyframes kilnReveal {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
.kiln-node--processing { animation: kilnGlow 1100ms ease-in-out infinite; }

@media (prefers-reduced-motion: reduce) {
  .kiln-card, .kiln-designed, .kiln-skipped-card { animation: none; }
  .kiln-card__details { transition-duration: 0s !important; }
  .kiln-card__chevron { transition-duration: 0s !important; }
  .kiln-node--processing { animation: none; }
  .kiln-pulse { animation: none; opacity: 1; }
  .kiln-idea-node, .kiln-bar__build {
    transition-duration: 0s !important;
  }
  .kiln-bar__build:active:not(:disabled) {
    transform: none;
  }
}

/* ---- narrow widths ---- */
@media (max-width: 1023px) {
  .kiln-idea-node[data-state="closed"] {
    max-height: 3.25rem;
  }
  .kiln-idea-node[data-state="closed"] .kiln-idea-panel {
    display: none;
  }
  .kiln-idea-node[data-state="open"] {
    max-height: none;
  }
  .kiln-idea-node[data-state="open"] .kiln-idea-spine {
    display: none;
  }
  .kiln-idea-node[data-state="open"] .kiln-idea-panel {
    display: flex;
    padding: 0.75rem 1rem 0.85rem;
  }
}

@media (max-width: 540px) {
  .kiln-demo { padding: 2.25rem 1.1rem; }
  .kiln-row { column-gap: 0.8rem; }
  .kiln-demo { --kiln-spine: 44px; }
  .kiln-phase__name { font-size: 1.3rem; }
  .kiln-picker {
    flex-direction: column;
    gap: 0.5rem;
  }
  .kiln-bar__build {
    width: 100%;
    min-height: 2.75rem;
  }
}
`;

/* ============================================================
   SUB-COMPONENTS
   ============================================================ */

function ProcessingStrip({ verb }: { verb: string }) {
  return (
    <div className="kiln-processing" role="status">
      <span className="kiln-pulse" aria-hidden="true" />
      <span>{verb}…</span>
    </div>
  );
}

function KilnCardAccordion({
  summary,
  children,
  defaultOpen = false,
}: {
  summary: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className={
        "kiln-card" + (open ? " kiln-card--open" : " kiln-card--closed")
      }
    >
      <button
        type="button"
        className="kiln-card__summary"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="kiln-card__summary-main">{summary}</span>
        <span className="kiln-card__chevron" aria-hidden="true" />
      </button>
      <div className="kiln-card__details">
        <div className="kiln-card__details-inner">{children}</div>
      </div>
    </div>
  );
}

function EvaluatorCard({ data }: { data: EvaluatorOutput }) {
  return (
    <KilnCardAccordion
      summary={
        <p className={`kiln-verdict kiln-verdict--${data.verdictKind}`}>
          {data.verdict}
        </p>
      }
    >
      <span className="kiln-kicker kiln-card__kicker">Evaluator · Verdict</span>
      <p className={`kiln-verdict kiln-verdict--${data.verdictKind}`}>
        {data.verdict}
      </p>
      <div className="kiln-dims">
        {data.dimensions.map((d) => (
          <div className="kiln-dim" key={d.name}>
            <span className={`kiln-pill kiln-pill--${d.status}`}>
              {d.status}
            </span>
            <div className="kiln-dim__text">
              <p className="kiln-dim__name">{d.name}</p>
              <p className="kiln-dim__note">{d.note}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="kiln-closing">{data.closing}</p>
    </KilnCardAccordion>
  );
}

function ResearcherCard({ data }: { data: ResearcherOutput }) {
  const foot = (
    <>
      <strong>Confidence.</strong> {data.confidence}
      <br />
      {data.sources}
    </>
  );

  const leadFinding = data.findings?.[0]?.body;

  return (
    <KilnCardAccordion
      summary={
        leadFinding ? (
          <p className="kiln-finding__body">{leadFinding}</p>
        ) : null
      }
    >
      <span className="kiln-kicker kiln-card__kicker">
        Researcher · Findings
      </span>
      <div className="kiln-findings">
        {data.findings?.map((f) => (
          <div key={f.label}>
            <p className="kiln-finding__label">{f.label}</p>
            <p className="kiln-finding__body">{f.body}</p>
          </div>
        ))}
      </div>
      <div className="kiln-pushback">
        <p className="kiln-pushback__label">Where the evidence pushed back</p>
        <p className="kiln-pushback__body">{data.pushback}</p>
      </div>
      <p className="kiln-research-foot">{foot}</p>
    </KilnCardAccordion>
  );
}

const ARTIFACT_LINE = "Six working documents.";

function ArtifactCard({ data }: { data: ArtifactOutput }) {
  return (
    <KilnCardAccordion
      summary={<p className="kiln-card__line">{ARTIFACT_LINE}</p>}
    >
      <span className="kiln-kicker kiln-card__kicker">
        Artifact Creator · The Brief
      </span>
      <p className="kiln-card__line">{ARTIFACT_LINE}</p>
      <div className="kiln-docs">
        {data.docs?.map((doc) => (
          <div className="kiln-doc" key={doc.name}>
            <p className="kiln-doc__name">{doc.name}</p>
            <p className="kiln-doc__summary">{doc.summary}</p>
          </div>
        ))}
      </div>
      {data.closing ? <p className="kiln-closing">{data.closing}</p> : null}
    </KilnCardAccordion>
  );
}

function DesignedPanel({ phase }: { phase: "builder" | "deployer" }) {
  return (
    <div className="kiln-designed">
      <span className="kiln-designed__tag">Designed — not yet built</span>
      <p className="kiln-designed__body">{DESIGNED_BODY[phase]}</p>
    </div>
  );
}

function SkippedCard({ note }: { note: string }) {
  return (
    <div className="kiln-skipped-card">
      <span className="kiln-skipped-card__tag">Did not run</span>
      <p className="kiln-skipped-card__body">{note}</p>
    </div>
  );
}

/* ============================================================
   MAIN COMPONENT
   ============================================================ */

const idleStatus = (): Record<PhaseId, Status> => ({
  evaluator: "idle",
  researcher: "idle",
  artifact: "idle",
  builder: "idle",
  deployer: "idle",
});

/* phase timing (ms) */
const EVAL_MS = 1400;
const RESEARCH_MS = 1500;
const ARTIFACT_MS = 1500;
const STEP_GAP = 280;
const REVEAL_GAP = 480;

export default function KilnRunDemo() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [runState, setRunState] = useState<"idle" | "running" | "done">("idle");
  const [status, setStatus] = useState<Record<PhaseId, Status>>(idleStatus);
  const timers = useRef<number[]>([]);

  const selected = IDEAS.find((i) => i.id === selectedId) ?? null;

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  const setPhase = (id: PhaseId, s: Status) =>
    setStatus((prev) => ({ ...prev, [id]: s }));

  const pickIdea = (id: string) => {
    if (runState === "running") return;
    clearTimers();
    setStatus(idleStatus());
    setRunState("idle");
    setSelectedId((current) => (current === id ? null : id));
  };

  const run = () => {
    if (!selected || runState === "running") return;
    clearTimers();
    setStatus(idleStatus());
    setRunState("running");

    const stopped = selected.evaluator.verdictKind === "stopped";
    let elapsed = 0;
    const at = (delay: number, fn: () => void) => {
      elapsed += delay;
      timers.current.push(window.setTimeout(fn, elapsed));
    };

    at(140, () => setPhase("evaluator", "processing"));
    at(EVAL_MS, () => setPhase("evaluator", "done"));

    if (stopped) {
      at(STEP_GAP, () => setPhase("researcher", "skipped"));
      at(REVEAL_GAP, () => setPhase("artifact", "skipped"));
      at(REVEAL_GAP, () => setPhase("builder", "done"));
      at(REVEAL_GAP, () => setPhase("deployer", "done"));
      at(STEP_GAP, () => setRunState("done"));
    } else {
      at(STEP_GAP, () => setPhase("researcher", "processing"));
      at(RESEARCH_MS, () => setPhase("researcher", "done"));
      at(STEP_GAP, () => setPhase("artifact", "processing"));
      at(ARTIFACT_MS, () => setPhase("artifact", "done"));
      at(REVEAL_GAP, () => setPhase("builder", "done"));
      at(REVEAL_GAP, () => setPhase("deployer", "done"));
      at(STEP_GAP, () => setRunState("done"));
    }
  };

  const runLabel =
    runState === "running"
      ? "Building…"
      : runState === "done"
        ? "Build again"
        : "Build";

  /* connector is lit once the run has reached past that phase */
  const lineLit = (s: Status) => s === "done" || s === "skipped";

  const nodeClass = (phase: PhaseMeta, s: Status) => {
    if (s === "processing") return "kiln-node kiln-node--processing";
    if (s === "skipped") return "kiln-node kiln-node--skipped";
    if (s === "done")
      return phase.kind === "designed"
        ? "kiln-node kiln-node--done-designed"
        : "kiln-node kiln-node--done-built";
    return "kiln-node";
  };

  const renderBody = (phase: PhaseMeta) => {
    const s = status[phase.id];
    if (!selected) return null;
    if (s === "idle") return null;
    if (s === "processing")
      return <ProcessingStrip verb={phase.verb ?? "Working"} />;

    /* s is "done" or "skipped" */
    if (phase.id === "evaluator")
      return <EvaluatorCard data={selected.evaluator} />;
    if (phase.id === "researcher")
      return selected.researcher.ran ? (
        <ResearcherCard data={selected.researcher} />
      ) : (
        <SkippedCard note={selected.researcher.skippedNote ?? ""} />
      );
    if (phase.id === "artifact")
      return selected.artifact.ran ? (
        <ArtifactCard data={selected.artifact} />
      ) : (
        <SkippedCard note={selected.artifact.skippedNote ?? ""} />
      );
    return <DesignedPanel phase={phase.id as "builder" | "deployer"} />;
  };

  return (
    <div className="kiln-demo">
      <style>{STYLES}</style>

      <div className="kiln-picker">
        <div
          className="kiln-ideas"
          role="group"
          aria-label="Example ideas"
          aria-live="polite"
        >
          {IDEAS.map((idea) => {
            const isOn = idea.id === selectedId;
            const state = isOn ? "open" : "closed";
            return (
              <button
                key={idea.id}
                type="button"
                className={
                  "kiln-idea-node" + (isOn ? " kiln-idea-node--current" : "")
                }
                data-state={state}
                aria-pressed={isOn}
                aria-label={`Idea ${idea.mark}: ${idea.chip}`}
                disabled={runState === "running"}
                onClick={() => pickIdea(idea.id)}
              >
                <span className="kiln-idea-spine" aria-hidden={isOn}>
                  {idea.mark}
                </span>
                <div className="kiln-idea-panel">
                  <span className="kiln-idea-mark">{idea.mark}</span>
                  <div className="kiln-idea-name">{idea.chip}</div>
                  <p className="kiln-idea-blurb">{idea.prompt}</p>
                </div>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className="kiln-bar__build"
          disabled={!selected || runState === "running"}
          onClick={run}
        >
          {runLabel}
        </button>
      </div>

      <div className="kiln-demo__inner">
        {/* phase rail */}
        <div className="kiln-rail">
          {PHASES.map((phase, i) => {
            const s = status[phase.id];
            const isLast = i === PHASES.length - 1;
            const body = renderBody(phase);
            return (
              <div className="kiln-row" key={phase.id}>
                <div className="kiln-spine" aria-hidden="true">
                  <span className="kiln-spine__num">{phase.index}</span>
                  <span className={nodeClass(phase, s)}>
                    {s === "skipped" && <span className="kiln-node__dash" />}
                  </span>
                  {!isLast && (
                    <span
                      className={
                        "kiln-line" + (lineLit(s) ? " kiln-line--lit" : "")
                      }
                    />
                  )}
                </div>

                <div className="kiln-phase">
                  <div className="kiln-phase__head">
                    <h3 className="kiln-phase__name">{phase.name}</h3>
                    <span
                      className={
                        "kiln-phase__tag kiln-phase__tag--" +
                        (phase.kind === "designed" ? "designed" : "built")
                      }
                    >
                      {phase.tag}
                    </span>
                  </div>
                  {body ? <div className="kiln-phase__body">{body}</div> : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
