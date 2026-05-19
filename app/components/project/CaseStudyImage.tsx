"use client";

import { useState } from "react";
import {
  mediaShellClass,
  mediaShellClassCompact,
} from "../contentLayout";

type CaseStudyImageProps = {
  src: string;
  alt: string;
  placeholderLabel: string;
  /** Use the compact shell — no `lg+` min-height floor and a capped `lg+`
   * width so the 16/10 aspect produces a shorter card. Default `false`. */
  compact?: boolean;
};

export function CaseStudyImage({
  src,
  alt,
  placeholderLabel,
  compact = false,
}: CaseStudyImageProps) {
  const [failed, setFailed] = useState(false);
  const shellClass = compact ? mediaShellClassCompact : mediaShellClass;

  if (failed) {
    return (
      <div
        className={`${shellClass} flex flex-col items-center justify-center gap-3 bg-[var(--color-bg-elevated)] px-6 text-center`}
        style={{ aspectRatio: "16 / 10" }}
      >
        <span className="label">Image placeholder</span>
        <span className="font-mono text-sm text-[var(--color-fg-subtle)]">
          {placeholderLabel}
        </span>
      </div>
    );
  }

  return (
    <div className={shellClass} style={{ aspectRatio: "16 / 10" }}>
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
