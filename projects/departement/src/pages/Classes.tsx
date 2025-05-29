import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit, Trash2, Plus, Search, Grid, FileText, User, ChevronDown, Check, X, BookOpen, Filter, Eye, Sparkles, Layers, BellRing, Calendar, AlertCircle, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Tooltip } from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Fonctions utilitaires pour la gestion des années scolaires
const getCurrentAcademicYear = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1; // getMonth() renvoie 0-11
  
  // Si nous sommes avant octobre, nous sommes dans l'année scolaire précédente
  if (currentMonth < 10) {
    return `${currentYear-1}-${currentYear}`;
  } else {
    return `${currentYear}-${currentYear+1}`;
  }
};

// Fonction pour générer la liste des années scolaires
const generateAcademicYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  
  // Générer 5 années passées
  for (let i = 5; i > 0; i--) {
    const year = currentYear - i;
    years.push(`${year}-${year+1}`);
  }
  
  // Ajouter l'année courante
  years.push(`${currentYear-1}-${currentYear}`);
  if (new Date().getMonth() + 1 >= 10) {
    years.push(`${currentYear}-${currentYear+1}`);
  }
  
  // Ajouter 3 années futures
  for (let i = 1; i <= 3; i++) {
    const startYear = currentYear + i - 1;
    if (!(startYear === currentYear && new Date().getMonth() + 1 < 10)) {
      years.push(`${startYear}-${startYear+1}`);
    }
  }
  
  return years;
};

// Vérifie si une année scolaire est passée
interface AcademicYear {
  startYear: number;
  endYear: number;
}

const isAcademicYearPast = (academicYear: string): boolean => {
  const today: Date = new Date();
  const currentMonth: number = today.getMonth() + 1;
  const currentYear: number = today.getFullYear();
  
  // Extraire l'année de fin de l'année scolaire (format: "2024-2025")
  const endYear: number = parseInt(academicYear.split('-')[1]);
  
  // Si nous sommes après juillet (mois 7) et que l'année courante est égale ou supérieure à l'année de fin
  // OU si l'année courante est supérieure à l'année de fin
  // Alors l'année scolaire est considérée comme passée
  return (currentMonth > 7 && currentYear >= endYear) || (currentYear > endYear);
};

// Formater l'affichage d'une année scolaire
interface AcademicYearParts {
  startYear: string;
  endYear: string;
}

const formatAcademicYear = (academicYear: string): string => {
  const [startYear, endYear]: [string, string] = academicYear.split('-') as [string, string];
  return `Oct ${startYear} - Juil ${endYear}`;
};

interface ClassItem {
  id: number;
  name: string;
  level: string;
  department: string;
  academicYear: string; // Format "2024-2025"
  students: number;
  courses: number;
  active: boolean;
  lastUpdated: string;
}

