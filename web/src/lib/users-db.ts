import type { ClientSession } from "./auth";
import { readJsonFile, writeJsonFile } from "./store";

export type StoredUser = ClientSession & {
  id: string;
  kind: "portal";
};

const FILE = "users.json";

export async function listUsers(): Promise<StoredUser[]> {
  const users = await readJsonFile<StoredUser[]>(FILE, []);
  return users.map((u) => ({ ...u, kind: "portal" as const }));
}

export async function findUser(username: string) {
  const users = await listUsers();
  return users.find((u) => u.username.toLowerCase() === username.toLowerCase()) ?? null;
}

export async function upsertUser(
  session: Omit<ClientSession, "kind"> & { kind?: "portal" },
): Promise<StoredUser> {
  const users = await listUsers();
  const existing = users.findIndex((u) => u.username.toLowerCase() === session.username.toLowerCase());
  const record: StoredUser = {
    ...session,
    kind: "portal",
    id: existing >= 0 ? users[existing].id : `user_${Date.now()}`,
  };

  if (existing >= 0) users[existing] = record;
  else users.push(record);

  await writeJsonFile(FILE, users);
  return record;
}
