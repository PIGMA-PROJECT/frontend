
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Layouts
import MainLayout from "./layouts/MainLayout";

// Pages
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Classes from "./pages/Classes";
import ClassAdd from "./pages/ClassAdd";
import ClassDetail from "./pages/ClassDetail";
import Courses from "./pages/Courses";
import CourseAdd from "./pages/CourseAdd";
import CourseDetail from "./pages/CourseDetail";
import Students from "./pages/Students";
import StudentAdd from "./pages/StudentAdd";
import StudentDetail from "./pages/StudentDetail";
import StudentImport from "./pages/StudentImport";
import Professors from "./pages/Professors";
import ProfessorAdd from "./pages/ProfessorAdd";
import ProfessorDetail from "./pages/ProfessorDetail";
import Chatbot from "./pages/Chatbot";
import ChatHistory from "./pages/ChatHistory";
import Index from "./pages/Index";
import PageCalendrier from "./pages/PageCalendrier";
import PageAjoutEvenement from "./pages/PageAjoutEvenement";
import PageReunions from "./pages/PageReunions";
import PageModifierEvenement from "./pages/PageModifierEvenement";
import PageDetailEvenement from "./pages/PageDetailEvenement";
import PageSoutenances from "./pages/PageSoutenances";

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

            {/* Routes protégées */}
            <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />

            {/* Gestion des classes */}
            <Route path="/classes" element={<MainLayout><Classes /></MainLayout>} />
            <Route path="/classes/add" element={<MainLayout><ClassAdd /></MainLayout>} />
            <Route path="/classes/:id" element={<MainLayout><ClassDetail /></MainLayout>} />
            <Route path="/classes/:id/edit" element={<MainLayout><ClassAdd /></MainLayout>} />
            
            {/* Gestion des cours */}
            <Route path="/courses" element={<MainLayout><Courses /></MainLayout>} />
            <Route path="/courses/add" element={<MainLayout><CourseAdd /></MainLayout>} />
            <Route path="/courses/:id" element={<MainLayout><CourseDetail /></MainLayout>} />
            <Route path="/courses/:id/edit" element={<MainLayout><CourseAdd /></MainLayout>} />
            <Route path="/courses/:id/assign-classes" element={<MainLayout><CourseDetail /></MainLayout>} />
            
            {/* Gestion des étudiants */}
            <Route path="/students" element={<MainLayout><Students /></MainLayout>} />
            <Route path="/students/add" element={<MainLayout><StudentAdd /></MainLayout>} />
            <Route path="/students/import" element={<MainLayout><StudentImport /></MainLayout>} />
            <Route path="/students/:id" element={<MainLayout><StudentDetail /></MainLayout>} />
            <Route path="/students/:id/edit" element={<MainLayout><StudentAdd /></MainLayout>} />
            
            {/* Gestion des professeurs */}
            <Route path="/professors" element={<MainLayout><Professors /></MainLayout>} />
            <Route path="/professors/add" element={<MainLayout><ProfessorAdd /></MainLayout>} />
            <Route path="/professors/:id" element={<MainLayout><ProfessorDetail /></MainLayout>} />
            <Route path="/professors/:id/edit" element={<MainLayout><ProfessorAdd /></MainLayout>} />
            <Route path="/professors/:id/assign-courses" element={<MainLayout><ProfessorDetail /></MainLayout>} />

            {/* Gestion du calendrier */}
            <Route path="/calendrier" element={<MainLayout><PageCalendrier /></MainLayout>} />
            <Route path="/calendrier/ajouter" element={<MainLayout><PageAjoutEvenement /></MainLayout>} />
            <Route path="/calendrier/details/:id" element={<MainLayout><PageDetailEvenement /></MainLayout>} />

            {/* Chatbot */}
            <Route path="/chatbot" element={<MainLayout><Chatbot /></MainLayout>} />
            <Route path="/chatbot/history" element={<MainLayout><ChatHistory /></MainLayout>} />

            {/* Profil */}
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
