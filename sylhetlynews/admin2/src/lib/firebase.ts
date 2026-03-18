import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import { getAnalytics, type Analytics } from "firebase/analytics";

const providedFirebaseConfig = {
  apiKey: "AIzaSyAANJPMvjERlt8WtDAU4pdP5e6xrmWIHWY",
  authDomain: "sylhetly-news.firebaseapp.com",
  databaseURL: "https://sylhetly-news-default-rtdb.firebaseio.com",
  projectId: "sylhetly-news",
  storageBucket: "sylhetly-news.firebasestorage.app",
  messagingSenderId: "237118055873",
  appId: "1:237118055873:web:ef0dc6ef896d2e7b7cfb40",
  measurementId: "G-K0W44WGXKC",
};

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || providedFirebaseConfig.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || providedFirebaseConfig.authDomain,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || providedFirebaseConfig.databaseURL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || providedFirebaseConfig.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || providedFirebaseConfig.storageBucket,
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || providedFirebaseConfig.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || providedFirebaseConfig.appId,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || providedFirebaseConfig.measurementId,
};

const hasConfig =
  !!firebaseConfig.apiKey &&
  !!firebaseConfig.projectId &&
  !!firebaseConfig.appId;

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;
let analytics: Analytics | null = null;

if (hasConfig) {
  app = getApps().length ? (getApps()[0] as FirebaseApp) : initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  if (typeof window !== "undefined" && firebaseConfig.measurementId) {
    try {
      analytics = getAnalytics(app);
    } catch (error) {
      console.warn("Analytics initialization failed:", error);
    }
  }
}

export { auth, db, storage, analytics };
export const firebaseReady = hasConfig;
