import React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';

import { cn } from '@repo/utils';
import { ChevronDown } from '@dread-ui/index';

/** A vertically stacked set of interactive headings that each reveal a section of content. */
const Accordion = AccordionPrimitive.Root;

const AccordionHeader = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Header>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Header>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header
    ref={ref}
    className={cn('flex', className)}
    {...props}
  >
    {children}
  </AccordionPrimitive.Header>
));
AccordionHeader.displayName = AccordionPrimitive.Header.displayName;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('border-b', className)}
    {...props}
  />
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Trigger
    ref={ref}
    className={cn(
      'body-medium flex flex-1 items-center justify-between py-4 font-normal leading-none transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
      className,
    )}
    {...props}
  >
    {children}
    <ChevronDown
      className={cn(
        'text-primary h-4 w-4 shrink-0 transition-transform duration-200',
      )}
    />
  </AccordionPrimitive.Trigger>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden',
    )}
    {...props}
  >
    <div className={cn('pb-4 pt-0', className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
};
