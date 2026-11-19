import type { Metadata } from "next";
import { AuthForm } from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Create account · The Liquidity Alchemist",
  description: "Create a client account to apply for account management and access your dashboard.",
};

export default function RegisterPage() {
  return <AuthForm mode="register" />;
}
