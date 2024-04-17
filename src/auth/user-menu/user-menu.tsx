import {
  Badge,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  useAchievements,
} from '@dread-ui/index';
import React, { createContext, useContext, useState } from 'react';
import { UserMenuButton } from './user-menu-button';
import { useAuth } from '@dread-ui/providers/auth-provider';
import { BsBell, BsBellSlashFill, BsGoogle } from 'react-icons/bs';
import BadgesOffIcon from '@dread-ui/assets/badges-off-icon.svg?react';
import { FiLogIn } from 'react-icons/fi';
import { SlTrophy } from 'react-icons/sl';
import { RiNotificationBadgeLine } from 'react-icons/ri';
import { useUserPreferences } from '@dread-ui/hooks/use-user-preferences';

interface UserMenuContextValue {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const UserMenuContext = createContext<UserMenuContextValue>(
  {} as UserMenuContextValue,
);

// eslint-disable-next-line react-refresh/only-export-components
export const useUserMenuContext = () => {
  const context = useContext(UserMenuContext);
  if (!context) {
    throw new Error(
      'useUserMenuContext must be used within a UserMenuProvider',
    );
  }
  return context;
};

type UserMenuOptionProps = {
  children: React.ReactNode;
  onSelect?: (e?: Event) => void;
};
const UserMenuOption = ({ children, onSelect }: UserMenuOptionProps) => {
  return (
    <DropdownMenuItem
      onSelect={(e) => {
        onSelect && onSelect(e);
      }}
    >
      <span className='flex items-center gap-[16px]'>{children}</span>
    </DropdownMenuItem>
  );
};

type UserMenuProps = {
  className?: string;
  onLogout?: () => void;
  skipAchievements?: boolean;
  skipLogin?: boolean;
  children?: React.ReactNode;
};
const UserMenu = ({
  className,
  onLogout,
  skipAchievements = false,
  skipLogin = false,
  children,
}: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { signInWithGoogle, signedIn, handleLogout, uid } = useAuth();
  const { userPreferences, editUserPreferences } = useUserPreferences(uid);
  const { achievements, setShowAchievementDialog } = useAchievements();

  const newlyUnlockedAchievements = achievements.filter(
    (achievement) => achievement.state === 'newly_unlocked',
  );
  const showBadges = userPreferences.showBadges;

  return (
    <UserMenuContext.Provider value={{ isOpen, setIsOpen }}>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <UserMenuButton className={className} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          {children}
          {!skipAchievements && (
            <>
              <DropdownMenuItem onSelect={() => setShowAchievementDialog(true)}>
                <span className='flex items-center gap-[16px]'>
                  <SlTrophy />
                  <span className='flex items-center gap-1'>
                    Achievements
                    {newlyUnlockedAchievements.length > 0 && showBadges && (
                      <Badge variant='destructive' className='px-1.5 py-0'>
                        {newlyUnlockedAchievements.length}
                      </Badge>
                    )}
                  </span>
                </span>
              </DropdownMenuItem>
              <UserMenuOption
                onSelect={(e) => {
                  if (e) e.preventDefault();
                  editUserPreferences({
                    showNotifications: !userPreferences.showNotifications,
                  });
                }}
              >
                {userPreferences.showNotifications ? (
                  <BsBell />
                ) : (
                  <BsBellSlashFill />
                )}
                Toggle Notifications
              </UserMenuOption>
              <UserMenuOption
                onSelect={(e) => {
                  if (e) e.preventDefault();
                  editUserPreferences({
                    showBadges: !userPreferences.showBadges,
                  });
                }}
              >
                {userPreferences.showBadges ? (
                  <RiNotificationBadgeLine />
                ) : (
                  <BadgesOffIcon className='h-[16px] w-[16px]' />
                )}
                Toggle Badges
              </UserMenuOption>
            </>
          )}
          {!signedIn && !skipLogin && (
            <UserMenuOption onSelect={signInWithGoogle}>
              <BsGoogle />
              Sign In&nbsp;&nbsp;🎉
            </UserMenuOption>
          )}
          {signedIn && (
            <UserMenuOption
              onSelect={() => {
                handleLogout().then((loggedOut) => {
                  if (loggedOut && onLogout) onLogout();
                });
              }}
            >
              <FiLogIn />
              Logout
            </UserMenuOption>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </UserMenuContext.Provider>
  );
};

export { UserMenu, UserMenuOption };
