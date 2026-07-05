import { useState } from 'react';
import { useChat } from '../hooks/useChat';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import ChatArea from '../components/ChatArea';
import Analytics from '../components/Analytics';

export default function Home() {
  const { user } = useAuth();
  const {
    chats,
    currentChat,
    activeChat,
    isStreaming,
    createNewChat,
    sendMessage,
    switchChat,
    deleteChat
  } = useChat(user?.id);

  const [showAnalytics, setShowAnalytics] = useState(false);

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#1E406D] via-[#A395AC] to-[#FFDBD0]">
      <Sidebar
        chats={chats}
        activeChat={activeChat}
        onNewChat={createNewChat}
        onSwitchChat={switchChat}
        onDeleteChat={deleteChat}
        onShowAnalytics={() => setShowAnalytics(true)}
      />
      <ChatArea
        currentChat={currentChat}
        isStreaming={isStreaming}
        onSendMessage={sendMessage}
      />
      {showAnalytics && (
        <Analytics
          chats={chats}
          onClose={() => setShowAnalytics(false)}
        />
      )}
    </div>
  );
}
