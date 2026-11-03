# WOW.FUTBOL

An independent international football platform built with Next.js.

## Website sections

- Homepage and global navigation
- Live scores and date-based fixtures
- Competition directories and competition pages
- Match centres with events, lineups and match statistics
- Club directory and club profiles
- Player rankings and player profiles
- Original editorial features and article pages
- Official-source video embeds
- Statistics and rankings
- About, contact, privacy and terms pages

## Technology

- Next.js 16.4.4
- React 19
- TypeScript
- Responsive CSS
- Vercel deployment
- API-Football / API-Sports data proxy

## Run locally

Requirements: Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Football data connection

The site requests football data on the server using the API-Football service. The API key is never exposed in browser code.

1. Create an API-Football account under the provider's terms.
2. Copy the API key from the provider dashboard.
3. In Vercel, open the project → Settings → Environment Variables.
4. Add `API_FOOTBALL_KEY` with the key value for Preview and Production.
5. Redeploy the project.

Optional environment setting:

- `API_CACHE_SECONDS=900` — shared server cache duration in seconds. The default is 900 seconds to reduce provider requests. The live page refreshes on the same interval.
- If the account has enough request allowance for more frequent refreshes, the cache interval can be reduced in Vercel. Check the provider's current quota first.

Do not put real API keys in source code, README files, issues or public commits.

## Deploy on Vercel

1. Sign in to Vercel.
2. Select **Add New → Project**.
3. Import `bizlardash-hue/wow.futbol` from GitHub.
4. Keep the detected Next.js framework preset and default root directory.
5. Deploy.
6. Add `wow.futbol` under Project Settings → Domains and follow the DNS instructions Vercel displays.

GitHub Actions runs a production build check for pushes to `main`.

## Content, media and rights

WOW.FUTBOL is an independent project. The interface and brand are original. Editorial articles are written for this project. The videos page embeds video published by official competition channels; video remains hosted by the original publisher.

Photographs are sourced from Unsplash and credited on the relevant pages. Football data is supplied by the configured provider. The operator must ensure any use of third-party logos, photographs, player images, competition names and data complies with the applicable provider terms and intellectual-property rules.

The privacy policy, terms and contact details are starter drafts and must be reviewed and completed before the website is treated as a fully launched commercial service.
