import { FC, ReactNode } from 'react';
import { Container } from './base/container';

type Props = {
  children: ReactNode;
};

export const Screensaver: FC<Props> = ({ children }) => {
  return <Container className="screensaver">{children}</Container>;
};
