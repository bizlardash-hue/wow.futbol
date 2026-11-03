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

## Free-plan football data connection

The API-Football Free plan is advertised as 100 requests per day and 10 requests per minute. The daily quota resets at 00:00 UTC and unused requests do not roll over. The provider also limits the seasons available on the Free plan. Its October 26, 2026 guide identifies the currently available Free-plan seasons as 2022, 2023 and 2024. Check your own dashboard and the coverage endpoint before relying on a competition/season.

1. In the API-Football dashboard, open Account → My Access and copy your API key.
2. In Vercel, open this project → Settings → Environment Variables.
3. Add `API_FOOTBALL_KEY` with the key value for Preview and Production.
4. Redeploy the project. Do not paste the key into GitHub, frontend code, public issues or this chat.

### Quota-aware caching

The app uses different server-side cache defaults so repeated page views share provider responses:

- Live fixtures: 30 minutes
- Date fixtures: 6 hours
- Standings: 6 hours
- Team directories: 24 hours
- Scorer / assist rankings: 6 hours
- Match details: 30 minutes
- Player profiles and league metadata: 24 hours

The live page refreshes every 30 minutes on the Free-plan setting. This is a prototype-friendly compromise, not second-by-second live coverage. The fixture page displays the daily quota remaining when the provider returns its rate-limit headers.

You may override cache values in Vercel using the corresponding names in `.env.example`. Avoid shortening the live cache or enabling frequent widget refreshes on a 100-request/day plan. The provider's widgets also use your API quota when they make data requests; add caching if you choose to use them.

The server-side proxy keeps the API key out of browser JavaScript. Keep this approach rather than placing the key in a widget's public configuration.

## Season note

The Free plan has a restricted season range. The league tables, team directory, rankings and profile lookups are currently pointed to archive season 2024 so they can be tested against the provider's published Free-plan season range. That is not the current 2026/27 season. Check the account dashboard's season access before changing the default. The live-score endpoint may have separate availability; verify it in the provider's Live Tester and the WOW.FUTBOL match centre.

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

Photographs are sourced from Unsplash and credited on the relevant pages. Football data is supplied by the configured provider. The operator must ensure any use of third-party logos, photographs, player images, competition names and data complies with applicable provider terms and intellectual-property rules.

The privacy policy, terms and contact details are starter drafts and must be reviewed and completed before the website is treated as a fully launched commercial service.
