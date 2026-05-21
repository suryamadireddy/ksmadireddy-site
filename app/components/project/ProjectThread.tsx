"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";

export type ProjectThreadCurrent = "globetrotter" | "meridian" | "atlas";

type ThreadStep = {
  id: ProjectThreadCurrent;
  href: string;
  year: string;
  /** Uppercase mono spine label (lg+ collapsed), matches spec-accordion rail style */
  spineLabel: string;
  name: string;
  descriptor: string;
  blurb: string;
};

const STEPS: ThreadStep[] = [
  {
    id: "globetrotter",
    href: "/meridian/globetrotter",
    year: "2024",
    spineLabel: "Globetrotter",
    name: "Globetrotter",
    descriptor: "the experiment",
    blurb: "Travel tracker. The first globe.",
  },
  {
    id: "meridian",
    href: "/meridian",
    year: "2025",
    spineLabel: "Meridian",
    name: "Meridian",
    descriptor: "the product",
    blurb: "Geospatial news. The current globe.",
  },
  {
    id: "atlas",
    href: "/meridian/atlas",
    year: "2026",
    spineLabel: "Atlas",
    name: "Atlas",
    descriptor: "the vision",
    blurb: "Queryable interface. The next globe.",
  },
];

type ProjectThreadProps = {
  current: ProjectThreadCurrent;
};

export function ProjectThread({ current }: ProjectThreadProps) {
  const children: ReactNode[] = [];

  STEPS.forEach((step) => {
    const isCurrent = step.id === current;
    const state = isCurrent ? "open" : "closed";
    const ariaLabel = `${step.name}, ${step.year} — ${step.descriptor}`;

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

    const panel = (
      <div className="project-thread-panel">
        <div
          className={
            isCurrent
              ? "project-thread-dot project-thread-dot--filled"
              : "project-thread-dot project-thread-dot--hollow"
          }
        />
        <div className="project-thread-year">{step.year}</div>
        <div className="project-thread-name">{step.name}</div>
        <div className="project-thread-desc">{step.descriptor}</div>
        <div className="project-thread-blurb">{step.blurb}</div>
      </div>
    );

    children.push(
      <Link
        key={step.id}
        href={step.href}
        scroll={false}
        className={`project-thread-node${isCurrent ? " project-thread-node--current" : ""}`}
        data-state={state}
        aria-label={ariaLabel}
        aria-current={isCurrent ? "page" : undefined}
        onClick={handleClick}
      >
        <span className="project-thread-spine" aria-hidden="true">
          {step.spineLabel}
        </span>
        {panel}
      </Link>,
    );
  });

  return (
    <nav className="project-thread" aria-label="Project evolution">
      {children}
    </nav>
  );
}
