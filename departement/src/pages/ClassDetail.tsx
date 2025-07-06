import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  User, 
  FileText, 
  Check, 
  X,
  Eye,
  BookOpen,
  Calendar,
  GraduationCap,
  Building,
  Users,
  Menu,
  Grid,
  Clock,
  Sparkles,
  Bookmark,
  Layers,
  Plus
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const CLASSES_DATA = [
  { id: 1, name: "Informatique - L1", level: "Licence 1", students: 45, courses: 8, active: true },
  { id: 2, name: "Informatique - L2", level: "Licence 2", students: 38, courses: 10, active: true },
  { id: 3, name: "Informatique - L3", level: "Licence 3", students: 32, courses: 12, active: true },
  { id: 4, name: "Informatique - M1", level: "Master 1", students: 25, courses: 8, active: true },
  { id: 5, name: "Informatique - M2", level: "Master 2", students: 20, courses: 6, active: true },
];

const STUDENTS_DATA = [
  { id: 1, firstName: "Amadou", lastName: "Diop", email: "amadou.diop@student.edu.sn", active: true },
  { id: 2, firstName: "Fatou", lastName: "Ndiaye", email: "fatou.ndiaye@student.edu.sn", active: true },
  { id: 3, firstName: "Modou", lastName: "Sall", email: "modou.sall@student.edu.sn", active: true },
  { id: 4, firstName: "Aïda", lastName: "Diallo", email: "aida.diallo@student.edu.sn", active: false },
  { id: 5, firstName: "Abdoulaye", lastName: "Mbaye", email: "abdoulaye.mbaye@student.edu.sn", active: true },
];

const COURSES_DATA = [
  { id: 1, name: "Programmation Orientée Objet", department: "Informatique", professor: "Dr. Moussa Diop", active: true },
  { id: 2, name: "Algorithmes Avancés", department: "Informatique", professor: "Dr. Fatou Ndiaye", active: true },
  { id: 3, name: "Base de Données", department: "Informatique", professor: "Dr. Omar Sall", active: true },
  { id: 4, name: "Réseaux Informatiques", department: "Réseaux", professor: "Dr. Aminata Diallo", active: false },
  { id: 5, name: "Intelligence Artificielle", department: "Informatique", professor: "Dr. Cheikh Diop", active: true },
];

type StudentItem = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  active: boolean;
};

type CourseItem = {
  id: number;
  name: string;
  department: string;
  professor: string;
  active: boolean;
};

