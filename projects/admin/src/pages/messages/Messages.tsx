import React, { useState, useRef, useEffect } from 'react';
import { FiSearch, FiSend, FiMoreVertical, FiPaperclip, FiImage, FiSmile, FiFile, FiMessageSquare } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

// Types pour nos donn√©es
interface User {
  id: number;
  name: string;
  role: string;
  department?: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away';
  lastSeen?: Date;
}

interface Message {
  id: number;
  senderId: number;
  recipientId: number;
  content: string;
  timestamp: Date;
  read: boolean;
  attachments?: {
    id: number;
    name: string;
    type: string;
    url: string;
  }[];
}

interface Conversation {
  id: number;
  participants: number[];
  messages: Message[];
  unreadCount: number;
  lastMessageTimestamp: Date;
}

// Donn√©es fictives
const users: User[] = [
  { id: 1, name: 'Admin', role: 'Administrateur', status: 'online' },
  { id: 2, name: 'Dr. Ahmed Diop', role: 'Chef de d√©partement', department: 'Informatique', status: 'online' },
  { id: 3, name: 'Fatou Sow', role: 'Secr√©taire', department: 'G√©nie Civil', status: 'away', lastSeen: new Date(2025, 4, 11, 15, 45) },
  { id: 4, name: 'Dr. Ousmane Fall', role: 'Chef de d√©partement', department: 'Management', status: 'offline', lastSeen: new Date(2025, 4, 10, 9, 20) },
  { id: 5, name: 'Marie Faye', role: 'Secr√©taire', department: 'Informatique', status: 'online' },
  { id: 6, name: 'Dr. Ibrahima Ndiaye', role: 'Chef de d√©partement', department: 'M√©canique', status: 'offline', lastSeen: new Date(2025, 4, 9, 16, 30) },
];

// G√©n√©rateur simple de conversations fictives
const generateConversations = (): Conversation[] => {
  return users.filter(user => user.id !== 1).map(user => {
    const messages: Message[] = Array.from({ length: Math.floor(Math.random() * 20) + 3 }, (_, i) => {
      const isAdmin = i % 2 === 0;
      const date = new Date();
      date.setHours(date.getHours() - i * 2);
      
      return {
        id: i + 1,
        senderId: isAdmin ? 1 : user.id,
        recipientId: isAdmin ? user.id : 1,
        content: isAdmin 
          ? `Message administratif ${i + 1} pour ${user.name}. Veuillez confirmer la r√©ception.`
          : `R√©ponse ${i + 1} de ${user.name}. Message bien re√ßu, merci pour l'information.`,
        timestamp: date,
        read: i > 2, // Les 3 derniers messages sont non lus
        attachments: i === 1 ? [
          { id: 1, name: 'document.pdf', type: 'pdf', url: '#' }
        ] : undefined
      };
    });
    
    // Trier les messages par timestamp (du plus r√©cent au plus ancien)
    messages.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    
    return {
      id: user.id,
      participants: [1, user.id], // Admin (id:1) et l'utilisateur
      messages,
      unreadCount: messages.filter(msg => !msg.read && msg.senderId !== 1).length,
      lastMessageTimestamp: messages[0].timestamp
    };
  });
};

const conversations = generateConversations();

