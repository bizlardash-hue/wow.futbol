import { FixtureExplorer } from "../../components/fixture-explorer";
import { PageShell } from "../../components/page-shell";

export const metadata = { title: "Live Scores", description: "Follow football scores and match events from competitions around the world." };

export default function LivePage() {
  return <PageShell eyebrow="MATCH CENTRE / LIVE" title="The game, as it happens." description="Follow live match states, goals and results. Scores are supplied through the connected football data provider.">
    <FixtureExplorer initialMode="live" />
  </PageShell>;
}
