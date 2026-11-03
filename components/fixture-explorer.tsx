"use client";

import { useCallback, useEffect, useState } from "react";

type Fixture = {
  fixture: { id: number; date: string; timestamp: number; status: { long: string; short: string; elapsed: number | null }; venue?: { name?: string | null } };
  league: { id: number; name: string; country: string; logo?: string | null; round?: string };
  teams: { home: { id: number; name: string; logo?: string | null }; away: { id: number; name: string; logo?: string | null } };
  goals: { home: number | null; away: number | null };
};

type ApiResult = { configured?: boolean; response?: Fixture[]; message?: string; errors?: unknown };

function localDate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function shortTime(iso: string) {
  return new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit" }).format(new Date(iso));
}

function isLive(status: string) {
  return ["1H", "HT", "2H", "ET", "P", "BT", "LIVE", "SUSP", "INT"].includes(status);
}

export function FixtureExplorer({ initialMode = "date", leagueId }: { initialMode?: "date" | "live"; leagueId?: number }) {
  const [date, setDate] = useState(() => localDate(new Date()));
  const [mode, setMode] = useState<"date" | "live">(initialMode);
  const [filter, setFilter] = useState<"all" | "live" | "upcoming" | "finished">("all");
  const [matches, setMatches] = useState<Fixture[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [updated, setUpdated] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setMessage("");
    try {
      const params = new URLSearchParams({ mode: "fixtures" });
      if (mode === "live") params.set("live", "all");
      else params.set("date", date);
      if (leagueId) params.set("league", String(leagueId));
      const response = await fetch(`/api/football?${params.toString()}`, { cache: "no-store" });
      const data = (await response.json()) as ApiResult;
      setConfigured(Boolean(data.configured));
      if (!response.ok) {
        setMatches([]);
        setMessage(data.message || "Football data is not available yet.");
      } else {
        setMatches(data.response || []);
        setUpdated(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      }
    } catch {
      setMessage("We could not reach the football data service. Please try again.");
      setMatches([]);
    } finally {
      setLoading(false);
    }
  }, [mode, date, leagueId]);

  useEffect(() => { void load(); }, [load]);

  const visible = matches.filter((match) => {
    if (filter === "live") return isLive(match.fixture.status.short);
    if (filter === "upcoming") return match.fixture.status.short === "NS";
    if (filter === "finished") return ["FT", "AET", "PEN"].includes(match.fixture.status.short);
    return true;
  });

  return (
    <section className="fixture-explorer" id="match-centre">
      <div className="feed-toolbar">
        <div className="feed-mode">
          <button className={mode === "live" ? "active" : ""} onClick={() => { setMode("live"); setFilter("all"); }} type="button"><i className="status-dot" /> LIVE</button>
          <button className={mode === "date" ? "active" : ""} onClick={() => { setMode("date"); setFilter("all"); }} type="button">BY DATE</button>
        </div>
        {mode === "date" && <div className="date-control"><button type="button" aria-label="Previous day" onClick={() => setDate((value) => { const d = new Date(value + "T12:00:00"); d.setDate(d.getDate() - 1); return localDate(d); })}>←</button><input aria-label="Choose match date" type="date" value={date} onChange={(event) => setDate(event.target.value)} /><button type="button" aria-label="Next day" onClick={() => setDate((value) => { const d = new Date(value + "T12:00:00"); d.setDate(d.getDate() + 1); return localDate(d); })}>→</button></div>}
        <button className="refresh-button" type="button" onClick={() => void load()} disabled={loading}>{loading ? "LOADING…" : "↻ REFRESH"}</button>
      </div>

      <div className="feed-filters" role="group" aria-label="Filter matches">
        {(["all", "live", "upcoming", "finished"] as const).map((item) => <button key={item} className={filter === item ? "selected" : ""} onClick={() => setFilter(item)} type="button">{item === "all" ? "All matches" : item === "live" ? "Live" : item === "upcoming" ? "Upcoming" : "Finished"}</button>)}
      </div>

      {loading && <div className="feed-state"><span className="loader-dot" /> Checking fixtures…</div>}
      {!loading && !configured && <div className="api-setup">
        <span className="api-setup-kicker">FOOTBALL DATA CONNECTION</span>
        <h3>Bring the match centre to life.</h3>
        <p>Connect an API-Football key in Vercel to show verified live scores, fixtures, competition data and match events. Your key stays on the server and is never exposed in the browser.</p>
        <a href="https://www.api-football.com/" target="_blank" rel="noreferrer">Explore API-Football <span>↗</span></a>
        <small>Vercel → Project Settings → Environment Variables → add <code>API_FOOTBALL_KEY</code>, then redeploy.</small>
      </div>}
      {!loading && configured && message && <div className="feed-state feed-error">{message}</div>}
      {!loading && configured && !message && visible.length === 0 && <div className="feed-state"><strong>No matches in this view.</strong><span>Try another date or choose a different filter.</span></div>}
      {!loading && configured && visible.length > 0 && <div className="fixture-list">
        {visible.map((match) => {
          const live = isLive(match.fixture.status.short);
          const finished = ["FT", "AET", "PEN"].includes(match.fixture.status.short);
          return <a className="fixture-row" href={`/match/${match.fixture.id}`} key={match.fixture.id}>
            <div className="fixture-league"><span>{match.league.country}</span><strong>{match.league.name}</strong><small>{match.league.round || match.fixture.venue?.name || "Match centre"}</small></div>
            <div className="fixture-sides">
              <div className="fixture-side">{match.teams.home.logo && <img src={match.teams.home.logo} alt="" loading="lazy" />}<strong>{match.teams.home.name}</strong></div>
              <div className="fixture-score">
                {finished || live ? <strong>{match.goals.home ?? 0} – {match.goals.away ?? 0}</strong> : <strong>{shortTime(match.fixture.date)}</strong>}
                <small className={live ? "live-label" : ""}>{live ? `${match.fixture.status.elapsed ?? ""}' · LIVE` : finished ? match.fixture.status.long : "KICK-OFF"}</small>
              </div>
              <div className="fixture-side away">{match.teams.away.logo && <img src={match.teams.away.logo} alt="" loading="lazy" />}<strong>{match.teams.away.name}</strong></div>
            </div>
            <span className="fixture-open">↗</span>
          </a>;
        })}
      </div>}
      <div className="feed-updated">{updated ? `DATA CHECKED AT ${updated}` : "MATCH INFORMATION IS PROVIDED BY THE CONNECTED DATA PROVIDER"}</div>
    </section>
  );
}
