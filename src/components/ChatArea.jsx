import { useEffect, useRef } from 'react';
import Message from '../components/Message';
import ChatInput from '../components/ChatInput';
import TopicSelector from '../components/TopicSelector';

export default function ChatArea({ currentChat, isStreaming, onSendMessage }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChat?.messages]);

  if (!currentChat) {
    return <TopicSelector onSelectTopic={onSendMessage} />;
  }

  return (
    <div className="flex-1 flex flex-col ">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto">
          {currentChat.messages.map((msg, idx) => (
            <Message key={idx} message={msg} />
          ))}
          {isStreaming && (
            <div className="flex justify-start mb-4">
              <div className="bg-[##1F3E6A] text-white px-4 py-3 rounded-lg">
                <div className="flex gap-1">
                  <span className="animate-bounce">●</span>
                  <span className="animate-bounce delay-100">●</span>
                  <span className="animate-bounce delay-200">●</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <ChatInput onSend={onSendMessage} disabled={isStreaming} />
    </div>
  );
}
