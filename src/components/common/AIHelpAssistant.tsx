import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Predefined responses for common questions
const getAIResponse = (userMessage: string): string => {
  const message = userMessage.toLowerCase();

  // Greetings
  if (message.match(/^(hi|hello|hey|good morning|good afternoon|good evening)/)) {
    return "Hello! Welcome to Cyberdoctor Computer & Laptop Service Center. How can I help you today?";
  }

  // Services
  if (message.includes('service') || message.includes('repair') || message.includes('fix')) {
    return "We offer comprehensive computer and laptop repair services including:\n\n• Laptop Repair\n• Desktop Servicing\n• Chip-level Motherboard Repair\n• Data Recovery\n• OS Installation\n• Hardware Upgrades\n\nWould you like to know more about any specific service?";
  }

  // Pricing
  if (message.includes('price') || message.includes('cost') || message.includes('charge') || message.includes('fee')) {
    return "Our pricing varies based on the service required. We offer competitive rates starting from affordable prices. For accurate pricing, please:\n\n1. Visit our Services page\n2. Book an appointment for a free diagnosis\n3. Call us at +91 99522 74058\n\nWe provide transparent pricing with no hidden charges!";
  }

  // Appointment/Booking
  if (message.includes('appointment') || message.includes('book') || message.includes('schedule')) {
    return "Booking an appointment is easy! You can:\n\n1. Click on 'Book Appointment' in the menu\n2. Choose your preferred service\n3. Select date and time (9 AM - 9 PM, Mon-Sat)\n4. Choose in-store or doorstep service\n\nWe're available Monday to Saturday, with lunch break from 1-2 PM.";
  }

  // Location/Address
  if (message.includes('location') || message.includes('address') || message.includes('where')) {
    return "We're located in Saravanampatti, Coimbatore. You can find our exact location on the Contact page with an interactive map. We also offer doorstep service if you prefer!";
  }

  // Timing/Hours
  if (message.includes('time') || message.includes('hour') || message.includes('open') || message.includes('close')) {
    return "Our service hours are:\n\n🕐 Monday - Saturday: 9:00 AM - 9:00 PM\n🍽️ Lunch Break: 1:00 PM - 2:00 PM\n\nWe're closed on Sundays. You can book appointments for any available time slot!";
  }

  // Contact
  if (message.includes('contact') || message.includes('phone') || message.includes('call') || message.includes('whatsapp')) {
    return "You can reach us at:\n\n📞 Phone: +91 99522 74058\n💬 WhatsApp: Available on the same number\n📧 Visit our Contact page for more options\n\nFeel free to call or message us anytime during business hours!";
  }

  // Data Recovery
  if (message.includes('data') || message.includes('recover') || message.includes('lost file')) {
    return "We specialize in professional data recovery services! We can recover data from:\n\n• Damaged hard drives\n• Corrupted storage devices\n• Formatted drives\n• Failed SSDs\n\nOur success rate is high, and we handle your data with complete confidentiality. Book an appointment for a free assessment!";
  }

  // Doorstep Service
  if (message.includes('doorstep') || message.includes('home service') || message.includes('pickup')) {
    return "Yes! We offer convenient doorstep service. Our technician will:\n\n1. Come to your location\n2. Diagnose the issue\n3. Provide on-site repair (if possible)\n4. Or pick up the device for workshop repair\n\nSelect 'Doorstep Service' when booking your appointment!";
  }

  // Experience/About
  if (message.includes('experience') || message.includes('about') || message.includes('since when')) {
    return "Cyberdoctor has been serving Coimbatore since 2008 - that's over 17 years of experience! We're trusted by thousands of customers for our:\n\n✓ Expert technicians\n✓ Genuine parts\n✓ Quick turnaround\n✓ Warranty on repairs\n\nYour computer is in safe hands!";
  }

  // Warranty
  if (message.includes('warranty') || message.includes('guarantee')) {
    return "Yes, we provide warranty on all our repairs! The warranty period depends on the type of service:\n\n• Hardware repairs: Up to 6 months\n• Parts replacement: As per manufacturer warranty\n• Software services: 30 days\n\nWe stand behind our work with confidence!";
  }

  // Default response
  return "I'm here to help! You can ask me about:\n\n• Our services and repairs\n• Pricing and costs\n• Booking appointments\n• Location and contact info\n• Business hours\n• Data recovery\n• Doorstep service\n\nOr feel free to call us at +91 99522 74058 for immediate assistance!";
};

export default function AIHelpAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-[380px] h-[600px] shadow-2xl z-50 flex flex-col border-cyan-500/30">
          <CardHeader className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot className="h-6 w-6" />
                <div>
                  <CardTitle className="text-white">AI Assistant</CardTitle>
                  <CardDescription className="text-cyan-100">
                    Always here to help
                  </CardDescription>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 p-0 flex flex-col overflow-hidden">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.sender === 'user'
                          ? 'bg-cyan-600 text-white'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg px-4 py-2">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="icon" className="bg-cyan-600 hover:bg-cyan-700">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
