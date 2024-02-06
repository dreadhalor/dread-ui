import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './input';

const meta: Meta<typeof Input> = {
  component: Input,
  title: 'Components/Input',
};

export default meta;
type Story = StoryObj<typeof meta>;

/** A basic input. */
export const Demo: Story = {
  args: {
    type: 'text',
    placeholder: 'Placeholder text',
    disabled: false,
  },
};

/** A disabled input. */
export const Disabled: Story = {
  args: {
    type: 'text',
    placeholder: 'Placeholder text',
    disabled: true,
  },
};
