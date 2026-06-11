# /atelier Page — Phase 2 Spec (Cursor / Claude Code execution)

**Governing constraint: finish, don't redesign.** Architecture is closed. This phase fills one placeholder and adds one link. No new sections, no copy edits to the v2 doc, no palette or type experiments. If a new idea appears mid-build, it goes in a notes file, not the page.

**What this phase does, exactly two things:**

- **Part A** — replaces the internals of the existing `TemperamentsRow.tsx` placeholder (SLOT B, inside the Production wing) with the real four-temperament UI.
- **Part B** — adds a single quiet entry link to the live Kiln evaluator at the end of the Judgment wing subsection.
  Both live in the existing /atelier page in **ksmadireddy-site**. Do not touch the page's section order, the diagram, or any other component. The Phase 1 reflow stands.

---

## PART A — The temperaments UI

Replace the placeholder body of `app/atelier/TemperamentsRow.tsx`. The page-level placement (inside the Production wing, after its copy paragraph) does not change — only the component's internals.

### A1. The four cards

Four cards, in this order. Each card carries four elements in this hierarchy: **name** (display face, the largest element), **lens** (existing small-caps / mono label style), **question** (the recurring probe, distinct treatment — italic prose face works), **take** (body prose, the Serenity response). All content verbatim below.

| Name       | Lens                    | Question                                  | Take (verbatim)                                                                                                                                                                                                              |
| ---------- | ----------------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Clay**   | atmosphere and material | How does it feel?                         | Start at the threshold: the three steps where street noise falls away and the light turns from white to warm. If the body doesn't register the change in the first five seconds, nothing on the menu can fix it.             |
| **August** | monument and narrative  | What story does it tell at scale?         | One gesture should carry the whole room — the courtyard tree, visible from the street through the full depth of the building. Make it the reason people describe this place to a friend; everything else is supporting cast. |
| **Cedar**  | craft and region        | Where is the joint, the detail, the hand? | The cabinetry is the argument. Show the joinery where shelf meets case, let the wood and stone say Texas rather than a rendering of Kyoto, and keep the hand visible at every point a guest touches.                         |
| **Wren**   | lightness and daring    | Can it be lighter, almost not there?      | Subtract until it nearly disappears: thinner shelves, no visible counter mass, the garden reading as though the room has no back wall. The luxury is the nerve to leave it almost empty.                                     |

**Hard rule, repeated from Phase 1 and permanent: internal names (Ruby / Marcus / Ginko / Naomi) never appear anywhere in this codebase — not in copy, comments, props, test ids, filenames, or alt text.** Grep must stay clean.

### A2. The shared brief (the divergence made visible)

