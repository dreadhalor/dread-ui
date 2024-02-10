import * as React from 'react';
import { PaperPlaneIcon } from '@radix-ui/react-icons';

import { cn, getRandomAvatar } from '@repo/utils';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Input,
} from '@dread-ui/index';

export function ChatDemo() {
  const [messages, setMessages] = React.useState([
    {
      role: 'agent',
      content: 'Hi, how can I help you today?',
    },
    {
      role: 'user',
      content: "Hey, I'm having trouble with my account.",
    },
    {
      role: 'agent',
      content: 'What seems to be the problem?',
    },
    {
      role: 'user',
      content: "I can't log in.",
    },
  ]);

  return (
    <Card>
      <CardHeader className='flex flex-row items-center'>
        <div className='flex items-center space-x-4'>
          <Avatar>
            <AvatarImage
              src={getRandomAvatar('Taylor Johannson')}
              alt='Taylor Johannson'
            />
            <AvatarFallback>TJ</AvatarFallback>
          </Avatar>
          <div>
            <p className='text-sm font-medium leading-none'>Taylor Johannson</p>
            <p className='text-muted-foreground text-sm'>
              taylor.johannson@example.com
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                'flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm',
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground ml-auto'
                  : 'bg-muted',
              )}
            >
              {message.content}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const message = event.currentTarget.message.value?.trim() as string;
            if (!message) return;
            setMessages([
              ...messages,
              {
                role: 'user',
                content: message,
              },
            ]);
            event.currentTarget.message.value = '';
          }}
          className='flex w-full items-center space-x-2'
        >
          <Input
            id='message'
            placeholder='Type your message...'
            className='flex-1'
          />
          <Button type='submit' size='icon'>
            <PaperPlaneIcon className='h-4 w-4' />
            <span className='sr-only'>Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
