import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@dread-ui/index';
import React, { createContext, useContext, useState } from 'react';
import { UserMenuButton } from './user-menu-button';
import { useAuth } from '@dread-ui/providers/auth-provider';
import { BsGoogle } from 'react-icons/bs';
import { AchievementsGrid } from '../achievements-grid/achievements-grid';

interface UserMenuContextValue {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const UserMenuContext = createContext<UserMenuContextValue>(
  {} as UserMenuContextValue,
);

export const useUserMenuContext = () => {
  const context = useContext(UserMenuContext);
  if (!context) {
    throw new Error(
      'useUserMenuContext must be used within a UserMenuProvider',
    );
  }
  return context;
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
  const { signInWithGoogle, signedIn, handleLogout } = useAuth();

  return (
    <UserMenuContext.Provider value={{ isOpen, setIsOpen }}>
      <Dialog>
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <UserMenuButton className={className} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {children}
            {!skipAchievements && (
              <>
                <DialogTrigger asChild>
                  <DropdownMenuItem>Achievements</DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuItem>Toggle Notifications</DropdownMenuItem>
                <DropdownMenuItem>Toggle Badges</DropdownMenuItem>
              </>
            )}
            {!signedIn && !skipLogin && (
              <DropdownMenuItem onSelect={signInWithGoogle}>
                <span className='flex items-center gap-[16px]'>
                  <BsGoogle />
                  Sign In&nbsp;&nbsp;🎉
                </span>
              </DropdownMenuItem>
            )}
            {signedIn && (
              <DropdownMenuItem
                onSelect={() => {
                  handleLogout().then((loggedOut) => {
                    if (loggedOut && onLogout) onLogout();
                  });
                }}
              >
                Logout
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent overlayClassName='bg-black/60'>
          <DialogHeader>Achievements</DialogHeader>
          <AchievementsGrid />
        </DialogContent>
      </Dialog>
    </UserMenuContext.Provider>
  );
};

export { UserMenu };
