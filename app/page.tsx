const navigation = [
  { label: "Scores", href: "#scores" },
  { label: "Competitions", href: "#competitions" },
  { label: "News", href: "#news" },
  { label: "Clubs", href: "#clubs" },
  { label: "Statistics", href: "#statistics" },
];

const sampleMatches = [
  {
    competition: "MATCH CENTRE PREVIEW",
    home: "Northbridge",
    homeCode: "NOR",
    away: "Riverside",
    awayCode: "RIV",
    time: "19:45",
    state: "UPCOMING",
  },
  {
    competition: "MATCH CENTRE PREVIEW",
    home: "Kingsport",
    homeCode: "KIN",
    away: "Eastvale",
    awayCode: "EAS",
    time: "20:00",
    state: "UPCOMING",
  },
  {
    competition: "MATCH CENTRE PREVIEW",
    home: "Westford",
    homeCode: "WES",
    away: "Hillcrest",
    awayCode: "HIL",
    time: "20:30",
    state: "UPCOMING",
  },
];

const competitions = [
  { name: "Premier League", region: "England", mark: "PL", tone: "lime" },
  { name: "LaLiga", region: "Spain", mark: "LL", tone: "coral" },
  { name: "Serie A", region: "Italy", mark: "SA", tone: "blue" },
  { name: "Bundesliga", region: "Germany", mark: "BL", tone: "red" },
  { name: "Ligue 1", region: "France", mark: "L1", tone: "violet" },
  { name: "Champions League", region: "Europe", mark: "UCL", tone: "gold" },
];

const stories = [
  {
    category: "THE BIG PICTURE",
    title: "The details that decide a match",
    summary: "Explore the moments, movement and decisions behind the final score.",
    style: "story-art-one",
    label: "TACTICS",
  },
  {
    category: "DATA ROOM",
    title: "Beyond goals: reading team performance",
    summary: "A clearer look at the numbers that tell the story of a season.",
    style: "story-art-two",
    label: "ANALYSIS",
  },
  {
    category: "THE TOUCHLINE",
    title: "The people shaping the modern game",
    summary: "Profiles, perspectives and conversations from across football.",
    style: "story-art-three",
    label: "PEOPLE",
  },
];

function BrandMark() {
  return (
    <a className="brand" href="/" aria-label="WOW.FUTBOL home">
      <span className="brand-symbol">W</span>
      <span className="brand-word">WOW<span>.</span>FUTBOL</span>
    </a>
  );
}

function ArrowIcon() {
  return <span aria-hidden="true" className="arrow-icon">↗</span>;
}

