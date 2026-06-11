# ATELIER — /atelier Page Build Spec (Cursor handoff)

> **Location:** `docs/atelier-page-build-spec.md` — handoff doc only; not imported by the app. Live code: `app/atelier/` (route + UI), Kiln deep dive in `app/atelier/kiln/`.

**Goal:** rebuild the `/atelier` page around the v2 architecture — two wings (Judgment, Production), the Studio-Mind beneath them, taste as the spine, Gallery facing out. The centerpiece is an **interactive** architecture diagram (cold-box style, click a room → slide-over detail panel). The six clickable room tiles remain beneath it as the detailed breakdown.

**Source of truth (do not re-derive):**

- `ATELIER_ARCHITECTURE_v2.md` — the vision and decision logs. Settled. Do not re-litigate.
- `ATELIER_PAGE_COPY.md` — visitor-register copy. **Use verbatim. Do not rewrite, tighten, or paraphrase.** Reproduced in §3 below for convenience.
- `ArchitectureDiagram.tsx` + `atelierArchitectureData.ts` — **live diagram** (ported from the former reference HTML). Edit these for diagram structure, interaction, and §4.6 panel copy.

---

## 1. Scope

**In:**

- Reorganize `/atelier` into the section order in §2.
- Drop in the §3 copy verbatim.
- Rebuild the architecture diagram as an **interactive** client component per §4 (`ArchitectureDiagram.tsx`). The corrected structure is non-negotiable: Bench and Scrapped are **verdicts from the Kiln**, not children of Production.
- Keep the six room tiles beneath the diagram as the detailed breakdown (§5).

**Out (do not touch this pass):**

- The six-room deep-dive content rewrite — tiles reuse the §4 panel copy as their baseline; fuller per-tile copy is a separate task if wanted.
- Any change to other portfolio pages, routing, or the homepage project order.
- New animation systems, scroll-jacking, parallax. Restraint is the governing law (architecture doc). Motion is limited to the panel slide and node hover/active.
- Backend, data, or “live Atelier” functionality. This page is a static narrative + interactive diagram.

---

## 2. Page section order (top → bottom)

| #   | Section                              | Source                                           | Notes                                                                          |
| --- | ------------------------------------ | ------------------------------------------------ | ------------------------------------------------------------------------------ |
| 1   | Hook (2 paras)                       | §3 lines under the rule                          | Opening statement + “I direct; the studio is the crew.”                        |
| 2   | Presentation is judgment             | §3 `## Presentation is judgment`                 | The thesis.                                                                    |
| 3   | How it starts                        | §3 `## How it starts`                            | The core loop.                                                                 |
| 4   | The studio (intro line)              | §3 `## The studio`                               | “One building: two wings…” — leads into the diagram.                           |
| 5   | **Interactive architecture diagram** | §4                                               | The visual anchor of “The studio.” Sits directly after section 4’s intro line. |
| 6   | The studio — prose sub-sections      | §3 Judgment / Production / Studio-Mind / Gallery | The four wing/layer write-ups, beneath the diagram.                            |
| 7   | **Six room tiles**                   | §5                                               | The detailed breakdown. Clickable, consistent with the diagram panel.          |
| 8   | What makes it mine                   | §3 `## What makes it mine`                       | Taste / the spine.                                                             |
| 9   | Where it is now                      | §3 `## Where it is now`                          | Honest build status.                                                           |
| 10  | Closing gesture                      | §3 `## Closing gesture`                          | Points to the physical practice; teases the director story.                    |

Diagram-first, then prose, then tiles is deliberate: see the building, then read it, then drill in. Order is easy to swap if it reads better as prose-then-diagram, but ship this order first.

---

## 3. Page copy (verbatim — do not edit)

> The Atelier is a studio that knows me well enough to be a real creative partner: one that judges not just which ideas are worth making, but how each deserves to be shown.
>
> I have more ideas than I have time to be right about. The Atelier is how I decide which of them deserve the work, and how I turn the survivors into something I can actually see. I direct; the studio is the crew. My part is taste and judgment. Its part is to catch ideas before they slip away, test them honestly, and show me what they could become.

**## Presentation is judgment**

> Most tools that hold ideas can tell you whether an idea is good. The rarer thing, and the thing I built the Atelier around, is knowing me well enough to decide _how_ an idea should be shown: a quick sketch when a sketch is enough, a single hard sentence when that is all it needs, a rough prototype when I have to see it move, a comparison when two ideas are colliding. It judges the substance of an idea and the form it deserves, both drawn from the same growing sense of how I think.

**## How it starts**

> It begins the moment I drop an idea in, wherever I am. The studio does a quick, honest pass of research and shows me the idea made visible, in the form that serves it best. I get to see the thing before I do the heavy thinking about it, which is the part most tools get backwards. The rigorous evaluation is always there when I want it. It is mine to call on, not a toll I pay at the door.

