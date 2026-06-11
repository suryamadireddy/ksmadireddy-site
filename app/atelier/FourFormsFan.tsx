"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

/* An illustration of the concept — not live output. No run/regenerate
 * affordances, no input, no implication the choice just happened. */

const IDEA = "A quiet third place where time slows down.";
const CAPTION = "The studio chooses the form. Restraint is the law.";

const FORMS = [
  "A single hard sentence",
  "A short prose take",
  "A rough sketch",
  "A clickable prototype",
  "A side-by-side comparison",
  "A one-page brief",
];
const CHOSEN_INDEX = 2; // "A rough sketch" — a spatial idea has to be seen first.

/* Signed distance from center drives rotation; its square drives the
 * arc drop. Same geometry as the Phase 1 placeholder. */
const CARD_OFFSETS = [-2.5, -1.5, -0.5, 0.5, 1.5, 2.5];

/* The component renders the end state by default (SSR, no-JS, reduced
 * motion, mobile). With motion allowed on desktop, JS rewinds to "pre"
 * and plays once: settle (rise into the arc) → hold → converge. */
type Stage = "pre" | "open" | "end";

const HOLD_UNTIL_CONVERGE_MS = 1800;

export function FourFormsFan() {
  const [stage, setStage] = useState<Stage>("end");
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = rootRef.current;
    if (!root) return;

    let played = false;
    let convergeTimer: ReturnType<typeof setTimeout> | undefined;

    setStage("pre");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || played) return;
        played = true;
        observer.disconnect();
        // Let the rewound "pre" frame paint before transitioning out of it.
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            setStage("open");
            convergeTimer = setTimeout(
              () => setStage("end"),
              HOLD_UNTIL_CONVERGE_MS,
            );
          }),
        );
      },
      { threshold: 0.4 },
    );
    observer.observe(root);

    return () => {
      observer.disconnect();
      if (convergeTimer) clearTimeout(convergeTimer);
    };
  }, []);

  return (
    <figure
      ref={rootRef}
      className={`four-forms-fan stage-${stage} mt-10 md:mt-12`}
    >
      <p className="display text-center text-xl md:text-2xl text-[var(--color-fg)]">
        {IDEA}
      </p>

      <div className="fan-row">
        {FORMS.map((label, index) => (
          <div
            key={label}
            className={
              index === CHOSEN_INDEX ? "fan-card fan-card--chosen" : "fan-card"
            }
            style={
              {
                "--fan-rotate": `${CARD_OFFSETS[index] * 4}deg`,
                "--fan-drop": `${CARD_OFFSETS[index] * CARD_OFFSETS[index] * 4.5}px`,
                "--fan-delay": `${index * 70}ms`,
              } as CSSProperties
            }
          >
            <span className="fan-card-label">{label}</span>
          </div>
        ))}
      </div>

      <figcaption className="fan-caption">{CAPTION}</figcaption>

      <style jsx>{`
        .fan-row {
          margin-top: 1.5rem;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.5rem;
        }

        .fan-card {
          aspect-ratio: 3 / 4;
          border-radius: 0.375rem;
          border: 1px solid var(--color-border);
          background: var(--color-bg-elevated);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
          text-align: center;
          opacity: 0.45;
        }
        .fan-card--chosen {
          opacity: 1;
          border-color: var(--color-border-strong);
        }

        .fan-card-label {
          font-family: var(--font-mono);
          font-size: 10px;
          line-height: 1.5;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--color-fg-muted);
        }
        .fan-card--chosen .fan-card-label {
          color: var(--color-fg);
        }

        .fan-caption {
          margin-top: 2rem;
          text-align: center;
          font-size: 0.875rem;
          color: var(--color-fg-subtle);
        }

        /* Desktop: the shallow arc, with the three-beat sequence layered
         * on top of the same end state mobile renders statically. */
        @media (min-width: 640px) {
          .fan-row {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            gap: 1rem;
            margin-top: 2rem;
          }
          .fan-card {
            width: 6.5rem;
            flex: none;
            transform: translateY(var(--fan-drop)) rotate(var(--fan-rotate))
              scale(0.96);
            filter: blur(1px);
            transition:
              transform 0.7s ease-out,
              opacity 0.7s ease-out,
              filter 0.7s ease-out,
              border-color 0.7s ease-out;
          }
          .fan-card--chosen {
            transform: translateY(calc(var(--fan-drop) - 10px))
              rotate(var(--fan-rotate)) scale(1.04);
            filter: none;
          }

          /* Beat 0 — rewound: cards sit below the arc, invisible. */
          .stage-pre .fan-card {
            opacity: 0;
            transform: translateY(calc(var(--fan-drop) + 26px))
              rotate(var(--fan-rotate));
            filter: none;
            border-color: var(--color-border);
            transition: none;
          }
          /* Beat 1+2 — settle into the open fan, staggered, then rest:
           * every card at full presence ("it could be any of these"). */
          .stage-open .fan-card {
            opacity: 1;
            transform: translateY(var(--fan-drop)) rotate(var(--fan-rotate));
            filter: none;
            border-color: var(--color-border);
            transition-delay: var(--fan-delay);
          }
          .stage-open .fan-card-label {
            color: var(--color-fg-muted);
          }

          .fan-caption {
            margin-top: 3.5rem;
            transition: opacity 0.5s ease-out 0.3s;
          }
          .stage-pre .fan-caption,
          .stage-open .fan-caption {
            opacity: 0;
            transition: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .fan-card,
          .fan-caption {
            transition: none !important;
          }
        }
      `}</style>
    </figure>
  );
}
