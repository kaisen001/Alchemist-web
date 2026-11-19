import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { password?: string } | null;
  const password = body?.password?.trim() ?? "";
  const expected = process.env.ADMIN_PASSWORD?.trim() || "alchemist-admin";

  if (!password || password !== expected) {
    return NextResponse.json({ ok: false, error: "Invalid password" }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}
