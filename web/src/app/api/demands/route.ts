import { NextResponse } from "next/server";
import {
  createDemand,
  listDemands,
  listDemandsForUser,
  updateDemandStatus,
  type DemandStatus,
} from "@/lib/demands-db";
import { findUser } from "@/lib/users-db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username")?.trim();
  const admin = searchParams.get("admin") === "1";

  if (admin) {
    return NextResponse.json({ demands: await listDemands() });
  }

  if (!username) {
    return NextResponse.json({ error: "username required" }, { status: 400 });
  }

  return NextResponse.json({ demands: await listDemandsForUser(username) });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    username?: string;
    message?: string;
  } | null;

  const username = body?.username?.trim();
  if (!username) {
    return NextResponse.json({ error: "Account required" }, { status: 401 });
  }

  const user = await findUser(username);
  if (!user) {
    return NextResponse.json({ error: "Create an account first" }, { status: 401 });
  }

  const demand = await createDemand({
    username: user.username,
    name: user.name,
    phone: user.phone,
    country: user.country || "",
    broker: user.broker || "",
    accountBalance: user.accountBalance || "",
    currency: user.currency || "USD",
    preferredAccount: user.preferredAccount || "",
    message: body?.message?.trim() || "Account management request",
  });

  return NextResponse.json({ ok: true, demand });
}

export async function PATCH(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    id?: string;
    status?: DemandStatus;
  } | null;

  if (!body?.id || !body?.status) {
    return NextResponse.json({ error: "id and status required" }, { status: 400 });
  }

  const demand = await updateDemandStatus(body.id, body.status);
  if (!demand) {
    return NextResponse.json({ error: "Demand not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true, demand });
}
