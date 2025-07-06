import React, { useState, useRef } from 'react';
import { 
  FiUpload, 
  FiFile, 
  FiUser, 
  FiCalendar, 
  FiCheckCircle, 
  FiAlertCircle,
  FiX,
  FiSearch,
  FiBook,
  FiBriefcase,
  FiInfo,
  FiMail,
  FiUsers,
  FiCpu,
  FiZap,
  FiTarget,
  FiTrendingUp,
  FiCode,
  FiDatabase,
  FiShield,
  FiSmartphone,
  FiSettings,
  FiRefreshCw,
  FiStar,
  FiHeart,
  FiClock,
  FiArrowRight
} from 'react-icons/fi';

// TypeScript interfaces
interface User {
  name: string;
  email: string;
  niveau: string;
  numero: string;
  departement: string;
  formation: string;
}

interface Encadrant {
  id: number;
  name: string;
  email: string;
  departement: string;
  specialites: string[];
}

interface Sujet {
  id: number;
  titre: string;
  encadreur: string;
  formation: string;
  type: string;
  description: string;
  competences: string[];
  niveau: string[];
  places_disponibles: number;
  date_publication: string;
  difficulte: string;
  score_matching?: number;
}

interface Memoire {
  titre: string;
  description: string;
  mots_cles: string;
  file: File | null;
}

interface Fiche {
  encadreur: string;
  sujet: string;
  sujet_propose_id: string;
  sujet_custom: string;
  description: string;
  objectifs: string;
  methodologie: string;
  type_travail: string;
  binome_nom: string;
  binome_email: string;
  duree_prevue: string;
  date_debut: string;
  date_fin_prevue: string;
}

interface IAPreferences {
  domaines: string[];
  competences: string[];
  difficulte: string;
  duree: string;
  type_projet: string;
  interets: string;
}

interface DomaineOption {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}

// Simulation du contexte d'authentification
const useAuth = (): { user: User } => ({
  user: {
    name: 'Amadou Diallo',
    email: 'amadou.diallo@etudiant.sn',
    niveau: 'Master 2',
    numero: 'M2021001',
    departement: 'Informatique',
    formation: 'Génie Informatique'
  }
});

const mockEncadrants: Encadrant[] = [
  { 
    id: 1, 
    name: 'Pr. Abdoulaye Ndiaye', 
    email: 'a.ndiaye@univ.sn',
    departement: 'Informatique',
    specialites: ['Intelligence Artificielle', 'Réseaux'] 
  },
  { 
    id: 2, 
    name: 'Dr. Fatou Diop', 
    email: 'f.diop@univ.sn',
    departement: 'Informatique',
    specialites: ['Bases de données', 'Systèmes distribués'] 
  },
  { 
    id: 3, 
    name: 'Pr. Moussa Sarr', 
    email: 'm.sarr@univ.sn',
    departement: 'Informatique',
    specialites: ['Sécurité informatique', 'Cryptographie'] 
  },
  { 
    id: 4, 
    name: 'Dr. Mariama Ba', 
    email: 'm.ba@univ.sn',
    departement: 'Informatique',
    specialites: ['Génie logiciel', 'Architecture logicielle'] 
  },
  { 
    id: 5, 
    name: 'Pr. Ibrahima Kane', 
    email: 'i.kane@univ.sn',
    departement: 'Informatique',
    specialites: ['Systèmes embarqués', 'IoT'] 
  },
];

const mockFormations: string[] = [
  'Génie Informatique',
  'Réseaux et Télécommunications',
  'Sécurité des Systèmes d\'Information',
  'Intelligence Artificielle',
  'Développement Web et Mobile',
  'Systèmes Embarqués'
];

const mockSujets: Sujet[] = [
  {
    id: 1,
    titre: 'Développement d\'une plateforme e-learning avec IA adaptative',
    encadreur: 'Pr. Abdoulaye Ndiaye',
    formation: 'Génie Informatique',
    type: 'professeur',
    description: 'Conception et développement d\'une plateforme d\'apprentissage en ligne intégrant des algorithmes d\'IA pour personnaliser l\'expérience utilisateur.',
    competences: ['React.js', 'Node.js', 'Machine Learning', 'MongoDB'],
    niveau: ['Licence', 'Master'],
    places_disponibles: 2,
    date_publication: '2024-01-15',
    difficulte: 'Intermédiaire'
  },
  {
    id: 2,
    titre: 'Sécurisation des communications IoT par blockchain',
    encadreur: 'Pr. Moussa Sarr',
    formation: 'Sécurité des Systèmes d\'Information',
    type: 'professeur',
    description: 'Étude et implémentation de mécanismes de sécurité basés sur la blockchain pour les communications dans l\'Internet des Objets.',
    competences: ['Blockchain', 'Cryptographie', 'IoT', 'Python'],
    niveau: ['Master'],
    places_disponibles: 1,
    date_publication: '2024-01-20',
    difficulte: 'Avancé'
  },
  {
    id: 3,
    titre: 'Optimisation de réseaux 5G par apprentissage automatique',
    encadreur: 'Dr. Fatou Diop',
    formation: 'Réseaux et Télécommunications',
    type: 'professeur',
    description: 'Application des techniques d\'apprentissage automatique pour optimiser les performances des réseaux 5G.',
    competences: ['5G', 'Machine Learning', 'Python', 'Simulation réseau'],
    niveau: ['Master'],
    places_disponibles: 1,
    date_publication: '2024-01-10',
    difficulte: 'Avancé'
  },
  {
    id: 4,
    titre: 'Système de reconnaissance faciale en temps réel',
    encadreur: 'IA Assistant',
    formation: 'Intelligence Artificielle',
    type: 'ia',
    description: 'Développement d\'un système de reconnaissance faciale utilisant des réseaux de neurones convolutifs avec traitement en temps réel.',
    competences: ['Deep Learning', 'OpenCV', 'Python', 'TensorFlow'],
    niveau: ['Licence', 'Master'],
    places_disponibles: 99,
    date_publication: '2024-02-01',
    difficulte: 'Intermédiaire'
  },
  {
    id: 5,
    titre: 'Application mobile de gestion des déchets intelligente',
    encadreur: 'IA Assistant',
    formation: 'Développement Web et Mobile',
    type: 'ia',
    description: 'Création d\'une application mobile utilisant la vision par ordinateur pour identifier et catégoriser les déchets automatiquement.',
    competences: ['React Native', 'Computer Vision', 'Firebase', 'API REST'],
    niveau: ['Licence'],
    places_disponibles: 99,
    date_publication: '2024-02-05',
    difficulte: 'Débutant'
  },
  {
    id: 6,
    titre: 'Système embarqué pour monitoring environnemental',
    encadreur: 'Pr. Ibrahima Kane',
    formation: 'Systèmes Embarqués',
    type: 'professeur',
    description: 'Conception d\'un système embarqué pour surveiller la qualité de l\'air et les conditions environnementales en temps réel.',
    competences: ['Arduino', 'Raspberry Pi', 'Capteurs', 'C/C++'],
    niveau: ['Licence', 'Master'],
    places_disponibles: 2,
    date_publication: '2024-01-25',
    difficulte: 'Intermédiaire'
  }
];

