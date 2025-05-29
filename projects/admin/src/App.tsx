import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import DepartementsList from './pages/departements/DepartementsList';
import AddDepartement from './pages/departements/AddDepartement';
import EditDepartement from './pages/departements/EditDepartement';
import StaffList from './pages/staff/StaffList';
import AddStaff from './pages/staff/AddStaff';
import ClassroomsList from './pages/classrooms/ClassroomsList';
import AddClassroom from './pages/classrooms/AddClassroom';
import NotificationCenter from './pages/notifications/NotificationCenter';
import Profile from './pages/profile/Profile';
import Mediatheque from './pages/mediatheque/Mediatheque';
import Messages from './pages/messages';
import NotFound from './pages/error/NotFound';
import Paiement from './pages/paiements/Paiement';
import DetailPaiement from './pages/paiements/DetailPaiement';
import NouveauPaiement from './pages/paiements/NouveauPaiement';
import PageCalendrier from './pages/calendrier/PageCalendrier';
import PageAjouterEvenement from './pages/calendrier/PageAjouterEvenement';
import PageDetailEvenement from './pages/calendrier/PageDetailEvenement';

const App: React.FC = () => {
  return (
    <Router basename="/admin">
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/departements" element={<DepartementsList />} />
          <Route path="/departements/add" element={<AddDepartement />} />
          <Route path="/departements/edit/:id" element={<EditDepartement />} />
          <Route path="/staff/chiefs" element={<StaffList role="chief" />} />
          <Route path="/staff/secretaries" element={<StaffList role="secretary" />} />
          <Route path="/staff/add" element={<AddStaff />} />
          <Route path="/classrooms" element={<ClassroomsList />} />
          <Route path="/classrooms/add" element={<AddClassroom />} />
          <Route path="/notifications" element={<NotificationCenter />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mediatheque" element={<Mediatheque />} />
          <Route path="/messages" element={<Messages />} />

          {/* Routes supplémentaires */}
          <Route path="/settings" element={<div className="p-8"><h1 className="text-2xl font-bold">Paramètres</h1><p className="mt-4">Page en construction</p></div>} />
          <Route path="/help" element={<div className="p-8"><h1 className="text-2xl font-bold">Aide</h1><p className="mt-4">Page en construction</p></div>} />
          <Route path="/school" element={<div className="p-8"><h1 className="text-2xl font-bold">Gestion de l'école</h1><p className="mt-4">Page en construction</p></div>} />

          <Route path="/calendrier" element={<PageCalendrier />} />
          <Route path="/calendrier/ajouter" element={<PageAjouterEvenement />} />
          <Route path="/calendrier/evenement/:id" element={<PageDetailEvenement />} />
          <Route path="/calendrier/reunions-en-ligne" element={<PageCalendrier />} /> {/* Filtrage à implémenter */}
          <Route path="/calendrier/evenements-presentiels" element={<PageCalendrier />} /> {/* Filtrage à implémenter */}

          {/* Nouvelles routes pour les paiements */}
          <Route path="/paiement/abonnement" element={<Paiement />} />
          <Route path="/paiement/historique" element={<Paiement />} />
          <Route path="/paiement/nouveau" element={<NouveauPaiement />} />
          <Route path="/paiement/detail/:id" element={<DetailPaiement />} />

          {/* Redirection par défaut pour la section paiement */}
          <Route path="/paiement" element={<Paiement />} />

          {/* Route 404 - doit être en dernier */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
