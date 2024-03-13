import { useAchievements } from '@dread-ui/providers/achievements-provider';
import { Achievement } from '@dread-ui/types';
import { cn } from '@repo/utils';
import { AchievementPopover } from './achievement-popover';
import { FaExclamationCircle } from 'react-icons/fa';
import {
  checkNeighborState,
  constructBorders,
  getNeighbors,
} from './achievement-square-utils';

type AchievementSquareProps = {
  achievement: Achievement;
  selectedAchievement: Achievement | null;
  selectAchievement: (achievement: Achievement | null) => void;
  moveSelectedAchievement: (
    direction: 'up' | 'down' | 'left' | 'right',
  ) => void;
};
const AchievementSquare = ({
  achievement,
  selectedAchievement,
  selectAchievement,
}: AchievementSquareProps) => {
  const { toggleAchievement, achievements } = useAchievements();

  const is_locked = achievement.state === 'locked';
  const is_selected = selectedAchievement?.id === achievement.id;
  const newlyUnlocked = achievement.state === 'newly_unlocked';
  const neighbors = getNeighbors(achievement.id, achievements);
  const has_unlocked_neighbors = checkNeighborState(['unlocked'], neighbors);

  const innerSquareStyle = constructBorders(
    neighbors,
    is_selected,
    is_locked,
    has_unlocked_neighbors,
  );

  const bg_colors = {
    locked: 'rgb(44,3,21)',
    unlocked: '',
    locked_with_unlocked_neighbors: 'rgba(84,43,61,0.97)',
  };

  const getBackgroundColor = () => {
    if (!is_locked) return bg_colors.unlocked;
    if (has_unlocked_neighbors) return bg_colors.locked_with_unlocked_neighbors;
    return bg_colors.locked;
  };

  const style = {
    backgroundColor: getBackgroundColor(),
  };

  return (
    <AchievementPopover
      achievement={achievement}
      selectAchievement={selectAchievement}
      selectedAchievement={selectedAchievement}
    >
      <div
        className={cn('relative overflow-visible')}
        onDoubleClick={() => {
          if (import.meta.env.DEV) toggleAchievement(achievement);
        }}
        onPointerDown={() => selectAchievement(achievement)}
      >
        {newlyUnlocked && (
          <FaExclamationCircle className='absolute right-1 top-1 h-[14px] w-[14px] text-[#ffd700]' />
        )}
        <div
          className={`flex ${!is_selected ? 'transition-all' : ''}`}
          style={{ ...innerSquareStyle, ...style }}
        ></div>
      </div>
    </AchievementPopover>
  );
};

export { AchievementSquare };
