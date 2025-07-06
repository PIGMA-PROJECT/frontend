import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, X, AlertCircle, Calendar } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Fonction utilitaire pour déterminer l'année scolaire actuelle
const getCurrentAcademicYear = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1; // getMonth() renvoie 0-11
  
  // Si nous sommes avant octobre, nous sommes dans l'année scolaire précédente
  // (ex: Janvier 2025 → année scolaire 2024-2025)
  // Si nous sommes en octobre ou après, nous sommes dans la nouvelle année scolaire
  // (ex: Octobre 2025 → année scolaire 2025-2026)
  if (currentMonth < 10) {
    return `${currentYear-1}-${currentYear}`;
  } else {
    return `${currentYear}-${currentYear+1}`;
  }
};

// Fonction pour générer la liste des années scolaires
const generateAcademicYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  
  // Générer 5 années passées
  for (let i = 5; i > 0; i--) {
    const year = currentYear - i;
    years.push(`${year}-${year+1}`);
  }
  
  // Ajouter l'année courante
  years.push(`${currentYear-1}-${currentYear}`);
  if (new Date().getMonth() + 1 >= 10) {
    years.push(`${currentYear}-${currentYear+1}`);
  }
  
  // Ajouter 3 années futures
  for (let i = 1; i <= 3; i++) {
    const startYear = currentYear + i - 1;
    if (!(startYear === currentYear && new Date().getMonth() + 1 < 10)) {
      years.push(`${startYear}-${startYear+1}`);
    }
  }
  
  return years;
};

const ClassAdd: React.FC = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    level: '',
    department: '',
    description: '',
    academicYear: getCurrentAcademicYear(), // Année scolaire actuelle par défaut
    active: true
  });
  
  const [formErrors, setFormErrors] = useState({
    academicYear: '',
  });
  
  // Générer les années scolaires disponibles
  const academicYears = generateAcademicYears();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Clear any errors when field is changed
    if (name in formErrors) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateForm = () => {
    let valid = true;
    const errors = { academicYear: '' };
    
    // Check if academic year is selected
    if (!formData.academicYear) {
      errors.academicYear = "L'année scolaire est requise";
      valid = false;
    }
    
    setFormErrors(errors);
    return valid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    console.log('Form submitted:', formData);
    // Handle the form submission, in a real app this would be an API call
    
    // Show success message
    alert('La classe a été créée avec succès !');
    
    // Redirect to classes list
    navigate('/classes');
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
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-5xl mx-auto"
    >
      <div className="mb-6">
        <button
          onClick={() => navigate('/classes')}
          className="flex items-center text-gray-600 hover:text-primary mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à la liste des classes
        </button>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold text-navy">Ajouter une nouvelle classe</h1>
        </div>
      </div>
      
      {/* Information card about academic years */}
      <motion.div variants={itemVariants} className="mb-6">
        <Alert className="bg-navy bg-opacity-5 border-navy border-opacity-20">
          <Calendar className="h-4 w-4 text-navy" />
          <AlertDescription className="text-navy">
            Au Sénégal, l'année scolaire commence en octobre et se termine en juillet. 
            Les classes d'années scolaires passées seront automatiquement désactivées et ne pourront pas être réactivées.
          </AlertDescription>
        </Alert>
      </motion.div>
      
      <div className="bg-white rounded-lg shadow-sm">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom de la classe *
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ex: Génie Logiciel - L1"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
                  Niveau *
                </label>
                <select
                  id="level"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="">Sélectionner un niveau</option>
                  <option value="Licence 1">Licence 1</option>
                  <option value="Licence 2">Licence 2</option>
                  <option value="Licence 3">Licence 3</option>
                  <option value="Master 1">Master 1</option>
                  <option value="Master 2">Master 2</option>
                </select>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="space-y-4">
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
                <label htmlFor="academicYear" className="block text-sm font-medium text-gray-700 mb-1">
                  Année scolaire *
                </label>
                <div className="relative">
                  <select
                    id="academicYear"
                    name="academicYear"
                    value={formData.academicYear}
                    onChange={handleChange}
                    className={`w-full rounded-md border bg-background px-3 py-2 text-sm ${
                      formErrors.academicYear ? 'border-red-500 focus:ring-red-500' : 'border-input focus:ring-primary'
                    }`}
                    required
                  >
                    {academicYears.map(year => (
                      <option key={year} value={year}>
                        {/* Formater pour afficher Oct ANNÉE - Juil ANNÉE+1 */}
                        {`Oct ${year.split('-')[0]} - Juil ${year.split('-')[1]}`}
                      </option>
                    ))}
                  </select>
                  
                  {formErrors.academicYear && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.academicYear}</p>
                  )}
                </div>
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
              placeholder="Description de la classe..."
            />
          </motion.div>
          
          <motion.div variants={itemVariants} className="mt-6">
            <div className="flex items-center">
              <input
                id="active"
                name="active"
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="active" className="ml-2 block text-sm text-gray-700">
                Activer la classe immédiatement
              </label>
            </div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-3"
          >
            <button
              type="button"
              onClick={() => navigate('/classes')}
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

export default ClassAdd;