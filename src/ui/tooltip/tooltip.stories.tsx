import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@dread-ui/index';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  title: 'Components/Tooltip',
};

export default meta;
type Story = StoryObj<typeof meta>;

/** A basic tooltip. */
export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>Hover over me!</TooltipTrigger>
        <TooltipContent>You did it!</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

/** A tooltip with custom styling. */
export const Styled: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant='outline'>Hover over me!</Button>
        </TooltipTrigger>
        <TooltipContent className='bg-red-200'>
          <p>You did it!</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};
