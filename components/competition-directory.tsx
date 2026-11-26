"use client";

import { useCallback, useEffect, useState } from "react";

type Competition = {
  league: { id: number; name: string; type?: string; logo?: string | null };
  country: { name?: string; code?: string | null; flag?: string | null };
  seasons?: Array<{ year: number; current?: boolean; coverage?: Record<string, boolean> }>;
};

type ApiResponse = {
  configured?: boolean;
  response?: Competition[];
  paging?: { current?: number; total?: number };
  message?: string;
};

function slugify(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function CompetitionDirectory() {
  const [items, setItems] = useState<Competition[]>([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [message, setMessage] = useState("");

  const load = useCallback(async (nextPage: number, append: boolean) => {
    append ? setLoadingMore(true) : setLoading(true);
    setMessage("");
    try {
      const params = new URLSearchParams({ mode: "leagues", current: "true", page: String(nextPage) });
      if (query) params.set("search", query);
      const response = await fetch(`/api/football?${params.toString()}`, { cache: "no-store" });
      const result = (await response.json()) as ApiResponse;
      setConfigured(Boolean(result.configured));
      if (!response.ok) {
        setMessage(result.message || "The competition catalogue could not be loaded.");
        if (!append) setItems([]);
        return;
      }
      const nextItems = result.response || [];
      setItems((current) => append ? [...current, ...nextItems] : nextItems);
      setPage(nextPage);
      setTotalPages(result.paging?.total || 1);
    } catch {
      setMessage("We could not reach the football data service. Please try again.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [query]);

  useEffect(() => { void load(1, false); }, [load]);

  const visibleItems = items.filter((item) => {
    const text = `${item.league.name} ${item.country?.name || ""} ${item.league.type || ""}`.toLowerCase();
    return !search || text.includes(search.toLowerCase());
  });

  return (
    <section className="competition-directory-live">
      <div className="competition-directory-toolbar">
        <div>
          <span className="eyebrow dark-eyebrow">THE GLOBAL CATALOGUE</span>
          <h2>Football, <em>worldwide.</em></h2>
          <p>Browse active leagues and cups from domestic football to continental and international tournaments.</p>
        </div>
        <form className="competition-search" onSubmit={(event) => { event.preventDefault(); setQuery(search.trim()); }}>
          <label htmlFor="competition-search">Find a league, cup or country</label>
          <div><input id="competition-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search competitions…" /><button type="submit">SEARCH</button></div>
        </form>
      </div>

      {loading && <div className="feed-state"><span className="loader-dot" /> Loading the global competition catalogue…</div>}
      {!loading && configured === false && <div className="api-setup"><h3>Connect the football data feed.</h3><p>Add the <code>API_FOOTBALL_KEY</code> secret in Cloudflare Worker settings to load the worldwide competition catalogue.</p><a href="https://www.api-football.com/" target="_blank" rel="noreferrer">Explore API-Football ↗</a></div>}
      {!loading && configured && message && <div className="feed-state feed-error">{message}</div>}
      {!loading && configured && !message && visibleItems.length === 0 && <div className="feed-state">No matching competitions on this catalogue page. Try another search.</div>}

      {!loading && configured && visibleItems.length > 0 && <div className="competition-live-grid">
        {visibleItems.map((item) => {
          const season = item.seasons?.find((entry) => entry.current)?.year || item.seasons?.[item.seasons.length - 1]?.year || new Date().getFullYear();
          const href = `/competitions/${slugify(item.league.name)}-${item.league.id}?season=${season}`;
          return <a className="competition-live-card" href={href} key={item.league.id}>
            <span className="competition-live-logo">{item.league.logo ? <img src={item.league.logo} alt="" loading="lazy" /> : <b>{item.league.name.slice(0, 2).toUpperCase()}</b>}</span>
            <span className="competition-live-copy"><strong>{item.league.name}</strong><small>{item.country?.flag ? `${item.country.flag} ` : ""}{item.country?.name || "International"} · {item.league.type || "Competition"}</small><em>View competition ↗</em></span>
          </a>;
        })}
      </div>}

      {!loading && configured && page < totalPages && <div className="competition-load-more"><button type="button" onClick={() => void load(page + 1, true)} disabled={loadingMore}>{loadingMore ? "LOADING…" : "LOAD MORE COMPETITIONS"}</button><small>Page {page} of {totalPages}</small></div>}
      <p className="competition-directory-note">Competition availability and data coverage depend on the connected API-Football subscription and season.</p>
    </section>
  );
}