// Données d'exemple mises à jour avec l'année scolaire et adaptées au contexte sénégalais
const CLASSES_DATA: ClassItem[] = [
  { id: 1, name: "Génie Logiciel - L1", department: "Informatique", level: "Licence 1", academicYear: "2024-2025", students: 45, courses: 8, active: true, lastUpdated: "2025-05-12" },
  { id: 2, name: "Génie Logiciel - L2", department: "Informatique", level: "Licence 2", academicYear: "2024-2025", students: 38, courses: 10, active: true, lastUpdated: "2025-05-10" },
  { id: 3, name: "Génie Logiciel - L3", department: "Informatique", level: "Licence 3", academicYear: "2024-2025", students: 32, courses: 12, active: true, lastUpdated: "2025-05-08" },
  { id: 4, name: "Intelligence Artificielle - M1", department: "Informatique", level: "Master 1", academicYear: "2024-2025", students: 25, courses: 8, active: true, lastUpdated: "2025-05-05" },
  { id: 5, name: "Intelligence Artificielle - M2", department: "Informatique", level: "Master 2", academicYear: "2024-2025", students: 20, courses: 6, active: true, lastUpdated: "2025-04-30" },
  { id: 6, name: "Réseaux et Sécurité - L1", department: "Réseaux", level: "Licence 1", academicYear: "2024-2025", students: 40, courses: 8, active: true, lastUpdated: "2025-04-28" },
  { id: 7, name: "Réseaux et Sécurité - L2", department: "Réseaux", level: "Licence 2", academicYear: "2023-2024", students: 35, courses: 10, active: false, lastUpdated: "2025-04-25" },
  { id: 8, name: "Réseaux et Sécurité - L3", department: "Réseaux", level: "Licence 3", academicYear: "2024-2025", students: 30, courses: 12, active: true, lastUpdated: "2025-04-22" },
  { id: 9, name: "Gestion d'Entreprise - L1", department: "Management", level: "Licence 1", academicYear: "2024-2025", students: 50, courses: 8, active: true, lastUpdated: "2025-04-20" },
  { id: 10, name: "Gestion d'Entreprise - L2", department: "Management", level: "Licence 2", academicYear: "2023-2024", students: 45, courses: 9, active: false, lastUpdated: "2025-04-15" },
  { id: 11, name: "Génie Logiciel - L1", department: "Informatique", level: "Licence 1", academicYear: "2023-2024", students: 42, courses: 8, active: false, lastUpdated: "2025-04-10" },
  { id: 12, name: "Génie Logiciel - L1", department: "Informatique", level: "Licence 1", academicYear: "2022-2023", students: 38, courses: 8, active: false, lastUpdated: "2025-04-05" },
  { id: 13, name: "Génie Logiciel - L1", department: "Informatique", level: "Licence 1", academicYear: "2021-2022", students: 40, courses: 8, active: false, lastUpdated: "2025-03-28" },
  { id: 14, name: "Génie Logiciel - L1", department: "Informatique", level: "Licence 1", academicYear: "2020-2021", students: 36, courses: 8, active: false, lastUpdated: "2025-03-20" },
];

// Nouveau composant ToggleSwitch moderne et élégant
const ModernToggle: React.FC<{
  active: boolean;
  onChange: () => void;
  disabled?: boolean;
  academicYear: string;
}> = ({ active, onChange, disabled = false, academicYear }) => {
  // Vérifier si l'année scolaire est passée
  const isPastAcademicYear = isAcademicYearPast(academicYear);
  
  // Désactiver le toggle si l'année scolaire est passée
  const isDisabled = disabled || isPastAcademicYear;
  
  return (
    <div className="relative flex items-center">
      <div 
        onClick={isDisabled ? undefined : onChange}
        className={`
          w-12 h-6 rounded-full transition-all duration-300 ease-in-out
          ${active ? 'bg-gradient-to-r from-navy to-navy-light shadow-inner' : 'bg-gradient-to-r from-red-500 to-red-400 shadow-inner'}
          ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
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
  disabled?: boolean;
}> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  className = "",
  icon,
  disabled = false
}) => {
  const baseClasses = "rounded-lg font-medium transition-all duration-200 flex items-center justify-center";
  const sizeClasses = {
    sm: "py-1.5 px-3 text-sm",
    md: "py-2 px-4",
    lg: "py-3 px-6 text-lg"
  };
  
  const variantClasses = {
    primary: `bg-gradient-to-r from-navy to-navy-light text-white shadow-sm hover:shadow hover:from-navy-dark hover:to-navy ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`,
    secondary: `bg-gray-50 text-navy hover:bg-gray-100 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`,
    outline: `border border-navy text-navy hover:bg-navy hover:text-white ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`,
    ghost: `text-navy hover:bg-navy hover:bg-opacity-10 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`
  };
  
  return (
    <button 
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
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
  disabled?: boolean;
}> = ({ 
  icon, 
  onClick, 
  variant = 'ghost',
  title,
  className = "",
  disabled = false
}) => {
  const variantClasses = {
    primary: `bg-gradient-to-r from-navy to-navy-light text-white shadow-sm hover:shadow ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`,
    secondary: `bg-gray-50 text-gray-700 hover:bg-gray-100 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`,
    outline: `border border-gray-200 text-gray-700 hover:border-navy hover:text-navy ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`,
    ghost: `text-gray-500 hover:text-navy hover:bg-navy hover:bg-opacity-5 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`
  };
  
  return (
    <button 
      onClick={disabled ? undefined : onClick}
      title={title}
      disabled={disabled}
      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${variantClasses[variant]} ${className}`}
    >
      {icon}
    </button>
  );
};

