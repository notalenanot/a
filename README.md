# Project a

This repository provides a small full‑stack example using a TypeScript Express
backend and a React + Vite frontend.  The directories are organised by
responsibility:

```
src/
  bot/
    core/
    flows/
    nlp/
  ui/
    components/
    themes/
  api/
public/
examples/
.github/
  workflows/
```

The backend exposes several endpoints under `/api`:

- `/api/joke` returns a random joke.
- `/api/weather` returns current weather information.
- `/api/foia` generates a FOIA request letter when provided request details.

The React application located in `my-app/` includes a simple chat UI that calls these endpoints.

Additional capabilities include:
- Voice input and output powered by the Web Speech API.
- Basic multi-language support via a small i18n dictionary.
- Embedding-based search with cosine similarity.


## Network access

The `/api/joke` and `/api/weather` routes fetch data from external APIs. If
the server cannot reach the internet these requests will fail and the endpoints
will return an error.

## Development

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

In a separate terminal build and serve the React frontend:

```bash
cd my-app
pnpm install
pnpm dev
```
The Vite development server proxies requests starting with `/api` to
`http://localhost:3000`, so make sure the backend is running with
`npm run dev` in another terminal.

Run `npm run build` to compile the backend to `dist/`.

## Examples

A simple p5.js demo is available in `examples/p5-spiral`. Open `index.html` in a web browser to see the animated spiral.

## License

This project is released under the [MIT License](LICENSE).

## RL Scheduler PoC

A lightweight Python 3.11 micro-service lives under `src/green_ai/`. It exposes a
FastAPI app with two endpoints:

- `POST /step` – performs one reinforcement-learning step using rack telemetry
  from Prometheus.
- `GET /metrics` – Prometheus-scrapable metrics for Grafana dashboards.

### Running locally

```bash
poetry install
uvicorn src.green_ai.service:app --reload
```

Synthetic load simulation:

```bash
make simulate
```
