# /atelier Page — Phase 4 Spec: The Four-Forms Fan (Cursor / Claude Code execution)

**Governing constraint: finish, don't redesign.** This is the last placeholder: `FourFormsFan.tsx` (SLOT A, directly under "Presentation is judgment"). It is the page's **one bold moment** — every other section was deliberately kept calm to spend the motion budget here. It is also the **effort-capped** piece: the static fallback is pre-authorized and already 85% present on the page. Repo: **ksmadireddy-site**.

**What this component argues:** the thesis made visual. One raw idea; a palette of forms it could take; the studio chooses one. The convergence — not the fan — is the beat that communicates "presentation is judgment." Museum-calm throughout: no physics, no spring overshoot, no parallax, no gimmicks.

---

## 1. Content (verbatim, fixed)

**The idea (center, display serif — the placeholder line, unchanged):**

> A quiet third place where time slows down.

(Deliberately the same idea family as the temperaments' Serenity brief — one idea quietly threads the page.)

**The six form cards (mono/small-caps labels, this order, left to right):**

1. A single hard sentence
2. A short prose take
3. A rough sketch
4. A clickable prototype
5. A side-by-side comparison
6. A one-page brief
   **The chosen card: "A rough sketch."** A spatial idea has to be seen before it can be judged; the sketch is the form that serves it. (This supersedes the placeholder's "second from left" emphasis — the stronger treatment moves to the sketch card.)

**The caption (appears at convergence, muted, small):**

> The studio chooses the form. Restraint is the law.

**Honesty constraint (same discipline as the temperaments):** this is an illustration of the concept, not live output. No run/regenerate affordance, no input field, no implication the choice just happened in real time.

---

## 2. The sequence (single-trigger, runs once)

Trigger: **IntersectionObserver** when the component is ~40% in view. No scroll-scrubbing — a scroll-linked scrub is fragile, fights reduced-motion, and reads as a gimmick. One triggered sequence, three beats, total ≈ 2.5–3.5s:

1. **Settle (0 → ~0.6s):** the idea line is already present; the six cards rise/fade from beneath it into the shallow arc (existing placeholder geometry). Stagger ≈ 60–80ms per card. Ease-out, no bounce.
2. **Hold (~0.6s):** the full fan rests — the moment of "it could be any of these."
3. **Converge (~1.2s):** the sketch card translates forward/up slightly and gains the stronger border + full opacity; the other five recede — slight scale-down, opacity to ~0.45, optional 1–2px blur if it stays subtle. The caption fades in beneath the arc as the convergence completes.
   End state persists; the sequence does not loop and does not replay on re-entry. No replay button (scope discipline — notes file if tempting).

**`prefers-reduced-motion`: render the end state statically.** No sequence, no transitions: fan open, sketch card foregrounded, others receded, caption present.

**Mobile (below the existing 640px breakpoint):** render the static end state. The placeholder's flat-row compression evolves to: idea line, then the six cards in a compact 2×3 or wrapped row with the sketch card emphasized, caption beneath. Motion is desktop's reward; mobile gets the composed conclusion.

---

## 3. Implementation constraints

- **CSS transitions/keyframes + IntersectionObserver only.** Do not add an animation library. (If framer-motion is _already_ a dependency in this repo, it may be used; do not install anything new for this.)
- All states must be expressible as the static end state with transitions layered on — i.e., build the final composition first, then animate into it. This guarantees the fallback is always one deletion away.
- Existing tokens only (Instrument Serif / Geist, current palette vars, existing border idioms). The "stronger" treatment on the chosen card reuses the border-strong var the placeholder already used. Zero new colors/faces/weights.
- The component stays self-contained in `FourFormsFan.tsx`; no page-level changes beyond what's already in place from Phase 1.

---

## 4. The effort cap (pre-authorized exit ramp)

This is the rabbit-hole component by design, so the cap is explicit:

- **Budget: one focused implementation pass.** If after that pass the sequence is not museum-calm — any jank, layout shift, mistimed caption, mobile weirdness, or fighting with the observer — **stop animating and ship the static end state** (§2's reduced-motion render becomes the universal render). That composition delivers 85% of the thesis and is a finished artifact, not a compromise.
- Do not iterate on easing curves, stagger timings, or blur values beyond small adjustments inside the single pass. Polishing motion is the named rabbit hole.
- The run summary must state plainly which version shipped: animated or static. Both are acceptable outcomes; an honest static is better than a fussy animation.

---

## 5. Do-not list

- No scroll-scrubbed animation; no physics/spring libraries; no new dependencies.
- No replay/run/regenerate affordances; no input field; no implication of live generation.
- No looping; no re-trigger on re-entry.
- No changes to the idea line, card labels, chosen card, or caption (verbatim per §1).
- No new palette/type; no edits to any other section, component, or the diagram.
- No scope expansion mid-build → notes file.

---

## 6. Acceptance criteria

1. Desktop, motion allowed: the three-beat sequence triggers once at ~40% in view, completes in ≈ 2.5–3.5s, ends with the sketch card foregrounded and the caption visible; end state persists.
2. `prefers-reduced-motion`: static end state, no transitions, caption present.
3. Mobile: static end state in the compact layout; no horizontal overflow; no layout shift.
4. All §1 content verbatim; chosen card is "A rough sketch"; no interactive/regeneration affordances.
5. No new dependencies; existing tokens only; component self-contained.
6. If the effort cap was exercised, the static composition is fully finished (not a half-animated state) and the run summary says so.
7. Grep for internal temperament names still clean.
8. Builds clean; no console errors; Phases 1–3 output and the diagram untouched.

---

## 7. Session close-out (standing instruction)

Commit as one logical commit, push to `main`, and confirm the **Git-triggered** deployment appears in the Vercel dashboard (the pipeline is verified working — the check is now confirmation, not archaeology).

**Stop after this phase.** The fan completes the three set pieces. Remaining before ship — handled at the next checkpoint, not in this run: the one full mobile pass across the whole page, and the homepage link/text update. Checkpoint with Krishna.
