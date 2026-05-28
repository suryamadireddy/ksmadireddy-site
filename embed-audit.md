# Evaluator Embed Audit

## 1. EvaluatorChat component

**Exists:** yes — `app/components/kiln/EvaluatorChat.tsx`

What it does:
- Client component (`"use client"`) that renders a 500 px fixed-height chat container.
- On mount it fires a seed message (`"I have a new idea I'd like to triage."`) to `POST /api/evaluate` and streams Claude's opening question.
- Subsequent user messages are submitted via a textarea (Enter to send, Shift+Enter for newline); the conversation history is passed to the API on every turn.
- Caps at 10 user turns (`MAX_USER_TURNS = 10`) and disables input when the cap is reached.
- When the API returns a `complete_interview` tool call, it renders a `SummaryCard` showing `disposition`, `triage_reasoning`, and `growth_observations`.
- Streams NDJSON lines from the route and appends text deltas in real time; shows a three-dot `TypingIndicator` while waiting for the first token.

**Where it is imported:**
- `app/components/kiln/EvaluatorChat.tsx:75` — `export default function EvaluatorChat()`
- `app/kiln/page.tsx` — **not imported**. The import was removed in the most recent commit (see §4). The only reference is a stale comment on line 97:
  ```
  {/* Evaluator — EvaluatorChat replaces the static image */}
  ```

---

## 2. API route

**Exists:** yes — `app/api/evaluate/route.ts`

- **Model:** `claude-sonnet-4-6` (line 107)
  ```ts
  model: "claude-sonnet-4-6",
  ```
- **System prompt:** yes, a multi-paragraph Socratic evaluator prompt (lines 8–30), with prompt caching enabled:
  ```ts
  system: [
    {
      type: "text" as const,
      text: SYSTEM_PROMPT,
      cache_control: { type: "ephemeral" as const },
    },
  ],
  ```
- **`complete_interview` tool:** yes, defined at lines 32–58 with `disposition` (enum: pursue/potential/park/discard), `triage_reasoning`, and `growth_observations`. All three fields are in `required`.
- **Rate limiting:** 20 requests per IP per hour, enforced via an in-memory `Map` (`rateMap`).
- **Response format:** NDJSON — one JSON object per line: `{type:"text",delta}`, `{type:"tool_use",name,input}`, `{type:"done"}`, `{type:"error",message}`.

---

## 3. Rendering in app/kiln/page.tsx

`<EvaluatorChat />` is **not rendered** and **not imported**. The import line was deleted in the latest commit.

What is currently in the Evaluator slot of the pipeline section (lines 94–113):

```tsx
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
    {/* live Evaluator embed goes here — next step */}
  </div>
</article>
```

The right-hand column is an empty `<div>` containing only the placeholder comment. Nothing renders there.

---

## 4. Git history

```
569fcde Update Kiln pipeline presentation and add live Evaluator chat.
d28562f Refine Kiln demo UX and add Builder and Deployer to the case study.
8de64cc Update Kiln pipeline section copy for Evaluator, Researcher, and Artifact Creator.
adf6b65 Refine Kiln demo UX and trim the case study page.
a64fd2e Add interactive Kiln pipeline demo to the /kiln case study.
e6ef14e Replace KSM Studio with The Kiln case study at /kiln.
4483032 Refine Meridian project page copy for clarity and narrative flow.
e906e73 Add ProjectThread evolution UI and nest Globetrotter/Atlas under Meridian.
18a0085 Update Meridian assets and reorganize work images.
7152447 Fix Meridian image paths for Vercel deployment.
```

**The most recent commit (`569fcde`) introduced the `EvaluatorChat` component and the `/api/evaluate` route** — the diff shows it added the manual pipeline section layout, the `PIPELINE_GRID` constant, the `EVALUATOR` / `PIPELINE_REST` data split, and the `CaseStudyImage` import. It also removed `CaseStudyScrollDeck`. The `EvaluatorChat` import and `<EvaluatorChat />` tag were added in that commit.

**A subsequent uncommitted edit** (reflected in the working-tree state captured by the system context) removed the `EvaluatorChat` import and replaced the component tag with the placeholder comment. This change is not yet committed — `git diff HEAD~1` still shows the version with `<EvaluatorChat />` present.

---

## Summary

| Item | Status |
|------|--------|
| `EvaluatorChat.tsx` | Exists, fully implemented |
| `/api/evaluate/route.ts` | Exists, calls `claude-sonnet-4-6`, has system prompt + `complete_interview` tool |
| Rendered in `page.tsx` | **No** — import removed, placeholder comment in its place |
| Last commit action | Added the component; subsequent working-tree edit removed it from the page |
