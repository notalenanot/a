import { useState } from 'react';
async function handleInput(input: string): Promise<string> {
  const text = input.toLowerCase();

  if (text.includes('weather')) {
    const res = await fetch('/api/weather');
    const data = await res.json();
    return data.weather as string;
  }

  if (text.includes('joke')) {
    const res = await fetch('/api/joke');
    const data = await res.json();
    return data.joke as string;
  }

  if (text.includes('uber')) {
    return 'Requesting a ride via Uber...';
  }

  return "Sorry I can't do that right now.";
}

interface Message {
  from: 'user' | 'bot';
  text: string;
}

export function Chat() {
  const [history, setHistory] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  async function send() {
    if (!input.trim()) return;
    const userMessage: Message = { from: 'user', text: input };
    setHistory(h => [...h, userMessage]);
    setInput('');

    const replyText = await handleInput(input);
    const botMessage: Message = { from: 'bot', text: replyText };
    setHistory(h => [...h, botMessage]);
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="space-y-2 mb-4">
        {history.map((m, i) => (
          <div key={i} className={m.from === 'bot' ? 'text-blue-600' : ''}>
            <strong>{m.from === 'bot' ? 'Bot' : 'You'}:</strong> {m.text}
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          className="flex-1 border rounded p-2"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={send}>
          Send
        </button>
      </div>
    </div>
  );
}
