import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Edit, 
  Mail, 
  GraduationCap, 
  Calendar, 
  Check, 
  X,
  BookOpen,
  FileText,
  Clock,
  Bell,
  Award,
  User,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Bookmark,
  Clock3,
  Eye,
  BookMarked,
  FileCheck,
  BookOpenCheck,
  MessageSquare,
  BarChart,
  CalendarCheck,
  Plus
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Types
type Student = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  class: string;
  level: string;
  registrationDate: string;
  active: boolean;
  avatar: string | null;
  gpa: number;
  isThesisStudent: boolean;
  phoneNumber: string;
  address: string;
  birthdate: string;
  nationality: string;
};

type Grade = {
  type: string;
  score: number | null;
  max: number;
  weight: number;
};

type Course = {
  id: number;
  name: string;
  professor: string;
  credits: number;
  grades: Grade[];
  finalGrade: number | null;
  status: 'validated' | 'pending' | 'failed';
};

type Milestone = {
  id: number;
  title: string;
  status: 'completed' | 'in_progress' | 'not_started';
  date: string | null;
  description: string;
};

type Meeting = {
  id: number;
  date: string;
  summary: string;
  feedback: string;
  nextSteps: string;
};

type ThesisData = {
  title: string;
  supervisor: string;
  coSupervisor: string;
  startDate: string;
  estimatedEndDate: string;
  defense: string | null;
  status: 'not_started' | 'in_progress' | 'submitted' | 'defended';
  progress: number;
  lastUpdate: string;
  milestones: Milestone[];
  meetings: Meeting[];
};

type GradeClaim = {
  id: number;
  course: string;
  professor: string;
  type: string;
  date: string;
  initialGrade: number;
  requestedGrade: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  finalGrade: number | null;
  response: string | null;
  responseDate: string | null;
};

// Données fictives étendues
const STUDENTS_DATA: Student[] = [
  { 
    id: 1, 
    firstName: "Amadou", 
    lastName: "Diop", 
    email: "amadou.diop@student.edu.sn", 
    class: "Informatique - L3", 
    level: "Licence 3", 
    registrationDate: "01/09/2023", 
    active: true,
    avatar: null,
    gpa: 15.6,
    isThesisStudent: true,
    phoneNumber: "+221 77 123 45 67",
    address: "123 Rue Pompidou, Dakar",
    birthdate: "15/03/2002",
    nationality: "Sénégalaise"
  },
  { 
    id: 2, 
    firstName: "Fatou", 
    lastName: "Ndiaye", 
    email: "fatou.ndiaye@student.edu.sn", 
    class: "Informatique - M2", 
    level: "Master 2", 
    registrationDate: "02/09/2022", 
    active: true,
    avatar: null,
    gpa: 16.2,
    isThesisStudent: true,
    phoneNumber: "+221 76 987 65 43",
    address: "45 Avenue Cheikh Anta Diop, Dakar",
    birthdate: "22/09/2000",
    nationality: "Sénégalaise" 
  },
  { 
    id: 3, 
    firstName: "Modou", 
    lastName: "Sall", 
    email: "modou.sall@student.edu.sn", 
    class: "Informatique - L2", 
    level: "Licence 2", 
    registrationDate: "01/09/2024", 
    active: true,
    avatar: null,
    gpa: 13.4,
    isThesisStudent: false,
    phoneNumber: "+221 70 555 22 33",
    address: "78 Boulevard de la République, Dakar",
    birthdate: "10/11/2003",
    nationality: "Sénégalaise"
  },
];

