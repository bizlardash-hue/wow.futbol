import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

export function PageShell({ eyebrow, title, description, children }: {
  eyebrow: string; title: string; description: string; children: ReactNode;
}) {
  return <>
    <SiteHeader />
    <main id="top">
      <section className="inner-page-hero">
        <div className="container">
          <div className="eyebrow"><span className="eyebrow-line" /> {eyebrow}</div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </section>
      <section className="inner-page-content">
        <div className="container">{children}</div>
      </section>
    </main>
    <SiteFooter />
  </>;
}
