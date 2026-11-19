import { NextResponse } from "next/server";
import { fetchLearningLibrary } from "@/lib/learning-db";
import { findManagementAccount } from "@/lib/management-accounts-db";
import { findUser } from "@/lib/users-db";

export async function GET(request: Request) {
  const username = request.headers.get("x-lqd-user")?.trim();
  if (!username) {
    return NextResponse.json({ error: "Account required" }, { status: 401 });
  }

  const portal = await findUser(username);
  const management = portal ? null : await findManagementAccount(username);
  if (!portal && !management) {
    return NextResponse.json({ error: "Account required" }, { status: 401 });
  }

  const library = await fetchLearningLibrary();
  return NextResponse.json(library);
}
