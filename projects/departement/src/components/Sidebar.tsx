import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Grid, 
  MessageSquare, 
  BookOpen, 
  ChevronDown, 
  ChevronRight,
  Home,
  PlusCircle,
  List,
  Edit,
  AlertCircle,
  UserCheck,
  Settings,
  User,
  Image,
  FileText,
  Clock,
  Calendar,
  Video,
  MapPin,
  Presentation
} from 'lucide-react';
import Logo from './Logo';

interface ElementMenu {
  nom: string;
  chemin?: string;
  icone: React.ReactNode;
  sousmenu?: ElementMenu[];
  role?: 'chef' | 'secretaire' | 'all';
}

interface PropsSidebar {
  estVisible: boolean;
  roleUtilisateur: 'chef' | 'secretaire';
}

const Sidebar: React.FC<PropsSidebar> = ({ estVisible, roleUtilisateur }) => {
  const emplacement = useLocation();
  const [menusOuverts, setMenusOuverts] = useState<{ [cle: string]: boolean }>({
    'Gestion des classes': false,
    'Gestion des cours': false,
    'Gestion des étudiants': false,
    'Gestion des professeurs': false,
    'Gestion du calendrier': false,
    'Gestion des mémoires': false,
    'Gestion des jurys': false,
    'Gestion des soutenances': false,
    'Médiathèque': false,
    'Notifications': false,
  });

  const elementsMenu: ElementMenu[] = [
    {
      nom: 'Tableau de bord',
      chemin: '/dashboard',
      icone: <Home className="mr-2 h-5 w-5" />,
      role: 'all'
    },
    {
      nom: 'Gestion des classes',
      icone: <Grid className="mr-2 h-5 w-5" />,
      role: 'all',
      sousmenu: [
        {
          nom: 'Liste des classes',
          icone: <List className="mr-2 h-4 w-4" />,
          chemin: '/classes',
          role: 'all'
        },
        {
          nom: 'Ajouter une classe',
          icone: <PlusCircle className="mr-2 h-4 w-4" />,
          chemin: '/classes/add',
          role: 'chef'
        },
        {
          nom: 'Activer/Désactiver',
          icone: <Settings className="mr-2 h-4 w-4" />,
          chemin: '/classes/toggle',
          role: 'chef'
        },
      ],
    },
    {
      nom: 'Gestion des cours',
      icone: <BookOpen className="mr-2 h-5 w-5" />,
      role: 'all',
      sousmenu: [
        {
          nom: 'Liste des cours',
          icone: <List className="mr-2 h-4 w-4" />,
          chemin: '/courses',
          role: 'all'
        },
        {
          nom: 'Ajouter un cours',
          icone: <PlusCircle className="mr-2 h-4 w-4" />,
          chemin: '/courses/add',
          role: 'chef'
        },
        {
          nom: 'Bloquer/Débloquer',
          icone: <Settings className="mr-2 h-4 w-4" />,
          chemin: '/courses/toggle',
          role: 'chef'
        },
        {
          nom: 'Affecter à une classe',
          icone: <Edit className="mr-2 h-4 w-4" />,
          chemin: '/courses/assign-class',
          role: 'all'
        },
      ],
    },
    {
      nom: 'Gestion des étudiants',
      icone: <Users className="mr-2 h-5 w-5" />,
      role: 'all',
      sousmenu: [
        {
          nom: 'Liste des étudiants',
          icone: <List className="mr-2 h-4 w-4" />,
          chemin: '/students',
          role: 'all'
        },
        {
          nom: 'Importer (Excel/CSV)',
          icone: <PlusCircle className="mr-2 h-4 w-4" />,
          chemin: '/students/import',
          role: 'all'
        },
        {
          nom: 'Bloquer/Débloquer',
          icone: <Settings className="mr-2 h-4 w-4" />,
          chemin: '/students/toggle',
          role: 'all'
        },
      ],
    },
    {
      nom: 'Gestion des professeurs',
      icone: <UserCheck className="mr-2 h-5 w-5" />,
      role: 'all',
      sousmenu: [
        {
          nom: 'Liste des professeurs',
          icone: <List className="mr-2 h-4 w-4" />,
          chemin: '/professors',
          role: 'all'
        },
        {
          nom: 'Ajouter un professeur',
          icone: <PlusCircle className="mr-2 h-4 w-4" />,
          chemin: '/professors/add',
          role: 'chef'
        },
        {
          nom: 'Affecter des cours',
          icone: <Edit className="mr-2 h-4 w-4" />,
          chemin: '/professors/assign-courses',
          role: 'all'
        },
        {
          nom: 'Bloquer/Débloquer',
          icone: <Settings className="mr-2 h-4 w-4" />,
          chemin: '/professors/toggle',
          role: 'chef'
        },
      ],
    },
    {
      nom: 'Gestion du calendrier',
      icone: <Calendar className="mr-2 h-5 w-5" />,
      role: 'all',
      sousmenu: [
        {
          nom: 'Consulter calendrier',
          icone: <List className="mr-2 h-4 w-4" />,
          chemin: '/calendrier',
          role: 'all'
        },
        {
          nom: 'Ajouter un événement',
          icone: <PlusCircle className="mr-2 h-4 w-4" />,
          chemin: '/calendrier/ajouter',
          role: 'all'
        },
      ],
    },
    {
      nom: 'Gestion des mémoires',
      icone: <FileText className="mr-2 h-5 w-5" />,
      role: 'all',
      sousmenu: [
        {
          nom: 'Médiathèque',
          icone: <Image className="mr-2 h-4 w-4" />,
          chemin: '/memoires/mediatheque',
          role: 'all'
        },
        {
          nom: 'Activation/Désactivation',
          icone: <Settings className="mr-2 h-4 w-4" />,
          chemin: '/memoires/toggle',
          role: 'all'
        },
        {
          nom: 'Ajout du canevas',
          icone: <PlusCircle className="mr-2 h-4 w-4" />,
          chemin: '/memoires/canevas-add',
          role: 'all'
        },
        {
          nom: 'Gestion canevas',
          icone: <Edit className="mr-2 h-4 w-4" />,
          chemin: '/memoires/canevas-manage',
          role: 'all'
        },
      ],
    },
    {
      nom: 'Gestion des jurys',
      icone: <Users className="mr-2 h-5 w-5" />,
      role: 'all',
      sousmenu: [
        {
          nom: 'Liste des jurys',
          icone: <List className="mr-2 h-4 w-4" />,
          chemin: '/jurys',
          role: 'all'
        },
        {
          nom: 'Créer un jury',
          icone: <PlusCircle className="mr-2 h-4 w-4" />,
          chemin: '/jurys/add',
          role: 'all'
        },
        {
          nom: 'Modifier un jury',
          icone: <Edit className="mr-2 h-4 w-4" />,
          chemin: '/jurys/edit',
          role: 'all'
        },
      ],
    },
    {
      nom: 'Gestion des soutenances',
      icone: <Video className="mr-2 h-5 w-5" />,
      role: 'all',
      sousmenu: [
        {
          nom: 'Liste des soutenances',
          icone: <List className="mr-2 h-4 w-4" />,
          chemin: '/soutenances',
          role: 'all'
        },
        {
          nom: 'Organiser soutenance',
          icone: <PlusCircle className="mr-2 h-4 w-4" />,
          chemin: '/soutenances/add',
          role: 'all'
        },
        {
          nom: 'Modifier soutenance',
          icone: <Edit className="mr-2 h-4 w-4" />,
          chemin: '/soutenances/edit',
          role: 'all'
        },
      ],
    },
    {
      nom: 'Médiathèque',
      icone: <Image className="mr-2 h-5 w-5" />,
      role: 'all',
      sousmenu: [
        {
          nom: 'Consulter',
          icone: <List className="mr-2 h-4 w-4" />,
          chemin: '/mediatheque',
          role: 'all'
        },
        {
          nom: 'Ajouter un document',
          icone: <PlusCircle className="mr-2 h-4 w-4" />,
          chemin: '/mediatheque/add',
          role: 'all'
        },
        {
          nom: 'Archivage',
          icone: <Clock className="mr-2 h-4 w-4" />,
          chemin: '/mediatheque/archive',
          role: 'all'
        },
        {
          nom: 'Désactiver',
          icone: <Settings className="mr-2 h-4 w-4" />,
          chemin: '/mediatheque/toggle',
          role: 'all'
        },
      ],
    },
    {
      nom: 'Notifications',
      icone: <AlertCircle className="mr-2 h-5 w-5" />,
      role: 'all',
      sousmenu: [
        {
          nom: 'Pour professeurs',
          icone: <UserCheck className="mr-2 h-4 w-4" />,
          chemin: '/notifications/professors',
          role: 'all'
        },
        {
          nom: 'Pour étudiants',
          icone: <Users className="mr-2 h-4 w-4" />,
          chemin: '/notifications/students',
          role: 'all'
        },
        {
          nom: 'Messagerie',
          icone: <MessageSquare className="mr-2 h-4 w-4" />,
          chemin: '/notifications/messages',
          role: 'all'
        },
      ],
    },
    {
      nom: 'Chatbot',
      chemin: '/chatbot',
      icone: <MessageSquare className="mr-2 h-5 w-5" />,
      role: 'all'
    },
    {
      nom: 'Profil',
      chemin: '/profile',
      icone: <User className="mr-2 h-5 w-5" />,
      role: 'all'
    },
    {
      nom: 'Paramètres',
      chemin: '/settings',
      icone: <Settings className="mr-2 h-5 w-5" />,
      role: 'all'
    },
  ];

  const menuFiltre = elementsMenu.filter(
    item => item.role === 'all' || item.role === roleUtilisateur
  );

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
          {roleUtilisateur === 'chef' ? 'Chef de département' : 'Secrétaire'}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {menuFiltre.map((item, index) => {
            // Filtrer le sous-menu en fonction du rôle
            const sousmenuFiltre = item.sousmenu?.filter(
              subItem => subItem.role === 'all' || subItem.role === roleUtilisateur
            );
            
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
          ISIMemo Admin v1.0
        </div>
      </div>
    </div>
  );
};

export default Sidebar;