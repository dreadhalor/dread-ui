import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  useAchievements,
  useIframe,
} from '@dread-ui/index';
import { Achievement } from '@dread-ui/types';
import { hasUnlockedNeighbors } from './achievement-square-utils';

type AchievementPopoverProps = {
  achievement: Achievement;
  selectedAchievement: Achievement | null;
  selectAchievement: (achievement: Achievement | null) => void;
  children: React.ReactNode;
};
const AchievementPopover = ({
  achievement,
  children,
  selectAchievement,
  selectedAchievement,
}: AchievementPopoverProps) => {
  const { unlockedAt, state } = achievement;
  const { achievements } = useAchievements();
  const { sendMessageToParent } = useIframe();
  const isUnlocked = state === 'unlocked' || state === 'newly_unlocked';
  const showDescription =
    isUnlocked || hasUnlockedNeighbors(achievement, achievements);

  return (
    <Popover
      onOpenChange={(open) => {
        if (!open && selectedAchievement) {
          selectAchievement(null);
        }
      }}
    >
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align='center'
        side='top'
        sideOffset={10}
        className='w-fit max-w-[350px]'
      >
        <div className='flex flex-col gap-1'>
          {unlockedAt && (
            <div className='flex items-center gap-[8px]'>
              <span className='text-sm text-gray-400'>
                {unlockedAt.toDate().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                } as Intl.DateTimeFormatOptions)}
              </span>
              {state === 'newly_unlocked' && (
                <div className='rounded-full bg-[#00bfff] px-[6px] py-[1px] text-xs text-white'>
                  New!
                </div>
              )}
            </div>
          )}
          <div
            className='w-fit cursor-pointer hover:underline'
            onClick={() => {
              sendMessageToParent({
                type: 'scroll-to-app',
                link: `/${achievement.gameId}`,
              });
            }}
          >
            {achievement.gameId}
          </div>
          <span className='text-2xl font-bold text-black'>
            {achievement.unlockedAt ? achievement.title : '???'}
          </span>
          <span className='text-black'>
            {showDescription ? achievement.description : '???'}
          </span>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export { AchievementPopover };
