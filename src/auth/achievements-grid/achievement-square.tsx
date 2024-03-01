import { useAchievements } from '@dread-ui/providers/achievements-provider';
import { Achievement } from '@dread-ui/types';
import { cn } from '@repo/utils';

type AchievementSquareProps = {
  achievement: Achievement;
  selectedAchievement: Achievement | null;
  selectAchievement: (achievement: Achievement) => void;
};
const AchievementSquare = ({
  achievement,
  selectedAchievement,
  selectAchievement,
}: AchievementSquareProps) => {
  const { toggleAchievement } = useAchievements();
  return (
    <div
      className={cn(
        'h-[200px] w-[200px] border',
        selectedAchievement?.id === achievement.id && 'border-red-600',
        achievement.state === 'locked' && 'bg-red-200',
      )}
      onClick={() => selectAchievement(achievement)}
      onDoubleClick={() => toggleAchievement(achievement)}
    >
      <div className='text-xs'>{achievement.gameId}</div>
      <div className='text-xs'>{achievement.title}</div>
      <div className='text-xs'>{achievement.description}</div>
      <div className='text-xs'>{achievement.state}</div>
    </div>
  );
};

export { AchievementSquare };
