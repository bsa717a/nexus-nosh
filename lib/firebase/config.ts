import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore, enableNetwork, disableNetwork } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// Firebase configuration
// Using fallback values for production (these are public keys, safe to include)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyBwDU2LlhEXIzB5iw4zhq_uepf2K4skPSc',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'nexus-nosh.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'nexus-nosh',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'nexus-nosh.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '251223233015',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:251223233015:web:26460b83dd6a21f5ce1ef2',
};

// Debug: Log what we're getting (only first few chars of sensitive data)
if (typeof window !== 'undefined') {
  console.log('[Firebase Config] Environment check:', {
    hasApiKey: !!firebaseConfig.apiKey,
    hasAuthDomain: !!firebaseConfig.authDomain,
    hasProjectId: !!firebaseConfig.projectId,
    apiKeyPreview: firebaseConfig.apiKey ? `${firebaseConfig.apiKey.substring(0, 10)}...` : 'MISSING',
    projectId: firebaseConfig.projectId || 'MISSING',
    allEnvKeys: Object.keys(process.env).filter(k => k.startsWith('NEXT_PUBLIC_FIREBASE'))
  });
}

// Check if Firebase is properly configured
// With fallback values, this should always be true in production
const isFirebaseConfigured = 
  firebaseConfig.apiKey && 
  firebaseConfig.apiKey !== 'placeholder_api_key' &&
  firebaseConfig.apiKey.length > 10 &&
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
