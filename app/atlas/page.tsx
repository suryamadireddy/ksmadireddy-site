import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Atlas — Spec | Krishna Surya Madireddy",
  description:
    "The working spec for Atlas, a queryable atlas of how the world works. Forked from Meridian Seven.",
};

export default async function AtlasPage() {
  const filePath = path.join(process.cwd(), "content", "atlas-spec.md");
  let html = "";
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    html = await marked.parse(raw);
  } catch {
    return (
      <main className="mx-auto max-w-3xl px-3 py-16 md:px-5 md:py-24 lg:px-8">
        <p className="text-[var(--color-fg-muted)]">
          The spec file could not be loaded. If you&apos;re developing locally,
          ensure{" "}
          <code className="font-mono text-sm">content/atlas-spec.md</code>{" "}
          exists.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto px-3 md:px-5 lg:px-8 max-w-3xl py-16 md:py-24">
      <Link
        href="/"
        className="label inline-flex items-center gap-2 mb-12 md:mb-16 hover:text-[var(--color-fg)] transition-colors"
      >
        <span aria-hidden>←</span>
        <span>Krishna Surya Madireddy</span>
      </Link>

      <div className="mb-12 md:mb-16">
        <span className="label">Working spec</span>
      </div>

      {/* Framing intro — why this is public */}
      <div className="max-w-[60ch] mb-16 md:mb-20 space-y-4 text-lg md:text-xl leading-relaxed text-[var(--color-fg-muted)]">
        <p>
          Atlas isn&apos;t built yet. This is the spec I&apos;m working from,
          posted because the iteration story — built Meridian Seven, used it,
          realized news wasn&apos;t the framing I wanted — is most of what
          I&apos;d want a hiring manager to see.
        </p>
        <p>
          The document below is the working version, unchanged. It&apos;s
          written for me, not for an audience. That&apos;s the point.
        </p>
      </div>

      <article className="prose" dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
