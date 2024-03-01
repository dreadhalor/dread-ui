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

const convertDBGameAchievement = (doc: QueryDocumentSnapshot<DocumentData>) => {
  const data = doc.data() as BaseAchievementData;
  const gameId = doc.ref.parent.parent?.id ?? '';
  return {
    id: doc.id,
    gameId,
    ...data,
  };
};
const convertDBUserAchievement = (
  doc: QueryDocumentSnapshot<DocumentData>,
  uid: string,
) => {
  const data = doc.data() as UserAchievementData;
  const gameId = doc.ref.parent.parent?.id ?? '';
  console.log('data', data, 'gameId', gameId);
  return {
    id: doc.id,
    gameId,
    uid,
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
  // const subscribeToGameAchievements = (
  //   gameId: string,
  //   callback: (achievements: BaseAchievement[]) => void,
  // ) => {
  //   const q = query(collection(db, `games/${gameId}/achievements`));
  //   return onSnapshot(q, (querySnapshot) => {
  //     const achievements = querySnapshot.docs.map((doc) =>
  //       convertDBGameAchievement(doc),
  //     );
  //     callback(achievements);
  //   });
  // };
  const fetchAllGameAchievements = async (): Promise<BaseAchievement[]> => {
    const q = query(collectionGroup(db, 'achievements'));
    const res = getDocs(q)
      .then((querySnapshot) =>
        querySnapshot.docs.map((doc) => convertDBGameAchievement(doc)),
      )
      .catch((error) => {
        console.log('Error getting documents: ', error);
        return [];
      });
    return res;
  };

  const subscribeToUserAchievements = (
    uid: string | null,
    callback: (achievements: UserAchievement[]) => void,
  ): (() => void) => {
    if (!uid) return () => {}; // eslint-disable-line @typescript-eslint/no-empty-function

    const achievementsCollection = collection(
      db,
      `users/${uid}/games/fallcrate/achievements`,
    );

    return onSnapshot(achievementsCollection, (querySnapshot) => {
      const achievements = querySnapshot.docs.map((doc) =>
        convertDBUserAchievement(doc, uid),
      );
      callback(achievements);
    });
  };

  return { db, subscribeToUserAchievements, subscribeToGameAchievements };
};
