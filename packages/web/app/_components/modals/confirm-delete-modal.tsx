import { FC } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Group, Stack, Button as MantineButton } from '@mantine/core';
import trashIcon from '@/public/images/trash-icon.svg';
import { Title } from '../base/title';
import { Text } from '../base/text';
import { Button } from '../base/button';
import { Modal } from './modal';

type Props = {
  opened: boolean;
  onClose: () => void;
  onSubmit: () => Promise<void>;
  title?: string;
  description?: string;
};

export const ConfirmDeleteModal: FC<Props> = (props) => {
  const { t, opened, onClose, onSubmit, title, description } =
    useConfirmDeleteModal(props);

  return (
    <Modal opened={opened} onClose={onClose}>
      <Stack align="center" gap="lg">
        <Image
          src={trashIcon}
          width={130}
          height={130}
          alt={t('deleteIconAlt')}
        />
        <Title size="h3" ta="center">
          {title}
        </Title>
        <Text size="lg" c="neutral.5" ta="center" maw={275}>
          {description}
        </Text>
        <Group w="75%" gap="xs" grow>
          <MantineButton bg="neutral.7" fw={500} onClick={onClose}>
            {t('cancelAction')}
          </MantineButton>
          <Button bg="primary.7" fw={500} onClick={onSubmit}>
            {t('deleteAction')}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

function useConfirmDeleteModal({
  opened,
  onClose,
  onSubmit,
  title,
  description,
}: Props) {
  const t = useTranslations('modal.delete');

  return {
    t,
    opened,
    onClose,
    onSubmit,
    title: title ?? t('title'),
    description: description ?? t('description'),
  };
}
