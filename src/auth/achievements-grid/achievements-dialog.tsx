import {
  Dialog,
  DialogContent,
  DialogHeader,
  useAchievements,
} from '@dread-ui/index';
import { AchievementsGrid } from './achievements-grid';

const AchievementsDialog = () => {
  const { showAchievementDialog, setShowAchievementDialog } = useAchievements();

  return (
    <Dialog
      open={showAchievementDialog}
      onOpenChange={setShowAchievementDialog}
    >
      <DialogContent
        overlayClassName='bg-black/60'
        className='border-0 bg-[rgb(37,44,59)] outline-none'
        noCloseButton
      >
        <DialogHeader className='mx-auto text-2xl text-white'>
          Achievements!
        </DialogHeader>
        <AchievementsGrid />
      </DialogContent>
    </Dialog>
  );
};

export { AchievementsDialog };
