// Vercel-compatible serverless handler
// GET /api/server
export default function handler(req, res) {
  res.status(200).json({ message: 'Server endpoint running on Vercel' });
}
