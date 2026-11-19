"use client";

import Link from "next/link";
import { LINKS } from "@/lib/copy";
import { useLocale } from "@/lib/locale";

export function Hero() {
  const { t } = useLocale();

  return (
    <section className="hero" id="top" aria-labelledby="hero-brand">
      <div className="hero__media" aria-hidden>
        <img
          className="hero__img hero__img--mentor"
          src="/images/mentor-editorial.jpg"
          alt=""
          width={1200}
          height={1800}
          fetchPriority="high"
        />
        <div className="hero__veil" />
        <div className="hero__liquid" />
      </div>

      <div className="hero__content">
        <img
          className="hero__logo"
          src="/images/logo.png"
          alt=""
          width={88}
          height={88}
        />
        <p className="hero__brand" id="hero-brand">
          {t.brand}
        </p>
        <p className="hero__sub">{t.brandSub}</p>
        <h1 className="hero__headline">{t.hero.headline}</h1>
        <p className="hero__support">{t.hero.support}</p>
        <div className="hero__ctas">
          <a className="btn btn--primary" href="#programs">
            {t.hero.ctaPrimary}
          </a>
          <Link className="btn btn--ghost" href={LINKS.management}>
            {t.hero.ctaSecondary}
          </Link>
        </div>
      </div>
    </section>
  );
}
