import { Button, MantineThemeComponents, Text, Title } from '@mantine/core';

export const components: MantineThemeComponents = {
  Text: Text.extend({
    defaultProps: {
      c: 'neutral.9',
    },
  }),
  Title: Title.extend({
    defaultProps: {
      c: 'neutral.9',
    },
  }),
  // TODO: handle button
  // Button: Button.extend({
  //   styles: {
  //     inner: {
  //       gap: 'var(--mantine-spacing-md)',
  //     },
  //   },
  // }),
};
