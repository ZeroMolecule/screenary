import Image from 'next/image';
import { Stack } from '@mantine/core';
import { SocialButton } from '@/app/_components/auth/social-button';

export default function LoginPage() {
  return (
    <Stack align="center" my="auto">
      <Image
        src="/images/logo-white.svg"
        width={208}
        height={64}
        alt="Screenplay logo"
      />
      <Stack className="login-socials-block">
        <SocialButton provider="apple" />
        <SocialButton provider="google" />
        <SocialButton provider="facebook" />
      </Stack>
    </Stack>
  );
}
