import axios from 'axios';
import fs from 'fs';

async function main() {
  const path = process.argv[2];
  if (!path) {
    console.error('Usage: ingest <file>');
    process.exit(1);
  }
  const text = fs.readFileSync(path, 'utf8');
  await axios.post('http://localhost:4000/ingest', { text });
  console.log('Ingested', path);
}

main();
