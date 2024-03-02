import type { Meta, StoryObj } from '@storybook/react';

import { UserMenu } from './user-menu';
import { AuthProvider } from '@dread-ui/providers/auth-provider';
import { AchievementsProvider } from '@dread-ui/providers/achievements-provider';

const meta: Meta<typeof UserMenu> = {
  component: UserMenu,
  title: 'Firebase/User Menu',
  decorators: [
    (Story) => (
      <AuthProvider>
        <AchievementsProvider>
          <Story />
        </AchievementsProvider>
      </AuthProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof UserMenu>;

export const Demo: Story = {};
