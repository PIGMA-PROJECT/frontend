import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, 
  Bell, 
  User, 
  Search, 
  Settings, 
  LogOut, 
  Mail,
  HelpCircle,
  ChevronDown,
  MessageSquare,
  FileText,
  Calendar,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import Logo from './Logo';

interface HeaderProps {
  toggleSidebar: () => void;
  userLevel: 'licence' | 'master' | 'autres';
  userName: string;
  userEmail: string;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, userLevel, userName, userEmail }) => {
  const { logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  
  // Fermer les menus lorsque l'utilisateur clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Notifications adaptées aux étudiants selon leur niveau
  const getNotifications = () => {
    const baseNotifications = [
      {
        id: 1,
        title: 'Nouveau document',
        message: 'Un nouveau guide méthodologique a été ajouté à la médiathèque.',
        time: 'Il y a 2 heures',
        read: false,
        icon: <FileText className="h-4 w-4" />
      },
      {
        id: 2,
        title: 'Rappel',
        message: 'N\'oubliez pas de consulter le calendrier des soutenances.',
        time: 'Hier',
        read: true,
        icon: <Calendar className="h-4 w-4" />
      }
    ];

    if (userLevel === 'licence' || userLevel === 'master') {
      return [
        {
          id: 3,
          title: 'Message encadrant',
          message: 'Votre encadrant a programmé une réunion pour demain.',
          time: 'Il y a 30 minutes',
          read: false,
          icon: <MessageSquare className="h-4 w-4" />
        },
        {
          id: 4,
          title: 'Dossier',
          message: 'Mise à jour du statut de votre dossier de mémoire.',
          time: 'Il y a 1 heure',
          read: false,
          icon: <FileText className="h-4 w-4" />
        },
        ...baseNotifications
      ];
    }

    return baseNotifications;
  };

  const notifications = getNotifications();

  const dropdownVariants = {
    hidden: { opacity: 0, y: -5, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut" as const
      }
    },
    exit: { 
      opacity: 0, 
      y: -5, 
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: "easeIn" as const
      }
    }
  };

  const levelDisplay = {
    licence: 'Licence',
    master: 'Master',
    autres: 'Autres'
  };

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
  };

  return (
    <header className="bg-white shadow-sm z-30 sticky top-0">
      <div className="px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="md:hidden ml-2">
            <Logo size="small" withText={false} />
          </div>
          
          <div className="relative ml-4 hidden md:flex items-center">
            <input
              type="text"
              placeholder="Rechercher dans la médiathèque..."
              className="w-64 pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
            <Search className="absolute left-3 text-gray-400 h-5 w-5" />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button 
              className="p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none relative"
              onClick={() => setShowNotifications(!showNotifications)}
              aria-haspopup="true"
              aria-expanded={showNotifications}
            >
              <Bell className="h-6 w-6" />
              {notifications.some(n => !n.read) && (
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              )}
            </button>
            
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                >
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                    <h3 className="text-sm font-medium text-navy">Notifications</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {notifications.filter(n => !n.read).length} non lues
                    </p>
                  </div>
                  
                  <div className="py-1 max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="px-4 py-3 text-sm text-gray-500 text-center">
                        Aucune notification
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-start ${!notification.read ? 'bg-blue-50' : ''}`}
                        >
                          <div className={`flex-shrink-0 mr-3 mt-1 ${!notification.read ? 'text-primary' : 'text-gray-400'}`}>
                            {notification.icon}
                          </div>
                          <div className="flex-1">
                            <p className={`text-sm font-medium ${!notification.read ? 'text-navy' : 'text-gray-700'}`}>
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  
                  <div className="py-1 border-t border-gray-100">
                    <button 
                      className="block w-full px-4 py-2 text-sm text-center text-primary hover:bg-gray-50"
                      onClick={() => setShowNotifications(false)}
                    >
                      Marquer toutes comme lues
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Profile Menu */}
          <div className="relative" ref={profileMenuRef}>
            <button
              className="flex items-center text-sm font-medium text-gray-700 hover:text-navy focus:outline-none"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              aria-haspopup="true"
              aria-expanded={showProfileMenu}
            >
              <span className="sr-only">Ouvrir le menu utilisateur</span>
              <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                <User className="h-5 w-5" />
              </div>
              <div className="ml-2 hidden md:block text-left">
                <div className="text-sm font-medium text-gray-900">{userName}</div>
                <div className="text-xs text-gray-500">Étudiant {levelDisplay[userLevel]}</div>
              </div>
              <ChevronDown className="ml-1 h-4 w-4 hidden md:block" />
            </button>
            
            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-50"
                >
                  <div className="py-1">
                    <div className="px-4 py-3">
                      <p className="text-sm font-medium text-navy">{userName}</p>
                      <p className="text-xs text-gray-500 truncate">{userEmail}</p>
                      <p className="text-xs text-primary mt-1">Étudiant {levelDisplay[userLevel]}</p>
                    </div>
                  </div>
                  
                  <div className="py-1">
                    <Link 
                      to="/profile" 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <User className="mr-3 h-4 w-4 text-gray-400" />
                      <span>Mon Profil</span>
                    </Link>
                    <Link 
                      to="/mediatheque" 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <BookOpen className="mr-3 h-4 w-4 text-gray-400" />
                      <span>Médiathèque</span>
                    </Link>
                    {(userLevel === 'licence' || userLevel === 'master') && (
                      <Link 
                        to="/messagerie/encadrant" 
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <MessageSquare className="mr-3 h-4 w-4 text-gray-400" />
                        <span>Messagerie</span>
                      </Link>
                    )}
                    {/* <Link 
                      to="/settings" 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <Settings className="mr-3 h-4 w-4 text-gray-400" />
                      <span>Paramètres</span>
                    </Link> */}
                    <Link 
                      to="/help" 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <HelpCircle className="mr-3 h-4 w-4 text-gray-400" />
                      <span>Aide</span>
                    </Link>
                  </div>
                  
                  <div className="py-1">
                    <button 
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="mr-3 h-4 w-4 text-gray-400" />
                      <span>Se déconnecter</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;