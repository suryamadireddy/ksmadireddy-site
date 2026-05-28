import type { Metadata } from "next";
import {
  CaseStudySpecAccordion,
  type SpecTile,
} from "@/app/components/project/CaseStudySpecAccordion";
import { CaseStudyImage } from "@/app/components/project/CaseStudyImage";
import {
  CaseStudyProse,
  CaseStudySection,
} from "@/app/components/project/ProjectCaseStudy";

export const metadata: Metadata = {
  title: "Atlas — Spec | Krishna Surya Madireddy",
  description:
    "The working spec for Atlas, a queryable atlas of how the world works. Forked from Meridian Seven.",
};

const INTRO = [
  "Atlas isn't built yet. What follows is the working spec: the document I'd hand a team on day one. It's posted because the thinking behind a product is its own kind of artifact, and because the path that led here, from Globetrotter to Meridian to Atlas, is worth following in full.",
  "Atlas is a queryable interface of how the world works. A spatial-knowledge interface where curious people can land on a globe and explore using natural language (“show me cobalt mines,” “show me the Silk Road in 200 CE,” “show me species ranges in Borneo”) and get beautiful, accurate, on-globe visualizations with concise sourced context.",
  "Atlas is forked from Meridian, which remains the news-visualization product. Atlas inherits Meridian’s technical patterns but has its own codebase, identity, and content. News is not a layer in Atlas — that’s Meridian’s job.",
  "Mental model: Google Earth used like Google. A beautiful globe; a query bar that turns natural language into the right visualization, layered over real data.",
];

const PURPOSE = [
  "Atlas exists because the most interesting questions about the world are spatial — where things are, how they’re distributed, what they look like over time — and the answers are scattered across PDFs, datasets, and Wikipedia articles that lose their geography the moment you read them.",
  "The product is held to five non-negotiables: the AI never invents geographic data, every exhibit names its source, taste beats feature density, curiosity leads (not duty), and the globe earns its place on every screen. If something doesn’t benefit from being spatial, it doesn’t go on the globe.",
  "The design language is restraint borrowed from the best museums — confident typography, deliberate white space, and the curator’s voice. One thing on screen at a time, presented well, beats five things competing for attention.",
];

const CONSIDERATIONS = [
  "News is deliberately excluded — that’s Meridian’s domain. Atlas is evergreen by design; mixing the two would dilute both. The fork is a pattern, not a git branch: new repo, new design system, new everything. Meridian stays untouched as its own artifact.",
  "v1 ships with two layers, not five. The out-of-scope list — real-time data, historical animation, accounts, 3D models, monetization — is a contract, not a wishlist. Two well-curated layers beat fifteen sparse ones; restraint is the design language.",
  "The build order is fixed. The layer interface gets designed and reviewed before any layer is written; the minerals layer ships end-to-end before the historical layer begins. Prove the abstraction works on one layer before scaling it to two.",
];

const CONCLUSIONS = [
  "I built Meridian to test an idea about news. The idea held. The framing didn't. A few weeks of reading my own product made it obvious that I cared more about the globe than the headlines.",
  "Atlas is what I'd ship if I started over. Same spatial-knowledge engine, different framing: evergreen instead of daily, queryable instead of curated, atlas instead of feed. Meridian is the artifact that taught me what to build next.",
  "This page is the working spec, not a pitch deck. If a part of it is wrong, I’d rather find out now than after I’ve built it.",
];

