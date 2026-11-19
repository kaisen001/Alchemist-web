"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { getAdminSession, setAdminSession } from "@/lib/admin";
import { LINKS } from "@/lib/copy";

export function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (getAdminSession()) router.replace(LINKS.admin);
  }, [router]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError("Invalid admin password");
        return;
      }
      setAdminSession({ role: "admin", signedInAt: new Date().toISOString() });
      router.push(LINKS.admin);
    } catch {
      setError("Could not sign in");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-login">
      <form className="admin-login__card" onSubmit={onSubmit}>
        <img src="/images/logo.png" alt="" width={56} height={56} />
        <h1>Admin sign in</h1>
        <p>Manage EMS Academy PDFs, videos and portal content.</p>
        <label>
          <span>Password</span>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </label>
        {error && <p className="admin-login__error">{error}</p>}
        <button className="btn btn--primary btn--lg" type="submit" disabled={loading}>
          {loading ? "Checking…" : "Enter dashboard"}
        </button>
        <Link href="/">Back to website</Link>
      </form>
    </div>
  );
}
