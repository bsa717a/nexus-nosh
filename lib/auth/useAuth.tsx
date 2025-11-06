import { useState, useEffect, createContext, useContext } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { getFirebaseAuth, initializeFirebase } from '@/lib/firebase/config';

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
    // Ensure Firebase is initialized
    try {
      initializeFirebase();
      const authInstance = getFirebaseAuth();
      
      console.log('[useAuth] Setting up auth state listener');
      
      let timeoutId: NodeJS.Timeout;
      const unsubscribe = onAuthStateChanged(
        authInstance,
        (user) => {
          clearTimeout(timeoutId);
          console.log('[useAuth] Auth state changed:', user ? `User: ${user.email}` : 'No user');
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
    } catch (error) {
      console.error('[useAuth] Failed to initialize Firebase Auth:', error);
      setLoading(false);
      return () => {};
    }
  }, []);

  async function signIn(email: string, password: string) {
    const authInstance = getFirebaseAuth();
    await signInWithEmailAndPassword(authInstance, email, password);
  }

  async function signUp(email: string, password: string, displayName: string): Promise<User> {
    const authInstance = getFirebaseAuth();
    const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
    // Update display name
    if (displayName && userCredential.user) {
      await updateProfile(userCredential.user, { displayName });
    }
    return userCredential.user;
  }

  async function signOut() {
    const authInstance = getFirebaseAuth();
    await firebaseSignOut(authInstance);
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

