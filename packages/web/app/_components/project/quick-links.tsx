import { FC, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Box, Button, Card, MantineStyleProps, Stack } from '@mantine/core';
import { QuickLinksHeader } from './quick-links-header';
import { ExpandedPopover } from './expanded-popover';
import { addQuickLinkMutation } from '@/domain/mutations/add-quick-link-mutation';
import { QuickLinkFormValues } from './quick-link-popover-menu';
import { useNotificationSuccess } from '@/hooks/use-notification-success';
import { Data } from '@/domain/remote/response/data';
import { QuickLink } from '@prisma/client';
import { quickLinksQuery } from '@/domain/queries/quick-links-query';
import { IconBrandMedium, IconDots } from '@tabler/icons-react';
import classNames from 'classnames';
import flexStyles from '@/styles/utils/flex.module.scss';
import overflowStyles from '@/styles/utils/overflow.module.scss';
import styles from '@/styles/components/quick-links.module.scss';

type Props = {
  projectId: string;
};

export const QuickLinks: FC<Props> = (props) => {
  const {
    t,
    quickLinks,
    popoverOpen,
    setPopoverOpen,
    expanded,
    setExpanded,
    handleCreate,
    position,
  } = useQuickLinks(props);

  const renderQuickLink = ({ id, url }: QuickLink) => (
    <Button
      key={id}
      component="a"
      href={url}
      target="_blank"
      variant="transparent"
      w="100%"
      c="neutral.9"
      bg="neutral.0"
      fw={400}
      leftSection={<IconBrandMedium />}
      rightSection={<IconDots color="var(--mantine-color-neutral-5)" />}
      className={styles.quickLink}
      classNames={{ label: flexStyles['flex-1'] }}
    >
      {url}
    </Button>
  );

  return (
    <Box h="100%" className={overflowStyles['overflow-auto']}>
      <Card
        h="100%"
        radius={24}
        pos={position}
        className={styles.quickLinksCard}
      >
        <Stack h="100%">
          <QuickLinksHeader
            popoverOpen={popoverOpen}
            setPopoverOpen={setPopoverOpen}
            onCreate={handleCreate}
          />
          <Stack
            className={classNames(
              flexStyles['flex-1'],
              overflowStyles['overflow-auto']
            )}
          >
            {quickLinks.map(renderQuickLink)}
          </Stack>
          <ExpandedPopover
            title={t('title')}
            expanded={expanded}
            setExpanded={setExpanded}
          >
            this is a popover
          </ExpandedPopover>
        </Stack>
      </Card>
    </Box>
  );
};

function useQuickLinks({ projectId }: Props) {
  const t = useTranslations('project.quickLinks');
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const onCreated = useNotificationSuccess('created');

  const { data: quickLinks, refetch } = useQuery<Data<QuickLink[]>>({
    queryKey: quickLinksQuery.key(projectId),
  });
  const { mutateAsync: createQuickLink } = useMutation({
    mutationFn: addQuickLinkMutation.fnc,
    onSuccess: async () => {
      await refetch();
      onCreated();
      setPopoverOpen(false);
    },
  });

  const handleCreate = async (values: QuickLinkFormValues) => {
    await createQuickLink({ ...values, projectId });
  };

  const positionRef = useRef<MantineStyleProps['pos']>('relative');
  const updatedPosition = useMemo(() => {
    if (expanded) {
      positionRef.current = 'unset';
    } else {
      setTimeout(() => {
        positionRef.current = 'relative';
      }, 250);
    }
    return positionRef.current;
  }, [expanded]);

  return {
    t,
    quickLinks: quickLinks?.data ?? [],
    popoverOpen,
    setPopoverOpen,
    expanded,
    setExpanded,
    handleCreate,
    position: updatedPosition,
  };
}
