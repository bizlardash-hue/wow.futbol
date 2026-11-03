"use client";

import { useEffect, useState } from "react";

type Props = { mode: "standings" | "teams" | "topscorers" | "topassists"; league?: number; season?: number };

export function FootballDataPanel({ mode, league = 39, season = 2026 }: Props) {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [configured, setConfigured] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      const params = new URLSearchParams({ mode, league: String(league), season: String(season) });
      try {
        const response = await fetch(`/api/football?${params}`, { cache: "no-store" });
        const result = await response.json();
        if (!active) return;
        setConfigured(Boolean(result.configured));
        if (!response.ok) setMessage(result.message || "Data provider unavailable.");
        else setData(result.response || []);
      } catch {
        if (active) setMessage("Could not connect to the football data service.");
      } finally {
        if (active) setLoading(false);
      }
    }
    void load();
    return () => { active = false; };
  }, [mode, league, season]);

  if (loading) return <div className="feed-state"><span className="loader-dot" /> Loading verified football data…</div>;
  if (!configured) return <div className="api-setup compact"><strong>Connect football data to activate this section.</strong><p>Add <code>API_FOOTBALL_KEY</code> in Vercel Environment Variables and redeploy.</p><a href="https://www.api-football.com/" target="_blank" rel="noreferrer">Get API access ↗</a></div>;
  if (message) return <div className="feed-state feed-error">{message}</div>;

  if (mode === "standings") {
    const leagueData = data[0] as { league?: { standings?: Array<Array<Record<string, unknown>>> } } | undefined;
    const rows = leagueData?.league?.standings?.[0] || [];
    if (!rows.length) return <div className="feed-state">Standings are not available for this competition and season.</div>;
    return <div className="table-scroll"><table className="football-table"><thead><tr><th>#</th><th>Club</th><th>MP</th><th>W</th><th>D</th><th>L</th><th>GD</th><th>PTS</th></tr></thead><tbody>
      {rows.map((row, index) => {
        const team = row.team as { id: number; name: string; logo?: string } | undefined;
        const all = row.all as { played?: number; win?: number; draw?: number; lose?: number } | undefined;
        const goals = row.goalsDiff as number | undefined;
        return <tr key={String(team?.id || index)}><td>{String(row.rank ?? index + 1)}</td><td className="club-cell">{team?.logo && <img src={team.logo} alt="" loading="lazy" />}<strong>{team?.name || "Club"}</strong></td><td>{String(all?.played ?? "—")}</td><td>{String(all?.win ?? "—")}</td><td>{String(all?.draw ?? "—")}</td><td>{String(all?.lose ?? "—")}</td><td>{goals === undefined ? "—" : goals > 0 ? `+${goals}` : goals}</td><td><strong>{String(row.points ?? "—")}</strong></td></tr>;
      })}
    </tbody></table></div>;
  }

  if (mode === "teams") {
    if (!data.length) return <div className="feed-state">No clubs were returned for this competition.</div>;
    return <div className="data-card-grid">{data.map((item, index) => {
      const team = item.team as { id: number; name: string; logo?: string } | undefined;
      return <a className="entity-card" href={`/clubs/${team?.id}`} key={team?.id || index}>{team?.logo && <img src={team.logo} alt="" loading="lazy" />}<strong>{team?.name || "Club"}</strong><span>View club profile ↗</span></a>;
    })}</div>;
  }

  if (!data.length) return <div className="feed-state">No player rankings are available for this competition and season.</div>;
  return <div className="ranking-list">{data.slice(0, 30).map((item, index) => {
    const player = item.player as { id: number; name: string; photo?: string } | undefined;
    const stats = (item.statistics as Array<{ team?: { name?: string; logo?: string }; goals?: { total?: number; assists?: number } }>)?.[0];
    const value = mode === "topscorers" ? stats?.goals?.total : stats?.goals?.assists;
    return <a className="ranking-row" href={`/players/${player?.id}`} key={player?.id || index}><span className="ranking-number">{String(index + 1).padStart(2, "0")}</span>{player?.photo && <img src={player.photo} alt="" loading="lazy" />}<span className="ranking-player"><strong>{player?.name || "Player"}</strong><small>{stats?.team?.name || "Competition player"}</small></span><strong className="ranking-value">{value ?? "—"}</strong></a>;
  })}</div>;
}
