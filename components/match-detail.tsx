"use client";

import { useEffect, useState } from "react";

type FixtureRecord = {
  fixture: { id: number; date: string; status: { long: string; short: string; elapsed: number | null }; venue?: { name?: string | null; city?: string | null } };
  league: { name: string; country: string; round?: string; logo?: string };
  teams: { home: { name: string; logo?: string }; away: { name: string; logo?: string } };
  goals: { home: number | null; away: number | null };
};

export function MatchDetail({ id }: { id: string }) {
  const [match, setMatch] = useState<FixtureRecord | null>(null);
  const [events, setEvents] = useState<Record<string, unknown>[]>([]);
  const [lineups, setLineups] = useState<Record<string, unknown>[]>([]);
  const [statistics, setStatistics] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [configured, setConfigured] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;
    async function getJson(params: URLSearchParams) {
      const response = await fetch(`/api/football?${params}`, { cache: "no-store" });
      const json = await response.json();
      if (!response.ok) throw new Error(json.message || "Football data is unavailable.");
      return json;
    }
    async function load() {
      setLoading(true);
      try {
        const fixtureParams = new URLSearchParams({ mode: "fixture", id });
        const result = await getJson(fixtureParams);
        if (!active) return;
        setConfigured(Boolean(result.configured));
        const current = result.response?.[0] || null;
        setMatch(current);
        if (!current) { setMessage("No match was found for this fixture ID."); return; }

        const detailRequests = await Promise.allSettled([
          getJson(new URLSearchParams({ mode: "events", fixture: id })),
          getJson(new URLSearchParams({ mode: "lineups", fixture: id })),
          getJson(new URLSearchParams({ mode: "statistics", fixture: id })),
        ]);
        if (!active) return;
        if (detailRequests[0].status === "fulfilled") setEvents(detailRequests[0].value.response || []);
        if (detailRequests[1].status === "fulfilled") setLineups(detailRequests[1].value.response || []);
        if (detailRequests[2].status === "fulfilled") setStatistics(detailRequests[2].value.response || []);
      } catch (error) {
        if (active) setMessage(error instanceof Error ? error.message : "Could not load match details.");
      } finally {
        if (active) setLoading(false);
      }
    }
    void load();
    return () => { active = false; };
  }, [id]);

  if (loading) return <div className="feed-state"><span className="loader-dot" /> Opening match centre…</div>;
  if (!configured) return <div className="api-setup"><span className="api-setup-kicker">MATCH CENTRE</span><h3>Connect verified match data.</h3><p>Live scores, events, lineups and statistics require an API-Football key. Add <code>API_FOOTBALL_KEY</code> in Vercel Environment Variables, then redeploy.</p><a href="https://www.api-football.com/" target="_blank" rel="noreferrer">Explore API-Football ↗</a></div>;
  if (message || !match) return <div className="feed-state feed-error">{message || "Match information is unavailable."}</div>;

  const live = ["1H", "HT", "2H", "ET", "P", "BT", "LIVE"].includes(match.fixture.status.short);
  return <div className="match-detail">
    <section className="match-scoreboard">
      <span className="story-category">{match.league.country} · {match.league.name}</span>
      <small>{match.league.round || "MATCH CENTRE"}</small>
      <div className="scoreboard-teams">
        <div>{match.teams.home.logo && <img src={match.teams.home.logo} alt="" />}<strong>{match.teams.home.name}</strong></div>
        <div className="scoreboard-score"><strong>{match.goals.home ?? "—"} : {match.goals.away ?? "—"}</strong><span className={live ? "live-label" : ""}>{live ? `${match.fixture.status.elapsed ?? ""}' · LIVE` : match.fixture.status.long}</span></div>
        <div>{match.teams.away.logo && <img src={match.teams.away.logo} alt="" />}<strong>{match.teams.away.name}</strong></div>
      </div>
      <p>{new Date(match.fixture.date).toLocaleString([], { dateStyle: "full", timeStyle: "short" })} · {match.fixture.venue?.name || "Venue not listed"}{match.fixture.venue?.city ? `, ${match.fixture.venue.city}` : ""}</p>
    </section>

    <div className="detail-columns">
      <section className="detail-box"><div className="content-section-heading"><div><span className="eyebrow dark-eyebrow">THE STORY OF THE MATCH</span><h2>Events</h2></div></div>
        {events.length ? <div className="event-list">{events.map((event, index) => {
          const time = event.time as { elapsed?: number; extra?: number } | undefined;
          const player = event.player as { name?: string } | undefined;
          const team = event.team as { name?: string } | undefined;
          return <div className="event-row" key={index}><strong>{time?.elapsed ?? "—"}{time?.extra ? `+${time.extra}` : ""}'</strong><span><b>{String(event.type || "Event")}</b><small>{player?.name || String(event.detail || "")} · {team?.name || ""}</small></span></div>;
        })}</div> : <p className="detail-empty">No match events are available yet. Events may appear once the match begins or the provider updates the record.</p>}
      </section>
      <section className="detail-box"><div className="content-section-heading"><div><span className="eyebrow dark-eyebrow">THE NUMBERS</span><h2>Statistics</h2></div></div>
        {statistics.length ? statistics.map((entry, index) => {
          const team = entry.team as { name?: string } | undefined;
          const values = entry.statistics as Array<{ type?: string; value?: string | number | null }> | undefined;
          return <div className="team-stat-block" key={index}><strong>{team?.name || `Team ${index + 1}`}</strong>{values?.slice(0, 12).map((value) => <div className="stat-line" key={value.type}><span>{value.type}</span><b>{value.value ?? "—"}</b></div>)}</div>;
        }) : <p className="detail-empty">Match statistics are not available yet.</p>}
      </section>
    </div>

    <section className="detail-box lineup-section"><div className="content-section-heading"><div><span className="eyebrow dark-eyebrow">ON THE PITCH</span><h2>Lineups</h2></div></div>
      {lineups.length ? <div className="lineup-grid">{lineups.map((entry, index) => {
        const team = entry.team as { name?: string; logo?: string } | undefined;
        const start = entry.startXI as Array<{ player?: { name?: string; number?: number; pos?: string } }> | undefined;
        const substitutes = entry.substitutes as Array<{ player?: { name?: string; number?: number } }> | undefined;
        return <div className="lineup-team" key={index}><strong>{team?.name || `Team ${index + 1}`}</strong><span className="formation-label">FORMATION {String(entry.formation || "—")}</span><h3>Starting XI</h3>{start?.map((item, n) => <div className="lineup-player" key={n}><span>{item.player?.number ?? "—"}</span>{item.player?.name || "Player"}</div>)}<h3>Substitutes</h3>{substitutes?.slice(0, 9).map((item, n) => <div className="lineup-player" key={n}><span>{item.player?.number ?? "—"}</span>{item.player?.name || "Player"}</div>)}</div>;
      })}</div> : <p className="detail-empty">Lineups are published by the data provider when available, often shortly before kick-off.</p>}
    </section>
  </div>;
}
