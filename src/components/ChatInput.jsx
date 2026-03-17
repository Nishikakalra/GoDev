import { useState } from 'react';

export default function ChatInput({ onSend, disabled }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-white/50 p-4 ">
      <div className="max-w-4xl mx-auto flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about DSA, JavaScript, React..."
          disabled={disabled}
          className="flex-1 bg-[#1F3E6A]/80 text-white px-4 py-3 rounded-lg focus:outline-none "
        />
        <button
          type="submit"
          disabled={disabled || !input.trim()}
          className="bg-[#1F3E6A] text-white px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Send
        </button>
      </div>
    </form>
  );
}
