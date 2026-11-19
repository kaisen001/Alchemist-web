export type LearningPdf = {
  id: string;
  title: string;
  description: string;
  url: string;
  tags: string[];
  published?: boolean;
  publishedAt?: string;
};

export type LearningVideo = {
  id: string;
  title: string;
  description: string;
  url: string;
  duration: string;
  tags: string[];
  published?: boolean;
  publishedAt?: string;
};

export type LearningLibrary = {
  pdfs: LearningPdf[];
  videos: LearningVideo[];
};

export async function getLearningLibrary(username?: string): Promise<LearningLibrary> {
  const headers: HeadersInit = {};
  if (username) headers["x-lqd-user"] = username;

  const res = await fetch("/api/learning", { cache: "no-store", headers });
  if (!res.ok) {
    return { pdfs: [], videos: [] };
  }
  return res.json();
}
