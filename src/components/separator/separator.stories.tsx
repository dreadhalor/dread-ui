import type { Meta, StoryObj } from '@storybook/react';

import { Separator } from './separator';

const meta: Meta<typeof Separator> = {
  component: Separator,
  title: 'Components/Separator',
  argTypes: {
    asChild: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Default: Story = {
  render: (args) => (
    <div className='w-max'>
      <div className='space-y-1'>
        <p className='font-medium leading-5'>Radix Primitives</p>
        <p className='text-muted-foreground'>
          An open-source UI component library.
        </p>
      </div>
      <Separator className='my-4' {...args} />
      <div className='flex h-5 items-center space-x-4'>
        <p>Blog</p>
        <Separator orientation='vertical' {...args} />
        <p>Docs</p>
        <Separator orientation='vertical' {...args} />
        <p>Source</p>
      </div>
    </div>
  ),
};

export const Horizontal: Story = {
  render: (args) => (
    <div className='flex w-max flex-col items-center space-y-4'>
      <p>Item 1</p>
      <Separator {...args} />
      <p>Item 2</p>
      <Separator {...args} />
      <p>Item 3</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: (args) => (
    <div className='flex h-5 flex-row items-center space-x-4'>
      <p>Item 1</p>
      <Separator orientation='vertical' {...args} />
      <p>Item 2</p>
      <Separator orientation='vertical' {...args} />
      <p>Item 3</p>
    </div>
  ),
};
