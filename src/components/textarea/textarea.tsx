import React from 'react';

import { cn } from '@repo/utils';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

/** A resizable, multi-line text field. */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'border-border peer flex min-h-[60px] w-full rounded-md border bg-transparent px-3 py-2 shadow-sm',
          'placeholder:text-input',
          'focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-1',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
