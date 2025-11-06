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

// Function to ensure Firebase is initialized
function initializeFirebase() {
  // Only initialize in browser
  if (typeof window === 'undefined') {
    return;
  }

  // If already initialized, return
  if (app && auth && db) {
    return;
  }

  try {
    if (!isFirebaseConfigured) {
      console.error('[Firebase] Not configured. Missing or invalid credentials:', {
        hasApiKey: !!firebaseConfig.apiKey,
        hasProjectId: !!firebaseConfig.projectId,
        apiKey: firebaseConfig.apiKey ? `${firebaseConfig.apiKey.substring(0, 10)}...` : 'missing',
        projectId: firebaseConfig.projectId || 'missing',
        config: firebaseConfig
      });
      return;
    }

    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
      console.log('[Firebase] App initialized');
    } else {
      app = getApps()[0];
      console.log('[Firebase] Using existing app');
    }
    
    db = getFirestore(app);
    auth = getAuth(app);
    storage = getStorage(app);

    console.log('[Firebase] Services initialized:', {
      hasDb: !!db,
      hasAuth: !!auth,
      hasStorage: !!storage,
      projectId: firebaseConfig.projectId,
      apiKey: firebaseConfig.apiKey ? `${firebaseConfig.apiKey.substring(0, 10)}...` : 'missing'
    });

    // Try to ensure network is enabled (async, fire and forget)
    enableNetwork(db).then(() => {
      console.log('[Firebase] ✓ Firestore network enabled');
    }).catch((error) => {
      console.warn('[Firebase] Could not enable Firestore network:', error);
    });
  } catch (error) {
    console.error('[Firebase] Initialization failed:', error);
    console.error('[Firebase] Error details:', {
      message: (error as Error).message,
      stack: (error as Error).stack
    });
  }
}

// Initialize immediately if in browser
if (typeof window !== 'undefined') {
  initializeFirebase();
}

// Export getter functions that ensure initialization
export function getFirebaseAuth(): Auth {
  if (typeof window === 'undefined') {
    throw new Error('Firebase Auth can only be used in the browser');
  }
  initializeFirebase();
  if (!auth) {
    throw new Error('Firebase Auth not initialized. Check Firebase configuration.');
  }
  return auth;
}

export function getFirebaseDb(): Firestore {
  if (typeof window === 'undefined') {
    throw new Error('Firestore can only be used in the browser');
  }
  initializeFirebase();
  if (!db) {
    throw new Error('Firestore not initialized. Check Firebase configuration.');
  }
  return db;
}

// Export the variables directly (for backward compatibility)
// But also export getters that ensure initialization
export { app, db, auth, storage, isFirebaseConfigured, initializeFirebase };
