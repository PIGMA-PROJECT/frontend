import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiUsers, 
  FiGrid, 
  FiMessageSquare, 
  FiBookOpen, 
  FiChevronDown, 
  FiChevronRight,
  FiHome,
  FiPlusCircle,
  FiList,
  FiEdit,
  FiAlertCircle,
  FiUserCheck,
  FiSettings,
  FiUser,
  FiImage,
  FiFileText,
  FiDollarSign,
  FiCreditCard,
  FiClock,
  FiCalendar,
  FiVideo,
  FiMapPin
} from 'react-icons/fi';
import Logo from './Logo';

interface ElementMenu {
  nom: string;
  chemin?: string;
  icone: JSX.Element;
  sousmenu?: ElementMenu[];
}

const Sidebar: React.FC = () => {
  const emplacement = useLocation();
  const [menusOuverts, setMenusOuverts] = useState<{ [cle: string]: boolean }>({
    'Gestion du personnel': true,
    'Gestion des salles classes': false,
    'Paiement': false,
    'Calendrier': false,
  });

  const elementsMenu: ElementMenu[] = [
    {
      nom: 'Tableau de bord',
      chemin: '/',
      icone: <FiHome className="mr-2 h-5 w-5" />,
    },
    {
      nom: 'Gestion du personnel',
      icone: <FiUsers className="mr-2 h-5 w-5" />,
      sousmenu: [
        {
          nom: 'Départements',
          icone: <FiList className="mr-2 h-4 w-4" />,
          chemin: '/departements',
        },
        {
          nom: 'Ajouter un département',
          icone: <FiPlusCircle className="mr-2 h-4 w-4" />,
          chemin: '/departements/add',
        },
        {
          nom: 'Chefs de département',
          icone: <FiUserCheck className="mr-2 h-4 w-4" />,
          chemin: '/staff/chiefs',
        },
        {
          nom: 'Secrétaires',
          icone: <FiUserCheck className="mr-2 h-4 w-4" />,
          chemin: '/staff/secretaries',
        },
        {
          nom: 'Ajouter personnel',
          icone: <FiPlusCircle className="mr-2 h-4 w-4" />,
          chemin: '/staff/add',
        },
        {
          nom: 'Messages',
          icone: <FiMessageSquare className="mr-2 h-4 w-4" />,
          chemin: '/messages',
        },
        {
          nom: 'Notifications',
          icone: <FiAlertCircle className="mr-2 h-4 w-4" />,
          chemin: '/notifications',
        },
      ],
    },
    {
      nom: 'Calendrier',
      icone: <FiCalendar className="mr-2 h-5 w-5" />,
      sousmenu: [
        {
          nom: 'Voir le calendrier',
          icone: <FiCalendar className="mr-2 h-4 w-4" />,
          chemin: '/calendrier',
        },
        {
          nom: 'Ajouter un événement',
          icone: <FiPlusCircle className="mr-2 h-4 w-4" />,
          chemin: '/calendrier/ajouter',
        },
        {
          nom: 'Réunions en ligne',
          icone: <FiVideo className="mr-2 h-4 w-4" />,
          chemin: '/calendrier/reunions-en-ligne',
        },
        {
          nom: 'Événements présentiels',
          icone: <FiMapPin className="mr-2 h-4 w-4" />,
          chemin: '/calendrier/evenements-presentiels',
        },
      ],
    },
    {
      nom: 'Gestion des salles classes',
      icone: <FiGrid className="mr-2 h-5 w-5" />,
      sousmenu: [
        {
          nom: 'Liste des salles',
          icone: <FiList className="mr-2 h-4 w-4" />,
          chemin: '/classrooms',
        },
        {
          nom: 'Ajouter une salle',
          icone: <FiPlusCircle className="mr-2 h-4 w-4" />,
          chemin: '/classrooms/add',
        },
      ],
    },
    {
      nom: 'Paiement',
      icone: <FiDollarSign className="mr-2 h-5 w-5" />,
      sousmenu: [
        {
          nom: 'Mon abonnement',
          icone: <FiCreditCard className="mr-2 h-4 w-4" />,
          chemin: '/paiement/abonnement',
        },
        {
          nom: 'Historique des paiements',
          icone: <FiClock className="mr-2 h-4 w-4" />,
          chemin: '/paiement/historique',
        },
        {
          nom: 'Effectuer un paiement',
          icone: <FiPlusCircle className="mr-2 h-4 w-4" />,
          chemin: '/paiement/nouveau',
        },
      ],
    },
    {
      nom: 'Médiathèque',
      icone: <FiImage className="mr-2 h-5 w-5" />,
      chemin: '/mediatheque',
    },
    {
      nom: 'Profil',
      icone: <FiUser className="mr-2 h-5 w-5" />,
      chemin: '/profile',
    },
    // {
    //   nom: 'Paramètres',
    //   icone: <FiSettings className="mr-2 h-5 w-5" />,
    //   chemin: '/settings',
    // },
  ];

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

  return (
    <div className="w-64 h-full bg-white shadow-lg flex flex-col">
      <div className="p-2 border-b border-gray-200">
        <div className="flex items-center justify-center">
          <Logo />
        </div>
        <div className="mt-[9px] text-xs text-center text-gray-600">
          Plateforme d'administration
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {elementsMenu.map((item, index) => (
            <li key={index}>
              {item.sousmenu ? (
                <div className="mb-2">
                  <button
                    onClick={() => basculerMenu(item.nom)}
                    className={`flex items-center w-full p-2 text-base text-left rounded-md transition-colors duration-200 hover:bg-gray-100 ${
                      menusOuverts[item.nom] || sousmenuEstActif(item.sousmenu) ? 'bg-gray-100' : ''
                    }`}
                  >
                    {item.icone}
                    <span className="flex-1">{item.nom}</span>
                    {menusOuverts[item.nom] ? (
                      <FiChevronDown className="h-4 w-4" />
                    ) : (
                      <FiChevronRight className="h-4 w-4" />
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
                        {item.sousmenu.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <Link
                              to={subItem.chemin || '#'}
                              className={`flex items-center p-2 text-sm rounded-md transition-colors duration-200 ${
                                estActif(subItem.chemin)
                                  ? 'bg-primary text-white'
                                  : 'text-gray-700 hover:bg-gray-100'
                              }`}
                            >
                              {subItem.icone}
                              <span>{subItem.nom}</span>
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
          ))}
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