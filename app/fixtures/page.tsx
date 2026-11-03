import { FixtureExplorer } from "../../components/fixture-explorer";
import { PageShell } from "../../components/page-shell";

export const metadata = { title: "Fixtures & Results", description: "Browse football fixtures, kickoff times and completed results." };

export default function FixturesPage() {
  return <PageShell eyebrow="MATCH CENTRE / CALENDAR" title="Every date has a story." description="Choose a day to explore scheduled matches, completed results and match details across the competitions we cover.">
    <FixtureExplorer />
  </PageShell>;
}
