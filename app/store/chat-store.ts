import { create } from 'zustand';
import { Chat, Message } from '@/types/chat';

interface ChatStore {
  chats: Chat[];
  currentChat: Chat | null;
  isAiResponding: boolean;
  createChat: () => void;
  setCurrentChat: (chatId: string) => void;
  addMessage: (message: Message) => void;
  updateMessage: (chatId: string, messageId: string, content: string) => void;
  setIsAiResponding: (isResponding: boolean) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  chats: [],
  currentChat: null,
  isAiResponding: false,
  createChat: () => {
    const newChat: Chat = {
      id: crypto.randomUUID(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    set((state) => ({
      chats: [...state.chats, newChat],
      currentChat: newChat,
    }));
  },
  setCurrentChat: (chatId) => {
    set((state) => ({
      currentChat: state.chats.find((chat) => chat.id === chatId) || null,
    }));
  },
  // Add other actions...
}));