import { loadMarkdownHtml } from "@/lib/projects/markdown";

type ProjectProseProps = {
  contentPath: string;
  missingMessage: string;
};

export async function ProjectProse({
  contentPath,
  missingMessage,
}: ProjectProseProps) {
  const html = await loadMarkdownHtml(contentPath);

  if (!html) {
    return (
      <p className="text-[var(--color-fg-muted)]">
        {missingMessage}{" "}
        <code className="font-mono text-sm">{contentPath}</code>
      </p>
    );
  }

  return <article className="prose" dangerouslySetInnerHTML={{ __html: html }} />;
}
