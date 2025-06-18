# Living Library Engine

This monorepo hosts the MVP implementation of the **Living Library**. It contains
multiple packages managed with `pnpm` workspaces and is designed to run via
Docker Compose.

## Quick start

```bash
pnpm install
docker compose up
```

Services:
- **Neo4j**: http://localhost:7474
- **Qdrant**: http://localhost:6333
- **API**: http://localhost:4000
- **Web**: http://localhost:5173

Further documentation is in each package directory.
