import type { Metadata } from "next";

const siteName = "Krishna Surya Madireddy";

export function projectMetadata({
  title,
  description,
  titleFormat = "pipe",
}: {
  title: string;
  description: string;
  titleFormat?: "pipe" | "emdash";
}): Metadata {
  const pageTitle =
    titleFormat === "emdash" ? `${title} — ${siteName}` : `${title} | ${siteName}`;

  return { title: pageTitle, description };
}
