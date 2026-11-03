import { FootballDataPanel } from "../../components/football-data-panel";
import { PageShell } from "../../components/page-shell";

export const metadata = { title: "Statistics", description: "Explore goals, assists and competition performance data." };

export default function StatisticsPage() {
  const season = new Date().getMonth() >= 6 ? new Date().getFullYear() : new Date().getFullYear() - 1;
  return <PageShell eyebrow="THE DATA ROOM" title="Numbers with a story." description="Explore the individual performances behind a season. Initial rankings use the Premier League as the selected competition.">
    <div className="stats-selector"><span>COMPETITION</span><strong>Premier League</strong><span>SEASON</span><strong>{season}/{String(season + 1).slice(-2)}</strong></div>
    <div className="content-section-heading"><div><span className="eyebrow dark-eyebrow">GOALSCORERS</span><h2>Goals</h2></div></div>
    <FootballDataPanel mode="topscorers" league={39} season={season} />
    <div className="content-section-heading"><div><span className="eyebrow dark-eyebrow">CHANCE CREATORS</span><h2>Assists</h2></div></div>
    <FootballDataPanel mode="topassists" league={39} season={season} />
  </PageShell>;
}
