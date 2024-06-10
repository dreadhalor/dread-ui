import { useAchievements } from '@dread-ui/providers/achievements-provider';
import { AchievementSquare } from './achievement-square';
import { Achievement } from '@dread-ui/types';
import { useCallback, useEffect, useState } from 'react';
import MapBorder from './map-border';
import backgroundImage from '@dread-ui/assets/kid-icarus-background.webp';

const AchievementsGrid = () => {
  const { achievements, saveAchievement } = useAchievements();
  const [sortedAchievements, setSortedAchievements] = useState<Achievement[]>(
    [],
  );
  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);
  const [lastSelectedAchievement, setLastSelectedAchievement] =
    useState<Achievement | null>(null);

  const selectAchievement = useCallback(
    (achievement: Achievement | null) => {
      setSelectedAchievement((prev) => {
        if (prev === null) return achievement;
        if (prev.state === 'newly_unlocked') {
          prev.state = 'unlocked';
          saveAchievement(prev);
        }
        return achievement;
      });
    },
    [saveAchievement],
  );

  useEffect(() => {
    if (selectedAchievement) setLastSelectedAchievement(selectedAchievement);
  }, [selectedAchievement]);

  const moveSelectedAchievement = useCallback(
    (direction: 'up' | 'down' | 'left' | 'right') => {
      if (selectedAchievement === null) {
        selectAchievement(lastSelectedAchievement || sortedAchievements[0]!);
        return;
      }
      const index = sortedAchievements.findIndex(
        (a) => a.id === selectedAchievement.id,
      );
      const newIndex = {
        up: (index - 10 + 100) % 100,
        down: (index + 10 + 100) % 100,
        left: (index - 1 + 100) % 100,
        right: (index + 1 + 100) % 100,
      }[direction];
      const newSelectedAchievement = sortedAchievements[newIndex] ?? null;
      selectAchievement(newSelectedAchievement);
    },
    [
      selectedAchievement,
      sortedAchievements,
      selectAchievement,
      lastSelectedAchievement,
    ],
  );

  useEffect(() => {
    const sorted = [...achievements].sort((a, b) => a.index - b.index);
    setSortedAchievements(sorted);
  }, [achievements]);

  return (
    <div
      // we need this to allow keyboard navigation
      tabIndex={0}
      className='flex h-full w-full overflow-auto focus:outline-none'
      onKeyDown={(e) => {
        e.preventDefault();
        if (e.key === 'ArrowUp') moveSelectedAchievement('up');
        if (e.key === 'ArrowDown') moveSelectedAchievement('down');
        if (e.key === 'ArrowLeft') moveSelectedAchievement('left');
        if (e.key === 'ArrowRight') moveSelectedAchievement('right');
        if (e.key === 'Escape') selectAchievement(null);
      }}
    >
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
              moveSelectedAchievement={moveSelectedAchievement}
            />
          ))}
        </div>
      </MapBorder>
    </div>
  );
};

export { AchievementsGrid };
