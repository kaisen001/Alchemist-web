import type { Metadata } from "next";
import { ManagementPage } from "@/components/ManagementPage";

export const metadata: Metadata = {
  title: "Account Management · The Liquidity Alchemist",
  description:
    "LQD Capital Management ($50,000+) and LQD Managed Trading ($5,000–$10,000). Apply for discretionary account management with LQD Alchemist.",
};

export default function ManagementRoute() {
  return <ManagementPage />;
}
