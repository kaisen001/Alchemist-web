"use client";

import { useLocale } from "@/lib/locale";
import { AppProviders } from "./AppProviders";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Stats } from "./Stats";
import { Mentor } from "./Mentor";
import { Method } from "./Method";
import { Proof } from "./Proof";
import { Programs } from "./Programs";
import { ManagementTeaser } from "./ManagementTeaser";
import { Partners } from "./Partners";
import { Connect } from "./Connect";
import { Footer } from "./Footer";

function LandingInner() {
  const { locale } = useLocale();

  return (
    <div className="site" lang={locale}>
      <Header />
      <main>
        <Hero />
        <Mentor />
        <Stats />
        <Method />
        <Proof />
        <Programs />
        <ManagementTeaser />
        <Partners />
        <Connect />
      </main>
      <Footer />
    </div>
  );
}

export function Landing() {
  return (
    <AppProviders>
      <LandingInner />
    </AppProviders>
  );
}
