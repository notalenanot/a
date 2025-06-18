import fs from 'fs';
import path from 'path';

async function main() {
  const question = process.argv.slice(2).join(' ');
  if (!question) {
    console.error('Usage: agents <question>');
    process.exit(1);
  }
  const slug = question.toLowerCase().replace(/\s+/g, '-');
  const outDir = path.join('apps/agents/generated-apps', slug);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'README.md'), `# App for ${question}`);
  console.log('Generated app at', outDir);
}

main();
