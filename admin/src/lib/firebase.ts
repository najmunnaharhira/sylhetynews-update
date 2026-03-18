// Firebase integration fully removed. Admin panel now uses backend authentication and API only.

// Firebase removed. All admin features now use backend API (Node.js/Express/MySQL).
  app = getApps().length ? (getApps()[0] as FirebaseApp) : initializeApp(firebaseConfig);
