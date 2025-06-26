import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "daily-lc-reidhaegele", appId: "1:1053760876403:web:9585a36d3f584989529f06", storageBucket: "daily-lc-reidhaegele.firebasestorage.app", apiKey: "AIzaSyCi5ZCfuHWzcj1P1zaOGQ-1yYz-DR9hohU", authDomain: "daily-lc-reidhaegele.firebaseapp.com", messagingSenderId: "1053760876403" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())
  ]
};
