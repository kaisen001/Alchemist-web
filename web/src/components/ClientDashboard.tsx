"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { LINKS } from "@/lib/copy";
import { clearSession, getSession, type ClientSession } from "@/lib/auth";
import {
  getLearningLibrary,
  type LearningLibrary,
} from "@/lib/learning";
import { useLocale } from "@/lib/locale";
import { AppProviders } from "./AppProviders";

type View =
  | "home"
  | "collaborations"
  | "consultations"
  | "academy"
  | "lives"
  | "resources"
  | "exclusives"
  | "referrals"
  | "management"
  | "performance"
  | "history"
  | "settlements"
  | "agreement"
  | "notifications"
  | "requests";

const PERFORMANCE = [8, 12, 9, 15, 11, 18, 14, 21, 17, 24, 22, 28];
const TRADES = [
  { date: "2026-11-17", symbol: "XAUUSD", side: "Buy", pnl: "+$420" },
  { date: "2026-11-16", symbol: "EURUSD", side: "Sell", pnl: "+$180" },
  { date: "2026-11-14", symbol: "NAS100", side: "Buy", pnl: "-$95" },
  { date: "2026-11-12", symbol: "XAUUSD", side: "Sell", pnl: "+$310" },
  { date: "2026-11-10", symbol: "GBPUSD", side: "Buy", pnl: "+$140" },
];
const SETTLEMENTS = [
  { date: "2026-11-01", type: "Profit share", amount: "-$650", note: "October settlement" },
  { date: "2026-10-01", type: "Profit share", amount: "-$480", note: "September settlement" },
  { date: "2026-09-15", type: "Deposit", amount: "+$10,000", note: "Initial allocation" },
];
const NOTICES = [
  "Agreement digitally signed — mandate active.",
  "Weekly report ready for download.",
  "October settlement has been posted.",
];

const TOP_ACTIONS: { id: View; icon: string; title: string; blurb: string }[] = [
  { id: "collaborations", icon: "🤝", title: "Collaborations", blurb: "Partner with LQD" },
  { id: "consultations", icon: "📅", title: "Consultations", blurb: "Book 1-on-1 calls" },
  { id: "academy", icon: "🎓", title: "Academy", blurb: "PDFs & recorded videos" },
  { id: "lives", icon: "🔴", title: "Live sessions", blurb: "Trade with the mentor" },
];

const MID_MODULES: {
  id: View;
  icon: string;
  title: string;
  blurb: string;
  badge?: string;
}[] = [
  {
    id: "academy",
    icon: "🎓",
    title: "EMS Academy",
    blurb: "Learn with recorded videos and PDF materials.",
    badge: "Learn",
  },
  {
    id: "lives",
    icon: "🔴",
    title: "Live sessions",
    blurb: "Join live market navigation with LQD Alchemist.",
    badge: "Live",
  },
  {
    id: "resources",
    icon: "📚",
    title: "Resources",
    blurb: "Short-form lessons, notes and downloadable kits.",
  },
  {
    id: "exclusives",
    icon: "✦",
    title: "Exclusives",
    blurb: "Inner Circle, VIP signals and partner perks.",
    badge: "VIP",
  },
  {
    id: "referrals",
    icon: "🔗",
    title: "Referrals",
    blurb: "Invite traders and earn tiered rewards.",
  },
];

function Chart({ values }: { values: number[] }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const points = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * 100;
      const y = 100 - ((v - min) / (max - min || 1)) * 78 - 10;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg className="kdash-chart" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="kdashFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(47,107,255,0.35)" />
          <stop offset="100%" stopColor="rgba(47,107,255,0)" />
        </linearGradient>
      </defs>
      <polygon fill="url(#kdashFill)" points={`0,100 ${points} 100,100`} />
      <polyline fill="none" stroke="#4d82ff" strokeWidth="1.8" points={points} />
    </svg>
  );
}

