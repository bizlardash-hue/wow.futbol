import { notFound } from "next/navigation";
import { FixtureExplorer } from "../../../components/fixture-explorer";
import { FootballDataPanel } from "../../../components/football-data-panel";
import { PageShell } from "../../../components/page-shell";

const competitions: Record<string, { name: string; region: string; id: number; intro: string }> = {
  "premier-league": { name: "Premier League", region: "England", id: 39, intro: "A season-long contest shaped by pace, pressure and fine margins." },
  "laliga": { name: "LaLiga", region: "Spain", id: 140, intro: "A competition known for technical quality, tactical variety and historic rivalries." },
  "serie-a": { name: "Serie A", region: "Italy", id: 135, intro: "A league where defensive organisation and attacking craft meet." },
  "bundesliga": { name: "Bundesliga", region: "Germany", id: 78, intro: "High-tempo football, intense atmospheres and emerging talent." },
  "ligue-1": { name: "Ligue 1", region: "France", id: 61, intro: "A stage for athletic football, youth development and ambitious clubs." },
  "champions-league": { name: "Champions League", region: "Europe", id: 2, intro: "Europe's leading clubs meet in a continental competition." },
};

export function generateStaticParams() { return Object.keys(competitions).map((slug) => ({ slug })); }

export default async function CompetitionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const competition = competitions[slug];
  if (!competition) notFound();
  const season = 2024; // Free-plan archive season; check provider coverage before changing.

  return <PageShell eyebrow={`COMPETITIONS / ${competition.region.toUpperCase()}`} title={competition.name} description={competition.intro}>
    <div className="competition-overview-grid">
      <div className="competition-overview-card"><span>SEASON</span><strong>{season}/{String(season + 1).slice(-2)}</strong></div>
      <div className="competition-overview-card"><span>COUNTRY / REGION</span><strong>{competition.region}</strong></div>
      <div className="competition-overview-card"><span>DATA SOURCE</span><strong>API-Football</strong></div>
    </div>
    <div className="content-section-heading"><div><span className="eyebrow dark-eyebrow">THE TABLE</span><h2>Standings</h2></div></div>
    <FootballDataPanel mode="standings" league={competition.id} season={season} />
    <div className="content-section-heading"><div><span className="eyebrow dark-eyebrow">THE CALENDAR</span><h2>Fixtures & results</h2></div></div>
    <FixtureExplorer leagueId={competition.id} />
  </PageShell>;
}
