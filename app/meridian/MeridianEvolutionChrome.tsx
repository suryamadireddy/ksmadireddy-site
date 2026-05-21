"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ProjectShell } from "@/app/components/project/ProjectShell";
import {
  ProjectThread,
  type ProjectThreadCurrent,
} from "@/app/components/project/ProjectThread";

function pathToChrome(pathname: string): {
  title: string;
  current: ProjectThreadCurrent;
} {
  const p = pathname.replace(/\/$/, "") || "/meridian";
  if (p.startsWith("/meridian/globetrotter")) {
    return { title: "GLOBETROTTER", current: "globetrotter" };
  }
  if (p.startsWith("/meridian/atlas")) {
    return { title: "ATLAS", current: "atlas" };
  }
  return { title: "MERIDIAN", current: "meridian" };
}

export function MeridianEvolutionChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { title, current } = pathToChrome(pathname);

  return (
    <ProjectShell title={title}>
      <div className="mb-10 md:mb-12">
        <ProjectThread current={current} />
      </div>
      {children}
    </ProjectShell>
  );
}
