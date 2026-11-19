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
import { Header } from "./Header";
import { Footer } from "./Footer";
import { TermsModal } from "./TermsModal";

function AuthInner({ mode }: { mode: "register" | "login" }) {
  const { t, locale } = useLocale();
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [password, setPassword] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [termsOpen, setTermsOpen] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  function onCountryChange(code: string) {
    setCountryCode(code);
    const match = findCountry(code);
    setPhoneCode(match?.dial ?? "");
  }

  async function createPortalAccount() {
    const cleanUsername = username.trim().replace(/^@/, "");
    const selected = findCountry(countryCode);
    const national = phone.trim().replace(/\s+/g, "");
    const fullPhone = national ? `${phoneCode}${national}` : undefined;
    const session = {
      kind: "portal" as const,
      name: name.trim() || cleanUsername || "Client",
      username: cleanUsername,
      phone: fullPhone,
      phoneCode: phoneCode || undefined,
      country: selected?.name ?? "",
      countryCode: countryCode || undefined,
      createdAt: new Date().toISOString(),
    };

    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(session),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Could not create account");
      }
      setSession(session);
      router.push(LINKS.dashboard);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create account");
    } finally {
      setBusy(false);
    }
  }

  async function signIn() {
    const cleanUsername = username.trim().replace(/^@/, "");
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/clients/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: cleanUsername }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Sign in failed");
      setSession(data.user);
      router.push(LINKS.dashboard);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setBusy(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (mode === "register") {
      setTermsOpen(true);
      return;
    }
    void signIn();
  }

  return (
    <div className="site" lang={locale}>
      <Header />
      <main className="auth section">
        <div className="auth__card">
          <img src="/images/logo.png" alt="" width={64} height={64} className="auth__logo" />
          <h1 className="section__title">
            {mode === "register" ? t.auth.registerTitle : t.auth.loginTitle}
          </h1>
          <p className="section__support">
            {mode === "register" ? t.auth.registerSupport : t.auth.loginSupport}
          </p>

          <form className="auth__form" onSubmit={onSubmit}>
            {mode === "register" ? (
              <fieldset className="auth__fieldset">
                <legend>{t.auth.personalSection}</legend>
                <div className="auth__grid">
                  <label>
                    <span>{t.auth.name}</span>
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                    />
                  </label>
                  <label>
                    <span>{t.auth.username}</span>
                    <input
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      autoComplete="username"
                      minLength={3}
                      pattern="[A-Za-z0-9._-]+"
                      title="Letters, numbers, dots, underscores or hyphens"
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
                      <span className="auth__phone-code" aria-label={t.auth.phoneCode}>
                        {countryCode ? (
                          <img src={countryFlagSrc(countryCode)} alt="" width={20} height={14} />
                        ) : null}
                        {phoneCode || "—"}
                      </span>
                      <input
                        required
                        type="tel"
                        inputMode="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        autoComplete="tel-national"
                        placeholder="0700000000"
                        disabled={!phoneCode}
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
                      autoComplete="new-password"
                    />
                  </label>
                </div>
              </fieldset>
            ) : (
              <>
                <label>
                  <span>{t.auth.username}</span>
                  <input
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                    minLength={3}
                    pattern="[A-Za-z0-9._-]+"
                    title="Letters, numbers, dots, underscores or hyphens"
                  />
                </label>
                <label>
                  <span>{t.auth.password}</span>
                  <input
                    required
                    type="password"
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                </label>
              </>
            )}

            {error && <p className="auth__error">{error}</p>}

            <button className="btn btn--primary btn--lg" type="submit" disabled={busy}>
              {busy ? "…" : mode === "register" ? t.auth.submitRegister : t.auth.submitLogin}
            </button>
          </form>

          <p className="auth__switch">
            {mode === "register" ? (
              <Link href={LINKS.login}>{t.auth.haveAccount}</Link>
            ) : (
              <Link href={LINKS.register}>{t.auth.noAccount}</Link>
            )}
          </p>
          <p className="auth__switch">
            <Link href={LINKS.managementApply}>{t.auth.managementApplyLink}</Link>
          </p>
          <p className="auth__note">{t.auth.demoNote}</p>
        </div>
      </main>
      <Footer />

      <TermsModal
        open={termsOpen}
        onClose={() => setTermsOpen(false)}
        onAccept={() => {
          setTermsOpen(false);
          void createPortalAccount();
        }}
      />
    </div>
  );
}

export function AuthForm({ mode }: { mode: "register" | "login" }) {
  return (
    <AppProviders>
      <AuthInner mode={mode} />
    </AppProviders>
  );
}
