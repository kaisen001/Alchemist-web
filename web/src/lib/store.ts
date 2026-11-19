import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

export function dataPath(...parts: string[]) {
  return path.join(process.cwd(), "data", ...parts);
}

export async function readJsonFile<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await readFile(dataPath(file), "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function writeJsonFile<T>(file: string, value: T) {
  await mkdir(dataPath(), { recursive: true });
  await writeFile(dataPath(file), JSON.stringify(value, null, 2), "utf8");
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}
