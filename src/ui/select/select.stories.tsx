import type { Meta, StoryObj } from '@storybook/react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './select';

const meta: Meta<typeof Select> = {
  component: Select,
  title: 'Components/Select',
};

export default meta;
type Story = StoryObj<typeof meta>;

/** A basic select. */
export const Demo: Story = {
  argTypes: {
    disabled: {
      description: 'Whether the select is disabled.',
      control: 'boolean',
    },
  },
  args: {
    disabled: false,
  },

  render: (args) => (
    <Select {...args}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Select a fruit' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='apple'>Apple</SelectItem>
        <SelectItem value='banana'>Banana</SelectItem>
        <SelectItem value='blueberry'>Blueberry</SelectItem>
        <SelectItem value='grapes'>Grapes</SelectItem>
        <SelectItem value='pineapple'>Pineapple</SelectItem>
      </SelectContent>
    </Select>
  ),
};

/** A select with grouped options. */
export const WithGroups: StoryObj = {
  render: () => (
    <Select>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Select a food' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value='apple'>Apple</SelectItem>
          <SelectItem value='banana'>Banana</SelectItem>
          <SelectItem value='blueberry'>Blueberry</SelectItem>
          <SelectItem value='grapes'>Grapes</SelectItem>
          <SelectItem value='pineapple'>Pineapple</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Vegetables</SelectLabel>
          <SelectItem value='broccoli'>Broccoli</SelectItem>
          <SelectItem value='carrot'>Carrot</SelectItem>
          <SelectItem value='lettuce'>Lettuce</SelectItem>
          <SelectItem value='potato'>Potato</SelectItem>
          <SelectItem value='tomato'>Tomato</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

/** A disabled select. */
export const Disabled: StoryObj = {
  render: () => (
    <Select disabled>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Select a fruit' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='apple'>Apple</SelectItem>
        <SelectItem value='banana'>Banana</SelectItem>
        <SelectItem value='blueberry'>Blueberry</SelectItem>
        <SelectItem value='grapes'>Grapes</SelectItem>
        <SelectItem value='pineapple'>Pineapple</SelectItem>
      </SelectContent>
    </Select>
  ),
};

/** A select with some disabled items. */
export const DisabledItems: StoryObj = {
  render: () => (
    <Select>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Select a fruit' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='apple' disabled>
          Apple
        </SelectItem>
        <SelectItem value='banana'>Banana</SelectItem>
        <SelectItem value='blueberry' disabled>
          Blueberry
        </SelectItem>
        <SelectItem value='grapes' disabled>
          Grapes
        </SelectItem>
        <SelectItem value='pineapple'>Pineapple</SelectItem>
      </SelectContent>
    </Select>
  ),
};
