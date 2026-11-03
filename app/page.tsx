import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { FixtureExplorer } from "../components/fixture-explorer";

const competitions = [
  { name: "Premier League", region: "England", mark: "PL", tone: "lime", slug: "premier-league" },
  { name: "LaLiga", region: "Spain", mark: "LL", tone: "coral", slug: "laliga" },
  { name: "Serie A", region: "Italy", mark: "SA", tone: "blue", slug: "serie-a" },
  { name: "Bundesliga", region: "Germany", mark: "BL", tone: "red", slug: "bundesliga" },
  { name: "Ligue 1", region: "France", mark: "L1", tone: "violet", slug: "ligue-1" },
  { name: "Champions League", region: "Europe", mark: "UCL", tone: "gold", slug: "champions-league" },
];

const stories = [
  {
    category: "TACTICAL NOTEBOOK",
    title: "How to read the space in midfield",
    summary: "Passing lanes, rotations and small decisions that shape control of a match.",
    style: "story-art-one",
    label: "TACTICS",
    href: "/news/how-to-read-a-midfield",
    image: "https://images.unsplash.com/photo-1695203063441-9042bcecbdf3?auto=format&fit=crop&fm=jpg&q=82&w=900",
  },
  {
    category: "DATA ROOM",
    title: "What the league table does not tell you",
    summary: "Points tell one part of the story. Performance data adds context.",
    style: "story-art-two",
    label: "ANALYSIS",
    href: "/news/what-the-table-does-not-tell-you",
    image: "https://images.unsplash.com/photo-1781152791898-945ca008c8ef?auto=format&fit=crop&fm=jpg&q=82&w=900",
  },
  {
    category: "THE GAME",
    title: "The rhythm of a matchday",
    summary: "From warm-ups to the final whistle, explore the details of the occasion.",
    style: "story-art-three",
    label: "MATCHDAY",
    href: "/news/the-rhythm-of-a-matchday",
    image: "https://images.unsplash.com/photo-1711812176453-5b70a6f0a984?auto=format&fit=crop&fm=jpg&q=82&w=900",
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
    <main id="top">
      <SiteHeader />

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

          <div className="hero-visual" aria-label="Football in a floodlit stadium">
            <img className="hero-photo" src="https://images.unsplash.com/photo-1781152791898-945ca008c8ef?auto=format&fit=crop&fm=jpg&q=85&w=1400" alt="Crowded stadium at night during a football match" />
            <div className="hero-photo-shade" />
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
            <div className="visual-caption visual-caption-bottom">PHOTO: MARYAM TELLO / UNSPLASH</div>
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
          <FixtureExplorer initialMode="live" />
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
                <a href={story.href} className={`story-art ${story.style}`}>
                  <img src={story.image} alt="" loading="lazy" />
                  <span className="story-art-label">{story.label}</span>
                  <span className="story-art-index">0{index + 1}</span>
                  <div className="story-art-shape" />
                </a>
                <div className="story-body">
                  <span className="story-category">{story.category}</span>
                  <h3>{story.title}</h3>
                  <p>{story.summary}</p>
                  <a href={story.href} aria-label={`Read more about ${story.title}`}>Read the story <ArrowIcon /></a>
                </div>
              </article>
            ))}
          </div>
          <p className="content-note">Original WOW.FUTBOL editorial features. Photography credits appear with each story.</p>
        </div>
      </section>

      <section className="home-video-section">
        <div className="container home-video-grid">
          <div className="home-video-frame">
            <iframe src="https://www.youtube-nocookie.com/embed/DLOUfAVwuXA" title="Official UEFA Champions League goal highlights" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
          </div>
          <div className="home-video-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> WATCH THE GAME</div>
            <h2>Big moments.<br /><em>Replayed.</em></h2>
            <p>Watch highlights embedded from official football competition channels. The original video stays hosted by its publisher.</p>
            <a className="button button-primary" href="/videos">Explore videos <ArrowIcon /></a>
            <small>FEATURED SOURCE: VERIFIED UEFA YOUTUBE CHANNEL</small>
          </div>
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
            <a className="button button-outline" href="/statistics">Explore the data room <ArrowIcon /></a>
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
            <span className="coming-soon"><a href="/clubs">EXPLORE CLUBS ↗</a> &nbsp; <a href="/players">EXPLORE PLAYERS ↗</a></span>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
