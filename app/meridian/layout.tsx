import type { ReactNode } from "react";
import { MeridianEvolutionChrome } from "./MeridianEvolutionChrome";

export default function MeridianLayout({ children }: { children: ReactNode }) {
  return <MeridianEvolutionChrome>{children}</MeridianEvolutionChrome>;
}
