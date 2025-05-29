export const environment = {
    production: true,
    // URLs des micro frontends en production
    microFrontends: {
      accueil: '/accueil/accueil.js'
    },
    // Configuration de l'API pour la gestion des mémoires
    api: {
      baseUrl: 'https://api.isimemo.com/api',
      endpoints: {
        documents: '/documents',
        memoires: '/memoires',
        utilisateurs: '/utilisateurs',
        recherche: '/recherche'
      }
    }
  };