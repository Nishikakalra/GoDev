import ReactMarkdown from 'react-markdown';

export default function Message({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
      <div
        className={`max-w-3xl px-4 py-3 rounded-md ${
          isUser
            ? 'bg-[#1F3E6A]/30 text-white'
            : 'bg-[#FFFFFF]/20  text-[#1F3E6A]/90 '
        }`}
      >
        <div className="text-xs font-semibold mb-2 opacity-70">
          {isUser ? 'You' : 'Assistant'}
        </div>
        {isUser ? (
          <div className="whitespace-pre-wrap break-words">{message.content}</div>
        ) : (
          <div className="markdown-content">
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h1 className="text-2xl font-bold mb-3 mt-4 text-[#E89B9C] border-b border-white/60 pb-2">{children}</h1>,
                h2: ({ children }) => <h2 className="text-xl font-bold mb-2 mt-3 text-[#E89B9C]">{children}</h2>,
                h3: ({ children }) => <h3 className="text-lg font-semibold mb-2 mt-2 text-[#1F3E6A]">{children}</h3>,
                p: ({ children }) => <p className="mb-3 leading-relaxed">{children}</p>,
                ul: ({ children }) => <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal list-inside mb-3 space-y-1">{children}</ol>,
                li: ({ children }) => <li className="ml-2">{children}</li>,
                code: ({ inline, children }) => 
                  inline ? (
                    <code className="bg-[#1F3E6A]  px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
                  ) : (
                    <code className="block bg-[#1F3E6A] text-[#E89B9C] p-3 rounded my-2 overflow-x-auto font-mono text-sm border border-gray-700">{children}</code>
                  ),
                pre: ({ children }) => <pre className="bg-[#1F3E6A] rounded my-2 overflow-x-auto border border-gray-700">{children}</pre>,
                strong: ({ children }) => <strong className="font-bold text-[#1F3E6A]/90">{children}</strong>,
                em: ({ children }) => <em className="italic text-gray-300">{children}</em>,
                blockquote: ({ children }) => <blockquote className="border-l-4 border-blue-500 pl-4 italic my-3 text-gray-400">{children}</blockquote>,
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
