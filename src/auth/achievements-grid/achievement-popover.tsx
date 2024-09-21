import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
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
    <Tooltip
      open={selectedAchievement?.id === achievement.id}
      onOpenChange={() => {
        // only allow closing programmatically
        return true;
      }}
    >
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        align='center'
        side='top'
        sideOffset={10}
        className='w-fit max-w-[300px] p-3'
        onPointerDownOutside={() => {
          if (selectedAchievement?.id === achievement.id) {
            // because we select achievements with pointerDown, the new achievement is selected before this event
            selectAchievement(null);
          }
        }}
      >
        <TooltipArrow fill='white' />
        <div className='pointer-events-none flex flex-col gap-1'>
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
            className='pointer-events-auto w-fit cursor-pointer hover:underline'
            onClick={() => {
              sendMessageToParent({
                type: 'scroll-to-app',
                id: achievement.gameId,
              });
            }}
          >
            {achievement.gameId}
          </div>
          <span className='text-xl font-bold text-black'>
            {achievement.unlockedAt ? achievement.title : '???'}
          </span>
          <span className='text-sm text-black'>
            {showDescription ? achievement.description : '???'}
          </span>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export { AchievementPopover };
