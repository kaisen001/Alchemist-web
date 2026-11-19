import type { Metadata } from "next";
import { ClientDashboard } from "@/components/ClientDashboard";

export const metadata: Metadata = {
  title: "Client dashboard · The Liquidity Alchemist",
  description:
    "Monitor trading performance, drawdown, settlements, agreement, and account status.",
};

export default function DashboardPage() {
  return <ClientDashboard />;
}
