import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  template: `
    <div id="accueil-root">
      <h3 *ngIf="loadingStatus !== 'loaded'">{{loadingStatus}}</h3>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
    h3 {
      text-align: center;
      padding: 20px;
      color: #666;
    }
  `]
})
export class AppComponent implements OnInit, OnDestroy {
  private scriptElement!: HTMLScriptElement;
  loadingStatus: string = 'En attente du chargement...';

  constructor() {
    console.log('AppComponent constructed');
    console.log('Environment:', environment);
    console.log('URL du micro frontend accueil:', environment.microFrontends.accueil);
  }

  ngOnInit(): void {
    console.log('AppComponent initialized');
    this.loadingStatus = 'Chargement du script...';
    
    // Charger dynamiquement le micro frontend React
    this.scriptElement = document.createElement('script');
    this.scriptElement.src = environment.microFrontends.accueil;
    
    this.scriptElement.onload = () => {
      console.log('Script chargé avec succès');
      this.loadingStatus = 'Script chargé, montage du composant...';
      
      // Une fois le script chargé, monter le composant React
      if (window['accueil']) {
        console.log('Objet accueil trouvé dans window:', window['accueil']);
        
        if (typeof window['accueil'].mount === 'function') {
          console.log('Fonction mount trouvée, tentative de montage...');
          const element = document.getElementById('accueil-root');
          if (element) {
            console.log('Élément accueil-root trouvé, montage...');
            try {
              window['accueil'].mount({ domElement: element });
              this.loadingStatus = 'loaded';
              console.log('Montage réussi !');
            } catch (error) {
              console.error('Erreur lors du montage:', error);
              this.loadingStatus = 'Erreur lors du montage: ' + error;
            }
          } else {
            console.error('Élément accueil-root non trouvé');
            this.loadingStatus = 'Erreur: élément accueil-root non trouvé';
          }
        } else {
          console.error('Fonction mount non trouvée dans l\'objet accueil');
          console.log('Contenu de l\'objet accueil:', window['accueil']);
          this.loadingStatus = 'Erreur: fonction mount non trouvée';
        }
      } else {
        console.error('Micro frontend "accueil" non trouvé dans window');
        this.loadingStatus = 'Erreur: micro frontend non trouvé';
      }
    };
    
    this.scriptElement.onerror = (e) => {
      console.error('Erreur lors du chargement du script:', e);
      this.loadingStatus = 'Erreur lors du chargement du script';
    };
    
    console.log('Ajout du script au document');
    document.body.appendChild(this.scriptElement);
  }

  ngOnDestroy(): void {
    console.log('AppComponent destroyed');
    
    // Nettoyer lorsque le composant est détruit
    try {
      if (window['accueil'] && typeof window['accueil'].unmount === 'function') {
        console.log('Démontage du composant React');
        window['accueil'].unmount();
      }
    } catch (e) {
      console.error('Erreur lors du démontage du micro frontend:', e);
    }
    
    if (this.scriptElement && this.scriptElement.parentNode) {
      console.log('Suppression du script du document');
      this.scriptElement.parentNode.removeChild(this.scriptElement);
    }
  }
}