// Badge moderne
const Badge: React.FC<{
  children: React.ReactNode;
  variant?: 'green' | 'red' | 'blue' | 'gray' | 'amber';
}> = ({ 
  children, 
  variant = 'gray' 
}) => {
  const variantClasses = {
    green: "bg-green-50 text-green-600 border border-green-100",
    red: "bg-red-50 text-red-600 border border-red-100",
    blue: "bg-navy-light bg-opacity-10 text-navy border border-navy border-opacity-10",
    gray: "bg-gray-100 text-gray-600 border border-gray-200",
    amber: "bg-amber-50 text-amber-600 border border-amber-100"
  };
  
  return (
    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${variantClasses[variant]}`}>
      {children}
    </span>
  );
};

const Classes: React.FC = () => {
  const { user } = useAuth();
  const isChef = user?.role === 'chef';
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [academicYearFilter, setAcademicYearFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  
  // Générer les années scolaires disponibles
  const availableAcademicYears = generateAcademicYears();
  
  // Extraire les départements uniques des données
  const uniqueDepartments = Array.from(new Set(CLASSES_DATA.map(item => item.department)));
  
  // État local pour suivre l'état actif/inactif des classes
  const [classesState, setClassesState] = useState(CLASSES_DATA.map(classItem => {
    // Vérifier si l'année scolaire est passée
    const isPastAcademicYear = isAcademicYearPast(classItem.academicYear);
    
    // Si l'année scolaire est passée, la classe doit être inactive
    return isPastAcademicYear ? { ...classItem, active: false } : classItem;
  }));

  // Filtrer les données en fonction des critères de recherche et filtres
  const filteredClasses = classesState.filter(classItem => {
    // Filtre de recherche
    const matchesSearch = classItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         classItem.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         classItem.level.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         classItem.academicYear.includes(searchQuery);
    
    // Filtre d'état (actif/inactif)
    const matchesStatus = 
      activeFilter === 'all' || 
      (activeFilter === 'active' && classItem.active) || 
      (activeFilter === 'inactive' && !classItem.active);
    
    // Filtre de niveau
    const matchesLevel = 
      levelFilter === 'all' || 
      classItem.level.includes(levelFilter);
    
    // Filtre d'année scolaire
    const matchesAcademicYear =
      academicYearFilter === 'all' ||
      classItem.academicYear === academicYearFilter;
    
    // Filtre de département
    const matchesDepartment =
      departmentFilter === 'all' ||
      classItem.department === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesLevel && matchesAcademicYear && matchesDepartment;
  });

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  // Toggle l'état actif/inactif d'une classe
  const toggleClassActive = (id: number) => {
    // Dans une application réelle, cela ferait une requête API
    console.log(`Toggle état de la classe ${id}`);
    
    const classToToggle = classesState.find(c => c.id === id);
    if (!classToToggle) return;
    
    // Vérifier si l'année scolaire est passée
    const isPastAcademicYear = isAcademicYearPast(classToToggle.academicYear);
    
    // Si l'année scolaire est passée, ne pas permettre la réactivation
    if (isPastAcademicYear && !classToToggle.active) {
      console.log(`Impossible de réactiver la classe ${id} car l'année scolaire est passée`);
      return;
    }
    
    // Mettre à jour l'état local
    setClassesState(prevState => 
      prevState.map(classItem => 
        classItem.id === id 
          ? { ...classItem, active: !classItem.active } 
          : classItem
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ModernCard className="p-6 mb-8" withHover={false}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-gradient-to-br from-navy-light to-navy bg-opacity-80 p-3 rounded-lg mr-4 shadow-sm">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-navy">Gestion des Classes</h1>
                <p className="text-sm text-gray-500 mt-1">
                  Gérez les classes, étudiants et cours de votre établissement
                </p>
              </div>
            </div>
            
            {isChef && (
              <Link to="/classes/add">
                <ModernButton 
                  variant="primary" 
                  size="md"
                  icon={<Plus className="h-5 w-5" />}
                >
                  Ajouter une classe
                </ModernButton>
              </Link>
            )}
          </div>
        </ModernCard>
        
        {/* Info Banner about Academic Years */}
        <ModernCard className="p-4 mb-6" withHover={false}>
          <Alert className="bg-amber-50 border-amber-200">
            <Calendar className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-700">
              Au Sénégal, l'année scolaire commence en octobre et se termine en juillet. 
              Les classes d'années scolaires terminées sont automatiquement désactivées et ne peuvent pas être réactivées.
            </AlertDescription>
          </Alert>
        </ModernCard>
        
        {/* Search and filters */}
        <ModernCard className="p-6 mb-8" withHover={false}>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
            <div className="relative w-full md:w-1/2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher une classe..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent transition-all duration-200"
              />
            </div>
            
            <ModernButton
              variant="ghost"
              onClick={() => setShowFilters(!showFilters)}
              icon={<Filter className="h-5 w-5" />}
            >
              {showFilters ? 'Masquer les filtres' : 'Afficher les filtres'}
            </ModernButton>
          </div>
          
          <AnimatePresence>
            {showFilters && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-100"
              >
                {/* Filtre d'état */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">État des classes</label>
                  <div className="relative">
                    <select
                      value={activeFilter}
                      onChange={(e) => setActiveFilter(e.target.value as 'all' | 'active' | 'inactive')}
                      className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent transition-all duration-200 appearance-none"
                    >
                      <option value="all">Tous les états</option>
                      <option value="active">Actives</option>
                      <option value="inactive">Inactives</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
                  </div>
                </div>
                
                {/* Filtre de niveau */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Niveau d'études</label>
                  <div className="relative">
                    <select
                      value={levelFilter}
                      onChange={(e) => setLevelFilter(e.target.value)}
                      className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent transition-all duration-200 appearance-none"
                    >
                      <option value="all">Tous les niveaux</option>
                      <option value="Licence 1">Licence 1</option>
                      <option value="Licence 2">Licence 2</option>
                      <option value="Licence 3">Licence 3</option>
                      <option value="Master 1">Master 1</option>
                      <option value="Master 2">Master 2</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
                  </div>
                </div>
                
                {/* Filtre de département */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Département</label>
                  <div className="relative">
                    <select
                      value={departmentFilter}
                      onChange={(e) => setDepartmentFilter(e.target.value)}
                      className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent transition-all duration-200 appearance-none"
                    >
                      <option value="all">Tous les départements</option>
                      {uniqueDepartments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
                  </div>
                </div>
                
                {/* Filtre d'année scolaire */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Année scolaire</label>
                  <div className="relative">
                    <select
                      value={academicYearFilter}
                      onChange={(e) => setAcademicYearFilter(e.target.value)}
                      className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent transition-all duration-200 appearance-none"
                    >
                      <option value="all">Toutes les années</option>
                      {availableAcademicYears.map(year => (
                        <option key={year} value={year}>
                          {formatAcademicYear(year)}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </ModernCard>
        
        {/* Results stats */}
        <div className="flex flex-wrap gap-2 justify-between items-center mb-4">
          <h2 className="text-md font-medium text-gray-600">
            {filteredClasses.length} classe{filteredClasses.length !== 1 ? 's' : ''} trouvée{filteredClasses.length !== 1 ? 's' : ''}
          </h2>
          
          <div className="flex flex-wrap gap-2">
            {activeFilter !== 'all' && (
              <Badge variant={activeFilter === 'active' ? 'green' : 'red'}>
                {activeFilter === 'active' ? 'Classes actives' : 'Classes inactives'}
              </Badge>
            )}
            
            {levelFilter !== 'all' && (
              <Badge variant="blue">
                {levelFilter}
              </Badge>
            )}
            
              <Badge variant={academicYearFilter !== 'all' ? 'amber' : 'blue'}>
                {academicYearFilter !== 'all' 
                  ? `Année: ${formatAcademicYear(academicYearFilter)}` 
                  : getCurrentAcademicYear() === `${new Date().getFullYear()}-${new Date().getFullYear()+1}`
                    ? "Année en cours: " + formatAcademicYear(getCurrentAcademicYear())
                    : "Affichage de toutes les années"
                }
              </Badge>
            
            {departmentFilter !== 'all' && (
              <Badge variant="gray">
                Dép: {departmentFilter}
              </Badge>
            )}
          </div>
        </div>
        
        {/* Liste des classes */}
        {filteredClasses.length === 0 ? (
          <ModernCard className="p-12 text-center" withHover={false}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Grid className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Aucune classe trouvée</h2>
              <p className="text-gray-500 max-w-md mx-auto mb-6">Essayez de modifier vos critères de recherche ou filtres pour trouver ce que vous cherchez.</p>
              <ModernButton 
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('all');
                  setLevelFilter('all');
                  setAcademicYearFilter('all');
                  setDepartmentFilter('all');
                }}
                variant="secondary"
                icon={<Sparkles className="h-4 w-4" />}
              >
                Réinitialiser les filtres
              </ModernButton>
            </motion.div>
          </ModernCard>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredClasses.map(classItem => {
              // Vérifier si l'année scolaire est passée
              const currentYear = new Date().getFullYear();
              const academicYearStart = parseInt(classItem.academicYear.split('-')[0]);
              const isPastAcademicYear = academicYearStart < currentYear;
              
              return (
                <motion.div
                  key={classItem.id}
                  variants={itemVariants}
                >
                  <ModernCard className="group">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-navy mb-1 group-hover:text-navy-light transition-colors">{classItem.name}</h3>
                          <div className="flex items-center mt-2 flex-wrap gap-2">
                            <Badge variant={classItem.active ? 'green' : 'red'}>
                              {classItem.active ? 'Active' : 'Inactive'}
                            </Badge>
                            <span className="text-sm text-gray-500">{classItem.level}</span>
                          </div>
                        </div>
                        <ModernToggle 
                          active={classItem.active}
                          onChange={() => toggleClassActive(classItem.id)}
                          academicYear={classItem.academicYear}
                        />
                      </div>
                      
                      <div className="mt-4 flex items-center">
                        <Badge variant="amber">
                          <Calendar className="inline-block h-3 w-3 mr-1" />
                          {formatAcademicYear(classItem.academicYear)}
                        </Badge>
                        <Badge variant="gray">
                          {classItem.department}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-5">
                        <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center justify-center group-hover:bg-navy-light group-hover:bg-opacity-5 transition-all duration-300">
                          <div className="flex items-center justify-center">
                            <User className="h-5 w-5 text-navy opacity-80 mr-2" />
                            <span className="text-2xl font-bold text-navy-800">{classItem.students}</span>
                          </div>
                          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mt-1">Étudiants</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center justify-center group-hover:bg-navy-light group-hover:bg-opacity-5 transition-all duration-300">
                          <div className="flex items-center justify-center">
                            <FileText className="h-5 w-5 text-navy opacity-80 mr-2" />
                            <span className="text-2xl font-bold text-navy-800">{classItem.courses}</span>
                          </div>
                          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mt-1">Cours</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 flex justify-between items-center border-t border-gray-100">
                      <div className="flex space-x-2">
                        <Link to={`/classes/${classItem.id}`}>
                          <IconButton 
                            icon={<Eye className="h-5 w-5" />} 
                            variant="primary"
                            title="Consulter"
                          />
                        </Link>
                        
                        <Link to={`/classes/${classItem.id}/edit`}>
                          <IconButton 
                            icon={<Edit className="h-5 w-5" />} 
                            variant="outline"
                            title="Modifier"
                            disabled={isAcademicYearPast(classItem.academicYear)}
                          />
                        </Link>
                      </div>
                      
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500 mr-2 font-medium">
                          MAJ: <span className="text-navy">{classItem.lastUpdated}</span>
                        </span>
                      </div>
                    </div>
                  </ModernCard>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Classes;