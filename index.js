const Fastify = require('fastify');
const app = Fastify({ logger: true });

const users = new Map();
const posts = [];
const proposals = [];

app.get('/', async (request, reply) => {
  return { message: 'AgoraNet prototype - Fastify' };
});

app.post('/register', async (request, reply) => {
  const { username, password } = request.body || {};
  if (!username || !password) {
    reply.code(400); return { error: 'username and password required' };
  }
  if (users.has(username)) {
    reply.code(400); return { error: 'username already exists' };
  }
  users.set(username, { password });
  return { status: 'registered' };
});

app.post('/login', async (request, reply) => {
  const { username, password } = request.body || {};
  const user = users.get(username);
  if (!user || user.password !== password) {
    reply.code(401); return { error: 'invalid credentials' };
  }
  return { status: 'logged_in' };
});

app.route({
  method: ['GET', 'POST'],
  url: '/posts',
  handler: async (request, reply) => {
    if (request.method === 'POST') {
      const { author, content } = request.body || {};
      if (!author || !content) {
        reply.code(400); return { error: 'author and content required' };
      }
      const post = { id: posts.length + 1, author, content };
      posts.push(post);
      reply.code(201);
      return post;
    }
    return posts;
  }
});

app.route({
  method: ['GET', 'PUT', 'DELETE'],
  url: '/posts/:id',
  handler: async (request, reply) => {
    const id = parseInt(request.params.id, 10);
    const post = posts.find(p => p.id === id);
    if (!post) {
      reply.code(404); return { error: 'not found' };
    }
    if (request.method === 'GET') {
      return post;
    } else if (request.method === 'PUT') {
      const { content } = request.body || {};
      if (content) post.content = content;
      return post;
    } else if (request.method === 'DELETE') {
      const index = posts.indexOf(post);
      posts.splice(index, 1);
      reply.code(204); return null;
    }
  }
});

app.route({
  method: ['GET', 'POST'],
  url: '/proposals',
  handler: async (request, reply) => {
    if (request.method === 'POST') {
      const { title, description } = request.body || {};
      if (!title) {
        reply.code(400); return { error: 'title required' };
      }
      const proposal = { id: proposals.length + 1, title, description };
      proposals.push(proposal);
      reply.code(201);
      return proposal;
    }
    return proposals;
  }
});

const start = async () => {
  try {
    await app.listen({ port: 3000, host: '0.0.0.0' });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

if (require.main === module) {
  start();
}

module.exports = app;
