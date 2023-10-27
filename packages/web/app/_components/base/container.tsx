import { FC } from 'react';
import {
  Container as MantineContainer,
  ContainerProps as MantineContainerProps,
} from '@mantine/core';
import classnames from 'classnames';

type Props = MantineContainerProps;

export const Container: FC<Props> = ({ children, className, ...restProps }) => {
  return (
    <MantineContainer
      {...restProps}
      className={classnames('container', className)}
    >
      {children}
    </MantineContainer>
  );
};
