export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand-block">
          <a className="brand" href="/">
            <span className="brand-symbol">W</span>
            <span className="brand-word">WOW<span>.</span>FUTBOL</span>
          </a>
          <p>Football, without the noise.<br />Every match. Every moment.</p>
          <span className="footer-disclaimer">Independent football media. Not affiliated with any league or club.</span>
        </div>
        <div className="footer-column">
          <strong>FOLLOW THE GAME</strong>
          <a href="/live">Live scores</a><a href="/fixtures">Fixtures & results</a><a href="/competitions">Competitions</a><a href="/statistics">Statistics</a>
        </div>
        <div className="footer-column">
          <strong>DISCOVER</strong>
          <a href="/clubs">Clubs</a><a href="/players">Players</a><a href="/news">Newsroom</a><a href="/videos">Videos</a>
        </div>
        <div className="footer-column">
          <strong>INFORMATION</strong>
          <a href="/about">About WOW.FUTBOL</a><a href="/contact">Contact</a><a href="/privacy">Privacy policy</a><a href="/terms">Terms of use</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} WOW.FUTBOL. ALL RIGHTS RESERVED.</span>
        <span>INDEPENDENT FOOTBALL MEDIA</span>
        <a href="#top">BACK TO TOP ↑</a>
      </div>
    </footer>
  );
}
