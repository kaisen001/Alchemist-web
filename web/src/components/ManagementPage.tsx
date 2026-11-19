"use client";

import Link from "next/link";
import { LINKS } from "@/lib/copy";
import { useLocale } from "@/lib/locale";
import { AppProviders } from "./AppProviders";
import { Footer } from "./Footer";
import { Header } from "./Header";

function ManagementInner() {
  const { t, locale } = useLocale();
  const m = t.management;

  return (
    <div className="site" lang={locale}>
      <Header />
      <main className="mgmt">
        <header className="mgmt__hero section">
          <p className="mgmt__eyebrow">{m.eyebrow}</p>
          <h1 className="section__title">{m.title}</h1>
          <p className="section__support">{m.support}</p>
          <div className="mgmt__cta-row">
            <Link className="btn btn--primary" href={LINKS.managementApply}>
              {m.apply.cta}
            </Link>
            <a className="btn btn--ghost" href="#plans">
              {m.plans.title}
            </a>
          </div>
        </header>

        <section className="section mgmt__block" id="plans">
          <h2 className="section__title">{m.plans.title}</h2>
          <p className="section__support">{m.plans.support}</p>
          <div className="mgmt__plans">
            {m.plans.items.map((plan) => (
              <article key={plan.id} className="mgmt-plan" id={plan.id}>
                <p className="mgmt-plan__range">{plan.range}</p>
                <h3>{plan.name}</h3>
                <p>{plan.body}</p>
                <ul>
                  {plan.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section mgmt__block" id="how">
          <h2 className="section__title">{m.how.title}</h2>
          <p className="section__support">{m.how.support}</p>
          <div className="mgmt__accordion">
            {m.how.steps.map((s, i) => (
              <details key={s.name} className="mgmt__faq-item" open={i === 0}>
                <summary>
                  <span className="mgmt__step-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.name}
                </summary>
                <p>{s.body}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="section mgmt__block" id="dashboard">
          <h2 className="section__title">{m.dashboard.title}</h2>
          <p className="section__support">{m.dashboard.body}</p>
          <ul className="mgmt__feature-grid">
            {m.dashboard.items.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
          <div className="mgmt__cta-row">
            <Link className="btn btn--primary" href={LINKS.managementApply}>
              {m.dashboard.ctaCreate}
            </Link>
            <Link className="btn btn--ghost" href={LINKS.dashboard}>
              {m.dashboard.ctaOpen}
            </Link>
          </div>
        </section>

        <section className="section mgmt__block" id="terms">
          <h2 className="section__title">{m.termsTitle}</h2>
          <div className="mgmt__accordion">
            <details className="mgmt__faq-item">
              <summary>{m.profit.title}</summary>
              <p>{m.profit.body}</p>
            </details>
            <details className="mgmt__faq-item">
              <summary>{m.agreement.title}</summary>
              <p>{m.agreement.body}</p>
            </details>
            <details className="mgmt__faq-item">
              <summary>{m.protection.title}</summary>
              <p>{m.protection.body[0]}</p>
            </details>
          </div>
        </section>

        <section className="section mgmt__block mgmt__apply" id="apply">
          <h2 className="section__title">{m.apply.title}</h2>
          <p className="section__support">{m.apply.body}</p>
          <div className="mgmt__cta-row">
            <Link className="btn btn--primary btn--lg" href={LINKS.managementApply}>
              {m.apply.cta}
            </Link>
          </div>
        </section>

        <section className="section mgmt__block" id="faq">
          <h2 className="section__title">{m.faq.title}</h2>
          <div className="mgmt__accordion">
            {m.faq.items.slice(0, 5).map((item) => (
              <details key={item.q} className="mgmt__faq-item">
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export function ManagementPage() {
  return (
    <AppProviders>
      <ManagementInner />
    </AppProviders>
  );
}
