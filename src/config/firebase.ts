import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAuth, type Auth } from 'firebase/auth';
import { getStorage, type FirebaseStorage } from 'firebase/storage';
import { getAnalytics, type Analytics } from 'firebase/analytics';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAANJPMvjERlt8WtDAU4pdP5e6xrmWIHWY",
  authDomain: "sylhetly-news.firebaseapp.com",
  projectId: "sylhetly-news",
  storageBucket: "sylhetly-news.firebasestorage.app",
  messagingSenderId: "237118055873",
  appId: "1:237118055873:web:ef0dc6ef896d2e7b7cfb40",
  measurementId: "G-K0W44WGXKC",
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
      analytics = getAnalytics(app);
    }
  } catch (error) {
    firebaseInitError =
      error instanceof Error ? error.message : 'Failed to initialize Firebase.';
    console.warn('Firebase initialization failed:', error);
  }
} else {
  firebaseInitError = 'Missing Firebase environment variables.';
}

export const firebaseReady = !!app;
export { auth, db, storage, analytics, firebaseInitError };

export default app;