// Toggle Switch Component moderne et élégant
const ModernToggle: React.FC<{
  active: boolean;
  onChange: () => void;
}> = ({ active, onChange }) => {
  return (
    <div 
      onClick={onChange}
      className="relative flex items-center cursor-pointer"
    >
      <div className={`
        w-12 h-6 rounded-full transition-all duration-300 ease-in-out
        ${active ? 'bg-gradient-to-r from-navy to-navy-light shadow-inner' : 'bg-gradient-to-r from-red-500 to-red-400 shadow-inner'}
      `}>
        <div className={`
          absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ease-in-out flex items-center justify-center
          ${active ? 'translate-x-6' : 'translate-x-0'}
        `}>
          <motion.div 
            initial={false}
            animate={{ rotate: active ? 0 : 180 }}
            transition={{ duration: 0.3 }}
            className="text-xs"
          >
            {active ? <Check className="h-3 w-3 text-navy opacity-70" /> : <X className="h-3 w-3 text-red-500 opacity-70" />}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Carte moderne et stylée
const ModernCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  withHover?: boolean;
}> = ({ children, className = "", withHover = true }) => {
  return (
    <div 
      className={`
        bg-white backdrop-blur-sm bg-opacity-95 rounded-xl shadow-sm hover:shadow-md transition-all duration-300
        border border-gray-100 overflow-hidden
        ${withHover ? 'hover:-translate-y-1 transform' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

// Bouton moderne et stylé
const ModernButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
}> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  className = "",
  icon 
}) => {
  const baseClasses = "rounded-lg font-medium transition-all duration-200 flex items-center justify-center";
  const sizeClasses = {
    sm: "py-1.5 px-3 text-sm",
    md: "py-2 px-4",
    lg: "py-3 px-6 text-lg"
  };
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-navy to-navy-light text-white shadow-sm hover:shadow hover:from-navy-dark hover:to-navy",
    secondary: "bg-gray-50 text-navy hover:bg-gray-100",
    outline: "border border-navy text-navy hover:bg-navy hover:text-white",
    ghost: "text-navy hover:bg-navy hover:bg-opacity-10"
  };
  
  return (
    <button 
      onClick={onClick}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

// IconButton moderne
const IconButton: React.FC<{
  icon: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  title?: string;
  className?: string;
}> = ({ 
  icon, 
  onClick, 
  variant = 'ghost',
  title,
  className = ""
}) => {
  const variantClasses = {
    primary: "bg-gradient-to-r from-navy to-navy-light text-white shadow-sm hover:shadow",
    secondary: "bg-gray-50 text-gray-700 hover:bg-gray-100",
    outline: "border border-gray-200 text-gray-700 hover:border-navy hover:text-navy",
    ghost: "text-gray-500 hover:text-navy hover:bg-navy hover:bg-opacity-5"
  };
  
  return (
    <button 
      onClick={onClick}
      title={title}
      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${variantClasses[variant]} ${className}`}
    >
      {icon}
    </button>
  );
};

// Badge moderne
const Badge: React.FC<{
  children: React.ReactNode;
  variant?: 'green' | 'red' | 'blue' | 'gray';
}> = ({ 
  children, 
  variant = 'gray' 
}) => {
  const variantClasses = {
    green: "bg-green-50 text-green-600 border border-green-100",
    red: "bg-red-50 text-red-600 border border-red-100",
    blue: "bg-navy-light bg-opacity-10 text-navy border border-navy border-opacity-10",
    gray: "bg-gray-100 text-gray-600 border border-gray-200"
  };
  
  return (
    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${variantClasses[variant]}`}>
      {children}
    </span>
  );
};

// Onglet moderne
const Tab: React.FC<{
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
  count?: number;
}> = ({ label, icon, active, onClick, count }) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center px-6 py-4 transition-all duration-200 relative
        ${active 
          ? 'text-navy font-medium' 
          : 'text-gray-500 hover:text-gray-700'}
      `}
    >
      {icon && <span className={`mr-2 ${active ? 'text-navy' : 'text-gray-400'}`}>{icon}</span>}
      {label}
      {count !== undefined && (
        <span className={`ml-2 ${active 
          ? 'bg-navy text-white' 
          : 'bg-gray-200 text-gray-600'} 
          rounded-full text-xs px-2 py-0.5 transition-all duration-200`
        }>
          {count}
        </span>
      )}
      {active && (
        <motion.div
          layoutId="activeTab"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-navy to-navy-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </button>
  );
};

// Stat Card
const StatCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtitle?: string;
  color?: string;
}> = ({ icon, title, value, subtitle, color = "navy" }) => {
  const colorClasses = {
    navy: "border-l-4 border-navy",
    purple: "border-l-4 border-purple-500",
    indigo: "border-l-4 border-indigo-500"
  };
  
  return (
    <div className={`
      bg-white p-6 rounded-xl shadow-sm 
      ${colorClasses[color as keyof typeof colorClasses]}
    `}>
      <div className="flex items-start">
        <div className={`
          p-3 rounded-lg mr-4
          ${color === 'navy' ? 'bg-navy-light bg-opacity-10' : ''}
          ${color === 'purple' ? 'bg-purple-100' : ''}
          ${color === 'indigo' ? 'bg-indigo-100' : ''}
        `}>
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold text-navy-800 mt-1">{value}</h3>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
};

const ClassDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isChef = user?.role === 'chef';
  const [activeTab, setActiveTab] = useState<'info' | 'students' | 'courses'>('info');
  
  const classId = parseInt(id || '0');
  const classData = CLASSES_DATA.find(c => c.id === classId);
  
  // État local pour gérer les étudiants et les cours
  const [classStudents, setClassStudents] = useState(
    STUDENTS_DATA.filter((_, index) => index < 3)
  );
  const [classCourses, setClassCourses] = useState(
    COURSES_DATA.filter((_, index) => index < 4)
  );
  const [isClassActive, setIsClassActive] = useState(classData?.active || false);
  
  if (!classData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-10">
        <ModernCard className="p-8 text-center max-w-md w-full" withHover={false}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Grid className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4 text-navy-800">Classe non trouvée</h2>
            <p className="text-gray-600 mb-6">Cette classe n'existe pas ou a été supprimée.</p>
            <ModernButton
              onClick={() => navigate('/classes')}
              variant="primary"
              icon={<ArrowLeft className="h-5 w-5" />}
              className="w-full"
            >
              Retour à la liste des classes
            </ModernButton>
          </motion.div>
        </ModernCard>
      </div>
    );
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  // Toggle l'état actif/inactif d'un étudiant dans cette classe
  const toggleStudentActive = (studentId: number) => {
    console.log(`Toggle état de l'étudiant ${studentId} dans la classe ${classId}`);
    setClassStudents(prevStudents => 
      prevStudents.map(student => 
        student.id === studentId 
          ? { ...student, active: !student.active } 
          : student
      )
    );
  };

  // Toggle l'état actif/inactif d'un cours
  const toggleCourseActive = (courseId: number) => {
    console.log(`Toggle état du cours ${courseId} dans la classe ${classId}`);
    setClassCourses(prevCourses => 
      prevCourses.map(course => 
        course.id === courseId 
          ? { ...course, active: !course.active } 
          : course
      )
    );
  };

  // Toggle l'état actif/inactif de la classe
  const toggleClassActive = () => {
    console.log(`Toggle état de la classe ${classId}`);
    setIsClassActive(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ModernCard className="mb-8" withHover={false}>
          <div className="p-6">
            <div className="flex items-center mb-6">
              <ModernButton
                onClick={() => navigate('/classes')}
                variant="ghost"
                icon={<ArrowLeft className="h-5 w-5" />}
                size="sm"
              >
                Retour aux classes
              </ModernButton>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-start md:justify-between">
              <div className="flex">
                <div className="bg-gradient-to-br from-navy-light to-navy p-4 rounded-xl shadow-sm mr-4 self-start">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <div>
                  <div className="flex items-center flex-wrap gap-2">
                    <h1 className="text-2xl font-bold text-navy">{classData.name}</h1>
                    <Badge variant={isClassActive ? 'green' : 'red'}>
                      {isClassActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mt-1 text-sm">{classData.level} - Département d'Informatique</p>
                  <div className="flex items-center mt-2 text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Dernière mise à jour: 12 Mai 2025</span>
                  </div>
                </div>
              </div>
              
              {isChef && (
                <div className="mt-4 md:mt-0 flex items-center space-x-3">
                  <ModernButton
                    onClick={() => navigate(`/classes/${classId}/edit`)}
                    variant="outline"
                    icon={<Edit className="h-4 w-4" />}
                  >
                    Modifier
                  </ModernButton>
                  
                  <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm py-2 px-4">
                    <span className="text-gray-700 mr-3 font-medium text-sm">État:</span>
                    <ModernToggle 
                      active={isClassActive} 
                      onChange={toggleClassActive}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </ModernCard>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <StatCard 
              icon={<Users className="h-6 w-6 text-navy" />}
              title="Étudiants"
              value={classData.students}
              subtitle="Inscrits cette année"
              color="navy"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <StatCard 
              icon={<FileText className="h-6 w-6 text-indigo-600" />}
              title="Cours"
              value={classData.courses}
              subtitle="Programme actuel"
              color="indigo"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <StatCard 
              icon={<Building className="h-6 w-6 text-purple-600" />}
              title="Département"
              value="Informatique"
              subtitle="Sciences & Technologies"
              color="purple"
            />
          </motion.div>
        </div>
        
        {/* Tabs */}
        <ModernCard className="mb-8 overflow-hidden" withHover={false}>
          <div className="border-b border-gray-100">
            <div className="flex overflow-x-auto">
              <Tab 
                label="Informations"
                icon={<FileText className="h-5 w-5" />}
                active={activeTab === 'info'}
                onClick={() => setActiveTab('info')}
              />
              <Tab 
                label="Étudiants"
                icon={<User className="h-5 w-5" />}
                active={activeTab === 'students'}
                onClick={() => setActiveTab('students')}
                count={classData.students}
              />
              <Tab 
                label="Cours"
                icon={<BookOpen className="h-5 w-5" />}
                active={activeTab === 'courses'}
                onClick={() => setActiveTab('courses')}
                count={classData.courses}
              />
            </div>
          </div>
          
          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'info' && (
              <motion.div
                key="info"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6">
                  <div className="flex items-center mb-6">
                    <FileText className="h-5 w-5 mr-2 text-navy" />
                    <h2 className="text-xl font-bold text-navy">Détails de la classe</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2">Nom de la classe</label>
                        <div className="text-navy-800 bg-gray-50 p-4 rounded-lg border border-gray-100">{classData.name}</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2">Niveau</label>
                        <div className="text-navy-800 bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-center">
                          <GraduationCap className="h-5 w-5 mr-2 text-navy" />
                          {classData.level}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2">Département</label>
                        <div className="text-navy-800 bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-center">
                          <Building className="h-5 w-5 mr-2 text-navy" />
                          Informatique
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2">Nombre d'étudiants</label>
                        <div className="text-navy-800 bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-center">
                          <User className="h-5 w-5 text-navy mr-2" />
                          {classData.students} étudiants
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2">Nombre de cours</label>
                        <div className="text-navy-800 bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-center">
                          <FileText className="h-5 w-5 text-navy mr-2" />
                          {classData.courses} cours
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2">Année académique</label>
                        <div className="text-navy-800 bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-center">
                          <Calendar className="h-5 w-5 text-navy mr-2" />
                          2024 - 2025
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-10 pt-8 border-t border-gray-100">
                    <h3 className="text-lg font-bold mb-4 text-navy flex items-center">
                      <Bookmark className="h-4 w-4 mr-2" />
                      Description
                    </h3>
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                      <p className="text-gray-700 leading-relaxed">
                        Cette classe fait partie du département d'informatique de l'université. Les cours sont dispensés par des professeurs spécialisés
                        dans leurs domaines respectifs. Le programme est conçu pour préparer les étudiants à devenir des professionnels
                        compétents dans le domaine de l'informatique.
                      </p>
                      <p className="text-gray-700 leading-relaxed mt-4">
                        Les étudiants suivront une formation complète couvrant à la fois les aspects théoriques et pratiques
                        de l'informatique moderne, y compris la programmation, les bases de données, les réseaux, et plus encore.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'students' && (
              <motion.div
                key="students"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6 border-b border-gray-100">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center mb-4 md:mb-0">
                      <User className="h-5 w-5 mr-2 text-navy" />
                      <h2 className="text-xl font-bold text-navy">Liste des étudiants</h2>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                      <ModernButton
                        onClick={() => navigate(`/students/import`)}
                        variant="secondary"
                        size="sm"
                      >
                        Importer (CSV)
                      </ModernButton>
                      
                      <ModernButton
                        onClick={() => navigate(`/students/add?class=${classId}`)}
                        variant="primary"
                        size="sm"
                        icon={<Plus className="h-4 w-4" />}
                      >
                        Ajouter un étudiant
                      </ModernButton>
                    </div>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {classStudents.map((student: StudentItem) => (
                        <motion.tr 
                          key={student.id}
                          whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.5)" }}
                          transition={{ duration: 0.2 }}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-navy-light to-navy-dark bg-opacity-10 rounded-full flex items-center justify-center">
                                <span className="text-white font-medium">
                                  {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-navy-800">{student.lastName} {student.firstName}</div>
                                <Badge variant={student.active ? 'green' : 'red'}>
                                  {student.active ? 'Actif' : 'Inactif'}
                                </Badge>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{student.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-3">
                              <IconButton
                                icon={<Eye className="h-4 w-4 text-white" />}
                                variant="primary"
                                title="Consulter"
                                onClick={() => navigate(`/students/${student.id}`)}
                              />
                              
                              <IconButton
                                icon={<Edit className="h-4 w-4" />}
                                variant="outline"
                                title="Modifier"
                                onClick={() => navigate(`/students/${student.id}/edit`)}
                              />
                              
                              <ModernToggle 
                                active={student.active} 
                                onChange={() => toggleStudentActive(student.id)}
                              />
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                  <ModernButton
                    onClick={() => navigate(`/students?class=${classId}`)}
                    variant="ghost"
                    size="sm"
                  >
                    Voir tous les étudiants de cette classe
                  </ModernButton>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'courses' && (
              <motion.div
                key="courses"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6 border-b border-gray-100">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center mb-4 md:mb-0">
                      <BookOpen className="h-5 w-5 mr-2 text-navy" />
                      <h2 className="text-xl font-bold text-navy">Liste des cours</h2>
                    </div>
                    
                    {isChef && (
                      <ModernButton
                        onClick={() => navigate(`/courses/add?class=${classId}`)}
                        variant="primary"
                        size="sm"
                        icon={<Plus className="h-4 w-4" />}
                      >
                        Ajouter un cours
                      </ModernButton>
                    )}
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cours</th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Département</th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Professeur</th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {classCourses.map((course: CourseItem) => (
                        <motion.tr 
                          key={course.id}
                          whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.5)" }}
                          transition={{ duration: 0.2 }}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-navy-800">{course.name}</div>
                            <Badge variant={course.active ? 'green' : 'red'}>
                              {course.active ? 'Actif' : 'Inactif'}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant="blue">{course.department}</Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 flex items-center">
                              <div className="w-7 h-7 rounded-full bg-navy-light bg-opacity-10 flex items-center justify-center mr-2">
                                <User className="h-4 w-4 text-navy" />
                              </div>
                              {course.professor}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-3">
                              <IconButton
                                icon={<Eye className="h-4 w-4 text-white" />}
                                variant="primary"
                                title="Consulter"
                                onClick={() => navigate(`/courses/${course.id}`)}
                              />
                              
                              <IconButton
                                icon={<Edit className="h-4 w-4" />}
                                variant="outline"
                                title="Modifier"
                                onClick={() => navigate(`/courses/${course.id}/edit`)}
                              />
                              
                              {isChef && (
                                <ModernToggle 
                                  active={course.active} 
                                  onChange={() => toggleCourseActive(course.id)}
                                />
                              )}
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                  <ModernButton
                    onClick={() => navigate(`/courses?class=${classId}`)}
                    variant="ghost"
                    size="sm"
                  >
                    Voir tous les cours de cette classe
                  </ModernButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </ModernCard>
      </div>
    </div>
  );
};

export default ClassDetail;