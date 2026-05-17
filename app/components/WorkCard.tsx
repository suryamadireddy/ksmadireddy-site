import Link from "next/link";
import type { ReactNode } from "react";

type WorkCardCommon = {
  title: string;
  tagline: ReactNode;
  body?: ReactNode;
};

/** Embed is usable in-page (no overlay navigation). Omit `mediaHref`. */
type WorkCardEmbedInteractive = WorkCardCommon & {
  embed: string;
  interactiveEmbed: true;
  image?: never;
  mediaHref?: never;
};

/** Embed preview is a single click target to `mediaHref`. */
type WorkCardEmbedLinked = WorkCardCommon & {
  embed: string;
  interactiveEmbed?: false;
  image?: never;
  mediaHref: string;
};

type WorkCardImage = WorkCardCommon & {
  image: {
    src: string;
    alt: string;
    aspectRatio?: string;
    /** Default `contain`. Use `cover` to fill the frame (e.g. photos). */
    objectFit?: "contain" | "cover";
    objectPosition?: string;
  };
  embed?: never;
  interactiveEmbed?: never;
  mediaHref: string;
};

export type WorkCardProps =
  | WorkCardEmbedInteractive
  | WorkCardEmbedLinked
  | WorkCardImage;

const measure = "max-w-[84rem]";

const workTitleClass =
  "font-mono font-medium uppercase tracking-[0.05em] md:tracking-[0.048em] leading-[1.12] text-2xl md:text-3xl lg:text-4xl";

const mediaShellClass =
  "relative w-full min-h-[240px] overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-bg-elevated)] sm:min-h-[320px] lg:min-h-[380px]";

const mediaHoverClass =
  "block w-full rounded-md outline-none transition-transform duration-300 ease-out motion-safe:hover:scale-[1.02] motion-safe:focus-visible:scale-[1.02] focus-visible:ring-2 focus-visible:ring-[var(--color-fg)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-bg)]";

function isExternalHref(href: string) {
  return href.startsWith("http");
}

export function WorkCard(props: WorkCardProps) {
  const { title, tagline, body } = props;

  let mediaBlock: ReactNode;

  if ("embed" in props && props.embed) {
    if (props.interactiveEmbed) {
      mediaBlock = (
        <div className={`${mediaShellClass} aspect-[16/10]`}>
          <iframe
            src={props.embed}
            className="absolute inset-0 h-full w-full border-0"
            title={`${title} — live`}
            loading="lazy"
          />
        </div>
      );
    } else {
      const { embed, mediaHref } = props;
      const external = isExternalHref(mediaHref);
      const overlayLabel = `Open ${title} — live site`;
      mediaBlock = (
        <div className="rounded-md focus-within:ring-2 focus-within:ring-[var(--color-fg)] focus-within:ring-offset-4 focus-within:ring-offset-[var(--color-bg)]">
          <div
            className={`${mediaShellClass} aspect-[16/10] transition-transform duration-300 ease-out motion-safe:hover:scale-[1.02] motion-safe:focus-within:scale-[1.02]`}
          >
            <iframe
              src={embed}
              className="pointer-events-none absolute inset-0 h-full w-full border-0"
              title={`${title} — preview`}
              loading="lazy"
            />
            <a
              href={mediaHref}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="absolute inset-0 z-10 rounded-[inherit] outline-none"
              aria-label={overlayLabel}
            />
          </div>
        </div>
      );
    }
  } else if ("image" in props && props.image) {
    const { image, mediaHref } = props;
    const external = isExternalHref(mediaHref);
    const inner = (
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

    mediaBlock = external ? (
      <a
        href={mediaHref}
        target="_blank"
        rel="noopener noreferrer"
        className={mediaHoverClass}
      >
        {inner}
      </a>
    ) : (
      <Link href={mediaHref} className={mediaHoverClass}>
        {inner}
      </Link>
    );
  } else {
    mediaBlock = null;
  }

  return (
    <article className="py-12 md:py-20 first:pt-0 last:pb-0">
      <div
        className={`${measure} grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] xl:gap-12`}
      >
        <div className="min-w-0">
          <h3 className={`${workTitleClass} mb-4`}>{title}</h3>
          <p className="text-base md:text-lg leading-snug text-[var(--color-fg-muted)]">
            {tagline}
          </p>
          {body ? (
            <div className="mt-6 space-y-4 text-base md:text-lg leading-relaxed text-[var(--color-fg-muted)]">
              {body}
            </div>
          ) : null}
        </div>

        {mediaBlock ? <div className="min-w-0 w-full">{mediaBlock}</div> : null}
      </div>
    </article>
  );
}
