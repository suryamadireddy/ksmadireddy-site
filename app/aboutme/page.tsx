import Link from "next/link";
import type { Metadata } from "next";
import { Background } from "../components/Background";

export const metadata: Metadata = {
  title: "About — Krishna Surya Madireddy",
  description:
    "Background — GM platform PM, building across the U.S., India, and Southeast Asia.",
};

export default function AboutMePage() {
  return (
    <main className="mx-auto w-full min-w-0 max-w-6xl px-3 md:px-5 lg:px-10 py-16 md:py-24">
      <Link
        href="/"
        className="label mb-12 inline-flex items-center gap-2 md:mb-16 hover:text-[var(--color-fg)] transition-colors"
      >
        <span aria-hidden>←</span>
        <span>Krishna Surya Madireddy</span>
      </Link>

      <Background />
    </main>
  );
}
