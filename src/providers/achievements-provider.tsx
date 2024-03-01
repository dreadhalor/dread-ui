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
import { getApp, getApps, initializeApp } from 'firebase/app';
import { createContext, useContext, useEffect, useState } from 'react';
import {
  Achievement,
  BaseAchievement,
  BaseAchievementData,
  GameAchievements,
  UserAchievement,
} from '@dread-ui/types';
import { useAuth } from '..';
import { useDB } from '@dread-ui/hooks/use-db';
import { useAchievementsData } from '@dread-ui/hooks/use-achievements-data';
import { useFullAchievements } from '@dread-ui/hooks/use-full-achievements';

const convertDBGameAchievement = (doc: QueryDocumentSnapshot<DocumentData>) => {
  const data = doc.data() as BaseAchievementData;
  return {
    id: doc.id,
    gameId: '',
    ...data,
  } satisfies BaseAchievement;
};

export interface AchievementsContextValue {
  allAchievements: BaseAchievement[];
  achievements: Achievement[];
}

export const AchievementsContext = createContext(
  {} as AchievementsContextValue,
);

export const useAchievements = (): AchievementsContextValue =>
  useContext(AchievementsContext);

interface Props {
  children: React.ReactNode;
}
export const AchievementsProvider = ({ children }: Props) => {
  const [allAchievements, setAllAchievements] = useState<BaseAchievement[]>([]);

  const { uid } = useAuth();
  const { db } = useDB();
  const { userAchievements } = useAchievementsData(uid, 'fallcrate');
  const { achievements } = useFullAchievements(uid);

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

  useEffect(() => {
    fetchAllGameAchievements().then((achievements) => {
      setAllAchievements(achievements);
    });
  }, [setAllAchievements]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    console.log('userAchievements', userAchievements);
  }, [userAchievements]);

  const fetchGameAchievements = async (gameId: string): Promise<any> => {
    const q = query(collection(db, `games/${gameId}/achievements`));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => convertDBGameAchievement(doc));
  };

  return (
    <AchievementsContext.Provider value={{ allAchievements, achievements }}>
      {children}
    </AchievementsContext.Provider>
  );
};
