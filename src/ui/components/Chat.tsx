import React, { useState } from 'react';

interface Message {
  text: string;
  from: 'user' | 'bot';
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input.trim(), from: 'user' }]);
    setInput('');
  };

  return (
    <div className="p-4 w-full max-w-md mx-auto">
      <div className="space-y-2 mb-4">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`px-4 py-2 rounded-lg text-white max-w-xs ${m.from === 'user' ? 'bg-blue-500 ml-auto' : 'bg-gray-500'}`}
          >
            {m.text}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          className="flex-1 border rounded-l px-2 py-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage();
          }}
        />
        <button
          className="bg-blue-500 text-white px-3 rounded-r"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
