import { useAchievements } from '@dread-ui/providers/achievements-provider';
import { AchievementSquare } from './achievement-square';

const AchievementsGrid = () => {
  const { achievements } = useAchievements();

  return (
    <div className='flex overflow-auto'>
      <div className='m-auto grid shrink-0 grid-cols-10'>
        {achievements.map((achievement) => (
          <AchievementSquare key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </div>
  );
};

export { AchievementsGrid };
