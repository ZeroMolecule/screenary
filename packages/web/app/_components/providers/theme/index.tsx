'use client';

import { FC, ReactNode } from 'react';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@/styles/index.css';
import { MantineProvider, createTheme } from '@mantine/core';
import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { components } from './components';
import { Notifications } from '@mantine/notifications';

type Props = {
  children: ReactNode;
};

const theme = createTheme({
  ...colors,
  ...typography,
  spacing,
  components,
});

export const ThemeProvider: FC<Props> = ({ children }) => {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <Notifications position="top-right" />
      {children}
    </MantineProvider>
  );
};
