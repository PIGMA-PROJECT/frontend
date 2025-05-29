import { registerApplication, start } from 'single-spa';

// Fonction pour déterminer si l'application React doit être active
function pathPrefix(prefix: string) {
  return function(location: Location) {
    return location.pathname.startsWith(prefix);
  };
}

// Enregistrer l'application React
registerApplication(
  'accueil',
  // @ts-ignore: Allow dynamic import of remote module
    () => import(/* webpackIgnore: true */ 'http://localhost:3000/accueil.js'),
  pathPrefix('/accueil')
);

// Démarrer single-spa
start();