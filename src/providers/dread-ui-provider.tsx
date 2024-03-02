import { AchievementsProvider, AuthProvider, Toaster } from '@dread-ui/index';

type Props = {
  children: React.ReactNode;
};
const DreadUiProvider = ({ children }: Props) => {
  return (
    <AuthProvider>
      <AchievementsProvider>
        {children}
        <Toaster closeButton />
      </AchievementsProvider>
    </AuthProvider>
  );
};

export { DreadUiProvider };
