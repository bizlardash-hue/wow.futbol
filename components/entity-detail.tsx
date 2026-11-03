"use client";

import { useEffect, useState } from "react";

type Props = { kind: "team" | "player"; id: string };

export function EntityDetail({ kind, id }: Props) {
  const [record, setRecord] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [configured, setConfigured] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      const season = new Date().getMonth() >= 6 ? new Date().getFullYear() : new Date().getFullYear() - 1;
      const query = new URLSearchParams({ mode: kind, id });
      if (kind === "player") query.set("season", String(season));
      try {
        const response = await fetch(`/api/football?${query}`, { cache: "no-store" });
        const result = await response.json();
        if (!active) return;
        setConfigured(Boolean(result.configured));
        if (!response.ok) setMessage(result.message || "Profile data is not available.");
        else setRecord((result.response || [])[0] || null);
      } catch {
        if (active) setMessage("Could not connect to the football data service.");
      } finally {
        if (active) setLoading(false);
      }
    }
    void load();
    return () => { active = false; };
  }, [kind, id]);

  if (loading) return <div className="feed-state"><span className="loader-dot" /> Loading profile…</div>;
  if (!configured) return <div className="api-setup"><span className="api-setup-kicker">PROFILE DATA CONNECTION</span><h3>Connect verified club and player data.</h3><p>Add your API-Football key in Vercel Environment Variables to load this profile.</p><a href="https://www.api-football.com/" target="_blank" rel="noreferrer">Explore API-Football ↗</a></div>;
  if (message || !record) return <div className="feed-state feed-error">{message || "No profile was found for this ID."}</div>;

  if (kind === "team") {
    const team = record.team as Record<string, unknown> | undefined;
    const venue = record.venue as Record<string, unknown> | undefined;
    return <div className="profile-panel">
      <div className="profile-identity">
        {team?.logo && <img src={String(team.logo)} alt="" />}
        <div><span className="story-category">CLUB PROFILE</span><h2>{String(team?.name || "Club")}</h2><p>{String(team?.country || "Country not listed")}</p></div>
      </div>
      <div className="profile-facts">
        <div><small>FOUNDED</small><strong>{String(team?.founded || "—")}</strong></div>
        <div><small>NATIONAL TEAM</small><strong>{String(team?.national ? "Yes" : "Club")}</strong></div>
        <div><small>VENUE</small><strong>{String(venue?.name || "—")}</strong></div>
        <div><small>CAPACITY</small><strong>{venue?.capacity ? Number(venue.capacity).toLocaleString() : "—"}</strong></div>
        <div><small>CITY</small><strong>{String(venue?.city || "—")}</strong></div>
        <div><small>SURFACE</small><strong>{String(venue?.surface || "—")}</strong></div>
      </div>
    </div>;
  }

  const player = record.player as Record<string, unknown> | undefined;
  const stats = record.statistics as Array<Record<string, unknown>> | undefined;
  const first = stats?.[0] || {};
  const team = first.team as Record<string, unknown> | undefined;
  const games = first.games as Record<string, unknown> | undefined;
  const goals = first.goals as Record<string, unknown> | undefined;
  return <div className="profile-panel">
    <div className="profile-identity">
      {player?.photo && <img src={String(player.photo)} alt="" />}
      <div><span className="story-category">PLAYER PROFILE</span><h2>{String(player?.name || "Player")}</h2><p>{String(team?.name || "Team data unavailable")}</p></div>
    </div>
    <div className="profile-facts">
      <div><small>NATIONALITY</small><strong>{String(player?.nationality || "—")}</strong></div>
      <div><small>AGE</small><strong>{String(player?.age || "—")}</strong></div>
      <div><small>POSITION</small><strong>{String(games?.position || "—")}</strong></div>
      <div><small>APPEARANCES</small><strong>{String(games?.appearences ?? "—")}</strong></div>
      <div><small>GOALS</small><strong>{String(goals?.total ?? "—")}</strong></div>
      <div><small>ASSISTS</small><strong>{String(goals?.assists ?? "—")}</strong></div>
    </div>
  </div>;
}
