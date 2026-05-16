"use client";

export default function Error({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex min-h-[50vh] max-w-lg flex-col justify-center gap-6 px-3 py-16">
      <h1 className="display text-2xl text-[var(--color-fg)]">Something broke</h1>
      <p className="text-[var(--color-fg-muted)]">
        Try again, or refresh the page. If this keeps happening after a deploy,
        check the browser console and deployment logs.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="self-start rounded border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] px-4 py-2 text-sm font-medium text-[var(--color-fg)] hover:border-[var(--color-fg)]"
      >
        Try again
      </button>
    </main>
  );
}
