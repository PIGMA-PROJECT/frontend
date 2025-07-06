
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Edit, 
  User, 
  Clock, 
  Calendar, 
  Check, 
  X 
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const COURSES_DATA = [
  { id: 1, name: "Programmation Orientée Objet", department: "Informatique", professor: "Dr. Moussa Diop", students: 35, hours: 45, startDate: "15/09/2025", active: true },
  { id: 2, name: "Algorithmes Avancés", department: "Informatique", professor: "Dr. Fatou Ndiaye", students: 28, hours: 40, startDate: "18/09/2025", active: true },
  { id: 3, name: "Base de Données", department: "Informatique", professor: "Dr. Omar Sall", students: 32, hours: 50, startDate: "20/09/2025", active: true },
  { id: 4, name: "Réseaux Informatiques", department: "Réseaux", professor: "Dr. Aminata Diallo", students: 30, hours: 48, startDate: "22/09/2025", active: true },
  { id: 5, name: "Sécurité Informatique", department: "Réseaux", professor: "Dr. Ibrahim Sow", students: 25, hours: 35, startDate: "25/09/2025", active: false },
];

const CLASSES_ASSIGNED = [
  { id: 1, name: "Informatique - L1", level: "Licence 1" },
  { id: 3, name: "Informatique - L3", level: "Licence 3" },
];

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isChef = user?.role === 'chef';
  const [activeTab, setActiveTab] = useState<'info' | 'classes'>('info');
  
  const courseId = parseInt(id || '0');
  const courseData = COURSES_DATA.find(c => c.id === courseId);
  
  if (!courseData) {
    return (
      <div className="flex flex-col items-center justify-center p-10">
        <h2 className="text-2xl font-bold mb-4">Cours non trouvé</h2>
        <button
          onClick={() => navigate('/courses')}
          className="flex items-center text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à la liste des cours
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
  
  const toggleActiveCourse = () => {
    console.log(`Toggle état du cours ${courseId}`);
  };

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={() => navigate('/courses')}
          className="flex items-center text-gray-600 hover:text-primary mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à la liste des cours
        </button>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold flex items-center">
            {courseData.name}
            <span className={`ml-3 px-2 py-1 text-xs rounded-full ${
              courseData.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {courseData.active ? 'Actif' : 'Inactif'}
            </span>
          </h1>
          
          {isChef && (
            <div className="mt-4 md:mt-0 flex items-center space-x-3">
              <button
                onClick={() => navigate(`/courses/${courseId}/edit`)}
                className="flex items-center justify-center py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-700 transition-colors"
              >
                <Edit className="h-4 w-4 mr-1" />
                <span>Modifier</span>
              </button>
              
              <button
                onClick={toggleActiveCourse}
                className={`flex items-center justify-center py-2 px-4 ${
                  courseData.active 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-green-600 hover:bg-green-700'
                } text-white rounded-md transition-colors`}
              >
                {courseData.active ? (
                  <>
                    <X className="h-4 w-4 mr-1" />
                    <span>Désactiver</span>
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    <span>Activer</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
        
        <p className="text-gray-600 mt-1">Département de {courseData.department}</p>
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
            onClick={() => setActiveTab('classes')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'classes'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Classes assignées ({CLASSES_ASSIGNED.length})
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
            <h2 className="text-lg font-bold mb-4">Détails du cours</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom du cours</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-md">{courseData.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Département</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-md">{courseData.department}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Professeur</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-md flex items-center">
                    <User className="h-4 w-4 text-primary mr-2" />
                    {courseData.professor}
                  </p>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre d'étudiants</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-md flex items-center">
                    <User className="h-4 w-4 text-primary mr-2" />
                    {courseData.students} étudiants
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Heures</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-md flex items-center">
                    <Clock className="h-4 w-4 text-primary mr-2" />
                    {courseData.hours} heures
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-md flex items-center">
                    <Calendar className="h-4 w-4 text-primary mr-2" />
                    {courseData.startDate}
                  </p>
                </div>
              </motion.div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-md font-bold mb-2">Description</h3>
              <p className="text-gray-700">
                Ce cours fait partie du programme d'enseignement du département de {courseData.department}. 
                Il est dispensé par {courseData.professor} et vise à fournir aux étudiants les compétences 
                nécessaires dans le domaine concerné.
              </p>
            </div>
          </div>
        </motion.div>
      )}
      
      {activeTab === 'classes' && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Classes assignées</h2>
              
              <button
                onClick={() => navigate(`/courses/${courseId}/assign-classes`)}
                className="flex items-center justify-center py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-700 transition-colors"
              >
                <span>Assigner à d'autres classes</span>
              </button>
            </div>
            
            {CLASSES_ASSIGNED.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {CLASSES_ASSIGNED.map(classItem => (
                  <motion.div
                    key={classItem.id}
                    variants={itemVariants}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="font-medium">{classItem.name}</h3>
                    <p className="text-sm text-gray-600">{classItem.level}</p>
                    <div className="mt-2 flex justify-end">
                      <button
                        onClick={() => navigate(`/classes/${classItem.id}`)}
                        className="text-xs text-primary hover:underline"
                      >
                        Voir la classe
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500 mb-4">Ce cours n'est assigné à aucune classe.</p>
                <button
                  onClick={() => navigate(`/courses/${courseId}/assign-classes`)}
                  className="text-primary hover:underline"
                >
                  Assigner à une classe
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CourseDetail;