export default function Home() {
  return (
    <main>
      <div className="topline">
        <div className="container topline-inner">
          <span><i className="status-dot" /> YOUR GLOBAL FOOTBALL DESK</span>
          <span className="topline-note">INDEPENDENT FOOTBALL. ONE PLACE.</span>
        </div>
      </div>

      <header className="site-header">
        <div className="container header-inner">
          <BrandMark />
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((item) => (
              <a key={item.label} href={item.href}>{item.label}</a>
            ))}
          </nav>
          <a className="header-action" href="#scores">
            Explore football <ArrowIcon />
          </a>
          <button className="menu-button" aria-label="Open navigation menu" type="button">
            <span /><span />
          </button>
        </div>
      </header>

      <section className="hero">
        <div className="hero-orbit hero-orbit-one" />
        <div className="hero-orbit hero-orbit-two" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> THE GAME, CONNECTED</div>
            <h1>Football is<br /><em>more than</em><br />ninety minutes.</h1>
            <p className="hero-description">
              The matches, the people, the numbers and the stories.
              Everything you follow, all in one place.
            </p>
            <div className="hero-buttons">
              <a className="button button-primary" href="#scores">Explore match centre <ArrowIcon /></a>
              <a className="text-link" href="#competitions">Discover competitions <span>→</span></a>
            </div>
            <div className="hero-footnote">
              <span className="footnote-mark">01</span>
              <span>YOUR NEW PERSPECTIVE ON THE BEAUTIFUL GAME</span>
            </div>
          </div>

          <div className="hero-visual" aria-label="Decorative football-inspired graphic">
            <div className="visual-caption visual-caption-top">THE WORLD OF FOOTBALL</div>
            <div className="pitch-lines">
              <div className="pitch-midline" />
              <div className="pitch-circle" />
              <div className="pitch-box pitch-box-left" />
              <div className="pitch-box pitch-box-right" />
            </div>
            <div className="orb-ball"><span /></div>
            <div className="visual-stamp">
              <span>THE</span>
              <strong>WOW</strong>
              <span>FACTOR</span>
            </div>
            <div className="visual-caption visual-caption-bottom">EST. FOR THE LOVE OF THE GAME</div>
          </div>
        </div>
        <div className="hero-bottom container">
          <span>FIXTURES</span><span className="hero-bottom-separator" />
          <span>CLUBS</span><span className="hero-bottom-separator" />
          <span>PLAYERS</span><span className="hero-bottom-separator" />
          <span>STORIES</span>
          <span className="hero-bottom-right">SCROLL TO EXPLORE ↓</span>
        </div>
      </section>

      <section className="score-section section-pad" id="scores">
        <div className="container">
          <div className="section-heading">
            <div>
              <div className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> THE MATCHDAY DESK</div>
              <h2>Follow the <em>action.</em></h2>
            </div>
            <a className="section-link" href="#match-centre">Open match centre <ArrowIcon /></a>
          </div>
          <div className="data-notice">
            <span className="notice-icon">i</span>
            Preview interface — connect a licensed football data provider to activate verified fixtures, live scores and match events.
          </div>
          <div className="match-grid">
            {sampleMatches.map((match, index) => (
              <article className="match-card" key={match.home}>
                <div className="match-card-top">
                  <span>{match.competition}</span>
                  <span className="match-state">{match.state}</span>
                </div>
                <div className="match-teams">
                  <div className="match-team">
                    <span className={`team-monogram team-tone-${index + 1}`}>{match.homeCode}</span>
                    <strong>{match.home}</strong>
                  </div>
                  <div className="match-vs">VS</div>
                  <div className="match-team">
                    <span className={`team-monogram team-tone-${index + 2}`}>{match.awayCode}</span>
                    <strong>{match.away}</strong>
                  </div>
                </div>
                <div className="match-card-bottom">
                  <span>Kick-off</span><strong>{match.time}</strong>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="competition-section section-pad" id="competitions">
        <div className="container">
          <div className="section-heading section-heading-light">
            <div>
              <div className="eyebrow"><span className="eyebrow-line" /> THE BIG STAGES</div>
              <h2>Every league.<br /><em>One destination.</em></h2>
            </div>
            <p className="section-intro">From domestic rivalries to continental nights, find the competitions that make football unforgettable.</p>
          </div>
          <div className="competition-grid">
            {competitions.map((competition, index) => (
              <a className="competition-card" href="#scores" key={competition.name}>
                <span className={`competition-mark mark-${competition.tone}`}>{competition.mark}</span>
                <span className="competition-copy">
                  <small>{competition.region} · COMPETITION</small>
                  <strong>{competition.name}</strong>
                </span>
                <span className="competition-number">0{index + 1}</span>
                <ArrowIcon />
              </a>
            ))}
          </div>
          <div className="competition-foot">
            <span>MORE COMPETITIONS COMING INTO VIEW</span>
            <span>01 — 06</span>
          </div>
        </div>
      </section>

      <section className="stories-section section-pad" id="news">
        <div className="container">
          <div className="section-heading">
            <div>
              <div className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> THE EDITORIAL</div>
              <h2>Stories move <em>the game.</em></h2>
            </div>
            <a className="section-link" href="#news">Explore the newsroom <ArrowIcon /></a>
          </div>
          <div className="story-grid">
            {stories.map((story, index) => (
              <article className="story-card" key={story.title}>
                <div className={`story-art ${story.style}`}>
                  <span className="story-art-label">{story.label}</span>
                  <span className="story-art-index">0{index + 1}</span>
                  <div className="story-art-shape" />
                </div>
                <div className="story-body">
                  <span className="story-category">{story.category}</span>
                  <h3>{story.title}</h3>
                  <p>{story.summary}</p>
                  <a href="#news" aria-label={`Read more about ${story.title}`}>Read the story <ArrowIcon /></a>
                </div>
              </article>
            ))}
          </div>
          <p className="content-note">Editorial examples for the design preview. Original articles and a publishing workflow will be added before launch.</p>
        </div>
      </section>

      <section className="stats-band" id="statistics">
        <div className="container stats-band-inner">
          <div>
            <div className="eyebrow"><span className="eyebrow-line" /> THE NUMBERS BEHIND THE GAME</div>
            <h2>See the game<br /><em>differently.</em></h2>
          </div>
          <div className="stats-band-copy">
            <p>Team trends. Player performances. League tables. A smarter way to explore the details that shape every season.</p>
            <a className="button button-outline" href="#clubs">Explore the data room <ArrowIcon /></a>
          </div>
          <div className="stats-decoration">W<span>.</span></div>
        </div>
      </section>

      <section className="clubs-section section-pad" id="clubs">
        <div className="container clubs-inner">
          <div>
            <div className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> BUILT AROUND THE GAME</div>
            <h2>Find your club.<br /><em>Follow your players.</em></h2>
          </div>
          <div className="clubs-description">
            <p>Discover club histories, squad profiles, player journeys, form guides and season-by-season performance.</p>
            <span className="coming-soon">CLUB & PLAYER DATABASE · COMING SOON</span>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-main">
          <div className="footer-brand-block">
            <BrandMark />
            <p>Football, without the noise.<br />Every match. Every moment.</p>
          </div>
          <div className="footer-column">
            <strong>EXPLORE</strong>
            <a href="#scores">Match centre</a>
            <a href="#competitions">Competitions</a>
            <a href="#news">Newsroom</a>
            <a href="#statistics">Statistics</a>
          </div>
          <div className="footer-column">
            <strong>THE PLATFORM</strong>
            <a href="#clubs">Clubs & players</a>
            <a href="#competitions">Leagues</a>
            <a href="#news">Editorial</a>
            <a href="#scores">Fixtures</a>
          </div>
          <div className="footer-column">
            <strong>INFORMATION</strong>
            <a href="#footer">About WOW.FUTBOL</a>
            <a href="#footer">Contact</a>
            <a href="#footer">Privacy policy</a>
            <a href="#footer">Terms of use</a>
          </div>
        </div>
        <div className="container footer-bottom" id="footer">
          <span>© {new Date().getFullYear()} WOW.FUTBOL. ALL RIGHTS RESERVED.</span>
          <span>INDEPENDENT FOOTBALL MEDIA</span>
          <a href="#top">BACK TO TOP ↑</a>
        </div>
      </footer>
    </main>
  );
}
