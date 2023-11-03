import Image from 'next/image';
import { Stack } from '@mantine/core';
import { SocialButton } from '@/app/_components/auth/social-button';
import { useTranslations } from 'next-intl';
import logoWhite from '@/public/images/logo-white.svg';

export default function LoginPage() {
  const t = useTranslations('auth');

  return (
    <Stack align="center" my="auto">
      <Image src={logoWhite} alt={t('logoAlt')} priority />
      <Stack className="login-socials-block">
        <SocialButton provider="apple" />
        <SocialButton provider="google" />
        <SocialButton provider="facebook" />
      </Stack>
    </Stack>
  );
}
