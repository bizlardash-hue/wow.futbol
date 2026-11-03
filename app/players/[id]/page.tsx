import { PageShell } from "../../../components/page-shell";
import { EntityDetail } from "../../../components/entity-detail";

export default async function PlayerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PageShell eyebrow="PLAYER PROFILE" title="Player details" description="Career information, current team and available season statistics from the connected football data provider.">
    <EntityDetail kind="player" id={id} />
  </PageShell>;
}
