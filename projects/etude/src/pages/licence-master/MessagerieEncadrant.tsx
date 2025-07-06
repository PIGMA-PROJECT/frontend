import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FiSend } from 'react-icons/fi';

const mockEncadreur = {
  id: 1,
  name: 'Pr. Abdoulaye Ndiaye',
  email: 'abdoulaye.ndiaye@univ.sn',
};

const mockMessages = [
  {
    id: 1,
    sender: 'encadreur',
    content: "Bonjour, avez-vous avancé sur la rédaction de l'introduction ?",
    date: '2024-07-10 09:00',
  },
  {
    id: 2,
    sender: 'etudiant',
    content: "Bonjour Professeur, oui j'ai rédigé une première version. Je vous l'envoie bientôt.",
    date: '2024-07-10 09:05',
  },
  {
    id: 3,
    sender: 'encadreur',
    content: "Parfait, n'oubliez pas d'intégrer les références récentes.",
    date: '2024-07-10 09:10',
  },
];

const MessagerieEncadrant: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: 'etudiant',
        content: input,
        date: new Date().toLocaleString(),
      },
    ]);
    setInput('');
  };

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen text-gray-500">Chargement...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto min-h-screen flex flex-col bg-white border border-gray-200 rounded-lg">
      <div className="p-6 border-b border-gray-100 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
          {mockEncadreur.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <div className="font-semibold text-gray-800">{mockEncadreur.name}</div>
          <div className="text-xs text-gray-500">{mockEncadreur.email}</div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'etudiant' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg shadow-sm text-sm whitespace-pre-line break-words '
                ${msg.sender === 'etudiant'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                }`}
            >
              {msg.content}
              <div className="text-xs text-gray-400 mt-1 text-right">{msg.date}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} className="p-4 border-t border-gray-100 bg-white flex gap-2">
        <input
          type="text"
          placeholder="Écrire un message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center"
        >
          <FiSend className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
};

export default MessagerieEncadrant;
