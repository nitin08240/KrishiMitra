import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send, Mic, Image, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBox = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'नमस्ते! मैं आपका कृषि सलाहकार हूं। आप मुझसे फसल, मौसम, या कृषि से संबंधित कोई भी प्रश्न पूछ सकते हैं।',
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate bot response (replace with actual API call)
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'धन्यवाद आपके प्रश्न के लिए। मैं आपकी जानकारी को प्रोसेस कर रहा हूं और जल्द ही विस्तृत सलाह देूंगा। कृपया कुछ क्षण रुकें।',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsRecording(!isRecording);
      // Add voice recognition logic here
    } else {
      alert('Voice recognition is not supported in this browser.');
    }
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Handle image upload for pest detection
      console.log('Image uploaded:', file.name);
      const imageMessage: Message = {
        id: Date.now().toString(),
        text: `📷 Image uploaded: ${file.name} (Pest detection feature coming soon!)`,
        sender: 'user',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, imageMessage]);
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b bg-primary text-primary-foreground rounded-t-lg">
        <div className="flex items-center space-x-2">
          <Bot className="h-6 w-6" />
          <div>
            <h3 className="font-semibold">AI कृषि सलाहकार</h3>
            <p className="text-sm opacity-90">Online • Ready to help</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.sender === 'bot' && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                {message.sender === 'user' && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                <div className="flex-1">
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground/70'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="अपना प्रश्न यहाँ लिखें... (Type your question here...)"
            className="flex-1"
          />
          <Button
            onClick={handleVoiceInput}
            variant="outline"
            size="icon"
            className={isRecording ? 'bg-destructive text-destructive-foreground' : ''}
          >
            <Mic className="h-4 w-4" />
          </Button>
          <Button onClick={handleImageUpload} variant="outline" size="icon">
            <Image className="h-4 w-4" />
          </Button>
          <Button onClick={handleSendMessage} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <p className="text-xs text-muted-foreground mt-2">
          आप हिंदी या अंग्रेजी में प्रश्न पूछ सकते हैं। आवाज़ या तस्वीर भी भेज सकते हैं।
        </p>
      </div>
    </Card>
  );
};

export default ChatBox;