import express from 'express';
import { getJoke } from './api/joke';
import { getWeather } from './api/weather';
import { handleInput } from './bot/core/engine';

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.get('/api/joke', async (_, res) => {
  try {
    const joke = await getJoke();
    res.json({ joke });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch joke' });
  }
});

app.get('/api/weather', async (req, res) => {
  const lat = req.query.lat ? Number(req.query.lat) : undefined;
  const lon = req.query.lon ? Number(req.query.lon) : undefined;
  try {
    const weather = await getWeather(lat, lon);
    res.json({ weather });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch weather' });
  }
});

app.post('/api/handle', async (req, res) => {
  const text = req.body?.text;
  if (typeof text !== 'string') {
    res.status(400).json({ error: 'Missing text' });
    return;
  }
  try {
    const reply = await handleInput(text);
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: 'Failed to handle input' });
  }
});

app.use(express.static('my-app/dist'));

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