// Composant principal
const Messages: React.FC = () => {
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachmentOptions, setShowAttachmentOptions] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Filtrer les conversations en fonction de la recherche
  const filteredConversations = conversations.filter(conversation => {
    const otherParticipant = users.find(user => user.id === conversation.participants.find(id => id !== 1));
    return otherParticipant?.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           otherParticipant?.department?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // D√©filer vers le bas des messages lors de la s√©lection d'une conversation
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeConversation]);

  // G√©rer l'envoi d'un message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !activeConversation) return;
    
    // Simuler l'ajout d'un nouveau message
    const updatedConversation = { ...activeConversation };
    const newMsg: Message = {
      id: Date.now(),
      senderId: 1, // Admin
      recipientId: activeConversation.participants.find(id => id !== 1) || 0,
      content: newMessage.trim(),
      timestamp: new Date(),
      read: false
    };
    
    updatedConversation.messages = [newMsg, ...updatedConversation.messages];
    updatedConversation.lastMessageTimestamp = new Date();
    
    setActiveConversation(updatedConversation);
    setNewMessage('');
  };

  // Obtenir l'utilisateur correspondant √† un ID
  const getUserById = (userId: number) => {
    return users.find(user => user.id === userId);
  };

  // Obtenir l'autre participant dans une conversation
  const getOtherParticipant = (conversation: Conversation) => {
    const otherId = conversation.participants.find(id => id !== 1);
    return getUserById(otherId || 0);
  };

  // Formater la date du dernier message
  const formatMessageTime = (date: Date) => {
    return formatDistanceToNow(date, { 
      addSuffix: true,
      locale: fr
    });
  };

  return (
    <div className="h-full">
      <div className="flex flex-col h-full">
        <h1 className="text-2xl font-bold pb-4">Messages</h1>
        
        <div className="flex flex-1 overflow-hidden bg-white rounded-lg shadow-lg">
          {/* Liste des conversations (c√¥t√© gauche) */}
          <div className="w-80 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher une conversation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.length === 0 ? (
                <div className="p-4 text-center text-gray-500">Aucune conversation trouv√©e</div>
              ) : (
                filteredConversations.map(conversation => {
                  const otherUser = getOtherParticipant(conversation);
                  const lastMessage = conversation.messages[0];
                  
                  return (
                    <div 
                      key={conversation.id}
                      onClick={() => setActiveConversation(conversation)}
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors duration-150 ${
                        activeConversation?.id === conversation.id ? 'bg-gray-50' : ''
                      }`}
                    >
                      <div className="flex items-start">
                        {/* Avatar */}
                        <div className="relative">
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                            {otherUser?.avatar ? (
                              <img src={otherUser.avatar} alt={otherUser.name} className="h-10 w-10 rounded-full" />
                            ) : (
                              <span>{otherUser?.name.slice(0, 2)}</span>
                            )}
                          </div>
                          
                          {/* Indicateur de statut */}
                          <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                            otherUser?.status === 'online' ? 'bg-green-500' :
                            otherUser?.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                          }`}></div>
                        </div>
                        
                        {/* Informations de la conversation */}
                        <div className="ml-3 flex-1 min-w-0">
                          <div className="flex justify-between">
                            <h3 className="text-sm font-medium text-gray-900 truncate">{otherUser?.name}</h3>
                            <span className="text-xs text-gray-500">{formatMessageTime(conversation.lastMessageTimestamp)}</span>
                          </div>
                          
                          <p className="text-xs text-gray-500">{otherUser?.role}{otherUser?.department ? ` - ${otherUser.department}` : ''}</p>
                          
                          <p className="text-sm text-gray-600 truncate mt-1">
                            {lastMessage.senderId === 1 ? 'Vous: ' : ''}
                            {lastMessage.content}
                          </p>
                        </div>
                        
                        {/* Badge de messages non lus */}
                        {conversation.unreadCount > 0 && (
                          <div className="ml-2 bg-primary text-white text-xs rounded-full h-5 min-w-5 flex items-center justify-center px-1">
                            {conversation.unreadCount}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
          
          {/* Zone des messages (c√¥t√© droit) */}
          <div className="flex-1 flex flex-col">
            {activeConversation ? (
              <>
                {/* En-t√™te de la conversation */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 mr-3">
                      {getOtherParticipant(activeConversation)?.avatar ? (
                        <img 
                          src={getOtherParticipant(activeConversation)?.avatar} 
                          alt={getOtherParticipant(activeConversation)?.name} 
                          className="h-10 w-10 rounded-full" 
                        />
                      ) : (
                        <span>{getOtherParticipant(activeConversation)?.name.slice(0, 2)}</span>
                      )}
                    </div>
                    
                    <div>
                      <h2 className="text-lg font-medium text-gray-900">
                        {getOtherParticipant(activeConversation)?.name}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {getOtherParticipant(activeConversation)?.role}
                        {getOtherParticipant(activeConversation)?.department ? 
                          ` - ${getOtherParticipant(activeConversation)?.department}` : ''}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                      <FiMoreVertical className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto flex flex-col-reverse">
                  <div ref={messagesEndRef} />
                  
                  {activeConversation.messages.map((message, index) => {
                    const isAdmin = message.senderId === 1;
                    const sender = getUserById(message.senderId);
                    
                    return (
                      <div
                        key={message.id}
                        className={`mb-4 max-w-[80%] ${isAdmin ? 'self-end' : 'self-start'}`}
                      >
                        <div className={`flex items-start ${isAdmin ? 'flex-row-reverse' : ''}`}>
                          {/* Avatar (seulement pour les messages re√ßus) */}
                          {!isAdmin && (
                            <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 mr-2">
                              {sender?.avatar ? (
                                <img src={sender.avatar} alt={sender.name} className="h-8 w-8 rounded-full" />
                              ) : (
                                <span className="text-xs">{sender?.name.slice(0, 2)}</span>
                              )}
                            </div>
                          )}
                          
                          <div className={`${isAdmin ? 'mr-2' : 'ml-2'}`}>
                            {/* Bulle de message */}
                            <div className={`p-3 rounded-lg ${
                              isAdmin ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800'
                            }`}>
                              <p>{message.content}</p>
                              
                              {/* Pi√®ces jointes */}
                              {message.attachments && message.attachments.length > 0 && (
                                <div className="mt-2 space-y-2">
                                  {message.attachments.map(attachment => (
                                    <div 
                                      key={attachment.id}
                                      className={`flex items-center p-2 rounded ${
                                        isAdmin ? 'bg-blue-600' : 'bg-gray-200'
                                      }`}
                                    >
                                      <FiFile className={`mr-2 ${isAdmin ? 'text-white' : 'text-gray-500'}`} />
                                      <span className="text-sm">{attachment.name}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                            
                            {/* Horodatage */}
                            <div className={`text-xs text-gray-500 mt-1 ${isAdmin ? 'text-right' : ''}`}>
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Zone de saisie de message */}
                <div className="p-4 border-t border-gray-200">
                  <form onSubmit={handleSendMessage} className="flex items-end space-x-2">
                    <div className="relative flex-1">
                      <textarea
                        placeholder="√âcrivez votre message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-none min-h-[70px] max-h-[150px]"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage(e);
                          }
                        }}
                      />
                      
                      <div className="absolute bottom-2 left-2 flex space-x-2">
                        {/* Bouton d'attachement */}
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setShowAttachmentOptions(!showAttachmentOptions)}
                            className="p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                          >
                            <FiPaperclip className="h-5 w-5" />
                          </button>
                          
                          <AnimatePresence>
                            {showAttachmentOptions && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute bottom-10 left-0 bg-white rounded-lg shadow-lg p-2 w-40"
                              >
                                <button
                                  type="button"
                                  onClick={() => {
                                    fileInputRef.current?.click();
                                    setShowAttachmentOptions(false);
                                  }}
                                  className="flex items-center w-full p-2 text-left text-sm hover:bg-gray-100 rounded"
                                >
                                  <FiFile className="mr-2 text-gray-500" />
                                  <span>Document</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    fileInputRef.current?.click();
                                    setShowAttachmentOptions(false);
                                  }}
                                  className="flex items-center w-full p-2 text-left text-sm hover:bg-gray-100 rounded"
                                >
                                  <FiImage className="mr-2 text-gray-500" />
                                  <span>Image</span>
                                </button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                          
                          <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={() => {/* G√©rer l'upload de fichier */}}
                          />
                        </div>
                        
                        {/* Bouton d'emoji */}
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            className="p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                          >
                            <FiSmile className="h-5 w-5" />
                          </button>
                          
                          <AnimatePresence>
                            {showEmojiPicker && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute bottom-10 left-0 bg-white rounded-lg shadow-lg p-2 w-64 h-48 overflow-y-auto"
                              >
                                <div className="grid grid-cols-8 gap-1">
                                  {["Ì∏ä", "Ì∏Ç", "Ì∏ç", "Ì±ç", "Ìπè", "Ì±ã", "Ìæâ", "‚ù§Ô∏è", "Ì¥î", "Ì∏¢", "ÌπÑ", "Ì∏é", "Ì¥©", "Ì±è", "Ì¥•", "‚úÖ", "‚ùå", "‚≠ê", "Ì∫Ä", "Ì≤°", "Ì≥ù", "Ì≥Ö", "Ì¥ç", "Ì≤¨"].map(emoji => (
                                    <button
                                      key={emoji}
                                      type="button"
                                      onClick={() => {
                                        setNewMessage(prev => prev + emoji);
                                        setShowEmojiPicker(false);
                                      }}
                                      className="p-1 text-xl hover:bg-gray-100 rounded"
                                    >
                                      {emoji}
                                    </button>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={!newMessage.trim()}
                      className={`p-3 rounded-full ${
                        newMessage.trim() 
                          ? 'bg-primary text-white hover:bg-primary-700' 
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <FiSend className="h-5 w-5" />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
                <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
                  <FiMessageSquare className="h-10 w-10" />
                </div>
                <h2 className="text-xl font-semibold text-gray-700">Centre de messages</h2>
                <p className="text-gray-500 max-w-md mt-2">
                  S√©lectionnez une conversation pour commencer √† discuter avec les chefs de d√©partement et les secr√©taires.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
