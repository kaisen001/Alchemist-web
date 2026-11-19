import { NextResponse } from "next/server";
import { findManagementAccount } from "@/lib/management-accounts-db";
import { findUser } from "@/lib/users-db";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { username?: string } | null;
  const username = body?.username?.trim().replace(/^@/, "");
  if (!username) {
    return NextResponse.json({ error: "Username required" }, { status: 400 });
  }

  const portal = await findUser(username);
  if (portal) {
    return NextResponse.json({ ok: true, user: portal });
  }

  const management = await findManagementAccount(username);
  if (management) {
    return NextResponse.json({
      ok: true,
      user: {
        kind: "management" as const,
        name: management.name,
        username: management.username,
        phone: management.phone,
        phoneCode: management.phoneCode,
        country: management.country,
        countryCode: management.countryCode,
        broker: management.broker,
        accountBalance: management.accountBalance,
        currency: management.currency,
        preferredAccount: management.preferredAccount,
        managementStatus: management.status,
        createdAt: management.createdAt,
      },
    });
  }

  return NextResponse.json({ error: "No account found. Create an account first." }, { status: 404 });
}