**## The studio**

> The Atelier is one building: two wings where the active work happens, a layer that runs beneath them, and one room that faces out.

_(diagram renders here)_

**### Judgment — where ideas are tested**

> An idea lands in the Vault with no friction, and the studio does a light first pass so it is not cold when I come back to it. When I am ready, it goes into the Kiln: an honest, adversarial test that asks the questions I tend to avoid. The Kiln runs at two speeds, a fast read when I just want a gut check and a deep, rigorous interrogation when I have decided an idea is worth cracking open. Its verdict sends each idea somewhere: onto the floor where things get made, onto a shelf for the promising but not yet urgent, or into an archive for what did not hold, labeled rather than deleted, because the Kiln can be wrong and an idea that fails today might be right in a year.

**### Production — where ideas are made**

> The heart of the whole thing. A surviving idea becomes the cheapest version of itself I can react to: a rough visual, a sketch and a paragraph, something I can click through. When a direction earns it, the studio hands a dense brief to a coding agent and I get a working scaffold, the head start I used to build entirely by hand. Every idea here is alive. I can argue with it, push it, and watch it sharpen, and it is honest enough not to let me talk myself into a better idea than the one I actually have.

**### The Studio-Mind**

> Beneath both wings is a single partner that knows me. It works on my ideas when I am not, and brings me the few things actually worth my attention, in whatever form fits them best. Underneath it runs the quiet work that makes that possible: keeping surviving ideas current, re-testing them as they grow, noticing where two of them quietly meet. That is how it knows when to reach me, and when to leave me alone.

**### The Gallery**

> One room faces out. The Gallery holds the work worth showing, where anyone can talk to the published ideas, not only look at them.

**## What makes it mine**

> The reason the studio can do any of this is that it is slowly learning my taste. Everything it does draws on a model of how I judge, fed by what I write about design, the calls I make, and every time I agree or disagree with it. It starts as something simple and gets sharper the longer I use it. A studio that turns ideas into briefs can be built by anyone. A studio that has learned my judgment cannot.

**## Where it is now**

> This is the Atelier as I am building it. The judgment wing is real, and I use it; the rest I am building toward, in the order the loop matters most. The vision is the point, and the studio is how I am proving it to myself.

**## Closing gesture**

> The Atelier is the first tool, not the whole plan. The longer arc points somewhere physical: a design practice in the world. The way I learned to think about directing a crew came from somewhere specific, but that is a story for another page.

---

## 4. Interactive architecture diagram

Implement the diagram in `ArchitectureDiagram.tsx` (`'use client'`). This section restates the parts that must not drift.

### 4.1 Layout — read bottom-up as one building

Three stacked layers, plus one outward room:

```
                          ┌─────────────┐
 [ JUDGMENT wing ]        [ PRODUCTION ] │  GALLERY │   ← faces out (outside the
   Vault → Kiln              Workshop    │ (public) │     Production frame, far right)
        │                    (the heart) └────┬─────┘
   ┌────┴────┐                  ▲             ▲
 Bench    Scrapped              │ (Kiln→Workshop, "to the floor")
 (verdicts, set aside)          │
──────────────────────────────────────────────────────────────
 STUDIO-MIND  — one partner beneath both wings
   substrate: research · re-kilning · connections
──────────────────────────────────────────────────────────────
 TASTE — the spine. Everything draws on it.  (clay spine-edge on the left)
```

### 4.2 Node table

| id           | Label       | Role line                  | Group                       | Treatment                                                                                        |
| ------------ | ----------- | -------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------ |
| `vault`      | VAULT       | ideas land                 | Judgment wing               | standard box                                                                                     |
| `kiln`       | KILN        | two-speed test             | Judgment wing               | standard box                                                                                     |
| `workshop`   | WORKSHOP    | ideas are made — the heart | Production wing             | **emphasized**: larger box, heavier stroke (1.4px), sub-line “manifester → coding-agent handoff” |
| `bench`      | BENCH       | set aside, not gone        | Judgment-side holding state | standard box                                                                                     |
| `scrapped`   | SCRAPPED    | kept, not deleted          | Judgment-side holding state | standard box                                                                                     |
| `gallery`    | GALLERY     | faces out                  | Outward                     | narrow vertical box, sits **outside** the Production frame, far right                            |
| `studiomind` | STUDIO-MIND | the partner that knows me  | Layer beneath both wings    | full-width band                                                                                  |
| `taste`      | TASTE       | what everything draws on   | Foundation / spine          | full-width band, clay accent bar on left edge                                                    |

