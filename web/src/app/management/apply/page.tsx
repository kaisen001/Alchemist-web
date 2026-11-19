import type { Metadata } from "next";
import { ManagementApplyForm } from "@/components/ManagementApplyForm";

export const metadata: Metadata = {
  title: "Apply · Account Management · The Liquidity Alchemist",
  description: "Create a separate account management application for Managed Trading or Capital Management.",
};

export default function ManagementApplyPage() {
  return <ManagementApplyForm />;
}
