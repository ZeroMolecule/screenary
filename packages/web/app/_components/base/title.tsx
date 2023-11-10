'use client';

import { FC } from 'react';
import {
  MantineStyleProps,
  Title as MantineTitle,
  TitleProps as MantineTitleProps,
} from '@mantine/core';
import { FontFamilyVariant, fontFamily } from '../providers/theme/typography';

type Props = Omit<MantineTitleProps, 'ff'> & {
  ff?: FontFamilyVariant | MantineStyleProps['ff'];
};
export type TitleProps = Props;

export const Title: FC<Props> = ({
  ff = 'primary',
  children,
  ...restProps
}) => {
  const fFamily = Object.keys(fontFamily).includes(ff as string)
    ? fontFamily[ff as FontFamilyVariant]
    : ff;

  return (
    <MantineTitle ff={fFamily} {...restProps}>
      {children}
    </MantineTitle>
  );
};
