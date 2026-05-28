"use client";

import Link from "next/link";
import type { MouseEvent } from "react";

export type AtelierKilnCurrent = "atelier" | "kiln";

type ThreadStep = {
  id: AtelierKilnCurrent;
  href: string;
  spineLabel: string;
  name: string;
  descriptor: string;
  blurb: string;
};

const STEPS: ThreadStep[] = [
  {
    id: "atelier",
    href: "/atelier",
    spineLabel: "Atelier",
    name: "Atelier",
    descriptor: "the studio",
    blurb: "Where ideas become things",
  },
  {
    id: "kiln",
    href: "/kiln",
    spineLabel: "Kiln",
    name: "Kiln",
    descriptor: "the engine",
    blurb: "Turns an idea into a brief",
  },
];

type AtelierKilnThreadProps = {
  current: AtelierKilnCurrent;
};

export function AtelierKilnThread({ current }: AtelierKilnThreadProps) {
  return (
    <nav className="project-thread" aria-label="Project navigation">
      {STEPS.map((step) => {
        const isCurrent = step.id === current;

        const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
          if (!isCurrent) return;
          if (
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey ||
            event.button !== 0
          ) {
            return;
          }
          event.preventDefault();
        };

        return (
          <Link
            key={step.id}
            href={step.href}
            scroll={false}
            className={`project-thread-node${isCurrent ? " project-thread-node--current" : ""}`}
            data-state={isCurrent ? "open" : "closed"}
            aria-label={`${step.name} — ${step.descriptor}`}
            aria-current={isCurrent ? "page" : undefined}
            onClick={handleClick}
          >
            <span className="project-thread-spine" aria-hidden="true">
              {step.spineLabel}
            </span>
            <div className="project-thread-panel">
              <div
                className={
                  isCurrent
                    ? "project-thread-dot project-thread-dot--filled"
                    : "project-thread-dot project-thread-dot--hollow"
                }
              />
              <div className="project-thread-name">{step.name}</div>
              <div className="project-thread-desc">{step.descriptor}</div>
              <div className="project-thread-blurb">{step.blurb}</div>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
