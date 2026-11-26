import { PageShell } from "../../components/page-shell";
import { CompetitionDirectory } from "../../components/competition-directory";

export const metadata = {
  title: "Global Football Competitions",
  description: "Explore leagues, cups and international football competitions from around the world.",
};

export default function CompetitionsPage() {
  return (
    <PageShell
      eyebrow="THE GLOBAL GAME"
      title="Every competition. One football world."
      description="Explore domestic leagues, continental cups and international tournaments. Choose a competition to open its fixtures, standings and season hub."
    >
      <CompetitionDirectory />
    </PageShell>
  );
}
