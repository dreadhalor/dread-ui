import type { Preview } from '@storybook/react';
import '../src/index.scss';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Examples', 'Components', 'Firebase', 'Auth', 'Misc'],
      },
    },
  },
};

export default preview;
