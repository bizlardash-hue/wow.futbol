import { FootballDataPanel } from "../../components/football-data-panel";
import { PageShell } from "../../components/page-shell";

export const metadata = { title: "Players", description: "Explore player profiles, goal rankings and assists." };

export default function PlayersPage() {
  const season = new Date().getMonth() >= 6 ? new Date().getFullYear() : new Date().getFullYear() - 1;
  return <PageShell eyebrow="PLAYER INDEX" title="The people who shape the game." description="Player profiles and performance rankings, refreshed from the connected football data provider.">
    <div className="content-section-heading"><div><span className="eyebrow dark-eyebrow">FINISHERS</span><h2>Top scorers</h2></div></div>
    <FootballDataPanel mode="topscorers" league={39} season={season} />
    <div className="content-section-heading"><div><span className="eyebrow dark-eyebrow">CREATORS</span><h2>Assist leaders</h2></div></div>
    <FootballDataPanel mode="topassists" league={39} season={season} />
  </PageShell>;
}