const SPEC_TILES: SpecTile[] = [
  {
    id: "inheritance",
    label: "Inheritance",
    title: "What’s inherited from Meridian (as patterns, not code)",
    body: (
      <>
        <p>Borrow the patterns, re-implement in the new codebase:</p>
        <ul>
          <li>Globe rendering via globe.gl</li>
          <li>Pin-based UI with tap-to-expand exhibit panel</li>
          <li>Supabase Postgres + RLS for persistence</li>
          <li>Claude API for content synthesis</li>
          <li>Admin endpoints for data refresh, protected by secret header</li>
          <li>Neutral, wire-service tone for exhibit copy</li>
        </ul>
        <p>
          Fork pattern, not git branch. New repo, new design system, new
          everything — Meridian stays untouched as its own artifact.
        </p>
      </>
    ),
  },
  {
    id: "invariants",
    label: "Invariants",
    title: "Core invariants — never violated",
    body: (
      <ol>
        <li>
          <strong>The AI never invents geographic data.</strong> It routes
          natural-language queries into operations on real, sourced layers. No
          hallucinated maps. If no layer fits, refuse cleanly with a hint at
          what’s available.
        </li>
        <li>
          <strong>Neutral, sourced exhibit copy.</strong> Borrow Meridian’s
          wire-service tone. Every exhibit names its source. Editorial restraint
          is the standard.
        </li>
        <li>
          <strong>Taste over feature density.</strong> Two well-curated layers
          beat fifteen sparse ones. Restraint is the design language.
        </li>
        <li>
          <strong>Curiosity-led, not duty-led.</strong> No notifications, no
          streaks, no “stay informed” framing. The user wanders by choice.
        </li>
        <li>
          <strong>The globe earns its place on every screen.</strong> If
          something doesn’t benefit from being spatial, it doesn’t go on the
          globe.
        </li>
      </ol>
    ),
  },
  {
    id: "v1-scope",
    label: "v1",
    title: "v1",
    body: (
      <ul>
        <li>
          A new Next.js + TypeScript project, new domain (atlas.app,
          useatlas.com, atlasglobe.com — whatever’s available and short)
        </li>
        <li>globe.gl-based globe</li>
        <li>Discover view as the landing experience</li>
        <li>A natural-language query bar prominently placed</li>
        <li>A layer registry (new module)</li>
        <li>
          Two initial layers: minerals (USGS) and one historical layer
          (empires or trade routes — pick whichever has cleaner data)
        </li>
        <li>Claude-based query routing endpoint</li>
        <li>Tap-to-expand exhibit panel, layer-aware</li>
        <li>
          Light/dark theme, restrained palette, designer-grade typography
        </li>
      </ul>
    ),
  },
  {
    id: "v2-later",
    label: "V2 or Later",
    title: "V2 or Later",
    body: (
      <ul>
        <li>News (Meridian’s domain, deliberately excluded)</li>
        <li>More than two layers in v1</li>
        <li>Real-time data (ships, planes, satellites)</li>
        <li>Historical animation (empire borders moving over time)</li>
        <li>Personalization, accounts, “for you” feed</li>
        <li>3D digital twins, on-demand 3D models</li>
        <li>Monetization</li>
      </ul>
    ),
  },
  {
    id: "discover-view",
    label: "Discover view",
    title: "Discover view (the landing experience)",
    body: (
      <>
        <p>
          When a user lands on Atlas, the globe is already populated with a
          curated cross-section rather than a single layer:
        </p>
        <ul>
          <li>
            Five to ten pins visible across both available layers,
            geographically distributed
          </li>
          <li>
            Each pin is a “teaser exhibit” the user can tap to see what an
            exhibit looks like
          </li>
          <li>
            The query bar is prominently visible at top with placeholder text
            rotating through example queries (“show me cobalt mines,” “show me
            the Roman empire at its peak,” “where are tin mines concentrated”)
          </li>
          <li>
            A small “layers” indicator shows which layers are currently active
            (with toggle)
          </li>
          <li>
            Subtle copy near the query bar: “What do you want to see?” —
            invitational, not instructional
          </li>
        </ul>
        <p>
          The discover view’s job is to make the product legible in five
          seconds. The user should understand: this is a globe; I can ask it
          things; here are examples of what I can ask; here’s what an answer
          looks like.
        </p>
      </>
    ),
  },
  {
    id: "layer-interface",
    label: "Layer interface",
    title: "Layer interface (new module)",
    body: (
      <>
        <p>Every layer implements:</p>
        <ul>
          <li>
            <strong>id</strong>: unique identifier
          </li>
          <li>
            <strong>name</strong>: human-readable label
          </li>
          <li>
            <strong>description</strong>: one sentence for the Claude query
            router
          </li>
          <li>
            <strong>querySchema</strong>: arguments the layer accepts (e.g.,
            minerals takes <code>{`{ mineral?, country? }`}</code>)
          </li>
          <li>
            <strong>fetch(args)</strong>: returns features (lat/lng + metadata)
          </li>
          <li>
            <strong>renderPin(feature)</strong>: how a pin looks on the globe
            for this layer
          </li>
          <li>
            <strong>renderExhibit(feature)</strong>: what the tap-to-expand
            panel shows for this layer
          </li>
        </ul>
        <p>
          Each layer lives in <code>/lib/layers/</code> as an independent
          module. Adding a new layer is contained — no changes to the rest of
          the codebase needed.
        </p>
      </>
    ),
  },
  {
    id: "query-routing",
    label: "Query routing",
    title: "Query routing (new endpoint)",
    body: (
      <>
        <p>
          <code>/api/query</code> accepts a natural-language string. Calls
          Claude with the full layer registry as context. Returns either:
        </p>
        <ul>
          <li>
            <code>{`{ layer, args, explanation }`}</code> — routes to the named
            layer with parsed args, plus a one-sentence note about what’s being
            shown
          </li>
          <li>
            <code>{`{ error: "no_layer_match", available_layers, suggestion }`}</code>{" "}
            — no layer fits; tell the user what’s available and suggest a
            related query that would work
          </li>
        </ul>
        <p>
          The LLM never generates geographic data itself. It chooses layers and
          parses arguments from a fixed registry. The registry is its tool list.
        </p>
      </>
    ),
  },
  {
    id: "first-milestone",
    label: "First milestone",
    title: "First milestone (build this and stop)",
    body: (
      <>
        <ol>
          <li>
            Set up the new Atlas project: fresh Next.js scaffold, new Supabase
            project, Vercel deployment, custom domain.
          </li>
          <li>Implement the globe and the layer interface.</li>
          <li>
            Build the minerals layer end-to-end: USGS data load, pin rendering,
            exhibit panel with sourced exhibit copy.
          </li>
          <li>Build the query bar component.</li>
          <li>Build the query routing endpoint.</li>
          <li>
            Wire together: typing “show me cobalt mines” routes to the minerals
            layer and re-renders the globe with mineral pins.
          </li>
        </ol>
        <p>
          If that single end-to-end loop works and feels delightful, the rest
          is repetition. Adding the historical layer afterward is the same
          shape of work.
        </p>
      </>
    ),
  },
  {
    id: "tech-stack",
    label: "Tech stack",
    title: "Tech stack",
    body: (
      <ul>
        <li>Next.js App Router + TypeScript</li>
        <li>globe.gl</li>
        <li>Supabase Postgres + RLS</li>
        <li>
          Anthropic Claude API (Opus for query routing, Sonnet for bulk
          content)
        </li>
        <li>Vercel deployment</li>
        <li>PostHog analytics</li>
        <li>No GNews API (news is Meridian’s domain)</li>
      </ul>
    ),
  },
  {
    id: "data-sources",
    label: "Data sources",
    title: "Initial data sources",
    body: (
      <>
        <ul>
          <li>
            <strong>Minerals layer:</strong> USGS Mineral Resources Data System
          </li>
          <li>
            <strong>Historical layer:</strong> pick one — Running Reality,
            GeaCron-style datasets, or a curated trade-route dataset. The one
            with cleanest, most permissive data wins.
          </li>
        </ul>
        <p>
          For each layer, build a small adapter that normalizes the source into
          the layer interface’s feature format. Cache aggressively.
        </p>
      </>
    ),
  },
  {
    id: "design-principles",
    label: "Design",
    title: "Design principles",
    body: (
      <ul>
        <li>
          One thing on screen at a time, presented well, beats five things
          competing for attention.
        </li>
        <li>
          The first three seconds matter. Globe loads beautifully, query bar
          invites a question, nothing else competes.
        </li>
        <li>Transitions should feel earned, not flashy.</li>
        <li>
          Borrow from the best museums: white space, confident typography,
          restraint, the curator’s voice.
        </li>
        <li>
          Atlas has its own visual language — don’t import Meridian’s palette
          or type system by default.
        </li>
      </ul>
    ),
  },
];

export default function AtlasProjectPage() {
  return (
    <>
      <CaseStudySection label="Introduction">
        <CaseStudyProse paragraphs={INTRO} />
      </CaseStudySection>

      <CaseStudySection label="Preview">
        <CaseStudyImage
          src="/work/atlas-card.png"
          alt="Atlas — queryable globe preview"
          placeholderLabel="public/work/atlas-card.png"
        />
      </CaseStudySection>

      <CaseStudySection label="Purpose">
        <CaseStudyProse paragraphs={PURPOSE} />
      </CaseStudySection>

      <CaseStudySection label="Considerations">
        <CaseStudyProse paragraphs={CONSIDERATIONS} />
      </CaseStudySection>

      <CaseStudySection label="Conclusions">
        <CaseStudyProse paragraphs={CONCLUSIONS} />
      </CaseStudySection>

      <CaseStudySpecAccordion
        items={SPEC_TILES}
        deckId="specifications"
        deckLabel="Project Specifications"
      />
    </>
  );
}
