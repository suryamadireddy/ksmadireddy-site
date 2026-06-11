# Atlas — Project Spec (final)

> **Location:** `docs/atlas-spec.md` — product spec only; not imported by the app. Portfolio case study: `app/meridian/atlas/page.tsx` (`/meridian/atlas`).

## What we're building

Atlas is a queryable atlas of how the world works. A spatial-knowledge interface where curious people land on a globe and explore — by querying in natural language ("show me cobalt mines," "show me the Silk Road in 200 CE," "show me species ranges in Borneo") and getting beautiful, accurate, on-globe visualizations with concise sourced context.

Atlas is forked from Meridian Seven, which remains the news-visualization product. Atlas inherits Meridian's technical patterns but has its own codebase, identity, and content. News is not a layer in Atlas — that's Meridian's job. Atlas is evergreen.

Mental model: Google Earth used like Google. A beautiful globe; a query bar that turns natural language into the right visualization, layered over real data.

## What's inherited from Meridian (as patterns, not code)

Borrow the patterns, re-implement in the new codebase:
- Globe rendering via globe.gl
- Pin-based UI with tap-to-expand exhibit panel
- Supabase Postgres + RLS for persistence
- Claude API for content synthesis
- Admin endpoints for data refresh, protected by secret header
- Neutral, wire-service tone for exhibit copy

Fork pattern, not git branch. New repo, new design system, new everything — Meridian stays untouched as its own artifact.

## Core invariants — never violated

1. **The AI never invents geographic data.** It routes natural-language queries into operations on real, sourced layers. No hallucinated maps. If no layer fits, refuse cleanly with a hint at what's available.
2. **Neutral, sourced exhibit copy.** Borrow Meridian's wire-service tone. Every exhibit names its source. Editorial restraint is the standard.
3. **Taste over feature density.** Two well-curated layers beat fifteen sparse ones. Restraint is the design language.
4. **Curiosity-led, not duty-led.** No notifications, no streaks, no "stay informed" framing. The user wanders by choice.
5. **The globe earns its place on every screen.** If something doesn't benefit from being spatial, it doesn't go on the globe.

## v1 scope

**In:**
- A new Next.js + TypeScript project, new domain (atlas.app, useatlas.com, atlasglobe.com — whatever's available and short)
- globe.gl-based globe
- Discover view as the landing experience (specified below)
- A natural-language query bar prominently placed
- A layer registry (new module)
- Two initial layers: minerals (USGS) and one historical layer (empires or trade routes — pick whichever has cleaner data)
- Claude-based query routing endpoint
- Tap-to-expand exhibit panel, layer-aware
- Light/dark theme, restrained palette, designer-grade typography

**Out (v2 or later):**
- News (Meridian's domain, deliberately excluded)
- More than two layers in v1
- Real-time data (ships, planes, satellites)
- Historical animation (empire borders moving over time)
- Personalization, accounts, "for you" feed
- 3D digital twins, on-demand 3D models
- Monetization

## Discover view (the landing experience)

When a user lands on Atlas, the globe is already populated with a curated cross-section rather than a single layer:

- Five to ten pins visible across both available layers, geographically distributed
- Each pin is a "teaser exhibit" the user can tap to see what an exhibit looks like
- The query bar is prominently visible at top with placeholder text rotating through example queries ("show me cobalt mines," "show me the Roman empire at its peak," "where are tin mines concentrated")
- A small "layers" indicator shows which layers are currently active (with toggle)
- Subtle copy near the query bar: "What do you want to see?" — invitational, not instructional

The discover view's job is to make the product legible in five seconds. The user should understand: this is a globe; I can ask it things; here are examples of what I can ask; here's what an answer looks like.

## Layer interface (new module)

Every layer implements:
- `id`: unique identifier
- `name`: human-readable label  
- `description`: one sentence for the Claude query router
- `querySchema`: arguments the layer accepts (e.g., minerals takes `{ mineral?: string, country?: string }`)
- `fetch(args)`: returns features (lat/lng + metadata)
- `renderPin(feature)`: how a pin looks on the globe for this layer
- `renderExhibit(feature)`: what the tap-to-expand panel shows for this layer

Each layer lives in `/lib/layers/` as an independent module. Adding a new layer is contained — no changes to the rest of the codebase needed.

## Query routing (new endpoint)

`/api/query` accepts a natural-language string. Calls Claude with the full layer registry as context. Returns either:
- `{ layer: string, args: object, explanation: string }` — routes to the named layer with parsed args, plus a one-sentence note about what's being shown
- `{ error: "no_layer_match", available_layers: string[], suggestion: string }` — no layer fits; tell the user what's available and suggest a related query that would work

The LLM never generates geographic data itself. It chooses layers and parses arguments from a fixed registry. The registry is its tool list.

## First milestone (build this and stop)

1. Set up the new Atlas project: fresh Next.js scaffold, new Supabase project, Vercel deployment, custom domain.
2. Implement the globe and the layer interface.
3. Build the minerals layer end-to-end: USGS data load, pin rendering, exhibit panel with sourced exhibit copy.
4. Build the query bar component.
5. Build the query routing endpoint.
6. Wire together: typing "show me cobalt mines" routes to the minerals layer and re-renders the globe with mineral pins.

If that single end-to-end loop works and feels delightful, the rest is repetition. Adding the historical layer afterward is the same shape of work.

## Tech stack

- Next.js App Router + TypeScript
- globe.gl
- Supabase Postgres + RLS
- Anthropic Claude API (Opus for query routing, Sonnet for bulk content)
- Vercel deployment
- PostHog analytics
- No GNews API (news is Meridian's domain)

## Initial data sources

- **Minerals layer:** USGS Mineral Resources Data System
- **Historical layer:** pick one — Running Reality, GeaCron-style datasets, or a curated trade-route dataset. The one with cleanest, most permissive data wins.

For each layer, build a small adapter that normalizes the source into the layer interface's feature format. Cache aggressively.

## Design principles

- One thing on screen at a time, presented well, beats five things competing for attention.
- The first three seconds matter. Globe loads beautifully, query bar invites a question, nothing else competes.
- Transitions should feel earned, not flashy.
- Borrow from the best museums: white space, confident typography, restraint, the curator's voice.
- Atlas has its own visual language — don't import Meridian's palette or type system by default.

## Working preferences

- Layer interface gets designed and reviewed before any layer is written.
- Build the minerals layer end-to-end before starting the historical layer — prove the abstraction works.
- Direct pushback over agreement. If a part of this spec is wrong, push back.
- Checkpoint after the first end-to-end loop, evaluate before adding the second layer.
- v1 simplicity. Two layers, not five. The "out of scope" list is a contract.
