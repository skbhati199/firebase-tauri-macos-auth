import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  getRedirectResult,
  getAuth,
  browserLocalPersistence,
  setPersistence
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth, googleProvider } from './firebase';
import { getDeviceInfo } from './deviceInfo';
import { openBrowser } from './browser';

interface AuthContextType {
  currentUser: User | null;
  deviceInfo: {
    deviceName: string;
    osVersion: string;
  } | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  return useContext(AuthContext) as AuthContextType;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [deviceInfo, setDeviceInfo] = useState<{ deviceName: string; osVersion: string } | null>(null);
  const [loading, setLoading] = useState(true);

  // Set up persistence with the device ID
  useEffect(() => {
    async function setupPersistence() {
      try {
        // This ensures authentication persists across app restarts
        await setPersistence(auth, browserLocalPersistence);
        
        // Check for redirect result on startup
        const result = await getRedirectResult(auth);
        if (result) {
          console.log("Redirect result:", result.user);
        }
        
        // Get device information
        const info = await getDeviceInfo();
        setDeviceInfo({
          deviceName: info.deviceName,
          osVersion: info.osVersion
        });
      } catch (error) {
        console.error("Error setting up persistence:", error);
      }
    }
    
    setupPersistence();
  }, []);

  async function signIn(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
    // After successful login, we could log the device info to Firebase
    if (deviceInfo) {
      console.log("Logged in from device:", deviceInfo.deviceName);
      // Here you would typically update a "devices" collection in Firestore
    }
  }

  async function signUp(email: string, password: string) {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    // After successful signup, we could store the device info
    if (deviceInfo && result.user) {
      console.log("Signed up from device:", deviceInfo.deviceName);
      // Here you would typically create a "devices" collection in Firestore
    }
  }

  async function signOut() {
    await firebaseSignOut(auth);
  }

  async function signInWithGoogle() {
    try {
      // Generate an OAuth URL for Google sign-in
      const provider = new GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      
      // Generate the sign-in URL
      const auth = getAuth();
      const baseUrl = `https://accounts.google.com/o/oauth2/auth`;
      const clientId = provider.getCustomParameters()?.client_id || 
                      googleProvider.getCustomParameters()?.client_id;
      
      if (!clientId) {
        throw new Error("No client ID found in Firebase configuration");
      }
      
      // Create an OAuth URL
      const redirectUri = encodeURIComponent(
        `https://${auth.config.authDomain}/__/auth/handler`
      );
      
      const responseType = "id_token";
      
      const scope = encodeURIComponent(
        "profile email openid"
      );
      
      const state = encodeURIComponent(
        JSON.stringify({ 
          apiKey: auth.config.apiKey,
          appName: auth.name,
          redirectUrl: window.location.origin
        })
      );
      
      const oauthUrl = `${baseUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&state=${state}`;
      
      // Open the browser with the OAuth URL
      await openBrowser(oauthUrl);
      
      console.log("Opened browser for Google authentication");
      
      // The user will complete authentication in the browser and be redirected back to the app
      // We'll detect this when the app regains focus or on the next startup
      
    } catch (error) {
      console.error("Error opening browser for Google auth:", error);
      throw error;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    deviceInfo,
    loading,
    signIn,
    signUp,
    signOut,
    signInWithGoogle
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
