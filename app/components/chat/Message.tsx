'use client';
import { Message as MessageType } from '@/types/chat';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { VoiceReader } from './VoiceReader';
import { Edit2, Save, X } from 'lucide-react';

interface MessageProps {
  message: MessageType;
  onEdit: (content: string) => void;
}
export const Message = ({ message, onEdit }: MessageProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(message.content);
  
    const handleSave = () => {
      onEdit(editContent);
      setIsEditing(false);
    };
  
    return (
      <Card className={`p-4 ${message.role === 'assistant' ? 'bg-gray-50' : 'bg-white'}`}>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-2">
                <Textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex gap-2">
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="relative">
              <p className="text-sm">{message.content}</p>
              {message.isLoading && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                  <span className="animate-pulse">AI is thinking...</span>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex gap-2 ml-4">
          {message.role === 'assistant' && <VoiceReader text={message.content} />}
          {message.role === 'user' && !isEditing && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="h-8 w-8 p-0"
            >
                <Edit2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};