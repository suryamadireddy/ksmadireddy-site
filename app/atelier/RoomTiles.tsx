"use client";

import Image from "next/image";
import { ROOM_TILES, type RoomId } from "./atelierArchitectureData";

const TILE_SURFACE = "#f2efe8";
const GALLERY_SURFACE = "#e3e8e6";

type RoomTilesProps = {
  activeId: RoomId | null;
  onSelect: (id: RoomId) => void;
};

export function RoomTiles({ activeId, onSelect }: RoomTilesProps) {
  return (
    <section>
      <span className="label">The components</span>
      <div className="mt-5 grid grid-cols-3 gap-3 sm:gap-4 lg:grid-cols-6">
        {ROOM_TILES.map((tile) => {
          const isActive = tile.id === activeId;
          return (
            <button
              key={tile.id}
              type="button"
              onClick={() => onSelect(tile.id)}
              aria-pressed={isActive}
              className="group flex flex-col gap-2.5 rounded-md focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-fg)]"
            >
              <div
                className={[
                  "relative aspect-square w-full overflow-hidden rounded-md",
                  "ring-offset-2 ring-offset-[var(--color-bg)] transition duration-200 ease-out",
                  isActive
                    ? "-translate-y-1 shadow-lg shadow-black/40 ring-2 ring-[var(--color-fg)]"
                    : "ring-1 ring-[var(--color-border)] group-hover:-translate-y-0.5 group-hover:ring-[var(--color-border-strong)]",
                ].join(" ")}
                style={{
                  backgroundColor: tile.outside
                    ? GALLERY_SURFACE
                    : TILE_SURFACE,
                }}
              >
                {tile.image ? (
                  <Image
                    src={tile.image}
                    alt={`${tile.name} artifact`}
                    fill
                    sizes="(min-width: 1024px) 16vw, 33vw"
                    className="object-contain p-[14%]"
                  />
                ) : (
                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-2 text-center">
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-black/35">
                      {tile.label}
                    </span>
                    <span className="font-serif text-[11px] italic leading-snug text-black/40">
                      {tile.role}
                    </span>
                  </span>
                )}
              </div>
              <span
                className={`text-center font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200 ${
                  isActive
                    ? "text-[var(--color-fg)]"
                    : "text-[var(--color-fg-muted)]"
                }`}
              >
                {tile.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
