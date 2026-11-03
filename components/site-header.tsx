const links = [
  ["Live scores", "/live"],
  ["Fixtures", "/fixtures"],
  ["Competitions", "/competitions"],
  ["Clubs", "/clubs"],
  ["Players", "/players"],
  ["News", "/news"],
  ["Videos", "/videos"],
  ["Statistics", "/statistics"],
] as const;

export function SiteHeader() {
  return (
    <>
      <div className="topline">
        <div className="container topline-inner">
          <span><i className="status-dot" /> YOUR GLOBAL FOOTBALL DESK</span>
          <span className="topline-note">INDEPENDENT FOOTBALL. ONE PLACE.</span>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="/" aria-label="WOW.FUTBOL home">
            <span className="brand-symbol">W</span>
            <span className="brand-word">WOW<span>.</span>FUTBOL</span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          </nav>
          <a className="header-action" href="/live">Match centre <span className="arrow-icon">↗</span></a>
          <details className="mobile-menu">
            <summary aria-label="Open navigation">MENU <span>＋</span></summary>
            <nav aria-label="Mobile navigation">
              {links.map(([label, href]) => <a key={href} href={href}>{label} <span>↗</span></a>)}
            </nav>
          </details>
        </div>
      </header>
    </>
  );
}
