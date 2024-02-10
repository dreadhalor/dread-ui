import type { Meta, StoryObj } from '@storybook/react';

import { Textarea } from './textarea';
import { Label } from '@dread-ui/index';

const meta: Meta<typeof Textarea> = {
  component: Textarea,
  title: 'Components/Textarea',
};

export default meta;
type Story = StoryObj<typeof Textarea>;

/** A basic textarea. */
export const Default: Story = {
  args: {
    placeholder: "Tell me about your day... or don't, I'm not your therapist",
  },
  render: (args) => (
    <div className='flex flex-col-reverse gap-2'>
      <Textarea id='vent' {...args} />
      <Label htmlFor='vent'>Additional comments</Label>
    </div>
  ),
};

/** A disabled textarea. */
export const Disabled: Story = {
  args: {
    placeholder: "Tell me about your day... or don't, I'm not your therapist",
  },
  render: (args) => (
    <div className='flex flex-col-reverse gap-2'>
      <Textarea id='vent-disabled' disabled {...args} />
      <Label htmlFor='vent-disabled'>Additional comments</Label>
    </div>
  ),
};
