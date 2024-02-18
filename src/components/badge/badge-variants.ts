import { VariantProps, cva } from 'class-variance-authority';

const badgeVariants = cva(
  'focus:ring-ring inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground border-transparent shadow',
        secondary: 'bg-secondary text-secondary-foreground border-transparent',
        destructive:
          'bg-destructive text-destructive-foreground border-transparent shadow',
        caution: 'bg-caution text-caution-foreground border-transparent shadow',
        success: 'bg-success text-success-foreground border-transparent shadow',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

// get the type of the badge variants
type BadgeVariants = VariantProps<typeof badgeVariants>['variant'];

export { badgeVariants, type BadgeVariants };
