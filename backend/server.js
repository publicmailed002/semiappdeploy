import express from 'express';

const app = express();

app.get('/api/server', (req, res) => {
  res.json({ message: 'Server endpoint running locally' });
});

// Keep the hello route for parity with the serverless function
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend on Vercel (local server)' });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend server listening on http://localhost:${port}`);
});
