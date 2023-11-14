import { FC } from 'react';
import {
  Container as MantineContainer,
  ContainerProps as MantineContainerProps,
} from '@mantine/core';
import classNames from 'classnames';
import styles from '@/styles/index.module.scss';

type Props = MantineContainerProps;

export const Container: FC<Props> = ({ children, className, ...restProps }) => {
  return (
    <MantineContainer
      {...restProps}
      className={classNames(styles.container, className)}
    >
      {children}
    </MantineContainer>
  );
};
