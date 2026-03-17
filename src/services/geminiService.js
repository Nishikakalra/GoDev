const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:streamGenerateContent?alt=sse';

const SYSTEM_PROMPT = `You are an expert Developer Interview Assistant specializing in:
- Data Structures and Algorithms (DSA)
- JavaScript deep concepts and internals
- React fundamentals and advanced patterns
- Code explanation, debugging, and optimization

Provide clear, concise explanations with code examples when relevant. Focus on interview-ready answers.`;

export async function* streamChatResponse(messages) {
  const formattedMessages = messages.map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));

  formattedMessages.unshift({
    role: 'user',
    parts: [{ text: SYSTEM_PROMPT }]
  });

  const response = await fetch(`${API_URL}&key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: formattedMessages,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      }
    })
  });

  if (!response.ok) throw new Error('API request failed');

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        try {
          const data = JSON.parse(line.slice(6));
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) yield text;
        } catch (e) {
          // Skip parse errors
        }
      }
    }
  }
}

export function generateChatTitle(message) {
  return message.slice(0, 50) + (message.length > 50 ? '...' : '');
}

