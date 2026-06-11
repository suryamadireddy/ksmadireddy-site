# ksmadireddy.com (personal site)

Single-page portfolio with deep case-study pages for each project.

## Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Geist Sans + Geist Mono (via `geist` package)
- Instrument Serif (via `next/font/google`)

## Local dev

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy

Push to GitHub, import into Vercel, deploy. Vercel detects Next.js and ships a preview URL within ~60s. Custom domain configured in Vercel project settings.

## Architecture

### Homepage (`app/page.tsx`)

Renders `<Background />` then `<Work />`. `Work.tsx` is just:

```tsx
<HeroIntro />
{projects.map((project) => <WorkCard key={project.slug} {...project.card} />)}
```

Everything visible on the homepage is driven by **`lib/projects/registry.tsx`** — the single source of truth for the homepage cards. Adding, removing, or reordering a project on the homepage is one edit to that array.

### Project pages (`app/<slug>/page.tsx`)

Each project gets a route under `app/`. The current set:

- `app/aboutme/page.tsx`
- `app/dreamspace/page.tsx`
- `app/atelier/page.tsx` — Atelier studio page; Kiln case study lives here. Legacy `/kiln`, `/ksm-studio`, and `/thekiln` redirect to `/atelier` (see `next.config.ts`).
- `app/meridian/page.tsx` — plus **`app/meridian/layout.tsx`**, which wraps Globetrotter, Meridian, and Atlas in one shell (`Globetrotter` and `Atlas` live at `app/meridian/globetrotter/page.tsx` and `app/meridian/atlas/page.tsx`). Legacy `/atlas` and `/globetrotter` URLs redirect to `/meridian/atlas` and `/meridian/globetrotter`.
- `app/placemaking/page.tsx`

Pages share a small set of case-study primitives from `app/components/project/`:

- **`ProjectShell`** — page chrome (KSM mark, title, back-link, max-width container).
- **`CaseStudySection`** — labeled section with a sticky left rail on `lg+`. Every section has a label.
- **`CaseStudyProse`** — paragraph list with consistent type + spacing.
- **`CaseStudyImage`** — `16/10` image with a graceful placeholder fallback if the asset is missing.
- **`CaseStudyScrollDeck`** — vertical list of `CaseStudyCardItem` (title + paragraphs + image). Used by Meridian's experience deck.
- **`CaseStudySpecAccordion`** — horizontal-on-desktop / vertical-on-mobile accordion. Used by Atlas's "Project Specifications" section.
- **`ProjectEmbed`** — sized iframe for live previews. Used by Meridian.

Each page co-locates its own `metadata` export.

### Docs (`docs/`)

Markdown specs only (not imported at build time). See [`docs/README.md`](docs/README.md). Portfolio routes live under `app/<slug>/`; shared primitives under `app/components/project/`. Large pages (e.g. Atelier) co-locate UI next to `page.tsx` under the same route folder.

### Components (`app/components/`)

- **`HeroIntro.tsx`** — homepage hero (typewriter + adaptive font sizing). Holds the 4-line constraint logic.
- **`HeroLinks.tsx`** — contact links beneath the hero.
- **`Work.tsx`** — homepage list wrapper.
- **`WorkCard.tsx`** — single homepage card (image + title + tagline).
- **`Background.tsx`** — color-scheme + global background.
- **`ColorSchemeToggle.tsx`** — light/dark toggle.
- **`contentLayout.ts`** — shared CSS class strings for content width, grid, media shells. Read this before touching layout-related className strings.

## Adding a new project

1. Create `app/<slug>/page.tsx`. Copy an existing one (Atlas or Meridian are the most-featured templates) and adapt.
2. Add an entry to the `projects` array in `lib/projects/registry.tsx` — `slug`, `card.title`, `card.tagline`, `card.mediaHref`, `card.image`.
3. Drop the homepage card image into `public/work/`.
4. (Optional) Drop section images into `public/work/<slug>/` and reference them via `<CaseStudyImage src="..." />`.

## What's stubbed and needs to be replaced before deploy

Search the codebase for these markers to find every placeholder. None of these block local dev — they're production polish.

### Asset placeholders

- **`public/resume.pdf`** — drop your resume PDF here. The About card links to it.
- Section images for each case study live under `public/work/<slug>/`. Anything missing falls back to a `CaseStudyImage` placeholder showing the expected path, so it's safe to ship with gaps.

## Design tokens

All in `app/globals.css` under `@theme`. Current palette is warm monochrome — no accent color committed yet. When you add one, drop `--color-accent` into the theme block and apply it sparingly (a single hover state or a single underline color).

Typography:

- `.display` — Instrument Serif, used for h1/h2 and hero
- `.label` — Geist Mono, small caps letterspaced, used for section markers
- Body — Geist Sans, 17px mobile / 18px desktop, line-height 1.6
