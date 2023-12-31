import {
  Button,
  MantineThemeComponents,
  Text,
  Title,
  Modal,
  TextInput,
  rem,
  Menu,
  Textarea,
  Tabs,
  Checkbox,
  Popover,
  Indicator,
} from '@mantine/core';
import tabStyles from '@/styles/base/tabs.module.scss';
import { IconCircleFilled } from '@tabler/icons-react';

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
  Textarea: Textarea.extend({
    styles: {
      root: {
        width: '100%',
        height: '100%',
        position: 'absolute',
      },
      wrapper: {
        height: '100%',
      },
      input: {
        height: '100%',
        padding: 'var(--mantine-spacing-md)',
        fontSize: 'var(--mantine-font-size-md)',
        color: 'var(--mantine-color-primary-9)',
        backgroundColor: 'transparent',
        border: 0,
      },
    },
  }),
  Checkbox: Checkbox.extend({
    defaultProps: {
      icon: IconCircleFilled,
    },
    styles: {
      input: {
        backgroundColor: 'transparent',
        borderRadius: '100%',
        borderColor: 'var(--mantine-color-primary-8)',
      },
      icon: {
        color: 'var(--mantine-color-primary-8)',
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
  Popover: Popover.extend({
    defaultProps: {
      zIndex: 1,
    },
  }),
  Indicator: Indicator.extend({
    styles: {
      indicator: {
        padding: 0,
      },
    },
  }),
};
