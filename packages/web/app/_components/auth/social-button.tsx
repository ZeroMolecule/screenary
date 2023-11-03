'use client';

import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { signIn } from 'next-auth/react';
import { Button } from '@mantine/core';
import { capitalize } from 'lodash';
import classnames from 'classnames';
import { AppleIcon } from '../icons/apple-icon';
import { FacebookIcon } from '../icons/facebook-icon';
import { GoogleIcon } from '../icons/google-icon';

type Provider = 'apple' | 'google' | 'facebook';

type Props = {
  provider: Provider;
};

export const SocialButton: FC<Props> = (props) => {
  const { provider, label, icon } = useSocialButton(props);

  return (
    <Button
      justify="flex-start"
      fw={500}
      radius={6}
      leftSection={icon}
      className={classnames('social-button', `social-button--${provider}`)}
      classNames={{ inner: 'social-button__inner' }}
      onClick={() => signIn(provider)}
    >
      {label}
    </Button>
  );
};

function useSocialButton({ provider }: Props) {
  const t = useTranslations('auth');

  const label = t.rich('socialAction', { provider: capitalize(provider) });

  const generateIcon = () => {
    switch (provider) {
      case 'apple':
        return <AppleIcon />;
      case 'google':
        return <GoogleIcon />;
      case 'facebook':
        return <FacebookIcon />;
    }
  };

  return { provider, label, icon: generateIcon() };
}
