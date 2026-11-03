import { PageShell } from "../../components/page-shell";

export const metadata = { title: "Contact", description: "Contact the WOW.FUTBOL editorial team." };

export default function ContactPage() {
  return <PageShell eyebrow="GET IN TOUCH" title="Start a conversation." description="For editorial feedback, corrections, partnerships and general enquiries.">
    <div className="prose-page contact-panel">
      <h2>Editorial feedback and corrections</h2>
      <p>When contacting the team about a published article or match record, include the page address, the issue you noticed and a reliable source that helps us review it.</p>
      <h2>Partnerships and permissions</h2>
      <p>For commercial enquiries, image permissions or content partnerships, use the contact details configured by the site owner before launch.</p>
      <div className="api-setup compact"><strong>Contact channel not configured yet.</strong><p>Add a verified editorial email address before publishing this page as the public contact point.</p></div>
    </div>
  </PageShell>;
}
