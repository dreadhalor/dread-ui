import {
  GoogleAuthProvider,
  type UserCredential,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { auth } from '@repo/utils/firebase';

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

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextValue => useContext(AuthContext);

interface Props {
  children: React.ReactNode;
}
export const AuthProvider = ({ children }: Props) => {
  const [uid, setUid] = useState<string | null>(null); // to prevent a Firebase error on init with ''
  const [displayName, setDisplayName] = useState<string | null>(''); // to prevent a Firebase error on init with ''
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
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
  }, [setUid, setDisplayName, setSignedIn, setLoading]);

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
