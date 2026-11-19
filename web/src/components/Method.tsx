"use client";

import { useLocale } from "@/lib/locale";

export function Method() {
  const { t } = useLocale();

  return (
    <section className="section method" id="method">
      <div className="section__intro">
        <h2 className="section__title">{t.method.title}</h2>
        <p className="section__support">{t.method.support}</p>
      </div>

      <ol className="method__list">
        {t.method.principles.map((item, i) => (
          <li key={item.name} className="method__item" style={{ ["--i" as string]: i }}>
            <span className="method__index">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="method__name">{item.name}</h3>
            <p className="method__body">{item.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
