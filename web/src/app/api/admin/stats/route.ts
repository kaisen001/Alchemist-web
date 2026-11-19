import { NextResponse } from "next/server";
import { readLocalLibrary } from "@/lib/learning-db";
import { listManagementAccounts } from "@/lib/management-accounts-db";
import { listUsers } from "@/lib/users-db";

export async function GET() {
  const [users, managementAccounts, library] = await Promise.all([
    listUsers(),
    listManagementAccounts(),
    readLocalLibrary(),
  ]);

  return NextResponse.json({
    accountsCreated: users.length,
    managementAccounts: managementAccounts.length,
    pendingManagement: managementAccounts.filter((a) => a.status === "pending").length,
    publishedPdfs: library.pdfs.filter((p) => p.published !== false).length,
    publishedVideos: library.videos.filter((v) => v.published !== false).length,
  });
}
