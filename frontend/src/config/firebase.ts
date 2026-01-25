import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAuth, type Auth } from 'firebase/auth';
import { getStorage, type FirebaseStorage } from 'firebase/storage';
import { getAnalytics, type Analytics } from 'firebase/analytics';

const defaultFirebaseConfig = {
  apiKey: 'AIzaSyAANJPMvjERlt8WtDAU4pdP5e6xrmWIHWY',
  authDomain: 'sylhetly-news.firebaseapp.com',
  databaseURL: 'https://sylhetly-news-default-rtdb.firebaseio.com',
  projectId: 'sylhetly-news',
  storageBucket: 'sylhetly-news.firebasestorage.app',
  messagingSenderId: '237118055873',
  appId: '1:237118055873:web:ef0dc6ef896d2e7b7cfb40',
  measurementId: 'G-K0W44WGXKC',
};

// Firebase config (prefer .env, fallback to defaults)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || defaultFirebaseConfig.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || defaultFirebaseConfig.authDomain,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || defaultFirebaseConfig.databaseURL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || defaultFirebaseConfig.projectId,
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || defaultFirebaseConfig.storageBucket,
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ||
    defaultFirebaseConfig.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || defaultFirebaseConfig.appId,
  measurementId:
    import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || defaultFirebaseConfig.measurementId,
};

const hasFirebaseConfig = Object.values(firebaseConfig).every(Boolean);

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;
let analytics: Analytics | null = null;
let firebaseInitError: string | null = null;

if (hasFirebaseConfig) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    if (typeof window !== 'undefined' && firebaseConfig.measurementId) {
      try {
        analytics = getAnalytics(app);
      } catch (analyticsError) {
        // Analytics is optional, continue without it
        console.warn('Analytics initialization failed:', analyticsError);
      }
    }
  } catch (error) {
    firebaseInitError =
      error instanceof Error ? error.message : 'Failed to initialize Firebase.';
    console.warn('Firebase initialization failed:', error);
    // Don't throw, let the app continue with fallback data
  }
} else {
  // Don't set error, just mark as not ready
  firebaseInitError = null;
}

export const firebaseReady = !!app;
export { auth, db, storage, analytics, firebaseInitError };

export default app;
