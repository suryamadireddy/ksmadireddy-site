# /atelier Page — Phase 3 Spec: The Meridian Worked Example (Cursor / Claude Code execution)

**Governing constraint: finish, don't redesign.** This phase fills the last copy-bearing placeholder: `MeridianWorkedExample.tsx` (SLOT C, section id `worked-example`, between the diagram and "What makes it mine"). No section-order changes, no copy edits elsewhere, no new palette or type. Repo: **ksmadireddy-site**.

**What this section is:** the page's proof. One real idea, driven through the whole loop by hand, with every artifact excerpt drawn verbatim from the studio's actual records. The narrative spine is not "idea → build" — it is **"the judgment system caught the flaw the director had missed, the idea argued back, and the shipped product is different because of it."**

**The honesty contract for this section:** every quoted excerpt is real and verifiable in the system; the loop was driven by hand and the copy says so explicitly. Nothing may imply the Atelier automated any handoff. That admission is not a weakness — the closing line converts it into the argument for the whole architecture.

---

## 1. Structure: six stages + a close

A single vertical sequence. Each stage = a small mono **eyebrow label**, one to two sentences of **connective prose** (page voice), and where marked, an **artifact excerpt** rendered in a visually distinct "evidence" treatment (see §3). All copy below is verbatim — do not rewrite it.

### Stage 1 — eyebrow: `The idea`

Prose:

> It started as a sentence: an interactive globe showing where news happens — a daily digest of the top five global events. A what machine, not a why machine.

No artifact block (the prose carries the idea).

### Stage 2 — eyebrow: `The Kiln's verdict`

Prose:

> The deep Kiln went straight at the premise.

Artifact excerpt (evidence treatment, attributed `— Kiln evaluation, red flags`):

> "The five-event selection problem has no neutral solution: any methodology — algorithmic or human — encodes a definition of importance, and that definition is an editorial stance, which directly contradicts the product's positioning."

### Stage 3 — eyebrow: `Arguing with the idea`

Prose:

> Every surviving idea in the studio is a live thing I can argue with. This one pushed back until I conceded the point.

Artifact excerpt (evidence treatment, attributed `— conversation with the idea`):

> "The neutrality claim lives in the captions. But the selection is where the ideology actually lives, and I haven't answered that."

### Stage 4 — eyebrow: `What changed`

Prose:

> The research pass made the verdict empirical: studies showed language models introduce framing bias in more than a quarter of news summarization instances, so the product's central promise could not survive a claim of neutrality. The positioning shifted from "no editorial agenda" to a transparent, proportionate selection method — and that shift is what Meridian shipped with.

No artifact block required (prose paraphrases the research synthesis; do not quote the underlying study text directly).

### Stage 5 — eyebrow: `The build`

Prose:

> A taste-dense brief went to a coding agent, and a working scaffold came back. I carried that brief by hand, the same way I carried every other step.

No artifact block required (see §4 for the optional brief-excerpt slot).

### Stage 6 — eyebrow: `The product`

Prose:

> Meridian is live: five impact-ranked events a day, on a globe.

Followed by a **link to /meridian** in the existing link style — "See it live →" or matching site voice — and the optional product screenshot slot (§4).

### The close (no eyebrow; set apart, slightly more weight — e.g. the display face at modest size)

> I drove every handoff in this loop by hand. The Atelier is the system that automates the loop I've already proven.

This is the section's last line and the page's pivot into "What makes it mine." Nothing renders after it inside this section.

---

## 2. Quiet provenance line

Directly under the section's opening (the existing italic line _"One idea, driven through the whole loop by hand."_ stays as the intro), add one small muted caption:

> Every excerpt below is taken verbatim from the studio's records.

This single line does the verification work; no per-artifact disclaimers beyond the attributions in §1.

---

## 3. The "evidence" treatment

Artifact excerpts must read as _material from another system_, distinct from page prose:

- A framed block in the existing border/card idiom, with the attribution line (`— Kiln evaluation, red flags`, `— conversation with the idea`) in the mono label style.
- Do not restyle them as decorative pull-quotes; they are evidence, not ornament. Keep them quiet, slightly inset, consistent with each other.
- Existing tokens only. No new colors. If a subtle differentiation is needed, use the existing muted/border-strong vars, not a new hue.

---

## 4. Optional screenshot slots (effort-capped — text-only is fully shippable)

The section is complete with text alone. If and only if Krishna supplies assets, two slots exist:

1. **Stage 2 or 3 artifact screenshot** — a cropped screenshot of the actual studio record (the red-flags block or the conversation excerpt) placed beside or beneath the corresponding evidence block. The studio UI is dark; that contrast is fine — it reads as a real artifact from another system. One crop maximum across stages 2–3.
2. **Stage 6 product screenshot** — one screenshot of live Meridian next to the link.
   Rules: maximum two images in the whole section; never screenshot-per-stage; if no assets are present in the repo, **skip both slots without substituting anything**. Do not generate, recreate, or mock up artifacts — a fabricated screenshot would violate the section's entire premise.

---

## 5. Layout & responsive

- Single column, generous vertical rhythm matching the page; the six stages read as one continuous descent, not six boxed cards. Eyebrows + a thin connecting rule or spacing are enough structure.
- Mobile: same single column; evidence blocks go full-width; images (if any) stack below their stage's text.
- Static by default; any reveal respects `prefers-reduced-motion`. The page's one bold motion moment remains reserved for the fan (Phase 4).

---

## 6. Do-not list

- No rewriting of the verbatim prose or excerpts in §1 (typo fixes excepted, flagged in the run summary if made).
- No claim or implication that the Atelier automated any step of this loop.
- No fabricated, mocked, or AI-generated "artifact" imagery; real screenshots or nothing.
- No quoting the underlying external research studies directly — paraphrase only, as written in Stage 4.
- No progress bars, percent-complete language, or persistent-agent claims.
- No new palette/type; no section-order changes; no edits to other sections or the diagram.
- No scope expansion mid-build → notes file.

---

## 7. Acceptance criteria

1. Section renders the six stages in order with eyebrows, verbatim prose, and the two evidence blocks with attributions.
2. The provenance caption (§2) renders under the intro line.
3. The closing line renders set-apart, last in the section, verbatim.
4. /meridian link present and working.
5. Image slots either filled with supplied real assets (max two) or cleanly absent.
6. Evidence treatment uses existing tokens; visually distinct from page prose; consistent across both blocks.
7. Grep for internal temperament names still clean (`Ruby|Marcus|Ginko|Naomi` — nothing new).
8. Builds clean; mobile holds; Phases 1–2 output and the diagram untouched.

---

## 8. Session close-out (standing instruction)

End the run by committing this phase as its own logical commit and pushing to the remote, then confirm the Vercel deploy picks it up. Local-only work has caused three stale-deploy incidents in this project; no session ends with uncommitted page work.

**Stop after this phase.** Do not begin Phase 4 (the four-forms fan). Checkpoint with Krishna.
