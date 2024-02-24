import { thumbs } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { Skeleton } from '@dread-ui/index';
import AnonIcon from '@dread-ui/assets/anon-icon.svg?react';
import { cn } from '@repo/utils';

type UserAvatarProps = {
  loading: boolean;
  uid: string | null;
  signedIn: boolean;
  className?: string;
};
const UserAvatar = ({ loading, uid, signedIn, className }: UserAvatarProps) => {
  const avatar = createAvatar(thumbs, {
    seed: uid ?? '',
    scale: 80,
    radius: 50,
    translateY: -10,
  });

  const svg = avatar.toDataUriSync();

  return (
    <>
      {loading ? (
        <Skeleton className={cn('h-full w-full', className)} />
      ) : !signedIn ? (
        <AnonIcon className={cn('h-full w-full p-1.5', className)} />
      ) : (
        <img
          className={cn('h-full w-full', className)}
          draggable={false}
          src={svg}
          alt='User avatar'
        />
      )}
    </>
  );
};

export { UserAvatar };
