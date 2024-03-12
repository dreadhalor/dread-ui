import { useState, useEffect } from 'react';
import { useDB } from '@dread-ui/hooks/use-db';
import { BaseAchievement, UserAchievement } from '@dread-ui/types';
import { useAuth } from '..';

export function useAchievementsData() {
  const { uid } = useAuth();
  const { subscribeToUserAchievements, subscribeToGameAchievements } = useDB();
  const [gameAchievements, setGameAchievements] = useState<BaseAchievement[]>(
    [],
  );
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>(
    [],
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setGameAchievements([]);
    setUserAchievements([]);
    setLoading(true);
  }, [uid]);

  useEffect(() => {
    const gameUnsubscribe = subscribeToGameAchievements(setGameAchievements);
    const userUnsubscribe = subscribeToUserAchievements(uid, (achievements) =>
      setUserAchievements(() => {
        setLoading(false);
        return achievements;
      }),
    );

    return () => {
      gameUnsubscribe();
      userUnsubscribe();
    };
    // when I add the subscribe functions to the dependency array, the app crashes
  }, [uid, subscribeToGameAchievements, subscribeToUserAchievements]);

  return { gameAchievements, userAchievements, loading };
}
