import { getProject } from "@/lib/projects/registry";

export const metadata = getProject("aboutme")!.metadata;
