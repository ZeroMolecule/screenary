import {
  Button,
  MantineThemeComponents,
  Text,
  Title,
  Modal,
  TextInput,
  rem,
  Popover,
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
  }),
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
  Popover: Popover.extend({
    defaultProps: {
      radius: rem(24),
    },
    styles: {
      dropdown: {
        maxWidth: rem(350),
        backgroundColor: 'var(--mantine-glass-color)',
        boxShadow: '0px 40px 35px -20px rgba(0, 0, 0, 0.20)',
        backdropFilter: 'blur(6px)',
      },
    },
  }),
};
