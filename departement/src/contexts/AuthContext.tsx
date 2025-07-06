
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'chef' | 'secretaire';
}

const AuthContext = createContext<AuthContextType | null>(null);

const mockUsers = [
  {
    id: '1',
    name: 'Dr. Amadou Diop',
    email: 'chef@isimemo.edu.sn',
    password: 'password123',
    role: 'chef' as const
  },
  {
    id: '2',
    name: 'Fatou Ndiaye',
    email: 'secretaire@isimemo.edu.sn',
    password: 'password123',
    role: 'secretaire' as const
  }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Vérifier si l'utilisateur est déjà connecté (session storage)
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []); // Added dependency array to prevent infinite loop

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simuler un délai d'authentification
    await new Promise(resolve => setTimeout(resolve, 800));

    const foundUser = mockUsers.find(
      u => u.email === email && u.password === password
    );

    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      sessionStorage.setItem('user', JSON.stringify(userWithoutPassword));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
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
