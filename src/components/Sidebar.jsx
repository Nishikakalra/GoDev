export default function Sidebar({ chats, activeChat, onNewChat, onSwitchChat, onDeleteChat, onShowAnalytics }) {
  return (
    <div className="py-6 px-6">
       <div className="w-68 bg-[#FFFFFf]/30 border-r border-white/60 flex flex-col h-full  rounded-lg">
      <div className="p-4 border-b border-white/50 space-y-4">
        <button
          onClick={onNewChat}
          className="w-full bg-[#1F3E6A] text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition"
        >
          <span>New Chat</span>
        </button>
        <button
          onClick={onShowAnalytics}
          className="w-full bg-[#F6D4CC]/80 text-[#1F3E6A] py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition"
        >
          <span>📊</span>
          <span>Analytics</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {chats.map(chat => (
          <div
            key={chat.id}
            onClick={() => onSwitchChat(chat.id)}
            className={`p-2.5 mx-4 my-4 rounded-lg text-sm cursor-pointer transition group relative ${
              activeChat === chat.id
                ? 'bg-[#1F3E6A] text-white'
                : 'text-gray-400 bg-[#1F3E6A]'
            }`}
          >
            <div className="truncate pr-6">{chat.title}</div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteChat(chat.id);
              }}
              className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 text-white transition"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-white/60 text-gray-600 text-sm">
        <div className="font-semibold text-[#1F3E6A] mb-1">Dev Interview Assistant</div>
        <div className="text-xs">DSA • JavaScript • React</div>
      </div>
    </div>
    </div>
   
  );
}
