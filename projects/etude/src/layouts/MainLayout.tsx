import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Navigate } from 'react-router-dom';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Vérifier que l'utilisateur a un niveau défini
  if (!user?.niveau) {
    console.error('Niveau d\'étudiant non défini');
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar adaptée pour les étudiants */}
      <Sidebar 
        estVisible={sidebarVisible} 
        niveauEtudiant={user.niveau as "licence" | "master" | "autres"}
      />
      
      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header 
          toggleSidebar={toggleSidebar} 
          userLevel={user.niveau}
          userName={user.name}
          userEmail={user.email}
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;