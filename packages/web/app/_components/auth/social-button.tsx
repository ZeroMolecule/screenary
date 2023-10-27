'use client';

import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@mantine/core';
import { capitalize } from 'lodash';
import { AppleIcon } from '../icons/apple-icon';
import classnames from 'classnames';
import { FacebookIcon } from '../icons/facebook-icon';
import { GoogleIcon } from '../icons/google-icon';
import { useRouter } from 'next/navigation';
import { paths } from '@/navigation/paths';

type Provider = 'apple' | 'google' | 'facebook';

type Props = {
  provider: Provider;
};

export const SocialButton: FC<Props> = (props) => {
  const { provider, router, label, icon } = useSocialButton(props);

  return (
    <Button
      justify="flex-start"
      leftSection={icon}
      className={classnames('social-button', `social-button--${provider}`)}
      classNames={{ inner: 'social-button__inner' }}
      onClick={() => router.push(paths.home())}
    >
      {label}
    </Button>
  );
};

function useSocialButton({ provider }: Props) {
  const t = useTranslations('auth');
  const router = useRouter();

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

  return { provider, router, label, icon: generateIcon() };
}
