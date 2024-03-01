import { useEffect, useState } from 'react';
import { BaseAchievement, Achievement, UserAchievement } from '@dread-ui/types';
import { useAchievementsData } from './use-achievements-data';

const useFullAchievements = (uid: string | null) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  const { gameAchievements, userAchievements } = useAchievementsData(uid);

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

  return { achievements };
};

export { useFullAchievements };
