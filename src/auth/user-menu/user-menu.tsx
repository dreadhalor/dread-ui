import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@dread-ui/index';
import React, { createContext, useContext, useState } from 'react';
import { UserMenuButton } from './user-menu-button';
import { useAuth } from '@dread-ui/providers/auth-provider';

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

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { signInWithGoogle, signedIn, handleLogout } = useAuth();

  return (
    <UserMenuContext.Provider value={{ isOpen, setIsOpen }}>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <UserMenuButton />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Achievements</DropdownMenuItem>
          <DropdownMenuItem>Toggle Notifications</DropdownMenuItem>
          <DropdownMenuItem>Toggle Badges</DropdownMenuItem>
          {!signedIn && (
            <DropdownMenuItem onSelect={signInWithGoogle}>
              Sign In&nbsp;&nbsp;🎉
            </DropdownMenuItem>
          )}
          {signedIn && (
            <DropdownMenuItem onSelect={handleLogout}>Logout</DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </UserMenuContext.Provider>
  );
};

export { UserMenu };
