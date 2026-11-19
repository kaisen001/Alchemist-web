import { NextResponse } from "next/server";
import type { ClientSession } from "@/lib/auth";
import { findManagementAccount } from "@/lib/management-accounts-db";
import { listUsers, upsertUser } from "@/lib/users-db";

export async function GET() {
  const users = await listUsers();
  return NextResponse.json({
    count: users.length,
    users: users.map((u) => ({
      id: u.id,
      kind: u.kind,
      name: u.name,
      username: u.username,
      country: u.country,
      phone: u.phone,
      createdAt: u.createdAt,
    })),
  });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Partial<ClientSession> | null;
  if (!body?.username?.trim() || !body?.name?.trim()) {
    return NextResponse.json({ error: "Invalid account payload" }, { status: 400 });
  }

  const username = body.username.trim().replace(/^@/, "");
  if (await findManagementAccount(username)) {
    return NextResponse.json(
      { error: "This username is already used by a management account. Choose another." },
      { status: 409 },
    );
  }

  const user = await upsertUser({
    kind: "portal",
    name: body.name.trim(),
    username,
    phone: body.phone,
    phoneCode: body.phoneCode,
    country: body.country ?? "",
    countryCode: body.countryCode,
    createdAt: body.createdAt || new Date().toISOString(),
  });

  return NextResponse.json({ ok: true, user });
}
