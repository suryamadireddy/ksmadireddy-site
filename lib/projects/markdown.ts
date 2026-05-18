import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

export async function loadMarkdownHtml(relativePath: string): Promise<string | null> {
  const filePath = path.join(process.cwd(), relativePath);
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return await marked.parse(raw);
  } catch {
    return null;
  }
}
