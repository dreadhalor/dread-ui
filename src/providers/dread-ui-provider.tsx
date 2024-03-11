import {
  AchievementsProvider,
  AuthProvider,
  IframeProvider,
  Toaster,
} from '@dread-ui/index';

type Props = {
  children: React.ReactNode;
};
const DreadUiProvider = ({ children }: Props) => {
  return (
    <IframeProvider>
      <AuthProvider>
        <AchievementsProvider>
          {children}
          <Toaster closeButton />
        </AchievementsProvider>
      </AuthProvider>
    </IframeProvider>
  );
};

export { DreadUiProvider };
