
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, User, BookOpen, UserPlus, Phone, Mail, Filter, Edit, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProfessorItem {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  courses: number;
  hireDate: string;
  active: boolean;
}

const PROFESSORS_DATA: ProfessorItem[] = [
  { id: 1, firstName: "Moussa", lastName: "Diop", email: "moussa.diop@faculty.edu.sn", phone: "77 123 45 67", department: "Informatique", courses: 3, hireDate: "01/09/2020", active: true },
  { id: 2, firstName: "Fatou", lastName: "Ndiaye", email: "fatou.ndiaye@faculty.edu.sn", phone: "76 234 56 78", department: "Informatique", courses: 2, hireDate: "15/10/2019", active: true },
  { id: 3, firstName: "Omar", lastName: "Sall", email: "omar.sall@faculty.edu.sn", phone: "78 345 67 89", department: "Informatique", courses: 2, hireDate: "01/09/2021", active: true },
  { id: 4, firstName: "Aminata", lastName: "Diallo", email: "aminata.diallo@faculty.edu.sn", phone: "70 456 78 90", department: "Réseaux", courses: 1, hireDate: "01/09/2022", active: true },
  { id: 5, firstName: "Ibrahim", lastName: "Sow", email: "ibrahim.sow@faculty.edu.sn", phone: "77 567 89 01", department: "Réseaux", courses: 1, hireDate: "15/01/2023", active: false },
  { id: 6, firstName: "Cheikh", lastName: "Diop", email: "cheikh.diop@faculty.edu.sn", phone: "76 678 90 12", department: "Informatique", courses: 1, hireDate: "01/09/2021", active: true },
  { id: 7, firstName: "Aïda", lastName: "Fall", email: "aida.fall@faculty.edu.sn", phone: "70 789 01 23", department: "Management", courses: 1, hireDate: "01/09/2020", active: true },
];

const Professors: React.FC = () => {
  const { user } = useAuth();
  const isChef = user?.role === 'chef';
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');

  // Filtrer les données
  const filteredProfessors = PROFESSORS_DATA.filter(professor => {
    // Filtre de recherche
    const matchesSearch = professor.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          professor.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          professor.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filtre d'état
    const matchesStatus = 
      activeFilter === 'all' || 
      (activeFilter === 'active' && professor.active) || 
      (activeFilter === 'inactive' && !professor.active);
    
    // Filtre de département
    const matchesDepartment = 
      departmentFilter === 'all' || 
      professor.department === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Toggle l'état actif/inactif d'un professeur
  const toggleProfessorActive = (id: number) => {
    console.log(`Toggle état du professeur ${id}`);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold">Gestion des Professeurs</h1>
        
        {isChef && (
          <Link 
            to="/professors/add"
            className="mt-4 md:mt-0 flex items-center justify-center py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            <UserPlus className="h-5 w-5 mr-1" />
            <span>Ajouter un professeur</span>
          </Link>
        )}
      </div>
      
      {/* Filtres et recherche */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Recherche */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Rechercher un professeur..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          {/* Filtre d'état */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">État</label>
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value as 'all' | 'active' | 'inactive')}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
            >
              <option value="all">Tous les états</option>
              <option value="active">Actifs</option>
              <option value="inactive">Bloqués</option>
            </select>
            <Filter className="absolute right-3 top-[60%] transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
          </div>
          
          {/* Filtre de département */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Département</label>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
            >
              <option value="all">Tous les départements</option>
              <option value="Informatique">Informatique</option>
              <option value="Réseaux">Réseaux</option>
              <option value="Management">Management</option>
            </select>
            <Filter className="absolute right-3 top-[60%] transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
          </div>
        </div>
      </div>
      
      {/* Liste des professeurs */}
      {filteredProfessors.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <User className="h-12 w-12 mx-auto text-gray-400 mb-2" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">Aucun professeur trouvé</h2>
          <p className="text-gray-500">Essayez de modifier vos critères de recherche ou filtres.</p>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProfessors.map((professor) => (
            <motion.div
              key={professor.id}
              variants={itemVariants}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="h-12 w-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center text-primary">
                      <span className="text-lg font-medium">
                        {professor.firstName.charAt(0)}{professor.lastName.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-bold">{professor.lastName} {professor.firstName}</h3>
                      <p className="text-sm text-gray-600">{professor.department}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    professor.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {professor.active ? 'Actif' : 'Bloqué'}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{professor.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{professor.phone}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <BookOpen className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{professor.courses} cours</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-500">Depuis {professor.hireDate}</span>
                  
                  <div className="flex space-x-3">
                    <Link to={`/professors/${professor.id}`} className="text-primary hover:text-primary-700 p-1">
                      <Edit className="h-4 w-4" />
                    </Link>
                    
                    {isChef && (
                      <button
                        onClick={() => toggleProfessorActive(professor.id)}
                        className={`p-1 ${
                          professor.active
                            ? 'text-red-600 hover:text-red-700'
                            : 'text-green-600 hover:text-green-700'
                        }`}
                      >
                        {professor.active ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Professors;
