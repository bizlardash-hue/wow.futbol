"use client";

import { useEffect, useState } from "react";

type Status = {
  configured?: boolean;
  connected?: boolean;
  provider?: string;
  plan?: string;
  quota?: {
    dailyLimit: number | null;
    dailyRemaining: number | null;
    minuteLimit: number | null;
    minuteRemaining: number | null;
  };
  message?: string;
  errors?: unknown;
};

export function ApiStatusCheck() {
  const [status, setStatus] = useState<Status | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkedAt, setCheckedAt] = useState("");

  async function check() {
    setLoading(true);
    try {
      const response = await fetch("/api/football?mode=status", { cache: "no-store" });
      const data = (await response.json()) as Status;
      setStatus(data);
      setCheckedAt(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    } catch {
      setStatus({ configured: false, message: "Could not reach the WOW.FUTBOL server." });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void check(); }, []);

  return <div className="api-status-panel">
    <div className="api-status-heading">
      <div><span className="story-category">DATA CONNECTION</span><h2>Football API status</h2></div>
      <button className="refresh-button" type="button" onClick={() => void check()} disabled={loading}>{loading ? "CHECKING…" : "↻ CHECK AGAIN"}</button>
    </div>
    {loading && <div className="feed-state"><span className="loader-dot" /> Checking the connection…</div>}
    {!loading && !status?.configured && <div className="api-status-missing">
      <span className="api-status-symbol">!</span>
      <div><strong>API key not added yet</strong><p>Add <code>API_FOOTBALL_KEY</code> in Vercel → Project Settings → Environment Variables, then redeploy. Do not paste the key into this page or GitHub.</p></div>
    </div>}
    {!loading && status?.configured && status.connected && <div className="api-status-ok">
      <span className="api-status-symbol">✓</span>
      <div><strong>API key accepted</strong><p>WOW.FUTBOL can now request football data from API-Football.</p></div>
    </div>}
    {!loading && status?.configured && !status.connected && <div className="api-status-error">
      <span className="api-status-symbol">!</span>
      <div><strong>Connection problem</strong><p>{status.message || "Check the API key and provider account."}</p><small>{status.errors ? JSON.stringify(status.errors) : ""}</small></div>
    </div>}
    {!loading && status?.connected && <div className="api-quota-grid">
      <div><small>DAILY REQUEST LIMIT</small><strong>{status.quota?.dailyLimit ?? "—"}</strong></div>
      <div><small>REQUESTS REMAINING</small><strong>{status.quota?.dailyRemaining ?? "—"}</strong></div>
      <div><small>PER-MINUTE LIMIT</small><strong>{status.quota?.minuteLimit ?? "—"}</strong></div>
      <div><small>PER-MINUTE REMAINING</small><strong>{status.quota?.minuteRemaining ?? "—"}</strong></div>
    </div>}
    <div className="api-status-foot">STATUS CHECK {checkedAt ? `· ${checkedAt}` : ""} · STATUS ENDPOINT IS EXCLUDED FROM THE DAILY QUOTA ACCORDING TO API-FOOTBALL DOCUMENTATION.</div>
  </div>;
}
