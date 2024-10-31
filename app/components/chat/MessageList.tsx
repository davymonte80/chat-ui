
interface MessageListProps {
    messages: Message[];
  }
  
  export const MessageList = ({ messages }: MessageListProps) => {
    return (
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`
              flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}
            `}
          >
            <div className={`
            max-w-[70%] rounded-lg p-4
            ${message.role === 'user' 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-100 text-gray-800'}
          `}>
            {message.content}
          </div>
        </div>
      ))}
    </div>
  );
};