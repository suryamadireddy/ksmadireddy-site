"use client";

import { useCallback, useState } from "react";
import { CaseStudyProse } from "@/app/components/project/ProjectCaseStudy";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { FourFormsFan } from "./FourFormsFan";
import { MeridianWorkedExample } from "./MeridianWorkedExample";
import { TemperamentsRow } from "./TemperamentsRow";
import type { NodeId } from "./atelierArchitectureData";

// All prose is verbatim from docs/ATELIER_PAGE_COPY.md (v2, canonical, June 10 2026).

const HOOK = [
  "The Atelier is a studio that knows me well enough to be a real creative partner: one that judges not just which ideas are worth making, but how each deserves to be shown.",
  "I have more ideas than I have time to be right about. The Atelier is how I decide which of them deserve the work, and how I turn the survivors into something I can actually see. I direct; the studio is the crew. My part is taste and judgment. Its part is to catch ideas before they slip away, test them honestly, and show me what they could become.",
];

const HOW_IT_STARTS = [
  "It begins the moment I drop an idea in, wherever I am. The studio does a quick, honest pass of research and shows me the idea made visible, in the form that serves it best. I see the thing first, and judge it second. Most tools ask for the judgment before they will show you anything. The rigorous evaluation is always there when I want it. It is mine to call on, not a toll I pay at the door.",
];

const STUDIO_INTRO = [
  "The Atelier is one building: two wings where the active work happens, a single mind that holds them together, and one room that faces out.",
];

const JUDGMENT = [
  "An idea lands in the Vault with no friction, and the studio does a light first pass so it is not cold when I come back to it. When I am ready, it goes into the Kiln: an honest, adversarial test that asks the questions I tend to avoid. The Kiln runs at two speeds, a fast read when I just want a gut check and a deep, rigorous interrogation when I have decided an idea is worth cracking open. Its verdict sends each idea somewhere: onto the floor where things get made, onto a shelf for the promising but not yet urgent, or into an archive for what did not hold, labeled rather than deleted, because the Kiln can be wrong and an idea that fails today might be right in a year.",
];

const PRODUCTION = [
  "The heart of the whole thing. A surviving idea becomes the cheapest version of itself I can react to: a rough visual, a sketch and a paragraph, something I can click through. The making runs through four temperaments that share my taste but pull in genuinely different directions, so one idea comes back as four real cuts of the same brief, and I pick, combine, and shape the final version from there. When a direction earns it, the studio hands a dense brief to a coding agent and I get a working scaffold, the head start I used to build entirely by hand. Every idea here is alive. I can argue with it, push it, and watch it sharpen, and it is honest enough not to let me talk myself into a better idea than the one I actually have.",
];

const STUDIO_MIND = [
  "Holding the two wings together is a single partner that knows me. It works on my ideas when I am not, and brings me the few things actually worth my attention, in whatever form fits them best. Underneath it runs the quiet work that makes that possible: keeping surviving ideas current, re-testing them as they grow, noticing where two of them quietly meet. That is how it knows when to reach me, and when to leave me alone.",
];

const GALLERY_PROSE = [
  "One room faces out. The Gallery holds the work worth showing, where anyone can talk to the published ideas, not only look at them.",
];

const WHAT_MAKES_IT_MINE = [
  "The reason the studio can do any of this is that it is slowly learning my taste. Everything it does draws on a model of how I judge, fed by what I write about design, the calls I make, and every time I agree or disagree with it. It starts as something simple and gets sharper the longer I use it. A studio that turns ideas into briefs can be built by anyone. A studio that has learned my judgment cannot.",
];

const WHERE_IT_IS_NOW = [
  "This is the Atelier as I am building it. The judgment wing is real and I use it, the studio's memory has just come online, and the rest I am building toward, in the order the loop matters most. The vision is the point, and the studio is how I am proving it to myself.",
];

const CLOSING_GESTURE = [
  "The Atelier is the first tool, not the whole plan. The longer arc points somewhere physical: a design practice in the world. The way I learned to think about directing a crew came from somewhere specific, but that is a story for another page.",
];

