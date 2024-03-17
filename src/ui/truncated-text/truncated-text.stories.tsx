import type { Meta, StoryObj } from '@storybook/react';
import { TruncatedText } from './truncated-text';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@dread-ui/index';
import { useState } from 'react';
import { cn } from '@repo/utils';

const meta: Meta<typeof TruncatedText> = {
  component: TruncatedText,
  title: 'Components/Truncated Text',
};

export default meta;

type Story = StoryObj<typeof TruncatedText>;

export const Default: Story = {
  render: () => (
    <div className='flex w-[300px] flex-col gap-2 rounded-sm border-2 p-2'>
      <TruncatedText>This is a short text.</TruncatedText>
      <TruncatedText>
        This is a longer text that will be truncated.
      </TruncatedText>
    </div>
  ),
};

const ResizableStory = () => {
  const [isFirstTruncated, setIsFirstTruncated] = useState(false);
  const [isSecondTruncated, setIsSecondTruncated] = useState(false);

  return (
    <ResizablePanelGroup
      direction='horizontal'
      className='min-h-[200px] w-full rounded-lg border'
    >
      <ResizablePanel defaultSize={25}>
        <div
          className={cn(
            'flex h-full items-center justify-center p-6',
            isFirstTruncated && 'border-destructive rounded-l-lg border',
          )}
        >
          <TruncatedText onTruncation={setIsFirstTruncated}>
            This is a longer text that may be truncated.
          </TruncatedText>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        <div
          className={cn(
            'flex h-full items-center justify-center p-6',
            isSecondTruncated && 'border-destructive rounded-r-lg border',
          )}
        >
          <TruncatedText onTruncation={setIsSecondTruncated}>
            This is a longer text that may be truncated.
          </TruncatedText>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export const TruncationDetection: Story = {
  render: ResizableStory,
};
