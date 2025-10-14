import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';

import 'zone.js';

import {
  provideAnalytics,
  getAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';

import { environment } from './environments/environment'; 

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  importProvidersFrom } from '@angular/core';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'

bootstrapApplication(App, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
    ),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),//this is key
    provideAuth(() => getAuth()), //these are the different services that well be initialised
    provideAnalytics(() => getAnalytics()),
    ScreenTrackingService,
    UserTrackingService,
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    provideStorage(() => getStorage())
  ],
});