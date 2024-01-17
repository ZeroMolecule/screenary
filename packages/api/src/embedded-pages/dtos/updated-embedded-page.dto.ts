import { z } from 'zod';
import { createEmbeddedPageSchema } from './create-embedded-page.dto';

export const updateEmbeddedPageSchema = createEmbeddedPageSchema.partial();

export type UpdateEmbeddedPageDto = z.infer<typeof updateEmbeddedPageSchema>;
