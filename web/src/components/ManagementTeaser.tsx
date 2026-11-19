"use client";

import Link from "next/link";
import { LINKS } from "@/lib/copy";
import { useLocale } from "@/lib/locale";

export function ManagementTeaser() {
  const { t } = useLocale();

  return (
    <section className="section management-teaser" id="management">
      <div className="management-teaser__panel">
        <div>
          <h2 className="section__title">{t.managementTeaser.title}</h2>
          <p className="section__support">{t.managementTeaser.support}</p>
          <ul className="management-teaser__points">
            {t.managementTeaser.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <Link className="btn btn--primary" href={LINKS.management}>
            {t.managementTeaser.cta}
          </Link>
        </div>
        <img
          className="management-teaser__photo"
          src="/images/mentor-full.jpg"
          alt={t.mentor.name}
          width={720}
          height={1280}
        />
      </div>
    </section>
  );
}
