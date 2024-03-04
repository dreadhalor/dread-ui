import { useState, useEffect } from 'react';
import { useDB } from '@dread-ui/hooks/use-db';
import { BaseAchievement, UserAchievement } from '@dread-ui/types';

export function useAchievementsData(uid: string | null) {
  const { subscribeToUserAchievements, subscribeToGameAchievements } = useDB();
  const [gameAchievements, setGameAchievements] = useState<BaseAchievement[]>(
    [],
  );
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>(
    [],
  );

  useEffect(() => {
    const gameUnsubscribe = subscribeToGameAchievements(setGameAchievements);
    const userUnsubscribe = subscribeToUserAchievements(
      uid,
      setUserAchievements,
    );

    return () => {
      gameUnsubscribe();
      userUnsubscribe();
    };
    // when I add the subscribe functions to the dependency array, the app crashes
  }, [uid]); // eslint-disable-line react-hooks/exhaustive-deps

  return { gameAchievements, userAchievements };
}
