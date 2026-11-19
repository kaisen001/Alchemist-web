"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { LINKS } from "@/lib/copy";
import { setSession } from "@/lib/auth";
import { countryFlagSrc, findCountry } from "@/lib/countries";
import { useLocale } from "@/lib/locale";
import { AppProviders } from "./AppProviders";
import { CountrySelect } from "./CountrySelect";
import { Footer } from "./Footer";
import { Header } from "./Header";

const CURRENCIES = ["USD", "EUR", "GBP", "XOF", "NGN", "CAD", "AUD"];

function ManagementApplyInner() {
  const { t, locale } = useLocale();
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [password, setPassword] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [broker, setBroker] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [preferredAccount, setPreferredAccount] = useState(
    t.auth.preferredOptions[0]?.value ?? "managed",
  );
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  function onCountryChange(code: string) {
    setCountryCode(code);
    setPhoneCode(findCountry(code)?.dial ?? "");
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const cleanUsername = username.trim().replace(/^@/, "");
    const selected = findCountry(countryCode);
    const national = phone.trim().replace(/\s+/g, "");
    const fullPhone = national ? `${phoneCode}${national}` : undefined;

    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/management-accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          username: cleanUsername,
          phone: fullPhone,
          phoneCode,
          country: selected?.name ?? "",
          countryCode,
          broker: broker.trim(),
          accountBalance: accountBalance.trim(),
          currency,
          preferredAccount,
          message: message.trim() || "Management account application",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not create management account");

      setSession({
        kind: "management",
        name: data.account.name,
        username: data.account.username,
        phone: data.account.phone,
        phoneCode: data.account.phoneCode,
        country: data.account.country,
        countryCode: data.account.countryCode,
        broker: data.account.broker,
        accountBalance: data.account.accountBalance,
        currency: data.account.currency,
        preferredAccount: data.account.preferredAccount,
        managementStatus: data.account.status,
        createdAt: data.account.createdAt,
      });
      router.push(LINKS.dashboard);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create management account");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="site" lang={locale}>
      <Header />
      <main className="auth section">
        <div className="auth__card auth__card--wide">
          <img src="/images/logo.png" alt="" width={64} height={64} className="auth__logo" />
          <h1 className="section__title">Create management account</h1>
          <p className="section__support">
            Separate from the normal portal account. Apply for Managed Trading or Capital Management —
            your request is sent to admin for review.
          </p>

          <form className="auth__form" onSubmit={onSubmit}>
            <fieldset className="auth__fieldset">
              <legend>{t.auth.personalSection}</legend>
              <div className="auth__grid">
                <label>
                  <span>{t.auth.name}</span>
                  <input required value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                  <span>{t.auth.username}</span>
                  <input
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    minLength={3}
                    pattern="[A-Za-z0-9._-]+"
                  />
                </label>
                <CountrySelect
                  required
                  label={t.auth.country}
                  placeholder={t.auth.countryPlaceholder}
                  value={countryCode}
                  onChange={onCountryChange}
                />
                <label>
                  <span>{t.auth.phone}</span>
                  <div className="auth__phone">
                    <span className="auth__phone-code">
                      {countryCode ? (
                        <img src={countryFlagSrc(countryCode)} alt="" width={20} height={14} />
                      ) : null}
                      {phoneCode || "—"}
                    </span>
                    <input
                      required
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={!phoneCode}
                      placeholder="0700000000"
                    />
                  </div>
                </label>
                <label className="auth__full">
                  <span>{t.auth.password}</span>
                  <input
                    required
                    type="password"
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
              </div>
            </fieldset>

            <fieldset className="auth__fieldset">
              <legend>{t.auth.tradingSection}</legend>
              <div className="auth__grid">
                <label>
                  <span>{t.auth.broker}</span>
                  <input required value={broker} onChange={(e) => setBroker(e.target.value)} />
                </label>
                <label>
                  <span>{t.auth.accountBalance}</span>
                  <input
                    required
                    type="number"
                    min="0"
                    step="0.01"
                    value={accountBalance}
                    onChange={(e) => setAccountBalance(e.target.value)}
                  />
                </label>
                <label>
                  <span>{t.auth.currency}</span>
                  <select required value={currency} onChange={(e) => setCurrency(e.target.value)}>
                    {CURRENCIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="auth__full">
                  <span>{t.auth.preferredAccount}</span>
                  <select
                    required
                    value={preferredAccount}
                    onChange={(e) => setPreferredAccount(e.target.value)}
                  >
                    {t.auth.preferredOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="auth__full">
                  <span>Message to admin</span>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your goals…"
                  />
                </label>
              </div>
            </fieldset>

            {error && <p className="auth__error">{error}</p>}
            <button className="btn btn--primary btn--lg" type="submit" disabled={busy}>
              {busy ? "…" : "Create management account"}
            </button>
          </form>

          <p className="auth__switch">
            <Link href={LINKS.register}>Need a normal portal account instead?</Link>
          </p>
          <p className="auth__switch">
            <Link href={LINKS.management}>Back to Account Management</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function ManagementApplyForm() {
  return (
    <AppProviders>
      <ManagementApplyInner />
    </AppProviders>
  );
}
