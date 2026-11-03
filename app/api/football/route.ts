import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://v3.football.api-sports.io/";
const endpoints: Record<string, string> = {
  fixtures: "fixtures",
  fixture: "fixtures",
  standings: "standings",
  leagues: "leagues",
  status: "status",
  teams: "teams",
  team: "teams",
  topscorers: "players/topscorers",
  topassists: "players/topassists",
  player: "players",
  events: "fixtures/events",
  lineups: "fixtures/lineups",
  statistics: "fixtures/statistics",
};

const allowedParams = ["id", "ids", "live", "date", "league", "season", "team", "next", "last", "from", "to", "country", "search", "timezone", "fixture"];

export async function GET(request: NextRequest) {
  const key = process.env.API_FOOTBALL_KEY;
  if (!key) {
    return NextResponse.json(
      { configured: false, message: "Football data is not connected yet. Add API_FOOTBALL_KEY in Vercel Environment Variables." },
      { status: 503 }
    );
  }

  const incoming = request.nextUrl.searchParams;
  const mode = incoming.get("mode") || "fixtures";
  const endpoint = endpoints[mode];
  if (!endpoint) {
    return NextResponse.json({ configured: true, message: "Unsupported football data request." }, { status: 400 });
  }

  const query = new URLSearchParams();
  for (const param of allowedParams) {
    const value = incoming.get(param);
    if (value) query.set(param, value);
  }

  if (mode === "fixture" && !query.has("id")) {
    return NextResponse.json({ configured: true, message: "A fixture ID is required." }, { status: 400 });
  }

  if (["events", "lineups", "statistics"].includes(mode) && !query.has("fixture")) {
    return NextResponse.json({ configured: true, message: "A fixture ID is required for match details." }, { status: 400 });
  }

  const cacheSettings: Record<string, { env: string; fallback: number }> = {
    fixtures: incoming.has("live")
      ? { env: "API_LIVE_CACHE_SECONDS", fallback: 1800 }
      : { env: "API_FIXTURE_CACHE_SECONDS", fallback: 21600 },
    fixture: { env: "API_MATCH_CACHE_SECONDS", fallback: 1800 },
    events: { env: "API_MATCH_CACHE_SECONDS", fallback: 1800 },
    lineups: { env: "API_MATCH_CACHE_SECONDS", fallback: 1800 },
    statistics: { env: "API_MATCH_CACHE_SECONDS", fallback: 1800 },
    standings: { env: "API_STANDINGS_CACHE_SECONDS", fallback: 21600 },
    teams: { env: "API_TEAMS_CACHE_SECONDS", fallback: 86400 },
    team: { env: "API_TEAMS_CACHE_SECONDS", fallback: 86400 },
    topscorers: { env: "API_PLAYER_RANKINGS_CACHE_SECONDS", fallback: 21600 },
    topassists: { env: "API_PLAYER_RANKINGS_CACHE_SECONDS", fallback: 21600 },
    player: { env: "API_PLAYER_CACHE_SECONDS", fallback: 86400 },
    leagues: { env: "API_LEAGUES_CACHE_SECONDS", fallback: 86400 },
  };
  const cacheSetting = cacheSettings[mode] || (mode === "status" ? { env: "API_STATUS_CACHE_SECONDS", fallback: 60 } : { env: "API_CACHE_SECONDS", fallback: 21600 });
  const configuredCache = Number(process.env[cacheSetting.env] || cacheSetting.fallback);
  const cacheSeconds = Number.isFinite(configuredCache)
    ? Math.max(60, Math.min(86400, configuredCache))
    : cacheSetting.fallback;

  const url = `${BASE_URL}${endpoint}?${query.toString()}`;
  try {
    const response = await fetch(url, {
      headers: { "x-apisports-key": key },
      next: { revalidate: cacheSeconds },
    });
    const payload = await response.json();
    if (!response.ok || (payload.errors && Object.keys(payload.errors).length > 0)) {
      return NextResponse.json({
        configured: true,
        message: "The football data provider returned an error. Check your API key, subscription and competition coverage.",
        errors: payload.errors || null,
      }, { status: response.status || 502 });
    }
    const headerNumber = (name: string) => {
      const value = response.headers.get(name);
      return value === null ? null : Number(value);
    };
    const quota = {
      dailyLimit: headerNumber("x-ratelimit-requests-limit"),
      dailyRemaining: headerNumber("x-ratelimit-requests-remaining"),
      minuteLimit: headerNumber("X-RateLimit-Limit"),
      minuteRemaining: headerNumber("X-RateLimit-Remaining"),
    };

    if (mode === "status") {
      const statusResponse = Array.isArray(payload.response) ? payload.response[0] : payload.response;
      const subscription = statusResponse?.subscription || {};
      return NextResponse.json({
        configured: true,
        connected: true,
        provider: "API-Football",
        plan: subscription.plan || "Active account",
        quota,
      }, {
        headers: { "Cache-Control": "no-store" },
      });
    }

    return NextResponse.json({
      configured: true,
      results: payload.results ?? 0,
      response: payload.response ?? [],
      paging: payload.paging ?? null,
      quota,
      provider: "API-Football",
    }, {
      headers: { "Cache-Control": `s-maxage=${cacheSeconds}, stale-while-revalidate=60` },
    });
  } catch {
    return NextResponse.json({ configured: true, message: "Unable to reach the football data provider." }, { status: 502 });
  }
}
