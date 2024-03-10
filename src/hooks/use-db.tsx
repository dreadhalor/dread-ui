import {
  getFirestore,
  query,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  connectFirestoreEmulator,
  onSnapshot,
  QueryDocumentSnapshot,
  DocumentData,
  collectionGroup,
  where,
  Firestore,
  getDoc,
} from 'firebase/firestore';
import {
  BaseAchievement,
  BaseAchievementData,
  UserAchievementData,
  UserAchievement,
  UserPreferencesData,
  UserPreferences,
} from '@dread-ui/types';
import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import { useEffect, useState } from 'react';

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

const convertDBGameAchievement = (doc: QueryDocumentSnapshot<DocumentData>) => {
  const data = doc.data() as BaseAchievementData;
  const gameId = doc.ref.parent.parent?.id ?? '';
  return {
    id: doc.id,
    gameId,
    ...data,
  };
};
const convertDBUserAchievement = (doc: QueryDocumentSnapshot<DocumentData>) => {
  const data = doc.data() as UserAchievementData;
  const gameId = doc.ref.parent.parent?.id ?? '';
  return {
    id: doc.id,
    gameId,
    ...data,
  };
};

export const useDB = () => {
  const [app, setApp] = useState<FirebaseApp | null>(null);
  const [db, setDb] = useState<Firestore | null>(null);

  useEffect(() => {
    const _app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    setApp(_app);
  }, []);

  useEffect(() => {
    if (!app) return;
    setDb(getFirestore(app));
  }, [app]);

  useEffect(() => {
    if (!db || !app) return;
    // Connect to Firestore emulator if the host is localhost
    if (location.hostname === 'localhost') {
      connectFirestoreEmulator(db, 'localhost', 8080);
    }
  }, [db, app]);

  const subscribeToGameAchievements = (
    callback: (achievements: BaseAchievement[]) => void,
  ) => {
    if (!db) return () => {}; // eslint-disable-line @typescript-eslint/no-empty-function
    const q = query(collectionGroup(db, 'achievements'));
    return onSnapshot(q, (querySnapshot) => {
      const achievements = querySnapshot.docs.map((doc) =>
        convertDBGameAchievement(doc),
      );
      callback(achievements);
    });
  };

  const subscribeToUserAchievements = (
    uid: string | null,
    callback: (achievements: UserAchievement[]) => void,
  ): (() => void) => {
    if (!uid || !db) return () => {}; // eslint-disable-line @typescript-eslint/no-empty-function

    const q = query(
      collectionGroup(db, 'userAchievements'),
      where('uid', '==', uid),
    );
    return onSnapshot(q, (querySnapshot) => {
      const achievements = querySnapshot.docs.map((doc) =>
        convertDBUserAchievement(doc),
      );
      callback(achievements);
    });
  };

  const fetchUserAchievements = async (
    uid: string | null,
  ): Promise<UserAchievement[]> => {
    if (!uid || !db) return Promise.resolve([]);
    const achievementsCollection = query(
      collectionGroup(db, 'userAchievements'),
      where('uid', '==', uid),
    );
    const querySnapshot = await getDocs(achievementsCollection);
    return querySnapshot.docs.map((doc) => convertDBUserAchievement(doc));
  };

  const saveAchievement = async (
    achievement: UserAchievement,
  ): Promise<UserAchievement> => {
    if (!db) throw new Error('Firestore not initialized');
    const { id, gameId, uid, state, unlockedAt } = achievement;
    const dbAchievement: UserAchievementData = { state, unlockedAt, uid };
    await setDoc(
      doc(db, `users/${uid}/games/${gameId}/userAchievements/${id}`),
      dbAchievement,
    );
    return achievement;
  };

  const deleteAchievement = async (
    achievement_id: string,
    game_id: string,
    user_id: string,
  ): Promise<void> => {
    if (!db) throw new Error('Firestore not initialized');
    await deleteDoc(
      doc(
        db,
        `users/${user_id}/games/${game_id}/userAchievements/${achievement_id}`,
      ),
    );
  };

  // given a partial UserPreferences object, save it to the database
  const saveUserPreferences = async (
    uid: string,
    preferences: Partial<UserPreferencesData>,
  ): Promise<void> => {
    if (!db) throw new Error('Firestore not initialized');
    await setDoc(doc(db, `users/${uid}`), { preferences });
  };
  const deleteUserPreferences = async (uid: string): Promise<void> => {
    if (!db) throw new Error('Firestore not initialized');
    const userDoc = await getDoc(doc(db, `users/${uid}`));
    if (userDoc.exists()) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { preferences, ...userData } = userDoc.data();
      // if there are no other fields, delete the user doc
      if (!userData || Object.keys(userData).length === 0)
        await deleteDoc(doc(db, `users/${uid}`));
      else await setDoc(doc(db, `users/${uid}`), userData);
    }
  };

  const subscribeToUserPreferences = (
    uid: string | null,
    callback: (preferences: UserPreferencesData) => void,
  ): (() => void) => {
    if (!uid) return () => {}; // eslint-disable-line @typescript-eslint/no-empty-function
    if (!db) throw new Error('Firestore not initialized');

    const userDoc = doc(db, `users/${uid}`);

    return onSnapshot(userDoc, (doc) => {
      const userData = doc.data() as UserPreferences;
      const { showNotifications = true, showBadges = true } =
        userData?.preferences || {};
      const sanitizedPreferences = { showNotifications, showBadges };
      callback(sanitizedPreferences);
    });
  };

  const fetchUserPreferences = async (
    uid: string | null,
  ): Promise<UserPreferencesData> => {
    if (!uid || !db)
      return Promise.resolve({ showNotifications: true, showBadges: true });
    const userDoc = doc(db, `users/${uid}`);
    const docSnap = await getDoc(userDoc);
    const userData = docSnap.data() as UserPreferences;
    const { showNotifications = true, showBadges = true } =
      userData?.preferences || {};
    return { showNotifications, showBadges };
  };

  return {
    db,
    fetchUserAchievements,
    subscribeToUserAchievements,
    subscribeToGameAchievements,
    saveAchievement,
    deleteAchievement,
    saveUserPreferences,
    deleteUserPreferences,
    fetchUserPreferences,
    subscribeToUserPreferences,
  };
};
