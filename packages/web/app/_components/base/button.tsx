import { FC, MouseEventHandler, useRef, useState } from 'react';
import { ButtonProps, Button as MantineButton } from '@mantine/core';

type Props = ButtonProps & {
  onClick?: (
    e: Parameters<MouseEventHandler<HTMLButtonElement>>[0]
  ) => Promise<unknown> | unknown;
};

export const Button: FC<Props> = ({ onClick, children, ...props }) => {
  const elRef = useRef<HTMLButtonElement>(null);
  const [pending, setPending] = useState(false);

  const loading = typeof props.loading === 'boolean' ? props.loading : pending;

  const styles = {
    ...props.styles,
    ...(loading
      ? {
          leftIcon: {
            marginRight: 0,
          },
        }
      : {}),
  };

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    const res = onClick?.(e);
    if (res instanceof Promise) {
      setPending(true);
      res.finally(() => setPending(false));
    }
  };

  return (
    <MantineButton
      {...props}
      ref={elRef}
      onClick={onClick ? handleClick : undefined}
      loading={loading}
      styles={styles}
    >
      {!loading && children}
    </MantineButton>
  );
};
