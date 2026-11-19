import type { ManagementAccount, ManagementStatus } from "./management-accounts";
import { readJsonFile, writeJsonFile } from "./store";

export type { ManagementAccount, ManagementStatus };

const FILE = "management_accounts.json";

export async function listManagementAccounts(): Promise<ManagementAccount[]> {
  const items = await readJsonFile<ManagementAccount[]>(FILE, []);
  return items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function findManagementAccount(username: string) {
  const items = await listManagementAccounts();
  return items.find((a) => a.username.toLowerCase() === username.toLowerCase()) ?? null;
}

export async function createManagementAccount(
  input: Omit<ManagementAccount, "id" | "kind" | "status" | "createdAt" | "updatedAt">,
): Promise<ManagementAccount> {
  const items = await listManagementAccounts();
  if (items.some((a) => a.username.toLowerCase() === input.username.toLowerCase())) {
    throw new Error("A management account with this username already exists");
  }

  const now = new Date().toISOString();
  const account: ManagementAccount = {
    ...input,
    id: `mgmt_${Date.now()}`,
    kind: "management",
    status: "pending",
    createdAt: now,
    updatedAt: now,
  };
  items.unshift(account);
  await writeJsonFile(FILE, items);
  return account;
}

export async function updateManagementStatus(id: string, status: ManagementStatus) {
  const items = await listManagementAccounts();
  const idx = items.findIndex((a) => a.id === id);
  if (idx < 0) return null;
  items[idx] = { ...items[idx], status, updatedAt: new Date().toISOString() };
  await writeJsonFile(FILE, items);
  return items[idx];
}
