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

### Notes CLI

You can keep quick text notes directly from the command line:

```bash
# add a note with optional tags
npm run note -- add "Investigate async support" --tags dev,todo

# list all notes (or only those with matching tags)
npm run note -- list --tags todo

# search notes by text and optional tags
npm run note -- search "investigate" --tags dev
```

## Examples

A simple p5.js demo is available in `examples/p5-spiral`. Open `index.html` in a web browser to see the animated spiral.
