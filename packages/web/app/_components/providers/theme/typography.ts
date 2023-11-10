import { MantineTheme, rem } from '@mantine/core';

import { Inter, Space_Mono } from 'next/font/google';

const baseFont = Inter({ subsets: ['latin'] });
export const secondaryFont = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const fontFamily = {
  primary: baseFont.style.fontFamily,
  secondary: secondaryFont.style.fontFamily,
};
export type FontFamilyVariant = keyof typeof fontFamily;

const baseFontSize = 16;

const baseHeadingFontWeight = '500';

type TypographyProps = Pick<
  MantineTheme,
  'fontFamily' | 'fontSizes' | 'lineHeights' | 'headings'
>;

export const typography: TypographyProps = {
  fontFamily: fontFamily.primary,
  fontSizes: {
    xs: rem(12),
    sm: rem(14),
    md: rem(baseFontSize),
    lg: rem(18),
    xl: rem(18),
  },
  lineHeights: {
    xs: rem(20),
    sm: rem(20),
    md: rem(24),
    lg: rem(28),
    xl: rem(28),
  },
  headings: {
    fontFamily: fontFamily.primary,
    fontWeight: baseHeadingFontWeight,
    sizes: {
      h1: {
        fontSize: rem(40),
        lineHeight: rem(48),
      },
      h2: {
        fontSize: rem(36),
        lineHeight: rem(44),
      },
      h3: {
        fontSize: rem(32),
        lineHeight: rem(40),
      },
      h4: {
        fontSize: rem(28),
        lineHeight: rem(36),
      },
      h5: {
        fontSize: rem(24),
        lineHeight: rem(32),
      },
      h6: {
        fontSize: rem(20),
        lineHeight: rem(28),
      },
    },
  },
};
