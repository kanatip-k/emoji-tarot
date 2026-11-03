# Emoji Tarot

A TypeScript learning project with a React frontend and an Express API for emoji-based tarot cards.

## Features and overview

The source layout and existing documentation describe card listing, random selection, and create/update/delete operations with in-memory storage. The original README identifies the project as a TypeScript API workshop. The local Git remote identifies [wu-web-camp/emoji-tarot](https://github.com/wu-web-camp/emoji-tarot) as the upstream source. The project owner has confirmed rights to their work; retain upstream attribution and distinguish personal modifications when describing contributions.

## Tech stack and structure

- `client/`: React 18, React Router, Vite 6, TypeScript
- `server/`: Express 4, CORS, UUID, TypeScript, tsx
- Root scripts use concurrently to run both services.
- Server build and start scripts use Bun.

## Requirements and installation

Install Node.js/npm compatible with the checked-in dependency locks. Install Bun to use the existing server build/start scripts. Exact runtime versions are not pinned and have not been tested during migration.

```sh
npm ci
npm --prefix server ci
npm --prefix client ci
```

## Running and checks

```sh
npm run dev
npm run typecheck
npm run build
```

The last command requires Bun for the server step. The inspected server defaults to port 3001; Vite defaults to port 5173 and proxies `/api` to the server. Existing documentation lists `/api/cards`, `/api/cards/random`, and `/api/cards/:id` routes.

Migration verification: TypeScript checks passed for both client and server; the client production build passed. An isolated server smoke test passed GET `/api/health`, `/api/cards`, and `/api/cards/random`, then the temporary server was stopped. The Bun server production build and the complete existing test suite were not run.

## Status and limitations

Educational prototype; runtime verification pending. Card data is held in memory and does not provide durable storage. Review the migration hold list before execution. This copy excludes dependencies, generated output, and Git metadata; the original history remains unchanged. Existing tests and workshop notes are evidence to review, not proof of passing validation.

## Screenshots, contributions and license

No verified screenshots or live demo are included. Confirm your workshop contributions and redistribution rights before publishing. No new license is assigned.
