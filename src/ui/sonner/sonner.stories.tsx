import type { Meta, StoryObj } from '@storybook/react';

import { Toaster, toast } from './sonner';
import { Button } from '@dread-ui/index';

const meta: Meta = {
  title: 'Components/Sonner',
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
  render: () => (
    <Button
      variant='outline'
      onClick={() =>
        toast('Event has been created', {
          description: 'Sunday, December 03, 2023 at 9:00 AM',
          action: {
            label: 'Undo',
            onClick: () => console.log('Undo'),
          },
        })
      }
    >
      Show Toast
    </Button>
  ),
};
