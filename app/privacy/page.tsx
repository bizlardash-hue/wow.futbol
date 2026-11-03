import { PageShell } from "../../components/page-shell";

export const metadata = { title: "Privacy Policy", description: "Privacy information for WOW.FUTBOL visitors." };

export default function PrivacyPage() {
  return <PageShell eyebrow="SITE INFORMATION" title="Privacy policy." description="A starter privacy notice for the WOW.FUTBOL website. It must be reviewed and completed before public launch.">
    <div className="prose-page">
      <p><strong>Draft notice — not legal advice.</strong> The site owner must adapt this policy to the actual hosting, analytics, account, contact-form and advertising services used by the finished website.</p>
      <h2>Information processed</h2>
      <p>Hosting providers may process technical information such as IP address, browser type, device information, request timestamps and security logs. If visitor accounts, newsletters or contact forms are added, the information entered into those features will also be processed.</p>
      <h2>Football data and external media</h2>
      <p>Match information is requested from the configured football data provider. Embedded videos and linked images may be delivered by third-party platforms, which may receive technical data when a visitor loads that content.</p>
      <h2>Cookies and local storage</h2>
      <p>Any analytics, advertising, preference or authentication cookies must be documented here, along with their purpose and the controls available to visitors. Do not enable non-essential tracking until the appropriate consent process is in place.</p>
      <h2>Retention and contact</h2>
      <p>The site owner must specify how long personal information is retained, how visitors can submit privacy requests, and the responsible contact details before this policy is published as final.</p>
    </div>
  </PageShell>;
}
