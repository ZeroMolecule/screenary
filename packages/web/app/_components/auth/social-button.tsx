'use client';

import { FC, ReactElement } from 'react';
import { useTranslations } from 'next-intl';
import { signIn } from 'next-auth/react';
import { Button, DefaultMantineColor, useMantineTheme } from '@mantine/core';
import { capitalize } from 'lodash';
import classnames from 'classnames';
import { AppleIcon } from '../icons/apple-icon';
import { FacebookIcon } from '../icons/facebook-icon';
import { GoogleIcon } from '../icons/google-icon';

type ButtonStyles = {
  icon: ReactElement;
  color: DefaultMantineColor;
  backgroundColor: DefaultMantineColor;
};

type Provider = 'apple' | 'google' | 'facebook';

type Props = {
  provider: Provider;
};

export const SocialButton: FC<Props> = (props) => {
  const { provider, label, buttonStyles } = useSocialButton(props);

  return (
    <Button
      justify="flex-start"
      c={buttonStyles.color}
      bg={buttonStyles.backgroundColor}
      fw={500}
      radius={6}
      leftSection={buttonStyles.icon}
      className={classnames({ 'social-button--google': provider === 'google' })}
      classNames={{ inner: 'social-button__inner' }}
      onClick={() => signIn(provider)}
    >
      {label}
    </Button>
  );
};

function useSocialButton({ provider }: Props) {
  const t = useTranslations('auth');
  const theme = useMantineTheme();

  const label = t.rich('socialAction', { provider: capitalize(provider) });

  const buttonStyles: ButtonStyles = (() => {
    switch (provider) {
      case 'apple':
        return {
          icon: <AppleIcon />,
          color: theme.white,
          backgroundColor: theme.black,
        };
      case 'google':
        return {
          icon: <GoogleIcon />,
          color: theme.other.googleIconColor,
          backgroundColor: theme.white,
        };
      case 'facebook':
        return {
          icon: <FacebookIcon />,
          color: theme.white,
          backgroundColor: theme.other.facebookIconBackgroundColor,
        };
    }
  })();

  return { provider, label, buttonStyles };
}
