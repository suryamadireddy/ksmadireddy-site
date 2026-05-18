"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { HeroIdentityDetails } from "./HeroIdentityDetails";

const HEADLINE_TEXT = `I believe products are remembered not just for what they make possible, but for the experiences they leave behind. When done right, a tool can make work feel effortless, a space can make people feel at ease, and a system can make complexity feel clear. Different mediums, same standard: each moment should feel intentionally designed for the person on the other side. That's the craft.`;

const MS_PER_CHARACTER = 58;
const TARGET_LINES = 4;
const MIN_FONT_PX = 12;
const MAX_FONT_PX = 44;
const DESKTOP_FONT_SCALE = 1.02;
const MD_QUERY = "(min-width: 768px)";

function countLines(el: HTMLElement): number {
  const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
  if (!lineHeight || Number.isNaN(lineHeight)) return 1;
  return Math.max(1, Math.round(el.scrollHeight / lineHeight));
}

/** Largest font size (px) where full headline wraps to exactly `targetLines`. */
function fitFontSizeForLines(
  measure: HTMLElement,
  width: number,
  targetLines: number,
): number {
  measure.style.width = `${width}px`;

  const linesAt = (px: number) => {
    measure.style.fontSize = `${px}px`;
    return countLines(measure);
  };

  if (linesAt(MAX_FONT_PX) > targetLines) {
    let lo = MIN_FONT_PX;
    let hi = MAX_FONT_PX;
    let best = MIN_FONT_PX;

    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      const lines = linesAt(mid);
      if (lines > targetLines) {
        hi = mid - 1;
      } else if (lines < targetLines) {
        lo = mid + 1;
      } else {
        best = mid;
        lo = mid + 1;
      }
    }
    return best;
  }

  return MAX_FONT_PX;
}

export function HeroCard() {
  const [headline, setHeadline] = useState("");
  const runEpoch = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLParagraphElement>(null);
  const fitRaf = useRef<number | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const measure = measureRef.current;
    if (!container || !measure) return;

    const md = window.matchMedia(MD_QUERY);

    const clearFit = () => {
      container.style.removeProperty("--hero-headline-font-size");
    };

    const runFit = () => {
      if (!md.matches) {
        clearFit();
        return;
      }

      const width = Math.round(container.clientWidth);
      if (width < 1) return;

      const basePx = fitFontSizeForLines(measure, width, TARGET_LINES);
      const px = Math.min(Math.round(basePx * DESKTOP_FONT_SCALE), MAX_FONT_PX);
      container.style.setProperty("--hero-headline-font-size", `${px}px`);
    };

    const scheduleFit = () => {
      if (fitRaf.current !== null) cancelAnimationFrame(fitRaf.current);
      fitRaf.current = requestAnimationFrame(() => {
        fitRaf.current = null;
        runFit();
      });
    };

    scheduleFit();

    const ro = new ResizeObserver(() => scheduleFit());
    ro.observe(container);

    const onMdChange = () => scheduleFit();
    md.addEventListener("change", onMdChange);
    window.addEventListener("resize", scheduleFit);
    void document.fonts?.ready.then(() => scheduleFit());

    return () => {
      ro.disconnect();
      md.removeEventListener("change", onMdChange);
      window.removeEventListener("resize", scheduleFit);
      if (fitRaf.current !== null) cancelAnimationFrame(fitRaf.current);
      clearFit();
    };
  }, []);

  useEffect(() => {
    const epoch = ++runEpoch.current;
    const alive = () => runEpoch.current === epoch;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setHeadline(HEADLINE_TEXT);
      return () => {
        runEpoch.current += 1;
      };
    }

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        window.setTimeout(resolve, ms);
      });

    const run = async () => {
      for (let len = 0; len <= HEADLINE_TEXT.length; len += 1) {
        if (!alive()) return;
        setHeadline(HEADLINE_TEXT.slice(0, len));
        if (len < HEADLINE_TEXT.length) await sleep(MS_PER_CHARACTER);
      }
    };

    void run();
    return () => {
      runEpoch.current += 1;
    };
  }, []);

  return (
    <article className="py-12 md:py-20 first:pt-0 last:pb-0">
      <div className="flex w-full min-w-0 flex-col items-start gap-16 md:gap-20">
        <div className="min-w-0 self-start">
          <div className="hero-ksm-mark mb-1 md:mb-2">KSM</div>
          <HeroIdentityDetails />
        </div>

        <div
          ref={containerRef}
          className="hero-headline-container @container min-w-0 w-full"
        >
          <h1 className="m-0 w-full min-w-0" aria-label={HEADLINE_TEXT}>
            <p className="hero-headline">{headline}</p>
            <p
              ref={measureRef}
              className="hero-headline hero-headline--measure"
              aria-hidden
            >
              {HEADLINE_TEXT}
            </p>
          </h1>
        </div>
      </div>
    </article>
  );
}
