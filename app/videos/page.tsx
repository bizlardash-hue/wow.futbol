import { PageShell } from "../../components/page-shell";

export const metadata = { title: "Videos", description: "Watch official football highlights and video features." };

export default function VideosPage() {
  return <PageShell eyebrow="WATCH & DISCOVER" title="The moments, in motion." description="A curated video area featuring embedded clips from official competition channels. Videos remain hosted by their publishers.">
    <div className="video-feature">
      <div className="video-frame"><iframe src="https://www.youtube-nocookie.com/embed/DLOUfAVwuXA" title="Official UEFA Champions League matchday goal highlights" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div>
      <div className="video-copy"><span className="story-category">OFFICIAL UEFA VIDEO</span><h2>Champions League goal highlights</h2><p>A goals compilation published by the verified UEFA channel. Availability and playback may vary by region.</p><a href="https://www.youtube.com/watch?v=DLOUfAVwuXA" target="_blank" rel="noreferrer">Watch on YouTube ↗</a></div>
    </div>
    <div className="video-secondary">
      <div><span className="eyebrow dark-eyebrow">MORE FROM THE RIGHTS HOLDERS</span><h2>Official football channels</h2></div>
      <a href="https://www.youtube.com/@UEFA" target="_blank" rel="noreferrer">UEFA <span>↗</span></a>
      <a href="https://www.youtube.com/@premierleague" target="_blank" rel="noreferrer">Premier League <span>↗</span></a>
      <a href="https://www.youtube.com/@FIFA" target="_blank" rel="noreferrer">FIFA <span>↗</span></a>
    </div>
  </PageShell>;
}
