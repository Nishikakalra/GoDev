import { useState, useEffect, useCallback } from 'react';
import { streamChatResponse, generateChatTitle } from '../services/geminiService';

const STORAGE_KEY = 'dev_interview_chats';

export function useChat() {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      setChats(parsed);
      if (parsed.length > 0) setActiveChat(parsed[0].id);
    }
  }, []);

  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
    }
  }, [chats]);

  const createNewChat = useCallback(() => {
    const newChat = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date().toISOString()
    };
    setChats(prev => [newChat, ...prev]);
    setActiveChat(newChat.id);
  }, []);

  const sendMessage = useCallback(async (content) => {
    if (!isStreaming) {
      // Create new chat if none exists
      if (!activeChat) {
        const newChat = {
          id: Date.now().toString(),
          title: 'New Chat',
          messages: [],
          createdAt: new Date().toISOString()
        };
        setChats(prev => [newChat, ...prev]);
        setActiveChat(newChat.id);
        
        // Wait for state update
        setTimeout(() => {
          sendMessageToChat(newChat.id, content);
        }, 0);
        return;
      }
      
      sendMessageToChat(activeChat, content);
    }
  }, [activeChat, isStreaming]);

  const sendMessageToChat = async (chatId, content) => {
    const userMessage = { role: 'user', content, timestamp: Date.now() };
    
    setChats(prev => prev.map(chat => {
      if (chat.id === chatId) {
        const updatedMessages = [...chat.messages, userMessage];
        const title = chat.messages.length === 0 ? generateChatTitle(content) : chat.title;
        return { ...chat, messages: updatedMessages, title };
      }
      return chat;
    }));

    setIsStreaming(true);
    const assistantMessage = { role: 'assistant', content: '', timestamp: Date.now() };
    
    setChats(prev => prev.map(chat => 
      chat.id === chatId 
        ? { ...chat, messages: [...chat.messages, assistantMessage] }
        : chat
    ));

    try {
      const currentChat = chats.find(c => c.id === chatId) || { messages: [] };
      const messages = [...currentChat.messages, userMessage];
      
      for await (const chunk of streamChatResponse(messages)) {
        setChats(prev => prev.map(chat => {
          if (chat.id === chatId) {
            const msgs = [...chat.messages];
            msgs[msgs.length - 1].content += chunk;
            return { ...chat, messages: msgs };
          }
          return chat;
        }));
      }
    } catch (error) {
      console.error('Error:', error);
      setChats(prev => prev.map(chat => {
        if (chat.id === chatId) {
          const msgs = [...chat.messages];
          msgs[msgs.length - 1].content = 'Error: Failed to get response. Please try again.';
          return { ...chat, messages: msgs };
        }
        return chat;
      }));
    } finally {
      setIsStreaming(false);
    }
  };

  const switchChat = useCallback((chatId) => {
    setActiveChat(chatId);
  }, []);

  const deleteChat = useCallback((chatId) => {
    setChats(prev => {
      const filtered = prev.filter(c => c.id !== chatId);
      if (activeChat === chatId && filtered.length > 0) {
        setActiveChat(filtered[0].id);
      } else if (filtered.length === 0) {
        setActiveChat(null);
      }
      return filtered;
    });
  }, [activeChat]);

  const currentChat = chats.find(c => c.id === activeChat);

  return {
    chats,
    currentChat,
    activeChat,
    isStreaming,
    createNewChat,
    sendMessage,
    switchChat,
    deleteChat
  };
}
