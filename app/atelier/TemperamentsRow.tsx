const TEMPERAMENTS = ["Clay", "August", "Cedar", "Wren"];

export function TemperamentsRow() {
  return (
    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-4">
      {TEMPERAMENTS.map((name) => (
        <div
          key={name}
          className="flex items-center justify-center rounded-md bg-[var(--color-bg-elevated)] px-4 py-8 ring-1 ring-[var(--color-border)]"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg)]">
            {name}
          </span>
        </div>
      ))}
    </div>
  );
}
