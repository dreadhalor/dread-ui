import type { Meta, StoryObj } from '@storybook/react';

import { Popover, PopoverContent, PopoverTrigger } from './popover';
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@dread-ui/index';

const meta: Meta<typeof Popover> = {
  component: Popover,
  title: 'Components/Popover',
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Demo: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger>Click me!</PopoverTrigger>
      <PopoverContent className='w-[340px]'>
        <div className='grid gap-4'>
          <div className='space-y-2'>
            <h4 className='font-medium leading-none'>Dimensions</h4>
            <p className='text-muted-foreground'>
              Set the dimensions for the layer.
            </p>
          </div>
          <div className='grid gap-2'>
            <div className='grid grid-cols-3 items-center gap-4'>
              <Label htmlFor='width'>Width</Label>
              <Input id='width' defaultValue='100%' className='col-span-2' />
            </div>
            <div className='grid grid-cols-3 items-center gap-4'>
              <Label htmlFor='maxWidth'>Max width</Label>
              <Select defaultValue='min-content'>
                <SelectTrigger id='maxWidth' className='col-span-2'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value='auto'>Auto</SelectItem>
                    <SelectItem value='min-content'>Min content</SelectItem>
                    <SelectItem value='max-content'>Max content</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className='grid grid-cols-3 items-center gap-4'>
              <Label htmlFor='height'>Height</Label>
              <Input id='height' defaultValue='25px' className='col-span-2' />
            </div>
            <div className='grid grid-cols-3 items-center gap-4'>
              <Label htmlFor='maxHeight'>Max height</Label>
              <Input
                id='maxHeight'
                defaultValue='none'
                className='col-span-2'
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const CustomTrigger: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline'>Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className='w-[340px]'>
        <div className='grid gap-4'>
          <div className='space-y-2'>
            <h4 className='font-medium leading-none'>Dimensions</h4>
            <p className='text-muted-foreground'>
              Set the dimensions for the layer.
            </p>
          </div>
          <div className='grid gap-2'>
            <div className='grid grid-cols-3 items-center gap-4'>
              <Label htmlFor='width'>Width</Label>
              <Input id='width' defaultValue='100%' className='col-span-2' />
            </div>
            <div className='grid grid-cols-3 items-center gap-4'>
              <Label htmlFor='maxWidth'>Max width</Label>
              <Select defaultValue='min-content'>
                <SelectTrigger id='maxWidth' className='col-span-2'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value='auto'>Auto</SelectItem>
                    <SelectItem value='min-content'>Min content</SelectItem>
                    <SelectItem value='max-content'>Max content</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className='grid grid-cols-3 items-center gap-4'>
              <Label htmlFor='height'>Height</Label>
              <Input id='height' defaultValue='25px' className='col-span-2' />
            </div>
            <div className='grid grid-cols-3 items-center gap-4'>
              <Label htmlFor='maxHeight'>Max height</Label>
              <Input
                id='maxHeight'
                defaultValue='none'
                className='col-span-2'
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