export function AtelierPageContent() {
  const [selectedId, setSelectedId] = useState<NodeId | null>(null);

  const handleSelect = useCallback((id: NodeId) => {
    setSelectedId(id);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedId(null);
  }, []);

  return (
    <>
      <section id="hook">
        <CaseStudyProse paragraphs={HOOK} />
      </section>

      <section id="presentation-is-judgment" className="mt-12 md:mt-16">
        <h2 className="display text-2xl md:text-3xl">
          Presentation is judgment
        </h2>
        <div className="mt-5 space-y-4 text-base md:text-lg leading-relaxed text-[var(--color-fg-muted)]">
          <p>
            Most tools that hold ideas can tell you whether an idea is good.
            The rarer thing, and the thing I built the Atelier around, is
            knowing me well enough to decide <em>how</em> an idea should be
            shown: a quick sketch when a sketch is enough, a single hard
            sentence when that is all it needs, a rough prototype when I have
            to see it move, a comparison when two ideas are colliding. It
            judges the substance of an idea and the form it deserves, both
            drawn from the same growing sense of how I think.
          </p>
        </div>
        <FourFormsFan />
      </section>

      <section id="core-loop" className="mt-12 md:mt-16">
        <h2 className="display text-2xl md:text-3xl">How it starts</h2>
        <div className="mt-5">
          <CaseStudyProse paragraphs={HOW_IT_STARTS} />
        </div>
      </section>

      <section id="studio" className="mt-12 md:mt-16">
        <h2 className="display text-2xl md:text-3xl">The studio</h2>
        <div className="mt-5">
          <CaseStudyProse paragraphs={STUDIO_INTRO} />
        </div>
        <div className="mt-10 space-y-10 md:mt-12 md:space-y-12">
          <div>
            <h3 className="font-serif text-xl md:text-2xl tracking-[-0.01em] text-[var(--color-fg)]">
              Judgment — where ideas are tested
            </h3>
            <div className="mt-4">
              <CaseStudyProse paragraphs={JUDGMENT} />
            </div>
          </div>
          <div>
            <h3 className="font-serif text-xl md:text-2xl tracking-[-0.01em] text-[var(--color-fg)]">
              Production — where ideas are made
            </h3>
            <div className="mt-4">
              <CaseStudyProse paragraphs={PRODUCTION} />
            </div>
            <TemperamentsRow />
          </div>
          <div>
            <h3 className="font-serif text-xl md:text-2xl tracking-[-0.01em] text-[var(--color-fg)]">
              The Studio-Mind
            </h3>
            <div className="mt-4">
              <CaseStudyProse paragraphs={STUDIO_MIND} />
            </div>
          </div>
          <div>
            <h3 className="font-serif text-xl md:text-2xl tracking-[-0.01em] text-[var(--color-fg)]">
              The Gallery
            </h3>
            <div className="mt-4">
              <CaseStudyProse paragraphs={GALLERY_PROSE} />
            </div>
          </div>
        </div>
      </section>

      <section id="architecture" className="mt-12 md:mt-16 min-w-0 w-full">
        <span className="label">The architecture, explorable.</span>
        <div className="mt-5">
          <ArchitectureDiagram
            activeId={selectedId}
            onSelect={handleSelect}
            onClose={handleClose}
          />
        </div>
      </section>

      <section id="worked-example" className="mt-12 md:mt-16">
        <MeridianWorkedExample />
      </section>

      <section id="taste" className="mt-12 md:mt-16">
        <h2 className="display text-2xl md:text-3xl">What makes it mine</h2>
        <div className="mt-5">
          <CaseStudyProse paragraphs={WHAT_MAKES_IT_MINE} />
        </div>
      </section>

      <section id="now" className="mt-12 md:mt-16">
        <h2 className="display text-2xl md:text-3xl">Where it is now</h2>
        <div className="mt-5">
          <CaseStudyProse paragraphs={WHERE_IT_IS_NOW} />
        </div>
      </section>

      <section id="closing" className="mt-12 md:mt-16">
        <CaseStudyProse paragraphs={CLOSING_GESTURE} />
      </section>
    </>
  );
}
