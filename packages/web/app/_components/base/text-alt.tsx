'use client';

import { FC, ReactNode } from 'react';
import { Text, TextProps } from '@mantine/core';
import { secondaryFont } from '../providers/theme/typography';

type Props = Omit<TextProps, 'ff'> & {
  children: ReactNode;
};

export const TextAlt: FC<Props> = ({ children, ...restProps }) => {
  return (
    <Text ff={secondaryFont.style.fontFamily} {...restProps}>
      {children}
    </Text>
  );
};
