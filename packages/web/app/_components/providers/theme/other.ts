import { CSSVariablesResolver, MantineThemeOther, rgba } from '@mantine/core';

export const other: MantineThemeOther = {
  googleIconColor: '#020203',
  googleIconBorderColor: '#C7C6C6',
  facebookIconBackgroundColor: '#3975EA',
  glassColor: rgba('#17140B', 0.9),
};

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    '--mantine-google-icon-color': theme.other.googleIconColor,
    '--mantine-google-icon-border-color': theme.other.googleIconBorderColor,
    '--mantine-facebook-icon-background-color':
      theme.other.facebookIconBackgroundColor,
    '--mantine-glass-color': theme.other.glassColor,
  },
  dark: {},
  light: {},
});
