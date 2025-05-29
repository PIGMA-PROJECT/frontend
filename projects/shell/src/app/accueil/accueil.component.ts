// projects/shell/src/app/accueil/accueil.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from '../../environments/environment';

// Extend the Window interface to include the 'accueil' property
declare global {
  interface Window {
    accueil?: {
      mount: (options: { domElement: HTMLElement }) => void;
      unmount: () => void;
    };
  }
}

@Component({
  selector: 'app-accueil',
  template: '<div id="accueil-root"></div>'
})
export class AccueilComponent implements OnInit, OnDestroy {
  private scriptElement!: HTMLScriptElement;

  constructor() { }

  ngOnInit(): void {
    // Charger dynamiquement le micro frontend React
    this.scriptElement = document.createElement('script');
    this.scriptElement.src = 'http://localhost:3000/accueil.js'; // URL fixe pour développement
    this.scriptElement.onload = () => {
      // Une fois le script chargé, monter le composant React
      if (window.accueil && window.accueil.mount) {
        window.accueil.mount({
          domElement: document.getElementById('accueil-root')!
        });
      }
    };
    document.body.appendChild(this.scriptElement);
  }

  ngOnDestroy(): void {
    // Nettoyer lorsque le composant est détruit
    if (window.accueil && window.accueil.unmount) {
      window.accueil.unmount();
    }
    
    if (this.scriptElement) {
      document.body.removeChild(this.scriptElement);
    }
  }
}