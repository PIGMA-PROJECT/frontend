import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ActionButton {
  label: string;
  icon?: React.ReactNode;
  to?: string;
  onClick?: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
}

interface PageHeaderProps {
  title: string;
  description?: string;
  backTo?: string;
  backLabel?: string;
  actions?: ActionButton[];
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  description, 
  backTo, 
  backLabel = 'Retour', 
  actions = [] 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0"
    >
      <div>
        <h1 className="text-2xl font-bold dark:text-white">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
        )}
      </div>
      
      <div className="flex items-center space-x-3">
        {backTo && (
          <Link 
            to={backTo} 
            className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
          >
            {backLabel}
          </Link>
        )}
        
        {actions.map((action, index) => {
          const buttonClasses = {
            primary: 'btn-primary',
            outline: 'btn-outline',
            ghost: 'text-primary dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-1.5 rounded-md transition-colors duration-200',
          };
          
          const Button = () => (
            <button
              key={index}
              onClick={action.onClick}
              className={`flex items-center ${buttonClasses[action.variant || 'primary']}`}
            >
              {action.icon && <span className="mr-2">{action.icon}</span>}
              {action.label}
            </button>
          );
          
          return action.to ? (
            <Link key={index} to={action.to} className={`flex items-center ${buttonClasses[action.variant || 'primary']}`}>
              {action.icon && <span className="mr-2">{action.icon}</span>}
              {action.label}
            </Link>
          ) : (
            <Button key={index} />
          );
        })}
      </div>
    </motion.div>
  );
};

export default PageHeader;
