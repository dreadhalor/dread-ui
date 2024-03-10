import { useEffect } from 'react';
import { useDB } from '@dread-ui/hooks/use-db';

type MergeAccountsEventDetail = {
  localUid: string;
  remoteUid: string;
};

export function useMergeAccounts() {
  const {
    fetchUserAchievements,
    saveAchievement,
    deleteAchievement,
    fetchUserPreferences,
    saveUserPreferences,
    deleteUserPreferences,
  } = useDB();

  useEffect(() => {
    const onMergeAccounts = async (localUid: string, remoteUid: string) => {
      const [localUserAchievements, remoteUserAchievements] = await Promise.all(
        [fetchUserAchievements(localUid), fetchUserAchievements(remoteUid)],
      );
      const [localUserPreferences, remoteUserPreferences] = await Promise.all([
        fetchUserPreferences(localUid),
        fetchUserPreferences(remoteUid),
      ]);

      const mergedAchievementPromises = localUserAchievements.map(
        async (localUserAchievement) => {
          const remoteUserAchievement = remoteUserAchievements.find(
            (remoteUserAchievement) =>
              remoteUserAchievement.id === localUserAchievement.id &&
              remoteUserAchievement.gameId === localUserAchievement.gameId,
          );
          if (!remoteUserAchievement) {
            const localUserAchievementCopy = { ...localUserAchievement };
            localUserAchievementCopy.uid = remoteUid;
            await saveAchievement(localUserAchievementCopy);
          }
          return deleteAchievement(
            localUserAchievement.id,
            localUserAchievement.gameId,
            localUserAchievement.uid,
          );
        },
      );

      // if either user has notifications or badges turned off, turn them off for the merged account
      const hideNotifications =
        !localUserPreferences.showNotifications ||
        !remoteUserPreferences.showNotifications;
      const hideBadges =
        !localUserPreferences.showBadges || !remoteUserPreferences.showBadges;
      const mergedUserPreferences = {
        showNotifications: !hideNotifications,
        showBadges: !hideBadges,
      };

      await Promise.all([
        ...mergedAchievementPromises,
        saveUserPreferences(remoteUid, mergedUserPreferences),
        deleteUserPreferences(localUid),
      ]);
    };

    const handleMergeAccounts = (
      mergeAccountsEvent: CustomEvent<MergeAccountsEventDetail>,
    ) => {
      const { localUid, remoteUid } = mergeAccountsEvent.detail;
      onMergeAccounts(localUid, remoteUid);
    };

    window.addEventListener(
      'mergeAccounts',
      handleMergeAccounts as EventListener,
    );

    return () =>
      window.removeEventListener(
        'mergeAccounts',
        handleMergeAccounts as EventListener,
      );
  }, [
    fetchUserAchievements,
    saveAchievement,
    deleteAchievement,
    fetchUserPreferences,
    saveUserPreferences,
    deleteUserPreferences,
  ]);
}
