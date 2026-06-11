"use client";

import { IBM_Plex_Mono, Spectral } from "next/font/google";
import { useCallback, useEffect, useId, type KeyboardEvent } from "react";
import {
  LEGEND_ITEMS,
  PANEL_COPY,
  type NodeId,
} from "./atelierArchitectureData";

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

const spectral = Spectral({
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

type ArchitectureDiagramProps = {
  activeId: NodeId | null;
  onSelect: (id: NodeId) => void;
  onClose: () => void;
};

function DiagramNode({
  id,
  activeId,
  onSelect,
  onKeyActivate,
  children,
}: {
  id: NodeId;
  activeId: NodeId | null;
  onSelect: (id: NodeId) => void;
  onKeyActivate: (e: KeyboardEvent<SVGGElement>, id: NodeId) => void;
  children: React.ReactNode;
}) {
  const isActive = activeId === id;
  return (
    <g
      className={`arch-node${isActive ? " arch-node--active" : ""}`}
      data-id={id}
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      aria-label={`${PANEL_COPY[id].title}, show details`}
      onClick={() => onSelect(id)}
      onKeyDown={(e) => onKeyActivate(e, id)}
    >
      {children}
    </g>
  );
}

export function ArchitectureDiagram({
  activeId,
  onSelect,
  onClose,
}: ArchitectureDiagramProps) {
  const uid = useId().replace(/:/g, "");
  const arr = `arr-${uid}`;
  const arrClay = `arr-clay-${uid}`;
  const arrFaint = `arr-faint-${uid}`;
  const isOpen = activeId !== null;
  const panel = activeId ? PANEL_COPY[activeId] : null;

  const handleKeyActivate = useCallback(
    (event: KeyboardEvent<SVGGElement>, id: NodeId) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onSelect(id);
      }
    },
    [onSelect],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  return (
    <figure
      className={`arch-diagram-wrap ${plexMono.className} ${spectral.className}`}
      aria-label="Atelier system architecture"
    >
      <div className="arch-head">
        <div className="arch-kicker">The Atelier · System Architecture</div>
        <h3 className="arch-title">
          One building: two wings, a layer beneath, and one room that faces out.
        </h3>
        <p className="arch-sub">
          Everything rests on the same foundation — a growing model of how I
          judge. <br />
          Select a room to read what it does.
        </p>
        <div className="arch-hint">Select a room</div>
      </div>

      <div className={`arch-stage${isOpen ? " arch-stage--open" : ""}`}>
        <svg
          className="arch-svg"
          viewBox="0 0 1000 700"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Atelier system architecture diagram"
        >
          <defs>
            <marker
              id={arr}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path
                d="M0,0 L9,5 L0,10"
                fill="none"
                stroke="#5c574e"
                strokeWidth="1.2"
              />
            </marker>
            <marker
              id={arrClay}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path
                d="M0,0 L9,5 L0,10"
                fill="none"
                stroke="#b25a3a"
                strokeWidth="1.4"
              />
            </marker>
            <marker
              id={arrFaint}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path
                d="M0,0 L9,5 L0,10"
                fill="none"
                stroke="#928c80"
                strokeWidth="1"
              />
            </marker>
          </defs>

          <rect className="arch-frame" x="50" y="68" width="500" height="384" />
          <text className="arch-wing-label" x="68" y="98" fontSize="13">
            JUDGMENT
          </text>
          <text className="arch-label-role" x="158" y="98.5" fontSize="13">
            — where ideas are tested
          </text>

          <rect
            className="arch-frame"
            x="586"
            y="68"
            width="282"
            height="384"
          />
          <text className="arch-wing-label" x="604" y="98" fontSize="13">
            PRODUCTION
          </text>
          <text className="arch-label-role" x="712" y="98.5" fontSize="13">
            — where ideas are made
          </text>

          <line
            className="arch-flow"
            x1="286"
            y1="162"
            x2="318"
            y2="162"
            markerEnd={`url(#${arr})`}
          />
          <path
            className="arch-flow-main"
            d="M511 158 C 560 152, 565 170, 603 172"
            markerEnd={`url(#${arrClay})`}
          />
          <path
            className="arch-flow-set"
            d="M390 202 C 360 250, 250 268, 195 318"
            markerEnd={`url(#${arrFaint})`}
          />
          <path
            className="arch-flow-set"
            d="M430 202 C 430 250, 425 268, 418 318"
            markerEnd={`url(#${arrFaint})`}
          />
          <path
            className="arch-flow"
            d="M846 206 C 872 220, 880 238, 893 252"
            markerEnd={`url(#${arr})`}
          />

          <line
            className="arch-flow-beneath"
            x1="300"
            y1="478"
            x2="300"
            y2="453"
          />
          <line
            className="arch-flow-beneath"
            x1="727"
            y1="478"
            x2="727"
            y2="453"
          />
          <line
            className="arch-flow-beneath"
            x1="300"
            y1="603"
            x2="300"
            y2="576"
          />
          <line
            className="arch-flow-beneath"
            x1="727"
            y1="603"
            x2="727"
            y2="576"
          />
          <line
            className="arch-flow-beneath"
            x1="513"
            y1="603"
            x2="513"
            y2="576"
          />

          <text className="arch-micro" x="525" y="138" textAnchor="middle">
            to the floor
          </text>
          <text className="arch-micro" x="225" y="292" textAnchor="end">
            verdict
          </text>

          <DiagramNode
            id="vault"
            activeId={activeId}
            onSelect={onSelect}
            onKeyActivate={handleKeyActivate}
          >
            <rect className="arch-box" x="86" y="122" width="200" height="80" />
            <text
              className="arch-label-mono"
              x="186"
              y="158"
              textAnchor="middle"
              fontSize="14"
            >
              VAULT
            </text>
            <text
              className="arch-label-role"
              x="186"
              y="180"
              textAnchor="middle"
              fontSize="13"
            >
              ideas land
            </text>
          </DiagramNode>

          <DiagramNode
            id="kiln"
            activeId={activeId}
            onSelect={onSelect}
            onKeyActivate={handleKeyActivate}
          >
            <rect
              className="arch-box"
              x="320"
              y="122"
              width="190"
              height="80"
            />
            <text
              className="arch-label-mono"
              x="415"
              y="158"
              textAnchor="middle"
              fontSize="14"
            >
              KILN
            </text>
            <text
              className="arch-label-role"
              x="415"
              y="180"
              textAnchor="middle"
              fontSize="13"
            >
              two-speed test
            </text>
          </DiagramNode>

          <DiagramNode
            id="bench"
            activeId={activeId}
            onSelect={onSelect}
            onKeyActivate={handleKeyActivate}
          >
            <rect
              className="arch-box"
              x="100"
              y="320"
              width="190"
              height="78"
            />
            <text
              className="arch-label-mono"
              x="195"
              y="354"
              textAnchor="middle"
              fontSize="13"
            >
              BENCH
            </text>
            <text
              className="arch-label-role"
              x="195"
              y="375"
              textAnchor="middle"
              fontSize="12.5"
            >
              set aside, not gone
            </text>
          </DiagramNode>

          <DiagramNode
            id="scrapped"
            activeId={activeId}
            onSelect={onSelect}
            onKeyActivate={handleKeyActivate}
          >
            <rect
              className="arch-box"
              x="320"
              y="320"
              width="190"
              height="78"
            />
            <text
              className="arch-label-mono"
              x="415"
              y="354"
              textAnchor="middle"
              fontSize="13"
            >
              SCRAPPED
            </text>
            <text
              className="arch-label-role"
              x="415"
              y="375"
              textAnchor="middle"
              fontSize="12.5"
            >
              kept, not deleted
            </text>
          </DiagramNode>

          <DiagramNode
            id="workshop"
            activeId={activeId}
            onSelect={onSelect}
            onKeyActivate={handleKeyActivate}
          >
            <rect
              className="arch-box arch-box--heart"
              x="604"
              y="122"
              width="246"
              height="132"
            />
            <text
              className="arch-label-mono"
              x="727"
              y="172"
              textAnchor="middle"
              fontSize="15"
            >
              WORKSHOP
            </text>
            <text
              className="arch-label-role"
              x="727"
              y="196"
              textAnchor="middle"
              fontSize="13.5"
            >
              ideas are made — the heart
            </text>
            <text className="arch-micro" x="727" y="224" textAnchor="middle">
              manifester → coding-agent handoff
            </text>
          </DiagramNode>

          <DiagramNode
            id="gallery"
            activeId={activeId}
            onSelect={onSelect}
            onKeyActivate={handleKeyActivate}
          >
            <rect
              className="arch-box"
              x="894"
              y="158"
              width="92"
              height="188"
            />
            <text
              className="arch-label-mono"
              x="940"
              y="244"
              textAnchor="middle"
              fontSize="12"
            >
              GALLERY
            </text>
            <text
              className="arch-label-role"
              x="940"
              y="264"
              textAnchor="middle"
              fontSize="11.5"
            >
              faces out
            </text>
            <text
              className="arch-micro arch-tag"
              x="940"
              y="150"
              textAnchor="middle"
            >
              public
            </text>
          </DiagramNode>

          <DiagramNode
            id="studiomind"
            activeId={activeId}
            onSelect={onSelect}
            onKeyActivate={handleKeyActivate}
          >
            <rect
              className="arch-band"
              x="50"
              y="478"
              width="936"
              height="98"
            />
            <text className="arch-label-mono" x="70" y="512" fontSize="14">
              STUDIO-MIND
            </text>
            <text className="arch-label-role" x="200" y="512" fontSize="13.5">
              — the one partner that knows me, beneath both wings
            </text>
            <line
              x1="70"
              y1="528"
              x2="966"
              y2="528"
              className="arch-band-rule"
            />
            <text className="arch-micro" x="70" y="552">
              substrate runs beneath ·
            </text>
            <text className="arch-micro" x="270" y="552">
              research
            </text>
            <text className="arch-micro" x="360" y="552">
              re-kilning
            </text>
            <text className="arch-micro" x="470" y="552">
              connections
            </text>
          </DiagramNode>

          <DiagramNode
            id="taste"
            activeId={activeId}
            onSelect={onSelect}
            onKeyActivate={handleKeyActivate}
          >
            <rect
              className="arch-band"
              x="50"
              y="603"
              width="936"
              height="74"
            />
            <rect
              className="arch-spine-accent"
              x="50"
              y="603"
              width="5"
              height="74"
            />
            <text className="arch-label-mono" x="74" y="638" fontSize="14">
              TASTE
            </text>
            <text className="arch-label-role" x="170" y="638" fontSize="13.5">
              — the spine. Everything draws on it.
            </text>
            <text className="arch-micro" x="74" y="660">
              one model of how I judge · substance + form
            </text>
          </DiagramNode>
        </svg>

        <div
          className={`arch-scrim${isOpen ? " arch-scrim--open" : ""}`}
          onClick={onClose}
          aria-hidden={!isOpen}
        />
        <aside
          className={`arch-panel${isOpen ? " arch-panel--open" : ""}`}
          aria-hidden={!isOpen}
        >
          {panel ? (
            <>
              <button
                type="button"
                className="arch-panel-close"
                onClick={onClose}
                aria-label="Close"
              >
                ✕
              </button>
              <div className="arch-panel-kicker">{panel.kicker}</div>
              <h4 className="arch-panel-title">{panel.title}</h4>
              <p className="arch-panel-body">{panel.body}</p>
              <div className="arch-panel-rule" />
              <div className="arch-panel-meta">{panel.meta}</div>
            </>
          ) : null}
        </aside>
      </div>

      <div className="arch-legend">
        {LEGEND_ITEMS.map((item) => (
          <span key={item.className}>
            <i className={item.className} aria-hidden />
            {item.label}
          </span>
        ))}
      </div>

      <style jsx>{`
        .arch-diagram-wrap {
          --paper: #eceae3;
          --paper-2: #f3f1ea;
          --card: #f6f4ee;
          --ink: #221f1b;
          --ink-soft: #5c574e;
          --ink-faint: #928c80;
          --line: #bdb7aa;
          --line-soft: #d4cfc2;
          --clay: #b25a3a;
          --clay-tint: rgba(178, 90, 58, 0.08);
          margin: 0;
          min-width: 0;
          width: 100%;
          color: var(--ink);
        }

        .arch-head {
          margin: 0 4px 22px;
        }

        .arch-kicker {
          font-family: inherit;
          font-size: 11px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--clay);
          margin-bottom: 10px;
        }

        .arch-title {
          font-family: inherit;
          font-weight: 300;
          font-size: 24px;
          line-height: 1.05;
          letter-spacing: 0.01em;
          margin: 0;
        }

        .arch-title em {
          font-style: italic;
        }

        .arch-sub {
          margin-top: 8px;
          font-size: 15px;
          color: var(--ink-soft);
          max-width: 560px;
          line-height: 1.5;
        }

        .arch-hint {
          font-family: inherit;
          font-size: 10.5px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ink-faint);
          margin-top: 14px;
        }

        .arch-hint::before {
          content: "›  ";
          color: var(--clay);
        }

        .arch-stage {
          position: relative;
          background: var(--card);
          border: 1px solid var(--line);
          overflow: hidden;
        }

        .arch-stage::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image:
            radial-gradient(
              circle at 12% 18%,
              rgba(0, 0, 0, 0.015) 0,
              transparent 40%
            ),
            radial-gradient(
              circle at 88% 82%,
              rgba(0, 0, 0, 0.015) 0,
              transparent 40%
            );
        }

        .arch-svg {
          display: block;
          width: 100%;
          height: auto;
        }

        .arch-stage :global(.arch-node) {
          cursor: pointer;
        }

        .arch-stage :global(.arch-box),
        .arch-stage :global(.arch-band) {
          fill: var(--paper-2);
          stroke: var(--line);
          stroke-width: 1;
          transition:
            stroke 0.18s ease,
            fill 0.18s ease;
        }

        .arch-stage :global(.arch-box--heart) {
          stroke-width: 1.4;
        }

        .arch-stage :global(.arch-node:hover .arch-box),
        .arch-stage :global(.arch-node:hover .arch-band) {
          stroke: var(--clay);
          fill: #f9f7f1;
        }

        .arch-stage :global(.arch-node--active .arch-box),
        .arch-stage :global(.arch-node--active .arch-band) {
          stroke: var(--clay);
          stroke-width: 1.6;
          fill: var(--clay-tint);
        }

        .arch-stage :global(.arch-tag) {
          opacity: 0;
          transition: opacity 0.18s ease;
        }

        .arch-stage :global(.arch-node:hover .arch-tag),
        .arch-stage :global(.arch-node--active .arch-tag) {
          opacity: 1;
        }

        .arch-stage :global(.arch-label-mono) {
          font-family: inherit;
          font-weight: 500;
          fill: var(--ink);
          letter-spacing: 0.12em;
          pointer-events: none;
        }

        .arch-stage :global(.arch-label-role) {
          font-family: inherit;
          font-style: italic;
          fill: var(--ink-soft);
          pointer-events: none;
        }

        .arch-stage :global(.arch-wing-label) {
          font-family: inherit;
          font-weight: 600;
          fill: var(--ink-faint);
          letter-spacing: 0.22em;
          pointer-events: none;
        }

        .arch-stage :global(.arch-frame) {
          fill: none;
          stroke: var(--line-soft);
          stroke-width: 1;
          pointer-events: none;
        }

        .arch-stage :global(.arch-flow) {
          fill: none;
          stroke: var(--ink-soft);
          stroke-width: 1.2;
          pointer-events: none;
        }

        .arch-stage :global(.arch-flow-main) {
          fill: none;
          stroke: var(--clay);
          stroke-width: 1.6;
          pointer-events: none;
        }

        .arch-stage :global(.arch-flow-set) {
          fill: none;
          stroke: var(--ink-faint);
          stroke-width: 1;
          stroke-dasharray: 3 4;
          pointer-events: none;
        }

        .arch-stage :global(.arch-flow-beneath) {
          fill: none;
          stroke: var(--line);
          stroke-width: 1;
          stroke-dasharray: 2 5;
          pointer-events: none;
        }

        .arch-stage :global(.arch-spine-accent) {
          fill: var(--clay);
          pointer-events: none;
        }

        .arch-stage :global(.arch-micro) {
          font-family: inherit;
          font-size: 9px;
          letter-spacing: 0.14em;
          fill: var(--ink-faint);
          text-transform: uppercase;
          pointer-events: none;
        }

        .arch-stage :global(.arch-band-rule) {
          stroke: var(--line-soft);
          stroke-width: 1;
          pointer-events: none;
        }

        .arch-scrim {
          position: absolute;
          inset: 0;
          background: rgba(34, 31, 27, 0.28);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.28s ease;
          z-index: 5;
        }

        .arch-scrim--open {
          opacity: 1;
          pointer-events: auto;
        }

        .arch-panel {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: min(420px, 72%);
          background: var(--card);
          border-left: 1px solid var(--clay);
          box-shadow: -24px 0 50px -28px rgba(34, 31, 27, 0.45);
          transform: translateX(104%);
          transition: transform 0.34s cubic-bezier(0.22, 0.61, 0.36, 1);
          z-index: 6;
          display: flex;
          flex-direction: column;
          padding: 34px 34px 30px;
        }

        .arch-panel--open {
          transform: translateX(0);
        }

        .arch-panel-kicker {
          font-family: inherit;
          font-size: 10px;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: var(--clay);
          margin-bottom: 14px;
        }

        .arch-panel-title {
          font-family: inherit;
          font-weight: 300;
          font-size: 26px;
          line-height: 1.1;
          margin: 0 0 18px;
        }

        .arch-panel-body {
          font-family: inherit;
          font-size: 16px;
          line-height: 1.62;
          color: var(--ink-soft);
          margin: 0;
        }

        .arch-panel-rule {
          height: 1px;
          background: var(--line-soft);
          margin: 20px 0;
        }

        .arch-panel-meta {
          font-family: inherit;
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--ink-faint);
        }

        .arch-panel-close {
          position: absolute;
          top: 18px;
          right: 18px;
          width: 34px;
          height: 34px;
          border: 1px solid var(--line);
          background: transparent;
          font-family: inherit;
          font-size: 15px;
          color: var(--ink-soft);
          cursor: pointer;
          transition:
            border-color 0.18s,
            color 0.18s;
        }

        .arch-panel-close:hover {
          border-color: var(--clay);
          color: var(--clay);
        }

        .arch-legend {
          display: flex;
          flex-wrap: wrap;
          gap: 18px 26px;
          padding: 14px 4px 0;
          font-family: inherit;
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--ink-faint);
        }

        .arch-legend span {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .arch-legend :global(i) {
          display: inline-block;
          width: 22px;
          height: 0;
        }

        .arch-legend :global(.li-flow) {
          border-top: 1.4px solid var(--clay);
        }

        .arch-legend :global(.li-set) {
          border-top: 1px dashed var(--ink-faint);
        }

        .arch-legend :global(.li-beneath) {
          border-top: 1px dashed var(--line);
        }

        @media (max-width: 640px) {
          .arch-title {
            font-size: 22px;
          }

          .arch-stage {
            overflow-x: auto;
          }

          .arch-panel {
            top: auto;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 78%;
            border-left: none;
            border-top: 1px solid var(--clay);
            transform: translateY(104%);
            box-shadow: 0 -24px 50px -28px rgba(34, 31, 27, 0.45);
          }

          .arch-panel--open {
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .arch-panel,
          .arch-scrim,
          .arch-stage :global(.arch-box),
          .arch-stage :global(.arch-band) {
            transition: none;
          }
        }
      `}</style>
    </figure>
  );
}
