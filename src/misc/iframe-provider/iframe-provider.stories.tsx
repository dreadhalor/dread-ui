import type { Meta, StoryObj } from '@storybook/react';
import { IframeParentDemoComponent } from './iframe-provider-parent';
import { IframeChildDemoComponent } from './iframe-provider-child';
import { IframeProvider } from '@dread-ui/providers/iframe-provider';
import { IframeChild } from './iframe-child';

const meta: Meta = {
  title: 'Misc/IframeProvider',
};

export default meta;
type Story = StoryObj;

export const Demo: Story = {
  render: (_) => (
    <IframeProvider>
      <IframeParentDemoComponent>
        <IframeChild
          className='h-full w-full'
          src='/iframe.html?args=&id=misc-iframeprovider--child&viewMode=story'
        />
      </IframeParentDemoComponent>
    </IframeProvider>
  ),
};

export const Child: Story = {
  render: (_) => (
    <IframeProvider>
      <IframeChildDemoComponent />
    </IframeProvider>
  ),
};
