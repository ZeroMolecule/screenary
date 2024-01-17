import { FC, useEffect, useRef } from 'react';
import {
  Popover as MantinePopover,
  PopoverProps as MantinePopoverProps,
} from '@mantine/core';

type Props = MantinePopoverProps & {
  afterClose?: () => void;
};

export const Popover: FC<Props> = (props) => {
  const { children, restProps } = usePopover(props);

  return <MantinePopover {...restProps}>{children}</MantinePopover>;
};

function usePopover({ afterClose, children, ...restProps }: Props) {
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
