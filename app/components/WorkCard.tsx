import Link from "next/link";
import type { ReactNode } from "react";
import { contentGrid, mediaShellClass } from "./contentLayout";

export type WorkCardProps = {
  title: string;
  /** Project page — title links here; image becomes a click target to the same URL. */
  mediaHref: string;
  tagline: ReactNode;
  image: {
    src: string;
    alt: string;
    aspectRatio?: string;
    /** Default `contain`. Use `cover` to fill the frame (e.g. photos). */
    objectFit?: "contain" | "cover";
    objectPosition?: string;
  };
};

const mediaHoverClass =
  "block w-full rounded-md outline-none transition-transform duration-300 ease-out motion-safe:hover:scale-[1.02] motion-safe:focus-visible:scale-[1.02] focus-visible:ring-2 focus-visible:ring-[var(--color-fg)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-bg)]";

function isExternalHref(href: string) {
  return href.startsWith("http");
}

function WorkCardTitle({ title, href }: { title: string; href: string }) {
  const className = "work-card-title-link";

  if (isExternalHref(href)) {
    return (
      <h3 className="m-0 mb-4">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {title}
        </a>
      </h3>
    );
  }

  return (
    <h3 className="m-0 mb-4">
      <Link href={href} className={className} prefetch>
        {title}
      </Link>
    </h3>
  );
}

export function WorkCard({ title, mediaHref, tagline, image }: WorkCardProps) {
  const external = isExternalHref(mediaHref);
  const mediaShell = (
    <div
      className={mediaShellClass}
      style={{ aspectRatio: image.aspectRatio ?? "16 / 10" }}
    >
      <img
        src={image.src}
        alt={image.alt}
        className={`absolute inset-0 h-full w-full ${
          image.objectFit === "cover" ? "object-cover" : "object-contain"
        }`}
        style={{ objectPosition: image.objectPosition ?? "center" }}
        loading="lazy"
      />
    </div>
  );

  const mediaBlock = external ? (
    <a
      href={mediaHref}
      target="_blank"
      rel="noopener noreferrer"
      className={mediaHoverClass}
    >
      {mediaShell}
    </a>
  ) : (
    <Link href={mediaHref} className={mediaHoverClass}>
      {mediaShell}
    </Link>
  );

  return (
    <article className="py-12 md:py-20 first:pt-0 last:pb-0">
      <div className={contentGrid}>
        <div className="relative z-10 min-w-0">
          <WorkCardTitle title={title} href={mediaHref} />
          <div className="text-base md:text-lg leading-snug text-[var(--color-fg-muted)]">
            {tagline}
          </div>
        </div>
        <div className="min-w-0 w-full">{mediaBlock}</div>
      </div>
    </article>
  );
}
