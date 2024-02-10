import type { Meta, StoryObj } from '@storybook/react';

import { Label } from './label';
import { Checkbox } from '@dread-ui/index';

const meta: Meta<typeof Label> = {
  component: Label,
  title: 'Components/Label',
};

export default meta;
type Story = StoryObj<typeof Label>;

/** A basic label. */
export const Demo: Story = {
  argTypes: {
    asChild: {
      table: {
        disable: true,
      },
    },
    children: {
      control: 'text',
      description: 'The label text.',
    },
  },
  args: {
    children: 'Accept terms & conditions',
  },
  render: ({ children }) => (
    <div className='flex items-center space-x-2'>
      <Checkbox id='terms' />
      <Label htmlFor='terms'>{children}</Label>
    </div>
  ),
};

/** A label associated with a disabled control. */
export const Disabled: Story = {
  argTypes: {
    asChild: {
      table: {
        disable: true,
      },
    },
    children: {
      control: 'text',
      description: 'The label text.',
    },
  },
  args: {
    children: 'Accept terms & conditions',
  },
  render: ({ children }) => (
    <div className='flex items-center space-x-2'>
      <Checkbox id='terms' disabled />
      <Label htmlFor='terms'>{children}</Label>
    </div>
  ),
};