// Données des cours avec notes
const COURSES_WITH_GRADES: Course[] = [
  { 
    id: 1, 
    name: "Programmation Orientée Objet", 
    professor: "Dr. Moussa Diop",
    credits: 6,
    grades: [
      { type: "TD", score: 14, max: 20, weight: 0.3 },
      { type: "TP", score: 16, max: 20, weight: 0.2 },
      { type: "Examen", score: 15, max: 20, weight: 0.5 }
    ],
    finalGrade: 15,
    status: "validated"
  },
  { 
    id: 2, 
    name: "Algorithmes Avancés", 
    professor: "Dr. Fatou Ndiaye",
    credits: 5,
    grades: [
      { type: "TD", score: 12, max: 20, weight: 0.3 },
      { type: "Projet", score: 18, max: 20, weight: 0.3 },
      { type: "Examen", score: 14, max: 20, weight: 0.4 }
    ],
    finalGrade: 14.6,
    status: "validated"
  },
  { 
    id: 3, 
    name: "Base de Données", 
    professor: "Dr. Omar Sall",
    credits: 5,
    grades: [
      { type: "TD", score: 13, max: 20, weight: 0.2 },
      { type: "TP", score: 15, max: 20, weight: 0.3 },
      { type: "Examen", score: 16, max: 20, weight: 0.5 }
    ],
    finalGrade: 15.1,
    status: "validated"
  },
  { 
    id: 4, 
    name: "Réseaux Informatiques", 
    professor: "Dr. Aminata Diallo",
    credits: 4,
    grades: [
      { type: "TD", score: 11, max: 20, weight: 0.3 },
      { type: "TP", score: 13, max: 20, weight: 0.2 },
      { type: "Examen", score: 15, max: 20, weight: 0.5 }
    ],
    finalGrade: 13.6,
    status: "validated"
  },
  { 
    id: 5, 
    name: "Intelligence Artificielle", 
    professor: "Dr. Cheikh Diop",
    credits: 5,
    grades: [
      { type: "TD", score: null, max: 20, weight: 0.3 },
      { type: "Projet", score: 17, max: 20, weight: 0.3 },
      { type: "Examen", score: null, max: 20, weight: 0.4 }
    ],
    finalGrade: null,
    status: "pending"
  }
];

// Informations sur le mémoire
const THESIS_DATA: ThesisData = {
  title: "Conception d'un système intelligent de gestion académique basé sur l'IA",
  supervisor: "Dr. Moussa Diop",
  coSupervisor: "Dr. Fatou Ndiaye",
  startDate: "15/11/2024",
  estimatedEndDate: "30/06/2025",
  defense: null,
  status: "in_progress",
  progress: 35,
  lastUpdate: "10/05/2025",
  milestones: [
    { 
      id: 1, 
      title: "Définition du sujet", 
      status: "completed", 
      date: "15/11/2024", 
      description: "Validation du sujet avec le superviseur et délimitation du périmètre de recherche."
    },
    { 
      id: 2, 
      title: "Revue de littérature", 
      status: "completed", 
      date: "15/01/2025", 
      description: "Analyse des travaux existants et identification des approches pertinentes."
    },
    { 
      id: 3, 
      title: "Conception de la méthodologie", 
      status: "in_progress", 
      date: null, 
      description: "Élaboration de l'approche technique et des protocoles expérimentaux."
    },
    { 
      id: 4, 
      title: "Implémentation du prototype", 
      status: "not_started", 
      date: null, 
      description: "Développement de la solution proposée."
    },
    { 
      id: 5, 
      title: "Évaluation et résultats", 
      status: "not_started", 
      date: null, 
      description: "Expérimentations et analyse des performances."
    },
    { 
      id: 6, 
      title: "Rédaction du mémoire", 
      status: "in_progress", 
      date: null, 
      description: "Compilation des résultats et finalisation du document."
    }
  ],
  meetings: [
    { id: 1, date: "20/11/2024", summary: "Définition des objectifs et planning", feedback: "Positif", nextSteps: "Commencer la revue de littérature" },
    { id: 2, date: "15/01/2025", summary: "Présentation de la revue de littérature", feedback: "Approfondir certains aspects", nextSteps: "Compléter la recherche bibliographique" },
    { id: 3, date: "05/03/2025", summary: "Discussion sur l'approche méthodologique", feedback: "Intéressant mais à affiner", nextSteps: "Détailler les protocoles expérimentaux" },
    { id: 4, date: "20/04/2025", summary: "Suivi de l'avancement", feedback: "Bonne progression", nextSteps: "Commencer l'implémentation" }
  ]
};

// Réclamations de notes
const GRADE_CLAIMS: GradeClaim[] = [
  { 
    id: 1, 
    course: "Algorithmes Avancés", 
    professor: "Dr. Fatou Ndiaye", 
    type: "Examen",
    date: "15/02/2025", 
    initialGrade: 12, 
    requestedGrade: 14,
    reason: "Question 3.b : j'ai fourni tous les éléments demandés mais n'ai obtenu que 2 points sur 4.",
    status: "approved",
    finalGrade: 14,
    response: "Après vérification, votre réponse contenait bien tous les éléments. Note corrigée.",
    responseDate: "20/02/2025"
  },
  { 
    id: 2, 
    course: "Base de Données", 
    professor: "Dr. Omar Sall", 
    type: "TP",
    date: "10/04/2025", 
    initialGrade: 13, 
    requestedGrade: 15,
    reason: "Le rapport contenait toutes les requêtes SQL demandées et fonctionnelles qui n'ont pas été prises en compte.",
    status: "pending",
    finalGrade: null,
    response: null,
    responseDate: null
  }
];

