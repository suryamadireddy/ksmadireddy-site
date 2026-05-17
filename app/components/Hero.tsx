/** Headline + KSM block. Portrait temporarily omitted. */
"use client";

import { useEffect, useRef, useState } from "react";

const LINE1 = "I'M A PM WHO DESIGNS AND BUILDS";
const LINE2 = "I WORK TOWARDS THE BEST VERSION";
const LINE3 = "OF PRODUCTS AND OF PEOPLE ALIKE";

const FULL_MULTILINE = `${LINE1}\n${LINE2}\n${LINE3}`;

const ARIA_HEADLINE = `${LINE1}. ${LINE2}. ${LINE3}.`;

/** Map typed substring to LINE1 → LINE3 (newline-delimited while typing). */
function headlineRows(typed: string): [string, string, string] {
  const s = typed.split("\n");
  return [s[0] ?? "", s[1] ?? "", s[2] ?? ""];
}

/** Simple typewriter pacing (~17 chars/sec). */
const MS_PER_CHARACTER = 58;

/** Ghost line reserves width so the centered block doesn’t shift while typewriter grows LTR. */
function HeadlineRow({ text, fullLine }: { text: string; fullLine: string }) {
  return (
    <div className="relative min-w-0 w-full">
      <div className="hero-headline-line invisible" aria-hidden>
        {fullLine}
      </div>
      <div className="hero-headline-line absolute left-0 top-0">{text}</div>
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
        <h1 className="w-full min-w-0" aria-label={ARIA_HEADLINE}>
          <div className="mx-auto flex w-max max-w-[90%] min-w-0 flex-col gap-1">
            <HeadlineRow text={headline1} fullLine={LINE1} />
            <HeadlineRow text={headline2} fullLine={LINE2} />
            <HeadlineRow text={headline3} fullLine={LINE3} />
          </div>
        </h1>
      </div>
    </section>
  );
}
