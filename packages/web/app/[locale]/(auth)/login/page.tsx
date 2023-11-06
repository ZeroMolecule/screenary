import Image from 'next/image';
import { Card, Stack } from '@mantine/core';
import { SocialButton } from '@/app/_components/auth/social-button';
import { useTranslations } from 'next-intl';
import logoWhite from '@/public/images/logo-white.png';
import { AuthPage } from '@/app/_components/protectors/auth-page';

export default function LoginPage() {
  const t = useTranslations('auth');

  return (
    <AuthPage>
      <Stack align="center" my="auto">
        <Image
          src={logoWhite}
          width={208}
          height={64}
          alt={t('logoAlt')}
          priority
        />
        <Card p="xl" bg="white" radius="lg">
          <Stack>
            <SocialButton provider="apple" />
            <SocialButton provider="google" />
            <SocialButton provider="facebook" />
          </Stack>
        </Card>
      </Stack>
    </AuthPage>
  );
}
