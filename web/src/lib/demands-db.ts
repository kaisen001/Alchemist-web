import type { DemandStatus, ManagementDemand } from "./demands";
import { readJsonFile, writeJsonFile } from "./store";

export type { DemandStatus, ManagementDemand };

const FILE = "demands.json";

export async function listDemands(): Promise<ManagementDemand[]> {
  const items = await readJsonFile<ManagementDemand[]>(FILE, []);
  return items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function createDemand(
  input: Omit<ManagementDemand, "id" | "status" | "createdAt" | "updatedAt">,
): Promise<ManagementDemand> {
  const demands = await listDemands();
  const now = new Date().toISOString();
  const demand: ManagementDemand = {
    ...input,
    id: `demand_${Date.now()}`,
    status: "pending",
    createdAt: now,
    updatedAt: now,
  };
  demands.unshift(demand);
  await writeJsonFile(FILE, demands);
  return demand;
}

export async function updateDemandStatus(id: string, status: DemandStatus) {
  const demands = await listDemands();
  const idx = demands.findIndex((d) => d.id === id);
  if (idx < 0) return null;
  demands[idx] = { ...demands[idx], status, updatedAt: new Date().toISOString() };
  await writeJsonFile(FILE, demands);
  return demands[idx];
}

export async function listDemandsForUser(username: string) {
  const demands = await listDemands();
  return demands.filter((d) => d.username.toLowerCase() === username.toLowerCase());
}
