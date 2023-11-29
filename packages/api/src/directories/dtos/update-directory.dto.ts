import { createDirectorySchema } from './create-directory.dto';
import { z } from 'zod';

export const updateDirectorySchema = createDirectorySchema.partial();

export type UpdateDirectoryDto = z.infer<typeof updateDirectorySchema>;
