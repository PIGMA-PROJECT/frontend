import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  MessageSquare, 
  BookOpen, 
  ChevronDown, 
  ChevronRight,
  Home,
  List,
  AlertCircle,
  User,
  Image,
  FileText,
  Calendar,
  Settings,
  UserCheck,
  ClipboardList,
  Upload,
  Mail,
  CheckSquare
} from 'lucide-react';
import Logo from './Logo';

interface ElementMenu {
  nom: string;
  chemin?: string;
  icone: React.ReactNode;
  sousmenu?: ElementMenu[];
  niveau?: 'licence' | 'master' | 'autres' | 'all';
}

interface PropsSidebar {
  estVisible: boolean;
  niveauEtudiant: 'licence' | 'master' | 'autres';
}

const Sidebar: React.FC<PropsSidebar> = ({ estVisible, niveauEtudiant }) => {
  const emplacement = useLocation();
  const [menusOuverts, setMenusOuverts] = useState<{ [cle: string]: boolean }>({
    'Médiathèque': false,
    'Chatbot': false,
    'Événements': false,
    'Encadrements': false,
    'Dossier': false,
    'Messagerie': false,
  });

  const elementsMenu: ElementMenu[] = [
    {
      nom: 'Tableau de bord',
      chemin: '/dashboard',
      icone: <Home className="mr-2 h-5 w-5" />,
      niveau: 'all'
    },
    {
      nom: 'Médiathèque',
      icone: <Image className="mr-2 h-5 w-5" />,
      niveau: 'all',
      sousmenu: [
        {
          nom: 'Consulter',
          icone: <List className="mr-2 h-4 w-4" />,
          chemin: '/mediatheque',
          niveau: 'all'
        },
        {
          nom: 'Sauvegardes',
          icone: <BookOpen className="mr-2 h-4 w-4" />,
          chemin: '/mediatheque/saved',
          niveau: 'all'
        },
        {
          nom: 'Mes publications',
          icone: <FileText className="mr-2 h-4 w-4" />,
          chemin: '/mediatheque/mes-publications',
          niveau: 'licence' // Licence et Master peuvent publier
        },
      ],
    },
    {
      nom: 'Chatbot',
      icone: <MessageSquare className="mr-2 h-5 w-5" />,
      niveau: 'all',
      sousmenu: [
        {
          nom: 'Discussion',
          icone: <MessageSquare className="mr-2 h-4 w-4" />,
          chemin: '/chatbot',
          niveau: 'all'
        },
        {
          nom: 'Historique',
          icone: <List className="mr-2 h-4 w-4" />,
          chemin: '/chatbot/history',
          niveau: 'all'
        },
      ],
    },
    {
      nom: 'Événements',
      icone: <Calendar className="mr-2 h-5 w-5" />,
      niveau: 'all',
      sousmenu: [
        {
          nom: 'Calendrier',
          icone: <Calendar className="mr-2 h-4 w-4" />,
          chemin: '/evenements/soutenances',
          niveau: 'autres'
        },
        {
          nom: 'Calendrier complet',
          icone: <Calendar className="mr-2 h-4 w-4" />,
          chemin: '/evenements/calendrier',
          niveau: 'licence' // Licence et Master voient plus d'événements
        },
      ],
    },
    {
      nom: 'Encadrements',
      icone: <UserCheck className="mr-2 h-5 w-5" />,
      niveau: 'licence', // Seulement Licence et Master
      sousmenu: [
        {
          nom: 'Liste des encadrants',
          icone: <Users className="mr-2 h-4 w-4" />,
          chemin: '/encadrants',
          niveau: 'licence'
        },
        {
          nom: 'Mon panel d\'encadrement',
          icone: <AlertCircle className="mr-2 h-4 w-4" />,
          chemin: '/encadrement/panel',
          niveau: 'licence'
        },
        {
          nom: 'Espace de travail',
          icone: <CheckSquare className="mr-2 h-4 w-4" />,
          chemin: '/encadrement/workspace',
          niveau: 'licence'
        },
      ],
    },
    {
      nom: 'Dossier',
      icone: <ClipboardList className="mr-2 h-5 w-5" />,
      niveau: 'licence', // Seulement Licence et Master
      sousmenu: [
        {
          nom: 'Suivi de dossier',
          icone: <List className="mr-2 h-4 w-4" />,
          chemin: '/dossier/suivi',
          niveau: 'licence'
        },
        {
          nom: 'Dépôt de dossier',
          icone: <Upload className="mr-2 h-4 w-4" />,
          chemin: '/dossier/depot',
          niveau: 'licence'
        },
      ],
    },
    {
      nom: 'Messagerie',
      icone: <Mail className="mr-2 h-5 w-5" />,
      niveau: 'licence', // Seulement Licence et Master
      sousmenu: [
        {
          nom: 'Discussion avec encadrant',
          icone: <MessageSquare className="mr-2 h-4 w-4" />,
          chemin: '/messagerie/encadrant',
          niveau: 'licence'
        },
        {
          nom: 'Messages visiteurs',
          icone: <Mail className="mr-2 h-4 w-4" />,
          chemin: '/messagerie/visiteurs',
          niveau: 'licence'
        },
      ],
    },
    {
      nom: 'Profil',
      chemin: '/profile',
      icone: <User className="mr-2 h-5 w-5" />,
      niveau: 'all'
    },
    {
      nom: 'Paramètres',
      chemin: '/settings',
      icone: <Settings className="mr-2 h-5 w-5" />,
      niveau: 'all'
    },
  ];

  // Filtrer les éléments selon le niveau de l'étudiant
  const menuFiltre = elementsMenu.filter(item => {
    if (item.niveau === 'all') return true;
    if (item.niveau === niveauEtudiant) return true;
    if (item.niveau === 'licence' && (niveauEtudiant === 'licence' || niveauEtudiant === 'master')) return true;
    return false;
  });

  const basculerMenu = (nomMenu: string) => {
    setMenusOuverts({
      ...menusOuverts,
      [nomMenu]: !menusOuverts[nomMenu],
    });
  };

  const estActif = (chemin?: string) => {
    if (!chemin) return false;
    return emplacement.pathname === chemin;
  };

  const sousmenuEstActif = (sousmenu?: ElementMenu[]) => {
    if (!sousmenu) return false;
    return sousmenu.some(item => estActif(item.chemin));
  };

  if (!estVisible) return null;

  return (
    <div className="w-64 h-full bg-white shadow-lg flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-center">
          <Logo />
        </div>
        <div className="mt-2 text-xs text-center text-gray-600">
          Étudiant {niveauEtudiant.charAt(0).toUpperCase() + niveauEtudiant.slice(1)}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {menuFiltre.map((item, index) => {
            // Filtrer le sous-menu en fonction du niveau
            const sousmenuFiltre = item.sousmenu?.filter(subItem => {
              if (subItem.niveau === 'all') return true;
              if (subItem.niveau === niveauEtudiant) return true;
              if (subItem.niveau === 'licence' && (niveauEtudiant === 'licence' || niveauEtudiant === 'master')) return true;
              return false;
            });
            
            return (
              <li key={index}>
                {sousmenuFiltre && sousmenuFiltre.length > 0 ? (
                  <div className="mb-2">
                    <button
                      onClick={() => basculerMenu(item.nom)}
                      className={`flex items-center w-full p-2 text-base text-left rounded-md transition-colors duration-200 hover:bg-gray-100 ${
                        menusOuverts[item.nom] || sousmenuEstActif(sousmenuFiltre) ? 'bg-gray-100' : ''
                      }`}
                    >
                      {item.icone}
                      <span className="flex-1">{item.nom}</span>
                      {menusOuverts[item.nom] ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                    
                    <AnimatePresence>
                      {menusOuverts[item.nom] && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="pl-6 mt-1 space-y-1"
                        >
                          {sousmenuFiltre.map((sousItem, sousIndex) => (
                            <li key={sousIndex}>
                              <Link
                                to={sousItem.chemin || '#'}
                                className={`flex items-center p-2 text-sm rounded-md transition-colors duration-200 ${
                                  estActif(sousItem.chemin)
                                    ? 'bg-primary text-white'
                                    : 'text-gray-700 hover:bg-gray-100'
                                }`}
                              >
                                {sousItem.icone}
                                <span>{sousItem.nom}</span>
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={item.chemin || '#'}
                    className={`flex items-center p-2 text-base rounded-md transition-colors duration-200 ${
                      estActif(item.chemin)
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.icone}
                    <span>{item.nom}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="text-sm text-gray-600 text-center">
          ISIMemo Étudiant v1.0
        </div>
      </div>
    </div>
  );
};

export default Sidebar;