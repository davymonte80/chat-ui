'use client';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import { useState, useEffect } from 'react';

interface VoiceReaderProps {
  text: string;
}

export const VoiceReader = ({ text }: VoiceReaderProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speech, setSpeech] = useState<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const utterance = new SpeechSynthesisUtterance(text);
    setSpeech(utterance);
    return () => {
        if (speech) {
          speechSynthesis.cancel();
        }
      };
    }, [text]);
  
    const toggleSpeech = () => {
      if (isPlaying) {
        speechSynthesis.cancel();
      } else if (speech) {
        speechSynthesis.speak(speech);
      }
      setIsPlaying(!isPlaying);
    };
    return (
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSpeech}
          className="h-8 w-8 p-0"
        >
          {isPlaying ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </Button>
      );
    };  