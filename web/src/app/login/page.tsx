import type { Metadata } from "next";
import { AuthForm } from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Sign in · The Liquidity Alchemist",
  description: "Sign in to your Liquidity Alchemist client dashboard.",
};

export default function LoginPage() {
  return <AuthForm mode="login" />;
}
