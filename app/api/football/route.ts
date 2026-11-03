import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://v3.football.api-sports.io/";
const endpoints: Record<string, string> = {
  fixtures: "fixtures",
  fixture: "fixtures",
  standings: "standings",
  leagues: "leagues",
  teams: "teams",
  topscorers: "players/topscorers",
  topassists: "players/topassists",
  player: "players",
};

const allowedParams = ["id", "ids", "live", "date", "league", "season", "team", "next", "last", "from", "to", "country", "search", "timezone"];

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

  const url = `${BASE_URL}${endpoint}?${query.toString()}`;
  try {
    const response = await fetch(url, {
      headers: { "x-apisports-key": key },
      next: { revalidate: Number(process.env.API_CACHE_SECONDS || 300) },
    });
    const payload = await response.json();
    if (!response.ok || (payload.errors && Object.keys(payload.errors).length > 0)) {
      return NextResponse.json({
        configured: true,
        message: "The football data provider returned an error. Check your API key, subscription and competition coverage.",
        errors: payload.errors || null,
      }, { status: response.status || 502 });
    }
    return NextResponse.json({
      configured: true,
      results: payload.results ?? 0,
      response: payload.response ?? [],
      paging: payload.paging ?? null,
      provider: "API-Football",
    }, {
      headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=60" },
    });
  } catch {
    return NextResponse.json({ configured: true, message: "Unable to reach the football data provider." }, { status: 502 });
  }
}
