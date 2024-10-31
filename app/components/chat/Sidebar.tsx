'use client';

import { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useChatStore } from '@/app/store/chat-store';
import { MessageSquarePlus, Menu, Sun, Moon, Smile, Frown, Meh, BookOpen, Phone } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { chats, currentChat, createChat, setCurrentChat } = useChatStore();
  const [mood, setMood] = useState<'good' | 'neutral' | 'bad'>('neutral');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const moodIcons = {
    good: <Smile className="h-6 w-6 text-green-500" />,
    neutral: <Meh className="h-6 w-6 text-yellow-500" />,
    bad: <Frown className="h-6 w-6 text-red-500" />,
  };

  return (
    <TooltipProvider>
      <div
        className={`
          border-r transition-all duration-300 flex flex-col
          ${isExpanded ? 'w-64' : 'w-16'}
          bg-background text-foreground
        `}
      >
        <div className="p-2 flex justify-between items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-8 w-8 p-0"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              {isExpanded ? 'Collapse Sidebar' : 'Expand Sidebar'}
            </TooltipContent>
          </Tooltip>
          {isExpanded && (
            <Button onClick={createChat} className="w-full ml-2">
              <MessageSquarePlus className="h-4 w-4 mr-2" />
              New Chat
            </Button>
          )}
        </div>
        <Separator />
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-4">
            {isExpanded && (
              <div className="space-y-2">
                <Label htmlFor="mood-tracker">Mood Tracker</Label>
                <div className="flex justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setMood('bad')}
                    className={`p-1 ${mood === 'bad' ? 'bg-red-100 dark:bg-red-900' : ''}`}
                  >
                    <Frown className="h-6 w-6 text-red-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setMood('neutral')}
                    className={`p-1 ${mood === 'neutral' ? 'bg-yellow-100 dark:bg-yellow-900' : ''}`}
                  >
                    <Meh className="h-6 w-6 text-yellow-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setMood('good')}
                    className={`p-1 ${mood === 'good' ? 'bg-green-100 dark:bg-green-900' : ''}`}
                  >
                    <Smile className="h-6 w-6 text-green-500" />
                  </Button>
                </div>
                <Progress value={mood === 'bad' ? 33 : mood === 'neutral' ? 66 : 100} className="h-2" />
              </div>
            )}
            {chats.map((chat) => (
              <Tooltip key={chat.id}>
                <TooltipTrigger asChild>
                  <Button
                    variant={currentChat?.id === chat.id ? 'secondary' : 'ghost'}
                    className="w-full justify-start truncate"
                    onClick={() => setCurrentChat(chat.id)}
                  >
                    {isExpanded ? (
                      <span className="truncate">{chat.title || 'New Chat'}</span>
                    ) : (
                      moodIcons[mood]
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  {chat.title || 'New Chat'}
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </ScrollArea>
        <Separator />
        <div className="p-2 space-y-2">
          {isExpanded && (
            <>
              <Button variant="outline" className="w-full justify-start">
                <BookOpen className="h-4 w-4 mr-2" />
                Resources
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Phone className="h-4 w-4 mr-2" />
                Emergency Contact
              </Button>
            </>
          )}
          <div className="flex items-center justify-between">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="dark-mode" className={isExpanded ? '' : 'sr-only'}>Dark Mode</Label>
                  <Switch
                    id="dark-mode"
                    checked={isDarkMode}
                    onCheckedChange={toggleTheme}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                Toggle Dark Mode
              </TooltipContent>
            </Tooltip>
            {isExpanded ? (
              <span>{isDarkMode ? 'Dark' : 'Light'}</span>
            ) : (
              isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};