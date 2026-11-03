import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { FixtureExplorer } from "../components/fixture-explorer";

const competitions = [
  { name: "Premier League", region: "England", mark: "PL", slug: "premier-league", image: "https://images.unsplash.com/photo-1781152791898-945ca008c8ef?auto=format&fit=crop&fm=jpg&q=85&w=1000", position: "center" },
  { name: "LaLiga", region: "Spain", mark: "LL", slug: "laliga", image: "https://images.unsplash.com/photo-1545525201-e1a5a2a18293?auto=format&fit=crop&fm=jpg&q=85&w=1000", position: "center" },
  { name: "Serie A", region: "Italy", mark: "SA", slug: "serie-a", image: "https://images.unsplash.com/photo-1695203063441-9042bcecbdf3?auto=format&fit=crop&fm=jpg&q=85&w=1000", position: "center" },
  { name: "Bundesliga", region: "Germany", mark: "BL", slug: "bundesliga", image: "https://images.unsplash.com/photo-1711812176453-5b70a6f0a984?auto=format&fit=crop&fm=jpg&q=85&w=1000", position: "center" },
  { name: "Ligue 1", region: "France", mark: "L1", slug: "ligue-1", image: "https://images.unsplash.com/photo-1711812176441-59f8414cf8f6?auto=format&fit=crop&fm=jpg&q=85&w=1000", position: "center" },
  { name: "Champions League", region: "Europe", mark: "UCL", slug: "champions-league", image: "https://images.unsplash.com/photo-1629217855633-79a6925d6c47?auto=format&fit=crop&fm=jpg&q=85&w=1000", position: "center" },
];

const stories = [
  {
    category: "TACTICAL NOTEBOOK",
    title: "How to read the space in midfield",
    summary: "Passing lanes, rotations and the small decisions that shape control of a match.",
    href: "/news/how-to-read-a-midfield",
    image: "https://images.unsplash.com/photo-1695203063441-9042bcecbdf3?auto=format&fit=crop&fm=jpg&q=85&w=1000",
    imageAlt: "Football action on the pitch",
    readTime: "6 MIN READ",
  },
  {
    category: "DATA ROOM",
    title: "What the league table does not tell you",
    summary: "Points tell one part of the story. Performance data adds context.",
    href: "/news/what-the-table-does-not-tell-you",
    image: "https://images.unsplash.com/photo-1781152791898-945ca008c8ef?auto=format&fit=crop&fm=jpg&q=85&w=1000",
    imageAlt: "A football stadium under lights",
    readTime: "5 MIN READ",
  },
  {
    category: "THE GAME",
    title: "The rhythm of a matchday",
    summary: "From warm-ups to the final whistle, explore the details of the occasion.",
    href: "/news/the-rhythm-of-a-matchday",
    image: "https://images.unsplash.com/photo-1711812176453-5b70a6f0a984?auto=format&fit=crop&fm=jpg&q=85&w=1000",
    imageAlt: "Football stadium atmosphere",
    readTime: "4 MIN READ",
  },
];

function ArrowIcon() {
  return <span aria-hidden="true" className="arrow-icon">↗</span>;
}

