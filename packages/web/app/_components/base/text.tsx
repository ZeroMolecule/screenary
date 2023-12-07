'use client';

import { FC, ReactNode } from 'react';
import {
  MantineStyleProps,
  Text as MantineText,
  TextProps as MantineTextProps,
} from '@mantine/core';
import { FontFamilyVariant, fontFamily } from '../providers/theme/typography';

type Props = Omit<MantineTextProps, 'ff'> & {
  ff?: FontFamilyVariant | MantineStyleProps['ff'];
  onClick?: () => void;
  children: ReactNode;
};
export type TextProps = Props;

export const Text: FC<Props> = ({
  ff = 'primary',
  onClick,
  children,
  ...restProps
}) => {
  const fFamily = Object.keys(fontFamily).includes(ff as string)
    ? fontFamily[ff as FontFamilyVariant]
    : ff;

  return (
    <MantineText ff={fFamily} onClick={onClick} {...restProps}>
      {children}
    </MantineText>
  );
};
