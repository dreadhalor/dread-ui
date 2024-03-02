import React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@repo/utils';

/** An input where the user selects a value from within a given range. */
const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      'group peer relative flex w-full cursor-pointer touch-none select-none items-center',
      'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track className='bg-primary/20 relative h-1.5 w-full grow overflow-hidden rounded-full'>
      <SliderPrimitive.Range className='bg-primary absolute h-full' />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={cn(
        'border-primary/50 bg-background block h-4 w-4 rounded-full border shadow transition-colors',
        'focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-1',
      )}
    />
    <SliderPrimitive.Thumb // Needed for a second thumb, somehow doesn't show up if only 1 value is given
      className={cn(
        'border-primary/50 bg-background block h-4 w-4 rounded-full border shadow transition-colors',
        'focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-1',
      )}
    />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
