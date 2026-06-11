# /atelier Page — Phase 1: Reflow Spec (Cursor execution)

**Governing constraint: finish, don't redesign.** This phase restructures the existing /atelier page into its final section order and installs three placeholder slots for the set pieces built in Phases 2–4. No architecture questions are open. No new palette, no new type, no new components beyond the three named placeholders. If a new idea appears mid-build, it goes in a notes file, not the page.

**Approach: reflow in place.** Work inside the existing /atelier page file. Locate it first (`app/atelier/page.tsx` or equivalent); do not create a new page file. Existing components — including the finished interactive diagram — are reused, not rebuilt.

---

## 1. Copy source

All prose comes from `ATELIER_PAGE_COPY_v2.md` (canonical, June 10 2026), used verbatim. This file supersedes both earlier drafts of `ATELIER_PAGE_COPY.md`; if either earlier draft is in the repo, it is replaced by v2, not merged with it. Quick integrity check: the correct file contains "a single mind that holds them together" in the studio intro and "the studio's memory has just come online" in "Where it is now."

No copy edits in this phase beyond placing the v2 text. Headings on the page use the copy doc's headings exactly ("Presentation is judgment", "How it starts", "The studio", "Judgment — where ideas are tested", "Production — where ideas are made", "The Studio-Mind", "The Gallery", "What makes it mine", "Where it is now"). The closing gesture paragraph renders without a heading.

---

## 2. Final section order

Each section gets a semantic `<section>` with the listed `id` anchor.

| #   | Section                  | id                         | Content                                                                                                                                                                                                                                                                                                       |
| --- | ------------------------ | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Hook + thesis            | `hook`                     | Opening paragraph ("The Atelier is a studio that knows me…") + the "I have more ideas…" paragraph. This is the existing page-top register; keep current hero treatment if one exists.                                                                                                                         |
| 2   | Presentation is judgment | `presentation-is-judgment` | Copy section verbatim, followed immediately by **SLOT A: `<FourFormsFan />`**.                                                                                                                                                                                                                                |
| 3   | How it starts            | `core-loop`                | Copy section verbatim (later-draft version, see §1).                                                                                                                                                                                                                                                          |
| 4   | The studio               | `studio`                   | Intro line + four subsections in order: Judgment wing, Production wing, Studio-Mind, Gallery. **SLOT B: `<TemperamentsRow />` renders inside the Production wing subsection, after its copy paragraph.**                                                                                                      |
| 5   | Go deeper: the diagram   | `architecture`             | The existing finished interactive diagram, placed here as the deeper exploration of the building just described. Frame with a single short kicker line above it: "The architecture, explorable." No other chrome. (Movable in a later pass if it reads better elsewhere; do not redesign the diagram itself.) |
| 6   | Worked example: Meridian | `worked-example`           | **SLOT C: `<MeridianWorkedExample />`**. Sits before "What makes it mine," per the brief.                                                                                                                                                                                                                     |
| 7   | What makes it mine       | `taste`                    | Copy section verbatim.                                                                                                                                                                                                                                                                                        |
| 8   | Where it is now          | `now`                      | Copy section verbatim. Already the honest register; nothing on the page may outrun it.                                                                                                                                                                                                                        |
| 9   | Closing gesture          | `closing`                  | Copy paragraph verbatim, no heading. The Pushpa tease stays a tease pointing at the About page — no expansion.                                                                                                                                                                                                |

Anything currently on the page that is not in this table — in particular any remnant of six flat room tiles — is removed. The six-room detail survives only insofar as it lives inside the interactive diagram.

---

## 3. The three placeholder components

Create three components in the page's existing component directory. Each is a self-contained file, no props in Phase 1, and renders a _composed placeholder_ — styled with existing tokens so the page is coherent and shippable between phases — not a gray box and not a "coming soon" label. Phases 2–4 replace each component's internals without touching the page structure.

### 3a. `FourFormsFan.tsx` (SLOT A — replaced in Phase 4)

- Placeholder render: a centered single line in the existing serif display face — the example idea sentence: _"A quiet third place where time slows down."_ — with six small, evenly spaced, unlabeled outline cards arranged in a shallow static arc beneath it. One card (second from left) carries a slightly stronger border. No animation, no captions yet.
- This placeholder is deliberately 85%-of-the-idea: if Phase 4's animation is cut, this composition is the fallback that gets finished instead.

### 3b. `TemperamentsRow.tsx` (SLOT B — replaced in Phase 2)

- Placeholder render: a row of four cards (stack to 2×2 below tablet width, single column on mobile) showing only the four public names — **Clay, August, Cedar, Wren** — set in the existing card style. No lenses, no questions, no takes yet.
- **Hard rule, enforced now and forever: internal names (Ruby/Marcus/Ginko/Naomi) never appear anywhere in this codebase — not in copy, comments, props, test ids, or filenames.**

### 3c. `MeridianWorkedExample.tsx` (SLOT C — replaced in Phase 3)

- Placeholder render: section heading "Worked example: Meridian" plus a single italic line in body face: _"One idea, driven through the whole loop by hand."_ Nothing else yet.

---

## 4. Style rules

- Existing design tokens only: Cormorant Garamond (display), DM Sans (UI/captions), Source Serif 4 (prose), the current restrained palette and amber accent. Zero new colors, faces, weights, or spacing scales.
- Section rhythm: match the page's existing vertical spacing between major sections; placeholders inherit it.
- The page's one bold moment is reserved for the fan (Phase 4). Everything in this phase stays quiet.
- Reduced motion: nothing in this phase animates, so no work needed — but do not remove any existing `prefers-reduced-motion` handling around the diagram.

---

## 5. Mobile

Full mobile pass is deferred to the end (per definition of done), but this phase must not break mobile: sections stack naturally, the temperaments placeholder collapses as specified in §3b, the fan placeholder may compress its arc to a horizontal row below mobile width, and the diagram keeps whatever mobile behavior it already has.

---

## 6. Do-not list (verbatim from the brief)

- No six flat room tiles.
- No progress bars or percent-complete language.
- No claims of persistent agents, autonomous surfacing, or live temperament output anywhere in copy or UI labels.
- No new palette or type experiments.
- No scope expansion mid-build.

---

## 7. Acceptance criteria

1. Page renders with all nine sections in the §2 order, anchors present and linkable.
2. All copy matches `ATELIER_PAGE_COPY_v2.md` verbatim.
3. Three placeholder components exist, render with existing tokens, and the page looks intentional — a visitor landing today sees a coherent page, not scaffolding.
4. Interactive diagram works exactly as before, now in the `architecture` section.
5. No internal temperament names anywhere in the diff (grep `Ruby|Marcus|Ginko|Naomi` returns nothing new).
6. No removed functionality other than superseded layout (six-tile remnants).
7. Homepage link to /atelier unchanged and working (the link-text update, if any, happens at ship time, not now).
8. Builds clean; no console errors; mobile does not break.
   **Stop after this phase.** Do not begin Phase 2 in the same run. Checkpoint with Krishna.
