import {
  AchievementsProvider,
  AuthProvider,
  IframeProvider,
} from '@dread-ui/index';

type Props = {
  children: React.ReactNode;
};
const DreadUiProvider = ({ children }: Props) => {
  return (
    <IframeProvider>
      <AuthProvider>
        <AchievementsProvider>{children}</AchievementsProvider>
      </AuthProvider>
    </IframeProvider>
  );
};

export { DreadUiProvider };
