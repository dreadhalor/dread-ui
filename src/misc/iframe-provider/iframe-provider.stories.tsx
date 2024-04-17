import type { Meta, StoryObj } from '@storybook/react';
import { IframeParentDemoComponent } from './iframe-provider-parent';
import { IframeChildDemoComponent } from './iframe-provider-child';
import { IframeProvider } from '@dread-ui/providers/iframe-provider';
import { IframeChild } from './iframe-child';

/** A React provider that can allow bidirectional communication across an iframe. Must wrap both the parent app outside the iframe & the child app inside the iframe. */
const meta: Meta = {
  title: 'Misc/IframeProvider',
};

export default meta;
type Story = StoryObj;

export const Demo: Story = {
  render: () => (
    <IframeProvider>
      <IframeParentDemoComponent>
        <IframeChild
          className='w-full'
          src={`${
            import.meta.env.PROD ? '/dread-ui' : ''
          }/iframe.html?args=&id=misc-iframeprovider--child&viewMode=story`}
        />
      </IframeParentDemoComponent>
    </IframeProvider>
  ),
};

/** this story isn't useful by itself, but we need this story to load it into an iframe */
export const Child: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      disable: true,
    },
  },
  render: () => (
    <IframeProvider>
      <IframeChildDemoComponent />
    </IframeProvider>
  ),
};
