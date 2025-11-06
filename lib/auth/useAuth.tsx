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
    if (!auth) {
      console.error('[useAuth] Firebase Auth not initialized. Check Firebase config.');
      console.error('[useAuth] Auth object:', auth);
      console.error('[useAuth] Available env vars:', {
        hasApiKey: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        hasProjectId: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? `${process.env.NEXT_PUBLIC_FIREBASE_API_KEY.substring(0, 10)}...` : 'MISSING',
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'MISSING'
      });
      setLoading(false);
      return;
    }

    let timeoutId: NodeJS.Timeout;
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        clearTimeout(timeoutId);
        setUser(user);
        setLoading(false);
      },
      (error) => {
        console.error('Auth state change error:', error);
        clearTimeout(timeoutId);
        setLoading(false);
      }
    );

    // Safety timeout - if auth doesn't resolve in 5 seconds, stop loading
    timeoutId = setTimeout(() => {
      console.warn('Auth state check timeout - proceeding without auth');
      setLoading(false);
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
      unsubscribe();
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

