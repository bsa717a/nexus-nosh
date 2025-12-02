import { useState, useEffect, createContext, useContext } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { getFirebaseAuth, getFirebaseDb, initializeFirebase } from '@/lib/firebase/config';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<User>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Sync user data to Firestore for friend search
  const syncUserToFirestore = async (user: User) => {
    try {
      const db = getFirebaseDb();
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        email: user.email,
        emailLowerCase: user.email?.toLowerCase(),
        displayName: user.displayName,
        photoURL: user.photoURL,
        lastSeen: serverTimestamp(),
      }, { merge: true });
    } catch (error) {
      // Silently fail - user sync is not critical
    }
  };

  useEffect(() => {
    // Ensure Firebase is initialized
    try {
      initializeFirebase();
      const authInstance = getFirebaseAuth();
      
      let timeoutId: NodeJS.Timeout;
      const unsubscribe = onAuthStateChanged(
        authInstance,
        (user) => {
          clearTimeout(timeoutId);
          setUser(user);
          if (user) {
            syncUserToFirestore(user);
          }
          setLoading(false);
        },
        (error) => {
          clearTimeout(timeoutId);
          setLoading(false);
        }
      );

      // Safety timeout - if auth doesn't resolve in 5 seconds, stop loading
      timeoutId = setTimeout(() => {
        setLoading(false);
      }, 5000);

      return () => {
        clearTimeout(timeoutId);
        unsubscribe();
      };
    } catch (error) {
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
    if (displayName && userCredential.user) {
      await updateProfile(userCredential.user, { displayName });
      await syncUserToFirestore({ ...userCredential.user, displayName } as User);
    }
    return userCredential.user;
  }

  async function signOut() {
    const authInstance = getFirebaseAuth();
    await firebaseSignOut(authInstance);
  }

  async function resetPassword(email: string) {
    const authInstance = getFirebaseAuth();
    await sendPasswordResetEmail(authInstance, email);
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, resetPassword }}>
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

