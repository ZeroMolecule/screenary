import { FC, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useMutation } from '@tanstack/react-query';
import { Box, Card, MantineStyleProps, Stack } from '@mantine/core';
import { QuickLinksHeader } from './quick-links-header';
import { ExpandedPopover } from './expanded-popover';
import { addQuickLinkMutation } from '@/domain/mutations/add-quick-link-mutation';
import { QuickLinkFormValues } from './quick-link-popover-menu';
import { useNotificationSuccess } from '@/hooks/use-notification-success';
import styles from '@/styles/components/quick-links.module.scss';

type Props = {
  projectId: string;
};

export const QuickLinks: FC<Props> = (props) => {
  const {
    t,
    popoverOpen,
    setPopoverOpen,
    expanded,
    setExpanded,
    handleCreate,
    position,
  } = useQuickLinks(props);

  return (
    <Box h="100%">
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
          <div style={{ flex: 1 }}>BODY</div>
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

  const { mutateAsync: createQuickLink } = useMutation({
    mutationFn: addQuickLinkMutation.fnc,
    onSuccess: async () => {
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
    popoverOpen,
    setPopoverOpen,
    expanded,
    setExpanded,
    handleCreate,
    position: updatedPosition,
  };
}
