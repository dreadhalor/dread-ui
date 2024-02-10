import { BellIcon, EyeNoneIcon, PersonIcon } from '@radix-ui/react-icons';
import { RadioGroupItem } from '@radix-ui/react-radio-group';
import { cn } from '@repo/utils';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Label,
  RadioGroup,
} from '@dread-ui/index';

const notificationOptions = [
  {
    icon: BellIcon,
    title: 'Everything',
    description: 'Email digest, mentions & all activity.',
  },
  {
    icon: PersonIcon,
    title: 'Available',
    description: 'Only mentions & comments.',
  },
  {
    icon: EyeNoneIcon,
    title: 'Ignoring',
    description: 'Turn off all notifications.',
  },
];

export function NotificationsDemo() {
  return (
    <Card>
      <CardHeader className='pb-3'>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          Choose what you want to be notified about.
        </CardDescription>
      </CardHeader>
      <CardContent className='grid gap-1'>
        <RadioGroup defaultValue='available' className='grid grid-rows-3'>
          {notificationOptions.map(({ icon: Icon, title, description }) => (
            <Label
              className={cn(
                'hover:bg-accent hover:text-accent-foreground -mx-2 flex cursor-pointer items-start space-x-4 rounded-md p-2 transition-all',
                '[&:has([data-state=checked])]:bg-accent [&:has([data-state=checked])]:text-accent-foreground',
              )}
              key={title}
            >
              <RadioGroupItem value={title.toLowerCase()} className='sr-only' />
              <Icon className='mt-px h-5 w-5' />
              <div className='space-y-1'>
                <p className='text-sm font-medium leading-none'>{title}</p>
                <p className='text-muted-foreground text-sm'>{description}</p>
              </div>
            </Label>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
