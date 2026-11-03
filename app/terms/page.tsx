import { PageShell } from "../../components/page-shell";

export const metadata = { title: "Terms of Use", description: "Terms governing use of WOW.FUTBOL." };

export default function TermsPage() {
  return <PageShell eyebrow="SITE INFORMATION" title="Terms of use." description="A starter terms document for WOW.FUTBOL. It requires legal review and completion before public launch.">
    <div className="prose-page">
      <p><strong>Draft notice — not legal advice.</strong> These starter terms must be reviewed for the laws that apply to the operator and the countries in which the website is offered.</p>
      <h2>About the service</h2>
      <p>WOW.FUTBOL is an independent football information and editorial website. It is not an official service of FIFA, UEFA, any football league, club or federation.</p>
      <h2>Football information</h2>
      <p>Scores, fixtures, standings, player details and other statistics are provided through third-party data services and may be delayed, incomplete or corrected by the provider. The website should not be treated as an official record or a guarantee of accuracy.</p>
      <h2>Editorial content and external services</h2>
      <p>Original WOW.FUTBOL articles are editorial material. Embedded videos, linked photographs and third-party data remain subject to the terms and rights of their respective publishers or providers.</p>
      <h2>Acceptable use</h2>
      <p>Visitors must not disrupt the service, attempt unauthorised access, misuse personal information or republish material in violation of applicable rights.</p>
      <h2>Operator details</h2>
      <p>The site owner must add the operator's legal name, business address, contact details, applicable law, dispute process and any required consumer disclosures before these terms are final.</p>
    </div>
  </PageShell>;
}
