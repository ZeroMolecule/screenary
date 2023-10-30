'use client';

import { FC, ReactNode } from 'react';
import '@mantine/core/styles.css';
import { MantineProvider, createTheme } from '@mantine/core';
import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';

type Props = {
  children: ReactNode;
};

const theme = createTheme({
  ...colors,
  ...typography,
  spacing,
});

export const ThemeProvider: FC<Props> = ({ children }) => {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      {children}
    </MantineProvider>
  );
};
