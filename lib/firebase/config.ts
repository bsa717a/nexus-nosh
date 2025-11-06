import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore, enableNetwork, disableNetwork } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { getStorage, FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check if Firebase is properly configured
const isFirebaseConfigured = 
  firebaseConfig.apiKey && 
  firebaseConfig.apiKey !== 'placeholder_api_key' &&
  firebaseConfig.apiKey.length > 10 && // Ensure it's a real key
  firebaseConfig.projectId &&
  firebaseConfig.projectId !== 'placeholder_project_id' &&
  firebaseConfig.projectId.length > 0;

// Initialize Firebase only if configured and in browser
let app: FirebaseApp | undefined;
let db: Firestore | undefined;
let auth: Auth | undefined;
let storage: FirebaseStorage | undefined;

if (typeof window !== 'undefined') {
  if (isFirebaseConfigured) {
    try {
      if (!getApps().length) {
        app = initializeApp(firebaseConfig);
      } else {
        app = getApps()[0];
      }
      db = getFirestore(app);
      auth = getAuth(app);
      storage = getStorage(app);

      // Try to ensure network is enabled (async, fire and forget)
      enableNetwork(db).then(() => {
        console.log('✓ Firestore network enabled');
      }).catch((error) => {
        console.warn('Could not enable Firestore network:', error);
      });

      console.log('Firebase initialized:', {
        hasDb: !!db,
        hasAuth: !!auth,
        projectId: firebaseConfig.projectId,
        apiKey: firebaseConfig.apiKey ? `${firebaseConfig.apiKey.substring(0, 10)}...` : 'missing'
      });
    } catch (error) {
      console.error('Firebase initialization failed:', error);
    }
  } else {
    console.warn('Firebase not configured. Missing or invalid credentials:', {
      hasApiKey: !!firebaseConfig.apiKey,
      hasProjectId: !!firebaseConfig.projectId,
      apiKey: firebaseConfig.apiKey ? `${firebaseConfig.apiKey.substring(0, 10)}...` : 'missing',
      projectId: firebaseConfig.projectId || 'missing'
    });
  }
}

export { app, db, auth, storage, isFirebaseConfigured };
