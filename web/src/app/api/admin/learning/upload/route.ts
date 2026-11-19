import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { readLocalLibrary, writeLocalLibrary } from "@/lib/learning-db";
import { slugify } from "@/lib/store";

export async function POST(request: Request) {
  const form = await request.formData();
  const type = String(form.get("type") || "");
  const title = String(form.get("title") || "").trim();
  const description = String(form.get("description") || "").trim();
  const duration = String(form.get("duration") || "").trim();
  const tagsRaw = String(form.get("tags") || "").trim();
  const file = form.get("file");

  if (!title || (type !== "pdf" && type !== "video")) {
    return NextResponse.json({ error: "title and type required" }, { status: 400 });
  }

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Upload a file from your computer" }, { status: 400 });
  }

  const ext = path.extname(file.name) || (type === "pdf" ? ".pdf" : ".mp4");
  const id = `${slugify(title) || type}-${Date.now()}`;
  const filename = `${id}${ext}`;
  const dir = path.join(process.cwd(), "public", "learning", "uploads");
  await mkdir(dir, { recursive: true });

  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, filename), bytes);

  const url = `/learning/uploads/${filename}`;
  const now = new Date().toISOString();
  const tags = tagsRaw
    ? tagsRaw
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  const library = await readLocalLibrary();

  if (type === "pdf") {
    library.pdfs = [
      ...library.pdfs.filter((p) => p.id !== id),
      {
        id,
        title,
        description,
        url,
        tags,
        published: true,
        publishedAt: now,
      },
    ];
  } else {
    library.videos = [
      ...library.videos.filter((v) => v.id !== id),
      {
        id,
        title,
        description,
        url,
        duration: duration || "",
        tags,
        published: true,
        publishedAt: now,
      },
    ];
  }

  await writeLocalLibrary(library);

  return NextResponse.json({
    ok: true,
    item: type === "pdf" ? library.pdfs.at(-1) : library.videos.at(-1),
    library,
  });
}
