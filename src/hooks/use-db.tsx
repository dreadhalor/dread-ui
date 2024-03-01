import {
  getFirestore,
  collection,
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
} from 'firebase/firestore';
import {
  BaseAchievement,
  BaseAchievementData,
  UserAchievementData,
  UserAchievement,
  UserPreferences,
  UserPreferencesData,
} from '@dread-ui/types';
import { getApp, getApps, initializeApp } from 'firebase/app';

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

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// Connect to Firestore emulator if the host is localhost
if (location.hostname === 'localhost') {
  connectFirestoreEmulator(db, 'localhost', 8080);
}

const saveAchievement = async (
  achievement: UserAchievement,
): Promise<UserAchievement> => {
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
  await deleteDoc(
    doc(
      db,
      `users/${user_id}/games/${game_id}/userAchievements/${achievement_id}`,
    ),
  );
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
  const subscribeToGameAchievements = (
    callback: (achievements: BaseAchievement[]) => void,
  ) => {
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
    if (!uid) return () => {}; // eslint-disable-line @typescript-eslint/no-empty-function

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

  return {
    db,
    subscribeToUserAchievements,
    subscribeToGameAchievements,
    saveAchievement,
    deleteAchievement,
  };
};
