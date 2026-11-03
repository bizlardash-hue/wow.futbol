import { MatchDetail } from "../../../components/match-detail";
import { PageShell } from "../../../components/page-shell";

export default async function MatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PageShell eyebrow="MATCH CENTRE / FIXTURE" title="Inside the match." description="Scoreline, match events, team statistics and lineups in one dedicated match page.">
    <MatchDetail id={id} />
  </PageShell>;
}
