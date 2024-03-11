import {
  query,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
  collectionGroup,
  Timestamp,
} from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import {
  Achievement,
  BaseAchievement,
  BaseAchievementData,
  UserAchievement,
} from '@dread-ui/types';
import { useAuth, toast } from '@dread-ui/index';
import { useDB } from '@dread-ui/hooks/use-db';
import { useFullAchievements } from '@dread-ui/hooks/use-full-achievements';
import { useMergeAccounts } from '@dread-ui/hooks/use-merge-accounts';
import { useUserPreferences } from '@dread-ui/hooks/use-user-preferences';

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
  unlockAchievementById: (id: string, gameId?: string) => Promise<void>;
  saveAchievement: (achievement: Achievement) => Promise<void>;
  isUnlockable: (achievementId: string, gameId: string) => boolean;
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
  const { achievements } = useFullAchievements(uid);
  const { userPreferences } = useUserPreferences(uid);
  useMergeAccounts();

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
      achievement.state = 'newly_unlocked';
      achievement.unlockedAt = Timestamp.now();
      if (userPreferences.showNotifications)
        toast(achievement.title, {
          description: achievement.description,
        });
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
    userAchievement.state === 'locked'
      ? await unlockAchievement(achievement)
      : await lockAchievement(achievement);
  };

  const isUnlockable = (achievementId: string, gameId: string) => {
    return (
      achievements.find(
        (achievement) =>
          achievement.uid === uid &&
          achievement.gameId === gameId &&
          achievement.id === achievementId &&
          achievement.state === 'locked',
      ) !== undefined
    );
  };

  useEffect(() => {
    const fetchAllGameAchievements = async (): Promise<BaseAchievement[]> => {
      if (!db) return [];
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

    fetchAllGameAchievements().then((achievements) => {
      setAllAchievements(achievements);
    });
  }, [setAllAchievements, db]);

  // const fetchGameAchievements = async (gameId: string): Promise<any> => {
  //   if (!db) return [];
  //   const q = query(collection(db, `games/${gameId}/achievements`));
  //   const querySnapshot = await getDocs(q);
  //   return querySnapshot.docs.map((doc) => convertDBGameAchievement(doc));
  // };

  return (
    <AchievementsContext.Provider
      value={{
        allAchievements,
        achievements,
        toggleAchievement,
        unlockAchievementById,
        saveAchievement,
        isUnlockable,
      }}
    >
      {children}
    </AchievementsContext.Provider>
  );
};
