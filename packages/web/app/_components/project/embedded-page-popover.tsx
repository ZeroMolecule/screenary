import { FC } from 'react';
import { EmbeddedPage } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PopoverMenuForm } from '../popover-menu-form';
import { FormTextInput } from '../base/form/text-input';

type Props = {
  onClose: () => void;
  onSubmit: (values: EmbeddedPageFormValues) => Promise<void>;
  item?: EmbeddedPage;
};

export const EmbeddedPagePopover: FC<Props> = (props) => {
  const { embeddedPageForm, isSubmitting, onClose, onSubmit } =
    useEmbeddedPagePopover(props);

  return (
    <PopoverMenuForm
      title="new form"
      form={embeddedPageForm}
      isSubmitting={isSubmitting}
      onClose={onClose}
      onSubmit={onSubmit}
      stackProps={{ pos: 'static' }}
    >
      <FormTextInput
        name="url"
        label="Enter URL"
        placeholder="https://"
        c="white"
      />
    </PopoverMenuForm>
  );
};

function useEmbeddedPagePopover({ onClose, onSubmit, item }: Props) {
  const embeddedPageForm = useForm<EmbeddedPageFormValues>({
    resolver: zodResolver(embeddedPageSchema),
    defaultValues: {
      url: item?.url ?? '',
    },
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = embeddedPageForm;

  return {
    embeddedPageForm,
    isSubmitting,
    onClose,
    onSubmit: handleSubmit(onSubmit),
  };
}

export type EmbeddedPageFormValues = z.infer<typeof embeddedPageSchema>;
const embeddedPageSchema = z.object({
  url: z.string().url().min(1),
});
