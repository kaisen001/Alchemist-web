"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { clearAdminSession, getAdminSession } from "@/lib/admin";
import type { LearningLibrary } from "@/lib/learning";
import type { ManagementAccount } from "@/lib/management-accounts";
import { LINKS } from "@/lib/copy";

type Tab = "overview" | "management" | "users" | "pdfs" | "videos";

type Stats = {
  accountsCreated: number;
  managementAccounts: number;
  pendingManagement: number;
  publishedPdfs: number;
  publishedVideos: number;
};

type ClientRow = {
  id: string;
  name: string;
  username: string;
  country: string;
  phone?: string;
  createdAt: string;
};

export function AdminDashboard() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<Tab>("overview");
  const [stats, setStats] = useState<Stats | null>(null);
  const [managementAccounts, setManagementAccounts] = useState<ManagementAccount[]>([]);
  const [users, setUsers] = useState<ClientRow[]>([]);
  const [library, setLibrary] = useState<LearningLibrary>({ pdfs: [], videos: [] });
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  const [pdfTitle, setPdfTitle] = useState("");
  const [pdfDescription, setPdfDescription] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [videoDuration, setVideoDuration] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const refresh = useCallback(async () => {
    const [statsRes, managementRes, usersRes, libraryRes] = await Promise.all([
      fetch("/api/admin/stats").then((r) => r.json()),
      fetch("/api/management-accounts?admin=1").then((r) => r.json()),
      fetch("/api/clients").then((r) => r.json()),
      fetch("/api/admin/learning").then((r) => r.json()),
    ]);
    setStats(statsRes);
    setManagementAccounts(managementRes.accounts ?? []);
    setUsers(usersRes.users ?? []);
    setLibrary(libraryRes);
  }, []);

  useEffect(() => {
    if (!getAdminSession()) {
      router.replace(LINKS.adminLogin);
      return;
    }
    setReady(true);
    void refresh();
  }, [router, refresh]);

  function logout() {
    clearAdminSession();
    router.push(LINKS.adminLogin);
  }

  async function setManagementStatus(id: string, next: ManagementAccount["status"]) {
    setSaving(true);
    setStatus("");
    try {
      const res = await fetch("/api/management-accounts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: next }),
      });
      if (!res.ok) throw new Error("Could not update management account");
      await refresh();
      setStatus("Management account updated.");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Update failed");
    } finally {
      setSaving(false);
    }
  }

  async function uploadLearning(e: FormEvent, type: "pdf" | "video") {
    e.preventDefault();
    const title = type === "pdf" ? pdfTitle : videoTitle;
    const description = type === "pdf" ? pdfDescription : videoDescription;
    const file = type === "pdf" ? pdfFile : videoFile;
    if (!title.trim() || !file) {
      setStatus("Add a title and choose a file from your computer.");
      return;
    }

    setSaving(true);
    setStatus("");
    try {
      const form = new FormData();
      form.set("type", type);
      form.set("title", title.trim());
      form.set("description", description.trim());
      if (type === "video") form.set("duration", videoDuration.trim());
      form.set("file", file);

      const res = await fetch("/api/admin/learning/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setLibrary(data.library);
      if (type === "pdf") {
        setPdfTitle("");
        setPdfDescription("");
        setPdfFile(null);
      } else {
        setVideoTitle("");
        setVideoDescription("");
        setVideoDuration("");
        setVideoFile(null);
      }
      await refresh();
      setStatus("Published to registered account dashboards.");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setSaving(false);
    }
  }

  if (!ready) {
    return (
      <div className="admin admin--loading">
        <p>…</p>
      </div>
    );
  }

  return (
    <div className="admin">
      <aside className="admin-side">
        <div className="admin-side__brand">
          <img src="/images/logo.png" alt="" width={36} height={36} />
          <div>
            <strong>LQD Admin</strong>
            <span>Control panel</span>
          </div>
        </div>
        <nav>
          {(
            [
              ["overview", "Overview"],
              [
                "management",
                `Account management${stats?.pendingManagement ? ` (${stats.pendingManagement})` : ""}`,
              ],
              ["users", "Portal accounts"],
              ["pdfs", "PDF library"],
              ["videos", "Video library"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={tab === id ? "is-active" : undefined}
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          ))}
        </nav>
        <div className="admin-side__foot">
          <Link href="/">Website</Link>
          <Link href={LINKS.dashboard}>Client portal</Link>
          <button type="button" onClick={logout}>
            Sign out
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-top">
          <div>
            <p className="admin-eyebrow">Liquidity Alchemist</p>
            <h1>Admin dashboard</h1>
          </div>
          {status && <p className="admin-status">{status}</p>}
        </header>

        {tab === "overview" && (
          <section className="admin-grid">
            <article>
              <span>Portal accounts created</span>
              <strong>{stats?.accountsCreated ?? 0}</strong>
            </article>
            <article>
              <span>Management accounts</span>
              <strong>{stats?.managementAccounts ?? 0}</strong>
            </article>
            <article>
              <span>Pending management</span>
              <strong>{stats?.pendingManagement ?? 0}</strong>
            </article>
            <article>
              <span>Published PDFs</span>
              <strong>{stats?.publishedPdfs ?? 0}</strong>
            </article>
            <article>
              <span>Published videos</span>
              <strong>{stats?.publishedVideos ?? 0}</strong>
            </article>
          </section>
        )}

        {tab === "management" && (
          <section className="admin-panel">
            <h2>Account management</h2>
            <p className="admin-panel__lead">
              Separate from portal accounts. New Managed Trading / Capital Management applications land here.
            </p>
            {managementAccounts.length === 0 ? (
              <div className="admin-empty">No management accounts yet.</div>
            ) : (
              <ul className="admin-list">
                {managementAccounts.map((account) => (
                  <li key={account.id}>
                    <div>
                      <strong>
                        {account.name} · @{account.username}
                      </strong>
                      <p>
                        {account.preferredAccount} · {account.broker} · {account.currency}{" "}
                        {account.accountBalance} · {account.country}
                      </p>
                      <p>{account.message}</p>
                      <p>
                        Status:{" "}
                        <em className={`admin-badge admin-badge--${account.status}`}>{account.status}</em> ·{" "}
                        {new Date(account.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="admin-list__actions">
                      <button
                        type="button"
                        disabled={saving}
                        onClick={() => setManagementStatus(account.id, "reviewing")}
                      >
                        Review
                      </button>
                      <button
                        type="button"
                        disabled={saving}
                        onClick={() => setManagementStatus(account.id, "accepted")}
                      >
                        Accept
                      </button>
                      <button
                        type="button"
                        disabled={saving}
                        onClick={() => setManagementStatus(account.id, "rejected")}
                      >
                        Reject
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {tab === "users" && (
          <section className="admin-panel">
            <h2>Portal accounts</h2>
            <p className="admin-panel__lead">
              Normal client accounts created from `/register` for EMS Academy and the portal.
            </p>
            {users.length === 0 ? (
              <div className="admin-empty">No portal accounts yet.</div>
            ) : (
              <ul className="admin-list">
                {users.map((user) => (
                  <li key={user.id}>
                    <div>
                      <strong>
                        {user.name} · @{user.username}
                      </strong>
                      <p>
                        {user.country || "—"} · {user.phone || "—"}
                      </p>
                      <p>Created {new Date(user.createdAt).toLocaleString()}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {tab === "pdfs" && (
          <section className="admin-panel">
            <h2>PDF library</h2>
            <p className="admin-panel__lead">
              Upload from your PC. Once sent, only users with an account see it in their dashboard.
            </p>
            <ul className="admin-list">
              {library.pdfs.map((pdf) => (
                <li key={pdf.id}>
                  <div>
                    <strong>{pdf.title}</strong>
                    <p>{pdf.description}</p>
                    <p>{pdf.url}</p>
                  </div>
                </li>
              ))}
            </ul>
            <form className="admin-form" onSubmit={(e) => uploadLearning(e, "pdf")}>
              <h3>Upload & publish PDF</h3>
              <label>
                <span>Title</span>
                <input required value={pdfTitle} onChange={(e) => setPdfTitle(e.target.value)} />
              </label>
              <label>
                <span>Description</span>
                <textarea rows={3} value={pdfDescription} onChange={(e) => setPdfDescription(e.target.value)} />
              </label>
              <label>
                <span>PDF file</span>
                <input
                  required
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={(e) => setPdfFile(e.target.files?.[0] ?? null)}
                />
              </label>
              <button className="btn btn--primary" type="submit" disabled={saving}>
                {saving ? "Sending…" : "Send to account dashboards"}
              </button>
            </form>
          </section>
        )}

        {tab === "videos" && (
          <section className="admin-panel">
            <h2>Video library</h2>
            <p className="admin-panel__lead">
              Upload recorded sessions from your PC. Visible only to signed-in account holders.
            </p>
            <ul className="admin-list">
              {library.videos.map((video) => (
                <li key={video.id}>
                  <div>
                    <strong>{video.title}</strong>
                    <p>{video.description}</p>
                    <p>
                      {video.duration || "—"} · {video.url || "No file yet"}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <form className="admin-form" onSubmit={(e) => uploadLearning(e, "video")}>
              <h3>Upload & publish video</h3>
              <label>
                <span>Title</span>
                <input required value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)} />
              </label>
              <label>
                <span>Description</span>
                <textarea
                  rows={3}
                  value={videoDescription}
                  onChange={(e) => setVideoDescription(e.target.value)}
                />
              </label>
              <label>
                <span>Duration</span>
                <input value={videoDuration} onChange={(e) => setVideoDuration(e.target.value)} placeholder="12:40" />
              </label>
              <label>
                <span>Video file</span>
                <input
                  required
                  type="file"
                  accept="video/*,.mp4,.webm,.mov"
                  onChange={(e) => setVideoFile(e.target.files?.[0] ?? null)}
                />
              </label>
              <button className="btn btn--primary" type="submit" disabled={saving}>
                {saving ? "Sending…" : "Send to account dashboards"}
              </button>
            </form>
          </section>
        )}
      </main>
    </div>
  );
}
