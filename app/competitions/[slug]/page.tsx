import { notFound } from "next/navigation";
import { FixtureExplorer } from "../../../components/fixture-explorer";
import { FootballDataPanel } from "../../../components/football-data-panel";
import { PageShell } from "../../../components/page-shell";

const featured: Record<string, { name: string; region: string; id: number; intro: string }> = {
  "premier-league": { name: "Premier League", region: "England", id: 39, intro: "A season-long contest shaped by pace, pressure and fine margins." },
  "laliga": { name: "LaLiga", region: "Spain", id: 140, intro: "A competition known for technical quality, tactical variety and historic rivalries." },
  "serie-a": { name: "Serie A", region: "Italy", id: 135, intro: "A league where defensive organisation and attacking craft meet." },
  "bundesliga": { name: "Bundesliga", region: "Germany", id: 78, intro: "High-tempo football, intense atmospheres and emerging talent." },
  "ligue-1": { name: "Ligue 1", region: "France", id: 61, intro: "A stage for athletic football, youth development and ambitious clubs." },
  "champions-league": { name: "Champions League", region: "Europe", id: 2, intro: "Europe's leading clubs meet in a continental competition." },
};

export function generateStaticParams() {
  return Object.keys(featured).map((slug) => ({ slug }));
}

export default async function CompetitionPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ season?: string }>;
}) {
  const { slug } = await params;
  const { season: requestedSeason } = await searchParams;
  const known = featured[slug];
  const idMatch = slug.match(/-(\d+)$/);
  const competitionId = known?.id ?? (idMatch ? Number(idMatch[1]) : NaN);
  if (!Number.isInteger(competitionId) || competitionId <= 0) notFound();

  const name = known?.name ?? slug.replace(/-\d+$/, "").split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
  const region = known?.region ?? "International / Global";
  const parsedSeason = Number(requestedSeason);
  const season = Number.isInteger(parsedSeason) && parsedSeason >= 1900 && parsedSeason <= 2100 ? parsedSeason : 2026;
  const intro = known?.intro ?? "Explore the competition season, fixtures, results, participating clubs and player rankings.";

  return (
    <PageShell eyebrow={`COMPETITIONS / ${region.toUpperCase()}`} title={name} description={intro}>
      <div className="competition-overview-grid">
        <div className="competition-overview-card"><span>SEASON</span><strong>{season}/{String(season + 1).slice(-2)}</strong></div>
        <div className="competition-overview-card"><span>COUNTRY / REGION</span><strong>{region}</strong></div>
        <div className="competition-overview-card"><span>DATA SOURCE</span><strong>API-Football</strong></div>
      </div>
      <div className="content-section-heading"><div><span className="eyebrow dark-eyebrow">THE TABLE</span><h2>Standings</h2></div></div>
      <FootballDataPanel mode="standings" league={competitionId} season={season} />
      <div className="content-section-heading"><div><span className="eyebrow dark-eyebrow">THE CALENDAR</span><h2>Fixtures & results</h2></div></div>
      <FixtureExplorer leagueId={competitionId} />
      <div className="content-section-heading"><div><span className="eyebrow dark-eyebrow">THE CLUBS</span><h2>Teams in this competition</h2></div></div>
      <FootballDataPanel mode="teams" league={competitionId} season={season} />
      <div className="content-section-heading"><div><span className="eyebrow dark-eyebrow">THE PLAYERS</span><h2>Top scorers</h2></div></div>
      <FootballDataPanel mode="topscorers" league={competitionId} season={season} />
      <div className="content-section-heading"><div><span className="eyebrow dark-eyebrow">THE PLAYERS</span><h2>Top assists</h2></div></div>
      <FootballDataPanel mode="topassists" league={competitionId} season={season} />
    </PageShell>
  );
}
