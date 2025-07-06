import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  niveau?: "licence" | "master" | "autres";
}

const AuthContext = createContext<AuthContextType | null>(null);

const mockStudents = [
  {
    id: 1,
    name: 'Mamadou Ba',
    email: 'licence@test.com',
    password: 'licence123',
    niveau: 'licence' as const,
    role: 'etudiant',
  },
  {
    id: 2,
    name: 'Aïssatou Diallo',
    email: 'master@test.com',
    password: 'master123',
    niveau: 'master' as const,
    role: 'etudiant',
  },
  {
    id: 3,
    name: 'Ousmane Sow',
    email: 'autres@test.com',
    password: 'autres123',
    niveau: 'autres' as const,
    role: 'etudiant',
  }
];

// Fonction pour détecter le niveau selon l'email
const detectNiveauFromEmail = (email: string): 'licence' | 'master' | 'autres' => {
  const emailLower = email.toLowerCase();
  
  if (emailLower.includes('master')) {
    return 'master';
  } else if (emailLower.includes('autres')) {
    return 'autres';
  } else {
    return 'licence'; // Par défaut
  }
};

// Fonction pour générer un nom à partir de l'email
const generateNameFromEmail = (email: string): string => {
  const username = email.split('@')[0];
  
  // Prénoms sénégalais selon le niveau
  const prenoms = {
    licence: ['Mamadou', 'Fatou', 'Moussa', 'Aïssatou', 'Omar', 'Mariama'],
    master: ['Abdoulaye', 'Khady', 'Ibrahima', 'Aminata', 'Cheikh', 'Astou'],
    autres: ['Ousmane', 'Ndeye', 'Modou', 'Bineta', 'Lamine', 'Coumba']
  };
  
  const noms = ['Ba', 'Diallo', 'Sow', 'Fall', 'Ndiaye', 'Diouf', 'Sarr', 'Kane'];
  
  const niveau = detectNiveauFromEmail(email);
  const prenom = prenoms[niveau][Math.floor(Math.random() * prenoms[niveau].length)];
  const nom = noms[Math.floor(Math.random() * noms.length)];
  
  return `${prenom} ${nom}`;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Vérifier si l'utilisateur est déjà connecté (session storage)
  useEffect(() => {
    const storedUser = sessionStorage.getItem('student_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simuler un délai d'authentification
    await new Promise(resolve => setTimeout(resolve, 800));

    // Vérifier d'abord les comptes de test prédéfinis
    const foundMockStudent = mockStudents.find(
      s => s.email === email && s.password === password
    );

    let userToLogin: User;

    if (foundMockStudent) {
      // Utiliser le compte de test prédéfini
      const { password, ...studentWithoutPassword } = foundMockStudent;
      userToLogin = studentWithoutPassword;
    } else {
      // Pour tous les autres emails, créer un utilisateur dynamique
      const niveau = detectNiveauFromEmail(email);
      const name = generateNameFromEmail(email);
      
      userToLogin = {
        id: Date.now(), // ID unique basé sur le timestamp (number)
        name: name,
        email: email,
        niveau: niveau,
        role: 'etudiant',
      };
    }

    // Toujours réussir la connexion en mode simulation
    setUser(userToLogin);
    sessionStorage.setItem('student_user', JSON.stringify(userToLogin));
    return true;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('student_user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};