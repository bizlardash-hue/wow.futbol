import { PageShell } from "../../../components/page-shell";
import { EntityDetail } from "../../../components/entity-detail";

export default async function ClubProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PageShell eyebrow="CLUB PROFILE" title="Club details" description="Team identity, venue and competition information from the connected football data provider.">
    <EntityDetail kind="team" id={id} />
  </PageShell>;
}
