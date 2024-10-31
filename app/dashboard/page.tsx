'use client'

import { useState } from 'react'
import { Sidebar } from '@/app/components/chat/Sidebar'
import { MessageList } from '@/app/components/chat/MessageList'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Bell, Settings, HelpCircle, Send, Paperclip, Mic, } from 'lucide-react'

export default function Dashboard() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { id: Date.now(), content: input, sender: 'user' }])
      setInput('')
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { id: Date.now(), content: "I'm here to assist you. How can I help today?", sender: 'ai' }])
      }, 1000)
    }
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <header className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/avatars/01.png" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">Welcome back, John</h2>
              <p className="text-sm text-muted-foreground">How can I assist you today?</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-5 w-5" />
            </Button>
          </div>
        </header>
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex flex-col">
            <div className="flex-1 relative">
              <MessageList messages={messages} />
            </div>
            <div className="p-4 border-t">
              <div className="flex flex-col gap-2">
                <Textarea
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="min-h-[100px]"
                />
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Mic className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-80 border-l p-4 overflow-y-auto hidden lg:block">
            
          </div>
        </div>
      </main>
    </div>
  )
}