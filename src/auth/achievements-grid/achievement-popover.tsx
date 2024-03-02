import { Popover, PopoverContent, PopoverTrigger } from '@dread-ui/index';
import { Achievement } from '@dread-ui/types';

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
        className='max-w-[300px]'
      >
        <div>
          <div>{achievement.title}</div>
          <div>{achievement.description}</div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export { AchievementPopover };
