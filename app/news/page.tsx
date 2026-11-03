import { PageShell } from "../../components/page-shell";

const articles = [
  { slug: "how-to-read-a-midfield", category: "TACTICAL NOTEBOOK", title: "How to read the space in midfield", excerpt: "A guide to the passing lanes, rotations and small decisions that shape control of a match.", image: "https://images.unsplash.com/photo-1695203063441-9042bcecbdf3?auto=format&fit=crop&fm=jpg&q=82&w=1200", credit: "Bhong Bahala / Unsplash", time: "6 MIN READ" },
  { slug: "what-the-table-does-not-tell-you", category: "DATA ROOM", title: "What the league table does not tell you", excerpt: "Points tell one part of the story. Goal difference, chance creation and consistency add context.", image: "https://images.unsplash.com/photo-1781152791898-945ca008c8ef?auto=format&fit=crop&fm=jpg&q=82&w=1200", credit: "Maryam Tello / Unsplash", time: "5 MIN READ" },
  { slug: "the-rhythm-of-a-matchday", category: "THE GAME", title: "The rhythm of a matchday", excerpt: "From warm-ups to the final whistle, explore the details that make a football occasion.", image: "https://images.unsplash.com/photo-1711812176453-5b70a6f0a984?auto=format&fit=crop&fm=jpg&q=82&w=1200", credit: "arh Lee / Unsplash", time: "4 MIN READ" },
];

export default function NewsPage() {
  return <PageShell eyebrow="THE NEWSROOM" title="Stories beyond the score." description="Original explainers, tactical features and data-led football reading. This initial edition is evergreen editorial content, not breaking-news reporting.">
    <div className="news-feature-grid">
      {articles.map((article, index) => <article className={`news-card ${index === 0 ? "news-card-featured" : ""}`} key={article.slug}>
        <a href={`/news/${article.slug}`} className="news-image"><img src={article.image} alt="Football scene" loading="lazy" /><span>{article.category}</span></a>
        <div className="news-card-copy"><small>{article.time}</small><h2><a href={`/news/${article.slug}`}>{article.title}</a></h2><p>{article.excerpt}</p><a className="section-link" href={`/news/${article.slug}`}>Read feature ↗</a><span className="image-credit">Image: {article.credit}</span></div>
      </article>)}
    </div>
  </PageShell>;
}
