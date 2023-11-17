import {
  Button,
  MantineThemeComponents,
  Text,
  Title,
  Modal,
  TextInput,
  rem,
  Popover,
  Menu,
  Tabs,
} from '@mantine/core';
import tabStyles from '@/styles/base/tabs.module.scss';

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
      overlay: {
        margin: 'var(--mantine-spacing-xl)',
        backgroundColor: 'var(--mantine-glass-color)',
        borderRadius: 'var(--mantine-radius-xl)',
        boxShadow: '0px 40px 35px -20px rgba(0, 0, 0, 0.20)',
        backdropFilter: 'blur(30px)',
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
  Menu: Menu.extend({
    defaultProps: {
      radius: 'md',
    },
    styles: {
      dropdown: {
        backgroundColor: 'var(--mantine-color-neutral-9)',
        border: '1px solid var(--mantine-color-neutral-7)',
        boxShadow:
          '0px 1px 2px -1px rgba(16, 24, 40, 0.10), 0px 1px 3px 0px rgba(16, 24,40, 0.10)',
      },
      itemLabel: {
        display: 'flex',
        alignItems: 'center',
        color: 'var(--mantine-color-white)',
      },
    },
  }),
  Tabs: Tabs.extend({
    classNames: {
      root: tabStyles.root,
      list: tabStyles.list,
      tab: tabStyles.tab,
      tabLabel: tabStyles.tabLabel,
    },
  }),
};
