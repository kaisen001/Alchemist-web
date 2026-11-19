"use client";

import Link from "next/link";
import { LINKS, SOCIALS } from "@/lib/copy";
import { useLocale } from "@/lib/locale";

export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div className="site-footer__brand">
          <Link href="/" className="footer-logo">
            <img src="/images/logo.png" alt={t.brand} width={160} height={160} />
          </Link>
          <p className="site-footer__tagline">{t.footer.tagline}</p>
          <p className="site-footer__handle">@lqd_alchemist</p>
        </div>

        <div>
          <p className="site-footer__label">{t.footer.linksTitle}</p>
          <ul className="site-footer__links">
            <li>
              <Link href="/#programs">{t.nav.programs}</Link>
            </li>
            <li>
              <Link href={LINKS.management}>{t.nav.management}</Link>
            </li>
            <li>
              <Link href="/#partners">{t.nav.partners}</Link>
            </li>
            <li>
              <Link href="/#contact">{t.nav.contact}</Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="site-footer__label">{t.footer.social}</p>
          <ul className="site-footer__social">
            {SOCIALS.map((s) => (
              <li key={s.id}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                  <span>@{s.id === "telegram" ? "the_alchemist99" : "lqd_alchemist"}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="site-footer__rights">{t.footer.rights}</p>
    </footer>
  );
}
