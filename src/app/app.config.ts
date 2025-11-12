import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCu5P_AogWuocOWVdfhgLwdWpdX4Ufs54g",
  authDomain: "gestor-notas-brayan.firebaseapp.com",
  projectId: "gestor-notas-brayan",
  storageBucket: "gestor-notas-brayan.firebasestorage.app",
  messagingSenderId: "251701883601",
  appId: "1:251701883601:web:4238896c6bfe764ee24bf0"
};


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ]
};
