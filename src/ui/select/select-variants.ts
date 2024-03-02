import { cva } from 'class-variance-authority';

const selectVariants = cva([
  'border-border bg-background flex h-9 w-full min-w-0 items-center justify-between rounded-md border px-3 py-2 shadow-sm',
  'ring-offset-background',
  'data-[placeholder]:text-input',
  'focus:ring-ring focus:outline-none focus:ring-1',
  'disabled:cursor-not-allowed disabled:opacity-50',
]);

export { selectVariants };
