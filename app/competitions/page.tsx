import { PageShell } from "../../components/page-shell";

const competitions = [
  { slug: "premier-league", name: "Premier League", country: "England", tag: "DOMESTIC LEAGUE", code: "PL", image: "https://images.unsplash.com/photo-1781152791898-945ca008c8ef?auto=format&fit=crop&fm=jpg&q=82&w=1000", credit: "Maryam Tello / Unsplash" },
  { slug: "laliga", name: "LaLiga", country: "Spain", tag: "DOMESTIC LEAGUE", code: "LL", image: "https://images.unsplash.com/photo-1545525201-e1a5a2a18293?auto=format&fit=crop&fm=jpg&q=82&w=1000", credit: "Tobias / Unsplash" },
  { slug: "serie-a", name: "Serie A", country: "Italy", tag: "DOMESTIC LEAGUE", code: "SA", image: "https://images.unsplash.com/photo-1695203063441-9042bcecbdf3?auto=format&fit=crop&fm=jpg&q=82&w=1000", credit: "Bhong Bahala / Unsplash" },
  { slug: "bundesliga", name: "Bundesliga", country: "Germany", tag: "DOMESTIC LEAGUE", code: "BL", image: "https://images.unsplash.com/photo-1711812176453-5b70a6f0a984?auto=format&fit=crop&fm=jpg&q=82&w=1000", credit: "arh Lee / Unsplash" },
  { slug: "ligue-1", name: "Ligue 1", country: "France", tag: "DOMESTIC LEAGUE", code: "L1", image: "https://images.unsplash.com/photo-1711812176441-59f8414cf8f6?auto=format&fit=crop&fm=jpg&q=82&w=1000", credit: "arh Lee / Unsplash" },
  { slug: "champions-league", name: "Champions League", country: "Europe", tag: "CONTINENTAL CUP", code: "UCL", image: "https://images.unsplash.com/photo-1629217855633-79a6925d6c47?auto=format&fit=crop&fm=jpg&q=82&w=1000", credit: "Unsplash contributor" },
];

export default function CompetitionsPage() {
  return <PageShell eyebrow="THE BIG STAGES" title="Choose your competition." description="Competition hubs bring together fixtures, results, tables, clubs, scorers and the stories around each season.">
    <div className="competition-directory">
      {competitions.map((item) => <a className="competition-tile" href={`/competitions/${item.slug}`} key={item.slug}>
        <img src={item.image} alt={`${item.name} football atmosphere`} loading="lazy" />
        <span className="competition-tile-shade" />
        <span className="competition-tile-code">{item.code}</span>
        <span className="competition-tile-copy"><small>{item.country} · {item.tag}</small><strong>{item.name}</strong><span>View competition ↗</span></span>
      </a>)}
    </div>
    <p className="image-credit">Photography: Unsplash contributors. Images are used under the Unsplash License; see the linked photographer credits in the image sources.</p>
  </PageShell>;
}
