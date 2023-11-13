import { FC, useEffect } from 'react';
import {
  Modal as MantineModal,
  ModalProps as MantineModalProps,
} from '@mantine/core';

type Props = MantineModalProps & {
  afterClose?: () => void;
};

export const Modal: FC<Props> = (props) => {
  const { children, restProps } = useModal(props);

  return (
    <MantineModal centered withCloseButton={false} {...restProps}>
      {children}
    </MantineModal>
  );
};

function useModal({ afterClose, children, ...restProps }: Props) {
  useEffect(() => {
    if (afterClose && !restProps.opened) {
      const timeout = setTimeout(afterClose, 200);
      return () => clearTimeout(timeout);
    }
  }, [afterClose, restProps.opened]);

  return { children, restProps };
}
