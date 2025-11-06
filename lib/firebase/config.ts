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
    console.log('[Firebase] Skipping initialization (server-side)');
    return;
  }

  // If already initialized, return
  if (app && auth && db) {
    console.log('[Firebase] Already initialized, skipping');
    return;
  }

  console.log('[Firebase] Starting initialization...', {
    isFirebaseConfigured,
    hasApiKey: !!firebaseConfig.apiKey,
    hasProjectId: !!firebaseConfig.projectId,
    apiKeyPreview: firebaseConfig.apiKey ? `${firebaseConfig.apiKey.substring(0, 15)}...` : 'MISSING',
    projectId: firebaseConfig.projectId || 'MISSING'
  });

  try {
    if (!isFirebaseConfigured) {
      const errorMsg = '[Firebase] Not configured. Missing or invalid credentials';
      console.error(errorMsg, {
        hasApiKey: !!firebaseConfig.apiKey,
        hasProjectId: !!firebaseConfig.projectId,
        apiKey: firebaseConfig.apiKey ? `${firebaseConfig.apiKey.substring(0, 10)}...` : 'missing',
        projectId: firebaseConfig.projectId || 'missing',
        apiKeyLength: firebaseConfig.apiKey?.length || 0,
        config: firebaseConfig
      });
      throw new Error(errorMsg);
    }

    if (!getApps().length) {
      console.log('[Firebase] Initializing new app...');
      app = initializeApp(firebaseConfig);
      console.log('[Firebase] ✓ App initialized successfully');
    } else {
      app = getApps()[0];
      console.log('[Firebase] ✓ Using existing app');
    }
    
    console.log('[Firebase] Getting Firestore, Auth, and Storage...');
    db = getFirestore(app);
    auth = getAuth(app);
    storage = getStorage(app);

    console.log('[Firebase] ✓ Services initialized:', {
      hasDb: !!db,
      hasAuth: !!auth,
      hasStorage: !!storage,
      projectId: firebaseConfig.projectId,
      apiKey: firebaseConfig.apiKey ? `${firebaseConfig.apiKey.substring(0, 10)}...` : 'missing'
    });

    if (!auth) {
      throw new Error('getAuth() returned undefined');
    }

    // Try to ensure network is enabled (async, fire and forget)
    enableNetwork(db).then(() => {
      console.log('[Firebase] ✓ Firestore network enabled');
    }).catch((error) => {
      console.warn('[Firebase] Could not enable Firestore network:', error);
    });
  } catch (error) {
    const errorDetails = {
      message: (error as Error).message,
      stack: (error as Error).stack,
      name: (error as Error).name
    };
    console.error('[Firebase] ✗ Initialization failed:', error);
    console.error('[Firebase] ✗ Error details:', errorDetails);
    // Re-throw so callers know initialization failed
    throw error;
  }
}

// Initialize immediately if in browser (but don't throw on failure - let getters handle it)
if (typeof window !== 'undefined') {
  try {
    initializeFirebase();
  } catch (error) {
    // Don't throw here - initialization will be retried when getters are called
    console.warn('[Firebase] Initial module load initialization failed, will retry on first use:', error);
  }
}

// Export getter functions that ensure initialization
export function getFirebaseAuth(): Auth {
  if (typeof window === 'undefined') {
    throw new Error('Firebase Auth can only be used in the browser');
  }
  
  // Try to initialize
  try {
    initializeFirebase();
  } catch (error) {
    console.error('[getFirebaseAuth] Initialization error:', error);
    throw new Error(`Firebase initialization failed: ${(error as Error).message}`);
  }
  
  if (!auth) {
    // Log detailed diagnostics
    console.error('[getFirebaseAuth] Auth is undefined after initialization attempt', {
      hasApp: !!app,
      hasDb: !!db,
      hasAuth: !!auth,
      isFirebaseConfigured,
      firebaseConfig: {
        hasApiKey: !!firebaseConfig.apiKey,
        hasProjectId: !!firebaseConfig.projectId,
        apiKeyLength: firebaseConfig.apiKey?.length || 0,
        projectId: firebaseConfig.projectId
      }
    });
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
