# Fix: Firebase "Missing or insufficient permissions" (Next.js admin)

This error means your **Firestore** or **Storage** rules in Firebase are blocking the admin panel. Fix it by **publishing the correct rules** in your Firebase project (once).

---

## Option A: Firebase Console (copy-paste)

### 1. Firestore rules

1. Open **[Firebase Console](https://console.firebase.google.com/)** → select your project.
2. Go to **Build** → **Firestore Database** → **Rules**.
3. **Delete all** existing rules and paste **exactly** this:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /news/{docId} {
      allow read: if request.auth != null || resource.data.published == true;
      allow create, update, delete: if request.auth != null;
    }
    match /categories/{docId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
    match /team/{docId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
    match /photocardTemplates/{docId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

4. Click **Publish**.

### 2. Storage rules

1. In Firebase Console go to **Build** → **Storage** → **Rules**.
2. **Delete all** existing rules and paste **exactly** this:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /news/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /photocardTemplates/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

3. Click **Publish**.

---

## Option B: Firebase CLI

1. Install CLI: `npm install -g firebase-tools`
2. From the **project root** (where `firebase.json` is):  
   `firebase login`  
   `firebase use <your-project-id>`
3. Deploy rules:  
   `firebase deploy --only firestore:rules,storage`
4. When it finishes, reload the admin panel.

---

## Why this fixes it

The admin app signs in with **email/password** only. It does **not** set a custom claim like `admin: true`. Old rules required `request.auth.token.admin == true`, so every request was denied. The new rules allow any **signed-in user** (`request.auth != null`) to read/write the admin collections. Who can sign in is still controlled by `NEXT_PUBLIC_ADMIN_EMAILS` in the admin app.

After **both** Firestore and Storage rules are published, the "Missing or insufficient permissions" error in the Next.js admin should stop.
