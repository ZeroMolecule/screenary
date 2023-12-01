import { z } from 'zod';

export const findManyDirectorySchema = z
  .object({
    where: z
      .object({
        parentId: z
          .string()
          .transform((val) => (val === 'null' ? null : val))
          .nullish(),
      })
      .optional(),
  })
  .transform((val) => val.where);

export type FindManyDirectoryDto = z.infer<typeof findManyDirectorySchema>;
