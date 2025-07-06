
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, User, GraduationCap, UserPlus, Download, Upload, Filter, Edit, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface StudentItem {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  class: string;
  level: string;
  registrationDate: string;
  active: boolean;
}

const STUDENTS_DATA: StudentItem[] = [
  { id: 1, firstName: "Amadou", lastName: "Diop", email: "amadou.diop@student.edu.sn", class: "Informatique - L1", level: "Licence 1", registrationDate: "01/09/2025", active: true },
  { id: 2, firstName: "Fatou", lastName: "Ndiaye", email: "fatou.ndiaye@student.edu.sn", class: "Informatique - L1", level: "Licence 1", registrationDate: "02/09/2025", active: true },
  { id: 3, firstName: "Modou", lastName: "Sall", email: "modou.sall@student.edu.sn", class: "Informatique - L2", level: "Licence 2", registrationDate: "01/09/2024", active: true },
  { id: 4, firstName: "Aïda", lastName: "Diallo", email: "aida.diallo@student.edu.sn", class: "Informatique - L2", level: "Licence 2", registrationDate: "03/09/2024", active: false },
  { id: 5, firstName: "Abdoulaye", lastName: "Mbaye", email: "abdoulaye.mbaye@student.edu.sn", class: "Informatique - L3", level: "Licence 3", registrationDate: "01/09/2023", active: true },
  { id: 6, firstName: "Mariama", lastName: "Sow", email: "mariama.sow@student.edu.sn", class: "Informatique - L3", level: "Licence 3", registrationDate: "02/09/2023", active: true },
  { id: 7, firstName: "Ibrahima", lastName: "Fall", email: "ibrahima.fall@student.edu.sn", class: "Réseaux - L2", level: "Licence 2", registrationDate: "01/09/2024", active: true },
  { id: 8, firstName: "Sophie", lastName: "Mendy", email: "sophie.mendy@student.edu.sn", class: "Réseaux - L1", level: "Licence 1", registrationDate: "03/09/2025", active: true },
];

const Students: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [levelFilter, setLevelFilter] = useState<string>('all');

  // Filtrer les données
  const filteredStudents = STUDENTS_DATA.filter(student => {
    // Filtre de recherche
    const matchesSearch = student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filtre d'état
    const matchesStatus = 
      activeFilter === 'all' || 
      (activeFilter === 'active' && student.active) || 
      (activeFilter === 'inactive' && !student.active);
    
    // Filtre de niveau
    const matchesLevel = 
      levelFilter === 'all' || 
      student.level === levelFilter;
    
    return matchesSearch && matchesStatus && matchesLevel;
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

  // Toggle l'état actif/inactif d'un étudiant
  const toggleStudentActive = (id: number) => {
    console.log(`Toggle état de l'étudiant ${id}`);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold">Gestion des Étudiants</h1>
        
        <div className="mt-4 md:mt-0 flex items-center space-x-3">
          <button className="flex items-center justify-center py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            <Upload className="h-5 w-5 mr-1" />
            <span>Importer (CSV)</span>
          </button>
          
          <button className="flex items-center justify-center py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            <Download className="h-5 w-5 mr-1" />
            <span>Exporter</span>
          </button>
          
          <Link 
            to="/students/add"
            className="flex items-center justify-center py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            <UserPlus className="h-5 w-5 mr-1" />
            <span>Ajouter</span>
          </Link>
        </div>
      </div>
      
      {/* Filtres et recherche */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Recherche */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Rechercher un étudiant..."
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
          
          {/* Filtre de niveau */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
            >
              <option value="all">Tous les niveaux</option>
              <option value="Licence 1">Licence 1</option>
              <option value="Licence 2">Licence 2</option>
              <option value="Licence 3">Licence 3</option>
              <option value="Master 1">Master 1</option>
              <option value="Master 2">Master 2</option>
            </select>
            <Filter className="absolute right-3 top-[60%] transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
          </div>
        </div>
      </div>
      
      {/* Liste des étudiants */}
      {filteredStudents.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <User className="h-12 w-12 mx-auto text-gray-400 mb-2" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">Aucun étudiant trouvé</h2>
          <p className="text-gray-500">Essayez de modifier vos critères de recherche ou filtres.</p>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-lg shadow-sm overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Étudiant</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Classe</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Niveau</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inscription</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">État</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <motion.tr key={student.id} variants={itemVariants}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 font-medium">
                            {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{student.lastName} {student.firstName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{student.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <GraduationCap className="h-4 w-4 text-gray-400 mr-2" />
                        <div className="text-sm text-gray-900">{student.class}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{student.level}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{student.registrationDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        student.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {student.active ? 'Actif' : 'Bloqué'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <Link to={`/students/${student.id}`} className="text-primary hover:text-primary-700">
                          <Edit className="h-4 w-4" />
                        </Link>
                        
                        <button
                          onClick={() => toggleStudentActive(student.id)}
                          className={`${
                            student.active
                              ? 'text-red-600 hover:text-red-700'
                              : 'text-green-600 hover:text-green-700'
                          }`}
                        >
                          {student.active ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Students;
