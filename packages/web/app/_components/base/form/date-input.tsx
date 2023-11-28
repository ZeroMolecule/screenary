import { FC } from 'react';
import { useController } from 'react-hook-form';
import { DateInput, DateInputProps } from '@mantine/dates';

type Props = DateInputProps & {
  name: string;
};

export const FormDateInput: FC<Props> = (props) => {
  const { field, restProps } = useFormDateInput(props);

  return <DateInput {...field} {...restProps} />;
};

function useFormDateInput({ name, ...restProps }: Props) {
  const { field } = useController({ name });

  return { field, restProps };
}
