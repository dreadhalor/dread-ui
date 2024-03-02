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
  Timestamp,
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
  toggleAchievement: (achievement: Achievement) => Promise<void>;
}

const AchievementsContext = createContext({} as AchievementsContextValue);

export const useAchievements = (): AchievementsContextValue => {
  const context = useContext(AchievementsContext);
  if (!context) {
    throw new Error(
      'useAchievements must be used within an AchievementsProvider',
    );
  }
  return context;
};

interface Props {
  children: React.ReactNode;
}
export const AchievementsProvider = ({ children }: Props) => {
  const [allAchievements, setAllAchievements] = useState<BaseAchievement[]>([]);

  const { uid } = useAuth();
  const { db, saveAchievement: _saveAchievement, deleteAchievement } = useDB();
  const { userAchievements } = useAchievementsData(uid);
  const { achievements } = useFullAchievements(uid);

  const saveAchievement = async (achievement: Achievement) => {
    if (!uid) return;

    const userAchievement = extractUserAchievement(achievement);
    await _saveAchievement(userAchievement);
  };

  const extractUserAchievement = (
    achievement: Achievement,
  ): UserAchievement => {
    return {
      id: achievement.id,
      gameId: achievement.gameId,
      uid: achievement.uid,
      unlockedAt: achievement.unlockedAt ?? null,
      state: achievement.state,
    };
  };

  const changeAchievementState = async (
    achievement: Achievement,
    state: 'locked' | 'unlocked',
  ) => {
    if (!uid) return;
    if (achievement.state === state) return;

    if (state === 'unlocked' && achievement.state === 'locked') {
      console.log('unlocking achievement', achievement);
      achievement.state = 'newly_unlocked';
      achievement.unlockedAt = Timestamp.now();
      // if (userPreferences.showNotifications)
      //   openNotification(achievement.title, achievement.description);
    }

    state === 'unlocked'
      ? await saveAchievement(achievement)
      : await deleteAchievement(
          achievement.id,
          achievement.gameId,
          achievement.uid,
        );
  };

  const unlockAchievementById = async (id: string, gameId = '') => {
    const achievement = achievements.find(
      (achievement) => achievement.id === id && achievement.gameId === gameId,
    );
    if (!achievement)
      throw new Error(
        `Achievement ${id} in ${gameId} not found! Available achievements: ${
          achievements.length > 0
            ? achievements.map((achievement) => achievement.id).join(', ')
            : 'none'
        }`,
      );

    await unlockAchievement(achievement);
  };
  const unlockAchievement = (achievement: Achievement) =>
    changeAchievementState(achievement, 'unlocked');
  const lockAchievement = (achievement: Achievement) =>
    changeAchievementState(achievement, 'locked');

  const toggleAchievement = async (achievement: Achievement) => {
    const userAchievement = extractUserAchievement(achievement);
    console.log('userAchievement', userAchievement);
    userAchievement.state === 'locked'
      ? await unlockAchievement(achievement)
      : await lockAchievement(achievement);
  };

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
    <AchievementsContext.Provider
      value={{ allAchievements, achievements, toggleAchievement }}
    >
      {children}
    </AchievementsContext.Provider>
  );
};
