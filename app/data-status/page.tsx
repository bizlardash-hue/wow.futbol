import { ApiStatusCheck } from "../../components/api-status-check";
import { PageShell } from "../../components/page-shell";

export const metadata = {
  title: "Football Data Connection",
  description: "Check the WOW.FUTBOL football data connection and daily API request allowance."
};

export default function DataStatusPage() {
  return <PageShell eyebrow="WOW.FUTBOL / SETTINGS" title="Connect the game." description="Check the API-Football connection and configure your Free plan for live scores, fixtures, standings, teams and player data.">
    <ApiStatusCheck />
    <div className="api-setup api-steps">
      <span className="api-setup-kicker">ONE-TIME SETUP</span>
      <h3>Connect your existing Free account</h3>
      <ol>
        <li>Open your <a href="https://dashboard.api-football.com/" target="_blank" rel="noreferrer">API-Football dashboard</a>.</li>
        <li>Go to <strong>Account → My Access</strong> and copy the API key.</li>
        <li>Open <a href="https://vercel.com/dashboard" target="_blank" rel="noreferrer">Vercel</a>, select WOW.FUTBOL, then Settings → Environment Variables.</li>
        <li>Create a variable named <code>API_FOOTBALL_KEY</code> and paste the key as its value. Enable Production and Preview.</li>
        <li>Save the variable, then go to Deployments and redeploy the latest deployment.</li>
        <li>Return here and select <strong>Check again</strong>.</li>
      </ol>
      <p><strong>Keep the key private.</strong> Never add it to the website's visible code, a public GitHub file, a screenshot or a chat message.</p>
    </div>
    <div className="prose-page api-steps">
      <h2>What happens after connection?</h2>
      <p>Live scores and date-based fixtures load through the match centre. Competition pages request standings and fixtures. Club and player pages request profile data. Player rankings show top scorers and assists. Match pages request events, lineups and statistics when those data are covered for that competition.</p>
      <p>The free account has a daily request limit. WOW.FUTBOL applies longer caches to fixtures, standings, clubs and player data so visitors share cached results rather than each creating a new provider request. Live scores refresh less frequently on this plan.</p>
      <p>Some competitions do not provide live-score, lineup or statistics coverage. Available seasons and data coverage vary by competition. A missing result does not necessarily mean the API key is wrong.</p>
    </div>
  </PageShell>;
}
