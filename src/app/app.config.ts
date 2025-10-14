import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

// used for login
//import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
//import { provideAuth, getAuth } from '@angular/fire/auth';
//import { environment } from '../environments/environment'; 

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
  //  provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),//this is key
   // provideAuth(() => getAuth()), //these are the different services that well be initialised
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
   // provideFirestore(() => getFirestore())
  ]
};