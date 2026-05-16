import Link from "next/link";
import type { ReactNode } from "react";

type Status = "BUILDING" | "SHIPPED" | "DESIGNING";

type WorkCardCommon = {
  status?: Status;
  title: string;
  tagline: string;
  body: ReactNode;
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
  };
  embed?: never;
  interactiveEmbed?: never;
  mediaHref: string;
};

export type WorkCardProps =
  | WorkCardEmbedInteractive
  | WorkCardEmbedLinked
  | WorkCardImage;

const measure = "max-w-4xl";

function isExternalHref(href: string) {
  return href.startsWith("http");
}

export function WorkCard(props: WorkCardProps) {
  const { status, title, tagline, body } = props;

  const ringWrap =
    "mb-10 md:mb-12 rounded-md focus-within:ring-2 focus-within:ring-[var(--color-fg)] focus-within:ring-offset-4 focus-within:ring-offset-[var(--color-bg)]";

  const mediaScale =
    "relative w-full overflow-hidden rounded-md border border-[var(--color-border)] transition-transform duration-300 ease-out motion-safe:hover:scale-[1.02] motion-safe:focus-within:scale-[1.02]";

  const mediaFrame =
    "relative w-full overflow-hidden rounded-md border border-[var(--color-border)]";

  const imageLinkClass =
    "block w-full mb-10 md:mb-12 rounded-md outline-none transition-transform duration-300 ease-out motion-safe:hover:scale-[1.02] motion-safe:focus-visible:scale-[1.02] focus-visible:ring-2 focus-visible:ring-[var(--color-fg)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-bg)]";

  let mediaBlock: ReactNode;

  if ("embed" in props && props.embed) {
    if (props.interactiveEmbed) {
      mediaBlock = (
        <div
          className="relative mb-10 md:mb-12 w-full overflow-hidden rounded-md border border-[var(--color-border)]"
          style={{ height: "600px" }}
        >
          <iframe
            src={props.embed}
            className="h-full w-full border-0"
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
        <div className={ringWrap}>
          <div className={mediaScale} style={{ height: "600px" }}>
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
        className={`${mediaFrame} bg-[var(--color-bg-elevated)]`}
        style={{ aspectRatio: image.aspectRatio ?? "16 / 10" }}
      >
        <img
          src={image.src}
          alt={image.alt}
          className="absolute inset-0 h-full w-full object-contain object-center"
          loading="lazy"
        />
      </div>
    );

    mediaBlock = external ? (
      <a
        href={mediaHref}
        target="_blank"
        rel="noopener noreferrer"
        className={imageLinkClass}
      >
        {inner}
      </a>
    ) : (
      <Link href={mediaHref} className={imageLinkClass}>
        {inner}
      </Link>
    );
  } else {
    mediaBlock = null;
  }

  return (
    <article className="py-12 md:py-20 border-t border-[var(--color-border)] first:border-t-0">
      <div className={measure}>
        {status ? (
          <div className="mb-6">
            <span className="label">{status}</span>
          </div>
        ) : null}

        <h3 className="display text-4xl md:text-5xl lg:text-6xl mb-4">{title}</h3>

        <p className="text-xl md:text-2xl text-[var(--color-fg-muted)] max-w-[62ch] mb-10 md:mb-12 leading-snug">
          {tagline}
        </p>
      </div>

      {mediaBlock}

      <div className={measure}>
        <div className="max-w-[62ch] space-y-4 text-base md:text-lg leading-relaxed text-[var(--color-fg-muted)]">
          {body}
        </div>
      </div>
    </article>
  );
}
