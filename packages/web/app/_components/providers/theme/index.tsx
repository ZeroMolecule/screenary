'use client';

import { FC, ReactNode } from 'react';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { MantineProvider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { components } from './components';
import { other, resolver } from './other';

type Props = {
  children: ReactNode;
};

const theme = createTheme({
  ...colors,
  ...typography,
  spacing,
  components,
  other,
});

export const ThemeProvider: FC<Props> = ({ children }) => {
  return (
    <MantineProvider
      theme={theme}
      cssVariablesResolver={resolver}
      defaultColorScheme="light"
    >
      <Notifications position="top-right" containerWidth={300} limit={3} />
      {children}
    </MantineProvider>
  );
};
