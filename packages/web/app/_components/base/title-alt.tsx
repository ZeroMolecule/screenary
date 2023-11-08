'use client';

import { FC } from 'react';
import { Title, TitleProps } from '@mantine/core';
import { secondaryFont } from '../providers/theme/typography';

type Props = Omit<TitleProps, 'ff'>;

export const TitleAlt: FC<Props> = ({ children, ...restProps }) => {
  return (
    <Title ff={secondaryFont.style.fontFamily} {...restProps}>
      {children}
    </Title>
  );
};
