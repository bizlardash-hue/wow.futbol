# WOW.FUTBOL

An independent, English-language international football platform built with Next.js, React and TypeScript.

## Product sections

- Global live scores, fixtures and results
- Competition directory and season hubs
- Match centres: events, lineups and match statistics
- Club directory, club profiles and squads
- Player profiles, top scorers and assists
- Football statistics and rankings
- Original editorial features and news
- Official-source video embeds
- About, contact, privacy and terms pages

## Stack

- Next.js 16 / React 19 / TypeScript
- API-Football (API-Sports) server-side data proxy
- Cloudflare Workers deployment using OpenNext
- GitHub as the source repository

## Local development

Requirements: Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

For local Cloudflare Worker preview, copy `.dev.vars.example` to `.dev.vars`, enter your own API key, then run:

```bash
npm run preview
```

Never commit `.env`, `.dev.vars`, or real API credentials.

## Football data provider

The server-side route `/api/football` proxies requests to API-Football. The API key must remain a server-side secret named `API_FOOTBALL_KEY`. Do not add it to client-side code, `NEXT_PUBLIC_*` variables, GitHub, public issues or chat messages.

The provider's competition catalogue and available seasons vary by subscription and coverage. Check the API-Football account dashboard and the provider's coverage data before assuming a particular season or competition has full fixtures, standings, lineups or statistics.

### Request-conscious caching

The API proxy uses configurable cache defaults to avoid spending the provider quota on repeated page views:

- Live fixtures: 30 minutes
- Date fixtures: 6 hours
- Standings: 6 hours
- Team directories: 24 hours
- Scorer / assist rankings: 6 hours
- Match details: 30 minutes
- Player profiles and league metadata: 24 hours

These are conservative defaults. Do not shorten them or add frequent automatic refreshes unless the API subscription supports the additional request volume.

## Deploy on Cloudflare Workers

This repository uses the OpenNext Cloudflare adapter. It is a Next.js application, not a static Vite site.

Cloudflare Workers Builds settings:

- Production branch: `main`
- Root directory: `/`
- Build command: `npx opennextjs-cloudflare build`
- Deploy command: `npx opennextjs-cloudflare deploy --keep-vars`

The worker configuration is in `wrangler.jsonc`. The build output in `.open-next` is generated during deployment and must not be committed.

### Add the API secret

In Cloudflare Dashboard:

1. Open **Workers & Pages** and select the `wow-futbol` Worker.
2. Open **Settings → Variables and Secrets** (the label may vary).
3. Add a secret named `API_FOOTBALL_KEY` and paste the newly generated API-Football key as its value.
4. Save and deploy again if Cloudflare requests it.

If using Workers Builds, add the variable to the production runtime environment. Do not expose it as a public variable. The application reads it on the server using `process.env.API_FOOTBALL_KEY`.

### Deploy commands

```bash
npm run deploy
```

For dashboard-based Git deployments, use the separate build and deploy commands above. Keep the Cloudflare runtime secret when deploying new versions.

## Content, media and rights

WOW.FUTBOL is an independent project. The brand and interface are original. Football data is supplied by the configured provider. Video embeds remain hosted by their original publishers. Third-party logos, photographs, player images, competition names and data must be used in accordance with the relevant provider terms and intellectual-property rules.

The privacy policy, terms and contact details are starter content and should be reviewed before a commercial launch.
