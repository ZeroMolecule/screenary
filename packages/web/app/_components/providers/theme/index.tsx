import { FC, ReactNode } from 'react';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

type Props = {
  children: ReactNode;
};

export const ThemeProvider: FC<Props> = ({ children }) => {
  return <MantineProvider>{children}</MantineProvider>;
};