// Composants réutilisables modernes
interface ModernToggleProps {
  active: boolean;
  onChange: () => void;
}

const ModernToggle: React.FC<ModernToggleProps> = ({ active, onChange }) => {
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

interface ModernCardProps {
  children: React.ReactNode;
  className?: string;
  withHover?: boolean;
}

const ModernCard: React.FC<ModernCardProps> = ({ children, className = "", withHover = true }) => {
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

type ModernButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ModernButtonSize = 'sm' | 'md' | 'lg';

interface ModernButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: ModernButtonVariant;
  size?: ModernButtonSize;
  className?: string;
  icon?: React.ReactNode;
}

const ModernButton: React.FC<ModernButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  className = "",
  icon 
}) => {
  const baseClasses = "rounded-lg font-medium transition-all duration-200 flex items-center justify-center";
  const sizeClasses: Record<ModernButtonSize, string> = {
    sm: "py-1.5 px-3 text-sm",
    md: "py-2 px-4",
    lg: "py-3 px-6 text-lg"
  };
  
  const variantClasses: Record<ModernButtonVariant, string> = {
    primary: "bg-gradient-to-r from-navy to-navy-light text-white shadow-sm hover:shadow hover:from-navy-dark hover:to-navy",
    secondary: "bg-gray-50 text-navy hover:bg-gray-100",
    outline: "border border-navy text-navy hover:bg-navy hover:text-white",
    ghost: "text-navy hover:bg-navy hover:bg-opacity-10",
    danger: "bg-gradient-to-r from-red-500 to-red-400 text-white shadow-sm hover:shadow hover:from-red-600 hover:to-red-500"
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

interface IconButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  title?: string;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ 
  icon, 
  onClick, 
  variant = 'ghost',
  title,
  className = ""
}) => {
  const variantClasses: Record<IconButtonProps['variant'] & string, string> = {
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

type BadgeVariant = 'green' | 'red' | 'blue' | 'gray' | 'yellow' | 'purple';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'gray',
  className = ""
}) => {
  const variantClasses: Record<BadgeVariant, string> = {
    green: "bg-green-50 text-green-600 border border-green-100",
    red: "bg-red-50 text-red-600 border border-red-100",
    blue: "bg-navy-light bg-opacity-10 text-navy border border-navy border-opacity-10",
    gray: "bg-gray-100 text-gray-600 border border-gray-200",
    yellow: "bg-yellow-50 text-yellow-600 border border-yellow-100",
    purple: "bg-purple-50 text-purple-600 border border-purple-100"
  };
  
  return (
    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};

interface TabProps {
  label: string;
  icon?: React.ReactNode;
  active: boolean;
  onClick: () => void;
  count?: number;
}

const Tab: React.FC<TabProps> = ({ 
  label, 
  icon, 
  active, 
  onClick, 
  count 
}) => {
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

// Nouveau composant pour les progrès du mémoire
interface ThesisProgressProps {
  progress: number;
}

const ThesisProgress: React.FC<ThesisProgressProps> = ({ progress }) => {
  return (
    <div className="w-full bg-gray-100 rounded-full h-4 mb-2">
      <div 
        className="h-4 rounded-full bg-gradient-to-r from-navy to-navy-light transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      ></div>
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>0%</span>
        <span>{progress}% complété</span>
        <span>100%</span>
      </div>
    </div>
  );
};

// Composant pour afficher les notes
interface GradeDisplayProps {
  grade: number | null;
  type?: "normal" | "small";
}

const GradeDisplay: React.FC<GradeDisplayProps> = ({ grade, type = "normal" }) => {
  let color = "text-gray-700";
  let bgColor = "bg-gray-50";
  let borderColor = "border-gray-200";
  
  if (type === "normal" && grade !== null) {
    if (grade >= 16) {
      color = "text-green-700";
      bgColor = "bg-green-50";
      borderColor = "border-green-100";
    } else if (grade >= 14) {
      color = "text-blue-700";
      bgColor = "bg-blue-50";
      borderColor = "border-blue-100";
    } else if (grade >= 10) {
      color = "text-yellow-700";
      bgColor = "bg-yellow-50";
      borderColor = "border-yellow-100";
    } else {
      color = "text-red-700";
      bgColor = "bg-red-50";
      borderColor = "border-red-100";
    }
  }
  
  return (
    <div className={`inline-flex items-center justify-center rounded-full py-1 px-2.5 text-sm font-medium ${color} ${bgColor} border ${borderColor}`}>
      {grade !== null ? grade : '—'}
    </div>
  );
};

// Nouveau composant pour l'état d'une étape
interface MilestoneStatusProps {
  status: 'completed' | 'in_progress' | 'not_started';
}

const MilestoneStatus: React.FC<MilestoneStatusProps> = ({ status }) => {
  if (status === "completed") {
    return <Badge variant="green">Terminé</Badge>;
  } else if (status === "in_progress") {
    return <Badge variant="blue">En cours</Badge>;
  } else {
    return <Badge variant="gray">À faire</Badge>;
  }
};

// Nouveau composant pour l'état d'une réclamation
interface ClaimStatusProps {
  status: 'approved' | 'rejected' | 'pending';
}

const ClaimStatus: React.FC<ClaimStatusProps> = ({ status }) => {
  if (status === "approved") {
    return <Badge variant="green">Approuvée</Badge>;
  } else if (status === "rejected") {
    return <Badge variant="red">Rejetée</Badge>;
  } else {
    return <Badge variant="yellow">En attente</Badge>;
  }
};

// Composant Accordion pour les informations détaillées
interface AccordionProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children, icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-100 rounded-lg overflow-hidden mb-4">
      <button
        className="w-full flex items-center justify-between bg-gray-50 p-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          {icon && <span className="mr-2 text-navy">{icon}</span>}
          <span className="font-medium text-navy-800">{title}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-white">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const StudentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'info' | 'grades' | 'thesis' | 'claims'>('info');
  
  const studentId = parseInt(id || '0');
  const studentData = STUDENTS_DATA.find(s => s.id === studentId);
  
  // Déterminer si l'étudiant est en L3 ou M2
  const isThesisEligible = studentData?.level === "Licence 3" || studentData?.level === "Master 2";
  
  // Pour les notes et la moyenne générale
  const courses = COURSES_WITH_GRADES;
  const claimsCount = GRADE_CLAIMS.length;
  
  if (!studentData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-10">
        <ModernCard className="p-8 text-center max-w-md w-full" withHover={false}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4 text-navy-800">Étudiant non trouvé</h2>
            <p className="text-gray-600 mb-6">Cet étudiant n'existe pas ou a été supprimé.</p>
            <ModernButton
              onClick={() => navigate('/students')}
              variant="primary"
              icon={<ArrowLeft className="h-5 w-5" />}
              className="w-full"
            >
              Retour à la liste des étudiants
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
  
  const toggleActiveStudent = () => {
    console.log(`Toggle état de l'étudiant ${studentId}`);
    // Dans une application réelle, cela ferait une requête API
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with student overview */}
        <ModernCard className="mb-8" withHover={false}>
          <div className="p-6">
            {/* Back button */}
            <div className="flex items-center mb-6">
              <ModernButton
                onClick={() => navigate('/students')}
                variant="ghost"
                icon={<ArrowLeft className="h-5 w-5" />}
                size="sm"
              >
                Retour à la liste des étudiants
              </ModernButton>
            </div>
            
            {/* Student info and actions */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between">
              <div className="flex">
                <div className="h-20 w-20 bg-gradient-to-br from-navy-light to-navy rounded-xl flex items-center justify-center text-white mr-5 shadow-sm">
                  <span className="text-3xl font-medium">
                    {studentData.firstName.charAt(0)}{studentData.lastName.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="flex items-center flex-wrap gap-2">
                    <h1 className="text-2xl font-bold text-navy">{studentData.lastName} {studentData.firstName}</h1>
                    <Badge variant={studentData.active ? 'green' : 'red'}>
                      {studentData.active ? 'Actif' : 'Bloqué'}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mt-1">Étudiant - {studentData.class}</p>
                  <div className="flex items-center mt-2 text-xs text-gray-500">
                    <GraduationCap className="h-3 w-3 mr-1" />
                    <span>Inscription: {studentData.registrationDate}</span>
                    <span className="mx-2">•</span>
                    <Mail className="h-3 w-3 mr-1" />
                    <span>{studentData.email}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center space-x-3">
                <ModernButton
                  onClick={() => navigate(`/students/${studentId}/edit`)}
                  variant="outline"
                  icon={<Edit className="h-4 w-4" />}
                >
                  Modifier
                </ModernButton>
                
                <ModernButton
                  onClick={toggleActiveStudent}
                  variant={studentData.active ? 'danger' : 'primary'}
                  icon={studentData.active ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                >
                  {studentData.active ? 'Bloquer' : 'Débloquer'}
                </ModernButton>
              </div>
            </div>
          </div>
        </ModernCard>
        
        {/* Academic summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          
          <ModernCard className="p-4">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <Award className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Moyenne générale</p>
                <h3 className="text-xl font-bold text-navy-800">{studentData.gpa}/20</h3>
              </div>
            </div>
          </ModernCard>
          
          
          
          <ModernCard className="p-4">
            <div className="flex items-center">
              <div className="bg-red-100 p-3 rounded-lg">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Réclamations</p>
                <h3 className="text-xl font-bold text-navy-800">{claimsCount}</h3>
              </div>
            </div>
          </ModernCard>
        </div>
        
        {/* Tabs navigation */}
        <ModernCard className="mb-8 overflow-hidden" withHover={false}>
          <div className="border-b border-gray-100">
            <div className="flex overflow-x-auto">
              <Tab 
                label="Informations"
                icon={<User className="h-5 w-5" />}
                active={activeTab === 'info'}
                onClick={() => setActiveTab('info')}
              />
              <Tab 
                label="Notes & Cours"
                icon={<BookOpen className="h-5 w-5" />}
                active={activeTab === 'grades'}
                onClick={() => setActiveTab('grades')}
              />
              {isThesisEligible && (
                <Tab 
                  label="Mémoire"
                  icon={<BookMarked className="h-5 w-5" />}
                  active={activeTab === 'thesis'}
                  onClick={() => setActiveTab('thesis')}
                />
              )}
              <Tab 
                label="Réclamations"
                icon={<MessageSquare className="h-5 w-5" />}
                active={activeTab === 'claims'}
                onClick={() => setActiveTab('claims')}
                count={claimsCount}
              />
            </div>
          </div>
          
          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {/* Informations Tab */}
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
                    <User className="h-5 w-5 mr-2 text-navy" />
                    <h2 className="text-xl font-bold text-navy">Informations personnelles</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2">Nom</label>
                        <div className="text-navy-800 bg-gray-50 p-4 rounded-lg border border-gray-100">{studentData.lastName}</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2">Prénom</label>
                        <div className="text-navy-800 bg-gray-50 p-4 rounded-lg border border-gray-100">{studentData.firstName}</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2">Email</label>
                        <div className="text-navy-800 bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-center">
                          <Mail className="h-5 w-5 text-navy mr-2" />
                          {studentData.email}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2">Téléphone</label>
                        <div className="text-navy-800 bg-gray-50 p-4 rounded-lg border border-gray-100">
                          {studentData.phoneNumber}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2">Classe</label>
                        <div className="text-navy-800 bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-center">
                          <GraduationCap className="h-5 w-5 text-navy mr-2" />
                          {studentData.class}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2">Niveau</label>
                        <div className="text-navy-800 bg-gray-50 p-4 rounded-lg border border-gray-100">{studentData.level}</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2">Date d'inscription</label>
                        <div className="text-navy-800 bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-center">
                          <Calendar className="h-5 w-5 text-navy mr-2" />
                          {studentData.registrationDate}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2">Adresse</label>
                        <div className="text-navy-800 bg-gray-50 p-4 rounded-lg border border-gray-100">
                          {studentData.address}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-10 pt-8 border-t border-gray-100">
                    <div className="flex items-center mb-4">
                      <BarChart className="h-5 w-5 mr-2 text-navy" />
                      <h3 className="text-lg font-bold text-navy">Statistiques académiques</h3>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      
                      
                      <div className="bg-gray-50 p-4 rounded-lg text-center border border-gray-100">
                        <div className="text-2xl font-bold text-navy-light">{studentData.gpa}/20</div>
                        <div className="text-sm text-gray-600">Moyenne générale</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center border border-gray-100">
                        <div className="text-2xl font-bold text-navy">30/30</div>
                        <div className="text-sm text-gray-600">Crédits validés</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Notes & Cours Tab */}
            {activeTab === 'grades' && (
              <motion.div
                key="grades"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6">
                  <div className="flex items-center mb-6">
                    <BookOpen className="h-5 w-5 mr-2 text-navy" />
                    <h2 className="text-xl font-bold text-navy">Notes & Cours</h2>
                  </div>
                  
                  {/* Cours avec notes détaillées */}
                  {courses.map((course) => (
                    <Accordion
                      key={course.id}
                      title={course.name}
                      icon={<BookOpenCheck className="h-5 w-5" />}
                    >
                      <div className="mb-4">
                        <div className="flex flex-wrap justify-between mb-3">
                          <div>
                            <span className="text-sm text-gray-500 block mb-1">Professeur</span>
                            <span className="font-medium">{course.professor}</span>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500 block mb-1">Crédits</span>
                            <span className="font-medium">{course.credits} ECTS</span>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500 block mb-1">Statut</span>
                            <Badge 
                              variant={
                                course.status === 'validated' ? 'green' : 
                                course.status === 'pending' ? 'yellow' : 'red'
                              }
                            >
                              {course.status === 'validated' ? 'Validé' : 
                               course.status === 'pending' ? 'En cours' : 'Non validé'}
                            </Badge>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500 block mb-1">Note finale</span>
                            <div className="flex justify-center">
                              {course.finalGrade !== null ? (
                                <GradeDisplay grade={course.finalGrade} />
                              ) : (
                                <Badge variant="yellow">En attente</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <h4 className="text-sm font-medium text-gray-700 mb-3">Détail des évaluations</h4>
                          <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <table className="min-w-full">
                              <thead>
                                <tr className="bg-gray-100">
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                  <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Note</th>
                                  <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Coefficient</th>
                                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Contribution</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                {course.grades.map((grade, index) => (
                                  <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{grade.type}</td>
                                    <td className="px-4 py-3 text-center">
                                      {grade.score !== null ? (
                                        <span className="font-medium">{grade.score}/{grade.max}</span>
                                      ) : (
                                        <span className="text-sm text-gray-500">En attente</span>
                                      )}
                                    </td>
                                    <td className="px-4 py-3 text-center text-sm text-gray-500">{grade.weight * 100}%</td>
                                    <td className="px-4 py-3 text-right text-sm">
                                      {grade.score !== null ? (
                                        <span className="font-medium text-navy">
                                          {(grade.score * grade.weight).toFixed(2)} pts
                                        </span>
                                      ) : (
                                        <span className="text-sm text-gray-500">—</span>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                                {course.finalGrade !== null && (
                                  <tr className="bg-navy bg-opacity-5">
                                    <td className="px-4 py-3 font-medium">Total</td>
                                    <td colSpan={2}></td>
                                    <td className="px-4 py-3 text-right font-bold text-navy">{course.finalGrade}/20</td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </Accordion>
                  ))}
                  
                  {/* Récapitulatif des notes */}
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <h3 className="text-lg font-bold text-navy flex items-center mb-4">
                      <BarChart className="h-5 w-5 mr-2" />
                      Bilan du semestre
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Graphique des notes */}
                      <ModernCard className="p-4" withHover={false}>
                        <h4 className="text-sm font-medium text-gray-700 mb-4">Répartition des notes</h4>
                        <div className="h-60 flex items-end justify-around px-2">
                          {courses.map((course, index) => (
                            <div key={index} className="flex flex-col items-center">
                              <div 
                                className={`w-12 rounded-t-lg ${
                                  course.finalGrade !== null && course.finalGrade >= 16 ? 'bg-green-500' :
                                  course.finalGrade !== null && course.finalGrade >= 14 ? 'bg-navy' :
                                  course.finalGrade !== null && course.finalGrade >= 10 ? 'bg-yellow-500' :
                                  course.finalGrade !== null ? 'bg-red-500' : 'bg-gray-300'
                                }`}
                                style={{ 
                                  height: course.finalGrade ? `${(course.finalGrade / 20) * 200}px` : '50px'
                                }}
                              ></div>
                              <div className="mt-2 text-xs font-medium text-gray-600 w-14 text-center overflow-hidden whitespace-nowrap overflow-ellipsis" title={course.name}>
                                {course.name.split(' ')[0]}
                              </div>
                              <div className="text-xs font-bold">
                                {course.finalGrade !== null ? course.finalGrade : '—'}
                              </div>
                            </div>
                          ))}
                        </div>
                      </ModernCard>
                      
                      {/* Statistiques */}
                      <ModernCard className="p-4" withHover={false}>
                        <h4 className="text-sm font-medium text-gray-700 mb-4">Statistiques</h4>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-gray-600">Moyenne générale</span>
                              <span className="font-bold text-navy">{studentData.gpa}/20</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                              <div 
                                className="h-2 rounded-full bg-gradient-to-r from-navy to-navy-light"
                                style={{ width: `${(studentData.gpa / 20) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div>
                            
                            
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-gray-600">Crédits validés</span>
                              <span className="font-bold text-navy">30/30</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                              <div 
                                className="h-2 rounded-full bg-gradient-to-r from-navy-light to-navy"
                                style={{ width: '100%' }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <div className="text-sm text-gray-600 mb-1">Meilleure note</div>
                              <div className="text-xl font-bold text-green-600">
                                18/20
                                <span className="text-xs font-normal text-gray-500 block">Algorithmique</span>
                              </div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <div className="text-sm text-gray-600 mb-1">Note la plus basse</div>
                              <div className="text-xl font-bold text-red-500">
                                12/20
                                <span className="text-xs font-normal text-gray-500 block">Réseaux</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </ModernCard>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Mémoire Tab */}
            {activeTab === 'thesis' && isThesisEligible && (
              <motion.div
                key="thesis"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <BookMarked className="h-5 w-5 mr-2 text-navy" />
                      <h2 className="text-xl font-bold text-navy">Mémoire</h2>
                    </div>
                    
                    <Badge 
                      variant={
                        THESIS_DATA.status === 'defended' ? 'green' : 
                        THESIS_DATA.status === 'submitted' ? 'blue' : 
                        THESIS_DATA.status === 'in_progress' ? 'yellow' : 'gray'
                      }
                    >
                      {THESIS_DATA.status === 'defended' ? 'Soutenu' : 
                       THESIS_DATA.status === 'submitted' ? 'Soumis' : 
                       THESIS_DATA.status === 'in_progress' ? 'En cours' : 'Non commencé'}
                    </Badge>
                  </div>
                  
                  {/* Informations générales */}
                  <ModernCard className="mb-6" withHover={false}>
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-navy mb-4">Informations générales</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">Titre du mémoire</label>
                          <p className="text-navy-800 bg-gray-50 p-3 rounded-md border border-gray-100">{THESIS_DATA.title}</p>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">Superviseur</label>
                          <p className="text-navy-800 bg-gray-50 p-3 rounded-md border border-gray-100 flex items-center">
                            <User className="h-4 w-4 text-navy mr-2" />
                            {THESIS_DATA.supervisor}
                          </p>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">Date de début</label>
                          <p className="text-navy-800 bg-gray-50 p-3 rounded-md border border-gray-100">{THESIS_DATA.startDate}</p>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">Date de fin estimée</label>
                          <p className="text-navy-800 bg-gray-50 p-3 rounded-md border border-gray-100">{THESIS_DATA.estimatedEndDate}</p>
                        </div>
                      </div>
                    </div>
                  </ModernCard>
                  
                  {/* Progression */}
                  <ModernCard className="mb-6" withHover={false}>
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-navy">Progression</h3>
                        <div className="text-sm font-medium text-gray-500">
                          Mise à jour: {THESIS_DATA.lastUpdate}
                        </div>
                      </div>
                      
                      <ThesisProgress progress={THESIS_DATA.progress} />
                      
                      <div className="mt-6">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Jalons</h4>
                        <div className="space-y-4">
                          {THESIS_DATA.milestones.map((milestone) => (
                            <div 
                              key={milestone.id} 
                              className={`
                                border-l-2 pl-4 pb-4 relative
                                ${milestone.status === 'completed' ? 'border-green-500' : 
                                  milestone.status === 'in_progress' ? 'border-navy' : 'border-gray-300'}
                              `}
                            >
                              <div className={`
                                absolute w-3 h-3 rounded-full -left-[7px] top-1
                                ${milestone.status === 'completed' ? 'bg-green-500' : 
                                  milestone.status === 'in_progress' ? 'bg-navy' : 'bg-gray-300'}
                              `}></div>
                              <div className="flex justify-between items-start">
                                <div>
                                  <h5 className="font-medium text-navy-800">{milestone.title}</h5>
                                  <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
                                </div>
                                <div className="flex flex-col items-end">
                                  <MilestoneStatus status={milestone.status} />
                                  {milestone.date && (
                                    <div className="text-xs text-gray-500 mt-1">{milestone.date}</div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </ModernCard>
                  
                  {/* Réunions avec le superviseur */}
                  <ModernCard withHover={false}>
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-navy mb-4">Réunions avec l'encadrant</h3>
                      
                      <div className="space-y-4">
                        {THESIS_DATA.meetings.map((meeting) => (
                          <Accordion
                            key={meeting.id}
                            title={`Réunion du ${meeting.date}`}
                            icon={<Calendar className="h-5 w-5" />}
                          >
                            <div className="space-y-3">
                              <div>
                                <h5 className="text-sm font-medium text-gray-600">Résumé</h5>
                                <p className="mt-1">{meeting.summary}</p>
                              </div>
                              <div>
                                <h5 className="text-sm font-medium text-gray-600">Feedback</h5>
                                <p className="mt-1">{meeting.feedback}</p>
                              </div>
                              <div>
                                <h5 className="text-sm font-medium text-gray-600">Prochaines étapes</h5>
                                <p className="mt-1">{meeting.nextSteps}</p>
                              </div>
                            </div>
                          </Accordion>
                        ))}
                      </div>
                      
                      
                    </div>
                  </ModernCard>
                </div>
              </motion.div>
            )}
            
            {/* Réclamations Tab */}
            {activeTab === 'claims' && (
              <motion.div
                key="claims"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2 text-navy" />
                      <h2 className="text-xl font-bold text-navy">Réclamations</h2>
                    </div>
                    
                    
                  </div>
                  
                  {GRADE_CLAIMS.length > 0 ? (
                    <div className="space-y-4">
                      {GRADE_CLAIMS.map((claim) => (
                        <ModernCard key={claim.id} className="overflow-visible">
                          <div className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-navy">{claim.course}</h3>
                                <div className="text-sm text-gray-600">{claim.type} • {claim.date}</div>
                              </div>
                              <ClaimStatus status={claim.status} />
                            </div>
                            
                            <div className="mt-4 grid grid-cols-3 gap-4">
                              <div className="text-center">
                                <div className="text-sm text-gray-500 mb-1">Note initiale</div>
                                <div className="p-2 bg-gray-50 rounded-lg text-navy-800 font-medium">
                                  {claim.initialGrade}/20
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="text-sm text-gray-500 mb-1">Note demandée</div>
                                <div className="p-2 bg-navy bg-opacity-5 rounded-lg text-navy font-medium">
                                  {claim.requestedGrade}/20
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="text-sm text-gray-500 mb-1">Note finale</div>
                                <div className={`p-2 rounded-lg font-medium ${
                                  claim.status === 'approved' ? 'bg-green-50 text-green-700' : 
                                  claim.status === 'rejected' ? 'bg-red-50 text-red-700' : 
                                  'bg-gray-50 text-gray-500'
                                }`}>
                                  {claim.finalGrade !== null ? `${claim.finalGrade}/20` : 'En attente'}
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-4">
                              <h4 className="text-sm font-medium text-gray-700 mb-2">Motif de la demande</h4>
                              <div className="p-3 bg-gray-50 rounded-lg text-gray-700 text-sm">
                                {claim.reason}
                              </div>
                            </div>
                            
                            {claim.response && (
                              <div className="mt-4">
                                <h4 className="text-sm font-medium text-gray-700 mb-2">
                                  Réponse ({claim.responseDate})
                                </h4>
                                <div className="p-3 bg-navy bg-opacity-5 rounded-lg text-navy-800 text-sm border border-navy border-opacity-10">
                                  {claim.response}
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <div className="border-t border-gray-100 p-3 bg-gray-50 flex justify-between">
                            <div className="text-sm text-gray-600">
                              Professeur: {claim.professor}
                            </div>
                            <div>
                              <IconButton
                                icon={<Eye className="h-4 w-4" />}
                                variant="ghost"
                                title="Voir le détail"
                                onClick={() => console.log('View claim details')}
                              />
                            </div>
                          </div>
                        </ModernCard>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <h3 className="text-lg font-medium text-gray-700 mb-2">Aucune réclamation</h3>
                      <p className="text-gray-500 max-w-md mx-auto">
                        Cet étudiant n'a effectué aucune réclamation concernant ses notes.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </ModernCard>
      </div>
    </div>
  );
};

export default StudentDetail;