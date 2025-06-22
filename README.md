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
docs/
examples/
.github/
  workflows/
```

The backend exposes two endpoints under `/api` which return a random joke and
current weather information.  The React application located in `my-app/`
includes a simple chat UI that calls these endpoints.

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

Run `npm run build` to compile the backend to `dist/`.

### Running tests

Unit tests are written with Jest. Install dependencies and run:

```bash
npm test
```
