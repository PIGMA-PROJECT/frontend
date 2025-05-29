
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, AlertCircle, Check, FileText, Trash2, X } from 'lucide-react';
import { Input } from "@/components/ui/input";

const StudentImport: React.FC = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<string[][]>([]);
  const [error, setError] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const selectedFile = e.target.files?.[0];
    
    if (!selectedFile) return;
    
    if (selectedFile.type !== 'text/csv' && !selectedFile.name.endsWith('.csv')) {
      setError('Veuillez sélectionner un fichier CSV valide.');
      setFile(null);
      setPreviewData([]);
      return;
    }
    
    setFile(selectedFile);
    
    // Read file for preview
    const reader = new FileReader();
    reader.onload = (evt) => {
      if (!evt.target?.result) return;
      
      try {
        // Parse CSV content
        const csvContent = evt.target.result as string;
        const rows = csvContent.split('\n').filter(row => row.trim() !== '');
        
        // Extract headers and first few rows for preview
        const parsedRows = rows.slice(0, 5).map(row => 
          row.split(',').map(cell => cell.trim().replace(/"/g, ''))
        );
        
        setPreviewData(parsedRows);
      } catch (e) {
        setError('Erreur lors de la lecture du fichier CSV.');
        setPreviewData([]);
      }
    };
    
    reader.readAsText(selectedFile);
  };
  
  const handleRemoveFile = () => {
    setFile(null);
    setPreviewData([]);
    setError(null);
    setSuccess(false);
  };
  
  const handleImport = () => {
    if (!file) {
      setError('Veuillez sélectionner un fichier CSV à importer.');
      return;
    }
    
    if (!selectedClass) {
      setError('Veuillez sélectionner une classe pour les étudiants.');
      return;
    }
    
    setImporting(true);
    
    // Simulate import process
    setTimeout(() => {
      setImporting(false);
      setSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        navigate('/students');
      }, 3000);
    }, 2000);
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
          <h1 className="text-2xl font-bold">Importer des étudiants</h1>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <motion.div variants={itemVariants}>
          <div className="mb-6 bg-blue-50 border-l-4 border-blue-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Instructions</h3>
                <div className="text-sm text-blue-700 mt-2">
                  <p className="mb-2">Le fichier CSV doit contenir les colonnes suivantes :</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Nom (obligatoire)</li>
                    <li>Prénom (obligatoire)</li>
                    <li>Email (obligatoire)</li>
                    <li>Date d'inscription (format JJ/MM/AAAA)</li>
                  </ul>
                  <p className="mt-2">La première ligne doit contenir les noms des colonnes.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <div className="mb-6">
            <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-1">
              Classe d'affectation *
            </label>
            <select
              id="class"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              required
              disabled={success}
            >
              <option value="">Sélectionner une classe</option>
              <option value="Informatique - L1">Informatique - L1</option>
              <option value="Informatique - L2">Informatique - L2</option>
              <option value="Informatique - L3">Informatique - L3</option>
              <option value="Réseaux - L1">Réseaux - L1</option>
              <option value="Management - L1">Management - L1</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Tous les étudiants importés seront affectés à cette classe
            </p>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          {!file ? (
            <div className="border-2 border-dashed border-gray-300 rounded-md p-12 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <label htmlFor="file-upload" className="cursor-pointer rounded-md font-medium text-primary hover:text-primary-700">
                  <span>Cliquez pour sélectionner un fichier</span>
                  <Input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    accept=".csv"
                    className="sr-only"
                    onChange={handleFileChange}
                    disabled={success}
                  />
                </label>
                <p className="pl-1 text-gray-500">ou glissez-déposez le fichier CSV ici</p>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                CSV uniquement, max 10MB
              </p>
            </div>
          ) : (
            <div className="border border-gray-300 rounded-md p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="h-10 w-10 text-gray-400 mr-3" />
                  <div>
                    <h4 className="text-sm font-medium">{file.name}</h4>
                    <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} kB</p>
                  </div>
                </div>
                <button 
                  onClick={handleRemoveFile}
                  className="p-1 text-gray-400 hover:text-red-600"
                  disabled={importing || success}
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
              
              {previewData.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Aperçu des données :</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          {previewData[0].map((header, index) => (
                            <th 
                              key={index}
                              scope="col" 
                              className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {previewData.slice(1).map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                              <td key={cellIndex} className="px-3 py-2 whitespace-nowrap text-xs">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Affichage des 4 premières lignes uniquement
                  </p>
                </div>
              )}
            </div>
          )}
          
          {error && (
            <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          {success && (
            <div className="mt-4 bg-green-50 border-l-4 border-green-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">
                    L'importation a été réalisée avec succès !
                    Redirection vers la liste des étudiants...
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-3"
        >
          <button
            type="button"
            onClick={() => navigate('/students')}
            className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
            disabled={importing || success}
          >
            <X className="h-4 w-4 mr-1" />
            Annuler
          </button>
          
          <button
            type="button"
            onClick={handleImport}
            className="flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-700 focus:outline-none"
            disabled={!file || !selectedClass || importing || success}
          >
            {importing ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Importation en cours...
              </span>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-1" />
                Importer les données
              </>
            )}
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StudentImport;
