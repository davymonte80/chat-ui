'use client';

import { Sidebar } from '@/app/components/chat/Sidebar';
import { Message } from '@/app/components/chat/Message';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/app/components/ui/button';
import { useChatStore } from '@/app/store/chat-store';
import { useState } from 'react';
import { Send } from 'lucide-react';
import { useToast } from '@/components/ui/toast';

// Define MessageType separately if needed across multiple components or files
type MessageType = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
};

export default function ChatPage() {
  const [input, setInput] = useState('');
  const { currentChat, addMessage, updateMessage, setIsAiResponding } = useChatStore();
  const { toast } = useToast();

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: MessageType = {
      id: crypto.randomUUID(),
      content: input,
      role: 'user',
      timestamp: new Date(),
    };

    addMessage(userMessage);
    setInput('');
    setIsAiResponding(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();

      addMessage({
        id: crypto.randomUUID(),
        content: data.response,
        role: 'assistant',
        timestamp: new Date(),
      });
    } catch (error) {
      console.error("Error:", error); 
      toast({
        title: 'Error',
        description: 'Failed to get AI response',
        variant: 'destructive',
      });
    } finally {
      setIsAiResponding(false);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {currentChat?.messages.map((message: MessageType) => (
            <Message
              key={message.id}
              message={message}
              onEdit={(content) =>
                updateMessage(currentChat.id, message.id, content)
              }
            />
          ))}
        </div>
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="min-h-[60px]"
              onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <Button onClick={handleSend} className="px-8" disabled={!input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
