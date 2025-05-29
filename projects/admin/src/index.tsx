import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Montage direct de l'application React dans le DOM
const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("L'élément root n'a pas été trouvé dans le DOM");
}