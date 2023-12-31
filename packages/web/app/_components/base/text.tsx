'use client';

import { FC, ReactNode } from 'react';
import {
  ElementProps,
  MantineStyleProps,
  Text as MantineText,
  TextProps as MantineTextProps,
} from '@mantine/core';
import { FontFamilyVariant, fontFamily } from '../providers/theme/typography';

type ExtendedTextProps = MantineTextProps &
  ElementProps<'p', keyof MantineTextProps>;
type Props = Omit<ExtendedTextProps, 'ff'> & {
  ff?: FontFamilyVariant | MantineStyleProps['ff'];
  children: ReactNode;
};
export type TextProps = Props;

export const Text: FC<Props> = ({ ff = 'primary', children, ...restProps }) => {
  const fFamily = Object.keys(fontFamily).includes(ff as string)
    ? fontFamily[ff as FontFamilyVariant]
    : ff;

  return (
    <MantineText ff={fFamily} {...restProps}>
      {children}
    </MantineText>
  );
};
