import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  [
    'caption-1 inline-flex h-12 items-center justify-center rounded-full border border-transparent px-6 transition-colors',
    'focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/90 shadow',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm',
        outline:
          'border-border hover:bg-accent hover:text-accent-foreground bg-transparent shadow-sm',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        unstyled: 'rounded-none font-normal',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-10 px-8',
        icon: 'h-9 w-9 p-0',
      },
    },
    compoundVariants: [
      {
        variant: 'link',
        size: ['default', 'sm', 'lg', 'icon'],
        className: 'h-auto w-auto px-0 py-0',
      },
      {
        variant: 'unstyled',
        size: ['default', 'sm', 'lg', 'icon'],
        className: 'h-auto w-auto px-0 py-0',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export { buttonVariants };
