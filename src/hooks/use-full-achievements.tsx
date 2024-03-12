import { useEffect, useState } from 'react';
import { BaseAchievement, Achievement, UserAchievement } from '@dread-ui/types';
import { useAchievementsData } from './use-achievements-data';
import { useAuth } from '..';

const useFullAchievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  const { uid } = useAuth();
  const { gameAchievements, userAchievements, loading } = useAchievementsData();

  useEffect(() => {
    const combineSingleAchievement = (
      gameAchievement: BaseAchievement,
      userAchievement: UserAchievement | null,
    ): Achievement => {
      if (!userAchievement) {
        userAchievement = {
          id: gameAchievement.id,
          gameId: gameAchievement.gameId,
          uid: uid ?? '', // TODO: fix this (uid is not null)
          unlockedAt: null,
          state: 'locked',
        };
      }
      return {
        ...gameAchievement,
        ...userAchievement,
      };
    };

    const combineAchievements = (
      gameAchievements: BaseAchievement[],
      userAchievements: UserAchievement[],
    ): Achievement[] => {
      return gameAchievements.map((gameAchievement) => {
        const userAchievement =
          userAchievements.find(
            (userAchievement) => userAchievement.id === gameAchievement.id,
          ) ?? null;

        return combineSingleAchievement(gameAchievement, userAchievement);
      });
    };

    setAchievements(combineAchievements(gameAchievements, userAchievements));
  }, [gameAchievements, userAchievements, uid]);

  return { achievements, loading };
};

export { useFullAchievements };
