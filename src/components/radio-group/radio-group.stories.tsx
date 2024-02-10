/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Meta, StoryObj } from '@storybook/react';

import { RadioGroup, RadioGroupItem } from './radio-group';
import { Label } from '@dread-ui/index';

const meta: Meta<typeof RadioGroup> = {
  component: RadioGroup,
  title: 'Components/Radio Group',
  argTypes: {
    asChild: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** A basic radio group. */
export const Demo: Story = {
  argTypes: {
    disabled: {
      control: 'boolean',
      defaultValue: false,
      description: 'Whether the radio group is disabled.',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
  },
  render: (args) => (
    <RadioGroup defaultValue='comfortable' {...args}>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem value='default' id='r1' />
        <Label htmlFor='r1'>Default</Label>
      </div>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem value='comfortable' id='r2' />
        <Label htmlFor='r2'>Comfortable</Label>
      </div>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem value='compact' id='r3' />
        <Label htmlFor='r3'>Compact</Label>
      </div>
    </RadioGroup>
  ),
};

/** A disabled radio group. */
export const Disabled: Story = {
  render: (_) => (
    <RadioGroup defaultValue='comfortable' disabled>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem value='default' id='r1' />
        <Label htmlFor='r1'>Default</Label>
      </div>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem value='comfortable' id='r2' />
        <Label htmlFor='r2'>Comfortable</Label>
      </div>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem value='compact' id='r3' />
        <Label htmlFor='r3'>Compact</Label>
      </div>
    </RadioGroup>
  ),
};
