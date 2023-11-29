import { z } from 'zod';

export const findManyQuickLinkSchema = z
  .object({
    where: z
      .object({
        directoryId: z
          .string()
          .transform((val) => (val === 'null' ? null : val))
          .nullish(),
      })
      .optional(),
  })
  .transform((val) => val.where);

export type FindManyQuickLinkDto = z.infer<typeof findManyQuickLinkSchema>;
