'use client';

import { ReactNode, forwardRef } from 'react';
import { LinkProps as NextLinkProps } from 'next/link';
import { Anchor, AnchorProps, ElementProps } from '@mantine/core';
import { Link as NextIntlLink } from '@/navigation/index';

type ExtendedAnchorProps = AnchorProps & ElementProps<'a', keyof AnchorProps>;
type Props = ExtendedAnchorProps &
  NextLinkProps & {
    children: ReactNode;
    locale?: string;
  };

export const Link = forwardRef<HTMLAnchorElement, Props>(function Link(
  props,
  ref
) {
  return (
    <Anchor component={NextIntlLink} underline="never" {...props} ref={ref} />
  );
});
