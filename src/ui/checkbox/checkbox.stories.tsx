import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from './checkbox';
import { Label } from '@dread-ui/index';

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: 'Components/Checkbox',
  argTypes: {
    asChild: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

/** A checkbox with some text around it. */
export const WithText: Story = {
  render: () => (
    <div className='items-top flex space-x-2'>
      <Checkbox id='terms1' />
      <div className='grid gap-2 leading-none'>
        <Label htmlFor='terms1'>Accept terms & conditions</Label>
        <p className='text-muted-foreground'>
          You agree to our Terms of Service & Privacy Policy.
        </p>
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className='flex items-center space-x-2'>
      <Checkbox id='terms2' disabled />
      <Label htmlFor='terms2'>Accept terms & conditions</Label>
    </div>
  ),
};
