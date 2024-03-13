import {
  AchievementsProvider,
  AuthProvider,
  IframeProvider,
  TooltipProvider,
} from '@dread-ui/index';

type Props = {
  children: React.ReactNode;
};
const DreadUiProvider = ({ children }: Props) => {
  return (
    <IframeProvider>
      <TooltipProvider>
        <AuthProvider>
          <AchievementsProvider>{children}</AchievementsProvider>
        </AuthProvider>
      </TooltipProvider>
    </IframeProvider>
  );
};

export { DreadUiProvider };
