import { useState } from 'react';

async function handleInput(text: string): Promise<string> {
  const res = await fetch('/api/handle', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  const data = await res.json();
  return data.reply as string;
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
