"use client";

import { useLocale } from "@/lib/locale";
import { LINKS } from "@/lib/copy";

export function Programs() {
  const { t } = useLocale();

  return (
    <section className="section programs" id="programs">
      <div className="section__intro">
        <h2 className="section__title">{t.programs.title}</h2>
        <p className="section__support">{t.programs.support}</p>
      </div>

      <div className="programs__grid">
        {t.programs.items.map((item) => (
          <article key={item.name} className="program-card">
            <div className="program-card__top">
              <h3 className="program-card__name">{item.name}</h3>
              <p className="program-card__price">{item.price}</p>
            </div>
            <p className="program-card__body">{item.body}</p>
            <a
              className="program-card__cta"
              href={LINKS.telegram}
              target="_blank"
              rel="noreferrer"
            >
              {item.cta} →
            </a>
          </article>
        ))}
      </div>
      <p className="programs__disclaimer">{t.programs.disclaimer}</p>
    </section>
  );
}
