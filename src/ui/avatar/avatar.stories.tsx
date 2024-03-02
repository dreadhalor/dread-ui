import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  title: 'Components/Avatar',
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Demo: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src='https://github.com/dreadhalor.png' alt='Dreadhalor' />
      <AvatarFallback>SH</AvatarFallback>
    </Avatar>
  ),
};
export const Fallback: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>SH</AvatarFallback>
    </Avatar>
  ),
};
