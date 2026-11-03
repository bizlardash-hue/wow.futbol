import { notFound } from "next/navigation";
import { PageShell } from "../../../components/page-shell";

const articles: Record<string, { category: string; title: string; intro: string; paragraphs: string[]; image: string; credit: string }> = {
  "how-to-read-a-midfield": {
    category: "TACTICAL NOTEBOOK",
    title: "How to read the space in midfield",
    intro: "Midfield control is not only about keeping the ball. It is about creating useful angles, recognising pressure and choosing when to move.",
    paragraphs: [
      "Start with the shape around the ball. A player receiving with an open body position can usually see more of the pitch and has more options than a player facing their own goal.",
      "The next detail is distance. If teammates stand on the same line, one pass can bring several opponents into play. Staggered positions create different passing lanes and make it harder for the defending team to cover every option.",
      "Movement matters just as much as passing. A short movement toward the ball can draw a marker away and create space behind. Another player can then use that space with a forward run.",
      "These ideas are useful when watching any level of football: look at the players away from the ball, not only the player in possession."
    ],
    image: "https://images.unsplash.com/photo-1695203063441-9042bcecbdf3?auto=format&fit=crop&fm=jpg&q=85&w=1400",
    credit: "Bhong Bahala / Unsplash"
  },
  "what-the-table-does-not-tell-you": {
    category: "DATA ROOM",
    title: "What the league table does not tell you",
    intro: "A league table is the clearest snapshot of a season, but it does not explain every performance behind a club's position.",
    paragraphs: [
      "Points and goal difference describe outcomes. They do not show how often a team creates good chances, how well it controls transitions or whether a run of results was influenced by a difficult schedule.",
      "A useful reading combines the table with match-level information. Goals for and against, home and away records, recent form and player availability add context to the numbers.",
      "Statistics should support observation, not replace it. A high possession share can mean control, but it can also reflect safe passing far from the opponent's goal. The match context matters.",
      "The best analysis combines the scoreline, the performance and the circumstances in which both were produced."
    ],
    image: "https://images.unsplash.com/photo-1781152791898-945ca008c8ef?auto=format&fit=crop&fm=jpg&q=85&w=1400",
    credit: "Maryam Tello / Unsplash"
  },
  "the-rhythm-of-a-matchday": {
    category: "THE GAME",
    title: "The rhythm of a matchday",
    intro: "A match is a sequence of moments that begins well before kick-off and continues long after the final whistle.",
    paragraphs: [
      "Warm-ups offer the first clues about a team's preparation. The passing tempo, activation exercises and final shooting routines help players prepare for the demands of the game.",
      "During the match, the rhythm changes. A team may slow the game to protect possession, press aggressively after losing the ball or use quick restarts to catch an opponent before its shape is restored.",
      "Half-time brings a different kind of detail: substitutions, tactical adjustments and the response after the restart. These changes can alter the balance of a match.",
      "Watching the full sequence provides a richer picture than looking only at highlights or the final result."
    ],
    image: "https://images.unsplash.com/photo-1711812176453-5b70a6f0a984?auto=format&fit=crop&fm=jpg&q=85&w=1400",
    credit: "arh Lee / Unsplash"
  }
};

export function generateStaticParams() { return Object.keys(articles).map((slug) => ({ slug })); }

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) notFound();
  return <PageShell eyebrow={article.category} title={article.title} description={article.intro}>
    <article className="article-detail">
      <img className="article-hero-image" src={article.image} alt="Football scene accompanying the editorial feature" />
      <div className="article-byline"><span>WOW.FUTBOL EDITORIAL</span><span>INDEPENDENT FOOTBALL FEATURE</span></div>
      {article.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      <small className="image-credit">Photography: {article.credit}. Image used under the Unsplash License.</small>
      <a className="section-link article-back" href="/news">← Back to newsroom</a>
    </article>
  </PageShell>;
}
