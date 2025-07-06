
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, X } from 'lucide-react';
import { Input } from "@/components/ui/input";

const StudentAdd: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    class: '',
    level: '',
    registrationDate: new Date().toISOString().split('T')[0]
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    alert('L\'étudiant a été ajouté avec succès !');
    
    // Redirect to students list
    navigate('/students');
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

  // Set level based on class selection
  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const className = e.target.value;
    let level = '';
    
    if (className.includes('L1')) {
      level = 'Licence 1';
    } else if (className.includes('L2')) {
      level = 'Licence 2';
    } else if (className.includes('L3')) {
      level = 'Licence 3';
    } else if (className.includes('M1')) {
      level = 'Master 1';
    } else if (className.includes('M2')) {
      level = 'Master 2';
    }
    
    setFormData(prevData => ({
      ...prevData,
      class: className,
      level: level
    }));
  };
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mb-6">
        <button
          onClick={() => navigate('/students')}
          className="flex items-center text-gray-600 hover:text-primary mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à la liste des étudiants
        </button>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold">Ajouter un nouvel étudiant</h1>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants} className="space-y-4">
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom *
                </label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Ex: Diop"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  Prénom *
                </label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Ex: Amadou"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Ex: amadou.diop@student.edu.sn"
                  required
                />
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="space-y-4">
              <div>
                <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-1">
                  Classe *
                </label>
                <select
                  id="class"
                  name="class"
                  value={formData.class}
                  onChange={handleClassChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="">Sélectionner une classe</option>
                  <option value="Informatique - L1">Informatique - L1</option>
                  <option value="Informatique - L2">Informatique - L2</option>
                  <option value="Informatique - L3">Informatique - L3</option>
                  <option value="Informatique - M1">Informatique - M1</option>
                  <option value="Informatique - M2">Informatique - M2</option>
                  <option value="Réseaux - L1">Réseaux - L1</option>
                  <option value="Réseaux - L2">Réseaux - L2</option>
                  <option value="Réseaux - L3">Réseaux - L3</option>
                  <option value="Management - L1">Management - L1</option>
                  <option value="Management - L2">Management - L2</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
                  Niveau
                </label>
                <Input
                  id="level"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  placeholder="Ex: Licence 1"
                  disabled
                  className="bg-gray-50"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Le niveau est automatiquement défini selon la classe choisie
                </p>
              </div>
              
              <div>
                <label htmlFor="registrationDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Date d'inscription *
                </label>
                <Input
                  id="registrationDate"
                  name="registrationDate"
                  type="date"
                  value={formData.registrationDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            variants={itemVariants}
            className="mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-3"
          >
            <button
              type="button"
              onClick={() => navigate('/students')}
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

export default StudentAdd;
