Vercel deployment notes

- Set the following Environment Variables in the Vercel project settings:
  - MONGO_URI
  - CLIENT_URL (frontend origin)
  - JWT_SECRET (or your auth secret name)
  - RESEND_API_KEY (if you use Resend)
  - CLOUDINARY_URL / CLOUDINARY_* (if applicable)
  - Any other env variables referenced in `backend/src/lib/env.js`

- The API is served by `backend/api/index.js` which wraps the Express `app` in `serverless-http`.

Socket / WebSockets note ⚠️
- This project uses Socket.IO for real-time features. Vercel serverless does NOT support long-lived WebSocket servers reliably.
- Recommended approaches:
  - Deploy the Socket.IO server on a separate host that supports WebSockets (Render, Railway, Fly, Heroku, or a small VPS) and point the frontend `SOCKET_URL` to that host.
  - Or use a managed realtime service (Pusher, Ably) and update frontend/backend to use it.

Local dev
- Use `npm run dev` in the `backend` folder (this currently runs `vercel dev --listen 3001`) to test locally with vercel dev.

If you want, I can also add a small `deploy.md` with exact Vercel steps and sample env var values. 
