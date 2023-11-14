import { FC, ReactNode } from 'react';
import { Container } from './base/container';
import styles from '@/styles/components/screensaver.module.scss';

type Props = {
  children: ReactNode;
};

export const Screensaver: FC<Props> = ({ children }) => {
  return <Container className={styles.screensaver}>{children}</Container>;
};