function Panel({
  title,
  children,
  action,
}: {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <section className="kdash-panel">
      <div className="kdash-panel__head">
        <h2>{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function DashboardInner() {
  const { t, locale } = useLocale();
  const router = useRouter();
  const [session, setLocal] = useState<ClientSession | null>(null);
  const [view, setView] = useState<View>("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [library, setLibrary] = useState<LearningLibrary>({ pdfs: [], videos: [] });
  const chart = useMemo(() => PERFORMANCE, []);

  useEffect(() => {
    const s = getSession();
    if (!s) {
      router.replace(LINKS.register);
      return;
    }
    setLocal(s);
    if (s.kind === "management") setView("management");
  }, [router]);

  useEffect(() => {
    if (!session) return;
    if (view === "academy") {
      getLearningLibrary(session.username)
        .then(setLibrary)
        .catch(() => setLibrary({ pdfs: [], videos: [] }));
    }
  }, [view, session]);

  if (!session) {
    return (
      <div className="kdash kdash--loading" lang={locale}>
        <p>…</p>
      </div>
    );
  }

  function logout() {
    clearSession();
    router.push(LINKS.login);
  }

  function go(next: View) {
    setView(next);
    setSidebarOpen(false);
  }

  const firstName = session.name.split(" ")[0];
  const planLabel =
    t.auth.preferredOptions.find((o) => o.value === session.preferredAccount)?.label ??
    session.preferredAccount ??
    "—";
  const balanceLabel = session.accountBalance
    ? `${session.currency || "USD"} ${Number(session.accountBalance).toLocaleString()}`
    : "$12,480.00";

  const isManagement = session.kind === "management";
  const sideNav: { id: View; label: string }[] = isManagement
    ? [
        { id: "management", label: "Account management" },
        { id: "performance", label: "Performance" },
        { id: "history", label: "History" },
        { id: "settlements", label: "Settlements" },
        { id: "agreement", label: "Agreement" },
        { id: "notifications", label: "Notifications" },
        { id: "requests", label: "Withdraw / terminate" },
      ]
    : [
        { id: "home", label: "Home" },
        { id: "notifications", label: "Notifications" },
        { id: "academy", label: "EMS Academy" },
        { id: "lives", label: "Live sessions" },
        { id: "resources", label: "Resources" },
        { id: "exclusives", label: "Exclusives" },
        { id: "referrals", label: "Referrals" },
        { id: "consultations", label: "Consultations" },
        { id: "collaborations", label: "Collaborations" },
      ];

  return (
    <div className="kdash" lang={locale} data-theme="dark">
      <aside className={`kdash-side ${sidebarOpen ? "is-open" : ""}`}>
        <div className="kdash-side__brand">
          <img src="/images/logo.png" alt="" width={36} height={36} />
          <div>
            <strong>LQD</strong>
            <span>{isManagement ? "Management account" : "Portal account"}</span>
          </div>
        </div>

        <nav className="kdash-side__nav" aria-label="Dashboard">
          {sideNav.map((item) => (
            <button
              key={item.id}
              type="button"
              className={view === item.id ? "is-active" : undefined}
              onClick={() => go(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="kdash-side__foot">
          <Link href="/">Website</Link>
          <button type="button" onClick={logout}>
            {t.dash.logout}
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <button
          type="button"
          className="kdash-scrim"
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="kdash-shell">
        <header className="kdash-top">
          <button
            type="button"
            className="kdash-menu"
            aria-label="Open menu"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
          <div className="kdash-top__search" aria-hidden>
            <span>Search academy, management, resources…</span>
          </div>
          <div className="kdash-top__user">
            <button type="button" className="kdash-bell" onClick={() => go("notifications")}>
              ●
            </button>
            <div className="kdash-avatar" aria-hidden>
              {session.name.slice(0, 1).toUpperCase()}
            </div>
            <div className="kdash-top__meta">
              <strong>{session.name}</strong>
              <span>@{session.username}</span>
            </div>
          </div>
        </header>

        <main className="kdash-main">
          {view === "home" && (
            <>
              <header className="kdash-hero">
                <p className="kdash-eyebrow">Dashboard home</p>
                <h1>
                  Welcome back, <em>{firstName}</em>.
                </h1>
                <p className="kdash-sub">
                  Your Liquidity Alchemist hub — learn, trade live, and manage capital in one place.
                </p>
              </header>

              <section className="kdash-section">
                <div className="kdash-section__label">Quick access</div>
                <div className="kdash-icons">
                  {TOP_ACTIONS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className="kdash-icon"
                      onClick={() => go(item.id)}
                    >
                      <span className="kdash-icon__glyph" aria-hidden>
                        {item.icon}
                      </span>
                      <strong>{item.title}</strong>
                      <span>{item.blurb}</span>
                    </button>
                  ))}
                </div>
              </section>

              <section className="kdash-section">
                <div className="kdash-section__label">Platform modules</div>
                <div className="kdash-modules">
                  {MID_MODULES.map((mod) => (
                    <button
                      key={mod.id}
                      type="button"
                      className="kdash-module"
                      onClick={() => go(mod.id)}
                    >
                      <div className="kdash-module__top">
                        <span className="kdash-module__glyph" aria-hidden>
                          {mod.icon}
                        </span>
                        {mod.badge && <em>{mod.badge}</em>}
                      </div>
                      <strong>{mod.title}</strong>
                      <span>{mod.blurb}</span>
                    </button>
                  ))}
                </div>
              </section>

              <section className="kdash-section">
                <div className="kdash-section__label">Your account</div>
                <div className="kdash-metrics">
                  <article>
                    <span>{t.dash.balance}</span>
                    <strong>{balanceLabel}</strong>
                  </article>
                  <article>
                    <span>{t.dash.equity}</span>
                    <strong>$12,910.40</strong>
                  </article>
                  <article>
                    <span>{t.dash.drawdown}</span>
                    <strong className="neg">-3.2%</strong>
                  </article>
                  <article>
                    <span>{t.dash.managerShare}</span>
                    <strong>30%</strong>
                  </article>
                </div>
              </section>

              <section className="kdash-section">
                <div className="kdash-section__label">{t.dash.chartTitle}</div>
                <div className="kdash-chart-wrap kdash-chart-wrap--home">
                  <Chart values={chart} />
                </div>
                <button type="button" className="kdash-link" onClick={() => go("performance")}>
                  Open performance
                </button>
              </section>
            </>
          )}

          {view === "collaborations" && (
            <Panel title="Collaborations">
              <p className="kdash-copy">
                Brands, brokers and media partners can propose collaborations with The Liquidity
                Alchemist.
              </p>
              <a className="btn btn--primary" href={LINKS.telegram} target="_blank" rel="noreferrer">
                Submit a proposal
              </a>
            </Panel>
          )}

          {view === "consultations" && (
            <Panel title="Consultations">
              <p className="kdash-copy">
                Book private video consultations for psychology, strategy review, portfolio structure
                and risk rules.
              </p>
              <ul className="kdash-list">
                <li>
                  <span>1-on-1 Sessions</span>
                  <strong>$350</strong>
                </li>
                <li>
                  <span>Includes</span>
                  <strong>Inner Circle lifetime</strong>
                </li>
              </ul>
              <a className="btn btn--primary" href={LINKS.telegram} target="_blank" rel="noreferrer">
                Request a slot
              </a>
            </Panel>
          )}

          {view === "academy" && (
            <Panel title="EMS Academy">
              <p className="kdash-copy">
                Dedicated learning library — recorded videos and PDF materials from your database.
              </p>

              <div className="kdash-learn">
                <section>
                  <h3>Recorded videos</h3>
                  {library.videos.length === 0 ? (
                    <div className="kdash-empty">No videos in the library yet.</div>
                  ) : (
                    <ul className="kdash-learn__list">
                      {library.videos.map((video) => (
                        <li key={video.id}>
                          <div>
                            <strong>{video.title}</strong>
                            <p>{video.description}</p>
                            <span>{video.duration}</span>
                          </div>
                          {video.url ? (
                            <a className="btn btn--ghost btn--sm" href={video.url} target="_blank" rel="noreferrer">
                              Watch
                            </a>
                          ) : (
                            <span className="kdash-learn__soon">Coming soon</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>

                <section>
                  <h3>PDF materials</h3>
                  {library.pdfs.length === 0 ? (
                    <div className="kdash-empty">No PDFs in the library yet.</div>
                  ) : (
                    <ul className="kdash-learn__list">
                      {library.pdfs.map((pdf) => (
                        <li key={pdf.id}>
                          <div>
                            <strong>{pdf.title}</strong>
                            <p>{pdf.description}</p>
                            <span>{pdf.tags.join(" · ")}</span>
                          </div>
                          {pdf.url ? (
                            <a className="btn btn--primary btn--sm" href={pdf.url} target="_blank" rel="noreferrer">
                              Open PDF
                            </a>
                          ) : (
                            <span className="kdash-learn__soon">Coming soon</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              </div>
            </Panel>
          )}

          {view === "lives" && (
            <Panel title="Live sessions">
              <p className="kdash-copy">Navigate markets in real time with LQD Alchemist.</p>
              <ul className="kdash-notes kdash-notes--large">
                <li>Next EMS live room — confirm in Telegram</li>
                <li>Replay vault — available to session members</li>
                <li>Focus: liquidity, structure, execution</li>
              </ul>
              <a className="btn btn--primary" href={LINKS.telegram} target="_blank" rel="noreferrer">
                Get session access
              </a>
            </Panel>
          )}

          {view === "resources" && (
            <Panel title="Resources">
              <ul className="kdash-notes kdash-notes--large">
                <li>EMS Trinity PDF — core framework</li>
                <li>Smart Money notes — liquidity concepts</li>
                <li>Risk checklist — pre-trade routine</li>
              </ul>
              <button type="button" className="btn btn--ghost" onClick={() => go("academy")}>
                Open EMS Academy library
              </button>
            </Panel>
          )}

          {view === "exclusives" && (
            <Panel title="Exclusives">
              <ul className="kdash-list">
                <li>
                  <span>Inner Circle</span>
                  <strong>Included with EMS paths</strong>
                </li>
                <li>
                  <span>Premium signals</span>
                  <strong>Monthly access</strong>
                </li>
                <li>
                  <span>Equity Edge</span>
                  <strong>Code ALCHEMIST · 50% off</strong>
                </li>
              </ul>
              <div className="kdash-actions">
                <a className="btn btn--primary" href={LINKS.telegram} target="_blank" rel="noreferrer">
                  Ask about access
                </a>
                <a className="btn btn--ghost" href={LINKS.equityEdge} target="_blank" rel="noreferrer">
                  Equity Edge
                </a>
              </div>
            </Panel>
          )}

          {view === "referrals" && (
            <Panel title="Referrals">
              <p className="kdash-copy">
                Invite traders into mentorship or management. Rewards scale with qualified referrals.
              </p>
              <ul className="kdash-list">
                <li>
                  <span>Your code</span>
                  <strong>LQD-{firstName.toUpperCase()}</strong>
                </li>
                <li>
                  <span>Tier</span>
                  <strong>Starter · 15%</strong>
                </li>
                <li>
                  <span>Qualified invites</span>
                  <strong>0</strong>
                </li>
              </ul>
              <button type="button" className="btn btn--primary">
                Copy invite link
              </button>
            </Panel>
          )}

          {view === "management" && (
            <Panel title="Account management">
              {!isManagement ? (
                <>
                  <p className="kdash-copy">
                    Account Management is a separate account type. Create a management account to apply for
                    Managed Trading or Capital Management.
                  </p>
                  <a className="btn btn--primary" href={LINKS.managementApply}>
                    Create management account
                  </a>
                </>
              ) : (
                <>
                  <ul className="kdash-list">
                    <li>
                      <span>{t.auth.country}</span>
                      <strong>{session.country || "—"}</strong>
                    </li>
                    <li>
                      <span>{t.auth.broker}</span>
                      <strong>{session.broker || "—"}</strong>
                    </li>
                    <li>
                      <span>Plan</span>
                      <strong>{planLabel}</strong>
                    </li>
                    <li>
                      <span>{t.dash.balance}</span>
                      <strong>{balanceLabel}</strong>
                    </li>
                    <li>
                      <span>{t.dash.statusLabel}</span>
                      <strong className={session.managementStatus === "accepted" ? "pos" : undefined}>
                        {session.managementStatus || "pending"}
                      </strong>
                    </li>
                  </ul>
                  <p className="kdash-copy">
                    Your management account was submitted to admin. Status updates appear here after review.
                  </p>
                  <div className="kdash-actions">
                    <button type="button" className="btn btn--ghost" onClick={() => go("performance")}>
                      Performance
                    </button>
                    <button type="button" className="btn btn--ghost" onClick={() => go("history")}>
                      History
                    </button>
                    <button type="button" className="btn btn--ghost" onClick={() => go("settlements")}>
                      Settlements
                    </button>
                    <button type="button" className="btn btn--ghost" onClick={() => go("agreement")}>
                      Agreement
                    </button>
                    <button type="button" className="btn btn--primary" onClick={() => go("requests")}>
                      Withdraw / terminate
                    </button>
                  </div>
                </>
              )}
            </Panel>
          )}

          {view === "performance" && (
            <Panel title={t.dash.chartTitle}>
              <div className="kdash-chart-wrap kdash-chart-wrap--lg">
                <Chart values={chart} />
              </div>
              <section className="kdash-pnl" style={{ marginTop: "1rem" }}>
                <article>
                  <span>{t.dash.pnlDaily}</span>
                  <strong className="pos">+$210.00</strong>
                </article>
                <article>
                  <span>{t.dash.pnlWeekly}</span>
                  <strong className="pos">+$640.00</strong>
                </article>
                <article>
                  <span>{t.dash.pnlMonthly}</span>
                  <strong className="pos">+$1,280.00</strong>
                </article>
              </section>
            </Panel>
          )}

          {view === "history" && (
            <Panel title={t.dash.historyTitle}>
              <div className="kdash-table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>{t.dash.cols.date}</th>
                      <th>{t.dash.cols.symbol}</th>
                      <th>{t.dash.cols.side}</th>
                      <th>{t.dash.cols.pnl}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TRADES.map((row) => (
                      <tr key={`${row.date}-${row.symbol}-${row.pnl}`}>
                        <td>{row.date}</td>
                        <td>{row.symbol}</td>
                        <td>{row.side}</td>
                        <td className={row.pnl.startsWith("-") ? "neg" : "pos"}>{row.pnl}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>
          )}

          {view === "settlements" && (
            <Panel title={t.dash.settlementsTitle}>
              <div className="kdash-table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>{t.dash.cols.date}</th>
                      <th>{t.dash.cols.type}</th>
                      <th>{t.dash.cols.amount}</th>
                      <th>{t.dash.cols.note}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SETTLEMENTS.map((row) => (
                      <tr key={`${row.date}-${row.type}`}>
                        <td>{row.date}</td>
                        <td>{row.type}</td>
                        <td className={row.amount.startsWith("-") ? "neg" : "pos"}>{row.amount}</td>
                        <td>{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>
          )}

          {view === "agreement" && (
            <Panel title={t.dash.agreementTitle}>
              <p className="kdash-copy">
                Digitally signed mandate · profit share 30% · risk limits active · {planLabel}
              </p>
              <button type="button" className="btn btn--primary" onClick={() => go("management")}>
                {t.dash.openAgreement}
              </button>
            </Panel>
          )}

          {view === "notifications" && (
            <Panel title={t.dash.notificationsTitle}>
              <ul className="kdash-notes kdash-notes--large">
                {NOTICES.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </Panel>
          )}

          {view === "requests" && (
            <Panel title={t.dash.withdrawalTitle}>
              <p className="kdash-copy">{t.dash.withdrawalBody}</p>
              <div className="kdash-actions">
                <button type="button" className="btn btn--primary">
                  {t.dash.withdrawalCta}
                </button>
                <button type="button" className="btn btn--ghost">
                  {t.dash.terminateCta}
                </button>
              </div>
            </Panel>
          )}
        </main>
      </div>
    </div>
  );
}

export function ClientDashboard() {
  return (
    <AppProviders>
      <DashboardInner />
    </AppProviders>
  );
}
