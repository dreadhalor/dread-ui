import { Achievement } from '@dread-ui/types';

type AchievementSquareProps = {
  achievement: Achievement;
};
const AchievementSquare = ({ achievement }: AchievementSquareProps) => {
  return (
    <div className='h-[200px] w-[200px] border'>
      <div className='text-xs'>{achievement.gameId}</div>
      <div className='text-xs'>{achievement.title}</div>
      <div className='text-xs'>{achievement.description}</div>
      <div className='text-xs'>{achievement.state}</div>
    </div>
  );
};

export { AchievementSquare };
