import type { Meta, StoryObj } from '@storybook/react';

import { AchievementsGrid } from './achievements-grid';
import { DreadUiProvider } from '@dread-ui/index';

const meta: Meta<typeof AchievementsGrid> = {
  component: AchievementsGrid,
  title: 'Firebase/Achievements Grid',
  decorators: [
    (Story) => (
      <DreadUiProvider>
        <Story />
      </DreadUiProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AchievementsGrid>;

export const Demo: Story = {};
