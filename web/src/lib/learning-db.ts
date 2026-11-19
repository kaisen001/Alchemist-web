import type { LearningLibrary, LearningPdf, LearningVideo } from "./learning";
import { getSupabase } from "./supabase";
import { readJsonFile, writeJsonFile } from "./store";

type PdfRow = {
  id: string;
  title: string;
  description: string | null;
  url: string | null;
  tags: string[] | null;
};

type VideoRow = {
  id: string;
  title: string;
  description: string | null;
  url: string | null;
  duration: string | null;
  tags: string[] | null;
};

function mapPdf(row: PdfRow): LearningPdf {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? "",
    url: row.url ?? "",
    tags: row.tags ?? [],
    published: true,
  };
}

function mapVideo(row: VideoRow): LearningVideo {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? "",
    url: row.url ?? "",
    duration: row.duration ?? "",
    tags: row.tags ?? [],
    published: true,
  };
}

export async function readLocalLibrary(): Promise<LearningLibrary> {
  return readJsonFile<LearningLibrary>("learning.json", { pdfs: [], videos: [] });
}

export async function writeLocalLibrary(library: LearningLibrary) {
  await writeJsonFile("learning.json", library);
}

export function publishedOnly(library: LearningLibrary): LearningLibrary {
  return {
    pdfs: library.pdfs.filter((p) => p.published !== false && Boolean(p.url || p.title)),
    videos: library.videos.filter((v) => v.published !== false),
  };
}

export async function fetchLearningLibrary(): Promise<LearningLibrary> {
  const supabase = getSupabase();

  if (supabase) {
    const [pdfsRes, videosRes] = await Promise.all([
      supabase
        .from("learning_pdfs")
        .select("id, title, description, url, tags")
        .order("created_at", { ascending: true }),
      supabase
        .from("learning_videos")
        .select("id, title, description, url, duration, tags")
        .order("created_at", { ascending: true }),
    ]);

    if (!pdfsRes.error && !videosRes.error && (pdfsRes.data?.length || videosRes.data?.length)) {
      return publishedOnly({
        pdfs: (pdfsRes.data as PdfRow[]).map(mapPdf),
        videos: (videosRes.data as VideoRow[]).map(mapVideo),
      });
    }
  }

  return publishedOnly(await readLocalLibrary());
}
