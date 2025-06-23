import express from 'express';
import { getJoke } from './api/joke';
import { getWeather } from './api/weather';

const app = express();
const port = process.env.PORT || 3000;

app.get('/api/joke', async (_, res) => {
  try {
    const joke = await getJoke();
    res.json({ joke });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch joke';
    res.status(500).json({ error: message });
  }
});

app.get('/api/weather', async (req, res) => {
  const lat = req.query.lat ? Number(req.query.lat) : undefined;
  const lon = req.query.lon ? Number(req.query.lon) : undefined;
  try {
    const weather = await getWeather(lat, lon);
    res.json({ weather });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch weather';
    res.status(500).json({ error: message });
  }
});

app.use(express.static('my-app/dist'));

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
