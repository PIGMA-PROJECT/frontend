
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Bot, History } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Message {
  id: number;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      content: "Bonjour ! Je suis votre assistant virtuel du département. Comment puis-je vous aider aujourd'hui ?",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user' as const,
      content: input,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate bot response after delay
    setTimeout(() => {
      const botResponses = [
        "Je peux vous aider à gérer vos cours et classes.",
        "Vous pouvez me demander des informations sur les étudiants et professeurs.",
        "Je peux vous rappeler les événements à venir dans le calendrier.",
        "Pour les soutenances et mémoires, je peux vous fournir les étapes à suivre.",
        "N'hésitez pas à me demander les dernières statistiques du département.",
      ];
      
      const botMessage = {
        id: messages.length + 2,
        type: 'bot' as const,
        content: botResponses[Math.floor(Math.random() * botResponses.length)],
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold">Assistant Virtuel</h1>
        <Link to="/chatbot/history" className="mt-2 md:mt-0 flex items-center text-primary hover:underline">
          <History className="mr-2 h-5 w-5" />
          <span>Historique des conversations</span>
        </Link>
      </div>
      
      <div className="card p-0 h-[calc(100vh-200px)] flex flex-col">
        {/* Chat header */}
        <div className="p-4 border-b flex items-center">
          <div className="bg-primary rounded-full p-2 text-white mr-3">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold">ISIMemo Assistant</h2>
            <div className="text-sm text-green-500 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              <span>En ligne</span>
            </div>
          </div>
        </div>
        
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] md:max-w-[70%] rounded-lg p-3 
                  ${message.type === 'user' 
                    ? 'bg-primary text-white rounded-br-none' 
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
              >
                <div className="flex items-center mb-1">
                  {message.type === 'bot' && (
                    <Bot className="h-4 w-4 mr-2" />
                  )}
                  <div className="text-xs opacity-70">
                    {message.type === 'user' ? 'Vous' : 'Assistant'} · {formatTime(message.timestamp)}
                  </div>
                  {message.type === 'user' && (
                    <User className="h-4 w-4 ml-2" />
                  )}
                </div>
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[80%] md:max-w-[70%] rounded-lg p-3 bg-gray-100 text-gray-800 rounded-bl-none">
                <div className="flex items-center">
                  <div className="typing-animation">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Chat input */}
        <form onSubmit={handleSendMessage} className="border-t p-4 flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Écrivez votre message ici..."
            className="flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-primary hover:bg-primary-700 text-white p-2 rounded-r-lg transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
      
      <style>
        {`
        .typing-animation {
          display: flex;
          align-items: center;
        }
        
        .typing-animation span {
          height: 8px;
          width: 8px;
          background: #606060;
          border-radius: 50%;
          display: block;
          margin: 0 2px;
          animation: typing 1.2s infinite alternate;
        }
        
        .typing-animation span:nth-child(2) {
          animation-delay: 0.4s;
        }
        
        .typing-animation span:nth-child(3) {
          animation-delay: 0.8s;
        }
        
        @keyframes typing {
          0% {
            opacity: 0.3;
            transform: translateY(0px);
          }
          50% {
            opacity: 1;
            transform: translateY(-4px);
          }
          100% {
            opacity: 0.3;
            transform: translateY(0px);
          }
        }
        `}
      </style>
    </div>
  );
};

export default Chatbot;
