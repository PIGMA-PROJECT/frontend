
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ProfessorOption {
  id: number;
  name: string;
  department: string;
}

const PROFESSOR_OPTIONS: ProfessorOption[] = [
  { id: 1, name: "Dr. Moussa Diop", department: "Informatique" },
  { id: 2, name: "Dr. Fatou Ndiaye", department: "Informatique" },
  { id: 3, name: "Dr. Omar Sall", department: "Informatique" },
  { id: 4, name: "Dr. Aminata Diallo", department: "Réseaux" },
  { id: 5, name: "Dr. Ibrahim Sow", department: "Réseaux" },
  { id: 6, name: "Dr. Cheikh Diop", department: "Informatique" },
  { id: 7, name: "Dr. Aïda Fall", department: "Management" },
];

const CourseAdd: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    professor: '',
    hours: '',
    startDate: '',
    description: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle the form submission, in a real app this would be an API call
    
    // Show success message
    alert('Le cours a été créé avec succès !');
    
    // Redirect to courses list
    navigate('/courses');
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  // Filtrer les professeurs par département
  const filteredProfessors = formData.department
    ? PROFESSOR_OPTIONS.filter(prof => prof.department === formData.department)
    : PROFESSOR_OPTIONS;
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mb-6">
        <button
          onClick={() => navigate('/courses')}
          className="flex items-center text-gray-600 hover:text-primary mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à la liste des cours
        </button>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold">Ajouter un nouveau cours</h1>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du cours *
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ex: Programmation Orientée Objet"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                  Département *
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="">Sélectionner un département</option>
                  <option value="Informatique">Informatique</option>
                  <option value="Réseaux">Réseaux</option>
                  <option value="Management">Management</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="professor" className="block text-sm font-medium text-gray-700 mb-1">
                  Professeur *
                </label>
                <select
                  id="professor"
                  name="professor"
                  value={formData.professor}
                  onChange={handleChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                  disabled={!formData.department}
                >
                  <option value="">
                    {formData.department 
                      ? 'Sélectionner un professeur' 
                      : 'Veuillez d\'abord sélectionner un département'}
                  </option>
                  {filteredProfessors.map(prof => (
                    <option key={prof.id} value={prof.id}>
                      {prof.name}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="space-y-4">
              <div>
                <label htmlFor="hours" className="block text-sm font-medium text-gray-700 mb-1">
                  Heures de cours *
                </label>
                <Input
                  id="hours"
                  name="hours"
                  type="number"
                  min="1"
                  value={formData.hours}
                  onChange={handleChange}
                  placeholder="Ex: 45"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Date de début *
                </label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </motion.div>
          </div>
          
          <motion.div variants={itemVariants} className="mt-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Description du cours..."
            />
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-3"
          >
            <button
              type="button"
              onClick={() => navigate('/courses')}
              className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
            >
              <X className="h-4 w-4 mr-1" />
              Annuler
            </button>
            
            <button
              type="submit"
              className="flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-700 focus:outline-none"
            >
              <Save className="h-4 w-4 mr-1" />
              Enregistrer
            </button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
};

export default CourseAdd;
