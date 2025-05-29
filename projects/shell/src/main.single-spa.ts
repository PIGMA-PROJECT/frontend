import { enableProdMode, NgZone } from '@angular/core';

// Extend the Window interface to include the singleSpa property
declare global {
  interface Window {
    singleSpa?: boolean;
  }
}
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Router, NavigationStart } from '@angular/router';
import { singleSpaAngular, getSingleSpaExtraProviders } from 'single-spa-angular';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { singleSpaPropsSubject } from './single-spa/single-spa-props';

if (environment.production) {
  enableProdMode();
}

// Si nous ne sommes pas dans un contexte single-spa, bootstrappons l'application normalement
if (!window.singleSpa) {
  console.log('Mode standalone détecté, bootstrapping AppModule directement');
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
} else {
  console.log('Mode single-spa détecté, bootstrapping via single-spa-angular');
}

const lifecycles = singleSpaAngular({
  bootstrapFunction: singleSpaProps => {
    singleSpaPropsSubject.next(singleSpaProps);
    return platformBrowserDynamic(getSingleSpaExtraProviders()).bootstrapModule(AppModule);
  },
  template: '<app-root />',
  Router,
  NavigationStart,
  NgZone,
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;