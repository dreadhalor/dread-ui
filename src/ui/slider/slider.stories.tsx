import type { Meta, StoryObj } from '@storybook/react';

import { Slider } from './slider';

const meta: Meta<typeof Slider> = {
  component: Slider,
  title: 'Components/Slider',
  argTypes: {
    asChild: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

/** A basic slider. */
export const Default: Story = {
  argTypes: {
    disabled: {
      description: 'Whether the slider is disabled.',
      control: 'boolean',
    },
  },
  render: (args) => (
    <Slider
      className='w-[300px]'
      defaultValue={[20]}
      max={100}
      step={1}
      {...args}
    />
  ),
};

/** A disabled slider. */
export const Disabled: Story = {
  render: () => (
    <Slider
      className='w-[300px]'
      defaultValue={[50]}
      max={100}
      step={1}
      disabled
    />
  ),
};

/** A range slider, with knobs for min & max. */
export const RangeSlider: Story = {
  render: () => (
    <Slider className='w-[300px]' defaultValue={[20, 60]} max={100} step={1} />
  ),
};
