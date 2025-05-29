
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, User, Clock, Calendar, Edit, Trash2, Plus, Filter, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface CourseItem {
  id: number;
  name: string;
  department: string;
  professor: string;
  students: number;
  hours: number;
  startDate: string;
  active: boolean;
}

const COURSES_DATA: CourseItem[] = [
  { id: 1, name: "Programmation Orientée Objet", department: "Informatique", professor: "Dr. Moussa Diop", students: 35, hours: 45, startDate: "15/09/2025", active: true },
  { id: 2, name: "Algorithmes Avancés", department: "Informatique", professor: "Dr. Fatou Ndiaye", students: 28, hours: 40, startDate: "18/09/2025", active: true },
  { id: 3, name: "Base de Données", department: "Informatique", professor: "Dr. Omar Sall", students: 32, hours: 50, startDate: "20/09/2025", active: true },
  { id: 4, name: "Réseaux Informatiques", department: "Réseaux", professor: "Dr. Aminata Diallo", students: 30, hours: 48, startDate: "22/09/2025", active: true },
  { id: 5, name: "Sécurité Informatique", department: "Réseaux", professor: "Dr. Ibrahim Sow", students: 25, hours: 35, startDate: "25/09/2025", active: false },
  { id: 6, name: "Intelligence Artificielle", department: "Informatique", professor: "Dr. Cheikh Diop", students: 22, hours: 45, startDate: "01/10/2025", active: true },
  { id: 7, name: "Gestion de Projet", department: "Management", professor: "Dr. Aïda Fall", students: 38, hours: 30, startDate: "05/10/2025", active: true },
  { id: 8, name: "Développement Web", department: "Informatique", professor: "Dr. Moussa Diop", students: 40, hours: 60, startDate: "10/10/2025", active: true },
];

const Courses: React.FC = () => {
  const { user } = useAuth();
  const isChef = user?.role === 'chef';
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');

  // Filtrer les données
  const filteredCourses = COURSES_DATA.filter(course => {
    // Filtre de recherche
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.professor.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filtre d'état
    const matchesStatus = 
      activeFilter === 'all' || 
      (activeFilter === 'active' && course.active) || 
      (activeFilter === 'inactive' && !course.active);
    
    // Filtre de département
    const matchesDepartment = 
      departmentFilter === 'all' || 
      course.department === departmentFilter;
    
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

  // Toggle l'état actif/inactif d'un cours
  const toggleCourseActive = (id: number) => {
    console.log(`Toggle état du cours ${id}`);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold">Gestion des Cours</h1>
        
        {isChef && (
          <Link 
            to="/courses/add"
            className="mt-4 md:mt-0 flex items-center justify-center py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-1" />
            <span>Ajouter un cours</span>
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
              placeholder="Rechercher un cours ou professeur..."
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
              <option value="inactive">Inactifs</option>
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
      
      {/* Liste des cours */}
      {filteredCourses.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-2" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">Aucun cours trouvé</h2>
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
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cours</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Professeur</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Département</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Étudiants</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Heures</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Début</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">État</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCourses.map((course) => (
                  <motion.tr key={course.id} variants={itemVariants}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{course.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-400 mr-2" />
                        <div className="text-sm text-gray-900">{course.professor}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{course.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{course.students}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-400 mr-2" />
                        <div className="text-sm text-gray-900">{course.hours}h</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <div className="text-sm text-gray-900">{course.startDate}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        course.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {course.active ? 'Actif' : 'Inactif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <Link to={`/courses/${course.id}`} className="text-primary hover:text-primary-700">
                          <Edit className="h-4 w-4" />
                        </Link>
                        
                        {isChef && (
                          <button
                            onClick={() => toggleCourseActive(course.id)}
                            className={`${
                              course.active
                                ? 'text-red-600 hover:text-red-700'
                                : 'text-green-600 hover:text-green-700'
                            }`}
                          >
                            {course.active ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                          </button>
                        )}
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

export default Courses;
