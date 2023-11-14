import { FC, useEffect, useRef } from 'react';
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
  const afterCloseRef = useRef(afterClose);
  afterCloseRef.current = afterClose;

  useEffect(() => {
    if (afterCloseRef.current && !restProps.opened) {
      const timeout = setTimeout(afterCloseRef.current, 200);
      return () => clearTimeout(timeout);
    }
  }, [restProps.opened]);

  return { children, restProps };
}
