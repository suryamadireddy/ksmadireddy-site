import Image from "next/image";

type Status = "BUILDING" | "SHIPPED" | "DESIGNING";

type Link = {
  label: string;
  href: string;
  /** mark as TBD/placeholder so it renders muted */
  pending?: boolean;
};

export type WorkCardProps = {
  index: string; // "01", "02", "03"
  status: Status;
  year: string;
  title: string;
  tagline: string;
  body: React.ReactNode;
  image?: {
    src: string;
    alt: string;
    aspectRatio?: string; // e.g. "16/10", default "16/10"
  };
  links: Link[];
};

export function WorkCard({
  index,
  status,
  year,
  title,
  tagline,
  body,
  image,
  links,
}: WorkCardProps) {
  return (
    <article className="py-12 md:py-20 border-t border-[var(--color-border)] first:border-t-0">
      <div className="flex items-center gap-4 mb-6">
        <span className="label">{index}</span>
        <span className="label">·</span>
        <span className="label">{status}</span>
        <span className="label">·</span>
        <span className="label">{year}</span>
      </div>

      <h3 className="display text-4xl md:text-5xl lg:text-6xl mb-4">{title}</h3>

      <p className="text-xl md:text-2xl text-[var(--color-fg-muted)] max-w-[55ch] mb-10 md:mb-12 leading-snug">
        {tagline}
      </p>

      {/* Image / screenshot */}
      <div
        className="relative w-full mb-10 md:mb-12 overflow-hidden rounded-md bg-[var(--color-bg-elevated)] border border-[var(--color-border)]"
        style={{ aspectRatio: image?.aspectRatio ?? "16 / 10" }}
      >
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 768px) 720px, 100vw"
            className="object-cover"
          />
        ) : (
          <ScreenshotPlaceholder title={title} />
        )}
      </div>

      <div className="max-w-[60ch] space-y-4 text-base md:text-lg leading-relaxed mb-8 md:mb-10">
        {body}
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-3">
        {links.map((link) => {
          const rowClass = `inline-flex items-baseline gap-2 text-sm md:text-base font-medium underline decoration-1 underline-offset-[6px] transition-[text-decoration-color] duration-200 ${
            link.pending
              ? "text-[var(--color-fg-subtle)] decoration-[var(--color-border)] cursor-not-allowed"
              : "decoration-[var(--color-border-strong)] hover:decoration-[var(--color-fg)]"
          }`;
          const suffix = (
            <span
              aria-hidden
              className={
                link.pending
                  ? "text-[var(--color-fg-subtle)]"
                  : "text-[var(--color-fg-muted)]"
              }
            >
              {link.pending ? "tbd" : "→"}
            </span>
          );
          if (link.pending) {
            return (
              <span
                key={link.label}
                className={rowClass}
                aria-disabled="true"
              >
                {link.label}
                {suffix}
              </span>
            );
          }
          return (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className={rowClass}
            >
              {link.label}
              {suffix}
            </a>
          );
        })}
      </div>
    </article>
  );
}

function ScreenshotPlaceholder({ title }: { title: string }) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, transparent 0 8px, rgba(0,0,0,0.025) 8px 9px)",
      }}
    >
      <span className="label text-[var(--color-fg-subtle)]">
        {title} — screenshot
      </span>
    </div>
  );
}
