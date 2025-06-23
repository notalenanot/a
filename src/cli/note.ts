import fs from 'fs';
import path from 'path';

interface Note {
  time: string;
  text: string;
  tags?: string[];
}

const notesPath = path.resolve(__dirname, '../../notes.json');

function loadNotes(): Note[] {
  if (!fs.existsSync(notesPath)) return [];
  const raw = fs.readFileSync(notesPath, 'utf8');
  try {
    return JSON.parse(raw) as Note[];
  } catch {
    return [];
  }
}

function saveNotes(notes: Note[]) {
  fs.writeFileSync(notesPath, JSON.stringify(notes, null, 2));
}

function list(notes: Note[], tags: string[] = []) {
  if (!notes.length) {
    console.log('No notes yet.');
    return;
  }
  const filtered = tags.length
    ? notes.filter(n => n.tags?.some(t => tags.includes(t)))
    : notes;
  for (const n of filtered) {
    const tagStr = n.tags && n.tags.length ? ` [${n.tags.join(',')}]` : '';
    console.log(`${n.time} - ${n.text}${tagStr}`);
  }
}

function add(text: string, tags: string[] = []) {
  const notes = loadNotes();
  notes.push({ time: new Date().toISOString(), text, tags });
  saveNotes(notes);
  console.log('Note saved.');
}

function search(term: string, tags: string[] = []) {
  const notes = loadNotes();
  const lower = term.toLowerCase();
  const matches = notes.filter(n => n.text.toLowerCase().includes(lower));
  list(matches, tags);
}

function parseTags(args: string[]): string[] {
  const idx = args.indexOf('--tags');
  if (idx === -1) return [];
  const tagArg = args[idx + 1] || '';
  args.splice(idx, 2);
  return tagArg.split(',').map(t => t.trim()).filter(Boolean);
}

const [,, command, ...rest] = process.argv;

switch (command) {
  case 'add': {
    const tags = parseTags(rest);
    const text = rest.join(' ').trim();
    if (!text) {
      console.error('Usage: note add <text> [--tags tag1,tag2]');
      process.exit(1);
    }
    add(text, tags);
    break;
  }
  case 'list': {
    const tags = parseTags(rest);
    list(loadNotes(), tags);
    break;
  }
  case 'search': {
    const tags = parseTags(rest);
    const term = rest.join(' ').trim();
    if (!term) {
      console.error('Usage: note search <term> [--tags tag1,tag2]');
      process.exit(1);
    }
    search(term, tags);
    break;
  }
  default:
    console.log('Usage: note <add|list|search> [text] [--tags t1,t2]');
}
