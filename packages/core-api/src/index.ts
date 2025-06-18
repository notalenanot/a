import Fastify from 'fastify';
import mercurius from 'mercurius';
import { driver as Neo4jDriver } from 'neo4j-driver';
import { QdrantClient } from '@qdrant/js-client-rest';

const app = Fastify();

// Simple GraphQL schema
const schema = `
  type Content { id: ID! text: String }
  type Query { hello: String }
`;

const resolvers = {
  Query: {
    hello: () => 'world',
  },
};

app.register(mercurius, {
  schema,
  resolvers,
  graphiql: true,
});

app.get('/ingest', async (req, reply) => {
  // Placeholder ingest endpoint
  return { status: 'ok' };
});

export async function start() {
  await app.listen({ port: 4000, host: '0.0.0.0' });
}

if (process.env.NODE_ENV !== 'test') {
  start();
}
