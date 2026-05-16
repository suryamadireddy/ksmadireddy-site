import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KSM Studio | Krishna Surya Madireddy",
  description:
    "Four-tier agentic system with strict isolation contracts and a multi-pass distillation pipeline.",
};

export default async function KsmStudioPage() {
  const filePath = path.join(process.cwd(), "content", "ksm-studio.md");
  let html = "";
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    html = await marked.parse(raw);
  } catch {
    return (
      <main className="mx-auto max-w-3xl px-3 py-16 md:px-5 md:py-24 lg:px-8">
        <p className="text-[var(--color-fg-muted)]">
          This page could not be loaded. If you&apos;re developing locally,
          ensure <code className="font-mono text-sm">content/ksm-studio.md</code>{" "}
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
        <span className="label">Project notes</span>
      </div>

      <article className="prose" dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
