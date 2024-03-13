import type { Meta, StoryObj } from '@storybook/react';

import { UserMenu } from './user-menu';
import { DreadUiProvider } from '@dread-ui/index';

const meta: Meta<typeof UserMenu> = {
  component: UserMenu,
  title: 'Auth/User Menu',
  decorators: [
    (Story) => (
      <DreadUiProvider>
        <Story />
      </DreadUiProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof UserMenu>;

export const Demo: Story = {};
