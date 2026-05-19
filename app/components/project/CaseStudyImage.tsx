"use client";

import { useState } from "react";
import { mediaShellClass } from "../contentLayout";

type CaseStudyImageProps = {
  src: string;
  alt: string;
  placeholderLabel: string;
};

export function CaseStudyImage({
  src,
  alt,
  placeholderLabel,
}: CaseStudyImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`${mediaShellClass} flex aspect-[16/10] flex-col items-center justify-center gap-3 bg-[var(--color-bg-elevated)] px-6 text-center`}
      >
        <span className="label">Image placeholder</span>
        <span className="font-mono text-sm text-[var(--color-fg-subtle)]">
          {placeholderLabel}
        </span>
      </div>
    );
  }

  return (
    <div className={mediaShellClass} style={{ aspectRatio: "16 / 10" }}>
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
