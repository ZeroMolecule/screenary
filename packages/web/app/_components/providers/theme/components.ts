import { Button, MantineThemeComponents } from '@mantine/core';

export const components: MantineThemeComponents = {
  Button: Button.extend({
    styles: {
      inner: {
        gap: 'var(--mantine-spacing-md)',
      },
    },
  }),
};
