import { useAchievements } from '@dread-ui/providers/achievements-provider';
import { Achievement } from '@dread-ui/types';
import { cn } from '@repo/utils';
import { AchievementPopover } from './achievement-popover';
import { FaExclamationCircle } from 'react-icons/fa';

type AchievementSquareProps = {
  achievement: Achievement;
  selectedAchievement: Achievement | null;
  selectAchievement: (achievement: Achievement | null) => void;
};
const AchievementSquare = ({
  achievement,
  selectedAchievement,
  selectAchievement,
}: AchievementSquareProps) => {
  const { toggleAchievement } = useAchievements();
  return (
    <AchievementPopover
      achievement={achievement}
      selectAchievement={selectAchievement}
      selectedAchievement={selectedAchievement}
    >
      <div
        className={cn(
          'relative h-[30px] w-[30px] overflow-visible border',
          selectedAchievement?.id === achievement.id && 'border-red-600',
          achievement.state === 'locked' && 'bg-border',
        )}
        onClick={() => selectAchievement(achievement)}
        onDoubleClick={() => toggleAchievement(achievement)}
      >
        {/* <div className='text-xs'>{achievement.gameId}</div>
        <div className='text-xs'>{achievement.title}</div>
        <div className='text-xs'>{achievement.description}</div>
        <div className='text-xs'>{achievement.state}</div> */}
        {achievement.state === 'newly_unlocked' && (
          <FaExclamationCircle className='absolute right-0 top-0 text-yellow-300' />
          // style={{
          //   color: 'gold',
          //   position: 'absolute',
          //   top: 5,
          //   right: 5,
          // }}
        )}
      </div>
    </AchievementPopover>
  );
};

export { AchievementSquare };
