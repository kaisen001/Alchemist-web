"use client";

import { useLocale } from "@/lib/locale";

export function Mentor() {
  const { t } = useLocale();

  return (
    <section className="section mentor" id="mentor">
      <div className="mentor__grid">
        <div className="mentor__gallery" aria-hidden>
          <img
            className="mentor__shot mentor__shot--main"
            src="/images/mentor-editorial.jpg"
            alt=""
            width={800}
            height={1200}
          />
          <img
            className="mentor__shot mentor__shot--side"
            src="/images/mentor-portrait.jpg"
            alt=""
            width={600}
            height={800}
          />
        </div>
        <div className="mentor__copy">
          <p className="mentor__eyebrow">{t.mentor.title}</p>
          <h2 className="section__title">{t.mentor.name}</h2>
          <p className="mentor__role">{t.mentor.role}</p>
          <p className="section__support">{t.mentor.body}</p>
        </div>
      </div>
    </section>
  );
}
