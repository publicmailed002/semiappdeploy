# Backend (Vercel serverless functions)

This folder contains minimal serverless functions to deploy on Vercel.

- `api/hello.js` — example HTTP function. Deploying this repository to Vercel exposes it at `/api/hello`.

Local testing:
- Install the Vercel CLI: `npm i -g vercel`
- Run `vercel dev` from the repository root to emulate Vercel locally.

Local server (optional):
- `server.js` is a minimal Express server for local testing. To run it:
  1. `cd backend`
  2. `npm install` (installs `express`)
  3. `npm start` (starts on `PORT` or `3001`)
  The endpoint `/api/server` will return a JSON message.

Notes:
- Add any environment variables in the Vercel dashboard (do not store secrets in the repo).
- Add additional functions in `backend/api/` (each file becomes an endpoint).