All eight nodes are clickable. The six **rooms** (vault, kiln, workshop, bench, scrapped, gallery) also appear as tiles in §5; `studiomind` and `taste` are diagram-only (they are layers, not rooms — covered in prose by “The Studio-Mind” and “What makes it mine”).

### 4.3 Edge table

| From        | To                     | Style                       | Meaning                                                                         |
| ----------- | ---------------------- | --------------------------- | ------------------------------------------------------------------------------- |
| Vault       | Kiln                   | solid (ink)                 | idea moves to testing                                                           |
| Kiln        | Workshop               | **solid clay (emphasized)** | “onto the floor where things get made” — the main path, crosses into Production |
| Kiln        | Bench                  | dashed, faint               | verdict: promising, not yet urgent                                              |
| Kiln        | Scrapped               | dashed, faint               | verdict: did not hold                                                           |
| Workshop    | Gallery                | solid (ink)                 | published work faces out                                                        |
| Studio-Mind | Judgment wing          | faint dashed vertical       | sits beneath / watches                                                          |
| Studio-Mind | Production wing        | faint dashed vertical       | sits beneath / watches                                                          |
| Taste       | Studio-Mind (×3 ticks) | faint dashed vertical       | everything draws on it                                                          |

Line semantics carry meaning — keep them: **solid = idea flowing forward, dashed = set aside, faint dashed verticals = rests on / draws from.** Legend below the diagram labels these three.

### 4.4 Interaction — the hard requirements

1. **The slide-over panel OVERLAYS the diagram. It must NOT resize the diagram column.** This was the v1 bug. Implement as an absolutely-positioned panel inside a `position: relative` stage, with a scrim behind it. The diagram (SVG) keeps full width whether the panel is open or closed.
2. Click a node → panel slides in from the right with that node’s `{kicker, title, body, meta}` (copy in §4.6).
3. One panel open at a time. Selecting another node swaps content and moves the active state.
4. Dismiss via: close button, scrim click, and `Esc`.
5. Node states: hover (border → clay, faint fill), active/selected (clay border 1.6px, clay-tint fill).
6. **Mobile (≤640px):** panel becomes a bottom sheet (slides up, full width, ~78% height); scrim full-screen. The SVG scales to container width as a unit (acceptable for v1). If small-screen legibility is poor, allow horizontal scroll on the diagram rather than reflowing nodes.

### 4.5 Aesthetic — cold box

Clean architectural section: hairline boxes, square corners, ink on warm-cool paper, a single fired-clay accent (kiln/pottery lineage, distinct from Meridian’s amber). Mono labels meeting serif role lines is the concept — cold technical drawing carrying a warm voice, which _is_ “presentation is judgment.” Faint paper grain, museum whitespace, no gloss.

### 4.6 Panel copy (all eight — use verbatim)

- **taste** — kicker `The spine` · title `Taste` · _One model of how I judge — powering both what is worth my time and how each thing deserves to be shown. It is fed by what I write about design, the calls I make, and every time I agree or disagree with the studio. It starts simple and sharpens the longer I use it. A studio that turns ideas into briefs can be built by anyone; a studio that has learned my judgment cannot._ · meta `Substance + form · one model`
- **vault** — kicker `Judgment wing` · title `The Vault` · _Where an idea lands, with no friction, wherever I am. The studio does a light first pass so the idea is not cold when I come back to it — research stays lazy until an idea shows a first sign it is worth the work._ · meta `Capture · lazy first read`
- **kiln** — kicker `Judgment wing` · title `The Kiln` · _An honest, adversarial test that asks the questions I tend to avoid. It runs at two speeds: a fast read when I want a gut check, and a deep interrogation when I have decided an idea is worth cracking open. Rigor on demand, never a toll at the door. Its verdict sends each idea somewhere._ · meta `Two speeds · invoked, not imposed`
- **workshop** — kicker `Production wing · the heart` · title `The Workshop` · _The heart of the whole thing. A surviving idea becomes the cheapest version of itself I can react to — a rough visual, a sketch and a paragraph, something I can click through. When a direction earns it, the studio hands a dense brief to a coding agent and I get a working scaffold. Every idea here is alive: I can argue with it and watch it sharpen._ · meta `The manifester · chooses the form`
- **bench** — kicker `A verdict from the Kiln` · title `The Bench` · _A shelf for the promising but not yet urgent. Ideas rest here and are re-tested as they grow, waiting for their moment to arrive._ · meta `Promising · not yet urgent`
- **scrapped** — kicker `A verdict from the Kiln` · title `Scrapped` · _An archive for what did not hold — labeled, never deleted. The Kiln can be wrong, and an idea that fails today might be right in a year._ · meta `Kept, not deleted`
- **studiomind** — kicker `Beneath both wings` · title `The Studio-Mind` · _A single partner that knows me. It works on my ideas when I am not, and brings me the few things worth my attention, in whatever form fits them best. Beneath it runs the quiet work that makes that possible: keeping ideas current, re-testing them as they grow, noticing where two of them quietly meet._ · meta `One voice · substrate beneath`
- **gallery** — kicker `Facing out` · title `The Gallery` · _The one room that faces out. It holds the work worth showing — where anyone can talk to the published ideas, not only look at them._ · meta `Outward-facing · interactive`