export default function Home() {
  return (
    <main id="top" className="home-v2">
      <SiteHeader />

      <section className="hero hero-v2">
        <div className="hero-grid container">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> THE WORLD OF FOOTBALL, CONNECTED</div>
            <h1>Every match.<br /><em>Every moment.</em></h1>
            <p className="hero-description">
              Live scores, fixtures, competitions, clubs, players and the stories
              behind the beautiful game — all in one place.
            </p>
            <div className="hero-buttons">
              <a className="button button-primary" href="/live">Explore live scores <ArrowIcon /></a>
              <a className="button button-ghost" href="/competitions">Browse competitions <span>→</span></a>
            </div>
            <div className="hero-proof">
              <span className="hero-proof-dot" />
              <span>INDEPENDENT FOOTBALL MEDIA</span>
              <span className="hero-proof-divider" />
              <span>BUILT FOR THE FANS</span>
            </div>
          </div>

          <div className="hero-visual hero-visual-v2">
            <img
              className="hero-photo"
              src="https://images.unsplash.com/photo-1781152791898-945ca008c8ef?auto=format&fit=crop&fm=jpg&q=90&w=1600"
              alt="Football stadium illuminated during a match"
              fetchPriority="high"
            />
            <div className="hero-photo-shade" />
            <div className="hero-image-topline">
              <span>WOW.FUTBOL / MATCHDAY</span>
              <span>01 — THE GLOBAL GAME</span>
            </div>
            <div className="hero-image-bottom">
              <span className="hero-image-kicker">YOUR FOOTBALL WORLD</span>
              <strong>Closer to<br />the action.</strong>
              <span className="hero-image-arrow">↗</span>
            </div>
          </div>
        </div>
        <div className="hero-ribbon">
          <div className="container hero-ribbon-inner">
            <span>LIVE SCORES</span><i />
            <span>GLOBAL COMPETITIONS</span><i />
            <span>CLUBS & PLAYERS</span><i />
            <span>NEWS & ANALYSIS</span>
            <a href="/fixtures">VIEW FIXTURES <ArrowIcon /></a>
          </div>
        </div>
      </section>

      <section className="score-section section-pad home-score-section" id="scores">
        <div className="container">
          <div className="section-heading">
            <div>
              <div className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> THE MATCHDAY DESK</div>
              <h2>Stay with <em>the game.</em></h2>
              <p className="section-subtitle">Follow live action or choose a date to explore upcoming fixtures and results.</p>
            </div>
            <a className="section-link" href="/fixtures">Full fixtures & results <ArrowIcon /></a>
          </div>
          <FixtureExplorer initialMode="live" />
        </div>
      </section>

      <section className="competition-section section-pad competition-section-v2" id="competitions">
        <div className="container">
          <div className="section-heading section-heading-light">
            <div>
              <div className="eyebrow"><span className="eyebrow-line" /> THE BIG STAGES</div>
              <h2>Choose your <em>competition.</em></h2>
            </div>
            <div className="section-heading-aside">
              <p>From domestic rivalries to continental nights, explore the competitions that make football unforgettable.</p>
              <a href="/competitions">All competitions <ArrowIcon /></a>
            </div>
          </div>
          <div className="competition-card-grid">
            {competitions.map((competition, index) => (
              <a className="competition-feature-card" href={`/competitions/${competition.slug}`} key={competition.slug}>
                <img src={competition.image} alt={`${competition.name} football atmosphere`} loading="lazy" style={{ objectPosition: competition.position }} />
                <span className="competition-card-overlay" />
                <span className="competition-card-top"><b>{competition.mark}</b><small>0{index + 1} / 06</small></span>
                <span className="competition-card-bottom">
                  <small>{competition.region.toUpperCase()} · COMPETITION</small>
                  <strong>{competition.name}</strong>
                  <span>Explore competition <ArrowIcon /></span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="stories-section section-pad stories-section-v2" id="news">
        <div className="container">
          <div className="section-heading">
            <div>
              <div className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> THE EDITORIAL</div>
              <h2>More than <em>the score.</em></h2>
              <p className="section-subtitle">Fresh perspectives, original explainers and the details that give the game meaning.</p>
            </div>
            <a className="section-link" href="/news">Visit the newsroom <ArrowIcon /></a>
          </div>
          <div className="story-grid story-grid-v2">
            {stories.map((story, index) => (
              <article className={`story-card story-card-v2 ${index === 0 ? "story-card-featured" : ""}`} key={story.href}>
                <a href={story.href} className="story-image-v2">
                  <img src={story.image} alt={story.imageAlt} loading="lazy" />
                  <span className="story-image-category">{story.category}</span>
                  <span className="story-image-arrow">↗</span>
                </a>
                <div className="story-body story-body-v2">
                  <div className="story-meta"><span>{story.category}</span><span>{story.readTime}</span></div>
                  <h3><a href={story.href}>{story.title}</a></h3>
                  <p>{story.summary}</p>
                  <a className="story-read-link" href={story.href}>Read the feature <ArrowIcon /></a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-video-section home-video-v2">
        <div className="container home-video-grid">
          <div className="home-video-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> WATCH THE GAME</div>
            <h2>The moments<br />that <em>stay with you.</em></h2>
            <p>Watch highlights and features embedded from official football publishers. The original video stays hosted by its rights holder.</p>
            <a className="button button-primary" href="/videos">Explore videos <ArrowIcon /></a>
          </div>
          <div className="home-video-frame">
            <iframe
              src="https://www.youtube-nocookie.com/embed/DLOUfAVwuXA"
              title="Football highlights from the official UEFA channel"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
            <span className="video-frame-label">OFFICIAL VIDEO / UEFA</span>
          </div>
        </div>
      </section>

      <section className="stats-band stats-band-v2" id="statistics">
        <div className="container stats-band-inner">
          <div className="stats-band-heading">
            <div className="eyebrow"><span className="eyebrow-line" /> THE DATA ROOM</div>
            <h2>See the game<br /><em>from every angle.</em></h2>
          </div>
          <div className="stats-band-copy">
            <p>Explore team performance, player rankings, goals, assists and the numbers that add context to every season.</p>
            <a className="button button-dark" href="/statistics">Explore football statistics <ArrowIcon /></a>
          </div>
          <div className="stats-band-mark">W<span>.</span></div>
        </div>
      </section>

      <section className="clubs-section clubs-section-v2 section-pad" id="clubs">
        <div className="container">
          <div className="clubs-v2-heading">
            <div>
              <div className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> PEOPLE & CLUBS</div>
              <h2>Know the teams.<br /><em>Know the players.</em></h2>
            </div>
            <p>Go beyond the fixture list. Explore club profiles, squads, player stories and season performance.</p>
          </div>
          <div className="directory-cta-grid">
            <a href="/clubs" className="directory-cta directory-cta-clubs">
              <span className="directory-cta-icon">11</span>
              <span><small>THE BADGE. THE CITY. THE HISTORY.</small><strong>Explore clubs</strong><em>Discover teams from around the world <ArrowIcon /></em></span>
            </a>
            <a href="/players" className="directory-cta directory-cta-players">
              <span className="directory-cta-icon">10</span>
              <span><small>THE TALENT BEHIND THE GAME.</small><strong>Meet the players</strong><em>Profiles, rankings and performance <ArrowIcon /></em></span>
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
