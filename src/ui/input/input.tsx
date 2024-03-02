import React from 'react';

import { cn } from '@repo/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

/** Displays a form input field or a component that looks like an input field. */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'border-border bg-background flex h-9 w-full rounded-md border px-3 py-1 shadow-sm transition-colors',
          'placeholder:text-input',
          'focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-1',
          'disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
