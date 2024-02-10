/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './switch';
import { Label } from '@dread-ui/index';

const meta: Meta<typeof Switch> = {
  component: Switch,
  title: 'Components/Switch',
  argTypes: {
    disabled: {
      description: 'Whether the switch is disabled.',
      control: 'boolean',
    },
    asChild: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** A basic switch. */
export const Demo: Story = {
  render: (args) => (
    <div className='flex items-center space-x-2'>
      <Switch id='airplane-mode' {...args} />
      <Label htmlFor='airplane-mode'>Airplane Mode</Label>
    </div>
  ),
};

/** A disabled switch. */
export const Disable: Story = {
  render: (_) => (
    <div className='flex items-center space-x-2'>
      <Switch id='airplane-mode' disabled />
      <Label htmlFor='airplane-mode'>Airplane Mode</Label>
    </div>
  ),
};
