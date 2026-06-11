export type NodeId =
  | "vault"
  | "kiln"
  | "workshop"
  | "bench"
  | "scrapped"
  | "gallery"
  | "studiomind"
  | "taste";

export type RoomId = Exclude<NodeId, "studiomind" | "taste">;

export type PanelCopy = {
  kicker: string;
  title: string;
  body: string;
  meta: string;
};

export const PANEL_COPY: Record<NodeId, PanelCopy> = {
  taste: {
    kicker: "The spine",
    title: "Taste",
    body: "One model of how I judge — powering both what is worth my time and how each thing deserves to be shown. It is fed by what I write about design, the calls I make, and every time I agree or disagree with the studio. It starts simple and sharpens the longer I use it. A studio that turns ideas into briefs can be built by anyone; a studio that has learned my judgment cannot.",
    meta: "Substance + form · one model",
  },
  vault: {
    kicker: "Judgment wing",
    title: "The Vault",
    body: "Where an idea lands, with no friction, wherever I am. The studio does a light first pass so the idea is not cold when I come back to it — research stays lazy until an idea shows a first sign it is worth the work.",
    meta: "Capture · lazy first read",
  },
  kiln: {
    kicker: "Judgment wing",
    title: "The Kiln",
    body: "An honest, adversarial test that asks the questions I tend to avoid. It runs at two speeds: a fast read when I want a gut check, and a deep interrogation when I have decided an idea is worth cracking open. Rigor on demand, never a toll at the door. Its verdict sends each idea somewhere.",
    meta: "Two speeds · invoked, not imposed",
  },
  workshop: {
    kicker: "Production wing · the heart",
    title: "The Workshop",
    body: "The heart of the whole thing. A surviving idea becomes the cheapest version of itself I can react to — a rough visual, a sketch and a paragraph, something I can click through. When a direction earns it, the studio hands a dense brief to a coding agent and I get a working scaffold. Every idea here is alive: I can argue with it and watch it sharpen.",
    meta: "The manifester · chooses the form",
  },
  bench: {
    kicker: "A verdict from the Kiln",
    title: "The Bench",
    body: "A shelf for the promising but not yet urgent. Ideas rest here and are re-tested as they grow, waiting for their moment to arrive.",
    meta: "Promising · not yet urgent",
  },
  scrapped: {
    kicker: "A verdict from the Kiln",
    title: "Scrapped",
    body: "An archive for what did not hold — labeled, never deleted. The Kiln can be wrong, and an idea that fails today might be right in a year.",
    meta: "Kept, not deleted",
  },
  studiomind: {
    kicker: "Beneath both wings",
    title: "The Studio-Mind",
    body: "A single partner that knows me. It works on my ideas when I am not, and brings me the few things worth my attention, in whatever form fits them best. Beneath it runs the quiet work that makes that possible: keeping ideas current, re-testing them as they grow, noticing where two of them quietly meet.",
    meta: "One voice · substrate beneath",
  },
  gallery: {
    kicker: "Facing out",
    title: "The Gallery",
    body: "The one room that faces out. It holds the work worth showing — where anyone can talk to the published ideas, not only look at them.",
    meta: "Outward-facing · interactive",
  },
};

export type RoomTile = {
  id: RoomId;
  label: string;
  role: string;
  name: string;
  image?: string;
  outside?: boolean;
};

export const ROOM_TILES: RoomTile[] = [
  { id: "vault", label: "VAULT", role: "ideas land", name: "Vault" },
  { id: "kiln", label: "KILN", role: "two-speed test", name: "Kiln" },
  {
    id: "workshop",
    label: "WORKSHOP",
    role: "ideas are made — the heart",
    name: "Workshop",
  },
  { id: "bench", label: "BENCH", role: "set aside, not gone", name: "Bench" },
  {
    id: "scrapped",
    label: "SCRAPPED",
    role: "kept, not deleted",
    name: "Scrapped",
  },
  {
    id: "gallery",
    label: "GALLERY",
    role: "faces out",
    name: "Gallery",
    outside: true,
  },
];

export const LEGEND_ITEMS = [
  { className: "li-flow", label: "flow of an idea" },
  { className: "li-set", label: "set aside by the Kiln" },
  { className: "li-beneath", label: "rests on / draws from" },
] as const;

export function isRoomId(id: NodeId): id is RoomId {
  return id !== "studiomind" && id !== "taste";
}
