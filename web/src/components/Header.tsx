"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LINKS } from "@/lib/copy";
import { useLocale } from "@/lib/locale";
import { useTheme } from "@/lib/theme";

export function Header() {
  const { t, locale, toggleLocale } = useLocale();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const home = pathname === "/";

  return (
    <header className="site-header">
      <Link href="/" className="brand-mark">
        <img
          className="brand-mark__logo"
          src="/images/logo.png"
          alt={t.brand}
          width={44}
          height={44}
        />
        <span className="brand-mark__text">{t.brand}</span>
      </Link>

      <nav className="site-nav" aria-label="Primary">
        <a href={home ? "#method" : "/#method"}>{t.nav.method}</a>
        <a href={home ? "#programs" : "/#programs"}>{t.nav.programs}</a>
        <Link href={LINKS.management}>{t.nav.management}</Link>
        <a href={home ? "#partners" : "/#partners"}>{t.nav.partners}</a>
        <a href={home ? "#contact" : "/#contact"}>{t.nav.contact}</a>
      </nav>

      <div className="header-actions">
        <button
          type="button"
          className="lang-toggle"
          onClick={toggleTheme}
          aria-label={theme === "light" ? t.ui.themeDark : t.ui.themeLight}
          title={theme === "light" ? t.ui.themeDark : t.ui.themeLight}
        >
          {theme === "light" ? "☾" : "☀"}
        </button>
        <button
          type="button"
          className="lang-toggle"
          onClick={toggleLocale}
          aria-label={locale === "en" ? "Switch to French" : "Passer en anglais"}
        >
          {locale === "en" ? "FR" : "EN"}
        </button>
        <Link className="btn btn--ghost btn--sm" href={LINKS.login}>
          {t.ui.signIn}
        </Link>
        <a
          className="btn btn--ghost btn--sm"
          href={LINKS.telegram}
          target="_blank"
          rel="noreferrer"
        >
          Telegram
        </a>
      </div>
    </header>
  );
}
