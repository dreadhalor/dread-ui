import { useAchievements } from '@dread-ui/providers/achievements-provider';
import { AchievementSquare } from './achievement-square';
import { Achievement } from '@dread-ui/types';
import { useEffect, useState } from 'react';
import MapBorder from './map-border';
import backgroundImage from '@dread-ui/assets/kid-icarus-background.png';

const AchievementsGrid = () => {
  const { achievements, saveAchievement } = useAchievements();
  const [sortedAchievements, setSortedAchievements] = useState<Achievement[]>(
    [],
  );
  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);

  const selectAchievement = (achievement: Achievement | null) => {
    setSelectedAchievement((prev) => {
      if (prev === null) return achievement;
      if (prev.state === 'newly_unlocked') {
        prev.state = 'unlocked';
        saveAchievement(prev);
      }
      return achievement;
    });
  };

  useEffect(() => {
    const sorted = [...achievements].sort((a, b) => a.index - b.index);
    setSortedAchievements(sorted);
  }, [achievements]);

  return (
    <div className='flex h-full w-full overflow-auto'>
      <MapBorder>
        <div
          className='grid h-full w-full shrink-0 grid-cols-10 grid-rows-10 bg-cover'
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        >
          {sortedAchievements.map((achievement) => (
            <AchievementSquare
              key={achievement.id}
              achievement={achievement}
              selectedAchievement={selectedAchievement}
              selectAchievement={selectAchievement}
            />
          ))}
        </div>
      </MapBorder>
    </div>
  );
};

export { AchievementsGrid };
