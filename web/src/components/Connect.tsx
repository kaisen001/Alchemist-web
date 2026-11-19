"use client";

import { useLocale } from "@/lib/locale";
import { LINKS } from "@/lib/copy";

export function Connect() {
  const { t } = useLocale();

  return (
    <section className="section connect" id="contact">
      <div className="connect__panel">
        <h2 className="section__title">{t.connect.title}</h2>
        <p className="section__support">{t.connect.support}</p>
        <a
          className="btn btn--primary btn--lg"
          href={LINKS.telegram}
          target="_blank"
          rel="noreferrer"
        >
          {t.connect.cta}
        </a>
      </div>

      <aside className="connect__risk">
        <h3>{t.connect.riskTitle}</h3>
        <p>{t.connect.risk}</p>
      </aside>
    </section>
  );
}
