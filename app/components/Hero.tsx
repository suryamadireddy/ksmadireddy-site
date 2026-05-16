/** Headline + KSM block. Portrait temporarily omitted. */
"use client";

import { useEffect, useRef, useState } from "react";

const LINE1 = "Exploring the possibilites of AI";
const LINE2 = "By making imagination interactive";
const LINE3 = "Through prototypes you can explore";

const FULL_MULTILINE = `${LINE1}\n${LINE2}\n${LINE3}`;

const ARIA_HEADLINE = `${LINE1}. ${LINE2}. ${LINE3}.`;

/** Map typed substring to LINE1 → LINE3 (newline-delimited while typing). */
function headlineRows(typed: string): [string, string, string] {
  const s = typed.split("\n");
  return [s[0] ?? "", s[1] ?? "", s[2] ?? ""];
}

/** Simple typewriter pacing (~17 chars/sec). */
const MS_PER_CHARACTER = 58;

/** Same row structure as the scroll version (full-width row + w-max nowrap inner); font nudged so lines fit the 90% column without scrolling. */
const HEADLINE_INNER_CLASS =
  "w-max min-h-[1.12lh] whitespace-nowrap font-mono font-medium uppercase tracking-[0.05em] md:tracking-[0.048em] leading-[1.12] text-[clamp(2rem,calc(90cqw/23),3.85rem)]";

function HeadlineRow({ text }: { text: string }) {
  return (
    <div className="min-w-0 w-full">
      <div className={HEADLINE_INNER_CLASS}>{text}</div>
    </div>
  );
}

export function Hero() {
  const [headline, setHeadline] = useState("");
  const runEpoch = useRef(0);

  useEffect(() => {
    const epoch = ++runEpoch.current;
    const alive = () => runEpoch.current === epoch;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setHeadline(FULL_MULTILINE);
      return () => {
        runEpoch.current += 1;
      };
    }

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        window.setTimeout(resolve, ms);
      });

    const run = async () => {
      for (let len = 0; len <= FULL_MULTILINE.length; len += 1) {
        if (!alive()) return;
        setHeadline(FULL_MULTILINE.slice(0, len));
        if (len < FULL_MULTILINE.length) await sleep(MS_PER_CHARACTER);
      }
    };

    void run();
    return () => {
      runEpoch.current += 1;
    };
  }, []);

  const [headline1, headline2, headline3] = headlineRows(headline);

  return (
    <section className="min-w-0 overflow-x-visible pt-20 md:pt-32">
      <div className="mb-10 md:mb-14">
        <div className="mb-1 md:mb-2 text-[48px] font-bold tracking-[-0.08em] text-[var(--color-fg)]">
          KSM
        </div>
        <div className="pl-1 inline-flex w-max max-w-full flex-col items-stretch">
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--color-fg)]">
            Krishna Surya Madireddy
          </span>
          <nav
            className="mt-1.5 flex w-full flex-nowrap justify-between gap-y-2 font-mono text-[11px] font-bold tracking-normal text-[var(--color-fg)] normal-case"
            aria-label="Contact links"
          >
            <a
              href="mailto:ksmadireddy@gmail.com"
              className="text-inherit no-underline transition-[text-decoration-color] duration-200 hover:underline hover:decoration-[var(--color-border-strong)] hover:underline-offset-[3px]"
            >
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/ksmadireddy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-inherit no-underline transition-[text-decoration-color] duration-200 hover:underline hover:decoration-[var(--color-border-strong)] hover:underline-offset-[3px]"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/suryamadireddy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-inherit no-underline transition-[text-decoration-color] duration-200 hover:underline hover:decoration-[var(--color-border-strong)] hover:underline-offset-[3px]"
            >
              GitHub
            </a>
          </nav>
        </div>
      </div>

      <div className="@container mb-8 w-full min-w-0 md:mb-10">
        <h1 className="w-full min-w-0 text-left" aria-label={ARIA_HEADLINE}>
          <div className="mx-auto flex w-[90%] max-w-full min-w-0 flex-col gap-1">
            <HeadlineRow text={headline1} />
            <HeadlineRow text={headline2} />
            <HeadlineRow text={headline3} />
          </div>
        </h1>
      </div>
    </section>
  );
}
