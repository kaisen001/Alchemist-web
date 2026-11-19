export type ManagementStatus = "pending" | "reviewing" | "accepted" | "rejected";

export type ManagementAccount = {
  id: string;
  kind: "management";
  name: string;
  username: string;
  phone?: string;
  phoneCode?: string;
  country: string;
  countryCode?: string;
  broker: string;
  accountBalance: string;
  currency: string;
  preferredAccount: string;
  message: string;
  status: ManagementStatus;
  createdAt: string;
  updatedAt: string;
};
