import React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { cn } from '@repo/utils';

/** A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time. */
const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn('grid gap-2', className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'border-input text-primary group peer aspect-square h-5 w-5 rounded-full border-2 shadow',
        'focus-visible:ring-ring focus:outline-none focus-visible:ring-1',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'data-[state="checked"]:border-primary',
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className='flex items-center justify-center'>
        <div
          className={cn(
            'bg-primary aspect-square h-3 w-3 rounded-full',
            'group-data-[state="checked"]:animate-in group-data-[state="checked"]:zoom-in-75',
          )}
        ></div>
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
