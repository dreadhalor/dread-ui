import { useState } from 'react';
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@dread-ui/index';
import { cn } from '@repo/utils';

const bars = [400, 300, 200, 300, 200, 278, 189, 239, 300, 200, 278, 189, 349];

export function ActivityGoalDemo() {
  const [goal, setGoal] = useState(350);
  const min = 200,
    max = 400,
    increment = 10;
  const barAdjustmentRange = 20;
  const barAdjustment = (barAdjustmentRange * (goal - min)) / min;

  function onClick(adjustment: number) {
    setGoal(Math.max(min, Math.min(max, goal + adjustment)));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Move Goal</CardTitle>
        <CardDescription>Set your daily activity goal.</CardDescription>
      </CardHeader>
      <CardContent className='pb-2'>
        <div className='flex items-center justify-center space-x-2'>
          <Button
            variant='outline'
            size='icon'
            className='h-8 w-8 shrink-0 rounded-full'
            onClick={() => onClick(-increment)}
            disabled={goal <= min}
          >
            <MinusIcon className='h-4 w-4' />
            <span className='sr-only'>Decrease</span>
          </Button>
          <div className='flex-1 text-center'>
            <div className='text-5xl font-bold tracking-tighter'>{goal}</div>
            <div className='text-muted-foreground text-[0.70em] uppercase'>
              Calories/day
            </div>
          </div>
          <Button
            variant='outline'
            size='icon'
            className='h-8 w-8 shrink-0 rounded-full'
            onClick={() => onClick(increment)}
            disabled={goal >= max}
          >
            <PlusIcon className='h-4 w-4' />
            <span className='sr-only'>Increase</span>
          </Button>
        </div>
        <div className='animate-scale-up my-3 flex h-[60px] items-end gap-1'>
          {bars.map((goal, index) => (
            <div
              key={index}
              className={cn(
                'bg-primary w-1/12 opacity-20 transition-[height]',
                index === 0 && 'rounded-l-md',
                index === bars.length - 1 && 'rounded-r-md',
              )}
              style={{
                height: `${
                  (goal / Math.max(...bars)) * 110 -
                  barAdjustmentRange +
                  barAdjustment
                }%`,
              }}
            ></div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className='w-full'>Set Goal</Button>
      </CardFooter>
    </Card>
  );
}
