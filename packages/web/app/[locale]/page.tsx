import { useTranslations } from 'next-intl';
import { Text } from '@mantine/core';
import { Title } from '../_components/base/title';

export default function HomePage() {
  const t = useTranslations('metadata');

  return (
    <div>
      <Title size="hDisplayLarge">{t('title')}</Title>
      <Text size="xs">{t('description')}</Text>
    </div>
  );
}
