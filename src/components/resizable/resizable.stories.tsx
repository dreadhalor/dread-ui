/* eslint-disable @typescript-eslint/no-unused-vars */

import { Meta, StoryObj } from '@storybook/react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from './resizable';

const meta: Meta = {
  title: 'Components/Resizable',
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (_) => (
    <ResizablePanelGroup
      direction='horizontal'
      className='w-full rounded-lg border'
    >
      <ResizablePanel defaultSize={50}>
        <div className='flex h-[200px] items-center justify-center p-6'>
          One
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction='vertical'>
          <ResizablePanel defaultSize={25}>
            <div className='flex h-full items-center justify-center p-6'>
              Two
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={75}>
            <div className='flex h-full items-center justify-center p-6'>
              Three
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const Vertical: Story = {
  render: (_) => (
    <ResizablePanelGroup
      direction='vertical'
      className='min-h-[200px] w-full rounded-lg border'
    >
      <ResizablePanel defaultSize={25}>
        <div className='flex h-full items-center justify-center p-6'>
          Header
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={75}>
        <div className='flex h-full items-center justify-center p-6'>
          Content
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const Handle: Story = {
  render: (_) => (
    <ResizablePanelGroup
      direction='horizontal'
      className='min-h-[200px] w-full rounded-lg border'
    >
      <ResizablePanel defaultSize={25}>
        <div className='flex h-full items-center justify-center p-6'>
          Sidebar
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        <div className='flex h-full items-center justify-center p-6'>
          Content
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};
