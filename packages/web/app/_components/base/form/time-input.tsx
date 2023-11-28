import { FC } from 'react';
import { useController } from 'react-hook-form';
import { TimeInput, TimeInputProps } from '@mantine/dates';

type Props = TimeInputProps & {
  name: string;
};

export const FormTimeInput: FC<Props> = (props) => {
  const { field, restProps } = useFormTimeInput(props);

  return <TimeInput {...field} {...restProps} />;
};

function useFormTimeInput({ name, ...restProps }: Props) {
  const { field } = useController({ name });

  return { field, restProps };
}
