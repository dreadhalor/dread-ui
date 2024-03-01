import { useAchievements } from '@dread-ui/providers/achievements-provider';
import { AchievementSquare } from './achievement-square';
import { Achievement } from '@dread-ui/types';
import { useState } from 'react';

const AchievementsGrid = () => {
  const { achievements } = useAchievements();
  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);

  const selectAchievement = (achievement: Achievement) => {
    setSelectedAchievement(achievement);
  };

  return (
    <div className='flex overflow-auto'>
      <div className='m-auto grid shrink-0 grid-cols-10'>
        {achievements.map((achievement) => (
          <AchievementSquare
            key={achievement.id}
            achievement={achievement}
            selectedAchievement={selectedAchievement}
            selectAchievement={selectAchievement}
          />
        ))}
      </div>
    </div>
  );
};

export { AchievementsGrid };
