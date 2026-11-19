"use client";

import { useLocale } from "@/lib/locale";
import { LINKS } from "@/lib/copy";

export function Partners() {
  const { t } = useLocale();

  return (
    <section className="section partners" id="partners">
      <div className="section__intro">
        <h2 className="section__title">{t.partners.title}</h2>
        <p className="section__support">{t.partners.support}</p>
      </div>

      <div className="partners__stack">
        <article className="partner-panel">
          <p className="partner-panel__label">{t.partners.equity.label}</p>
          <h3 className="partner-panel__title">{t.partners.equity.title}</h3>
          <p className="partner-panel__body">{t.partners.equity.body}</p>
          <p className="partner-panel__code">
            Code <code>{t.partners.equity.code}</code>
          </p>
          <a
            className="btn btn--primary"
            href={LINKS.equityEdge}
            target="_blank"
            rel="noreferrer"
          >
            {t.partners.equity.cta}
          </a>
        </article>

        <article className="partner-panel">
          <p className="partner-panel__label">{t.partners.hfm.label}</p>
          <h3 className="partner-panel__title">{t.partners.hfm.title}</h3>
          <p className="partner-panel__body">{t.partners.hfm.body}</p>
          <ul className="partner-panel__prizes">
            {t.partners.hfm.prizes.map((p) => (
              <li key={p.place}>
                <span>{p.place}</span>
                <strong>{p.name}</strong>
                <em>{p.detail}</em>
              </li>
            ))}
          </ul>
          <a
            className="btn btn--ghost"
            href={LINKS.hfm}
            target="_blank"
            rel="noreferrer"
          >
            {t.partners.hfm.cta}
          </a>
        </article>
      </div>
    </section>
  );
}
