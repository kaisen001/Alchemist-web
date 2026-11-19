export type DemandStatus = "pending" | "reviewing" | "accepted" | "rejected";

export type ManagementDemand = {
  id: string;
  username: string;
  name: string;
  phone?: string;
  country: string;
  broker: string;
  accountBalance: string;
  currency: string;
  preferredAccount: string;
  message: string;
  status: DemandStatus;
  createdAt: string;
  updatedAt: string;
};
