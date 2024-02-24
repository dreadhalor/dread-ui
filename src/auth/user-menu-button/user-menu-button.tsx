import { Button, ButtonProps, Skeleton } from '@dread-ui/index';
import { cn } from '@repo/utils';
import AnonIcon from '@dread-ui/assets/anon-icon.svg?react';
import React from 'react';
import { useUserMenuContext } from './user-menu';
import { useAuth } from '@dread-ui/providers/auth-provider';
import { createAvatar } from '@dicebear/core';
import { thumbs } from '@dicebear/collection';

const UserMenuButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ ...props }, ref) => {
    const { isOpen } = useUserMenuContext();
    const { loading, uid, signedIn } = useAuth();

    const avatar = createAvatar(thumbs, {
      seed: uid ?? '',
      scale: 80,
      radius: 50,
      translateY: -10,
    });

    const svg = avatar.toDataUriSync();

    return (
      <Button
        ref={ref}
        {...props}
        className={cn(
          'bg-grey-200 group relative flex h-[50px] w-[50px] shrink-0 grow-0 items-center justify-center overflow-hidden rounded-full border-0 p-0 text-[#3ea6ff] shadow-none transition-colors',
          'hover:bg-[#6ebcff33]',
          isOpen && 'bg-[#6ebcff33]',
        )}
      >
        {!loading && (
          <div
            className={cn(
              'absolute inset-0 rounded-full border-[1px] transition-colors group-hover:border-transparent',
              isOpen ? 'border-transparent' : 'border-[#3ea6ff]',
              signedIn &&
                'border-[2px] border-[#6ebcff33] group-hover:border-[#6ebcff99]',
              signedIn && isOpen && 'border-[#6ebcff99]',
            )}
          />
        )}
        {loading ? (
          <Skeleton className='h-full w-full' />
        ) : !signedIn ? (
          <AnonIcon className='h-full w-full p-1.5' />
        ) : (
          <img
            className='h-full w-full'
            draggable={false}
            src={svg}
            alt='User avatar'
          />
        )}
      </Button>
    );
  },
);

export { UserMenuButton };
