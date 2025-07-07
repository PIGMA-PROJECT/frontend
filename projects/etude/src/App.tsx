import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Layouts
import MainLayout from "./layouts/MainLayout";

// Pages globales
import Dashboard from "./pages/global/Dashboard";
import Index from "./pages/global/Index";
import NotFound from "./pages/global/NotFound";
import PageCalendrier from "./pages/global/PageCalendrier";

// Pages d'authentification
import Login from "./pages/auth/Login";

// Pages communes (tous niveaux)
import Chatbot from "./pages/communes/Chatbot";
import Mediatheque from "./pages/communes/Mediatheque";
import MediathequeDetail from "./pages/communes/MediathequeDetail";
import MediathequeSaved from "./pages/communes/MediathequeSaved";
import MediathequePublications from "./pages/communes/MediathequePublications";
import EvenementsCalendrier from "./pages/communes/EvenementsCalendrier";
import EvenementsSoutenances from "./pages/communes/EvenementsSoutenances";
import Profile from "./pages/communes/Profile";
import Settings from "./pages/communes/Settings";
import DepotDossier from "./pages/licence-master/DepotDossier";
import DossierSuivi from "./pages/licence-master/DossierSuivi";
import EncadrantDetail from "./pages/licence-master/EncadrantDetail";
import Encadrants from "./pages/licence-master/Encadrants";
import PanelEncadrement from "./pages/licence-master/PanelEncadrement";
import EspaceTravail from "./pages/licence-master/EspaceTravail";
import Messagerie from "./pages/licence-master/Messagerie";
import Evenements from "./pages/global/Evenements";

// Pages Licence/Master
// import Encadrants from "./pages/licence-master/Encadrants";
// import EncadrantDetail from "./pages/licence-master/EncadrantDetail";
// import PanelEncadrement from "./pages/licence-master/PanelEncadrement";
// import EspaceTravail from "./pages/licence-master/EspaceTravail";
// import Dossier from "./pages/licence-master/Dossier";
// import DepotDossier from "./pages/licence-master/DepotDossier";
// import DossierSuivi from "./pages/licence-master/DossierSuivi";
// import Messagerie from "./pages/licence-master/Messagerie";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Index page (redirects to login) */}
            <Route path="/" element={<Index />} />
            
            {/* Page de connexion */}
            <Route path="/login" element={<Login />} />

            {/* Dashboard principal */}
            <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />

            {/* =================== PAGES COMMUNES (TOUS NIVEAUX) =================== */}
            
            {/* Médiathèque */}
            <Route path="/mediatheque" element={<MainLayout><Mediatheque /></MainLayout>} />
            <Route path="/mediatheque/detail/:id" element={<MainLayout><MediathequeDetail /></MainLayout>} />
            <Route path="/mediatheque/saved" element={<MainLayout><MediathequeSaved /></MainLayout>} />
            <Route path="/mediatheque/mes-publications" element={<MainLayout><MediathequePublications /></MainLayout>} />

            {/* Chatbot */}
            <Route path="/chatbot" element={<MainLayout><Chatbot /></MainLayout>} />

            {/* Événements */}
            <Route path="/evenements" element={<MainLayout><Evenements /></MainLayout>} />

            {/* Profil et paramètres */}
            <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
            <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />

            {/* =================== PAGES LICENCE/MASTER UNIQUEMENT =================== */}
            
            {/* Encadrements */}
            <Route path="/encadrants" element={<MainLayout><Encadrants /></MainLayout>} />
            <Route path="/encadrants/:id" element={<MainLayout><EncadrantDetail /></MainLayout>} />
             <Route path="/encadrement/panel" element={<MainLayout><PanelEncadrement /></MainLayout>} />
            <Route path="/encadrement/workspace" element={<MainLayout><EspaceTravail /></MainLayout>} /> 

            {/* Dossiers */}
            {/* <Route path="/dossier" element={<MainLayout><Dossier /></MainLayout>} />*/}
            <Route path="/dossier/depot" element={<MainLayout><DepotDossier /></MainLayout>} />
            <Route path="/dossier/suivi" element={<MainLayout><DossierSuivi /></MainLayout>} />  

            {/* Messagerie */}
            {/* <Route path="/messagerie" element={<MainLayout><Messagerie /></MainLayout>} />*/}
            <Route path="/messagerie" element={<MainLayout><Messagerie /></MainLayout>} />

            {/* =================== PAGES HÉRITÉES (À ADAPTER) =================== */}
            
            {/* Calendrier général */}
            <Route path="/calendrier" element={<MainLayout><PageCalendrier /></MainLayout>} />
            
            {/* =================== ROUTES DE SECOURS =================== */}
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;