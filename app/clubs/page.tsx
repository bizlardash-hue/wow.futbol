import { FootballDataPanel } from "../../components/football-data-panel";
import { PageShell } from "../../components/page-shell";

export const metadata = { title: "Clubs", description: "Explore club profiles, squads and team information." };

export default function ClubsPage() {
  return <PageShell eyebrow="CLUB DIRECTORY" title="The clubs behind the game." description="Explore club identities, grounds and squads. The team directory below is loaded from the connected football data provider.">
    <div className="directory-toolbar"><span>STARTING DIRECTORY</span><span>PREMIER LEAGUE · SEASON 2026</span></div>
    <FootballDataPanel mode="teams" league={39} season={2026} />
    <div className="directory-note">This first directory is filtered to the English Premier League. Competition-specific club lists are available from each competition page.</div>
  </PageShell>;
}
