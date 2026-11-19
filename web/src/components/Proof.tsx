"use client";

import { useLocale } from "@/lib/locale";

export function Proof() {
  const { t } = useLocale();

  return (
    <section className="section proof" id="proof">
      <div className="section__intro">
        <h2 className="section__title">{t.proof.title}</h2>
        <p className="section__support">{t.proof.support}</p>
      </div>

      <div className="proof__grid">
        {t.proof.quotes.map((q) => (
          <blockquote key={q.name} className="proof__card">
            <p className="proof__text">“{q.text}”</p>
            <footer className="proof__meta">
              <div>
                <cite className="proof__name">{q.name}</cite>
                <span className="proof__role">{q.role}</span>
              </div>
              <span className="proof__badge">{q.badge}</span>
            </footer>
          </blockquote>
        ))}
      </div>
      <p className="proof__note">{t.proof.note}</p>
    </section>
  );
}
