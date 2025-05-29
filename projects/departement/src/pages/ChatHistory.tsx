
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bot, Calendar, Search, Trash2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ChatSession {
  id: number;
  date: string;
  time: string;
  preview: string;
  messages: {
    id: number;
    type: 'user' | 'bot';
    content: string;
    timestamp: string;
  }[];
}

const ChatHistory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState<ChatSession | null>(null);

  // Exemple de données d'historique
  const chatHistory: ChatSession[] = [
    {
      id: 1,
      date: '14 mai 2025',
      time: '10:30',
      preview: 'Information sur les soutenances',
      messages: [
        { id: 1, type: 'user', content: 'Bonjour, j\'aimerais des informations sur les soutenances.', timestamp: '10:30' },
        { id: 2, type: 'bot', content: 'Bien sûr ! Les soutenances sont programmées pour la période du 15 au 30 juin. Quelle information spécifique recherchez-vous ?', timestamp: '10:30' },
        { id: 3, type: 'user', content: 'Comment puis-je organiser une soutenance ?', timestamp: '10:31' },
        { id: 4, type: 'bot', content: 'Pour organiser une soutenance, vous devez d\'abord accéder à la section "Gestion des soutenances" dans le menu, puis cliquer sur "Organiser une soutenance". Vous pourrez ensuite définir la date, l\'heure, la salle et le jury.', timestamp: '10:31' }
      ]
    },
    {
      id: 2,
      date: '12 mai 2025',
      time: '14:15',
      preview: 'Questions sur les classes',
      messages: [
        { id: 1, type: 'user', content: 'Comment puis-je ajouter une nouvelle classe ?', timestamp: '14:15' },
        { id: 2, type: 'bot', content: 'Pour ajouter une nouvelle classe, rendez-vous dans la section "Gestion des classes" puis cliquez sur le bouton "Ajouter une classe".', timestamp: '14:15' }
      ]
    },
    {
      id: 3,
      date: '10 mai 2025',
      time: '09:45',
      preview: 'Calendrier des événements',
      messages: [
        { id: 1, type: 'user', content: 'Quels sont les prochains événements au calendrier ?', timestamp: '09:45' },
        { id: 2, type: 'bot', content: 'Les prochains événements sont : une réunion des chefs de département le 15 mai, la date limite de soumission des mémoires le 20 mai, et un conseil d\'administration le 25 mai.', timestamp: '09:45' }
      ]
    }
  ];

  const filteredHistory = searchQuery 
    ? chatHistory.filter(chat => 
        chat.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.messages.some(msg => msg.content.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : chatHistory;

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="flex items-center">
          <Link to="/chatbot" className="mr-3">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold">Historique des conversations</h1>
        </div>
        <div className="mt-4 md:mt-0 flex items-center text-sm text-gray-600">
          <Calendar className="mr-2" />
          <span>Dernière conversation: {chatHistory[0]?.date}</span>
        </div>
      </div>

      <div className="card">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Rechercher dans les conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <div className="md:grid md:grid-cols-2 md:divide-x">
          {/* Liste des conversations */}
          <div className={`${selectedChat && 'hidden md:block'} overflow-y-auto max-h-[70vh]`}>
            {filteredHistory.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                Aucune conversation trouvée
              </div>
            ) : (
              filteredHistory.map((chat) => (
                <motion.div
                  key={chat.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors ${
                    selectedChat?.id === chat.id ? 'bg-gray-50' : ''
                  }`}
                  onClick={() => setSelectedChat(chat)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{chat.preview}</h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {chat.messages[0].content}
                      </p>
                    </div>
                    <div className="text-xs text-gray-500 whitespace-nowrap">
                      {chat.date}, {chat.time}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Conversation sélectionnée */}
          {selectedChat ? (
            <div className={`${!selectedChat && 'hidden'} md:block overflow-y-auto max-h-[70vh]`}>
              <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{selectedChat.preview}</h3>
                  <p className="text-xs text-gray-500">{selectedChat.date}, {selectedChat.time}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors">
                    <Trash2 className="h-5 w-5" />
                  </button>
                  <button 
                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors md:hidden"
                    onClick={() => setSelectedChat(null)}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="p-4 space-y-4">
                {selectedChat.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg p-3 
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
                          {message.type === 'user' ? 'Vous' : 'Assistant'} · {message.timestamp}
                        </div>
                        {message.type === 'user' && (
                          <User className="h-4 w-4 ml-2" />
                        )}
                      </div>
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center justify-center p-8 text-gray-500">
              Sélectionnez une conversation pour voir les détails
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHistory;