One shared element framing the four cards: a single brief that all four answer. Place it **above** the four-card grid as a framed line, so the reading order is legible — the visitor learns the one idea, then reads four divergent reads of it. (If in execution a "reveal beneath" punchline composes more elegantly, that's allowed latitude; the default is above.)

Framing line + brief, verbatim:

> Four temperaments, one shared sense of taste, each pulling a different way. Given a single idea, here is how each one sees it:
>
> **Serenity** — a small retail space where time slows down: a calm, nature-rooted third place, funded by a high-efficiency convenience engine.

A quiet eyebrow label above the whole block is optional (e.g. the existing mono-label style); no full heading — this nests under "Production — where ideas are made," which is the section's heading.

### A3. Copy-honesty constraint (non-negotiable)

The four takes are **hand-authored design copy illustrating how the temperaments are characterized** — not live system output. The divergence engine is not built. Therefore:

- Nothing in or around this UI may claim or imply the studio _generated_ these takes (no "here's what the studio produced," no "live output," no run/refresh affordance, no timestamps).
- Present-tense framing of how each temperament "sees" an idea is fine — that describes designed character, not a generation event.
- This keeps the section consistent with the "the rest I am building toward" register in "Where it is now." The page must not outrun what's real.

### A4. Optional Serenity image (effort-capped, easy cut)

If a Serenity interior render exists in the repo's assets, place **one** small, restrained framed image adjacent to the brief line in A2, as the visual anchor the takes respond to. One image only — never one per card (the takes are imagined directions, not four real renders). Caption it plainly if captioned at all (e.g. "Serenity — the idea given to all four").

If no suitable asset is in the repo, **skip it** — the section works on text alone, and the four-way text divergence is the actual signature. Do not go hunting for or generating an image. This is a nice-to-have, not a gate.

### A5. Layout & responsive

- Desktop wide: 4 across. Tablet: 2×2. Mobile: single column. (Same breakpoint behavior the Phase 1 placeholder already had.)
- The brief/framing line (A2) spans full width above the grid.
- Cards equal-height; takes are short enough (1–3 lines) that 4-across holds without crowding.
- Static by default. Any scroll-reveal or fade must respect `prefers-reduced-motion`. The page's one bold motion moment is reserved for the fan (Phase 4) — keep this section calm.

---

## PART B — Kiln entry link

The Kiln evaluator is confirmed to read no database and expose no internal fields; re-exposing an entry link leaks nothing. Add one quiet entry point.

### B1. Placement & behavior

- At the **end of the Judgment wing subsection**, after its existing copy paragraph.
- A single line in the existing link style (the same treatment used elsewhere on the site for inline links). Suggested copy: **"The Kiln is live — put an idea through it."** (Adjust wording to match the site's link voice if needed; keep it one line, no button chrome, no box.)
- Opens the **existing** Kiln evaluator surface already on disk (the `kiln/` components — `KilnContent.tsx` / `KilnRunDemo.tsx`, backed by `/api/evaluate`), unchanged. Use whatever entry mechanism the codebase already supports (route or in-page surface); determine which by reading the existing components rather than inventing a new one. Do not redesign or restyle the Kiln demo itself.

### B2. Pre-publish verification (one check, not a code task)

The Kiln demo spends the Anthropic key per visitor; durable rate limiting was added to `/api/evaluate` and Upstash was provisioned. Before this link is publicly reachable, confirm Upstash is actually serving the limiter — open the Upstash console, hit the Kiln demo a few times, confirm request activity registers. If durability is confirmed, ship the link. If for any reason it can't be confirmed, the rest of Phase 2 (Part A) still ships; hold only this one link line until confirmed. Part A has no dependency on Part B.

---

## Style rules (shared)

- Existing site tokens only: the page's actual display/sans/mono faces (Instrument Serif, Geist) and palette vars, per the Phase 1 flag. **No named font families in this spec are to be imported** — use the site's existing token system exactly. Zero new colors, faces, weights, or spacing scales.
- Match the existing vertical rhythm; the temperaments block inherits the Production section's spacing.
- Reuse the existing card style (ring/rounded) the Phase 1 placeholder already used for the four name cards — this phase adds content to that style, it doesn't restyle it.

---

## Do-not list

- No internal temperament names anywhere (grep `Ruby|Marcus|Ginko|Naomi` returns nothing new).
- No claim or implication of live/generated temperament output; no run/refresh control, no timestamps.
- No one-image-per-card; at most one shared Serenity image.
- No restyling of the Kiln demo surface; no new Kiln UI.
- No new palette/type; no new sections; no section-order changes; no diagram changes.
- No scope expansion mid-build → notes file.

---

## Acceptance criteria

1. `TemperamentsRow.tsx` renders four cards (Clay / August / Cedar / Wren) each with name, lens, question, and the verbatim Serenity take from A1.
2. The shared Serenity brief + framing line (A2) renders above the grid, verbatim.
3. No internal names anywhere in the diff; grep clean.
4. Nothing on the page claims the takes are system-generated (A3 honored).
5. Responsive behavior: 4-across → 2×2 → single column; brief spans full width; reduced motion respected.
6. Kiln entry link present at the end of the Judgment wing, existing link style, opening the existing Kiln surface unchanged (or held as the single pending line if Upstash durability not yet confirmed, per B2).
7. Optional Serenity image either placed (one, restrained, adjacent to the brief) or cleanly skipped — never one-per-card.
8. Builds clean; no console errors; mobile does not break; the Phase 1 reflow, the diagram, and all other sections are untouched.
   **Stop after this phase.** Do not begin Phase 3 (Meridian worked example) in the same run. Checkpoint with Krishna.