const DepotDossier = () => {
  const { user } = useAuth();
  const [mode, setMode] = useState<'consultation' | 'fiche' | 'memoire'>('consultation');
  const [currentStep, setCurrentStep] = useState(1);
  
  // États pour le mémoire
  const [memoire, setMemoire] = useState<Memoire>({
    titre: '',
    description: '',
    mots_cles: '',
    file: null
  });

  // États pour la fiche de dépôt
  const [fiche, setFiche] = useState<Fiche>({
    encadreur: '',
    sujet: '',
    sujet_propose_id: '',
    sujet_custom: '',
    description: '',
    objectifs: '',
    methodologie: '',
    type_travail: 'individuel',
    binome_nom: '',
    binome_email: '',
    duree_prevue: '',
    date_debut: '',
    date_fin_prevue: ''
  });

  // États pour la consultation des sujets
  const [filtreFormation, setFiltreFormation] = useState('');
  const [filtreType, setFiltreType] = useState('');
  const [filtreNiveau, setFiltreNiveau] = useState('');
  const [rechercheTexte, setRechercheTexte] = useState('');
  const [sujetSelectionne, setSujetSelectionne] = useState<Sujet | null>(null);

  // États pour l'IA
  const [showIAModal, setShowIAModal] = useState(false);
  const [iaPreferences, setIaPreferences] = useState<IAPreferences>({
    domaines: [],
    competences: [],
    difficulte: '',
    duree: '',
    type_projet: '',
    interets: ''
  });
  const [sujetsIA, setSujetsIA] = useState<Sujet[]>([]);
  const [loadingIA, setLoadingIA] = useState(false);

  const [search, setSearch] = useState('');
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isLicence = user?.niveau?.includes('Licence');
  const isMaster = user?.niveau?.includes('Master');

  const filteredEncadrants = mockEncadrants.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.specialites.some(s => s.toLowerCase().includes(search.toLowerCase()))
  );

  const selectedEncadreur = mockEncadrants.find(e => e.name === fiche.encadreur);

  // Filtrage des sujets pour la consultation
  const sujetsFiltres = mockSujets.filter(sujet => {
    const matchFormation = !filtreFormation || sujet.formation === filtreFormation;
    const matchType = !filtreType || sujet.type === filtreType;
    const matchNiveau = !filtreNiveau || sujet.niveau.includes(filtreNiveau);
    const matchTexte = !rechercheTexte || 
      sujet.titre.toLowerCase().includes(rechercheTexte.toLowerCase()) ||
      sujet.description.toLowerCase().includes(rechercheTexte.toLowerCase()) ||
      sujet.competences.some(c => c.toLowerCase().includes(rechercheTexte.toLowerCase()));
    
    return matchFormation && matchType && matchNiveau && matchTexte;
  });

  // Sujets proposés par l'encadreur sélectionné
  const sujetsEncadreur = mockSujets.filter(s => s.encadreur === fiche.encadreur);

  const domainesOptions: DomaineOption[] = [
    { id: 'ia', label: 'Intelligence Artificielle', icon: FiCpu },
    { id: 'web', label: 'Développement Web', icon: FiCode },
    { id: 'mobile', label: 'Développement Mobile', icon: FiSmartphone },
    { id: 'securite', label: 'Cybersécurité', icon: FiShield },
    { id: 'reseaux', label: 'Réseaux', icon: FiSettings },
    { id: 'donnees', label: 'Science des Données', icon: FiDatabase },
    { id: 'embarque', label: 'Systèmes Embarqués', icon: FiCpu },
  ];

  const competencesOptions = [
    'Python', 'JavaScript', 'React', 'Node.js', 'Java', 'C++', 'PHP',
    'Machine Learning', 'Deep Learning', 'Blockchain', 'Cloud Computing',
    'DevOps', 'UI/UX', 'Base de données', 'API REST', 'Microservices'
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (mode === 'fiche') {
      switch(step) {
        case 1:
          if (!fiche.encadreur) newErrors.encadreur = 'Veuillez sélectionner un encadreur';
          if (!fiche.sujet.trim()) newErrors.sujet = 'Le sujet est requis';
          if (!fiche.description.trim()) newErrors.description = 'La description est requise';
          break;
        case 2:
          if (!fiche.objectifs.trim()) newErrors.objectifs = 'Les objectifs sont requis';
          if (!fiche.methodologie.trim()) newErrors.methodologie = 'La méthodologie est requise';
          if (!fiche.duree_prevue) newErrors.duree_prevue = 'La durée prévue est requise';
          break;
        case 3:
          if (!fiche.date_debut) newErrors.date_debut = 'La date de début est requise';
          if (!fiche.date_fin_prevue) newErrors.date_fin_prevue = 'La date de fin prévue est requise';
          if (fiche.type_travail === 'binome') {
            if (!fiche.binome_nom.trim()) newErrors.binome_nom = 'Le nom du binôme est requis';
            if (!fiche.binome_email.trim()) newErrors.binome_email = 'L\'email du binôme est requis';
          }
          break;
      }
    } else if (mode === 'memoire') {
      if (!memoire.titre.trim()) newErrors.titre = 'Le titre est requis';
      if (!memoire.description.trim()) newErrors.description = 'La description est requise';
      if (!memoire.file) newErrors.file = 'Le fichier PDF est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSujetPropose = (sujet: Sujet) => {
    setFiche(prev => ({
      ...prev,
      sujet: sujet.titre,
      sujet_propose_id: sujet.id.toString(),
      encadreur: sujet.encadreur,
      description: sujet.description
    }));
    setSujetSelectionne(null);
    setMode('fiche');
    setCurrentStep(1);
  };

  const handleSujetCustomToggle = () => {
    if (fiche.sujet_propose_id) {
      setFiche(prev => ({
        ...prev,
        sujet: '',
        sujet_propose_id: '',
        sujet_custom: ''
      }));
    }
  };

  const generateIASujets = async () => {
    setLoadingIA(true);
    // Simulation génération IA basée sur le profil utilisateur
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const sujetsGeneres: Sujet[] = [
      {
        id: Date.now() + 1,
        titre: `Système de recommandation intelligent pour ${iaPreferences.type_projet}`,
        encadreur: 'IA Assistant',
        formation: user?.formation || '',
        type: 'ia',
        description: `Développement d'un système de recommandation utilisant l'IA pour améliorer l'expérience utilisateur dans le domaine ${iaPreferences.domaines.join(', ')}.`,
        competences: iaPreferences.competences.slice(0, 4),
        niveau: [user?.niveau?.includes('Master') ? 'Master' : 'Licence'],
        places_disponibles: 99,
        date_publication: new Date().toISOString(),
        difficulte: iaPreferences.difficulte,
        score_matching: 95
      },
      {
        id: Date.now() + 2,
        titre: `Plateforme collaborative pour ${iaPreferences.type_projet}`,
        encadreur: 'IA Assistant',
        formation: user?.formation || '',
        type: 'ia',
        description: `Création d'une plateforme collaborative intégrant les technologies ${iaPreferences.competences.slice(0, 2).join(' et ')} pour optimiser les processus.`,
        competences: [...iaPreferences.competences.slice(0, 3), 'API REST'],
        niveau: [user?.niveau?.includes('Master') ? 'Master' : 'Licence'],
        places_disponibles: 99,
        date_publication: new Date().toISOString(),
        difficulte: iaPreferences.difficulte,
        score_matching: 88
      },
      {
        id: Date.now() + 3,
        titre: `Analyse prédictive avec IA pour ${iaPreferences.domaines[0]}`,
        encadreur: 'IA Assistant',
        formation: user?.formation || '',
        type: 'ia',
        description: `Application de techniques d'analyse prédictive et de machine learning dans le contexte de ${iaPreferences.domaines[0]}.`,
        competences: ['Python', 'Machine Learning', ...iaPreferences.competences.slice(0, 2)],
        niveau: [user?.niveau?.includes('Master') ? 'Master' : 'Licence'],
        places_disponibles: 99,
        date_publication: new Date().toISOString(),
        difficulte: iaPreferences.difficulte,
        score_matching: 82
      }
    ];
    
    setSujetsIA(sujetsGeneres);
    setLoadingIA(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        setMemoire(prev => ({ ...prev, file }));
        setErrors(prev => ({ ...prev, file: '' }));
      } else {
        setErrors(prev => ({ ...prev, file: 'Seuls les fichiers PDF sont acceptés' }));
      }
    }
  };

  const handleFicheChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFiche(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleMemoireChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMemoire(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'memoire' && !validateStep(1)) return;
    if (mode === 'fiche' && !validateStep(3)) return;

    setIsSubmitting(true);
    
    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSuccess(true);
    setIsSubmitting(false);
    
    // Reset du formulaire
    setMemoire({ titre: '', description: '', mots_cles: '', file: null });
    setFiche({
      encadreur: '',
      sujet: '',
      sujet_propose_id: '',
      sujet_custom: '',
      description: '',
      objectifs: '',
      methodologie: '',
      type_travail: 'individuel',
      binome_nom: '',
      binome_email: '',
      duree_prevue: '',
      date_debut: '',
      date_fin_prevue: ''
    });
    setSearch('');
    setCurrentStep(1);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const resetForm = () => {
    setSuccess(false);
    setErrors({});
    setCurrentStep(1);
    setMode('consultation');
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheckCircle className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-blue-900 mb-3">Dossier déposé avec succès !</h2>
          <p className="text-gray-600 mb-8 text-lg">
            {mode === 'memoire' 
              ? 'Votre mémoire a été soumis et sera évalué par le jury.'
              : 'Votre fiche de dépôt a été envoyée à l\'encadreur pour validation.'
            }
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-blue-900 mb-4 flex items-center justify-center">
              <FiTarget className="h-5 w-5 mr-2" />
              Prochaines étapes
            </h3>
            <ul className="text-sm text-blue-700 space-y-3">
              {mode === 'memoire' ? (
                <>
                  <li className="flex items-center">
                    <FiMail className="h-4 w-4 mr-2 text-blue-500" />
                    Vous recevrez un email de confirmation
                  </li>
                  <li className="flex items-center">
                    <FiCalendar className="h-4 w-4 mr-2 text-blue-500" />
                    La date de soutenance vous sera communiquée
                  </li>
                  <li className="flex items-center">
                    <FiTarget className="h-4 w-4 mr-2 text-blue-500" />
                    Préparez votre présentation orale
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-center">
                    <FiUser className="h-4 w-4 mr-2 text-blue-500" />
                    L'encadreur recevra une notification
                  </li>
                  <li className="flex items-center">
                    <FiMail className="h-4 w-4 mr-2 text-blue-500" />
                    Vous serez informé de sa décision par email
                  </li>
                  <li className="flex items-center">
                    <FiZap className="h-4 w-4 mr-2 text-blue-500" />
                    En cas d'acceptation, vous pourrez commencer votre travail
                  </li>
                </>
              )}
            </ul>
          </div>
          <button
            onClick={resetForm}
            className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold shadow-lg"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* En-tête modernisé */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            Plateforme Académique
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {isLicence 
              ? 'Gérez vos rapports de stage et soutenances en toute simplicité'
              : 'Déposez et suivez vos mémoires de fin d\'études'
            }
          </p>
        </div>

        {/* Sélection du mode avec design amélioré */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-blue-900 text-center mb-8">Que souhaitez-vous faire ?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div
              onClick={() => setMode('consultation')}
              className={`group cursor-pointer rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 ${
                mode === 'consultation' 
                  ? 'bg-blue-600 text-white shadow-xl' 
                  : 'bg-white hover:shadow-lg border border-gray-200'
              }`}
            >
              <div className="text-center">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                  mode === 'consultation' ? 'bg-white/20' : 'bg-blue-100'
                }`}>
                  <FiSearch className={`h-8 w-8 ${mode === 'consultation' ? 'text-white' : 'text-blue-600'}`} />
                </div>
                <h4 className={`font-bold text-xl mb-2 ${mode === 'consultation' ? 'text-white' : 'text-blue-900'}`}>
                  Consulter les sujets
                </h4>
                <p className={`text-sm ${mode === 'consultation' ? 'text-white/80' : 'text-gray-600'}`}>
                  Découvrez les sujets proposés par les professeurs et l'IA
                </p>
              </div>
            </div>

            <div
              onClick={() => setMode('fiche')}
              className={`group cursor-pointer rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 ${
                mode === 'fiche' 
                  ? 'bg-blue-600 text-white shadow-xl' 
                  : 'bg-white hover:shadow-lg border border-gray-200'
              }`}
            >
              <div className="text-center">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                  mode === 'fiche' ? 'bg-white/20' : 'bg-green-100'
                }`}>
                  <FiFile className={`h-8 w-8 ${mode === 'fiche' ? 'text-white' : 'text-green-600'}`} />
                </div>
                <h4 className={`font-bold text-xl mb-2 ${mode === 'fiche' ? 'text-white' : 'text-blue-900'}`}>
                  {isLicence ? 'Proposition de Stage' : 'Proposition de Mémoire'}
                </h4>
                <p className={`text-sm ${mode === 'fiche' ? 'text-white/80' : 'text-gray-600'}`}>
                  {isLicence 
                    ? 'Soumettez votre demande de validation de stage'
                    : 'Proposez votre sujet de mémoire'
                  }
                </p>
              </div>
            </div>

            <div
              onClick={() => setMode('memoire')}
              className={`group cursor-pointer rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 ${
                mode === 'memoire' 
                  ? 'bg-blue-600 text-white shadow-xl' 
                  : 'bg-white hover:shadow-lg border border-gray-200'
              }`}
            >
              <div className="text-center">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                  mode === 'memoire' ? 'bg-white/20' : 'bg-purple-100'
                }`}>
                  <FiBook className={`h-8 w-8 ${mode === 'memoire' ? 'text-white' : 'text-purple-600'}`} />
                </div>
                <h4 className={`font-bold text-xl mb-2 ${mode === 'memoire' ? 'text-white' : 'text-blue-900'}`}>
                  {isLicence ? 'Rapport Final' : 'Mémoire Final'}
                </h4>
                <p className={`text-sm ${mode === 'memoire' ? 'text-white/80' : 'text-gray-600'}`}>
                  {isLicence 
                    ? 'Déposez votre rapport de stage finalisé'
                    : 'Soumettez votre mémoire final'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Informations utilisateur améliorées */}
        {mode !== 'consultation' && (
          <div className="mb-8 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-blue-600 p-6">
              <h3 className="text-white font-bold text-lg flex items-center">
                <FiUser className="h-5 w-5 mr-3" />
                Profil Étudiant
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FiUser className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Nom et prénom</p>
                    <p className="font-semibold text-blue-900">{user?.name}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <FiMail className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold text-blue-900">{user?.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FiTrendingUp className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Formation</p>
                    <p className="font-semibold text-blue-900">{user?.niveau}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mode consultation avec design moderne */}
        {mode === 'consultation' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-bold text-xl">Catalogue des Sujets</h3>
                  <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium">
                    {sujetsFiltres.length} sujet(s) disponible(s)
                  </span>
                </div>
              </div>

              {/* Bouton IA Générateur */}
              <div className="p-6 border-b border-gray-100">
                <div className="bg-purple-500 rounded-2xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <FiCpu className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Générateur IA de Sujets</h4>
                        <p className="text-white/80 text-sm">Obtenez des suggestions personnalisées basées sur votre profil</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowIAModal(true)}
                      className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center space-x-2"
                    >
                      <FiZap className="h-4 w-4" />
                      <span>Générer des sujets</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Filtres améliorés */}
              <div className="p-6 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-blue-700 mb-2">Formation</label>
                    <select
                      value={filtreFormation}
                      onChange={(e) => setFiltreFormation(e.target.value)}
                      className="w-full rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                    >
                      <option value="">Toutes les formations</option>
                      {mockFormations.map(formation => (
                        <option key={formation} value={formation}>{formation}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-blue-700 mb-2">Source</label>
                    <select
                      value={filtreType}
                      onChange={(e) => setFiltreType(e.target.value)}
                      className="w-full rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                    >
                      <option value="">Toutes les sources</option>
                      <option value="professeur">👨‍🏫 Professeurs</option>
                      <option value="ia">🤖 IA Assistant</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-blue-700 mb-2">Niveau</label>
                    <select
                      value={filtreNiveau}
                      onChange={(e) => setFiltreNiveau(e.target.value)}
                      className="w-full rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                    >
                      <option value="">Tous niveaux</option>
                      <option value="Licence">Licence</option>
                      <option value="Master">Master</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-blue-700 mb-2">Recherche</label>
                    <div className="relative">
                      <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        type="text"
                        placeholder="Mots-clés..."
                        value={rechercheTexte}
                        onChange={(e) => setRechercheTexte(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-blue-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Liste des sujets avec design moderne */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sujetsFiltres.map(sujet => (
                    <div key={sujet.id} className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-blue-300 transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-3">
                            <span className="text-2xl">{sujet.type === 'ia' ? '🤖' : '👨‍🏫'}</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              sujet.type === 'ia' 
                                ? 'bg-purple-100 text-purple-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {sujet.type === 'ia' ? 'IA Assistant' : 'Professeur'}
                            </span>
                          </div>
                          <h4 className="font-bold text-blue-900 mb-2 group-hover:text-blue-700 transition-colors">{sujet.titre}</h4>
                          <p className="text-sm text-gray-600 mb-3">{sujet.encadreur}</p>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            sujet.places_disponibles > 0 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {sujet.type === 'ia' ? '∞' : sujet.places_disponibles} place(s)
                          </span>
                          {sujet.score_matching && (
                            <span className="bg-yellow-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                              <FiStar className="h-3 w-3 mr-1" />
                              {sujet.score_matching}% match
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{sujet.description}</p>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <FiTarget className="h-4 w-4 text-blue-600" />
                          <span className="text-xs font-medium text-blue-700">Formation :</span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg font-medium">
                            {sujet.formation}
                          </span>
                        </div>
                        
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <FiCode className="h-4 w-4 text-blue-600" />
                            <span className="text-xs font-medium text-blue-700">Technologies :</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {sujet.competences.slice(0, 3).map(comp => (
                              <span key={comp} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg">
                                {comp}
                              </span>
                            ))}
                            {sujet.competences.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg">
                                +{sujet.competences.length - 3}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>Niveaux : {sujet.niveau.join(', ')}</span>
                            {sujet.difficulte && (
                              <span className={`px-2 py-1 rounded-lg font-medium ${
                                sujet.difficulte === 'Débutant' ? 'bg-green-100 text-green-700' :
                                sujet.difficulte === 'Intermédiaire' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {sujet.difficulte}
                              </span>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setSujetSelectionne(sujet)}
                              className="px-4 py-2 text-sm border border-blue-300 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors"
                            >
                              Détails
                            </button>
                            {(sujet.places_disponibles > 0 || sujet.type === 'ia') && (
                              <button
                                onClick={() => handleSujetPropose(sujet)}
                                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 flex items-center space-x-1"
                              >
                                <FiHeart className="h-3 w-3" />
                                <span>Choisir</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {sujetsFiltres.length === 0 && (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FiSearch className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-blue-900 mb-2">Aucun sujet trouvé</h3>
                    <p className="text-gray-600 mb-6">Essayez de modifier vos critères de recherche ou utilisez notre générateur IA</p>
                    <button
                      onClick={() => setShowIAModal(true)}
                      className="px-6 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-all duration-300 flex items-center space-x-2 mx-auto"
                    >
                      <FiCpu className="h-4 w-4" />
                      <span>Générer avec l'IA</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Modal détail sujet */}
        {sujetSelectionne && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className={`p-6 ${sujetSelectionne.type === 'ia' 
                ? 'bg-purple-500' 
                : 'bg-blue-600'
              } text-white`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-3xl">
                        {sujetSelectionne.type === 'ia' ? '🤖' : '👨‍🏫'}
                      </span>
                      <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {sujetSelectionne.type === 'ia' ? 'Proposé par IA' : 'Proposé par professeur'}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">{sujetSelectionne.titre}</h2>
                    <p className="text-white/80 text-lg">{sujetSelectionne.encadreur}</p>
                  </div>
                  <button 
                    onClick={() => setSujetSelectionne(null)}
                    className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
                  >
                    <FiX className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <div className="p-8 space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center">
                    <FiInfo className="h-5 w-5 mr-2 text-blue-500" />
                    Description détaillée
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg">{sujetSelectionne.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center">
                      <FiTarget className="h-5 w-5 mr-2 text-green-500" />
                      Formation
                    </h3>
                    <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-xl font-medium">
                      {sujetSelectionne.formation}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center">
                      <FiTrendingUp className="h-5 w-5 mr-2 text-purple-500" />
                      Niveaux acceptés
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {sujetSelectionne.niveau.map(n => (
                        <span key={n} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg font-medium">
                          {n}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center">
                    <FiCode className="h-5 w-5 mr-2 text-orange-500" />
                    Technologies et compétences requises
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {sujetSelectionne.competences.map(comp => (
                      <span key={comp} className="px-4 py-2 bg-green-100 text-green-700 rounded-xl font-medium">
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>

                {sujetSelectionne.difficulte && (
                  <div>
                    <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center">
                      <FiTarget className="h-5 w-5 mr-2 text-red-500" />
                      Niveau de difficulté
                    </h3>
                    <span className={`inline-block px-4 py-2 rounded-xl font-medium ${
                      sujetSelectionne.difficulte === 'Débutant' ? 'bg-green-100 text-green-700' :
                      sujetSelectionne.difficulte === 'Intermédiaire' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {sujetSelectionne.difficulte}
                    </span>
                  </div>
                )}

                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <FiUsers className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Places disponibles</p>
                        <p className={`text-2xl font-bold ${
                          sujetSelectionne.places_disponibles > 0 || sujetSelectionne.type === 'ia'
                            ? 'text-green-600' 
                            : 'text-red-600'
                        }`}>
                          {sujetSelectionne.type === 'ia' ? '∞' : sujetSelectionne.places_disponibles}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Publié le</p>
                      <p className="font-medium text-blue-900">
                        {new Date(sujetSelectionne.date_publication).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setSujetSelectionne(null)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Fermer
                  </button>
                  {(sujetSelectionne.places_disponibles > 0 || sujetSelectionne.type === 'ia') && (
                                      <button
                    onClick={() => handleSujetPropose(sujetSelectionne)}
                    className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 flex items-center space-x-2"
                  >
                      <FiHeart className="h-4 w-4" />
                      <span>Choisir ce sujet</span>
                      <FiArrowRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal IA */}
        {showIAModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-purple-500 p-6 text-white">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <FiCpu className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Générateur IA de Sujets</h2>
                      <p className="text-white/80">Personnalisez vos préférences pour obtenir des suggestions adaptées</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowIAModal(false)}
                    className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
                  >
                    <FiX className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <div className="p-8 space-y-8">
                {/* Domaines d'intérêt */}
                <div>
                  <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center">
                    <FiTarget className="h-5 w-5 mr-2 text-purple-500" />
                    Domaines d'intérêt
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {domainesOptions.map(domaine => {
                      const IconComponent = domaine.icon;
                      const isSelected = iaPreferences.domaines.includes(domaine.id);
                      return (
                        <div
                          key={domaine.id}
                          onClick={() => {
                            setIaPreferences(prev => ({
                              ...prev,
                              domaines: isSelected 
                                ? prev.domaines.filter(d => d !== domaine.id)
                                : [...prev.domaines, domaine.id]
                            }));
                          }}
                          className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 ${
                            isSelected 
                              ? 'border-purple-500 bg-purple-50 text-purple-700' 
                              : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
                          }`}
                        >
                          <div className="text-center">
                            <IconComponent className={`h-6 w-6 mx-auto mb-2 ${isSelected ? 'text-purple-500' : 'text-gray-500'}`} />
                            <p className="text-sm font-medium">{domaine.label}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Compétences techniques */}
                <div>
                  <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center">
                    <FiCode className="h-5 w-5 mr-2 text-purple-500" />
                    Compétences techniques
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {competencesOptions.map(competence => {
                      const isSelected = iaPreferences.competences.includes(competence);
                      return (
                        <button
                          key={competence}
                          onClick={() => {
                            setIaPreferences(prev => ({
                              ...prev,
                              competences: isSelected 
                                ? prev.competences.filter(c => c !== competence)
                                : [...prev.competences, competence]
                            }));
                          }}
                          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                            isSelected 
                              ? 'bg-purple-500 text-white' 
                              : 'bg-gray-100 text-gray-700 hover:bg-purple-100'
                          }`}
                        >
                          {competence}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Paramètres du projet */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-blue-700 mb-3">Niveau de difficulté</label>
                    <div className="space-y-2">
                      {['Débutant', 'Intermédiaire', 'Avancé'].map(niveau => (
                        <label key={niveau} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="difficulte"
                            value={niveau}
                            checked={iaPreferences.difficulte === niveau}
                            onChange={(e) => setIaPreferences(prev => ({ ...prev, difficulte: e.target.value }))}
                            className="text-purple-500 focus:ring-purple-500"
                          />
                          <span className={`text-sm ${iaPreferences.difficulte === niveau ? 'font-semibold text-purple-700' : 'text-gray-700'}`}>
                            {niveau}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-blue-700 mb-3">Type de projet</label>
                    <select
                      value={iaPreferences.type_projet}
                      onChange={(e) => setIaPreferences(prev => ({ ...prev, type_projet: e.target.value }))}
                      className="w-full rounded-xl border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    >
                      <option value="">Sélectionner un type</option>
                      <option value="Application Web">Application Web</option>
                      <option value="Application Mobile">Application Mobile</option>
                      <option value="Système de gestion">Système de gestion</option>
                      <option value="Analyse de données">Analyse de données</option>
                      <option value="Intelligence Artificielle">Intelligence Artificielle</option>
                      <option value="Sécurité informatique">Sécurité informatique</option>
                    </select>
                  </div>
                </div>

                {/* Intérêts spécifiques */}
                <div>
                  <label className="block text-sm font-bold text-blue-700 mb-3">
                    Décrivez vos intérêts spécifiques (optionnel)
                  </label>
                  <textarea
                    value={iaPreferences.interets}
                    onChange={(e) => setIaPreferences(prev => ({ ...prev, interets: e.target.value }))}
                    rows={3}
                    className="w-full rounded-xl border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    placeholder="Ex: Je m'intéresse à l'impact social de la technologie, aux interfaces utilisateur innovantes..."
                  />
                </div>

                {/* Boutons d'action */}
                <div className="flex justify-between pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowIAModal(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={generateIASujets}
                    disabled={loadingIA || iaPreferences.domaines.length === 0}
                    className="px-8 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {loadingIA ? (
                      <>
                        <FiRefreshCw className="h-4 w-4 animate-spin" />
                        <span>Génération en cours...</span>
                      </>
                    ) : (
                      <>
                        <FiZap className="h-4 w-4" />
                        <span>Générer mes sujets</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Résultats IA */}
                {sujetsIA.length > 0 && (
                  <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
                    <h4 className="text-lg font-bold text-purple-900 mb-4 flex items-center">
                      <FiStar className="h-5 w-5 mr-2" />
                      Sujets générés pour vous
                    </h4>
                    <div className="space-y-4">
                      {sujetsIA.map(sujet => (
                        <div key={sujet.id} className="bg-white p-4 rounded-xl border border-purple-200">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h5 className="font-semibold text-blue-900 mb-1">{sujet.titre}</h5>
                              <p className="text-sm text-gray-600">{sujet.description}</p>
                            </div>
                            <div className="flex items-center space-x-2 ml-4">
                              <span className="bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 px-2 py-1 rounded-lg text-xs font-medium flex items-center">
                                <FiStar className="h-3 w-3 mr-1" />
                                {sujet.score_matching}%
                              </span>
                              <button
                                onClick={() => {
                                  handleSujetPropose(sujet);
                                  setShowIAModal(false);
                                }}
                                className="px-3 py-1 bg-purple-500 text-white rounded-lg text-sm hover:bg-purple-600 transition-all duration-300"
                              >
                                Choisir
                              </button>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {sujet.competences.map(comp => (
                              <span key={comp} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-lg">
                                {comp}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Formulaires avec design amélioré */}
        {mode !== 'consultation' && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
              <h3 className="text-white font-bold text-xl">
                {mode === 'memoire' 
                  ? `Dépôt de ${isLicence ? 'Rapport' : 'Mémoire'} Final`
                  : `${isLicence ? 'Proposition de Stage' : 'Proposition de Mémoire'}`
                }
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-8">
              {mode === 'memoire' ? (
                /* Mode Mémoire */
                <div className="space-y-8">
                  <div>
                    <label htmlFor="titre" className="block text-lg font-bold text-blue-900 mb-3">
                      Titre du {isLicence ? 'rapport' : 'mémoire'} *
                    </label>
                    <input
                      type="text"
                      id="titre"
                      name="titre"
                      value={memoire.titre}
                      onChange={handleMemoireChange}
                      className={`w-full rounded-xl border-2 px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                        errors.titre ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder={`Titre de votre ${isLicence ? 'rapport de stage' : 'mémoire'}...`}
                    />
                    {errors.titre && <p className="mt-2 text-sm text-red-600 flex items-center">
                      <FiAlertCircle className="h-4 w-4 mr-1" />
                      {errors.titre}
                    </p>}
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-lg font-bold text-blue-900 mb-3">
                      Résumé exécutif *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={memoire.description}
                      onChange={handleMemoireChange}
                      rows={6}
                      className={`w-full rounded-xl border-2 px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                        errors.description ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder={`Résumé détaillé de votre ${isLicence ? 'stage et de vos réalisations' : 'travail de recherche'}...`}
                    />
                    {errors.description && <p className="mt-2 text-sm text-red-600 flex items-center">
                      <FiAlertCircle className="h-4 w-4 mr-1" />
                      {errors.description}
                    </p>}
                  </div>

                  <div>
                    <label htmlFor="mots_cles" className="block text-lg font-bold text-blue-900 mb-3">
                      Mots-clés
                    </label>
                    <input
                      type="text"
                      id="mots_cles"
                      name="mots_cles"
                      value={memoire.mots_cles}
                      onChange={handleMemoireChange}
                      className="w-full rounded-xl border-2 border-gray-300 px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="Mots-clés séparés par des virgules..."
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-bold text-blue-900 mb-3">
                      Document PDF du {isLicence ? 'rapport' : 'mémoire'} *
                    </label>
                    <div className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                      errors.file ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                    }`}>
                      <FiUpload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".pdf"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold"
                      >
                        Choisir un fichier PDF
                      </button>
                      <p className="text-gray-500 mt-3">ou glissez-déposez votre fichier ici</p>
                      <p className="text-sm text-gray-400 mt-2">Taille maximale : 10 MB</p>
                    </div>
                    {memoire.file && (
                      <div className="mt-4 flex items-center space-x-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
                        <FiCheckCircle className="h-6 w-6 text-green-600" />
                        <span className="text-green-700 font-medium flex-1">
                          Fichier sélectionné : {memoire.file.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => setMemoire(prev => ({ ...prev, file: null }))}
                          className="text-green-600 hover:text-green-700 p-1 rounded-lg hover:bg-green-100 transition-colors"
                        >
                          <FiX className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                    {errors.file && <p className="mt-2 text-sm text-red-600 flex items-center">
                      <FiAlertCircle className="h-4 w-4 mr-1" />
                      {errors.file}
                    </p>}
                  </div>

                  {/* Bouton de soumission pour le mode mémoire */}
                  <div className="flex justify-end pt-8 border-t border-gray-200">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3 text-lg font-semibold"
                    >
                      {isSubmitting ? (
                        <>
                          <FiRefreshCw className="h-5 w-5 animate-spin" />
                          <span>Envoi en cours...</span>
                        </>
                      ) : (
                        <>
                          <FiUpload className="h-5 w-5" />
                          <span>Déposer le {isLicence ? 'rapport' : 'mémoire'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                /* Mode Fiche de dépôt */
                <div className="space-y-10">
                  {/* Indicateur d'étapes amélioré */}
                  <div className="flex items-center justify-center mb-12">
                    <div className="flex items-center space-x-4">
                      {[1, 2, 3].map((step) => (
                        <React.Fragment key={step}>
                          <div className="flex flex-col items-center">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                              step === currentStep
                                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                                : step < currentStep
                                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                                : 'bg-gray-200 text-gray-600'
                            }`}>
                              {step < currentStep ? <FiCheckCircle className="h-6 w-6" /> : step}
                            </div>
                            <span className={`text-sm mt-2 font-medium ${
                              step <= currentStep ? 'text-blue-900' : 'text-gray-500'
                            }`}>
                              {step === 1 ? 'Informations' : step === 2 ? 'Détails' : 'Planning'}
                            </span>
                          </div>
                          {step < 3 && (
                            <div className={`h-1 w-16 transition-all duration-300 ${
                              step < currentStep ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gray-200'
                            }`} />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Étape 1: Informations de base */}
                  {currentStep === 1 && (
                    <div className="space-y-8">
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-blue-900 mb-2">
                          Étape 1: Informations de base
                        </h3>
                        <p className="text-gray-600">Sélectionnez votre encadreur et définissez votre sujet</p>
                      </div>

                      {/* Sélection encadreur */}
                      <div>
                        <label className="block text-lg font-bold text-blue-900 mb-4">
                          Rechercher un encadreur *
                        </label>
                        <div className="relative mb-4">
                          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <input
                            type="text"
                            placeholder="Rechercher par nom ou spécialité..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-lg"
                          />
                        </div>
                        <select
                          name="encadreur"
                          value={fiche.encadreur}
                          onChange={handleFicheChange}
                          className={`w-full rounded-xl border-2 px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                            errors.encadreur ? 'border-red-300' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Sélectionner un encadreur</option>
                          {filteredEncadrants.map(e => (
                            <option key={e.id} value={e.name}>
                              {e.name} - {e.specialites.join(', ')}
                            </option>
                          ))}
                        </select>
                        {errors.encadreur && <p className="mt-2 text-sm text-red-600 flex items-center">
                          <FiAlertCircle className="h-4 w-4 mr-1" />
                          {errors.encadreur}
                        </p>}
                        
                        {selectedEncadreur && (
                          <div className="mt-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl">
                            <div className="flex items-start space-x-4">
                              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <FiUser className="h-6 w-6 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-bold text-blue-900 text-lg">{selectedEncadreur.name}</h4>
                                <p className="text-blue-700 flex items-center mt-2">
                                  <FiMail className="h-4 w-4 mr-2" />
                                  {selectedEncadreur.email}
                                </p>
                                <div className="mt-3">
                                  <span className="text-sm font-medium text-blue-800">Spécialités :</span>
                                  <div className="flex flex-wrap gap-2 mt-1">
                                    {selectedEncadreur.specialites.map(spec => (
                                      <span key={spec} className="px-3 py-1 bg-blue-200 text-blue-800 rounded-lg text-sm font-medium">
                                        {spec}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
                        <div className="flex items-start space-x-3">
                          <FiInfo className="h-6 w-6 text-amber-600 mt-0.5" />
                          <div className="text-amber-800">
                            <p className="font-semibold mb-1">Important</p>
                            <p className="text-sm">L'encadreur choisi devra valider votre proposition avant que vous puissiez commencer votre travail.</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-lg font-bold text-blue-900 mb-4">
                          Sujet du {isLicence ? 'stage' : 'mémoire'} *
                        </label>
                        
                        {/* Option sujets proposés vs sujet personnalisé */}
                        <div className="mb-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <label className="flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all hover:bg-gray-50">
                              <input
                                type="radio"
                                name="type_sujet"
                                checked={!fiche.sujet_propose_id && !fiche.sujet_custom}
                                onChange={() => handleSujetCustomToggle()}
                                className="mr-3 text-blue-600 focus:ring-blue-500"
                              />
                              <div>
                                <span className="font-semibold text-blue-900">Sujet proposé</span>
                                <p className="text-sm text-gray-600">Choisir parmi les sujets existants</p>
                              </div>
                            </label>
                            <label className="flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all hover:bg-gray-50">
                              <input
                                type="radio"
                                name="type_sujet"
                                checked={!!fiche.sujet_custom || (!fiche.sujet_propose_id && !!fiche.sujet)}
                                onChange={() => setFiche(prev => ({ ...prev, sujet_custom: 'custom', sujet_propose_id: '' }))}
                                className="mr-3 text-blue-600 focus:ring-blue-500"
                              />
                              <div>
                                <span className="font-semibold text-blue-900">Sujet personnalisé</span>
                                <p className="text-sm text-gray-600">Créer votre propre sujet</p>
                              </div>
                            </label>
                          </div>

                          {/* Sujets proposés par l'encadreur */}
                          {(!fiche.sujet_custom && !fiche.sujet_propose_id) && fiche.encadreur && sujetsEncadreur.length > 0 && (
                            <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl">
                              <h5 className="font-bold text-blue-900 mb-4 text-lg">
                                Sujets proposés par {fiche.encadreur} :
                              </h5>
                              <div className="space-y-3">
                                {sujetsEncadreur.map(sujet => (
                                  <div
                                    key={sujet.id}
                                    onClick={() => setFiche(prev => ({ 
                                      ...prev, 
                                      sujet_propose_id: sujet.id.toString(),
                                      sujet: sujet.titre,
                                      description: sujet.description 
                                    }))}
                                    className="cursor-pointer p-4 border border-blue-200 rounded-xl hover:bg-blue-100 transition-all bg-white"
                                  >
                                    <div className="flex items-start justify-between">
                                      <div className="flex-1">
                                        <h6 className="font-semibold text-blue-900 mb-2">{sujet.titre}</h6>
                                        <p className="text-sm text-blue-700 mb-3">{sujet.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                          {sujet.competences.slice(0, 3).map(comp => (
                                            <span key={comp} className="px-3 py-1 bg-blue-200 text-blue-800 text-xs rounded-lg font-medium">
                                              {comp}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                      <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                                        sujet.places_disponibles > 0 
                                          ? 'bg-green-100 text-green-700' 
                                          : 'bg-red-100 text-red-700'
                                      }`}>
                                        {sujet.places_disponibles} place(s)
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <div className="mt-4 p-3 bg-blue-100 rounded-xl">
                                <p className="text-sm text-blue-800 flex items-center">
                                  <FiInfo className="h-4 w-4 mr-2" />
                                  Vous pouvez aussi{' '}
                                  <button
                                    type="button"
                                    onClick={() => setMode('consultation')}
                                    className="underline hover:no-underline ml-1 font-medium"
                                  >
                                    consulter tous les sujets disponibles
                                  </button>
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Génération IA améliorée */}
                          {(!fiche.sujet_custom && !fiche.sujet_propose_id) && fiche.encadreur && (
                            <div className="mb-6 p-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                                    <FiCpu className="h-6 w-6 text-white" />
                                  </div>
                                  <div>
                                    <h5 className="font-bold text-purple-900 text-lg">Générateur IA de sujets</h5>
                                    <p className="text-purple-700 text-sm">Obtenez des suggestions personnalisées basées sur votre profil et vos intérêts</p>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setShowIAModal(true)}
                                  className="px-6 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-all duration-300 font-semibold flex items-center space-x-2"
                                >
                                  <FiZap className="h-4 w-4" />
                                  <span>Générer avec l'IA</span>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Champ de saisie du sujet */}
                        {fiche.sujet_propose_id ? (
                          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <FiCheckCircle className="h-5 w-5 text-green-600" />
                                <div>
                                  <span className="text-sm font-medium text-green-700">Sujet sélectionné :</span>
                                  <p className="font-semibold text-green-900">{fiche.sujet}</p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => setFiche(prev => ({ ...prev, sujet_propose_id: '', sujet: '' }))}
                                className="text-green-600 hover:text-green-700 p-2 rounded-lg hover:bg-green-100 transition-colors"
                              >
                                <FiX className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <input
                            type="text"
                            name="sujet"
                            value={fiche.sujet}
                            onChange={handleFicheChange}
                            className={`w-full rounded-xl border-2 px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                              errors.sujet ? 'border-red-300' : 'border-gray-300'
                            }`}
                            placeholder={`Titre de votre ${isLicence ? 'projet de stage' : 'sujet de mémoire'}...`}
                          />
                        )}
                        {errors.sujet && <p className="mt-2 text-sm text-red-600 flex items-center">
                          <FiAlertCircle className="h-4 w-4 mr-1" />
                          {errors.sujet}
                        </p>}
                      </div>

                      <div>
                        <label className="block text-lg font-bold text-blue-900 mb-3">
                          Description du projet *
                        </label>
                        <textarea
                          name="description"
                          value={fiche.description}
                          onChange={handleFicheChange}
                          rows={5}
                          className={`w-full rounded-xl border-2 px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                            errors.description ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder={`Décrivez en détail votre ${isLicence ? 'projet de stage' : 'sujet de mémoire'}...`}
                        />
                        {errors.description && <p className="mt-2 text-sm text-red-600 flex items-center">
                          <FiAlertCircle className="h-4 w-4 mr-1" />
                          {errors.description}
                        </p>}
                      </div>
                    </div>
                  )}

                  {/* Étape 2: Détails du projet */}
                  {currentStep === 2 && (
                    <div className="space-y-8">
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-blue-900 mb-2">
                          Étape 2: Détails du projet
                        </h3>
                        <p className="text-gray-600">Définissez les objectifs et la méthodologie de votre projet</p>
                      </div>

                      <div>
                        <label className="block text-lg font-bold text-blue-900 mb-3">
                          Objectifs du projet *
                        </label>
                        <textarea
                          name="objectifs"
                          value={fiche.objectifs}
                          onChange={handleFicheChange}
                          rows={4}
                          className={`w-full rounded-xl border-2 px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                            errors.objectifs ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="Quels sont les objectifs principaux de votre projet ? Que souhaitez-vous accomplir ?"
                        />
                        {errors.objectifs && <p className="mt-2 text-sm text-red-600 flex items-center">
                          <FiAlertCircle className="h-4 w-4 mr-1" />
                          {errors.objectifs}
                        </p>}
                      </div>

                      <div>
                        <label className="block text-lg font-bold text-blue-900 mb-3">
                          Méthodologie et approche *
                        </label>
                        <textarea
                          name="methodologie"
                          value={fiche.methodologie}
                          onChange={handleFicheChange}
                          rows={4}
                          className={`w-full rounded-xl border-2 px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                            errors.methodologie ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="Comment comptez-vous procéder ? Quelles méthodes et outils utiliserez-vous ?"
                        />
                        {errors.methodologie && <p className="mt-2 text-sm text-red-600 flex items-center">
                          <FiAlertCircle className="h-4 w-4 mr-1" />
                          {errors.methodologie}
                        </p>}
                      </div>

                      <div>
                        <label className="block text-lg font-bold text-blue-900 mb-3">
                          Durée prévue du projet *
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {(isLicence ? ['3 mois', '4 mois', '5 mois', '6 mois'] : ['6 mois', '8 mois', '10 mois', '12 mois']).map(duree => (
                            <label
                              key={duree}
                              className={`cursor-pointer p-4 rounded-xl border-2 transition-all text-center ${
                                fiche.duree_prevue === duree
                                  ? 'border-blue-500 bg-blue-50 text-blue-900'
                                  : 'border-gray-300 hover:border-blue-400'
                              }`}
                            >
                              <input
                                type="radio"
                                name="duree_prevue"
                                value={duree}
                                checked={fiche.duree_prevue === duree}
                                onChange={handleFicheChange}
                                className="sr-only"
                              />
                              <div className="flex flex-col items-center">
                                <FiClock className={`h-6 w-6 mb-2 ${fiche.duree_prevue === duree ? 'text-blue-600' : 'text-gray-500'}`} />
                                <span className="font-semibold">{duree}</span>
                              </div>
                            </label>
                          ))}
                        </div>
                        {errors.duree_prevue && <p className="mt-2 text-sm text-red-600 flex items-center">
                          <FiAlertCircle className="h-4 w-4 mr-1" />
                          {errors.duree_prevue}
                        </p>}
                      </div>

                      {/* Ressources nécessaires */}
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                        <h4 className="font-bold text-blue-900 mb-4 flex items-center">
                          <FiSettings className="h-5 w-5 mr-2" />
                          Ressources et outils nécessaires
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-blue-700 mb-2">Technologies</label>
                            <input
                              type="text"
                              placeholder="Ex: React, Python, MySQL..."
                              className="w-full rounded-lg border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-blue-700 mb-2">Matériel/Logiciels</label>
                            <input
                              type="text"
                              placeholder="Ex: Serveur, licences, équipements..."
                              className="w-full rounded-lg border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Étape 3: Planning et collaboration */}
                  {currentStep === 3 && (
                    <div className="space-y-8">
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-blue-900 mb-2">
                          Étape 3: Planning et collaboration
                        </h3>
                        <p className="text-gray-600">Définissez le calendrier et le mode de travail</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-lg font-bold text-blue-900 mb-3">
                            Date de début prévue *
                          </label>
                          <div className="relative">
                            <FiCalendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                              type="date"
                              name="date_debut"
                              value={fiche.date_debut}
                              onChange={handleFicheChange}
                              className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                                errors.date_debut ? 'border-red-300' : 'border-gray-300'
                              }`}
                            />
                          </div>
                          {errors.date_debut && <p className="mt-2 text-sm text-red-600 flex items-center">
                            <FiAlertCircle className="h-4 w-4 mr-1" />
                            {errors.date_debut}
                          </p>}
                        </div>

                        <div>
                          <label className="block text-lg font-bold text-blue-900 mb-3">
                            Date de fin prévue *
                          </label>
                          <div className="relative">
                            <FiCalendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                              type="date"
                              name="date_fin_prevue"
                              value={fiche.date_fin_prevue}
                              onChange={handleFicheChange}
                              className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                                errors.date_fin_prevue ? 'border-red-300' : 'border-gray-300'
                              }`}
                            />
                          </div>
                          {errors.date_fin_prevue && <p className="mt-2 text-sm text-red-600 flex items-center">
                            <FiAlertCircle className="h-4 w-4 mr-1" />
                            {errors.date_fin_prevue}
                          </p>}
                        </div>
                      </div>

                      {isMaster && (
                        <div>
                          <label className="block text-lg font-bold text-blue-900 mb-6">
                            Mode de travail
                          </label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div
                              onClick={() => setFiche(prev => ({ ...prev, type_travail: 'individuel' }))}
                              className={`cursor-pointer rounded-2xl p-6 border-2 transition-all duration-300 ${
                                fiche.type_travail === 'individuel' 
                                  ? 'border-blue-500 bg-blue-50' 
                                  : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                              }`}
                            >
                              <div className="text-center">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                                  fiche.type_travail === 'individuel' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                                }`}>
                                  <FiUser className="h-8 w-8" />
                                </div>
                                <h4 className={`font-bold text-lg mb-2 ${
                                  fiche.type_travail === 'individuel' ? 'text-blue-900' : 'text-gray-700'
                                }`}>
                                  Travail individuel
                                </h4>
                                <p className="text-gray-600">Réaliser le projet en autonomie complète</p>
                              </div>
                            </div>

                            <div
                              onClick={() => setFiche(prev => ({ ...prev, type_travail: 'binome' }))}
                              className={`cursor-pointer rounded-2xl p-6 border-2 transition-all duration-300 ${
                                fiche.type_travail === 'binome' 
                                  ? 'border-blue-500 bg-blue-50' 
                                  : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                              }`}
                            >
                              <div className="text-center">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                                  fiche.type_travail === 'binome' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                                }`}>
                                  <FiUsers className="h-8 w-8" />
                                </div>
                                <h4 className={`font-bold text-lg mb-2 ${
                                  fiche.type_travail === 'binome' ? 'text-blue-900' : 'text-gray-700'
                                }`}>
                                  Travail en binôme
                                </h4>
                                <p className="text-gray-600">Collaborer avec un autre étudiant</p>
                              </div>
                            </div>
                          </div>

                          {fiche.type_travail === 'binome' && (
                            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl">
                              <h4 className="font-bold text-blue-900 mb-6 text-lg flex items-center">
                                <FiUsers className="h-5 w-5 mr-2" />
                                Informations du binôme
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <label className="block text-sm font-bold text-blue-700 mb-3">
                                    Nom et prénom du binôme *
                                  </label>
                                  <div className="relative">
                                    <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 h-5 w-5" />
                                    <input
                                      type="text"
                                      name="binome_nom"
                                      value={fiche.binome_nom}
                                      onChange={handleFicheChange}
                                      className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                                        errors.binome_nom ? 'border-red-300' : 'border-blue-300'
                                      }`}
                                      placeholder="Prénom Nom"
                                    />
                                  </div>
                                  {errors.binome_nom && <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <FiAlertCircle className="h-4 w-4 mr-1" />
                                    {errors.binome_nom}
                                  </p>}
                                </div>

                                <div>
                                  <label className="block text-sm font-bold text-blue-700 mb-3">
                                    Email du binôme *
                                  </label>
                                  <div className="relative">
                                    <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 h-5 w-5" />
                                    <input
                                      type="email"
                                      name="binome_email"
                                      value={fiche.binome_email}
                                      onChange={handleFicheChange}
                                      className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                                        errors.binome_email ? 'border-red-300' : 'border-blue-300'
                                      }`}
                                      placeholder="email@etudiant.sn"
                                    />
                                  </div>
                                  {errors.binome_email && <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <FiAlertCircle className="h-4 w-4 mr-1" />
                                    {errors.binome_email}
                                  </p>}
                                </div>
                              </div>
                              <div className="mt-6 p-4 bg-blue-100 rounded-xl">
                                <p className="text-sm text-blue-800 flex items-center">
                                  <FiInfo className="h-4 w-4 mr-2" />
                                  Votre binôme recevra une notification par email et devra confirmer sa participation avant validation finale.
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Livrables attendus */}
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                        <h4 className="font-bold text-green-900 mb-4 flex items-center">
                          <FiTarget className="h-5 w-5 mr-2" />
                          Livrables attendus
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <FiCheckCircle className="h-5 w-5 text-green-600" />
                            <span className="text-green-800">
                              {isLicence ? 'Rapport de stage détaillé' : 'Mémoire de recherche'}
                            </span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <FiCheckCircle className="h-5 w-5 text-green-600" />
                            <span className="text-green-800">Code source et documentation technique</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <FiCheckCircle className="h-5 w-5 text-green-600" />
                            <span className="text-green-800">Présentation de soutenance</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <FiCheckCircle className="h-5 w-5 text-green-600" />
                            <span className="text-green-800">Démonstration du système développé</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation des étapes */}
                  <div className="flex justify-between pt-8 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={prevStep}
                      className={`px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-semibold ${
                        currentStep === 1 ? 'invisible' : ''
                      }`}
                    >
                      ← Précédent
                    </button>

                    {currentStep < 3 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold"
                      >
                        Suivant →
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3 font-semibold"
                      >
                        {isSubmitting ? (
                          <>
                            <FiRefreshCw className="h-5 w-5 animate-spin" />
                            <span>Envoi en cours...</span>
                          </>
                        ) : (
                          <>
                            <FiCheckCircle className="h-5 w-5" />
                            <span>Soumettre la demande</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </form>
          </div>
        )}

        {/* Informations complémentaires avec design moderne */}
        {mode !== 'consultation' && (
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-lg font-bold text-blue-900 mb-6 flex items-center">
              <FiInfo className="h-5 w-5 mr-2 text-blue-500" />
              Informations importantes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mode === 'memoire' ? (
                <>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mt-1">
                      <FiFile className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-blue-900">Format de fichier</p>
                      <p className="text-gray-600 text-sm">Le fichier doit être au format PDF uniquement (max. 10 MB)</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mt-1">
                      <FiCheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-blue-900">Normes de présentation</p>
                      <p className="text-gray-600 text-sm">Assurez-vous que votre {isLicence ? 'rapport' : 'mémoire'} respecte les normes</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mt-1">
                      <FiClock className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-blue-900">Modification</p>
                      <p className="text-gray-600 text-sm">Une fois déposé, vous ne pourrez plus modifier le fichier</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mt-1">
                      <FiCalendar className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-blue-900">Soutenance</p>
                      <p className="text-gray-600 text-sm">La date de soutenance vous sera communiquée par email</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mt-1">
                      <FiUser className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-blue-900">Validation encadreur</p>
                      <p className="text-gray-600 text-sm">L'encadreur dispose de 7 jours pour valider ou refuser votre proposition</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mt-1">
                      <FiMail className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-blue-900">Notification</p>
                      <p className="text-gray-600 text-sm">Vous recevrez un email dès qu'une décision sera prise</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mt-1">
                      <FiRefreshCw className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-blue-900">Nouvelle proposition</p>
                      <p className="text-gray-600 text-sm">En cas de refus, vous pourrez soumettre une nouvelle proposition</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mt-1">
                      <FiUsers className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-blue-900">Travail en binôme</p>
                      <p className="text-gray-600 text-sm">Les deux étudiants doivent confirmer leur participation</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepotDossier;