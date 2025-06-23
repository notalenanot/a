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
The Vite development server proxies requests starting with `/api` to
`http://localhost:3000`, so make sure the backend is running with
`npm run dev` in another terminal.

Run `npm run build` to compile the backend to `dist/`.

## Examples

A simple p5.js demo is available in `examples/p5-spiral`. Open `index.html` in a web browser to see the animated spiral.
