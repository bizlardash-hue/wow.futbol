import { PageShell } from "../../components/page-shell";

export const metadata = { title: "About", description: "About WOW.FUTBOL, an independent football media platform." };

export default function AboutPage() {
  return <PageShell eyebrow="ABOUT WOW.FUTBOL" title="A wider view of the game." description="An independent football destination for supporters who want to follow matches, people, numbers and stories.">
    <div className="prose-page">
      <h2>Football, connected.</h2>
      <p>WOW.FUTBOL brings match information, competition pages, club and player profiles, statistics, original explainers and selected official video into one independent platform.</p>
      <p>Our aim is to make football easier to explore: from a fixture and its key events to the context around a team's season or a player's performance.</p>
      <h2>Independent by design.</h2>
      <p>WOW.FUTBOL is an independent project. It is not affiliated with, endorsed by or operated by FIFA, UEFA, any domestic league, club or national federation.</p>
      <h2>Accuracy and transparency.</h2>
      <p>Match information is attributed to the connected data provider. Editorial features are written for WOW.FUTBOL. We aim to distinguish verified match information, analysis and opinion clearly.</p>
    </div>
  </PageShell>;
}
