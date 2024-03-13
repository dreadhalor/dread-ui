import type { Meta, StoryObj } from '@storybook/react';

import { AchievementsGrid } from './achievements-grid';
import { DreadUiProvider } from '@dread-ui/index';

const meta: Meta<typeof AchievementsGrid> = {
  component: AchievementsGrid,
  title: 'Auth/Achievements Grid',
  parameters: {
    backgrounds: {
      default: 'fallcrate-dark',
      values: [
        {
          name: 'fallcrate-dark',
          value: 'rgb(37,44,59)',
        },
      ],
    },
  },
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

export const Demo: Story = {
  render: () => (
    <div className='mx-auto max-h-[500px] max-w-[500px]'>
      <AchievementsGrid />
    </div>
  ),
};
