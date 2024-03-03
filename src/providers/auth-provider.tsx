import {
  GoogleAuthProvider,
  type UserCredential,
  signInWithPopup,
  signOut,
  Auth,
} from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

// Firebase v9+: pull from .env
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

export interface AuthContextValue {
  uid: string | null;
  displayName: string | null;
  signedIn: boolean;
  loading: boolean;
  signInWithGoogle: () => Promise<UserCredential | null>;
  handleLogout: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextValue>(
  {} as AuthContextValue,
);

export const useAuth = (): AuthContextValue => useContext(AuthContext);

interface Props {
  children: React.ReactNode;
}
export const AuthProvider = ({ children }: Props) => {
  const [uid, setUid] = useState<string | null>(null); // to prevent a Firebase error on init with ''
  const [displayName, setDisplayName] = useState<string | null>(''); // to prevent a Firebase error on init with ''
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const [app, setApp] = useState<FirebaseApp | null>(null);
  const [auth, setAuth] = useState<Auth | null>(null);

  useEffect(() => {
    const _app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    setApp(_app);
  }, []);

  useEffect(() => {
    if (!app) return;
    setAuth(getAuth(app));
  }, [app]);

  // const app = initializeApp(firebaseConfig);

  // const auth = getAuth(app);

  useEffect(() => {
    if (!auth || !app) return;
    if (location.hostname === 'localhost') {
      connectAuthEmulator(auth, 'http://localhost:9099', {
        disableWarnings: true,
      });
    }

    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUid(authUser.uid);
        setDisplayName(authUser.displayName);
        setSignedIn(true);
        setLoading(false);
      } else {
        const localUid = localStorage.getItem('localUid');
        if (localUid) {
          setUid(localUid);
          setDisplayName('');
        } else {
          const id = uuidv4();
          localStorage.setItem('localUid', id);
          setUid(id);
          setDisplayName('');
        }
        setSignedIn(false);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth, app]);

  // sign in with a Google popup
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    if (!auth) return null;
    try {
      const result = await signInWithPopup(auth, provider);
      if (result) {
        // RUN THE FUNCTION TO LINK THE LOCAL ACCOUNT TO THE FIREBASE ACCOUNT
        // THEN WIPE THE LOCAL ACCOUNT
        const event = new CustomEvent('mergeAccounts', {
          detail: { localUid: uid, remoteUid: result.user.uid },
        });
        window.dispatchEvent(event);
        // don't delete the local uid because it stops a new uid being created on logout
        // literally just way easier to debug if something goes wrong
        setUid(result.user.uid);
        setDisplayName(result.user.displayName);
        setSignedIn(true);
        return result;
      }
      return null;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      return null;
    }
  };

  const handleLogout = async () => {
    if (!auth) return false;
    try {
      await signOut(auth);
      return true;
    } catch (error) {
      console.error('Error signing out:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        uid,
        displayName,
        signedIn,
        loading,
        signInWithGoogle,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
