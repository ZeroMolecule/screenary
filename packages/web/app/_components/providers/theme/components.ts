import {
  Button,
  MantineThemeComponents, Text, Title,
  Modal,
  TextInput,
  rem,
} from '@mantine/core';

export const components: MantineThemeComponents = {
  TextInput: TextInput.extend({
    styles: {
      label: {
        marginBottom: rem(4),
      },
      input: {
        paddingBlock: rem(10),
        paddingInline: rem(12),
        borderRadius: rem(6),
      },
    },
  }),
  Button: Button.extend({
    defaultProps: {
      radius: rem(6),
      size: 'md',
    },
    styles: {
      inner: {
        gap: 'var(--mantine-spacing-md)',
      },
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
  Modal: Modal.extend({
    styles: {
      content: {
        borderRadius: rem(24),
      },
      body: {
        padding: 'var(--mantine-spacing-xl)',
      },
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
