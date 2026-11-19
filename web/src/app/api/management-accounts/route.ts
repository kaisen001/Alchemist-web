import { NextResponse } from "next/server";
import { findUser } from "@/lib/users-db";
import {
  createManagementAccount,
  listManagementAccounts,
  updateManagementStatus,
  type ManagementStatus,
} from "@/lib/management-accounts-db";

export async function GET(request: Request) {
  const admin = new URL(request.url).searchParams.get("admin") === "1";
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ accounts: await listManagementAccounts() });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    name?: string;
    username?: string;
    phone?: string;
    phoneCode?: string;
    country?: string;
    countryCode?: string;
    broker?: string;
    accountBalance?: string;
    currency?: string;
    preferredAccount?: string;
    message?: string;
  } | null;

  const username = body?.username?.trim().replace(/^@/, "");
  const name = body?.name?.trim();
  if (!username || !name) {
    return NextResponse.json({ error: "Name and username required" }, { status: 400 });
  }

  if (await findUser(username)) {
    return NextResponse.json(
      { error: "This username is already used by a normal portal account. Choose another." },
      { status: 409 },
    );
  }

  try {
    const account = await createManagementAccount({
      name,
      username,
      phone: body?.phone,
      phoneCode: body?.phoneCode,
      country: body?.country ?? "",
      countryCode: body?.countryCode,
      broker: body?.broker?.trim() || "",
      accountBalance: body?.accountBalance?.trim() || "",
      currency: body?.currency || "USD",
      preferredAccount: body?.preferredAccount || "managed",
      message: body?.message?.trim() || "New management account application",
    });
    return NextResponse.json({ ok: true, account });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Could not create management account" },
      { status: 409 },
    );
  }
}

export async function PATCH(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    id?: string;
    status?: ManagementStatus;
  } | null;

  if (!body?.id || !body?.status) {
    return NextResponse.json({ error: "id and status required" }, { status: 400 });
  }

  const account = await updateManagementStatus(body.id, body.status);
  if (!account) {
    return NextResponse.json({ error: "Management account not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true, account });
}
