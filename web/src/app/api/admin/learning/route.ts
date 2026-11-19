import { readFile, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import type { LearningLibrary, LearningPdf, LearningVideo } from "@/lib/learning";

function localPath() {
  return path.join(process.cwd(), "data", "learning.json");
}

async function readLocal(): Promise<LearningLibrary> {
  const raw = await readFile(localPath(), "utf8");
  return JSON.parse(raw) as LearningLibrary;
}

async function writeLocal(library: LearningLibrary) {
  await writeFile(localPath(), JSON.stringify(library, null, 2), "utf8");
}

function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function GET() {
  try {
    return NextResponse.json(await readLocal());
  } catch {
    return NextResponse.json({ pdfs: [], videos: [] });
  }
}

export async function PUT(request: Request) {
  const body = (await request.json().catch(() => null)) as LearningLibrary | null;
  if (!body || !Array.isArray(body.pdfs) || !Array.isArray(body.videos)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const library: LearningLibrary = {
    pdfs: body.pdfs.map(normalizePdf),
    videos: body.videos.map(normalizeVideo),
  };

  await writeLocal(library);

  const supabase = getServiceClient();
  if (supabase) {
    for (const pdf of library.pdfs) {
      await supabase.from("learning_pdfs").upsert({
        id: pdf.id,
        title: pdf.title,
        description: pdf.description,
        url: pdf.url,
        tags: pdf.tags,
        updated_at: new Date().toISOString(),
      });
    }
    for (const video of library.videos) {
      await supabase.from("learning_videos").upsert({
        id: video.id,
        title: video.title,
        description: video.description,
        url: video.url,
        duration: video.duration,
        tags: video.tags,
        updated_at: new Date().toISOString(),
      });
    }
  }

  return NextResponse.json({ ok: true, library, synced: Boolean(supabase) });
}

function normalizePdf(item: LearningPdf): LearningPdf {
  return {
    id: item.id.trim(),
    title: item.title.trim(),
    description: item.description?.trim() ?? "",
    url: item.url?.trim() ?? "",
    tags: Array.isArray(item.tags) ? item.tags : [],
  };
}

function normalizeVideo(item: LearningVideo): LearningVideo {
  return {
    id: item.id.trim(),
    title: item.title.trim(),
    description: item.description?.trim() ?? "",
    url: item.url?.trim() ?? "",
    duration: item.duration?.trim() ?? "",
    tags: Array.isArray(item.tags) ? item.tags : [],
  };
}
