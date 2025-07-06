
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Edit, 
  Mail, 
  Phone, 
  Calendar, 
  BookOpen, 
  Check, 
  X 
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const PROFESSORS_DATA = [
  { id: 1, firstName: "Moussa", lastName: "Diop", email: "moussa.diop@faculty.edu.sn", phone: "77 123 45 67", department: "Informatique", courses: 3, hireDate: "01/09/2020", active: true },
  { id: 2, firstName: "Fatou", lastName: "Ndiaye", email: "fatou.ndiaye@faculty.edu.sn", phone: "76 234 56 78", department: "Informatique", courses: 2, hireDate: "15/10/2019", active: true },
  { id: 3, firstName: "Omar", lastName: "Sall", email: "omar.sall@faculty.edu.sn", phone: "78 345 67 89", department: "Informatique", courses: 2, hireDate: "01/09/2021", active: true },
  { id: 4, firstName: "Aminata", lastName: "Diallo", email: "aminata.diallo@faculty.edu.sn", phone: "70 456 78 90", department: "Réseaux", courses: 1, hireDate: "01/09/2022", active: true },
  { id: 5, firstName: "Ibrahim", lastName: "Sow", email: "ibrahim.sow@faculty.edu.sn", phone: "77 567 89 01", department: "Réseaux", courses: 1, hireDate: "15/01/2023", active: false },
];

const ASSIGNED_COURSES = [
  { id: 1, name: "Programmation Orientée Objet", department: "Informatique", hours: 45 },
  { id: 2, name: "Algorithmes Avancés", department: "Informatique", hours: 40 },
  { id: 8, name: "Développement Web", department: "Informatique", hours: 60 },
];

const ProfessorDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isChef = user?.role === 'chef';
  const [activeTab, setActiveTab] = useState<'info' | 'courses'>('info');
  
  const professorId = parseInt(id || '0');
  const professorData = PROFESSORS_DATA.find(p => p.id === professorId);
  
  if (!professorData) {
    return (
      <div className="flex flex-col items-center justify-center p-10">
        <h2 className="text-2xl font-bold mb-4">Professeur non trouvé</h2>
        <button
          onClick={() => navigate('/professors')}
          className="flex items-center text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à la liste des professeurs
        </button>
      </div>
    );
  }

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
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };
  
  const toggleActiveProfessor = () => {
    console.log(`Toggle état du professeur ${professorId}`);
  };

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={() => navigate('/professors')}
          className="flex items-center text-gray-600 hover:text-primary mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à la liste des professeurs
        </button>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center">
            <div className="h-16 w-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center text-primary mr-4">
              <span className="text-2xl font-medium">
                {professorData.firstName.charAt(0)}{professorData.lastName.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                {professorData.lastName} {professorData.firstName}
                <span className={`ml-3 px-2 py-1 text-xs rounded-full ${
                  professorData.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {professorData.active ? 'Actif' : 'Bloqué'}
                </span>
              </h1>
              <p className="text-gray-600">Professeur - {professorData.department}</p>
            </div>
          </div>
          
          {isChef && (
            <div className="mt-4 md:mt-0 flex items-center space-x-3">
              <button
                onClick={() => navigate(`/professors/${professorId}/edit`)}
                className="flex items-center justify-center py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-700 transition-colors"
              >
                <Edit className="h-4 w-4 mr-1" />
                <span>Modifier</span>
              </button>
              
              <button
                onClick={toggleActiveProfessor}
                className={`flex items-center justify-center py-2 px-4 ${
                  professorData.active 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-green-600 hover:bg-green-700'
                } text-white rounded-md transition-colors`}
              >
                {professorData.active ? (
                  <>
                    <X className="h-4 w-4 mr-1" />
                    <span>Bloquer</span>
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    <span>Débloquer</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('info')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'info'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Informations
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'courses'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Cours enseignés ({professorData.courses})
          </button>
        </nav>
      </div>
      
      {/* Tab Content */}
      {activeTab === 'info' && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4">Informations personnelles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-md">{professorData.lastName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-md">{professorData.firstName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-md flex items-center">
                    <Mail className="h-4 w-4 text-primary mr-2" />
                    {professorData.email}
                  </p>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-md flex items-center">
                    <Phone className="h-4 w-4 text-primary mr-2" />
                    {professorData.phone}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Département</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-md">{professorData.department}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date d'embauche</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-md flex items-center">
                    <Calendar className="h-4 w-4 text-primary mr-2" />
                    {professorData.hireDate}
                  </p>
                </div>
              </motion.div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-md font-bold mb-2">Statistiques</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="bg-gray-50 p-4 rounded-md text-center">
                  <div className="text-2xl font-bold text-primary">{professorData.courses}</div>
                  <div className="text-sm text-gray-600">Cours</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-md text-center">
                  <div className="text-2xl font-bold text-green-600">145</div>
                  <div className="text-sm text-gray-600">Heures enseignées</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-md text-center">
                  <div className="text-2xl font-bold text-blue-600">3</div>
                  <div className="text-sm text-gray-600">Classes</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-md text-center">
                  <div className="text-2xl font-bold text-purple-600">86%</div>
                  <div className="text-sm text-gray-600">Taux de satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      
      {activeTab === 'courses' && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Cours enseignés</h2>
              
              {isChef && (
                <button
                  onClick={() => navigate(`/professors/${professorId}/assign-courses`)}
                  className="flex items-center justify-center py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-700 transition-colors"
                >
                  <span>Assigner un cours</span>
                </button>
              )}
            </div>
            
            {ASSIGNED_COURSES.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cours</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Département</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Heures</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {ASSIGNED_COURSES.map(course => (
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
                          <div className="text-sm text-gray-900">{course.department}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{course.hours}h</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => navigate(`/courses/${course.id}`)}
                            className="text-primary hover:underline"
                          >
                            Voir le cours
                          </button>
                          {isChef && (
                            <button
                              onClick={() => console.log(`Retirer le cours ${course.id}`)}
                              className="ml-4 text-red-600 hover:underline"
                            >
                              Retirer
                            </button>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500 mb-4">Ce professeur n'enseigne aucun cours actuellement.</p>
                {isChef && (
                  <button
                    onClick={() => navigate(`/professors/${professorId}/assign-courses`)}
                    className="text-primary hover:underline"
                  >
                    Assigner un cours
                  </button>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProfessorDetail;
