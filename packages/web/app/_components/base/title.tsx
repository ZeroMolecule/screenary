'use client';

import { FC } from 'react';
import {
  Title as MantineTitle,
  TitleProps as MantineTitleProps,
} from '@mantine/core';
import { displayHeading } from '../providers/theme/typography';

export type TitleVariant =
  | 'hDisplayLarge'
  | 'hDisplaySmall'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6';

type Props = Omit<MantineTitleProps, 'size'> & {
  size: TitleVariant;
};

export const Title: FC<Props> = ({ size, ...restProps }) => {
  if (size !== 'hDisplayLarge' && size !== 'hDisplaySmall') {
    return <MantineTitle {...restProps} size={size} />;
  }
  return (
    <MantineTitle
      {...restProps}
      order={1}
      fz={displayHeading[size].fontSize}
      lh={displayHeading[size].lineHeight}
    />
  );
};
