import { useState, useEffect, createContext, useContext } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth } from '@/lib/firebase/config';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<User>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setupAuthListener = (authInstance: typeof auth) => {
      if (!authInstance) {
        console.error('[useAuth] No auth instance provided');
        setLoading(false);
        return () => {};
      }

      let timeoutId: NodeJS.Timeout;
      const unsubscribe = onAuthStateChanged(
        authInstance,
        (user) => {
          clearTimeout(timeoutId);
          setUser(user);
          setLoading(false);
        },
        (error) => {
          console.error('[useAuth] Auth state change error:', error);
          clearTimeout(timeoutId);
          setLoading(false);
        }
      );

      // Safety timeout - if auth doesn't resolve in 5 seconds, stop loading
      timeoutId = setTimeout(() => {
        console.warn('[useAuth] Auth state check timeout - proceeding without auth');
        setLoading(false);
      }, 5000);

      return () => {
        clearTimeout(timeoutId);
        unsubscribe();
      };
    };

    // Check if auth is available immediately
    if (auth) {
      console.log('[useAuth] Auth available, setting up listener');
      return setupAuthListener(auth);
    }

    // If not available, wait a bit and try again (for module loading timing)
    console.warn('[useAuth] Auth not immediately available, retrying...');
    const retryTimeout = setTimeout(() => {
      if (auth) {
        console.log('[useAuth] Auth found on retry');
        setupAuthListener(auth);
      } else {
        console.error('[useAuth] Auth still not available after retry');
        setLoading(false);
      }
    }, 100);

    return () => {
      clearTimeout(retryTimeout);
    };
  }, []);

  async function signIn(email: string, password: string) {
    if (!auth) throw new Error('Firebase Auth not initialized');
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function signUp(email: string, password: string, displayName: string): Promise<User> {
    if (!auth) throw new Error('Firebase Auth not initialized');
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Update display name
    if (displayName && userCredential.user) {
      await updateProfile(userCredential.user, { displayName });
    }
    return userCredential.user;
  }

  async function signOut() {
    if (!auth) throw new Error('Firebase Auth not initialized');
    await firebaseSignOut(auth);
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

