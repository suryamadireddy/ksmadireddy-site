"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

export type SpecTile = {
  id: string;
  label: string;
  title: string;
  body: ReactNode;
};

type CaseStudySpecAccordionProps = {
  items: SpecTile[];
  deckId: string;
  deckLabel: string;
};

const RESIZE_MS = 460;

export function CaseStudySpecAccordion({
  items,
  deckId,
  deckLabel,
}: CaseStudySpecAccordionProps) {
  const [openId, setOpenId] = useState<string>(items[0]?.id ?? "");
  const [isResizing, setIsResizing] = useState(false);
  const accordionRef = useRef<HTMLDivElement>(null);
  const resizeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearResizeTimer = useCallback(() => {
    if (resizeTimerRef.current) {
      clearTimeout(resizeTimerRef.current);
      resizeTimerRef.current = null;
    }
  }, []);

  const beginResize = useCallback(() => {
    clearResizeTimer();
    setIsResizing(true);
    resizeTimerRef.current = setTimeout(() => {
      setIsResizing(false);
      resizeTimerRef.current = null;
    }, RESIZE_MS);
  }, [clearResizeTimer]);

  const openPanel = useCallback(
    (id: string) => {
      if (id === openId) return;
      beginResize();
      setOpenId(id);
    },
    [beginResize, openId],
  );

  useEffect(() => {
    const root = accordionRef.current;
    if (!root) return;

    const onTransitionEnd = (event: TransitionEvent) => {
      const target = event.target as HTMLElement;
      if (!target.classList.contains("spec-accordion-tile")) return;
      if (target.dataset.state !== "open") return;
      if (event.propertyName !== "flex-grow" && event.propertyName !== "flex") {
        return;
      }
      clearResizeTimer();
      setIsResizing(false);
    };

    root.addEventListener("transitionend", onTransitionEnd);
    return () => {
      root.removeEventListener("transitionend", onTransitionEnd);
      clearResizeTimer();
    };
  }, [clearResizeTimer]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>, id: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openPanel(id);
    }
  };

  return (
    <section
      id={deckId}
      aria-label={`${deckLabel} section`}
      className="case-study-section-rail"
    >
      <header className="case-study-deck-header mb-6">
        <span className="label case-study-section-label">{deckLabel}</span>
      </header>
      <div
        ref={accordionRef}
        className={`spec-accordion${isResizing ? " spec-accordion--resizing" : ""}`}
      >
        {items.map((item) => {
          const isOpen = openId === item.id;
          const contentId = `${deckId}-${item.id}-content`;
          return (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              data-state={isOpen ? "open" : "closed"}
              aria-expanded={isOpen}
              aria-controls={contentId}
              className="spec-accordion-tile"
              onClick={() => openPanel(item.id)}
              onMouseEnter={() => openPanel(item.id)}
              onFocus={(event) => {
                if (event.target === event.currentTarget) openPanel(item.id);
              }}
              onKeyDown={(event) => handleKeyDown(event, item.id)}
            >
              <span className="spec-accordion-label" aria-hidden={isOpen}>
                {item.label}
              </span>
              <div
                id={contentId}
                className="spec-accordion-content"
                aria-hidden={!isOpen}
              >
                <h3 className="spec-accordion-title">{item.title}</h3>
                <div className="spec-accordion-body">{item.body}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