---

## 5. The six room tiles (detailed breakdown)

Beneath the diagram, the six **rooms** stay as a tile grid: Vault, Kiln, Workshop, Bench, Scrapped, Gallery (Studio-Mind and Taste are not tiles — they are layers).

- Each tile shows the room name (mono) + role line (serif italic), matching the diagram nodes.
- Click behavior must be **consistent with the diagram**: a tile click opens the same panel pattern with the same §4.6 copy as a baseline. Do not invent a second, divergent interaction model.
- Preserve any existing tile art that’s already on the page (per the 2026-05 decision: “keep all existing art & copy”). If richer per-tile content exists today, keep it and layer it under the §4.6 baseline; do not delete.
- Lead with the Gallery’s interactivity where it surfaces — it is already built and is the strongest outward note.

---

## 6. Design tokens (from the reference file)

```
--paper      #eceae3   --ink        #221f1b
--paper-2    #f3f1ea   --ink-soft   #5c574e
--card       #f6f4ee   --ink-faint  #928c80
--line       #bdb7aa   --clay       #b25a3a   (single accent)
--line-soft  #d4cfc2   --clay-tint  rgba(178,90,58,.08)

mono  = IBM Plex Mono (labels — the cold-box register)
serif = Spectral       (prose / role lines / panel body — the warm voice)
```

**Reconcile with the existing site:** if `/atelier` already has a type scale and palette, keep the site system and apply only the diagram’s _structure + interaction + line-semantics_ from §4. The tokens above are the approved look for the diagram specifically; don’t fork the whole site’s system to match it.

---

## 7. Implementation notes

- Next.js App Router. The diagram is a client component (`'use client'`); the page wrapper can stay a server component with the diagram imported in.
- Suggested files (match existing conventions if they differ): `app/atelier/page.tsx`, `app/atelier/ArchitectureDiagram.tsx`, `app/atelier/RoomTiles.tsx`. Co-locate the node/edge/panel-copy data in one typed module so the diagram and tiles read from the same source.
- No external state library needed — local `useState` for the open node. No `localStorage`.
- Panel + scrim are siblings inside the relative stage; the SVG is laid out with a fixed `viewBox` and `width:100%` so it never reflows when the panel opens.
- Vercel deploy as usual.

---

## 8. Non-goals / do-not

- Do not rewrite the §3 copy or the §4.6 panel copy.
- Do not make the panel push/resize the diagram. Overlay only.
- Do not put Bench or Scrapped under Production. They are Kiln verdicts.
- Do not add streaks, notifications, “stay informed,” or duty-led framing anywhere — wrong product, wrong register.
- Do not flatten the line semantics into one uniform connector style.

---

## 9. Acceptance criteria

- [ ] Page renders in the §2 order with §3 copy verbatim.
- [ ] Diagram shows three stacked layers (Taste → Studio-Mind → two wings) + Gallery facing out.
- [ ] All eight nodes clickable; correct §4.6 copy in the panel.
- [ ] Panel overlays from the right (bottom sheet on mobile); diagram does **not** resize when it opens.
- [ ] Kiln → Workshop is the emphasized clay path; Bench/Scrapped are dashed verdict paths off the Kiln.
- [ ] Esc / scrim / close all dismiss; one panel open at a time; hover + active states present.
- [ ] Six room tiles beneath the diagram, consistent click behavior, existing art preserved.
- [ ] Legend labels the three line types.

---

## 10. Cursor starter prompt

> Rebuild the `/atelier` page in this repo around a new architecture. Follow `ATELIER_PAGE_BUILD_SPEC.md` (this spec), `ATELIER_PAGE_COPY.md` (verbatim copy), and `ATELIER_ARCHITECTURE_v2.md` (background). The live diagram is `ArchitectureDiagram.tsx` with data in `atelierArchitectureData.ts`.
>
> (1) Lay out page sections in §2 order with §3 copy verbatim; (2) keep the diagram overlay panel from resizing the SVG; (3) wire six room tiles to the same panel state as the diagram.
>
> Match the existing repo conventions and design system where one exists; apply the spec’s diagram tokens only to the diagram. Do not rewrite copy. Do not place Bench/Scrapped under Production — they are Kiln verdicts. Show me the page section order and the diagram component first, before wiring the tiles, so I can check it.
