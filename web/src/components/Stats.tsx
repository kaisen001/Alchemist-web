"use client";

import { useLocale } from "@/lib/locale";

export function Stats() {
  const { t } = useLocale();

  return (
    <section className="section stats" id="stats">
      <div className="section__intro">
        <h2 className="section__title">{t.stats.title}</h2>
        <p className="section__support">{t.stats.support}</p>
      </div>

      <div className="stats__grid">
        {t.stats.items.map((item) => (
          <article key={item.label} className="stats__item">
            <p className="stats__value">{item.value}</p>
            <p className="stats__label">{item.label}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
