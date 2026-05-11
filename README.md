# ksmadireddy.com (personal site)

Single-page portfolio + `/atlas` spec page. Built per the project spec.

## Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Geist Sans + Geist Mono (via `geist` package)
- Instrument Serif (via `next/font/google`)
- `marked` for rendering the Atlas spec markdown

## Local dev

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy

Push to a GitHub repo, import into Vercel, deploy. Vercel detects Next.js and ships a preview URL within ~60s. Custom domain configured in Vercel project settings.

## What's stubbed and needs to be replaced before deploy

Search the codebase for these markers to find every placeholder. None of these block local dev — they're production polish.

### Content placeholders

- **`app/components/Story.tsx`** — placeholder copy in the "Story" section. Spec says you write this yourself. Two draft starters are in the file comments.
- **`app/components/Work.tsx`** — Atlas card body is in your voice (placeholder draft); KSM Studio and Meridian Seven copy is AI-draft and needs your edit pass.
- **`app/components/Background.tsx`** — bio paragraph is AI-draft. Edit to your voice. Specifically confirm the automotive company name treatment (keep generic or name it?).
- **`app/components/Hero.tsx`** — the positioning line ("Platform PM building agentic AI systems with design sensibility") is the spec's working line. Replace once you settle on the final phrasing.

### Asset placeholders

- **`public/resume.pdf`** — drop your resume PDF here. The Background section links to it.
- **`public/work/ksm-studio.png`** — KSM Studio screenshot / architecture diagram. Until added, the WorkCard renders a placeholder pattern.
- **`public/work/meridian-seven.png`** — Meridian Seven screenshot.
- **`public/work/atlas.png`** — Atlas mockup (optional for v1).

To wire images: edit `app/components/Work.tsx` and add the `image` prop to each `<WorkCard />`:

```tsx
image={{ src: "/work/meridian-seven.png", alt: "Meridian Seven globe interface" }}
```

### Link placeholders (KSM Studio)

In `app/components/Work.tsx`, the KSM Studio links are marked `pending: true` and don't navigate. Once you have:

1. A Loom (or unlisted YouTube) walkthrough recorded → set the "Watch walkthrough" `href`, remove `pending: true`.
2. A public version of the README → set the "Read README" `href`, remove `pending: true`.

## Design tokens

All in `app/globals.css` under `@theme`. Current palette is warm monochrome — no accent color committed yet (spec rule). When you decide on one, add `--color-accent` to the theme block and apply it sparingly (a single hover state or a single underline color).

Typography:
- `.display` — Instrument Serif, used for h1/h2 and hero
- `.label` — Geist Mono, small caps letterspaced, used for section markers
- Body — Geist Sans, 17px mobile / 18px desktop, line-height 1.6
